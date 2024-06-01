from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_functions import ALLOWED_EXTENSIONS


class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(min=0, max=30)])
    body = StringField('Body', validators=[Length(min=0, max=1000)])
    # picture = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    picture =FileField('Picture')
    submit = SubmitField('Create Post')