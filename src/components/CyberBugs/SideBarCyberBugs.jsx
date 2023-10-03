import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    SearchOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { OPEN_DRAWER_CREATE_TASK } from '../../redux/constants/CyberBug/DrawerConst';
import FormCreateTask from '../Form/FormCreateTask';


const { Header, Sider, Content } = Layout;
export default function SideBarCyberBugs() {

    const dispatch=useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div >
            <Sider trigger={null} collapsible style={{ height: '100%' }} collapsed={collapsed}>
                <div className='text-right mr-2' style={{
                    color: '#fff', fontSize: 25, cursor: 'pointer',
                }} onClick={() => {
                    setCollapsed(!collapsed)
                }}>{collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}</div>
                <div className="logo" />
                <Menu theme="dark"mode="inline" defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <PlusOutlined />,
                            label: 'Create issue'
                        },
                        {
                            key: '2',
                            icon: <SearchOutlined />,
                            label: 'Search',
                        },
                    ]}
               onClick={()=>{
                dispatch({
                    type:OPEN_DRAWER_CREATE_TASK,
                    title:'Create task',
                    component:<FormCreateTask/>
                })
               }} />
            </Sider>
        </div>
    )
}
