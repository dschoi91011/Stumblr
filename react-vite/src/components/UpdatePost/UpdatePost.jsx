import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getPostByIdThunk, updatePostThunk} from '../../redux/posts';
import {getAllPostsThunk} from '../../redux/posts';
import {useModal} from '../../context/Modal';
import './UpdatePost.css';

export default function UpdatePost({postObj}){
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const [body, setBody] = useState(postObj.body);
    const [picture, setPicture] = useState(null);
    const [imageURL, setImageURL] = useState(postObj.picture);
    const [inputError, setInputError] = useState('');

    useEffect(() => {
        const fetchPost = async() => {
            if(postObj){
                setBody(postObj.body);
                setPicture(postObj.picture);
                if(postObj.picture){
                    setImageURL(postObj.picture);
                }
            } else {
                const postData = await dispatch(getPostByIdThunk(postObj.id));
                setBody(postData.body || '');
                setPicture(postData.picture || '');
                if(postData.picture){
                    setImageURL(postData.picture);
                }
            }
        };
        fetchPost();
    }, [dispatch, postObj.id, postObj]);

    const hasErrors = () => {
        if(body.length > 30) return 'Max character length of 30';
        if(picture && !(picture instanceof File)) return '';
        if(picture && picture instanceof File){
            const fileExtension = picture.name.split('.').pop().toLowerCase();
            if(!['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)){
                return 'Accepted file types are jpg, jpeg, png, and gif';
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

            const res = await dispatch(updatePostThunk(postObj.id, formData));
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
        if(file){
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if(file.size > 5000000){
                setInputError('Selected image exceeds the maximum file size of 5Mb');
                return;
            }
            if(!['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)){
                setImageURL('/noimg_icon.png');
                setInputError('Accepted file types are jpg, jpeg, png, and gif');
                return;
            }
            const newImageURL = URL.createObjectURL(file);
            setImageURL(newImageURL);
            setPicture(file);
            setInputError('');
        }
    };

    return(
        <form onSubmit={handleSubmit} className='update-post-form'>
            <h1 style={{fontSize: '40px'}}>Update Post</h1>

            <div className='form-field'>
                <label htmlFor='picture' className='file-input-labels'>
                    {imageURL ? <img src={imageURL} alt="preview" className='thumbnails'/> : 'Upload Picture'}
                    <input id='picture' type='file' onChange={updatePicture} style={{visibility: 'hidden'}}/>
                </label>
            </div>

            <div className='form-field'>
                <label htmlFor='caption'>Caption <textarea id='caption' rows='1' cols='80' placeholder='Optional caption' value={body} onChange={e => setBody(e.target.value)}/></label>
            </div>

            <div className='error-message'>
                {inputError && <p>{inputError}</p>}
            </div>

            <button type='submit' style={{height: '30px', width: '100px', borderRadius: '10px'}}>Update Post</button>
        </form>
    );
}