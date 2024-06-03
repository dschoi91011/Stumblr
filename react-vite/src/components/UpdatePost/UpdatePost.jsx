import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getPostByIdThunk, updatePostThunk} from '../../redux/posts';
import {getAllPostsThunk} from '../../redux/posts';
import {useModal} from '../../context/Modal';
import './UpdatePost.css';

export default function UpdatePost({postId}){
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [body, setBody] = useState('');
    const [picture, setPicture] = useState('');
    const [inputError, setInputError] = useState('');

    const postContent = useSelector(state => state.posts.post)

    console.log('UPDATEPOST caption------> ', postContent)

    useEffect(() => {
        const fetchPost = async() => {
            if(postContent){
                setBody(postContent.body)
                setPicture(postContent.picture)
            } else {
                const postData = await dispatch(getPostByIdThunk(postId))
                setBody(postData.body || '')
                setPicture(postData.picture || '')
            }
        };

        fetchPost();
    }, [dispatch, postId, postContent]);


    const hasErrors = () => {
        if(!picture && !body) return 'No changes made';
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
                navigate('/');
                closeModal();
            }
        }
    };

    const updatePicture = (e) => {
        const file = e.target.files[0];
        if(file) setPicture(file);
    };

    return(
        <form onSubmit={handleSubmit}>
            <h1 style={{fontSize: '40px'}}>Update Post</h1>

            <div>
                <label htmlFor='picture'>Picture
                    <input id='picture' type='file' onChange={updatePicture}/>
                </label>
            </div>

            <div>
                <label htmlFor='caption'>Caption
                    <textarea id='caption' rows='1' cols='80' placeholder='Optional caption' value={body} onChange={e => setBody(e.target.value)}/>
                </label>
            </div>
            {inputError && <p style={{color: 'red'}}>{inputError}</p>}

            <button type='submit' style={{height: '30px', width: '100px'}}>Update Post</button>
        </form>
    );
}

