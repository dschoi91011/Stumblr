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
    const getUserPosts = async() => {
      await dispatch(getCurrentPostsThunk(userId));
      setIsLoaded(true);
    };
    getUserPosts();
  }, [dispatch, userId]);

  return (
    <div className="user-posts">
      {isLoaded && currentPosts.length > 0 &&
        <div>
          <img style={{ height: "50px", width: "50px", marginTop: '5px', marginRight: '5px' }} src={currentPosts[0]?.profile_pic} alt="Profile Pic"/>
          <p>{currentPosts[0].username}</p>
          {currentPosts.slice(0).reverse().map((post) => (
            <div key={post.id}>
              <p>{post.body}</p>
              {post.picture && (
                <img
                  style={{ height: "300px", width: "auto" }}
                  src={post.picture}
                  alt={post.title}
                />
              )}
            </div>
          ))}
        </div>
      }
    </div>
  );
}