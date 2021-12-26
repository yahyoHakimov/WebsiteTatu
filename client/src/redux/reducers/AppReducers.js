import * as types from "../actionTypes/AppActionTypes";
import {createReducer} from "../../utils/StoreUtils";

const initState = {
    attachmentUrl: "http://localhost/api/attachment/",
    loading: false,
    durationTypes: [],
    secondPage: false,
    showSchedule: true,
    showModal: false,
    showModal1: false,
    showChangeModal: false,
    discountModal: false,
    deleteModal: false,
    deleteImgModal: false,
    deleteModal1: false,
    profession: [],
    regions: [],
    books: [],
    allbooks: [],
    publishs: [],
    attachmetId: '',
    bookName: '',
    attachment: [],
    writer: [],
    searchItems: [],
    getItems: [],
    size: 20,
    page: 0,
    type: '',
    totalElements: 0,
    totalPages: 0,
    readModal: false,
    showAddGroupModal: false,
    changeStatusModal: false,
    carouselModal: false,
    attachmentId: '',
    currentItem: [],
    dailySchedule: [],
    weeklySchedule: [],
    dashboardStat: [],
    studentStat: [],
    sana: [],
    multiLineStat: [],
    sortAges: [],
    selectExcel: [],
    byCource: [],
    sortReklama: [],
    employees: [],
    booksCategoriesWithBooks: [],
    newBooks: [],
    allInCategory: [],
    booksByType: [],
    booksOrderOption: [],
    allActiveBook: [],
    allClient: [],
    allOrder: [],
    allPrice: [],
    verySell: [],
    selectbook: [],
    carousel: [],
    oneCarousel: [],
    studentList: [],
    student: []
};

const reducers = {
    [types.REQUEST_START](state) {
        state.loading = true;
    },
    [types.REQUEST_ERROR](state) {
    },
    [types.REQUEST_SUCCESS](state) {
        state.loading = false
        state.showModal = false
        state.deleteModal = false
        state.deleteImgModal = false
        state.changeToArchiveModal = false
        state.changeToActiveModal = false
    },

    //Attachment
    [types.REQUEST_ATTACHMENT_SUCCESS](state, payload) {
        state.attachmentId = payload
    },
    [types.REQUEST_GET_FILE_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object && payload.payload.object.object) {
            state.attachment = payload.payload.object.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
        }
        let bolta = []
        for (let i = 0; i < state.attachment.length; i++) {
            bolta.push({value: state.attachment[i].id, label: state.attachment[i].name})
        }
        state.selectItems = bolta
    },

    [types.REQUEST_GET_STUDENT_SUCCESS] (state, payload) {
        console.log(payload);
        if (payload && payload.payload && payload.payload.object) {
            state.studentList = payload.payload.object
            console.log(state.studentList)
        }
    },

    [types.REQUEST_GET_ONE_STUDENT_SUCCESS] (state, payload) {
        state.student = payload.payload.object
        console.log(payload)
        if (payload && payload.payload && payload.payload.object && payload.payload.object.object) {
            let data = payload.payload.object
            console.log(data);
            data.map((item,i) => {
                let obj = {
                    id: 0,
                    name: "",
                    sourName: "",
                    address: "",
                    flatAddress: "",
                    phoneNumber: "",
                    parentNumber: "",
                    description: "",
                    number: ""
                }
                obj.id = item.id;
                obj.name = item.name;
                obj.sourName = item.sourName;
                obj.address = item.address;
                obj.flatAddress = item.flatAddress;
                obj.phoneNumber = item.phoneNumber;
                obj.parentNumber = item.parentNumber;
                obj.description = item.description;
                obj.number = item.number;
                state.student.push(obj)
            })
        }
    },
    updateState(state, {payload}) {
        return {
            ...state,
            ...payload,
        };
    },
};

export default createReducer(initState, reducers);
