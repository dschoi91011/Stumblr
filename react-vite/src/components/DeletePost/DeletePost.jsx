import {useModal} from '../../context/Modal';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {deletePostThunk} from '../../redux/post';
import {getAllPostsThunk} from '../../redux/posts';
import './DeletePost.css';


export default function DeletePost({postId}) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    await dispatch(deletePostThunk(postId))
    await dispatch(getAllPostsThunk())
    navigate('/')
    closeModal()
  }

  return(
    <div id='delete-post-container'>
      <h1 className='title'>Delete this post?</h1>
      <div className='buttons-container'>
        <button className='yes-no-btn' onClick={handleSubmit}>YES</button>
        <button className='yes-no-btn' onClick={closeModal}>NO</button>
      </div>
    </div>
  )
}