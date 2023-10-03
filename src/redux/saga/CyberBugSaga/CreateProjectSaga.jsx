import { call, delay, put, select, takeLatest } from "redux-saga/effects"
import { CREATE_PROJECT_SAGA } from "../../constants/CyberBug/CreateProject"
import { cyberBugServices } from "../../../services/CyberBugServices"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/CyberBug/GlobalLoading/GlobalLoading"
import { STATUS_CODE } from "../../../util/constants/settingSystem"


function * createProject (action){

    yield put({
        type:DISPLAY_LOADING
    })
    yield delay(500)

    try {
        let {data,status}=yield call (()=> cyberBugServices.createProjectAuthorization(action.newProject))
        let history=yield select (state=> state.HistoryReducer.history);
        if(status===STATUS_CODE.SUCCESS){
            history.push('/management')
        }
    } catch (error) {
        console.log(error.response.data)
    }
    yield put({
        type:HIDE_LOADING
    })
}


export function * theoDoiCreateProject(){
    yield takeLatest (CREATE_PROJECT_SAGA,createProject)
}
