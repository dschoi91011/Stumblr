const GET_COMMENTS_FOR_POST = 'comments/GET_COMMENTS_FOR_POST';

const getCommentsForPost = (comments) => ({
    type: GET_COMMENTS_FOR_POST,
    comments
});

export const getCommentsForPostThunk = (id) => async(dispatch) => {
    const res = await fetch(`api/posts/${id}/comments`);
    const data = await res.json();
    if(res.ok) dispatch(getCommentsForPost(data));
    return data;
}

const initState = {};

const commentsReducer = (state=initState, action) => {
    switch(action.type){
        case GET_COMMENTS_FOR_POST:
            return {...state, comments: action.comments};
        default:
            return state;
    }
};

export default commentsReducer;