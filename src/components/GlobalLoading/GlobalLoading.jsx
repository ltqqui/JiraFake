import React from "react";
import {useSelector} from 'react-redux'
import styleGlobal from './GlobalLoading.module.css'
export const GlobalLoading=()=>{
    let {isLoading}=useSelector(state=>state.CyberBugSagaReducer);
    if(isLoading){
        return <div className={styleGlobal.bgLoading}>
            <img src={require('../../assets/imgLoading/loading.gif')} alt="" />
        </div>
    } else {
        return ''
    }
}