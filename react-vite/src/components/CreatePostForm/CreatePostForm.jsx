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
    const [inputError, setInputError] = useState({});

    const hasErrors = () => {
        let errorObj = {};
        if(!picture) errorObj.picture = 'Picture is required';
        return errorObj;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErr = hasErrors();
        setInputError(newErr);

        if(Object.keys(newErr).length === 0){
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
        if(file) setPicture(file);
    };

    return(
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h1 style={{fontSize: '40px'}}>Create a New Image Post</h1>

            <div>
                <label htmlFor="body">Body
                    <textarea id="body" rows="2" cols="80" placeholder="Optional caption" style={{fontSize: '20px'}} value={body} onChange={e => setBody(e.target.value)}/>
                </label>
            </div>

            <div>
                <label htmlFor="picture">Picture
                    <input id="picture" type="file" style={{fontSize: '20px'}} onChange={updatePicture} required/>
                </label>
                {inputError.picture && <p style={{color: 'red', fontSize: '22px'}}>{inputError.picture}</p>}
            </div>

            <button type="submit" style={{height: '40px', width: '200px', fontSize: '20px', margin: '20px 0px'}}>Create Post</button>
        </form>
    );
}
