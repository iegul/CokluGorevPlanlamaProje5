import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Col, Row } from "antd";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import { signIn } from "../config/firebase"; // Firebase fonksiyonunu içe aktar
import Synergy from "../Text/Synergy";

const SignIn = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { email, password } = values;

    signIn(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User Found:", user);
        navigate("/giris"); // Kullanıcı bulunduysa "/giris" sayfasına yönlendir
      })
      .catch((error) => {
        console.log("User Not Found:", error);
        alert("Yanlış mail veya şifre girdiniz"); // Kullanıcı bulunamadıysa uyarı göster
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="center-container">
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col span={24}>
          <div className="form-container">
            <h1 className="heading">
              <Synergy></Synergy>
            </h1>
            <h1 className="sub-heading">Welcome To App</h1>
            <Form
              name="basic"
              labelCol={{
                span: 2,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <div>
                  <label>Email</label>
                  <Input />
                </div>
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <div>
                  <label>Password</label>
                  <Input.Password />
                </div>
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 1,
                  span: 18,
                }}
              >
                <Checkbox className="remember-me">Remember me</Checkbox>
              </Form.Item>

              <div className="button-enter">
                <Form.Item
                  wrapperCol={{
                    span: 24,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Giriş
                  </Button>
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    span: 24,
                  }}
                >
                  <Button type="default" onClick={() => navigate("/kayitol")}>
                    Kayıt Ol
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;

