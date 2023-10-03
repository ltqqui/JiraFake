import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_STATUS, GET_ALL_STATUS_REDUCER } from "../../constants/CyberBug/StatusConst";
import { statusServices } from "../../../services/StatusServices";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { UPDATE_STATUS } from "../../constants/CyberBug/TaskConst";
import { GET_PROJECT_DETAIL } from "../../constants/CyberBug/ProjectConst";

function * getAllStatusSaga(action){
    try {
        const {data, status}= yield call(()=> statusServices.getAllStatus())
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:GET_ALL_STATUS_REDUCER,
                arrStatus: data.content
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export function * theoDoiGetAllStatusSaga(){
    yield takeLatest(GET_ALL_STATUS, getAllStatusSaga)
}


function * updateStatusSaga (action){
    const {statusUpdate, projectId}=action
    try {
        const {data,status}= yield call(()=> statusServices.updateStatus(statusUpdate));
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:GET_PROJECT_DETAIL,
                projectId:projectId
            })
        }   
    } catch (error) {
        console.log(error)
    }
}

export function * theoDoiUpdateTaskSaga(){
    yield takeLatest (UPDATE_STATUS, updateStatusSaga)
}

