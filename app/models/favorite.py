from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), primary_key=True)
    
    #include db.relationships
    user = db.relationship('User', back_populates='favorites')
    post = db.relationship('Post', back_populates='favorites')


    def to_dict(self):
        return {
            'user_id': self.user_id,
            'post_id': self.post_id,
        }
        