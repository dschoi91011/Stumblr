import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getPostByIdThunk } from '../../redux/posts';
import {useParams} from "react-router-dom";
import './OnePost.css';

export default function OnePost(){
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const {postId} = useParams(); 
    const post = useSelector(state => state.posts.post); 

    console.log('POST', post)

    useEffect(() => {
        const getPost = async(postId) => {
            await dispatch(getPostByIdThunk(postId));
            setIsLoaded(true);
        };
        getPost(postId); 
    }, [dispatch, postId]);

    return(
        isLoaded && (
            <div className="one-post">
                <div>
                    {/* <p style={{paddingLeft: '300px', fontSize: '40px', marginTop: '25px'}}>{post.post.body}</p>
                    <img style={{paddingLeft: '300px', marginTop: '-30px'}} src={post.post.picture} alt="picture"/> */}
                    <p style={{fontSize: '40px', marginTop: '25px'}}>{post.post.body}</p>
                    <img style={{marginTop: '-30px'}} src={post.post.picture} alt="picture"/>
                </div>
            </div>
        )
    );
}