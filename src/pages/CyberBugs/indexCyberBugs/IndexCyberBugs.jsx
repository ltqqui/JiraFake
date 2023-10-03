import React, { useEffect } from 'react'
import MainInfoCyberBugs from '../../../components/CyberBugs/MainCyberBug/MainInfoCyberBugs'
import HeaderCyberBugs from '../../../components/CyberBugs/MainCyberBug/HeaderCyberBugs'
import ContentCyberBugs from '../../../components/CyberBugs/MainCyberBug/ContentCyberBugs'
import {useSelector , useDispatch} from 'react-redux'
import { GET_PROJECT_DETAIL } from '../../../redux/constants/CyberBug/ProjectConst'
export default function IndexCyberBugs(props) {
  const {projectDetail}=useSelector(state=>state.ProjectReducer)
  const dispatch=useDispatch();
  useEffect(()=>{
    const {projectId}=props.match.params
      dispatch({
        type:GET_PROJECT_DETAIL,
        projectId
      })
  },[])
  return (
    <div className="main">
    <HeaderCyberBugs projectDetail={projectDetail}/>
    <MainInfoCyberBugs projectDetail={projectDetail}/>
    <ContentCyberBugs projectDetail={projectDetail} />
</div>
  )
}
  