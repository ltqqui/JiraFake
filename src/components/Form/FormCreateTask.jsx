import React, { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Select, Slider } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux'
import { GET_ALL_PROJECT_IN_CREATE_TASK } from '../../redux/constants/CyberBug/ProjectConst';
import { GET_ALL_PRIORITY } from '../../redux/constants/CyberBug/PriorityConst';
import { GET_ALL_TASK_TYPE } from '../../redux/constants/CyberBug/TaskTypeConst';
import { GET_USER_BY_PROJECT_ID, GET_USER_SAGA } from '../../redux/constants/CyberBug/CyberBugConst';
import { withFormik } from 'formik';
import { CREATE_TASK } from '../../redux/constants/CyberBug/TaskConst';
import { GET_ALL_STATUS } from '../../redux/constants/CyberBug/StatusConst';
import { CLOSE_DRAWER, SET_SUBMIT_CREATE_TASK } from '../../redux/constants/CyberBug/DrawerConst';
function FormCreateTask(props) {
    const { arrProject , userProject} = useSelector(state => state.ProjectCyberBugsReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer)
    // const {  } = useSelector(state => state.UserLoginCyberBugsReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer)
    const userOptions = userProject?.map((item, index) => {
        return { value: item.userId, label: item.name };
    })


    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })
    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_IN_CREATE_TASK
        })

        dispatch({
            type: GET_ALL_PRIORITY
        })

        dispatch({
            type: GET_ALL_TASK_TYPE
        })

        dispatch({
            type: GET_ALL_STATUS
        })

        dispatch({
            type:SET_SUBMIT_CREATE_TASK,
            submitFunction:handleSubmit
        })
    }, [])

    const {
        setFieldValue,
        handleChange,
        handleSubmit,
        values
    } = props



    return (
        <form className='container'>
            <div className='form-group'>
                <div className="row">
                    <div className="col-12">
                        <p>Project</p>
                        <select name="projectId" className='form-control' onChange={(e)=>{
                            setFieldValue('projectId', e.target.value)
                            dispatch({
                                type:GET_USER_BY_PROJECT_ID,
                                idProject:e.target.value
                            })
                        }}  >
                            {arrProject?.map((item, index) => {
                                return <option key={index} value={item.id}>{item.projectName}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className="row">
                    <div className="col-12">
                        <p>Task name</p>
                        <input type="text" className='form-control' name='taskName' onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className="row">
                    <div className="col-12">
                        <p>Status </p>
                        <select name="statusId" className='form-control' onChange={handleChange}  >
                            {arrStatus?.map((item, index) => {
                                return <option key={index} value={item.statusId}>{item.statusName}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="from-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" id="" className='form-control' onChange={handleChange}  >
                            {arrPriority?.map((item, index) => {
                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task type</p>
                        <select name="typeId" id="" className='form-control' onChange={handleChange}  >
                            {arrTaskType?.map((item, index) => {
                                return <option key={index} value={item.id}>{item.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>

            <div className='form-group mt-3'>
                <div className="row">
                    <div className="col-6">
                        <p>Assignment</p>
                        <Select
                            mode="multiple"
                            style={{
                                width: '100%',
                            }}
                            optionFilterProp='label'
                            placeholder="Please select"
                            onSearch={() => {
                                dispatch({
                                    type: GET_USER_SAGA,
                                    keyWord: ''
                                })
                            }}
                            onChange={(values, option) => {
                                setFieldValue('listUserAsign', values)
                            }}

                            options={userOptions}
                        />
                    </div>
                    <div className='col-6'>
                        <p>Time tracking</p>
                        <Slider
                            max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
                            value={timeTracking.timeTrackingSpent}
                            // defaultValue={30}
                            // tooltip={{
                            //     open: true,
                            // }}
                        />
                        <div className='row'>
                            <div className='col-6'>
                                <p className='text-left font-weight-bold'>{timeTracking.timeTrackingSpent}h logged</p>
                            </div>
                            <div className='col-6'>
                                <p className='text-right font-weight-bold'>{timeTracking.timeTrackingRemaining}h remaining</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-group '>
                <div className="row">
                    <div className="col-6">
                        <p>Original Estimate</p>
                        <input type="number " defaultValue='0' className='form-control' min='0' name='originalEstimate' onChange={handleChange} />
                    </div>
                    <div className='col-6 row'>
                        <div className='col-6'>
                            <p>Time spent</p>
                            <input type="number" defaultValue='0' name='timeTrackingSpent' min='0' className='form-control' onChange={(e) => {
                                setTimeTracking({
                                    ...timeTracking,
                                    timeTrackingSpent: e.target.value
                                })

                                setFieldValue('timeTrackingSpent', e.target.value)
                            }} />
                        </div>
                        <div className='col-6'>
                            <p>Time remaining</p>
                            <input type="number" defaultValue='0' name='timeTrackingRemaining' min='0' className='form-control' onChange={(e) => {
                                setTimeTracking({
                                    ...timeTracking,
                                    timeTrackingRemaining: e.target.value
                                })

                                setFieldValue('timeTrackingRemaining', e.target.value)
                            }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group mt-3">
                <div className="row">
                    <div className="col-12">
                        <p>Description</p>
                        <Editor
                            name="description"
                            // value={}
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
                                setFieldValue('description', content)
                            }}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}

const frmCreateTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        // if(props.arrProject?.length>0){
        //     props.dispatch({
        //         type:GET_USER_BY_PROJECT_ID,
        //         idProject:props.arrProject[0]?.id
        //     })
        // }

        return {
            listUserAsign: [],
            taskName: '',
            description: '',
            statusId: props.arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: props.arrProject[0]?.id,
            typeId: props.arrTaskType[0]?.id,
            priorityId: props.arrPriority[0]?.priorityId
        }
    },
    handleSubmit: (value, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_TASK,
            taskObject: value
        })
    },

    displayName: 'formCreateTask'
})(FormCreateTask)

const mapStateToProps = state => {
    return {
        arrProject: state.ProjectCyberBugsReducer.arrProject,
        arrStatus: state.StatusReducer.arrStatus,
        arrPriority: state.PriorityReducer.arrPriority,
        arrTaskType: state.TaskTypeReducer.arrTaskType
    }
}

export default connect(mapStateToProps)(frmCreateTask)
