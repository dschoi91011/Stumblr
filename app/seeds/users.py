from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
# def seed_users():
#     demo = User(
#         first_name='Demo', last_name='User', username='Demo', email='demo@aa.io', hashed_password='password')
#     marnie = User(
#         first_name='Marnie', last_name='Johnson', username='marnie', email='marnie@aa.io', hashed_password='password')
#     bobbie = User(
#         first_name='Bobbie', last_name='Lee', username='bobbie', email='bobbie@aa.io', hashed_password='password')

#     db.session.add(demo)
#     db.session.add(marnie)
#     db.session.add(bobbie)
#     db.session.commit()


def seed_users():
    all_users = [
        {
            "first_name": "Demo",
            "last_name": "User",
            "username": "demouser",
            "email": "demouser@email.com",
            "hashed_password": "password1",
            "profile_pic": "https://stumblrimages.s3.amazonaws.com/profile_pic1.jpg",
        },
        {
            "first_name": "John",
            "last_name": "Smith",
            "username": "johnsmith123",
            "email": "johnsmith123@email.com",
            "hashed_password": "password2",
            "profile_pic": "https://stumblrimages.s3.amazonaws.com/profile_pic2.jpg",
        },
        {
            "first_name": "Matt",
            "last_name": "Carter",
            "username": "mattcarter123",
            "email": "mattcarter123@email.com",
            "hashed_password": "password3",
            "profile_pic": "https://stumblrimages.s3.amazonaws.com/profile_pic3.jpg",
        },
        {
            "first_name": "David",
            "last_name": "Kim",
            "username": "davidkim123",
            "email": "davidkim123@email.com",
            "hashed_password": "password4",
            "profile_pic": "https://stumblrimages.s3.amazonaws.com/profile_pic4.jpg",     
        },
        {
            "first_name": "Sharon",
            "last_name": "Lee",
            "username": "sharonlee123",
            "email": "sharonlee123@email.com",
            "hashed_password": "password5",
            "profile_pic": "https://stumblrimages.s3.amazonaws.com/profile_pic5.jpg",      
        },
        {
            "first_name": "Sarah",
            "last_name": "Johnson",
            "username": "sarahjohnson123",
            "email": "sarahjohnson123@email.com",
            "hashed_password": "password6",
            "profile_pic": "https://stumblrimages.s3.amazonaws.com/profile_pic6.jpg",      
        },
        {
            "first_name": "Spencer",
            "last_name": "Stanton",
            "username": "spencerstanton123",
            "email": "spencerstanton123@email.com",
            "hashed_password": "password7",
            "profile_pic": "https://stumblrimages.s3.amazonaws.com/profile_pic7.jpg",  
        },
        {
            "first_name": "Gina",
            "last_name": "Nguyen",
            "username": "ginanguyen123",
            "email": "ginanguyen123@email.com",
            "hashed_password": "password8",
            "profile_pic": "https://stumblrimages.s3.amazonaws.com/profile_pic8.png",    
        }
    ]

    create_users = [User(**user) for user in all_users]
    add_users = [db.session.add(user) for user in create_users]
    db.session.commit()
    return create_users



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
