// GET ALL POSTS-------------------------------------------------------------
const GET_ALL_POSTS = 'posts/GET_ALL_POSTS';

const getAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    posts
});

export const getAllPostsThunk = () => async(dispatch) => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    if(res.ok) dispatch(getAllPosts(data));
    return data;
}

// GET CURRENT USER POSTS-----------------------------------------------------
const GET_CURRENT_POSTS = 'posts/GET_CURRENT_POSTS';

const getCurrentPosts = (posts) => ({
    type: GET_CURRENT_POSTS,
    posts
});

export const getCurrentPostsThunk = () => async(dispatch) => {
    const res = await fetch('/api/posts/my-posts');
    const data = await res.json();
    if(res.ok) dispatch(getCurrentPosts(data));
    return data;
}

const initState = {};

const postsReducer = (state=initState, action) => {
    switch(action.type){
        case GET_ALL_POSTS:
            return {...state, Posts: action.posts};
        case GET_CURRENT_POSTS:
            return {...state, currentPosts: action.posts};
        default:
            return state;
    }
};

export default postsReducer;