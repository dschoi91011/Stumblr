import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPostByIdThunk} from '../../redux/posts';
import {useParams} from "react-router-dom";
import './OnePost.css';

export default function OnePost(){
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const {postId} = useParams(); 
  const post = useSelector(state => state.posts.post); 

  useEffect(() => {
    const getPost = async(postId) => {
      await dispatch(getPostByIdThunk(postId));
      setIsLoaded(true);
    };
    getPost(postId); 
  }, [dispatch, postId]);

  return(
    isLoaded && (
      <div className="one-post-container">
        <div className="one-post">
          <div className="post-content">
            <p className="post-body">{post.post.body}</p>
            <img className="post-image" src={post.post.picture} alt="Post"/>
          </div>
        </div>
      </div>
    )
  );
}