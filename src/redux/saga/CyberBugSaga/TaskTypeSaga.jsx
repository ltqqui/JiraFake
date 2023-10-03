import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_REDUCER } from "../../constants/CyberBug/TaskTypeConst";
import { taskTypeServices } from "../../../services/TaskTypeServices";
import { STATUS_CODE } from "../../../util/constants/settingSystem";

function * getAllTaskType(action){
    try {
        const{data, status}=yield call(()=> taskTypeServices.getAllTaskType());
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:GET_ALL_TASK_TYPE_REDUCER,
                arrTaskType:data.content
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export function *  theoDoiGetAllTaskType(){
    yield takeLatest(GET_ALL_TASK_TYPE, getAllTaskType)
}