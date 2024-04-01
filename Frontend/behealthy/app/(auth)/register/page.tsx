'use client'
import React, { useLayoutEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { UsersRegisterRequest, loginUser, registerUser } from '@/app/services/users';

const handleRegisterUser = async (request: UsersRegisterRequest) => {
  try {
    const jwt : string = await registerUser(request);
    return jwt;
  } catch {
    return "Fail";
  }
}


const App: React.FC = () => {
  const router = useRouter()
  useLayoutEffect(() => {
		if(localStorage.getItem("auth") == "true"){
		  router.push("/dashboard")
		}
	  }, [])
    
  const onFinish = async (values: any) => {
    const {userName, email, password} = values
    const token = await handleRegisterUser(values)
    if (token == "Fail") {
      handleFinish()
    } else {
      const jwt : string = await loginUser({email, password});
      localStorage.setItem("data", jwt)
      localStorage.setItem("auth", "true")
      router.push("/dashboard")
    }
  };

  const [showAlert, setShowAlert] = useState(false)
  const handleFinish = () => {
    setShowAlert(true);
  }

  return (
    <div className="appBg">
    <Form
      name="normal_login"
      className="register-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      size="large"
    >
      <Typography.Title style={{padding: "0 0 0 145px"}}> Регистрация: </Typography.Title>
      {showAlert &&  <Alert message="Ошибка ввода или такой пользователь уже существует!" type="error" banner={true}/>}
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Пожалуйста введите почту!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Почта" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item style={{padding: "15px 0 10px"}}>
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => console.log(localStorage.getItem("data"))}>
          Войти
        </Button>
          <i style={{padding: '5px'}}> Уже есть аккаунт?  </i> <a href="/login">Войти </a>
      </Form.Item>
    </Form>
    </div>
  );
};

export default App;