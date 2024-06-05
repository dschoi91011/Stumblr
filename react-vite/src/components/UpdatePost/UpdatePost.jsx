import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPostByIdThunk, updatePostThunk} from '../../redux/posts';
import {getAllPostsThunk} from '../../redux/posts';
import {useModal} from '../../context/Modal';
import './UpdatePost.css';

export default function UpdatePost({postId}){
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [picture, setPicture] = useState(null);
    const [inputError, setInputError] = useState('');

    const postContent = useSelector(state => state.posts.post);

    useEffect(() => {
        const fetchPost = async() => {
            if(postContent){
                setBody(postContent.body);
                setPicture(postContent.picture);
            } else {
                const postData = await dispatch(getPostByIdThunk(postId));
                setBody(postData.body || '');
                setPicture(postData.picture || '');
            }
        };
        fetchPost();
    }, [dispatch, postId, postContent]);

    const hasErrors = () => {
        if(body.length > 30) return 'Max character length of 30';
        if(picture && !(picture instanceof File)) return '';
        if(picture && picture instanceof File){
            const fileExtension = picture.name.split('.').pop().toLowerCase();
            if(!['jpg', 'png', 'gif'].includes(fileExtension)){
                return 'That file type is not supported';
            }
        }
        return '';
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const err = hasErrors();
        setInputError(err);

        if(!err){
            const formData = new FormData();
            formData.append('body', body);
            if(picture instanceof File){
                formData.append('picture', picture);
            }

            const res = await dispatch(updatePostThunk(postId, formData));
            if(res.error){
                setInputError(res.error);
            } else {
                await dispatch(getAllPostsThunk());
                closeModal();
            }
        }
    };

    const updatePicture = (e) => {
        const file = e.target.files[0];
        if(file) setPicture(file);
    };

    return(
        <form onSubmit={handleSubmit} className='update-post-form'>
            <h1 style={{fontSize: '40px'}}>Update Post</h1>

            <div className='form-field'>
                <label htmlFor='picture'>Picture
                    <input id='picture' type='file' onChange={updatePicture}/>
                </label>
            </div>

            <div className='form-field'>
                <label htmlFor='caption'>Caption
                    <textarea id='caption' rows='1' cols='80' placeholder='Optional caption' value={body} onChange={e => setBody(e.target.value)}/>
                </label>
            </div>

            <div className='error-message'>
                {inputError && <p>{inputError}</p>}
            </div>

            <button type='submit' style={{height: '30px', width: '100px'}}>Update Post</button>
        </form>
    );
}