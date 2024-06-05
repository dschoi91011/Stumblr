import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPostsThunk} from "../../redux/posts";
// import {getCommentsForPostThunk} from "../../redux/comments"; 
import {useParams} from "react-router-dom";
import './UserPosts.css';

export default function UserPosts(){
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const currentPosts = useSelector((state) => state.posts.currentPosts);
  // const commentsByPostId = useSelector(state => state.comments.byPostId);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getCurrentPostsThunk(userId));
      setIsLoaded(true);
    };
    fetchData();
  }, [dispatch, userId]);


  return(
    <div className="user-posts">
      {isLoaded && (
        <div className='userpost-prof-block'>
          <img className='userpost-profpic' style={{ height: "50px", width: "50px", marginTop: '5px', marginRight: '5px' }} src={currentPosts[0].profile_pic || '/default_profpic.jpg'} alt="Profile Pic"/>
          <p>{currentPosts[0].username}</p>
        </div>
      )}
      {isLoaded && currentPosts.length && currentPosts.map((post) => (
        <div key={post.id} className='userpost-block'>
          {post.picture && 
          (<div className='userpost-img-container'>
              <img className='userpost-img' src={post.picture} alt={post.title}/>
          </div>)
          }
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}