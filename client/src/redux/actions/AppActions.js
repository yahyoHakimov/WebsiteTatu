import * as types from "../actionTypes/AppActionTypes";
import * as app from "../../api/AppApi";

import {
    getFileAppApi,
    deleteImgApi,
    getOneAttachmentApi,
    uploadFileAppApi,
    deletePublishImgApi, addStudentDocumentApi, getStudentApi, getStudentListApi,
} from "../../api/AppApi";
import {toast} from "react-toastify";

export const addStudentAction = (data) => (dispatch) => {
    console.log(data)
    dispatch({
        api: addStudentDocumentApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_ADD_STUDENT_SUCCESS,
            types.REQUEST_ERROR
        ], data: data
    }).then((res) => {
        toast.success("Malumot saqlandi va shaxsiy kabinetingiz ochildi.")
        // dispatch(getStudentAction())
    }).catch((err) => {
        toast.error("Error!!!")
    })
}
export const getStudentAction = (data) => (dispatch) => {
    dispatch({
        api: getStudentApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_STUDENT_SUCCESS,
            types.REQUEST_ERROR
        ],data
    })
}
export const getStudentOneList = (data) => (dispatch) => {
    dispatch({
        api: getStudentListApi,
        types : [
            types.REQUEST_START,
            types.REQUEST_GET_ONE_STUDENT_SUCCESS,
            types.REQUEST_ERROR
        ], data
    })
}

export const uploadFileAction = (payload) => async (dispatch) => {
    if (!payload || !(payload.type.substring(0, payload.type.indexOf("/")) === "image")) {
        toast.error("File must be img")
        return "";
    }
    let obj = new FormData();
    obj.append("file", payload)
    dispatch({
        api: uploadFileAppApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_ATTACHMENT_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: obj
    }).then(res => {
        dispatch({
            type: "updateState",
            payload: {
                attachmentId: res.payload
            }
        })
    }).catch(err => err)
}
export const getUploadAction = (payload) => (dispatch) => {
    dispatch({
        api: getFileAppApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_FILE_SUCCESS,
            types.REQUEST_ERROR
        ]
    })
}
export const deleteImgAction = (data) => (dispatch) => {
    dispatch({
        api: deleteImgApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ], data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
        toast.success("Malumot o`chirildi")
        dispatch(getUploadAction())
    }).catch((err) =>
        toast.error("Qandaydir xatolik")
    )
}

export const deletePublishImgAction = (data) => (dispatch) => {
    dispatch({
        api: deletePublishImgApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ], data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
        toast.success("Malumot o`chirildi")
        dispatch(getUploadAction())
    }).catch((err) =>
        toast.error("Qandaydir xatolik")
    )
}
export const getOneAttachmentAction = (data) => (dispatch) => {
    dispatch({
        api: getOneAttachmentApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_ONE_FILE_SUCCESS,
            types.REQUEST_ERROR
        ], data
    })
}
// Attachment Action End