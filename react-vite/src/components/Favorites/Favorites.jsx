import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getFavoritePostsThunk} from '../../redux/posts';
import LoadingScreen from "../LoadingScreen";
import './Favorites.css';

export default function Favorites(){
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favoritePosts = useSelector(state => state.posts.favorites.favorites);

    // console.log('FAVPOSTS------------>', favoritePosts)

    useEffect(() => {
        const getAllFavorites = async() => {
            await dispatch(getFavoritePostsThunk());
            setIsLoaded(true);
        };
        getAllFavorites();
    }, [dispatch]);

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    if(!isLoaded){
        return <LoadingScreen/>;
    }

    return(
        <div className='favorites-container'>
            <h3 className='favorites-title' style={{fontSize: '40px'}}>Your Favorite Posts</h3>
            <div className='favorite-posts-list'>

                {isLoaded && favoritePosts && favoritePosts.length > 0 ? (
                favoritePosts.map(post => (
                <div className='favorite-post-container' key={post.id}>
                    <div className='favorite-post-header'>
                        <img className='poster-profpic' src={post?.profile_pic || '/default_profpic.jpg'} alt='prof_pic'/>
                        <p className='post-username'>{post.username}</p>
                    </div>
                    <div className='favorite-post-img-container' onClick={() => handlePostClick(post.id)} style={{cursor: 'pointer'}}>
                        <img className='favorite-post-image' src={post.picture} alt='post-img'/>
                    </div>
                    <p className='favorite-post-body' style={{fontSize: '20px'}}>{post.body}</p>
                </div>
              ))
            ) : (
                <div className='favorites-none'>
                    <p>You have not liked any posts.</p>
                </div>
            )}
          </div>
        </div>
      );
}
