import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { SET_SUBMIT_FORM } from '../../redux/constants/CyberBug/DrawerConst';
import { Editor } from '@tinymce/tinymce-react';
import parseHTML from 'html-react-parser';
import { withFormik } from 'formik';
import { GET_ALL_PROJECT_CATEGORY, GET_PROJECT_CATEGORY_REDUX } from '../../redux/constants/CyberBug/ProjectCategory';
import { UPDATE_PROJECT } from '../../redux/constants/CyberBug/ProjectConst';
function FormEdit(props) {


    let arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)
    let dispatch = useDispatch();

    const {
        setFieldValue,
        handleChange,
        handleSubmit,
        values
    } = props


    useEffect(() => {


        dispatch({
            type: GET_ALL_PROJECT_CATEGORY
        })


        dispatch({
            type: SET_SUBMIT_FORM,
            submitFunction: handleSubmit
        })
    }, [])

    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }

    return (
        <div>
            {/* <h4 className='mt-2 mb-5 text-center text-success'>Edit project</h4> */}
            <form className='container-fluid' onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-4">
                        <p className='text-weight-bold'>ID</p>
                        <input type="text" value={values.id} className='form-control' name='id' disabled />
                    </div>
                    <div className="form-group col-4">
                        <p className='text-weight-bold'>Project Name</p>
                        <input type="text" onChange={handleChange} value={values.projectName} className='form-control' name='projectName' />
                    </div>
                    <div className="form-group col-4">
                        <p className='text-weight-bold'>Category Id</p>
                        <select name="categoryId" id="" value={values.categoryId} onChange={handleChange} className='form-control' >
                            {arrProjectCategory.map((item, index) => {
                                return <option key={index} value={item.id}>{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <Editor
                        name="description"
                        value={values.description}
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
            </form>
        </div>
    )
}


const FormEditProject = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { id, projectName, categoryId, description } = props?.projectEdit
        return {
            id: id,
            projectName: projectName,
            categoryId: categoryId,
            description: description
        }
    },
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: UPDATE_PROJECT,
            projectUpdate: values
        })
    },
    displayName: 'FormEditProject'
})(FormEdit)


const mapStateToProps = state => {
    return {
        projectEdit: state.ProjectReducer.projectEdit
    }
}


export default connect(mapStateToProps)(FormEditProject)