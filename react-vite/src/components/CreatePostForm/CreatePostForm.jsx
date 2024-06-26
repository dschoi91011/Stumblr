import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {createPostThunk} from '../../redux/posts';
import './CreatePostForm.css';

export default function CreatePostForm(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [body, setBody] = useState('');
    const [picture, setPicture] = useState(null);
    const [pictureUrl, setPictureUrl] = useState('photo_icon.png');
    const [inputError, setInputError] = useState({});

    const hasErrors = () => {
        const errorObj = {};
        if(!picture) errorObj.picture = 'Picture is required';
        else {
            const supportedTypes = ['jpg', 'jpeg', 'png', 'gif'];
            const extension = picture.name.split('.').pop().toLowerCase();
            if(!supportedTypes.includes(extension)) errorObj.picture = 'Acceptable file types: jpg, jpeg, png, and gif';
        }
        if(body.length > 30) errorObj.body = 'Max character length of 30';
        return errorObj;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newErr = hasErrors();
        setInputError(newErr);

        if(!Object.keys(newErr).length){
            const formData = new FormData();
            formData.append('body', body);
            formData.append('picture', picture);

            const res = await dispatch(createPostThunk(formData));

            if(res.errors){
                setInputError(res.errors);
            } else {
                navigate('/');
            }
        }
    };

    const updatePicture = (e) => {
        const file = e.target.files[0];
        if(file){
            const supportedTypes = ['jpg', 'jpeg', 'png', 'gif'];
            const extension = file.name.split('.').pop().toLowerCase();
            if(!supportedTypes.includes(extension)){
                setInputError(prev => ({ ...prev, picture: 'Acceptable file types: jpg, jpeg, png, and gif' }));
                setPicture(null);
                setPictureUrl('photo_icon.png');
            } else {
                setPicture(file);
                setPictureUrl(URL.createObjectURL(file));
                setInputError(prev => {
                    const newError = {...prev};
                    delete newError.picture;
                    return newError;
                });
            }
        }
    };

    return(
        <form className='create-post-form' onSubmit={handleSubmit}>
            <h1 className='create-title' style={{fontSize: '40px', color: 'white'}}>Create a New Image</h1>

            <div className='form-field'>
                <label htmlFor='picture'>
                    <input id='picture' type='file' onChange={updatePicture} style={{display: 'none'}}/>
                    <label htmlFor='picture' className='custom-file-upload'>
                        <img src={pictureUrl} alt='Picture Preview' className='picture-preview'/>
                    </label>
                </label>
                <div className='error-message'>{inputError.picture && <p>{inputError.picture}</p>}</div>
            </div>

            <div className='form-field'>
                <label htmlFor='caption'>
                    <textarea id='caption' rows='1' cols='80' placeholder='Optional caption' value={body} onChange={(e) => setBody(e.target.value)}/>
                </label>
                <div className='error-message'>{inputError.body && <p>{inputError.body}</p>}</div>
            </div>

            <button className='create-post-btn' type='submit' style={{height: '30px', width: '130px', borderRadius: '10px', cursor: 'pointer'}}>Create Post</button>
        </form>
    );
}