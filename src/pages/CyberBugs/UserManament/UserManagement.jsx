import { Space, Table, Popconfirm, Avatar, AutoComplete, Input } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom'
import { EditOutlined, DeleteOutlined, AudioOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {  EDIT_PROJECT } from '../../../redux/constants/CyberBug/ProjectConst';
import { OPEN_DRAWER_EDIT } from '../../../redux/constants/CyberBug/DrawerConst';
import { DELETE_USER_MANAGEMENT, EDIT_USER_MANAGEMENT, EDIT_USER_MANAGEMENT_REDUCER, GET_USER_SAGA } from '../../../redux/constants/CyberBug/CyberBugConst';
import FormEditUser from '../../../components/Form/FormEditUser';


const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
export default function UserManagement() {
  const { projectList } = useSelector(state => state.ProjectCyberBugsReducer);
  const { listUser } = useSelector(state => state.UserLoginCyberBugsReducer)
  const [value, setValue] = useState('');
  const searchRef=useRef('');
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: GET_USER_SAGA,
      keyWord: ''
    })
  }, [])
  const data = [
    {
      "userId": 2417,
      "name": "thinh2345456",
      "avatar": "https://ui-avatars.com/api/?name=thinh2345456",
      "email": "furkan1234@gmail.com",
      "phoneNumber": "084799922"
    },
    {
      "userId": 2537,
      "name": "Mehmet12",
      "avatar": "https://ui-avatars.com/api/?name=Mehmet12",
      "email": "mehmet@gmail.com",
      "phoneNumber": "987654321"
    },
    {
      "userId": 2909,
      "name": "tên",
      "avatar": "https://ui-avatars.com/api/?name=tên",
      "email": "busra@gmail.com",
      "phoneNumber": "111111111"
    },
    {
      "userId": 3960,
      "name": "dogukan",
      "avatar": "https://ui-avatars.com/api/?name=dogukan",
      "email": "dogukan@gmail.com",
      "phoneNumber": "1234565"
    },
  ];

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
      sorter: (item2, item1) => {
        return item2.userId - item1.userId
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => {
        return <NavLink key={index} to={`/projectdetail/${record.id}`}  >{text}</NavLink>
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      }
    },
    {
      title: 'Avatar',
      key: 'avatar',
      render: (text, record, index) => {
        return <Avatar src={text.avatar} key={index} />
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <button  className='bg-primary ' style={{ borderRadius: '3px', outline: '#FFF', border: 'none' }} onClick={() => {
            dispatch({
              type: OPEN_DRAWER_EDIT,
              title: 'Edit user',
              ComponentContentDrawer: <FormEditUser />
            })

            dispatch({
              type: EDIT_USER_MANAGEMENT_REDUCER,
              userEdit: record
            })

          }} ><EditOutlined style={{ color: '#fff', fontSize: 20, padding: 3 }} /></button>

          <Popconfirm
            title="Are you sure to delete user ?"
            onConfirm={() => {
              dispatch({
                type: DELETE_USER_MANAGEMENT,
                userId: record.userId
              })
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className='bg-danger' style={{ borderRadius: '3px', border: 'none' }}><DeleteOutlined style={{ color: '#fff ', fontSize: 20, padding: 3 }} /></button>
          </Popconfirm>

        </Space>
      ),
    },
  ];



  return (
    <div className='container' style={{ height: '100%', }}>
      <h3 className='mt-1 '>User management</h3>

      <div className='container mt-3' style={{ height: '300px'}} >
        <AutoComplete
          options={listUser?.map((user, index) => {
            return { label: user.name, value: user.userId.toString() }
          })}

          value={value}

          onChange={(text) => {
            setValue(text)
          }}

          style={{ width: '100%', marginBottom:5 }}

          onSelect={(selectValue, option) => {
            setValue(option.label)

          }}
            placeholder="input search text"
            allowClear
            size="large"
            onSearch={(value)=>{
              if(searchRef.current){
                clearInterval(searchRef.current);
              }

              searchRef.current=setTimeout(()=>{
                dispatch({
                  type: GET_USER_SAGA,
                  keyWord: value
                })
              },1000)
            }}
        />
        <Table columns={columns} rowKey={(record) => {
          return record.userId
        }} pagination={{ pageSize: 8 }} columnWidth='20px' dataSource={listUser} onChange={handleChange} />
      </div>
    </div>
  )
}
