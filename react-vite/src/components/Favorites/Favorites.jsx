import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getFavoritePostsThunk} from '../../redux/posts';
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


    return(
        <div className='favorites-container'>
            <h2 className='favorites-title'>Your Favorite Posts</h2>
            <div className='favorite-posts-list'>
                {isLoaded && favoritePosts && favoritePosts.length > 0 ? (
                favoritePosts.map(post => (
                    <div className='favorite-post' key={post.id} onClick={() => handlePostClick(post.id)}>
                        <div className='favorite-post-img-container'>
                            <img className='favorite-post-image' src={post.picture} alt='post-img'/>
                        </div>
                        <p className='favorite-post-body'>{post.body}</p>
                        <p className='favorite-post-username'>Posted by: {post.username}</p>
                    </div>
              ))
            ) : (
              <p>No favorite posts found.</p>
            )}
          </div>
        </div>
      );
}
