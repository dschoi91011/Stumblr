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
import NewPostType from "../NewPostType";
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

    // console.log('COMMENTS---------------> ', commentsByPostId)
    // console.log('POST ------------->', posts)

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
            {
                currentUser &&
                (<OpenModalButton className='new-post-type' buttonText='Create Post' modalComponent={<NewPostType/>}/>)
            }
            {isLoaded && posts.slice(0).reverse().map(obj => (
                <div className='post-block' key={obj.id} style={{border: '1px solid black'}}>
                    <div>
                        <div onClick={() => handleHeaderClick(obj.poster_id)} style={{cursor: 'pointer'}}>
                            <img style={{height: '50px', width: '50px', marginTop: '5px', marginRight: '5px'}} src={obj?.profile_pic || '/default_profpic.jpg'} alt='prof_pic'/>
                            <p>{obj.username}</p>
                        </div>
                        {obj.picture && <img style={{height: "300px", width: "auto"}} src={obj.picture} alt={obj.title}/>}
                        <p>{obj.body}</p>

                        {currentUser && currentUser.id !== obj.poster_id && (
                            <img
                                src={follow[obj.poster_id] ? '/unfollow_icon.png' : '/follow_icon.png'}
                                alt={follow[obj.poster_id] ? 'unfollow' : 'follow'}
                                style={{cursor: 'pointer', height: '35px', width: '35px'}}
                                onClick={() => toggleFollow(obj.poster_id)}
                            />
                        )}

                    </div>
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
                    <button onClick={() => toggleComments(obj.id)}>
                        {commentsVisible[obj.id] ? 'Hide Comments' : 'Show Comments'}
                    </button>
                    {commentsVisible[obj.id] && (
                        <div className="comments-section">
                            {commentsByPostId[obj.id]?.length ? (
                                commentsByPostId[obj.id].map(comment => (
                                    <div key={comment.id} className="comment">
                                        <img style={{height: '50px', width: '50px', marginTop: '5px', marginRight: '5px'}} src={comment?.profile_pic || '/default_profpic.jpg'} alt='prof_pic'/>
                                        <small>{comment.username} replied:</small>
                                        <p>{comment.content}</p>
                                        {currentUser && currentUser.id === comment.user_id && (
                                            <div>
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