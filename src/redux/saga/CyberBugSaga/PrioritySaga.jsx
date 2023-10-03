import { call, put, takeLatest } from "redux-saga/effects"
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_REDUCER } from "../../constants/CyberBug/PriorityConst"
import { priorityServices } from "../../../services/PriorityServices"
import { STATUS_CODE } from "../../../util/constants/settingSystem"



function * getAllPrioritySaga(action){
    try {
        const {data, status}=yield call(()=>priorityServices.getAllPriority())
        if(status===STATUS_CODE.SUCCESS){
            console.log()
            yield put({
                type:GET_ALL_PRIORITY_REDUCER,
                arrPriority: data.content
            })
        }
    } catch (error) {
        
    }
}

export function * theoDoigetAllPrioritySaga(){
    yield takeLatest(GET_ALL_PRIORITY,getAllPrioritySaga)
}