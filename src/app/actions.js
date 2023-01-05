import axios from "axios";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const FETCH_USER_DETAILS_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_DETAILS_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_DETAILS_FAILURE = "FETCH_USER_FAILURE";

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_USERS_REQUEST });

        axios
            .get("https://reqres.in/api/users")
            .then((response) => {
                dispatch({
                    type: FETCH_USERS_SUCCESS,
                    payload: response.data.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_USERS_FAILURE,
                    error: error.message,
                });
            });
    };
};

export const fetchUserDetails = (id) => {
    return (dispatch) => {
        dispatch({ type: FETCH_USER_DETAILS_REQUEST });

        axios
            .get(`https://reqres.in/api/users/${id}`)
            .then((response) => {
                dispatch({
                    type: FETCH_USER_DETAILS_SUCCESS,
                    payload: response.data.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_USER_DETAILS_FAILURE,
                    error: error.message,
                });
            });
    };
};
