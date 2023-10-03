import { Layout } from 'antd';
import React,{useState,useEffect} from 'react';
import {Route} from 'react-router-dom'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
const { Header, Footer, Sider, Content } = Layout;
export const UserLoginTemplate=(props)=>{

        let [{width,height},setSize]=useState({width:window.innerWidth,height:window.innerHeight});

        useEffect(()=>{
            window.onresize=()=>{
                setSize({
                    width:window.innerWidth,
                    height:window.innerHeight
                })
            }
        },[])
    const {Component, ...resParam}=props
    console.log(props)
    return <Route path ={resParam.path} render={(propsRoute)=>{
        return <Layout>
        <Sider width={width/2} style={{height:height, backgroundImage:`url(https://picsum.photos/${Math.floor(width/2)}/${Math.floor(height/2)})`,backgroundSize:'cover'}}>
            
        </Sider>
        <Content style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
            <Component {...propsRoute}/>
        </Content>
    </Layout>
    }} />
}
