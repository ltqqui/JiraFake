import {applyMiddleware, combineReducers} from 'redux'
import { createStore } from 'redux'
import CyberBugSagaReducer from './reducer/CyberBugSagaReducer'
import { rootSaga } from './saga/rootSaga'
import createMiddleWearSaga from 'redux-saga'
import { HistoryReducer } from './reducer/HistoryReducer'
import { UserLoginCyberBugsReducer } from './reducer/UserLoginCyberBugsReducer'
import {ProjectCategoryReducer} from './reducer/ProjectCategoryReducer'
import { ProjectCyberBugsReducer } from './reducer/ProjectCyberBugsReducer'
import { DrawerReducer } from './reducer/DrawerReducder'
import { ProjectReducer } from './reducer/ProjectReducer'
import { PriorityReducer } from './reducer/PriorityReducer'
import { TaskTypeReducer } from './reducer/TaskTypeReducer'
import { StatusReducer } from './reducer/StatusReducer'
import { TaskReducer } from './reducer/TaskReducer'
const middleWearSaga=createMiddleWearSaga()

const rootReducer=combineReducers({
    CyberBugSagaReducer,
    HistoryReducer,
    UserLoginCyberBugsReducer,
    ProjectCategoryReducer,
    ProjectCyberBugsReducer,
    DrawerReducer,
    ProjectReducer,
    PriorityReducer,
    TaskTypeReducer,
    StatusReducer,
    TaskReducer
})

const store=createStore(rootReducer,applyMiddleware(middleWearSaga))
middleWearSaga.run(rootSaga)
export default store 


