const GET_COMMENTS_FOR_POST = 'comments/GET_COMMENTS_FOR_POST';

const getCommentsForPost = (postId, comments) => ({
    type: GET_COMMENTS_FOR_POST,
    postId,
    comments
});

export const getCommentsForPostThunk = (postId) => async(dispatch) => {
    const res = await fetch(`api/posts/${postId}/comments`);
    const data = await res.json();
    if(res.ok) dispatch(getCommentsForPost(postId, data.comments));
    return data;
}

//GET A COMMENT BY ID-------------------------------------------------
const GET_COMMENT = 'comment/GET_COMMENT';

const getComment = (comment) => ({
    type: GET_COMMENT,
    comment
});

export const getCommentThunk = (id) => async(dispatch) => {
    const res = await fetch(`api/comments/${id}`);
    const data = await res.json();
    if(res.ok) dispatch(getComment(data));
    return data;
}

//CREATE A COMMENT----------------------------------------------------
const CREATE_COMMENT = 'comment/CREATE_COMMENT';

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
});

// export const createCommentThunk = (id, comment) => async(dispatch) => {
//     const res = await fetch(`api/posts/${id}/comments/new`, {
//         method: 'POST',
//         headers: {'Content-Type': 'appliation/json'},
//         body: JSON.stringify(comment)
//     });
//     const data = await res.json();
//     if(res.ok) dispatch(createComment(data));
//     return data;
// }

export const createCommentThunk = (postId, comment) => async(dispatch) => {
    try {
        const res = await fetch(`/api/posts/${postId}/comments/new`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(comment)
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(createComment(data));
            return data;
        } else {
            const error = await res.json();
            return { error };
        }
    } catch (err) {
        return { error: err.message };
    }
};

//UPDATE A COMMENT-----------------------------------------------------
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT';

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
});

export const updateCommentThunk = (id, comment) => async(dispatch) => {
    const res = await fetch(`api/comments/${id}`, {
        method: 'PUT',
        headers: {'COntent-Type': 'application/json'},
        body: JSON.stringify(comment)
    });
    const data = await res.json();
    if(res.ok) dispatch(updateComment(data));
    return data;
};

//DELETE A COMMENT-----------------------------------------------------
const DELETE_COMMENT = 'comment/DELETE_COMMENT';

const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment
});

// export const deleteCommentThunk = (id) => async(dispatch) => {
//     const res = await fetch(`api/comments/${id}`, {
//         method: 'DELETE'
//     });
//     const data = await res.json();
//     if(res.ok) dispatch(deleteComment(data));
//     return data;
// };

export const deleteCommentThunk = (id) => async(dispatch) => {
    try {
        const res = await fetch(`/api/comments/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        if(res.ok) {
            dispatch(deleteComment(data)); // Dispatch action with the deleted comment
            return data;
        } else {
            const error = await res.json();
            return { error };
        }
    } catch (err) {
        return { error: err.message };
    }
};



const initState = {byPostId: {}};

const commentsReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_COMMENTS_FOR_POST:
            return {...state, byPostId: {...state.byPostId, [action.postId]: action.comments,}};
        case GET_COMMENT:
        case CREATE_COMMENT: {
            const postId = action.comment.post_id;
            return {...state, byPostId: {...state.byPostId, [postId]: [...(state.byPostId[postId] || []), action.comment]}};
        }
        case UPDATE_COMMENT: {
            const comment = action.comment;
            const postId = comment.post_id;
            return {...state, byPostId: {...state.byPostId, [postId]: [...(state.byPostId[postId] || []), comment]}};
        }
        // case DELETE_COMMENT: {
        //     const commentId = action.commentId;
        //     const postId = Object.keys(state.byPostId).find(postId =>
        //         state.byPostId[postId].some(comment => comment.id === commentId)
        //     );
        //     if (!postId) return state;
        //     return {...state, byPostId: {...state.byPostId, [postId]: state.byPostId[postId].filter(comment => comment.id !== commentId)}};
        // }
        case DELETE_COMMENT: {
            const commentId = action.comment.id;
            const newState = {...state};
            Object.keys(newState.byPostId).forEach(postId => {
                newState.byPostId[postId] = newState.byPostId[postId].filter(comment => comment.id !== commentId);
            });
            return newState;
        }
        default:
            return state;
    }
};

export default commentsReducer;