from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_functions import ALLOWED_EXTENSIONS


class PostForm(FlaskForm):
    picture = FileField('Image File', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    body = StringField('Body', validators=[Length(max=30)])