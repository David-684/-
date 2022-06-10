import React, {Component} from 'react';
import './login.less'
import logo from '../../assets/images/logo.png'
import {Button, Form, Icon, Input, message} from "antd";
import {reqLogin} from "../../api";
import storageUtils from "../../utils/storageUtils";
import memoryUtils from "../../utils/memoryUtils";
import {Redirect} from "react-router-dom";
const Item = Form.Item;
/*
* 登录路由组件
* */
class Login extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields(async (err,values)=>{
            if(!err){
                let res=await reqLogin({username:values.username,password:values.password});
                if(res.data.status===0){
                    const user=res.data.data;
                    memoryUtils.user=user;
                    storageUtils.saveUser(user);
                    this.props.history.replace('/');
                    message.success('登陆成功');
                }else {
                    message.error(res.data.msg);
                }
            }else {
                console.log('验证不成功')
            }
        })

    }
    validatePwd=(rule,value,callback)=>{
        if(!value){
            callback('必须输入密码');
        }else if (value.length<4){
            callback('密码必须大于四位');
        }else if (value.length>124){
            callback('密码必须小于12位');
        }else if (!((/^[a-zA-Z0-9_]+$/).test(value))){
            callback('密码必须是英文数字下划线');
        }else {
            callback()
        }
    }

    render() {
        const user=memoryUtils.user;
        if(user&&user._id){
            return <Redirect to='/'/>
        }
        const form = this.props.form;
        const {getFieldDecorator} = form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {
                                getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                                    // 声明式验证: 直接使用别人定义好的验证规则进行验证
                                    rules: [
                                        {required: true, message: '用户名必须输入'},
                                        {min: 4, message: '用户名至少4位'},
                                        {max: 12, message: '用户名最多12位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'},
                                    ],
                                    initialValue: 'admin', // 初始值
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Item>
                        <Item> {
                            getFieldDecorator('password', {
                                rules:[{
                                    validator:this.validatePwd
                                }]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="密码"
                                />
                            )
                        }
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        );
    }
}

const WrapLogin = Form.create({})(Login);
export default WrapLogin;
