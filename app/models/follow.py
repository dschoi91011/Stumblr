from .db import db, environment, SCHEMA, add_prefix_for_prod

class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    following_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    followed_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)

    following_user = db.relationship('User', foreign_keys=[following_user_id])
    followed_user = db.relationship('User', foreign_keys=[followed_user_id])