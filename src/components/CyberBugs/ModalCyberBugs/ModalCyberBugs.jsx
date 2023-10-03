/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { Editor } from '@tinymce/tinymce-react';
import { Select, Button, message, Popconfirm } from 'antd';
import { GET_ALL_STATUS } from '../../../redux/constants/CyberBug/StatusConst'
import { GET_ALL_PRIORITY } from '../../../redux/constants/CyberBug/PriorityConst'
import { CHANGE_ASSIGNESS, CHANGE_TASK_DETAIL_REDUCER, HANDLE_CHANGE_POST_API, REMOVE_USER_ASSIGNESS } from '../../../redux/constants/CyberBug/TaskConst'
import { GET_ALL_TASK_TYPE } from '../../../redux/constants/CyberBug/TaskTypeConst'
import { DELETE_COMMENT, INSERT_COMMENT } from '../../../redux/constants/CyberBug/CommentConst';
import { UPDATE_COMMENT } from '../../../redux/constants/CyberBug/CreateProject';
export default function ModalCyberBugs() {
    const { taskDetailModal } = useSelector(state => state.TaskReducer)
    const { arrStatus } = useSelector(state => state.StatusReducer)
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { projectDetail } = useSelector(state => state.ProjectReducer);
    const { userLogin } = useSelector(state => state.UserLoginCyberBugsReducer);
    const [visible, setVisible] = useState(false)
    const [visibleComment, setVisibleComment] = useState(false);
    const [visibleEditComment, setVisibleEditComment] = useState({
        id: '',
        value: false
    });
    const [content, setContent] = useState('');
    const [contentComment, setContentComment] = useState('');
   const [editComment, setEditComment]=useState('')
    
    const [history, setHistory] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_ALL_STATUS
        })
        dispatch({
            type: GET_ALL_PRIORITY
        })
        dispatch({
            type: GET_ALL_TASK_TYPE
        })
    }, [])
    const { OPtion } = Select
    const renderTimeTracking = () => {
        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal
        const max = (Number(timeTrackingSpent) + Number(timeTrackingRemaining))
        const percent = Math.round(timeTrackingSpent / max * 100)
        return <div>
            <div style={{ display: 'flex' }}>
                <i className="fa fa-clock" />
                <div style={{ width: '100%' }}>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={timeTrackingSpent} aria-valuemin={0} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{timeTrackingSpent}h logged</p>
                        <p className="estimate-time">{timeTrackingRemaining}h remaining</p>
                    </div>
                </div>
            </div>
            <div className='row '>
                <div className="col-6">
                    <input type="number" name='timeTrackingSpent' className='form-control' value={taskDetailModal.timeTrackingSpent} onChange={handleChange} />
                </div>
                <div className="col-6">
                    <input type="number" name='timeTrackingRemaining' className='form-control' value={taskDetailModal.timeTrackingRemaining} onChange={handleChange} />
                </div>
            </div>
        </div>
    }

    const handleChange = (e) => {
        const { value, name } = e.target
        console.log(value, name)
        dispatch({
            type: HANDLE_CHANGE_POST_API,
            actionType: CHANGE_TASK_DETAIL_REDUCER,
            name,
            value
        })
        // dispatch({
        //     type: CHANGE_TASK_DETAIL_REDUCER,
        //     name,
        //     value
        // })
    }
    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <span>{taskDetailModal.taskName}</span>
                            <select name="typeId" value={taskDetailModal.typeId} className='form-control' onChange={handleChange}>
                                {arrTaskType.map((tp, index) => {
                                    return <option key={index} value={tp.id}>{tp.taskType}</option>
                                })}
                            </select>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt='xyz'" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description" onClick={() => {
                                        setVisible(!visible)
                                    }}>
                                        <p>Description</p>
                                        {
                                            visible ? <Editor
                                                name="description"
                                                // value={}
                                                initialValue={taskDetailModal.description}
                                                init={{
                                                    height: 500,
                                                    menubar: false,
                                                    plugins: [
                                                        'advlist autolink lists link image charmap print preview anchor',
                                                        'searchreplace visualblocks code fullscreen',
                                                        'insertdatetime media table paste code help wordcount'
                                                    ],
                                                    toolbar:
                                                        'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                                                }}
                                                onEditorChange={(content, editor) => {
                                                    // setFieldValue('description', content)
                                                    setContent(content)
                                                }}
                                            /> : parse(`${taskDetailModal.description}`)
                                        }
                                        {
                                            visible ? <div>
                                                <button className='btn btn-primary mt-2 mr-2' onClick={() => {
                                                    dispatch({
                                                        type: HANDLE_CHANGE_POST_API,
                                                        actionType: CHANGE_TASK_DETAIL_REDUCER,
                                                        name: 'description',
                                                        value: content
                                                    })
                                                    // dispatch({
                                                    //     type: CHANGE_TASK_DETAIL_REDUCER,
                                                    //     name: 'description',
                                                    //     value: content
                                                    // })
                                                    setVisible(false)
                                                }}>Save</button>
                                                <button className='btn btn-success mt-2' onClick={() => {
                                                    setContent(taskDetailModal.description)
                                                    setVisible(false)
                                                }}>Cancel</button>
                                            </div> : ''
                                        }
                                    </div>
                                    <div style={{ fontWeight: 500, marginBottom: 10 }}>
                                        Jira Software (software projects) issue types:
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={userLogin.avatar} alt='xyz' />
                                            </div>
                                            {
                                                visibleComment ? <Editor
                                                    name="comment"
                                                    // value={}
                                                    initialValue={''}
                                                    init={{
                                                        height: 100,
                                                        width: '100%',
                                                        menubar: false,
                                                        plugins: [
                                                            'advlist autolink lists link image charmap print preview anchor',
                                                            'searchreplace visualblocks code fullscreen',
                                                            'insertdatetime media table paste code help wordcount'
                                                        ],
                                                        toolbar:
                                                            'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                                                    }}
                                                    onEditorChange={(content, editor) => {
                                                        setContentComment(content)
                                                    }}
                                                /> : <div className="input-comment">
                                                    <input type="text" placeholder="Add a comment ..." className='form-control' onClick={() => {
                                                        setVisibleComment(!visibleComment)
                                                    }} />
                                                    <p>
                                                        <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                        <span>press
                                                            <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                            to comment</span>
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                        {
                                            visibleComment ? <div style={{ marginLeft: 55 }}>
                                                <button className='btn btn-primary mt-2 mr-2' onClick={() => {
                                                    dispatch({
                                                        type: INSERT_COMMENT,
                                                        comment: {
                                                            taskId: taskDetailModal.taskId,
                                                            contentComment: contentComment
                                                        }
                                                    })
                                                    // dispatch({
                                                    //     type: CHANGE_TASK_DETAIL_REDUCER,
                                                    //     name: 'description',
                                                    //     value: content
                                                    // })
                                                    setVisibleComment(false)
                                                }}>Save</button>
                                                <button className='btn btn-success mt-2' onClick={() => {
                                                    // setContent(content)
                                                    setVisibleComment(false)
                                                }}>Cancel</button>
                                            </div> : ''
                                        }
                                        <div className="lastest-comment">
                                            {taskDetailModal.lstComment.map((cmt, index) => {
                                                return <div className="comment-item" key={index}>
                                                    <div className="display-comment" style={{ display: 'flex' }}>
                                                        <div className="avatar">
                                                            <img src={cmt.avatar} alt='xyz' />
                                                        </div>
                                                        <div>
                                                            <p style={{ marginBottom: 5 }}>
                                                                Lord Gaben <span>a month ago</span>
                                                            </p>

                                                            {
                                                                visibleEditComment.value === true && visibleEditComment.id === cmt.id ? <Editor
                                                                    name="comment"
                                                                    // value={cmt.contentComment}
                                                                    initialValue={cmt.commentContent}
                                                                    init={{
                                                                        height: 100,
                                                                        width: '100%',
                                                                        menubar: false,
                                                                        plugins: [
                                                                            'advlist autolink lists link image charmap print preview anchor',
                                                                            'searchreplace visualblocks code fullscreen',
                                                                            'insertdatetime media table paste code help wordcount'
                                                                        ],
                                                                        toolbar:
                                                                            'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help'
                                                                    }}
                                                                    onEditorChange={(content, editor) => {
                                                                        // const comment = parse(`${content}`)
                                                                        setEditComment(content)
                                                                    }}
                                                                    /> :  parse(`${cmt.commentContent}`)
                                                                    
                                                            }
                                                            {
                                                                visibleEditComment.value === true && visibleEditComment.id === cmt.id ? <div>
                                                                    <button className='btn btn-primary mt-2 mr-2' onClick={() => {
                                                                        
                                                                        dispatch({
                                                                            type: UPDATE_COMMENT,
                                                                            idComment:cmt.id,
                                                                            contentComment:editComment,
                                                                            taskId:taskDetailModal.taskId
                                                                        })
                                                                        setVisibleEditComment({
                                                                            value: false
                                                                        })
                                                                    }}>Save</button>
                                                                    <button className='btn btn-success mt-2' onClick={() => {
                                                                        setEditComment(cmt.commentContent)
                                                                        setVisibleEditComment({
                                                                            value: false
                                                                        })
                                                                    }}>Cancel</button>
                                                                </div> : ''
                                                            }


                                                            {visibleEditComment.value && visibleEditComment.id === cmt.id ? '' : <div >
                                                                <a style={{ color: '#929398', fontSize: 15 }} onClick={() => {
                                                                    setVisibleEditComment({
                                                                        id: cmt.id,
                                                                        value: true
                                                                    })
                                                                }}>Edit</a>
                                                                <Popconfirm
                                                                    placement="topLeft"
                                                                    title={'Are you sure to delete comment ? '}
                                                                    onConfirm={() => {
                                                                        dispatch({
                                                                            type: DELETE_COMMENT,
                                                                            idComment: cmt.id,
                                                                            taskId: taskDetailModal.taskId
                                                                        })
                                                                    }}
                                                                    okText="Yes"
                                                                    cancelText="No"
                                                                >
                                                                    <a style={{ color: '#929398', fontSize: 15, marginLeft: 10 }}  >Delete</a>
                                                                </Popconfirm>
                                                            </div>}

                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select className="custom-select" name='statusId' value={taskDetailModal.statusId} onChange={handleChange} >
                                            {arrStatus.map((item, index) => {
                                                return <option key={index} value={item.statusId}>{item.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className='row ml-1'>
                                            {taskDetailModal.assigness?.map((item, index) => {
                                                return <div className='col-12 mt-1' style={{ width: '100%', justifyContent: 'center', alignSelf: 'center', lineHeight: '50%' }} key={index}>
                                                    <div className="item row ">
                                                        <div className="avatar col-3">
                                                            <img src={item.avatar} alt='xyz' />
                                                        </div>
                                                        <div className="name mt-1 col-9" style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                            <p style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', alignItems: 'center', marginBottom: 0, marginTop: 0 }}>
                                                                {item.name}
                                                            </p>
                                                            <i className="fa-solid fa-xmark " style={{ marginTop: 5, marginLeft: 7, cursor: 'pointer', alignSelf: 'right' }} onClick={() => {
                                                                dispatch({
                                                                    type: HANDLE_CHANGE_POST_API,
                                                                    actionType: REMOVE_USER_ASSIGNESS,
                                                                    userId: item.id
                                                                })
                                                                // dispatch({
                                                                //     type: REMOVE_USER_ASSIGNESS,
                                                                //     userId: item.id
                                                                // })
                                                            }}></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                        <div className='row mt-3 ml-1 mb-4'>
                                            <Select
                                                options={projectDetail.members?.filter(mem => {
                                                    const index = taskDetailModal.assigness?.findIndex(us => us.id == mem.userId)
                                                    if (index === -1) {
                                                        return true
                                                    }
                                                    return false
                                                }).map((mem, index) => {
                                                    return { value: mem.userId, label: mem.name }
                                                })}
                                                style={{ width: 200 }}
                                                value='+ Add more'
                                                placeholder="Select a person"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                onSelect={(value) => {
                                                    if (value == '0') {
                                                        return;
                                                    }
                                                    let userSelected = projectDetail.members.find(mem => mem.userId === value)
                                                    userSelected = { ...userSelected, id: userSelected.userId }


                                                    dispatch({
                                                        type: HANDLE_CHANGE_POST_API,
                                                        actionType: CHANGE_ASSIGNESS,
                                                        userSelected
                                                    })

                                                    // dispatch({
                                                    //     type: CHANGE_ASSIGNESS,
                                                    //     userSelected
                                                    // })
                                                }}
                                            >
                                            </Select>,
                                        </div>
                                    </div>

                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select value={taskDetailModal.priorityTask?.priorityId} className='form-control' onChange={handleChange}>
                                            {arrPriority.map((item, index) => {
                                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="text" name='originalEstimate' className="estimate-hours" value={taskDetailModal?.originalEstimate || ''} onChange={handleChange} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {renderTimeTracking()}
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}