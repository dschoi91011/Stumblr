from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .aws_functions import (upload_file_to_s3, get_unique_filename)
from ..models import db, Post, Comment
from ..forms import PostForm, CommentForm


post_routes = Blueprint('post', __name__)

def authorize(poster_id):
    if poster_id != current_user.id:
        return {'message': 'Forbidden'}, 403
    return None

#READ all posts------------------------------------------------------
@post_routes.route('/')
def all_posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

#READ current user posts------------------------------------------------------
@post_routes.route('/my-posts')
@login_required
def my_posts():
    poster_id = current_user.id
    posts = Post.query.filter_by(poster_id = user_id).all()
    return {'posts': [post.to_dict() for post in posts]}

#READ one post------------------------------------------------------
@post_routes.route('/<int:post_id>')
def one_post(post_id):
    post = Post.query.get(post_id)
    if post:
        return {'post': post.to_dict()}
    else:
        return {'message': 'Post does not exist'}, 404

#CREATE new post------------------------------------------------------
@post_routes.route('/new-post', methods=['POST'])
@login_required
def new_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        image = form.data['picture']
        url = None
        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if 'url' not in upload:
                return {'error': 'Image could not be uploaded'}, 400
            url = upload['url']

        new_post = Post(
            poster_id = current_user.id,
            title = form.data['title'],
            body = form.data['body'],
            picture = url
        )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201

    else:
        return {'error': form.errors}, 400

#UPDATE post------------------------------------------------------
@post_routes.route('/<int:post_id>', methods=['PUT'])
@login_required
def edit_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return {'message': 'Post does not exist'}, 404

    auth = authorize(post.poster_id)
    if auth:
        return auth

        form = PostForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            post.title = form.data['title']
            post.body = form.data['body']
            post.picture = form.data['picture']
            db.session.commit()
            return post.to_dict(), 200
        else:
            return {'error': form.errors}, 400

#DELETE post------------------------------------------------------
@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return {'message': 'Post does not exist'}, 404

    auth = authorize(post.poster_id)
    if auth:
        return auth

    db.session.delete(post)
    db.session.commit()
    return {'message': 'Post deleted'}, 200

#READ comments for a post------------------------------------------
@post_routes.route('/<int:p_id>/comments')
def post_comments(p_id):
    post = Post.query.get(p_id)
    if not post:
        return {'message': 'Post does not exist'}, 404

    comments = Comment.query.filter_by(p_id = post_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}

#CREATE comment for post--------------------------------------------
@post_routes.route('/<int:p_id>/comments/new', methods=['POST'])
@login_required
def create_post_comment(p_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post.query.get(p_id)
        if not post:
            return {'message': 'Post does not exist'}, 404

        new_comment = Comment(
            user_id = current_user.id,
            post_id = p_id,
            content = form.data['content']
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict(), 201

    else:
        return {'error': form.errors}, 400