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
            "hashed_password": "password1"
        },
        {
            "first_name": "John",
            "last_name": "Smith",
            "username": "johnsmith123",
            "email": "johnsmith123@email.com",
            "hashed_password": "password2"
        },
        {
            "first_name": "Sarah",
            "last_name": "Carter",
            "username": "sarahcarter123",
            "email": "sarahcarter123@email.com",
            "hashed_password": "password3"
        },
        {
            "first_name": "David",
            "last_name": "Kim",
            "username": "davidkim123",
            "email": "davidkim123@email.com",
            "hashed_password": "password4"
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
