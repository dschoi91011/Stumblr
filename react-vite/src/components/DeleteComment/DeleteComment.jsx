import {useModal} from '../../context/Modal';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {deleteCommentThunk, getCommentsForPostThunk} from '../../redux/comments';
import './DeleteComment.css';


export default function DeleteComment({id, postId}){
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async() => {
        await dispatch(deleteCommentThunk(id));
        await dispatch(getCommentsForPostThunk(postId));
        navigate('/');
        closeModal();
    }

    return(
        <div id='delete-comment-container'>
            <h1 className='del-comment-title'>Delete comment?</h1>
            <div className='del-buttons-container'>
                <button className='del-comment-yes-btn' onClick={handleSubmit}>YES</button>
                <button className='del-comment-no-btn' onClick={closeModal}>NO</button>
            </div>
        </div>
    );

}
