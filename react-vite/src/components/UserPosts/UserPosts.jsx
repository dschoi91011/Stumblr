import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPostsThunk} from "../../redux/posts";
import {useParams} from "react-router-dom";

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

  return(
    <div className="user-posts">
      {isLoaded &&
        currentPosts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
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
  );
}