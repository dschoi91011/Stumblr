import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {getAllPostsThunk, addFavoriteThunk, removeFavoriteThunk, getFavoritePostsThunk} from "../../redux/posts";
import {getCommentsForPostThunk} from "../../redux/comments"; 
import DeletePost from "../DeletePost";
import UpdatePost from "../UpdatePost";
import PostComment from "../PostComment";
import UpdateComment from "../UpdateComment";
import DeleteComment from "../DeleteComment";
import OpenModalButton from "../OpenModalButton";
import LoadingScreen from "../LoadingScreen";
import './AllPosts.css';


export default function AllPosts(){
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentsVisible, setCommentsVisible] = useState({}); 
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const favorites = useSelector(state => state.posts.favorites.favorites);
    const currentUser = useSelector(state => state.session.user);
    const commentsByPostId = useSelector(state => state.comments.byPostId);
    const navigate = useNavigate();
    // const [follow, setFollow] = useState({});
    const [randomPosts, setRandomPosts] = useState([]);
    const [localFavorites, setLocalFavorites] = useState([]);
    
    // console.log('COMMENTS --------------> ', commentsByPostId)
    // console.log('POSTS -------------->', posts)
    // console.log('FAVS --------->', favorites)
    // console.log('CURRENTUSER-------> ', currentUser)
    // console.log('STATE------------------>', useSelector(state => state.posts))

    // const futureFeature = () => {
    //     alert('Feature under construction')
    // };

    const goToLinkedIn = () => {
        window.location.href = `https://www.linkedin.com/in/daniel-choi-905970275/`;
    }

    const goToGitHub = () => {
        window.location.href = `https://github.com/dschoi91011`;
    }

    const goToPortfolio = () => {
        window.location.href = `https://dschoi91011.github.io/`;
    }

    useEffect(() => {
        const getAllPosts = async() => {
            await dispatch(getAllPostsThunk());
            await dispatch(getFavoritePostsThunk());
            setIsLoaded(true);
        };
        getAllPosts();
    }, [dispatch]);

    useEffect(() => {
        if(isLoaded && currentUser && favorites){
            const favIds = favorites.map(fav => fav.id);
            setLocalFavorites(favIds);
        }
    }, [isLoaded, currentUser, favorites]);

    const handleHeaderClick = (userId) => {
        navigate(`/user/${userId}/posts`);
    };

    const toggleComments = async(postId) => {
        await dispatch(getCommentsForPostThunk(postId));
        setCommentsVisible(prev => ({...prev, [postId]: !prev[postId]}));
    };

    const toggleFavorite = (postId) => {
        const isLiked = localFavorites.includes(postId);
        const updatedFavorites = isLiked ? localFavorites.filter((id) => id !== postId) : [...localFavorites, postId];
        setLocalFavorites(updatedFavorites);
    
        if(isLiked){
            dispatch(removeFavoriteThunk(postId));
        } else {
            dispatch(addFavoriteThunk(postId));
        }
    };

    // const toggleFollow = (userId) => {
    //     setFollow(prev => ({...prev, [userId]: !prev[userId]}));
    //     alert(`Future feature`)
    // };

    const getRandomPosts = (posts, count) => {
        const randomized = [...posts].sort(() => 0.5 - Math.random());
        return randomized.slice(0, count);
    };

    const handleSidebarClick = (postId) => {
        navigate(`/posts/${postId}`);
    }

    const reshufflePosts = () => {
        const newRandomized = getRandomPosts(posts, 5);
        setRandomPosts(newRandomized);
    }

    useEffect(() => {
        if(isLoaded){
            const randomPosts = getRandomPosts(posts.filter(post => post.poster_id !== (currentUser ? currentUser.id : null)), 5);
            setRandomPosts(randomPosts);
        }
    }, [isLoaded, posts, currentUser]);
    
    // const searchBar = (
    //     <div className='search-bar-container'>
    //         <div id='search-icon'>
    //             <img style={{height: '25px', width: '25px'}} src='/search_icon.png' alt='search_icon'/>
    //         </div>
    //         <input id='search-bar' type='search' style={{width: '200px'}} placeholder='Feature under construction'
    //             // value=''
    //             // onChange={}
    //         />
    //     </div>
    // );

    if(!isLoaded){
        return <LoadingScreen/>;
    }


