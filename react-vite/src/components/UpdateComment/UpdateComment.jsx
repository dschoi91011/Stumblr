import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateCommentThunk, getCommentThunk } from '../../redux/comments';
import './UpdateComment.css';

export default function UpdateComment({ id, postId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const comment = useSelector(state => state.comments.byPostId[postId]?.find(comment => comment.id === id));

    useEffect(() => {
        if (comment) {
            setContent(comment.content);
        } else {
            dispatch(getCommentThunk(id)).then(data => {
                if (data.comment) {
                    setContent(data.comment.content);
                }
            });
        }
    }, [dispatch, id, comment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedComment = { content };
        const response = await dispatch(updateCommentThunk(id, updatedComment));
        if (!response.error) {
            closeModal();
        } else {
            console.log("Error updating comment:", response.error);
        }
    };

    return (
        <div id='update-comment-container'>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='Update comment...'
                    required
                />
                <button className='update-comment-btn' type='submit'>Update</button>
            </form>
        </div>
    );
}