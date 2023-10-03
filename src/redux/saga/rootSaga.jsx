import * as CyberBugSaga from './CyberBugSaga/CyberBugSaga'
import {all} from 'redux-saga/effects'
import * as ProjectCategorySaga from './CyberBugSaga/ProjectCategorySaga'
import * as CreateProjectSaga from './CyberBugSaga/CreateProjectSaga'
import * as ProjectSaga from './CyberBugSaga/ProjectSaga'
import * as PrioritySaga from './CyberBugSaga/PrioritySaga'
import * as TaskTypeSaga from './CyberBugSaga/TaskTypeSaga'
import * as TaskSaga from './CyberBugSaga/TaskSaga'
import * as StatusSaga from './CyberBugSaga/StatusSaga'
import * as CommentSaga from './CyberBugSaga/CommentSaga'
export function * rootSaga(){
    yield all([
        CyberBugSaga.theoDoiSignin(),
        CyberBugSaga.theoDoiGetUser(),
        CyberBugSaga.theoDoiRemoveFormUser(),
        CyberBugSaga.theoDoiAssignUserProjectSaga(),
        CyberBugSaga.theoDoiGetUseByProjectId(),
        CyberBugSaga.theoDoiRegisterSaga(),
        CyberBugSaga.theoDoiDeleteUserManagementSaga(),
        CyberBugSaga.theoDoiEditUserManagementSaga(),
        ProjectCategorySaga.theoDoiGetProjectCategory(),
        CreateProjectSaga.theoDoiCreateProject(),
        ProjectSaga.theoDoiGetAllProject(),
        ProjectSaga.theoDoiUpdateProject(),
        ProjectSaga.theoDoiDeleteProject(),
        ProjectSaga.theoDoiGetProjecDetailtSaga(),
        ProjectSaga.theoDoiGetAllProjectInCreateTask(),
        PrioritySaga.theoDoigetAllPrioritySaga(),
        TaskTypeSaga.theoDoiGetAllTaskType(),
        TaskSaga.theoDoiCreateTaskSaga(),
        TaskSaga.theoDoiGetTaskDetailSaga(),
        TaskSaga.theoDoiHandleChangePostApi(),
        StatusSaga.theoDoiGetAllStatusSaga(),
        StatusSaga.theoDoiUpdateTaskSaga(),
        CommentSaga.theoDoiInsertCommentSaga(),
        CommentSaga.theoDoiDeleteCommentSaga(),
        CommentSaga.theoDoiUpdateCommentSaga(),
    ])
}