return(
    <div className='all-posts-main'>

        <div className='post-main-body'>

            <div className='post-block-column'>

                <div className='posts-header'>
                    <div className='posts-header-center'>
                        <img className='linkedin' style={{height: '50px', width: '50px', cursor: 'pointer'}} onClick={goToLinkedIn} src='/linkedin_white.png' alt='linkedin'/>
                        <img className='github' style={{height: '50px', width: '50px', cursor: 'pointer'}} onClick={goToGitHub} src='/github_white.png' alt='github'/>
                        <img className='portfolio' style={{height: '50px', width: '50px', cursor: 'pointer'}} onClick={goToPortfolio} src='/portfolio_white.png' alt='portfolio'/>
                    </div>
                    {/* <div className='posts-header-search'>
                        <div className='search'>{searchBar}</div>
                    </div> */}
                </div>

                {isLoaded && posts.slice(0).reverse().map(obj => (
                    <div className='post-block' key={obj.id}>
                        <div>
                            <div className='post-header' onClick={() => handleHeaderClick(obj.poster_id)} style={{cursor: 'pointer'}}>
                                <img className='poster-profpic' src={obj?.profile_pic || '/default_profpic.jpg'} alt='prof_pic'/>
                                <p className='poster-username'>{obj.username}</p>
                            </div>
                            {obj.picture && (
                                <div className="post-img-container">
                                    <img className='post-img' src={obj.picture} alt='post-img'/>
                                </div>
                            )}
                        </div>

                        <div className="post-lower-btns" style={{marginLeft: '10px'}}>
                            <p className='img-caption' style={{marginLeft: '10px', fontSize: '20px', color: 'white'}}>{obj.body}</p>

                            {currentUser && currentUser.id !== obj.poster_id && (
                                <div className='post-lower-right-btn-cluster' style={{marginRight: '10px'}}>
                                    <img className='reply-toggle-btn'
                                    src={commentsVisible[obj.id] ? '/hide_reply_icon.png' : 'reply_icon.png'} alt='reply_icon'
                                    style={{cursor: 'pointer', height: '35px', width: '35px'}} onClick={() => toggleComments(obj.id)}
                                    />

                                    <img className='like-toggle-btn' 
                                    src={localFavorites.includes(obj.id) ? '/fav_icon.png' : '/unfav_icon.png'} alt='fav_icon'
                                    style={{ cursor: 'pointer', height: '35px', width: '35px' }} onClick={() => toggleFavorite(obj.id)}
                                    />

                                    {/* <img className='follow-toggle-btn'
                                    src={follow[obj.poster_id] ? '/unfollow_icon.png' : '/follow_icon.png'} alt={follow[obj.poster_id] ? 'unfollow' : 'follow'}
                                    style={{cursor: 'pointer', height: '35px', width: '35px'}} onClick={() => toggleFollow(obj.poster_id)}
                                    /> */}
                                </div>
                            )}

                            {currentUser && currentUser.id === obj.poster_id && (
                                <div className="post-actions">
                                    <img className='reply-toggle-btn'
                                    src='/reply_icon.png' alt='reply_icon'
                                    style={{cursor: 'pointer', height: '35px', width: '35px'}} onClick={() => toggleComments(obj.id)}
                                    />
                                    <OpenModalButton className='delete-post' modalComponent={<DeletePost postId={obj.id}/>}>
                                        <img style={{cursor: 'pointer', height: '30px', width: '30px'}} src='/delete_icon.png' alt='Delete'/>
                                    </OpenModalButton>
                                    <OpenModalButton className='update-post' modalComponent={<UpdatePost postObj={obj}/>}>
                                        <img style={{cursor: 'pointer', height: '30px', width: '30px'}} src='/edit_icon.png' alt='Update'/>
                                    </OpenModalButton>
                                </div>
                            )}
                        </div>
                        {commentsVisible[obj.id] && (
                            <div className="comments-section" style={{marginBottom: '20px', marginLeft: '10px'}}>
                                {commentsByPostId[obj.id]?.length ? (
                                    commentsByPostId[obj.id].map(comment => (
                                        <div key={comment.id} className="comment-block" style={{marginLeft: '10px'}}>

                                            <div className='commenter-block-left'>
                                                <img className='commenter-pic' src={comment?.profile_pic || '/default_profpic.jpg'} alt='prof_pic'/>
                                                <div className='commenter-post-block'>
                                                    <small className='commenter-username'>{comment.username} replied:</small>
                                                    <p className='commenter-reply'>{comment.content}</p>
                                                </div>
                                            </div>

                                            {currentUser && currentUser.id === comment.user_id && (
                                                <div className='commenter-modal-btns' style={{marginRight: '10px'}}>
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
                                    <p style={{marginLeft: '10px'}}>No comments yet.</p>
                                )}
                                <div style={{marginTop: '30px'}}></div>
                                {currentUser && (<OpenModalButton className='post-comment' buttonText='Post Comment' modalComponent={<PostComment postId={obj.id}/>}/>)}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className='post-block-right'>
                <h3 className='post-block-right-title'>Check out these posts</h3>
                <div className='post-block-right-list'>
                    {isLoaded && randomPosts.map(obj => (
                        <div className='post-block-right-features' key={obj.id} onClick={() => handleSidebarClick(obj.id)} style={{cursor: 'pointer'}}>
                            <img className='poster-profpic' style={{height: '50px', width: '50px', marginTop: '5px', marginRight: '5px'}} src={obj?.profile_pic || '/default_profpic.jpg'} alt='prof_pic'/>
                            <div className='post-block-right-textblock'>
                                <p className='poster-username'>{obj.username}</p>
                                <p className='poster-caption'>{obj.body ? obj.body : ``}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='reshuffle-btn-container'>
                    <button className='reshuffle-btn' onClick={reshufflePosts}>Show more posts</button>
                </div>
            </div>
            
        </div>
    </div>
    );
}
