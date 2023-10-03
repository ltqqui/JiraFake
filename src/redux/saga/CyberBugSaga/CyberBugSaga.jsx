import { all, call, delay, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { ASSIGN_USER_PROJECT, DELETE_USER_MANAGEMENT, EDIT_USER_MANAGEMENT, GET_ALL_USER, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_REDUCER, GET_USER_REDUCER, GET_USER_SAGA, LOGIN, REMOVE_FORM_USER, USER_REGISTER, USER_SIGNIN_API } from '../../constants/CyberBug/CyberBugConst'
import { cyberBugServices } from '../../../services/CyberBugServices'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/CyberBug/GlobalLoading/GlobalLoading'
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem'
import { userServices } from '../../../services/UserServices'
import { projectServices } from '../../../services/ProjectServices'
import { GET_ALL_PROJECT } from '../../constants/CyberBug/ProjectConst'
import { CLOSE_DRAWER } from '../../constants/CyberBug/DrawerConst'
import { notificationFunction } from '../../../util/Notification/NotificationCyberBugs'


function* signinSaga(action) {

    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try {
        const { status, data } = yield cyberBugServices.signinCyberBugs(action.userLogin)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
        localStorage.setItem(TOKEN, data.content.accessToken)
        if (status === STATUS_CODE.SUCCESS) {
            let history = yield select(state => state.HistoryReducer.history);
            yield put({
                type: LOGIN,
                userLogin: data.content
            })
            history.push('/')
            console.log(123)
        }

        console.log(data)
    } catch (error) {
        console.log(error.response.data)
    }

    yield put({
        type: HIDE_LOADING
    })
}



export function* theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga)
}



function * registerSaga(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try {
        let history = yield select(state => state.HistoryReducer.history);
        const {data, status}=yield call (()=> userServices.registerUser(action.userRegister));
        console.log(data)
        history.push('/login')
    } catch (error) {
        console.log(error)
    }
    yield put({
        type: HIDE_LOADING
    })
}


export function *theoDoiRegisterSaga (){
    yield takeLatest(USER_REGISTER, registerSaga)
}

function* getUser(action) {
    try {
        const { data, status } = yield call(() => userServices.getUser(action.keyWord));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_REDUCER,
                listUser: data.content
            });
        }
    } catch (error) {
        console.log(error.response.data);
    }
}


export function* theoDoiGetUser() {
    yield takeLatest(GET_USER_SAGA, getUser);
}

function * deleteUserManagementSaga(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try {
        const {data, status}=yield call(()=>userServices.deleteUserManagement(action.userId));
        console.log(data);
        if(status===STATUS_CODE.SUCCESS){
            notificationFunction('success', 'Delete user successful !');
            yield put({
                type:GET_USER_SAGA,
                keyWord:''
            })
        }
        else {
            notificationFunction('error', 'Delete user fail !');
        }
    } catch (error) {
        notificationFunction('error', 'Delete user fail !');
        console.log(error)
    }
    yield put({
        type: HIDE_LOADING
    })
}


function * editUserManagementSaga(action ){
    console.log(action.userEdit)
    yield put({
        type:DISPLAY_LOADING
    }) 
    yield delay(500)

    try {
        const {data, status}=yield call(()=>userServices.updateUserManagement(action.userEdit))
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:GET_USER_SAGA,
                keyWord:''
            })
            yield put({
                type:CLOSE_DRAWER
            })
            notificationFunction('success', 'Update successful !');
        }
        else{
            notificationFunction('error', "Update fail !");
        }
        
    } catch (error) {
        console.log(error)
        notificationFunction('error', "Update fail !");
    }
    yield put({
        type:HIDE_LOADING
    }) 
}

export function *theoDoiEditUserManagementSaga(){
    yield takeLatest(EDIT_USER_MANAGEMENT,editUserManagementSaga)
}

export function * theoDoiDeleteUserManagementSaga(){
    yield takeLatest(DELETE_USER_MANAGEMENT, deleteUserManagementSaga);
}

function* assignUserProjectSaga(action) {
    try {
        const { data, status } = yield call(() => userServices.assignUser(action.useProject));
        yield put({
            type: GET_ALL_PROJECT
        })
    } catch (error) {
        console.log(error.response);
    }
}


export function* theoDoiAssignUserProjectSaga() {
    yield takeLatest(ASSIGN_USER_PROJECT, assignUserProjectSaga);
}


function* removeFormUserSaga(action) {
    try {
        const { data, status } = yield call(() => userServices.removeFormUser(action.userProject));

        yield put({
            type: GET_ALL_PROJECT
        })

    } catch (error) {
        console.log(error.response.data);
    }
}

export function* theoDoiRemoveFormUser() {
    yield takeLatest(REMOVE_FORM_USER, removeFormUserSaga);
}


function* getUserByProjectId(action) {
    try {
        const {data, status}=yield call(()=> userServices.getUserByProjectId(action.idProject))
        console.log(data)
        console.log(status)
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:GET_USER_BY_PROJECT_ID_REDUCER,
                userProject:data.content
            })
        }
    } catch (error) {
       if(error.response?.data.statusCode===STATUS_CODE.NOT_FOUND){
        yield put({
            type:GET_USER_BY_PROJECT_ID_REDUCER,
            userProject:[]
        })
       }
    }
}

export function* theoDoiGetUseByProjectId() {
    yield takeLatest(GET_USER_BY_PROJECT_ID, getUserByProjectId)
}