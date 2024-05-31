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

export const createCommentThunk = (id, comment) => async(dispatch) => {
    const res = await fetch(`api/posts/${id}/comments/new`, {
        method: 'POST',
        headers: {'Content-Type': 'appliation/json'},
        body: JSON.stringify(comment)
    });
    const data = await res.json();
    if(res.ok) dispatch(createComment(data));
    return data;
}

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

export const deleteCommentThunk = (id) => async(dispatch) => {
    const res = await fetch(`api/comments/${id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if(res.ok) dispatch(deleteComment(data));
    return data;
};

const initState = {};

const commentReducer = (state=initState, action) => {
    switch(action.type){
        case GET_COMMENT:
            return {...state, comment: action.comment};
        case CREATE_COMMENT:
            return {...state, comment: action.comment};
        case UPDATE_COMMENT:
            return {...state, comment: action.comment};
        case DELETE_COMMENT:
            return {...state, comment: action.comment};
        default:
            return state;
    }
};

export default commentReducer;