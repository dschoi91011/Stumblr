import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {getAllPostsThunk} from "../../redux/posts";
import DeletePost from "../DeletePost";
import UpdatePost from "../UpdatePost";
import OpenModalButton from "../OpenModalButton";
import './AllPosts.css';

export default function AllPosts(){
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.Posts);
    const currentUser = useSelector(state => state.session.user);
    // const allUsers = useSelector(state => state)
    const navigate = useNavigate();

    // console.log('POSTS--------------> ', posts);

    useEffect(() => {
        const getAllPosts = async() => {
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

    return(
        <div className="all-posts">
            {currentUser && <button onClick={handleCreatePost}>Create Post</button>}
            {isLoaded && posts.map(obj => (
                <div key={obj.id} style={{ position: 'relative', cursor: 'pointer' }}>
                    <div onClick={() => handleTitleClick(obj.poster_id)}>
                        <h2>{obj.title}</h2>
                        <p>{obj.body}</p>
                        {obj.picture && <img style={{height: "300px", width: "auto"}} src={obj.picture} alt={obj.title}/>}
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
                </div>
            ))}
        </div>
    );
}