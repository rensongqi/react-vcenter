import React from "react";
import type {FormProps} from "antd";
import {Button, Form, Input} from "antd";
import {GetFromBackend} from "../../utils/request";

type VMInfo = {
    vm_name?: string;
};

const onFinish: FormProps<VMInfo>['onFinish'] = async (values) => {
    console.log('Success:', values);
    try {
        const res = await GetFromBackend('/api/vm/ticket', values)
        console.log('res: ', res);
        window.open('/console/' + res.data.ticket + '?host=' + res.data.host)
    } catch (e) {
        console.log('e: ', e);
    }
};

const Home: React.FC = () => {
    return (
        <div style={{display:'flex', justifyContent:'center', marginTop: '70px'}}>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // autoComplete="off"
            >
                <Form.Item<VMInfo>
                    label={<div style={{fontSize:"16px"}}>vm_name</div>}
                    tooltip={"eg: SHJDS-RSQ01-172.16.108.21"}
                    name="vm_name"
                    rules={[{ required: true, message: 'Please input vm name!' }]}
                >
                    <Input style={{width:'300px'}}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default Home;
