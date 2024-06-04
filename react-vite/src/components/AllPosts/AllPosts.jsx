import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {getAllPostsThunk} from "../../redux/posts";
import {getCommentsForPostThunk} from "../../redux/comments"; 
import DeletePost from "../DeletePost";
import UpdatePost from "../UpdatePost";
import PostComment from "../PostComment";
import UpdateComment from "../UpdateComment";
import DeleteComment from "../DeleteComment";
import OpenModalButton from "../OpenModalButton";
// import NewPostType from "../NewPostType";
import './AllPosts.css';

export default function AllPosts(){
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentsVisible, setCommentsVisible] = useState({}); 
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const currentUser = useSelector(state => state.session.user);
    const commentsByPostId = useSelector(state => state.comments.byPostId);
    const navigate = useNavigate();
    const [follow, setFollow] = useState({});

    useEffect(() => {
        const getAllPosts = async() => {
            await dispatch(getAllPostsThunk());
            setIsLoaded(true);
        };
        getAllPosts();
    }, [dispatch]);

    const handleHeaderClick = (userId) => {
        navigate(`/user/${userId}/posts`);
    };

    const toggleComments = async(postId) => {
        if(!commentsVisible[postId]){
            await dispatch(getCommentsForPostThunk(postId));
        }
        setCommentsVisible(prev => ({...prev, [postId]: !prev[postId]}));
    };

    const toggleFollow = (userId) => {
        setFollow(prev => ({...prev, [userId]: !prev[userId]}));
        alert(`
            Currently holds no other function than to toggle follow
            button for all posts of the user being followed. Functionality
            to be added later for green-lit
        `)
    }

    return(
        <div className="all-posts">

            {isLoaded && posts.slice(0).reverse().map(obj => (
                <div className='post-block' key={obj.id}>
                    <div>
                        <div className='post-header' onClick={() => handleHeaderClick(obj.poster_id)} style={{cursor: 'pointer'}}>
                            <img className='poster-profpic' style={{height: '50px', width: '50px', marginTop: '5px', marginRight: '5px'}} src={obj?.profile_pic || '/default_profpic.jpg'} alt='prof_pic'/>
                            <p className='poster-username'>{obj.username}</p>
                        </div>
                        {obj.picture && (
                            <div className="post-img-container">
                                <img className='post-img' src={obj.picture} alt='post-img'/>
                            </div>
                        )}
                        <p className='img-caption'>{obj.body}</p>
                    </div>
                    <div className="post-lower-btns">

                        <button className='toggle-comment-btn' onClick={() => toggleComments(obj.id)}>
                            {commentsVisible[obj.id] ? 'Hide Comments' : 'Show Comments'}
                        </button>

                        {currentUser && currentUser.id !== obj.poster_id && (
                            <img className='follow-toggle-btn'
                                src={follow[obj.poster_id] ? '/unfollow_icon.png' : '/follow_icon.png'}
                                alt={follow[obj.poster_id] ? 'unfollow' : 'follow'}
                                style={{cursor: 'pointer', height: '35px', width: '35px'}}
                                onClick={() => toggleFollow(obj.poster_id)}
                            />
                        )}

                        {currentUser && currentUser.id === obj.poster_id && (
                            <div className="post-actions">
                                <OpenModalButton className='delete-post' modalComponent={<DeletePost postId={obj.id}/>}>
                                    <img style={{cursor: 'pointer', height: '35px', width: '35px'}} src='/delete_icon.png' alt='Delete'/>
                                </OpenModalButton>
                                <OpenModalButton className='update-post' modalComponent={<UpdatePost postId={obj.id}/>}>
                                    <img style={{cursor: 'pointer', height: '35px', width: '35px'}} src='/edit_icon.png' alt='Update'/>
                                </OpenModalButton>
                            </div>
                        )}


                    </div>
                    {commentsVisible[obj.id] && (
                        <div className="comments-section">
                            {commentsByPostId[obj.id]?.length ? (
                                commentsByPostId[obj.id].map(comment => (
                                    <div key={comment.id} className="comment-block">
                                        <img className='commenter-pic' style={{height: '50px', width: '50px', marginTop: '5px', marginRight: '5px'}} src={comment?.profile_pic || '/default_profpic.jpg'} alt='prof_pic'/>
                                        <div className='commenter-post-block'>
                                            <small className='commenter-username'>{comment.username} replied:</small>
                                            <p className='commenter-reply'>{comment.content}</p>
                                        </div>
                                        {currentUser && currentUser.id === comment.user_id && (
                                            <div className='commenter-modal-btns'>
                                                <OpenModalButton className='delete-comment' modalComponent={<DeleteComment id={comment.id} postId={obj.id}/>}>
                                                    <img style={{cursor: 'pointer', height: '35px', width: '35px'}} src='/delete_icon.png' alt='Delete'/>
                                                </OpenModalButton>
                                                <OpenModalButton className='update-comment' modalComponent={<UpdateComment id={comment.id} postId={obj.id}/>}>
                                                    <img style={{cursor: 'pointer', height: '35px', width: '35px'}} src='/edit_icon.png' alt='Update'/>
                                                </OpenModalButton>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No comments yet.</p>
                            )}
                            {currentUser && (<OpenModalButton className='post-comment' buttonText='Post Comment' modalComponent={<PostComment postId={obj.id}/>}/>)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}