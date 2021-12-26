import * as types from "../actionTypes/AuthActionTypes";
import {loginUser} from "../../api/AuthApi.js";
import {TOKEN} from "../../utils/constants";
import {me} from "../../api/AuthApi";
import {toast} from "react-toastify";
import jwt from "jwt-decode";

export const login = (payload) => async (dispatch) => {
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
            api: loginUser,
            types: [types.REQUEST_AUTH_START,
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
    roles.forEach((item) => {
        if (item.roleName === "SUPER_ADMIN") {
            dispatch({
                type: "updateState",
                payload: {
                    isSuperAdmin: true,
                    isAdmin: true,
                },
            });
            roleStatus = 'superAdmin'
        }
            else if (item.roleName === "ADMIN") {
            dispatch({type: "updateState", payload: {isAdmin: true}});
            roleStatus = 'admin'
        } else if (item.roleName === "TEACHER") {
            dispatch({type: "updateState", payload: {isTeacher: true}});
            roleStatus = 'teacher'
        } else if (item.roleName === "SUPPLIER") {
            dispatch({type: "updateState", payload: {isSupplier: true}});
            roleStatus = 'supplier'
        } else if (item.roleName === "FOUNDER") {
            dispatch({type: "updateState", payload: {isFounder: true}});
            roleStatus = 'founder'
        } else if (item.roleName === "CLIENT") {
            dispatch({type: "updateState", payload: {isClient: true}});
            roleStatus = 'client'
        } else if (item.roleName === "FINANCIER") {
            dispatch({type: "updateState", payload: {isFinancier: true}});
            roleStatus = 'financier'
        } else if (item.roleName === "RECEPTION") {
            dispatch({type: "updateState", payload: {isReception: true}});
            roleStatus = 'reception'
        }
        localStorage.setItem('role', roleStatus);
    });
};

const pushHisPage = (roles, history) =>     {
    const {push} = history;
    roles.forEach(({roleName}) => {
        if (roleName === "SUPER_ADMIN") {
            push("/admin/dashboard");
        } else if (roleName === "TEACHER") {
            push("/admin/teacherId/id");
        } else if (roleName === "FINANCIER") {
            push("/admin/StudentFinance");
        } else if (roleName === "RECEPTION") {
            push("/admin/card");
        } else if (roleName === "ADMIN") {
            push("/admin");
        }
    });
    window.location.reload();
};
