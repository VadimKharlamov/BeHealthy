'use client'
import React, { useLayoutEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { UsersLoginRequest, loginUser } from '@/app/services/users';
import Alert from 'antd/es/alert/Alert';
import { redirect, useRouter } from 'next/navigation';
const handleLoginUser = async (request: UsersLoginRequest) => {
  try {
    const jwt : string = await loginUser(request);
    return jwt;
  } catch {
    return "Fail";
  }
}

const App: React.FC = () => {
  useLayoutEffect(() => {
		if(localStorage.getItem("auth") == "true"){
		  redirect("/dashboard")
		}
	  }, [])
  const router = useRouter()
  const onFinish = async (values : any) => {
    const {email, password} = values
    const token = await handleLoginUser(values)
    if (token == "Fail") {
      handleFinish()
    } else {
      localStorage.setItem("data", token)
      localStorage.setItem("auth", "true")
      router.push("/dashboard")
    }
  }
  const [showAlert, setShowAlert] = useState(false)
  const handleFinish = () => {
    setShowAlert(true);
  }
  return (
    <div className="appBg">
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      size="large"
    >
      <Typography.Title style={{padding: "0 0 0 90px"}}> Добро пожаловать! </Typography.Title>
      {showAlert &&  <Alert message="Неверный Email или пароль" type="error" banner={true}/>}
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Пожалуйста введите почту!' }]}
        style={{padding: "15px 0 0px"}}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Почта" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
        style={{padding: "15px 0 0px"}}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item style={{padding: "15px 0 10px"}}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Войти
        </Button>
          <i style={{padding: '5px'}}> Нет аккаунта?  </i> <a href="/register">Зарегестрироваться </a>
      </Form.Item>
    </Form>
    </div>
  );
};

export default App;