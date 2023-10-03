import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/CyberBug/GlobalLoading/GlobalLoading";

const stateDefault={
    isLoading:false
}

const CyberBugSagaReducer=(state=stateDefault,action )=>{
    switch(action.type){
        case DISPLAY_LOADING:{
            state.isLoading=true;
            return {...state};
        }
        case HIDE_LOADING:{
            state.isLoading=false;
            return {...state};
        }
        default: return {...state}
    }
}

export default CyberBugSagaReducer