// GET A POST-------------------------------------
const GET_POST_BY_ID = 'post/GET_POST_BY_ID';

const getPostById = (post) => ({
    type: GET_POST_BY_ID,
    post
});

export const getPostByIdThunk = (postId) => async(dispatch) => {
    const res = await fetch(`/api/posts/${postId}`);
    const data = await res.json();
    if(res.ok) dispatch(getPostById(data));
    return data;
};

// CREATE A POST-----------------------------------
const CREATE_POST = 'post/CREATE_POST';

const createPost = (post) => ({
    type: CREATE_POST,
    post
});

export const createPostThunk = (formData) => async(dispatch) => {
    const res = await fetch('/api/posts/new-post', {
        method: 'POST',
        body: formData
    });
    const data = await res.json();
    if(res.ok) dispatch(createPost(data));
    return data;
};


// UPDATE A POST---------------------------------------
const UPDATE_POST = 'post/UPDATE_POST';

const updatePost = (post) => ({
    type: UPDATE_POST,
    post
});

export const updatePostThunk = (postId, formData) => async(dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: formData
    });
    const data = await res.json();
    if(res.ok) dispatch(updatePost(data));
    return data;
};

// DELETE A POST-----------------------------------------
const DELETE_POST = 'post/DELETE_POST';

const deletePost = (post) => ({
    type: DELETE_POST,
    post
});

export const deletePostThunk = (postId) => async(dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });

    console.log('DELETE RES---------------> ', res)
    const data = await res.json();
    if(res.ok) dispatch(deletePost(data));
    return data;
}


const initState = {Posts: [], currentPosts: []};

const postReducer = (state=initState, action) => {
    switch(action.type){
        case GET_POST_BY_ID:
            return {...state, post: action.post};
        // case CREATE_POST:
        //     return {...state, post: action.post};
        case CREATE_POST:
            return { ...state, Posts: [action.post, ...state.Posts] };
        case UPDATE_POST:
            return {...state, post: action.post};
        default:
            return state;
    }
};

export default postReducer;