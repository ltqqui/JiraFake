import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import  {useSelector, useDispatch} from 'react-redux'
import { CLOSE_DRAWER, OPEN_DRAWER } from '../redux/constants/CyberBug/DrawerConst';
const { Option } = Select;
export default function DrawerCyberBugs() {
      let{visible, callBackSubmit,ComponentContentDrawer,title}=useSelector(state=>state.DrawerReducer);
      let dispatch=useDispatch()
    const showDrawer = () => {
        dispatch({
          type:OPEN_DRAWER
        })
    };
    const onClose = () => {
      dispatch({
        type:CLOSE_DRAWER
      })
    };
  return (
    <>
    <Drawer
      title={title}
      width={720}
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
     footer={
        <div style={{textAlign:'right'}}>
          <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button  onClick={callBackSubmit}type="primary">
            Submit
          </Button>
        </Space>
        </div>
     }
    >
      {ComponentContentDrawer}
    </Drawer>
  </>
  )
}
