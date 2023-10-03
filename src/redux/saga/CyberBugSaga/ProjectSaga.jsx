import { call, delay, put, takeLatest } from "redux-saga/effects";
import { DELETE_PROJECT, GET_ALL_PROJECT, GET_ALL_PROJECT_IN_CREATE_TASK, GET_ALL_PROJECT_IN_CREATE_TASK_REDUCER, GET_PROJECT_DETAIL, GET_PROJECT_DETAIL_REDUCER, PUT_PROJECT_DETAIL_REDUCER, UPDATE_PROJECT } from "../../constants/CyberBug/ProjectConst";
import { cyberBugServices } from "../../../services/CyberBugServices";
import { STATUS_CODE, TOKEN } from "../../../util/constants/settingSystem";
import { SET_PROJECT_REDUCER } from "../../constants/CyberBug/ProjectConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/CyberBug/GlobalLoading/GlobalLoading";
import { CLOSE_DRAWER } from "../../constants/CyberBug/DrawerConst";
import { projectServices } from "../../../services/ProjectServices";
import { notificationFunction } from "../../../util/Notification/NotificationCyberBugs";
import { GET_USER_BY_PROJECT_ID } from "../../constants/CyberBug/CyberBugConst";


function* getAllProject(action) {
    try {
        let { data, status } = yield call(() => cyberBugServices.getAllProject());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: SET_PROJECT_REDUCER,
                allProject: data.content
            })
        }
    } catch (error) {
        console.log(error)
    }
}


export function* theoDoiGetAllProject() {
    yield takeLatest(GET_ALL_PROJECT, getAllProject)
}


function* updateProject(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try {
        let { data, status } = yield call(() => cyberBugServices.updateProject(action.projectUpdate))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT
            })
            yield put({
                type: CLOSE_DRAWER
            })
        }
    } catch (error) {
        console.log(error.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiUpdateProject() {
    yield takeLatest(UPDATE_PROJECT, updateProject)
}



function* deleteProject(action) {

    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try {
        const { data, status } = yield call(() => projectServices.deleteProject(action.projectId))
        console.log(data)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_ALL_PROJECT
            })
            notificationFunction('success', 'Delete project successfully !')
        }
        else {
        notificationFunction('error','Delete project fail !')
        }
    } catch (error) {
        notificationFunction('error', 'Delete project fail !')
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiDeleteProject() {
    yield takeLatest(DELETE_PROJECT, deleteProject)
}


function * getProjectDetailSaga(action ){
    yield put({
        type:DISPLAY_LOADING
    })
    yield delay (500)
    try {
        const {data, status}=yield call(()=> projectServices.getProjectDetail(action.projectId))
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:PUT_PROJECT_DETAIL_REDUCER,
                projectDetail:data.content
            })
        }
    } catch (error) {
            // console.log(error.response.data)
    }
    yield put({
        type:HIDE_LOADING
    })
}

export function * theoDoiGetProjecDetailtSaga(){
    yield takeLatest (GET_PROJECT_DETAIL, getProjectDetailSaga)
}



function * getAllProjectInCreateTaskSaga(action){
        try {
            const {data, status}=yield call(()=>projectServices.getAllProjectInCreateTask())
            if(status===STATUS_CODE.SUCCESS){
                yield put({
                    type:GET_ALL_PROJECT_IN_CREATE_TASK_REDUCER,
                    arrProject:data.content
                })

               yield put({
                type:GET_USER_BY_PROJECT_ID,
                idProject:data.content[0].id
               })
            }
        } catch (error) {
            console.log(error)
        }
}

export function * theoDoiGetAllProjectInCreateTask(){
    yield takeLatest(GET_ALL_PROJECT_IN_CREATE_TASK, getAllProjectInCreateTaskSaga)
}
