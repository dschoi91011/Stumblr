import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPostsThunk} from "../../redux/posts";
import {useParams, useNavigate} from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import './UserPosts.css';

export default function UserPosts(){
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPosts = useSelector((state) => state.posts.currentPosts);
  const {userId} = useParams();

  useEffect(() => {
    const fetchData = async() => {
      await dispatch(getCurrentPostsThunk(userId));
      setIsLoaded(true);
    };
    fetchData();
  }, [dispatch, userId]);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
}

  if(!isLoaded){
    return <LoadingScreen/>;
  }

  return(
    <div className="user-posts-container">
      {isLoaded && (
        <div className='userpost-prof-block'>
          <img className='userpost-profpic' src={currentPosts[0].profile_pic || '/default_profpic.jpg'} alt="Profile Pic"/>
          <div className='userpost-owner-block'>
            <p className='userpost-owner'>All posts by</p>
            <p className='userpost-owner' style={{fontWeight: 'bolder'}}>{currentPosts[0].username}</p>
          </div>
        </div>
      )}
      {isLoaded && currentPosts.length && currentPosts.map(obj => (
        <div key={obj.id} className='userpost-block'>
          {obj.picture && 
          (<div className='userpost-img-container' style={{cursor: 'pointer'}} onClick={() => handlePostClick(obj.id)}>
              <img className='userpost-img' src={obj.picture} alt='picture'/>
          </div>)
          }
          <p className='userpost-caption'>{obj.body}</p>
        </div>
      ))}
    </div>
  );
}