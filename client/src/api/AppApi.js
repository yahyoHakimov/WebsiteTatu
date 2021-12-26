import HttpClient from "../utils/HttpClient";
import {api} from './api';

export const registrationApi = (data) => {
    return HttpClient.doPost(api.registration + data)
}

export const getStudentListApi = () => {
    return HttpClient.doGet(api.students + '/list')
}
export const addStudentDocumentApi = (data) => {
    return HttpClient.doPost(api.students,data)
}

export const getStudentApi = () => {
    return HttpClient.doGet(api.students)
}
// Attachment CRUD Start
export const uploadFileAppApi = (data) => {
    console.log(data)
    return HttpClient.doPost(api.addAttachment, data);
};
export const getFileAppApi = (data) => {
    return HttpClient.doGet(api.getAttachment);
};
export const deleteImgApi = (data) => {
    return HttpClient.doDelete(api.book + "/attachment/" + data);
}
export const deletePublishImgApi = (data) => {
    console.log(data)
    return HttpClient.doDelete(api.publish + "/attachment/" + data);
}
export const getOneAttachmentApi = (data) => {
    return HttpClient.doGet(api.attachment + "/" + data.id)
}
// Attachment CRUD End

