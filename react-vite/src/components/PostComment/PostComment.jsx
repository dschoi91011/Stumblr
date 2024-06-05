import {useModal} from '../../context/Modal';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {createCommentThunk} from '../../redux/comments';
import './PostComment.css';

export default function PostComment({postId}){
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [inputError, setInputError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!content.trim()){
            setInputError('Write something');
            return;
        }
        if(content.length > 50){
            setInputError('Max length of 50 characters');
            return;
        }
        const comment = {content};
        await dispatch(createCommentThunk(postId, comment));
        closeModal();
    };

    return(
        <div id='post-comment-container'>
            <h1 className='post-comment-title'>Reply to post</h1>
            <form onSubmit={handleSubmit}>
                <div className='post-comment-block'>
                    <textarea className='post-comment-textbox' rows='2' cols='50' value={content} onChange={(e) => setContent(e.target.value)} placeholder='Write your comment here...'/>
                    <p className='error-message'>{inputError}</p>
                    <button className='post-comment-btn' style={{borderRadius: '10px'}} type='submit'>Post</button>
                </div>
            </form>
        </div>
    );
}