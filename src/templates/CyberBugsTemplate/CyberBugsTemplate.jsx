import React from "react";
import { Route } from 'react-router-dom'
import SideBarCyberBugs from "../../components/CyberBugs/SideBarCyberBugs";
import '../../index.css'
import MenuCyberBugs from "../../components/CyberBugs/MenuCyberBugs";
import MainInfoCyberBugs from "../../components/CyberBugs/MainCyberBug/MainInfoCyberBugs";
import HeaderCyberBugs from "../../components/CyberBugs/MainCyberBug/HeaderCyberBugs";
import ContentCyberBugs from "../../components/CyberBugs/MainCyberBug/ContentCyberBugs";
import ModalCyberBugs from "../../components/CyberBugs/ModalCyberBugs/ModalCyberBugs";
import IndexCyberBugs from "../../pages/CyberBugs/indexCyberBugs/IndexCyberBugs";
import Header from "../../components/CyberBugs/Header/Header";

export const CyberBugsTemplate = (props) => {

    const { Component, ...restPram } = props
    return <Route {...restPram} render={(propsRoute) => {
        return <>
            <div className="jira">
                <SideBarCyberBugs />
                <MenuCyberBugs />
                <div style={{ display: 'flex', flexDirection: 'column', width:'100%', height:'100%' }}>
                    <Header />
                    <Component {...propsRoute} />
                </div>
            </div>
            <ModalCyberBugs />
        </>
    }} />
}