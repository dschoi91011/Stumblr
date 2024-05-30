from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    all_comments = [
        {'user_id': 2, 'post_id': 1, 'content': 'That looks awesome!'},
        {'user_id': 3, 'post_id': 1, 'content': 'Woah, nice!'},
        {'user_id': 4, 'post_id': 1, 'content': 'You have a great eye.'},
        {'user_id': 1, 'post_id': 2, 'content': 'Pretty wild, no lie.'},
        {'user_id': 5, 'post_id': 2, 'content': 'Great stuff.'},
        {'user_id': 7, 'post_id': 2, 'content': 'I wish I were as talented as you.'},
        {'user_id': 1, 'post_id': 3, 'content': 'Cute :)'},
        {'user_id': 6, 'post_id': 3, 'content': 'I love Westies!'},
        {'user_id': 4, 'post_id': 3, 'content': 'So adorable!'},
        {'user_id': 1, 'post_id': 4, 'content': 'You have some real talent'},
        {'user_id': 6, 'post_id': 4, 'content': 'Nice design'},
        {'user_id': 5, 'post_id': 4, 'content': 'How do you think of these concepts?'},
        {'user_id': 3, 'post_id': 5, 'content': 'Sick ride!'},
        {'user_id': 2, 'post_id': 5, 'content': 'Wish I had the money'},
        {'user_id': 1, 'post_id': 5, 'content': 'What a car!'},
        {'user_id': 4, 'post_id': 6, 'content': 'Yea, I feel that'},
        {'user_id': 7, 'post_id': 6, 'content': 'A fellow audiophile, I see.'},
        {'user_id': 3, 'post_id': 6, 'content': 'Music is life!'},
        {'user_id': 8, 'post_id': 7, 'content': 'Roll til the wheels fall off!'},
        {'user_id': 2, 'post_id': 7, 'content': 'The gentle are is not so gentle.'},
        {'user_id': 5, 'post_id': 7, 'content': 'Pajama rolls :)'},
        {'user_id': 3, 'post_id': 8, 'content': 'Sick ride!'},
        {'user_id': 2, 'post_id': 8, 'content': 'Wish I had the money'},
        {'user_id': 1, 'post_id': 8, 'content': 'What a car!'},

        {'user_id': 8, 'post_id': 9, 'content': 'Beautiful!'},
        {'user_id': 5, 'post_id': 9, 'content': 'Great place for a vacation'},
        {'user_id': 7, 'post_id': 9, 'content': 'Wish I could travel more.'},
        {'user_id': 3, 'post_id': 10, 'content': 'Neat concept'},
        {'user_id': 4, 'post_id': 10, 'content': 'Cyberpunk?'},
        {'user_id': 1, 'post_id': 10, 'content': 'Your artwork is awesome!'},
        {'user_id': 2, 'post_id': 11, 'content': 'Puppers!'},
        {'user_id': 7, 'post_id': 11, 'content': 'I have a Westie named Reggie.'},
        {'user_id': 6, 'post_id': 11, 'content': 'So fluffy!'},
        {'user_id': 3, 'post_id': 12, 'content': 'Sick artwork...'},
        {'user_id': 5, 'post_id': 12, 'content': 'Mine would look like chicken scratch.'},
        {'user_id': 2, 'post_id': 12, 'content': 'What do you use as a medium?'},
        {'user_id': 1, 'post_id': 13, 'content': 'Looks fast.'},
        {'user_id': 2, 'post_id': 13, 'content': 'I want a ride like that.'},
        {'user_id': 3, 'post_id': 13, 'content': 'Cars are great.'},
        {'user_id': 4, 'post_id': 14, 'content': 'Name your favorite band'},
        {'user_id': 7, 'post_id': 14, 'content': 'Music lovers unite!'},
        {'user_id': 3, 'post_id': 14, 'content': 'You have a favorite genre?'},
        {'user_id': 8, 'post_id': 15, 'content': 'BJJ for life.'},
        {'user_id': 2, 'post_id': 15, 'content': 'Wish I had the time to train more.'},
        {'user_id': 5, 'post_id': 15, 'content': 'Such a hard sport'},
        {'user_id': 3, 'post_id': 16, 'content': 'Beautiful shot'},
        {'user_id': 2, 'post_id': 16, 'content': 'Architects and engineers do not get along.'},
        {'user_id': 1, 'post_id': 16, 'content': 'Did you go to school for this?'},

        {'user_id': 8, 'post_id': 17, 'content': 'Yooooo!'},
        {'user_id': 5, 'post_id': 17, 'content': 'Would love to visit'},
        {'user_id': 7, 'post_id': 17, 'content': 'Looks amazing!'},
        {'user_id': 3, 'post_id': 18, 'content': 'Sweet concept'},
        {'user_id': 4, 'post_id': 18, 'content': 'I love sci-fi'},
        {'user_id': 1, 'post_id': 18, 'content': 'This is great'},
        {'user_id': 2, 'post_id': 19, 'content': 'Doggo!'},
        {'user_id': 7, 'post_id': 19, 'content': 'Westies are so spunky.'},
        {'user_id': 6, 'post_id': 19, 'content': 'So cute!'},
        {'user_id': 3, 'post_id': 20, 'content': 'Sick!'},
        {'user_id': 5, 'post_id': 20, 'content': 'I would love to learn to do this.'},
        {'user_id': 2, 'post_id': 20, 'content': 'Woah...'},
        {'user_id': 1, 'post_id': 21, 'content': 'Nice!'},
        {'user_id': 2, 'post_id': 21, 'content': 'I wish I could drive that.'},
        {'user_id': 3, 'post_id': 21, 'content': 'Sick vehicle.'},
        {'user_id': 4, 'post_id': 22, 'content': 'What do you listen to?'},
        {'user_id': 7, 'post_id': 22, 'content': 'I want to go to a concert'},
        {'user_id': 3, 'post_id': 22, 'content': 'Who is your favorite artist?'},
        {'user_id': 8, 'post_id': 23, 'content': 'Pajama ninjas!'},
        {'user_id': 2, 'post_id': 23, 'content': 'Ground karate!'},
        {'user_id': 5, 'post_id': 23, 'content': 'I wish I knew what I was doing'},
        {'user_id': 3, 'post_id': 24, 'content': 'You have a good eye'},
        {'user_id': 2, 'post_id': 24, 'content': 'Nice shot.'},
        {'user_id': 1, 'post_id': 24, 'content': 'I love good architecture'}
    ]

    create_comments = [Comments(**comment) for comment in all_comments]
    add_comments = [db.session.add(comment) for comment in create_comments]
    db.session.commit()
    return create_comments

def undo_comments():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()