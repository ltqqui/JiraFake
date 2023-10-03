import React from 'react'
import { Button, Descriptions, PageHeader, Avatar } from 'antd';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { useDispatch } from 'react-redux';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../../redux/constants/CyberBug/GlobalLoading/GlobalLoading';
export default function Header() {
    const dispatch=useDispatch()
    const { userLogin } = useSelector(state => state.UserLoginCyberBugsReducer);
    return (
        <div>

            <div className="site-page-header-ghost-wrapper" style={{ margin: 0, marginTop: 10 }}>
                {userLogin.id ? <PageHeader
                    extra={[

                        <Avatar src={userLogin.avatar} style={{ width: 40, height: 40 }} />,
                        <Button key="3" type='danger' onClick={()=>{
                            localStorage.removeItem(TOKEN)
                            localStorage.removeItem(USER_LOGIN)
                            let i=1;
                            const lopp=setInterval(()=>{
                                dispatch({
                                    type:DISPLAY_LOADING
                                })
                                i++;
                                if(i>10){
                                    clearInterval(lopp);
                                    dispatch({
                                        type:HIDE_LOADING
                                    })
                                    window.location.reload()
                                }
                            },300)
                        }}>SignOUt</Button>,
                    ]}
                >
                </PageHeader> : <PageHeader
                    extra={[

                        <Button key="3" type='primary' >
                            <NavLink to={'/login'}>SignIn</NavLink>
                        </Button>,
                        <Button key="2">
                            <NavLink to={'/register'}>SingUp</NavLink>
                        </Button>,
                    ]}
                >
                </PageHeader>}

            </div>
        </div>
    )
}
