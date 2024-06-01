import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createCommentThunk } from '../../redux/comments';
import './PostComment.css';

export default function PostComment({ postId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = { content };
        const response = await dispatch(createCommentThunk(postId, comment));
        if (!response.error) {
            closeModal();
        } else {
            console.log("Error posting comment:", response.error);
        }
    };

    return (
        <div id='post-comment-container'>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='Write your comment here...'
                    required
                />
                <button className='post-comment-btn' type='submit'>Post</button>
            </form>
        </div>
    );
}