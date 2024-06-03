from flask import Blueprint, request
from flask_login import login_required, current_user
from .aws_functions import (upload_file_to_s3, get_unique_filename)
from ..models import db, Post, Comment                                  # make sure to add FAVORITE to add relevant routes for future features
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


# @post_routes.route('/')                                               # utilize this route to see images in backend
# def all_posts():
#     posts = Post.query.all()
#     html = "<html><body><h1>All Posts</h1><ul>"
#     for post in posts:
#         html += f"""
#             <li>
#                 <h2>{post.title}</h2>
#                 <p>{post.body}</p>
#                 <img style='height: 300px; width: auto;' src='{post.picture}' alt='{post.title}'>
#             </li>
#         """
#     html += "</ul></body></html>"
#     return html

#READ current user posts------------------------------------------------------  POSSIBLY UNNECESSARY
# @post_routes.route('/my-posts')
# @login_required
# def my_posts():
#     poster_id = current_user.id
#     posts = Post.query.filter_by(poster_id = poster_id).all()                 
#     return {'posts': [post.to_dict() for post in posts]}

#READ posts by specific user ------------------------------------------------------
@post_routes.route('/user/<int:poster_id>/posts')
def user_posts(poster_id):
    posts = Post.query.filter_by(poster_id = poster_id).all()
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
            # title = form.title.data,
            body = form.body.data,
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
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post = Post.query.get(post_id)
    if not post:
        return {'message': 'Post not found'}, 404

    authed = authorize(post.poster_id)
    if authed:
        return authed

    if form.validate_on_submit():
        # post.title = form.title.data
        post.body = form.body.data

        image = form.picture.data
        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if 'url' not in upload:
                return {'error': 'Image could not be uploaded'}, 400
            post.picture = upload['url']

        db.session.commit()
        return post.to_dict(), 200

    return {'error': form.errors}, 400


#DELETE post------------------------------------------------------
@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return {'message': 'Post does not exist'}, 404

    authed = authorize(post.poster_id)
    if authed:
        return authed

    db.session.delete(post)
    db.session.commit()
    return {'message': 'Post deleted'}, 200

#READ comments for a post------------------------------------------
@post_routes.route('/<int:post_id>/comments')
def post_comments(post_id):
    post = Post.query.get(post_id)
    if not post:
        return {'message': 'Post does not exist'}, 404

    comments = Comment.query.filter_by(post_id = post_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}

#CREATE comment for post--------------------------------------------
@post_routes.route('/<int:post_id>/comments/new', methods=['POST'])
@login_required
def create_post_comment(post_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post.query.get(post_id)
        if not post:
            return {'message': 'Post does not exist'}, 404

        new_comment = Comment(
            user_id = current_user.id,
            post_id = post_id,
            content = form.content.data
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict(), 201

    else:
        return {'error': form.errors}, 400

#READ favorite for post-----------------------------------------------
# @post_routes.route('/<int:post_id>/favorites')
# def check_favs(post_id):
#     post = Post.query.get(post_id)
#     fav = Favorite.query.filter_by(post_id=post_id).all()

#     if not post:
#         return {'message': 'Post does not exist'}, 404

#     return {'Favorites': [favorite.user_id for favorite in favorites]}

#CREATE favorite for post---------------------------------------------
# @post_routes.route('/<int:post_id>/favorite', methods=['POST'])
# @login_required
# def switch_fav(post_id):
#     post = Post.query.get(post_id)
#     fav = Favorite.query.filter_by(user_id=current_user.id, post_id=post_id).first()

#     if not post:
#         return {'message': 'Post does not exist'}, 404

#     if fav:
#         db.session.delete(fav)
#         msg = 'Liked'
#     else:
#         new_fav = Favorite(user_id=current_user.id, post_id=post_id)
#         db.session.add(new_fav)
#         msg = 'Unliked'

#     db.session.commit()
#     return {'message': msg}, 200

    