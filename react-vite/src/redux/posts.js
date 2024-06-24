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

export const getCurrentPostsThunk = (userId) => async(dispatch) => {
    const res = await fetch(`/api/posts/user/${userId}/posts`);
    const data = await res.json();
    if(res.ok) dispatch(getCurrentPosts(data));
    return data;
  };



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

    const data = await res.json();
    if(res.ok) dispatch(deletePost(data));
    return data;
}

// GET FAVORITE POSTS---------------------------------------
const GET_FAVORITE_POSTS = 'posts/GET_FAVORITE_POSTS';

const getFavoritePosts = (posts) => ({
    type: GET_FAVORITE_POSTS,
    posts
});

export const getFavoritePostsThunk = () => async(dispatch) => {
    const res = await fetch('/api/posts/favorites');
    const data = await res.json();
    if(res.ok) dispatch(getFavoritePosts(data));
    return data;
};

// CREATE FAVORITE POST---------------------------------------
const ADD_FAVORITE = 'posts/ADD_FAVORITE';

const addFavorite = (post) => ({
    type: ADD_FAVORITE,
    post,
});

export const addFavoriteThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/favorite`, {
        method: 'POST',
    });
    const data = await res.json();
    if (res.ok) dispatch(addFavorite(data));
    return data;
};

//DELETE FAVORITE POST----------------------------------------
const REMOVE_FAVORITE = 'posts/REMOVE_FAVORITE';

const removeFavorite = (postId) => ({
    type: REMOVE_FAVORITE,
    postId,
});

export const removeFavoriteThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/favorite`, {
        method: 'DELETE',
    });
    if (res.ok) dispatch(removeFavorite(postId));
};

//SELECTOR------------------------------------------------------
// export const selectFavoritePostIds = (state) => state.posts.favorites.map((post) => post.id);

//REDUCER---------------------------------------------------------
const initState = {Posts: [], currentPosts: [], favorites: []};

const postsReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_POST_BY_ID:
            return { ...state, post: action.post };
        case CREATE_POST:
            return { ...state, post: action.post };
        case UPDATE_POST:
            return { ...state, post: action.post };
        case GET_ALL_POSTS:
            return { ...state, posts: action.posts.posts };
        case GET_CURRENT_POSTS:
            return { ...state, currentPosts: action.posts.posts };
        case GET_FAVORITE_POSTS:
            return { ...state, favorites: action.posts };
        // case ADD_FAVORITE:
        //     return { ...state, favorites: [...state.favorites, action.post] };
        // case REMOVE_FAVORITE:
        //     return { ...state, favorites: state.favorites.filter(post => post.id !== action.postId) };
        case ADD_FAVORITE: {
            const updatedPosts = state.posts.map(post => {
                if (post.id === action.post.id) {
                    return { ...post, isLiked: true };
                }
                return post;
            });
            return { ...state, posts: updatedPosts, favorites: [...state.favorites, action.post] };
        }
        
        case REMOVE_FAVORITE: {
            const updatedPosts = state.posts.map(post => {
                if (post.id === action.postId) {
                    return { ...post, isLiked: false };
                }
                return post;
            });
            return { ...state, posts: updatedPosts, favorites: state.favorites.filter(post => post.id !== action.postId) };
        }
          
        default:
            return state;
    }
};

export default postsReducer;