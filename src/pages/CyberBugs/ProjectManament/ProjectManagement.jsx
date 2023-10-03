import { Button, Space, Table, message, Popconfirm, Avatar, Popover, AutoComplete } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import {NavLink} from 'react-router-dom'
import { EditOutlined, DeleteOutlined, CloudFilled } from '@ant-design/icons';
import { Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_PROJECT, EDIT_PROJECT, GET_ALL_PROJECT } from '../../../redux/constants/CyberBug/ProjectConst';
import { OPEN_DRAWER_EDIT } from '../../../redux/constants/CyberBug/DrawerConst';
import FormEdit from '../../../components/Form/FormEdit';
import { ASSIGN_USER_PROJECT, GET_USER_SAGA, REMOVE_FORM_USER } from '../../../redux/constants/CyberBug/CyberBugConst';
export default function ProjectManagement() {
  const { projectList } = useSelector(state => state.ProjectCyberBugsReducer);
  const { listUser } = useSelector(state => state.UserLoginCyberBugsReducer)
  const [value, setValue] = useState('');
  const searchRef = useRef(null);
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT
    })
  }, [])

  const data = [
    {
      "id": 1,
      "projectName": "Web jira",
      "description": "web quản lý task dự án",
      "categoryId": 1,
      "alias": "web-jira",
      "deleted": false
    },
    {
      "id": 2,
      "projectName": "App jira",
      "description": "app quản lý task dự án",
      "categoryId": 3,
      "alias": "app-jira",
      "deleted": false
    },
    {
      "id": 3,
      "projectName": "Phần mềm jira",
      "description": "phần mềm quản lý công việc",
      "categoryId": 2,
      "alias": "phan-mem-jira",
      "deleted": false
    },
    {
      "id": 4,
      "projectName": "string",
      "description": "string",
      "categoryId": 1,
      "alias": "string",
      "deleted": false
    },
    {
      "id": 5,
      "projectName": "project name",
      "description": "<p>adskajdksjahd</p>",
      "categoryId": 2,
      "alias": "project-name",
      "deleted": false
    },
    {
      "id": 6,
      "projectName": "newproject123",
      "description": "<p>dsadsada</p>",
      "categoryId": 1,
      "alias": "newproject123",
      "deleted": false
    },
    {
      "id": 7,
      "projectName": "thoa",
      "description": "<p>front end remote</p>",
      "categoryId": 1,
      "alias": "thoa",
      "deleted": false
    },
    {
      "id": 8,
      "projectName": "alice",
      "description": "<p>test post</p>",
      "categoryId": 1,
      "alias": "alice",
      "deleted": false
    },
    {
      "id": 9,
      "projectName": "alice nguyen",
      "description": "<p>323</p>",
      "categoryId": 1,
      "alias": "alice-nguyen",
      "deleted": false
    },
    {
      "id": 10,
      "projectName": "truc ng",
      "description": "<p>react</p>",
      "categoryId": 1,
      "alias": "truc-ng",
      "deleted": false
    },
    {
      "id": 11,
      "projectName": "nguyen phuc loc ",
      "description": "<p>react</p>",
      "categoryId": 1,
      "alias": "nguyen-phuc-loc",
      "deleted": false
    },
    {
      "id": 12,
      "projectName": "",
      "description": "",
      "categoryId": 1,
      "alias": "",
      "deleted": false
    },
    {
      "id": 13,
      "projectName": "dfs",
      "description": "<p>dfa</p>",
      "categoryId": 1,
      "alias": "dfs",
      "deleted": false
    },
    {
      "id": 14,
      "projectName": "alice ng thanh",
      "description": "<p>react create cyberbugs</p>",
      "categoryId": 1,
      "alias": "alice-ng-thanh",
      "deleted": false
    },
    {
      "id": 15,
      "projectName": "newproject123456",
      "description": "<p>123321321</p>",
      "categoryId": 2,
      "alias": "newproject123456",
      "deleted": false
    }
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
      dataIndex: 'id',
      key: 'id',
      sorter: (item2, item1) => {
        return item2.id - item1.id
      }
    },
    {
      title: 'ProjectName',
      dataIndex: 'projectName',
      key: 'projectName',
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
      title: 'Category',  
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName1 < categoryName2) {
          return -1;
        }
        return 1;
      }
    },
    {
      title: 'Creator',
      key: 'categoryName',
      render: (text, record, index) => {
        return <Tag key={index} color='green'>{record.creator.name}</Tag>
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator1 < creator2) {
          return -1;
        }
        return 1;
      }
    },
    {
      title: 'Members',
      ke: 'members',
      render: (text, record, index) => {
        return <div key={index}>
          {record.members?.slice(0, 3).map((member, index) => {
            return (
              <Popover key={index} title='Members' placement='top' content={() => {
                return <table className='table table-hover '>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Avatar</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.members?.map((member, index) => {
                      return <tr key={index}>
                        <td>{member.userId}</td>
                        <td>{member.name}</td>
                        <td><img src={member.avatar} alt="" style={{ width: 30, height: 30, borderRadius: '50%' }} /></td>
                        <td><Button type='danger' onClick={() => {
                          dispatch({
                            type: REMOVE_FORM_USER,
                            userProject: {
                              projectId: record.id,
                              userId: member.userId
                            }
                          })
                        }}>Delete</Button></td>
                      </tr>
                    })}
                  </tbody>
                </table>
              }}>
                <Avatar key={index} src={member.avatar} />
              </Popover>
            )
          })}
          {record.members.length > 3 ? <Avatar>...</Avatar> : ''}
          <Popover placement="rightTop" title={'Add members'} content={() => {
            return <AutoComplete
              options={listUser?.map((user, index) => {
                return { label: user.name, value: user.userId.toString() }
              })}

              value={value}

              onChange={(text) => {
                setValue(text)
              }}

              style={{ width: 200, }}

              onSelect={(selectValue, option) => {
                setValue(option.label)

                dispatch({
                  type: ASSIGN_USER_PROJECT,
                  useProject: {
                    projectId: record.id,
                    userId: selectValue
                  }
                })


              }}
              onSearch={(value) => {
                if (searchRef.current) {
                  clearTimeout(searchRef.current)
                }
                searchRef.current = setTimeout(() => {
                  dispatch({
                    type: GET_USER_SAGA,
                    keyWord: value
                  })
                }, 1000)
              }}
              placeholder="input here"
            />
          }} trigger="click">
            <Button style={{ borderRadius: '50%' }}>+</Button>
          </Popover>
        </div>
      }

    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <button className='bg-primary ' style={{ borderRadius: '3px', outline: '#FFF', border: 'none' }} onClick={() => {
            dispatch({
              type: OPEN_DRAWER_EDIT,
              title:'Edit project',
              ComponentContentDrawer: <FormEdit />
            })

            dispatch({
              type: EDIT_PROJECT,
              projectEditModel: record
            })

          }} ><EditOutlined style={{ color: '#fff', fontSize: 20, padding: 3 }} /></button>

          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {
              dispatch({
                type: DELETE_PROJECT,
                projectId: record.id
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
    <div className='container' style={{height:'500px', }}>
      <h3 className='mt-1 '>Project management</h3>
      <div className='container mt-5'style={{height:'300px'}} > 
        {/*  */}
        <Table columns={columns} rowKey={(record)=>{
          return record.id
        }} pagination={{pageSize:8}}  columnWidth='20px' dataSource={projectList} onChange={handleChange} />
      </div>
    </div>
  )
}
