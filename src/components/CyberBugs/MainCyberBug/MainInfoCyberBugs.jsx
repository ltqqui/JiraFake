import React from 'react'
import parse from "html-react-parser";
import { Descriptions } from 'antd';
export default function MainInfoCyberBugs(props) {
    const { projectDetail } = props

    const renderMembers=()=>{
        return projectDetail.members?.map((member,index)=>{
            return   <div key={index} className="avatar">
            <img src={member.avatar} alt='1' />
        </div>
        })
    }
    return (
        <>
            <h3>{projectDetail.projectName}</h3>
            {parse(`${projectDetail?.description}`)}
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {/* <div className="avatar">
                        <img src={projectDetail.members?.avatar} alt='1' />
                    </div>
                    <div className="avatar">
                        <img src={require('../../../assets/img/download (2).jfif')} alt='2' />
                    </div>
                    <div className="avatar">
                        <img src={require('../../../assets/img/download (3).jfif')} alt='3' />
                    </div> */}
                    {renderMembers()}
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </>
    )
}
