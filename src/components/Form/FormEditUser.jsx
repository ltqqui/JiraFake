import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { SET_SUBMIT_FORM } from '../../redux/constants/CyberBug/DrawerConst';
import { Editor } from '@tinymce/tinymce-react';
import parseHTML from 'html-react-parser';
import { withFormik } from 'formik';
import { GET_ALL_PROJECT_CATEGORY, GET_PROJECT_CATEGORY_REDUX } from '../../redux/constants/CyberBug/ProjectCategory';
import { UPDATE_PROJECT } from '../../redux/constants/CyberBug/ProjectConst';
import { EDIT_USER_MANAGEMENT } from '../../redux/constants/CyberBug/CyberBugConst';
function FromEditUser(props) {
    let dispatch = useDispatch();

    const {
        setFieldValue,
        handleChange,
        handleSubmit,
        values
    } = props


    useEffect(() => {
        dispatch({
            type: SET_SUBMIT_FORM,
            submitFunction: handleSubmit
        })
    }, [])

    return (
        <div>
            {/* <h4 className='mt-2 mb-5 text-center text-success'>Edit project</h4> */}
            <form className='container-fluid' onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-6">
                        <p className='text-weight-bold'>ID</p>
                        <input type="text" value={values.id} className='form-control' name='id' disabled />
                    </div>
                    <div className="form-group col-6">
                        <p className='text-weight-bold'> Email</p>
                        <input type="text" onChange={handleChange} value={values.email} className='form-control' name='email' />
                    </div>
                </div>
                <div className="row">
                <div className="form-group col-6">
                        <p className='text-weight-bold'>Name</p>
                        <input type="text" onChange={handleChange} value={values.name} className='form-control' name='name' />
                    </div>
                    <div className="form-group col-6">
                        <p className='text-weight-bold'>Phone number</p>
                        <input type="text" onChange={handleChange} value={values.phoneNumber} className='form-control' name='phoneNumber' />
                    </div>
                </div>
            </form>
        </div>
    )
}


const FromEditUserWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { userId ,email,name,phoneNumber} = props?.userEdit
        return {
            id: userId,
            email: email,
            name: name,
            phoneNumber:phoneNumber
        }
    },
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type:EDIT_USER_MANAGEMENT,
            userEdit:values
        })
    },
    displayName: 'FromEditUserWithFormik'
})(FromEditUser)


const mapStateToProps = state => {
    return {
        userEdit: state.UserLoginCyberBugsReducer.userEdit
    }
}


export default connect(mapStateToProps)(FromEditUserWithFormik)