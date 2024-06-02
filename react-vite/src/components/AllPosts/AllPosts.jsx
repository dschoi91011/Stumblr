import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getAllPostsThunk } from "../../redux/posts";
import { getCommentsForPostThunk } from "../../redux/comments"; 
import DeletePost from "../DeletePost";
import UpdatePost from "../UpdatePost";
import PostComment from "../PostComment";
import UpdateComment from "../UpdateComment";
import DeleteComment from "../DeleteComment";
import OpenModalButton from "../OpenModalButton";
import './AllPosts.css';

export default function AllPosts() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentsVisible, setCommentsVisible] = useState({}); 
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const currentUser = useSelector(state => state.session.user);
    const commentsByPostId = useSelector(state => state.comments.byPostId);
    const navigate = useNavigate();

    console.log('COMMENTS---------------> ', commentsByPostId)
    console.log('POST ------------->', posts)

    useEffect(() => {
        const getAllPosts = async () => {
            await dispatch(getAllPostsThunk());
            setIsLoaded(true);
        };
        getAllPosts();
    }, [dispatch]);

    const futureFeature = () => {
        alert('Feature under construction')
    }

    const handleCreatePost = () => {
        navigate('/new-post');
    };

    const handleTitleClick = (userId) => {
        navigate(`/user/${userId}/posts`);
    };

    const toggleComments = async (postId) => {
        if (!commentsVisible[postId]) {
            await dispatch(getCommentsForPostThunk(postId));
        }
        setCommentsVisible(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    return (
        <div className="all-posts">
            {currentUser && <button onClick={handleCreatePost}>Create Post</button>}
            {isLoaded && posts.slice(0).reverse().map(obj => (
                <div key={obj.id} style={{border: '1px solid black'}}>
                    <div>
                        <div onClick={() => handleTitleClick(obj.poster_id)} style={{ cursor: 'pointer' }}>
                            <img style={{ height: "50px", width: "50px", marginTop: '5px', marginRight: '5px' }} src={obj.profile_pic} alt='prof_pic'/>
                            <p>{obj.username}</p>
                            {/* <h2>{obj.title}</h2> */}
                            <p>{obj.body}</p>
                        </div>
                        {obj.picture && <img style={{ height: "300px", width: "auto" }} src={obj.picture} alt={obj.title} />}
                    </div>
                    {currentUser && currentUser.id === obj.poster_id && (
                        <div className="post-actions">
                            <OpenModalButton
                                className='delete-post'
                                buttonText='Delete'
                                modalComponent={<DeletePost postId={obj.id} />}
                            />
                            <OpenModalButton
                                className='update-post'
                                buttonText='Update'
                                modalComponent={<UpdatePost postId={obj.id} />}
                            />
                        </div>
                    )}
                    <button onClick={() => toggleComments(obj.id)}>
                        {commentsVisible[obj.id] ? 'Hide Comments' : 'Show Comments'}
                    </button>
                    {commentsVisible[obj.id] && (
                        <div className="comments-section">
                            {commentsByPostId[obj.id]?.length > 0 ? (
                                commentsByPostId[obj.id].map(comment => (
                                    <div key={comment.id} className="comment">
                                        <img style={{ height: "50px", width: "50px", marginTop: '5px', marginRight: '5px' }} src={comment.profile_pic} alt='prof_pic'/>
                                        <small>{comment.username} replied:</small>
                                        <p>{comment.content}</p>
                                        {currentUser && currentUser.id === comment.user_id && (
                                            <div>
                                                <OpenModalButton
                                                    className='delete-comment'
                                                    buttonText='Delete'
                                                    modalComponent={<DeleteComment id={comment.id} postId={obj.id}/>}
                                                />
                                                <OpenModalButton
                                                    className='update-comment'
                                                    buttonText='Edit'
                                                    modalComponent={<UpdateComment id={comment.id} postId={obj.id}/>}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No comments yet.</p>
                            )}
                            {currentUser && (
                                <OpenModalButton
                                    className='post-comment'
                                    buttonText='Post Comment'
                                    modalComponent={<PostComment postId={obj.id}/>}
                                />
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}