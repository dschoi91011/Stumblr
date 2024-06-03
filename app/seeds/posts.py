from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    all_posts = [
        {
            'poster_id': 1,
            # 'title': 'Sunset over the Alpes',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/nature1.jpg'
        },
        {
            'poster_id': 1,
            # 'title': 'Sky shots',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/nature3.jpg'
        },
        {
            'poster_id': 1,
            # 'title': 'Switzerland',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/nature4.jpg'
        },
        {
            'poster_id': 2,
            # 'title': 'Evangelion',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/sci1.jpg'
        },
        {
            'poster_id': 2,
            # 'title': 'Sci-fi concept',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/sci2.jpg'
        },
        {
            'poster_id': 2,
            # 'title': 'Cyberpunk city',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/sci3.jpg'
        },
        {
            'poster_id': 3,
            # 'title': 'Reggie!',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/westie1.jpg'
        },
        {
            'poster_id': 3,
            # 'title': 'Dumb and Dumber',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/westie2.jpg'
        },
        {
            'poster_id': 3,
            # 'title': 'He waits for me',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/westie3.jpg'
        },
        {
            'poster_id': 4,
            # 'title': 'Bladerunner theme',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/art1.jpg'
        },
        {
            'poster_id': 4,
            # 'title': 'Neon Nightscape',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/art2.jpg'
        },
        {
            'poster_id': 4,
            # 'title': 'Color concepts',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/art3.jpg'
        },
        {
            'poster_id': 5,
            # 'title': 'Tokyo GTR',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/car1.jpg'
        },
        {
            'poster_id': 5,
            # 'title': 'Backside',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/car2.jpg'
        },
        {
            'poster_id': 5,
            # 'title': 'Pretty and Pink',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/car3.jpg'
        },
        {
            'poster_id': 6,
            # 'title': 'Music bars photo',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/music1.jpg'
        },
        {
            'poster_id': 6,
            # 'title': 'I hate flats',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/music2.jpg'
        },
        {
            'poster_id': 6,
            # 'title': 'Music touches the soul',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/music3.jpg'
        },
                {
            'poster_id': 7,
            # 'title': 'BJJ competition',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/bjj1.jpg'
        },
        {
            'poster_id': 7,
            # 'title': 'BJJ art',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/bjj2.jpg'
        },
        {
            'poster_id': 7,
            # 'title': 'BJJ definitions',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/bjj3.jpg'
        },
        {
            'poster_id': 8,
            # 'title': 'LA Nights',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/arch1.jpg'
        },
        {
            'poster_id': 8,
            # 'title': 'Storms Over Mumbai',
            'body': None,
            'picture': 'https://stumblrimages.s3.amazonaws.com/arch2.jpg'
        },
        {
            'poster_id': 8,
            # 'title': 'Tokyo',
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
