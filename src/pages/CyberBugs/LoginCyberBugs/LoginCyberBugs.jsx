import React from 'react'
import { UserOutlined, LockOutlined, TwitterOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { Form, withFormik } from 'formik'
import * as yup from 'yup'
import {connect} from 'react-redux'
import { USER_SIGNIN_API } from '../../../redux/constants/CyberBug/CyberBugConst';
import { signiAction } from '../../../redux/action/CyberBugAction';
function LoginCyberBugs(props) {

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
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <form onSubmit={handleSubmit} className="container" style={{ width: '100%' }} >
            <div className="form-group"  >
                <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}> </h3>
                <Input onChange={handleChange}  name="email" size="large" placeholder="email" prefix={<UserOutlined />} />
                <div className="text-danger">{errors.email}</div>
                <div className="d-flex mt-3">
                    <Input onChange={handleChange}  type="password" name="password" size="large" placeholder="password" prefix={<LockOutlined />} />
                </div>
                <div className="text-danger">{errors.password}</div>

                <div style={{display:'flex', justifyContent:'center',width:'100%'}}>
                <Button htmlType="submit" size="large" style={{width:'60%', backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-4">Login</Button>
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



const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema: yup.object().shape({
        email: yup.string().required('Email is required !').email(' Email is invalid ! '),
        password: yup.string().min(4, 'password must have min 6 character !').max(32, 'password have max 32 character !')
    }),
    handleSubmit: ({email,password}, { props, setSubmitting }) => {
        props.dispatch(signiAction(email,password))
        // console.log(values)
    },
    displayName: 'Login CyberBugs',
})(LoginCyberBugs);

export default connect () (LoginCyberBugsWithFormik)
