from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    all_posts = [
        {
            'poster_id': 1,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/nature1.jpg'
        },
        {
            'poster_id': 1,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/nature3.jpg'
        },
        {
            'poster_id': 1,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/nature4.jpg'
        },
        {
            'poster_id': 2,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/sci1.jpg'
        },
        {
            'poster_id': 2,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/sci2.jpg'
        },
        {
            'poster_id': 2,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/sci3.jpg'
        },
        {
            'poster_id': 3,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/westie1.jpg'
        },
        {
            'poster_id': 3,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/westie2.jpg'
        },
        {
            'poster_id': 3,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/westie3.jpg'
        },
        {
            'poster_id': 4,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/art1.jpg'
        },
        {
            'poster_id': 4,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/art2.jpg'
        },
        {
            'poster_id': 4,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/art3.jpg'
        },
        {
            'poster_id': 5,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/car1.jpg'
        },
        {
            'poster_id': 5,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/car2.jpg'
        },
        {
            'poster_id': 5,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/car3.jpg'
        },
        {
            'poster_id': 6,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/music1.jpg'
        },
        {
            'poster_id': 6,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/music2.jpg'
        },
        {
            'poster_id': 6,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/music3.jpg'
        },
                {
            'poster_id': 7,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/bjj1.jpg'
        },
        {
            'poster_id': 7,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/bjj2.jpg'
        },
        {
            'poster_id': 7,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/bjj3.jpg'
        },
        {
            'poster_id': 8,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/arch1.jpg'
        },
        {
            'poster_id': 8,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/arch2.jpg'
        },
        {
            'poster_id': 8,
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/arch3.jpg'
        }
    ]

    create_posts = [Post(**post) for post in all_posts]
    add_posts = [db.session.add(post) for post in create_posts]
    db.session.commit()
    return create_posts

def undo_posts():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()
