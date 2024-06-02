import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getAllPostsThunk } from "../../redux/posts";
import { getCommentsForPostThunk } from "../../redux/comments"; 
import DeletePost from "../DeletePost";
import UpdatePost from "../UpdatePost";
import PostComment from "../PostComment";
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
                <div key={obj.id} style={{ position: 'relative', cursor: 'pointer' }}>
                    <div>
                        <div onClick={() => handleTitleClick(obj.poster_id)}>
                            <h2>{obj.title}</h2>
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
                                        <p>{comment.content}</p>
                                        <small>By User {comment.user_id}</small>
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