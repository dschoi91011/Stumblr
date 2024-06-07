import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPostsThunk} from "../../redux/posts";
import {useParams} from "react-router-dom";
import './UserPosts.css';

export default function UserPosts(){
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const currentPosts = useSelector((state) => state.posts.currentPosts);
  const {userId} = useParams();

  useEffect(() => {
    const fetchData = async() => {
      await dispatch(getCurrentPostsThunk(userId));
      setIsLoaded(true);
    };
    fetchData();
  }, [dispatch, userId]);

  return(
    <div className="user-posts-container">
      {isLoaded && (
        <div className='userpost-prof-block'>
          <img className='userpost-profpic' style={{height: "50px", width: "50px", marginTop: '5px', marginRight: '5px'}} src={currentPosts[0].profile_pic || '/default_profpic.jpg'} alt="Profile Pic"/>
          <p>{currentPosts[0].username}</p>
        </div>
      )}
      {isLoaded && currentPosts.length && currentPosts.map(obj => (
        <div key={obj.id} className='userpost-block'>
          {obj.picture && 
          (<div className='userpost-img-container'>
              <img className='userpost-img' src={obj.picture} alt='picture'/>
          </div>)
          }
          <p>{obj.body}</p>
        </div>
      ))}
    </div>
  );
}