import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getPostByIdThunk, updatePostThunk} from '../../redux/posts';
import {getAllPostsThunk} from '../../redux/posts';
import {useModal} from '../../context/Modal';
import './UpdatePost.css';

export default function UpdatePost({postId}) {
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const post = useSelector(state => state.post);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [picture, setPicture] = useState(null);
    const [inputError, setInputError] = useState({});

    useEffect(() => {
        const fetchPost = async() => {
            if(postId){
                const postData = await dispatch(getPostByIdThunk(postId));
                setTitle(postData.title || '');
                setBody(postData.body || '');
                setPicture(postData.picture || '');
            }
        };

        fetchPost();
    }, [dispatch, postId]);

    const hasErrors = () => {
        let errorObj = {};
        if(!title) errorObj.title = 'Title is required';
        return errorObj;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newErr = hasErrors();
        setInputError(newErr);

        if(Object.keys(newErr).length === 0){
            const formData = new FormData();
            formData.append('title', title);
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

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h1 style={{fontSize: '40px'}}>Update Post</h1>

            <div>
                <label htmlFor="title">Title
                    <input id="title" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required/>
                </label>
                {inputError.title && <p style={{color: 'red', fontSize: '22px'}}>{inputError.title}</p>}
            </div>

            <div>
                <label htmlFor="body">Body
                    <textarea id="body" rows="4" cols="50" placeholder="Body" style={{fontSize: '20px'}} value={body} onChange={e => setBody(e.target.value)}/>
                </label>
            </div>

            <div>
                <label htmlFor="picture">Picture
                    <input id="picture" type="file" style={{fontSize: '20px' }} onChange={updatePicture}/>
                </label>
            </div>

            <button type="submit" style={{height: '40px', width: '200px', fontSize: '20px', margin: '20px 0px'}}>Update Post</button>
        </form>
    );
}