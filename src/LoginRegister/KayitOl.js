import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./KayitOl.css";
import { signUp } from "../config/firebase"; // Firebase signUp fonksiyonunu içe aktarın
import { LeftOutlined } from "@ant-design/icons";

const KayitOl = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // Firebase signUp fonksiyonunu kullanarak kullanıcıyı kaydet
      await signUp(
        values.user.name.firstName,
        values.user.name.mail,
        values.user.name.password
      );

      // Kayıt işlemi başarılıysa giriş sayfasına yönlendir
      navigate("/");
    } catch (error) {
      console.error("Kayıt olurken hata oluştu:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="center-container">
      <div className="form-box">
        <h1 className="gradient-text">Kayıt Ol</h1>
        <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
          <Form.Item name={["user", "name", "firstName"]} label="İsim">
            <Input />
          </Form.Item>
          <Form.Item name={["user", "name", "mail"]} label="Mail">
            <Input />
          </Form.Item>
          <Form.Item name={["user", "name", "password"]} label="Şifre">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="" htmlType="submit" className="gonder">
              Gönder
            </Button>
          </Form.Item>
        </Form>
        <Button type="" onClick={handleBackClick} className="back-button">
          <LeftOutlined />
        </Button>
      </div>
    </div>
  );
};

export default KayitOl;
