import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import {withFormik} from 'formik'
import {connect, useDispatch, useSelector} from 'react-redux'
import { GET_ALL_PROJECT_CATEGORY } from '../../../redux/constants/CyberBug/ProjectCategory';
import { CREATE_PROJECT_SAGA } from '../../../redux/constants/CyberBug/CreateProject';
import parseHTML from 'html-react-parser';
 function CreateProject(props) {
    // const parse = require('html-react-parser');
    let arrProjectCategory=useSelector(state=>state.ProjectCategoryReducer.arrProjectCategory)
    let dispatch=useDispatch();
    

    useEffect(()=>{
        dispatch({
            type:GET_ALL_PROJECT_CATEGORY
        })
    },[])
    const{
        handleSubmit,
        values,
        errors,
        handleChange,
        setFieldValue
    }=props
    const handleEditorChange = (content, editor) => {
        // const html=parseHTML(content)
        // let jsx=html.props?.children
        // // console.log(jsx)
       setFieldValue('description',content)
    }
    return (
        <div className='container' >
            <h3 style={{ marginLeft:'0px' }}>Create project</h3>
            <form className='m-5' onSubmit={handleSubmit}>
                <div className='container'>
                    <div className="form-group ">
                        <p>Name</p>
                        <input type="text" name='projectName' className='form-control' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <p>Description</p>
                        <Editor
                            name="description"
                            initialValue=""
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
                            onEditorChange={handleEditorChange}
                        />
                    </div>
                    <div className="form-group">
                        <select name="categoryId" defaultValue={props} id="" className='form-control ' onChange={handleChange} style={{ fontWeight: 'initial !important' }}>
                            {arrProjectCategory.map((item,index)=>{
                                return <option key={index} value={item.id}>{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                </div>
            </form>
        </div>
    )
}

const createProjectFormik=withFormik({
        enableReinitialize:true,
        mapPropsToValues:(props)=>{
            console.log(props)
            return {
            projectName:'',
            description:'',
            categoryId:props.arrProjectCategory[0]?.id,

        }},
        handleSubmit:(values,{props,setSubmitting})=>{
            props.dispatch({
                type:CREATE_PROJECT_SAGA,
                newProject:values
            })
        },
    displayNameL:'Create Project'
})(CreateProject)


const mapStateToProps=state=>{
    return {
        arrProjectCategory:state.ProjectCategoryReducer.arrProjectCategory
    }
}


export default connect (mapStateToProps) (createProjectFormik)