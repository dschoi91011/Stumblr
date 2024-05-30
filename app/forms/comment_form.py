from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length


class CommentForm(FlaskForm):
    content = StringField('Content', validators=[DataRequired(), Length(min=0, max=100)])
    submit = SubmitField('Post Comment')