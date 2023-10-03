import { call, delay, put, select, takeLatest } from 'redux-saga/effects'
import { CHANGE_ASSIGNESS, CHANGE_TASK_DETAIL_REDUCER, CREATE_TASK, GET_TASK_DETAIL_MODAL, GET_TASK_DETAIL_MODAL_REDUCER, HANDLE_CHANGE_POST_API, REMOVE_USER_ASSIGNESS, UPDATE_STATUS } from '../../constants/CyberBug/TaskConst';
import { taskServices } from '../../../services/TaskServices';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/CyberBug/GlobalLoading/GlobalLoading';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { notificationFunction } from '../../../util/Notification/NotificationCyberBugs';
import { CLOSE_DRAWER } from '../../constants/CyberBug/DrawerConst';
import { GET_PROJECT_DETAIL } from '../../constants/CyberBug/ProjectConst';
import { INSERT_COMMENT } from '../../constants/CyberBug/CommentConst';
function* createTaskSaga(action) {
    yield put({
        type: DISPLAY_LOADING,
    })
    yield delay(500)
    try {
        const { data, status } = yield call(() => taskServices.createTask(action.taskObject));
        if (status === STATUS_CODE.SUCCESS) {
            notificationFunction('success', 'Create task successfully !')
            yield put({
                type: CLOSE_DRAWER
            })
        }
        else {
            notificationFunction('error', 'Create task fail !')
        }
    } catch (error) {
        console.log(error)
        notificationFunction('error', 'Create task fail !')
    }
    yield put({
        type: GET_PROJECT_DETAIL,
        projectId: action.taskObject.projectId
    })

    yield put({
        type: HIDE_LOADING,
    })
}

export function* theoDoiCreateTaskSaga() {
    yield takeLatest(CREATE_TASK, createTaskSaga);
}


function* getTaskDetailSaga(action) {
    try {
        const { data, status } = yield call(() => taskServices.getTaskDetail(action.taskId));
        console.log(data)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_MODAL_REDUCER,
                taskDetailModal: data.content
            })
        }
    } catch (error) {

    }
}






export function* theoDoiGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_MODAL, getTaskDetailSaga);
}


function* handleChangePostApi(action) {
    // eslint-disable-next-line default-case
    switch (action.actionType) {
        case CHANGE_TASK_DETAIL_REDUCER: {
            const { value, name } = action;
            yield put({
                type: CHANGE_TASK_DETAIL_REDUCER,
                name,
                value
            })
        }; break;

        case CHANGE_ASSIGNESS: {
            const { userSelected } = action;
            yield put({
                type: CHANGE_ASSIGNESS,
                userSelected
            })
        } ; break;
        case REMOVE_USER_ASSIGNESS: {
            const {userId}=action;
            yield put({
                type: REMOVE_USER_ASSIGNESS,
                userId
            })
        } break;

    }

    let {taskDetailModal}=yield select(state=>state.TaskReducer);
    let listUserAsign=taskDetailModal.assigness.map((user, index)=>{
        return user.id;
    })
    let taskUpdate={...taskDetailModal, listUserAsign }
    try {
        const {data, status}=yield call(()=> taskServices.updateTask(taskUpdate))
        console.log(data)
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type: GET_PROJECT_DETAIL,
                projectId : taskUpdate.projectId
            })

            yield put({
                type:GET_TASK_DETAIL_MODAL,
                taskId:taskUpdate.taskId
            })
        }
    } catch (error) {
        console.log(error)
    }


}

export function* theoDoiHandleChangePostApi() {
    yield takeLatest(HANDLE_CHANGE_POST_API, handleChangePostApi);
}