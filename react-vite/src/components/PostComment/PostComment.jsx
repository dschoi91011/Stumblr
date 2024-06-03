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
        const comment = {content};
        await dispatch(createCommentThunk(postId, comment));
        closeModal();
    };

    return(
        <div id='post-comment-container'>
            <form onSubmit={handleSubmit}>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='Write your comment here...'/>
                {inputError && <p style={{color: 'red'}}>{inputError}</p>}
                <button className='post-comment-btn' type='submit'>Post</button>
            </form>
        </div>
    );
}