from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import db, Comment
from ..forms import CommentForm


comment_routes = Blueprint('comment', __name__)

def authorize(poster_id):
    if poster_id != current_user.id:
        return {'message': 'Forbidden'}, 403
    return None

#READ one comment--------------------------------------------------------- POSSIBLY UNNECESSARY
@comment_routes.route('/<int:comment_id>')
def one_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return {'message': 'Comment does not exist'}, 404
    return comment.to_dict()

#READ all my comments----------------------------------------------------- POSSIBLY UNNECESSARY
@comment_routes.route('/my-comments')
@login_required
def my_comments():
    user_id = current_user.id
    comments = Comment.query.filter_by(user_id = user_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}

#UPDATE a comment----------------------------------------------------------
@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return {'message': 'Comment does not exist'}, 404

    authed = authorize(comment.user_id)
    if authed:
        return authed

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # comment.content = form.data['content']
        comment.content = form.content.data
        db.session.commit()
        return comment.to_dict(), 200
    else:
        return {'error': form.errors}, 400

#DELETE a comment------------------------------------------------------------
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return {'message': 'Comment does not exist'}, 404

    authed = authorize(comment.user_id)
    if authed:
        return authed
    
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Comment deleted'}, 200
