import {api} from "../../api/api";
import * as types from "../actionTypes/AuthActionTypes";
import jwt from "jwt-decode";
import {TOKEN} from "../../utils/constants";
import {toast} from "react-toastify";
import {me, regisStudent} from "../../api/AuthApi";

export const registration = (payload) => async (dispatch) => {
    try {
        localStorage.clear();
        dispatch({
            type: 'updateState',
            payload: {
                isSuperAdmin: false,
                isStudent: false,
                currentUser: ''
            }
        })
        const res = await dispatch({
            api: regisStudent,
            types: [types.REQUEST_REGIS_START,
                "",
                types.REQUEST_API_ERROR],
            data: payload.v,
        });
        if (res.success) {
            let parsedToken = jwt(res.payload.object.token);
            setTimeout(() => {
                setStateRole(parsedToken.roles, dispatch);
                pushHisPage(parsedToken.roles, payload.history);
            }, 1000);
            localStorage.setItem(
                TOKEN,
                res.payload.object.tokenType + " " + res.payload.object.token
            );
        }
        return true;
    } catch (err) {
        if (err.response) toast.error(err.response.data.message);
        return false;
    }
};

export const logout = () => (dispatch) => {
    dispatch({
        type: types.AUTH_LOGOUT,
    });
};

export const userMe = (payload) => async (dispatch, getState) => {
    const {auth: {currentUser, sentUserMe}} = getState();
    if (sentUserMe || currentUser || !localStorage.getItem(TOKEN)) return;
    try {
        const response = await dispatch({
            api: me,
            types: [
                types.AUTH_GET_CURRENT_USER_REQUEST,
                types.AUTH_GET_USER_TOKEN_SUCCESS,
                types.AUTH_GET_CURRENT_USER_ERROR,
            ],
        });
        if (response.success) {
            dispatch({
                type: "updateState",
                payload: {
                    permissions: response.payload.permissions,
                },
            });
            if (payload) {
                dispatch({
                    type: "updateState",
                    payload: {currentUser: response.payload},
                });
            }
            dispatch({
                type: types.AUTH_GET_USER_TOKEN_SUCCESS,
                payload: response.payload,
            });
            setStateRole(response.payload.roles, dispatch);
        } else {
            dispatch({
                type: types.AUTH_LOGOUT,
            });
        }
    } catch (e) {
        dispatch({
            type: types.AUTH_LOGOUT,
        });
    }
};

const setStateRole = (roles, dispatch) => {
    let roleStatus = ""
    console.log(roles)
    // roles.forEach((item) => {
        if (roles === "STUDENT") {
            dispatch({
                type: "updateState",
                payload: {
                    isSuperAdmin: true,
                    isAdmin: true,
                },
            });
            roleStatus = 'student'
        }
        localStorage.setItem('role', roleStatus);
    // });
};

const pushHisPage = (roles, history) =>     {
    const {push} = history;
    // roles.forEach(({roleName}) => {
        if (roles === "STUDENT") {
            push("/student");
        }
    // });
    window.location.reload();
};