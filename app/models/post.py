from .db import db, environment, SCHEMA, add_prefix_for_prod

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    poster_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    body = db.Column(db.String(1000))
    picture = db.Column(db.String)

    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post', cascade='all, delete-orphan')
    # favorites = db.relationship('Favorite', back_populates='post', cascade='all, delete-orphan')


    def to_dict(self):

        # user_info = self.user.to_dict()

        return {
            'id': self.id,
            'poster_id': self.poster_id,
            'title': self.title,
            'body': self.body,
            'picture': self.picture,
            'username': self.user.username,
            'profile_pic': self.user.profile_pic
        }
