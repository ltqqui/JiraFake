
import {call, put, take, takeLatest} from 'redux-saga/effects'
import { DELETE_COMMENT, INSERT_COMMENT } from '../../constants/CyberBug/CommentConst'
import { commentServices } from '../../../services/CommentServices'
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { GET_TASK_DETAIL_MODAL } from '../../constants/CyberBug/TaskConst';
import { notificationFunction } from '../../../util/Notification/NotificationCyberBugs';
import { UPDATE_COMMENT } from '../../constants/CyberBug/CreateProject';


// eslint-disable-next-line require-yield
function * insertCommentSaga (action){
    try {
        const {data,status}=  yield call(()=>commentServices.insertComment(action.comment));
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:GET_TASK_DETAIL_MODAL,
                taskId:action.comment.taskId
            })
        }
    } catch (error) {
    }
}

export function * theoDoiInsertCommentSaga(){
    yield takeLatest(INSERT_COMMENT,insertCommentSaga)
}


function * deleteCommentSaga(action){
    try {
        const  {data, status}= yield call (()=>commentServices.deleteComment(action.idComment));
        console.log(data)
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:GET_TASK_DETAIL_MODAL,
                taskId:action.taskId
            })
            notificationFunction('success', 'Delete successful !');
        }
        else {
            notificationFunction('error', 'Delete fail !');
        }
    } catch (error) {
        console.log(error)
        notificationFunction('error', 'Delete fail !');
    }
}

export function * theoDoiDeleteCommentSaga(){
    yield takeLatest (DELETE_COMMENT,deleteCommentSaga)
}

function * updateCommentSaga(action){
    const commentUpdate={
        id:action.idComment,
        contentComment:action.contentComment
    }
    try {
        const{data, status}=yield call (()=> commentServices.updateComment(action.idComment, action.contentComment))
        console.log(data)
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type: GET_TASK_DETAIL_MODAL,
                taskId:action.taskId
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export function * theoDoiUpdateCommentSaga(){
    yield takeLatest(UPDATE_COMMENT, updateCommentSaga)
}