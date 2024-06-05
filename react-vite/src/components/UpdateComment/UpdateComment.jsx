import {useModal} from '../../context/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {updateCommentThunk, getCommentThunk} from '../../redux/comments';
import './UpdateComment.css';

export default function UpdateComment({id, postId}){
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const comment = useSelector(state => state.comments.byPostId[postId]?.find(comment => comment.id === id));
    const [inputError, setInputError] = useState('');

    useEffect(() => {
        const fetchComment = async() => {
            if(comment){
                setContent(comment.content);
            } else {
                const data = await dispatch(getCommentThunk(id));
                if(data.comment){
                    setContent(data.comment.content);
                }
            }
        };
        fetchComment();
    }, [dispatch, id, comment]);

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
        const updatedComment = {content};
        await dispatch(updateCommentThunk(id, updatedComment));
        closeModal();
    };

    return(
        <div id='update-comment-container'>
            <h1 className='update-comment-title'>Edit your comment</h1>
            <form onSubmit={handleSubmit}>
                <div className='update-comment-items'>
                    <textarea className='update-textbox' rows='2' cols='50' value={content} onChange={(e) => setContent(e.target.value)} placeholder='Update comment...'/>
                    <p className='error-message'>{inputError}</p>
                    <button className='update-comment-btn' style={{borderRadius: '10px', cursor: 'pointer'}} type='submit'>Update</button>
                </div>
            </form>
        </div>
    );
}