import React from 'react'
import { UserOutlined, LockOutlined, TwitterOutlined,PushpinOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { Form, withFormik } from 'formik'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { USER_REGISTER, USER_SIGNIN_API } from '../../../redux/constants/CyberBug/CyberBugConst';
import { signiAction } from '../../../redux/action/CyberBugAction';
function RegisterCyberBugs(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    return (
        <div style={{ width: '60%' }}>
            <h2 style={{ textAlign: 'center' }}>Register</h2>
            <form onSubmit={handleSubmit} className="container" style={{ width: '100%' }} >
                <div className="form-group"  >
                    <Input onChange={handleChange} name="email" size="large" placeholder="email" prefix={<UserOutlined />} />
                    <div className="text-danger">{errors.email}</div>
                    <div className="d-flex mt-3">
                        <Input onChange={handleChange} type="password" name="password" size="large" placeholder="password" prefix={<LockOutlined />} />
                    </div>
                    <div className="text-danger">{errors.password}</div>
                    <div className="d-flex mt-3">
                        <Input onChange={handleChange} type="text" name="name" size="large" placeholder="name" prefix={<PushpinOutlined />} />
                    </div>
                    <div className="text-danger">{errors.name}</div>
                    <div className="d-flex mt-3">
                        <Input onChange={handleChange} type="text" name="phoneNumber" size="large" placeholder="phone number" prefix={<PhoneOutlined />} />
                    </div>
                    <div className="text-danger">{errors.phoneNumber}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Button htmlType="submit" size="large" style={{ width: '60%', backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-4">Register</Button>
                    </div>
                    <div className="social mt-3 d-flex justify-content-center">
                        <Button style={{ backgroundColor: 'rgb(59,89,152)' }} shape="circle" size={"large"}>
                            <span className="font-weight-bold" style={{ color: '#fff' }} >F</span>
                        </Button>
                        <Button type="primary ml-3" shape="circle" icon={<TwitterOutlined />} size={"large"}>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}




const RegisterCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
        name:'',
        phoneNumber:''
    }),
    validationSchema: yup.object().shape({
        email: yup.string().required('Email is required !').email(' Email is invalid ! '),
        password: yup.string().min(4, 'password must have min 6 character !').max(32, 'password have max 32 character !'),
        name:yup.string().required('Name is required !'),
        phoneNumber:yup.string().required('Phone number is required !').matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Phone number is not valid')
    }),
    handleSubmit: (value, { props, setSubmitting }) => {
        props.dispatch({
            type:USER_REGISTER,
            userRegister:value
        })
    },
    displayName: 'Register CyberBugs',
})(RegisterCyberBugs);

export default connect () (RegisterCyberBugsWithFormik)
