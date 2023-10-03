import { call, takeLatest,takeEvery, put } from "redux-saga/effects";
import { cyberBugServices } from "../../../services/CyberBugServices";
import { GET_ALL_PROJECT_CATEGORY, GET_PROJECT_CATEGORY_REDUX } from "../../constants/CyberBug/ProjectCategory";
import { STATUS_CODE } from "../../../util/constants/settingSystem";




function * getProjectCategory(action){
   
    try {
        const {data,status}=yield call(()=>cyberBugServices.getAllProjectCategory())
        if(status===STATUS_CODE.SUCCESS){
            yield put ({
                type:GET_PROJECT_CATEGORY_REDUX,
                data:data.content
            })
        }
    } catch (error) {
        console.log(error.response.data)
    }
}


export function * theoDoiGetProjectCategory(){
    yield takeEvery(GET_ALL_PROJECT_CATEGORY, getProjectCategory)
}