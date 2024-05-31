import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsThunk } from "../../redux/posts";

export default function AllPosts() {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.Posts);

    console.log('POSTS--------------> ', posts);

    useEffect(() => {
        const getAllPosts = async () => {
            await dispatch(getAllPostsThunk());
            setIsLoaded(true);
        };
        getAllPosts();
    }, [dispatch]);

    return(
        <div className="all-posts">
            {isLoaded && posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    {post.picture && <img style={{ height: "300px", width: "auto" }} src={post.picture} alt={post.title} />}
                </div>
            ))}
        </div>
    );
}