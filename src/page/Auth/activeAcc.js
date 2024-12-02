/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification, message } from "antd";
import "../../assets/css/auth.css";
import { Link } from "react-router-dom";
import { sendPut } from "../../utils/api";
import { useParams } from "react-router-dom";
import { SmileOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export default function ActiveAcc() {
  const history = useHistory();
  const [form] = Form.useForm();
  let params = useParams();
  console.log(params);
  const onFinish = async (values) => {
    const res = await sendPut(`/auth/active-user/${values.token}`, {
      email: values.email,
    });
    if (res.statusCode === 200) {
      notification.open({
        message: "Active thành công",
        description: "Bạn vui lòng đăng nhập lại",
        icon: <SmileOutlined style={{ color: "#e52525" }} />,
      });
      form.resetFields();
      history.push(`/dang-nhap`);
    } else {
      return message.error("Mã xác nhận không đúng");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="signin__wrapper">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
          className="auth-form"
        >
          <h3 className="auth-title">Kích hoạt tài khoản</h3>
          <Form.Item
            className="auth-form-item"
            name="email"
            hasFeedback
            initialValue={params.id}
            rules={[
              {
                validateStatus: "error",
                type: "email",
                message: "Email không hợp lệ!",
              },
              {
                validateStatus: "error",
                required: true,
                message: "Email không được để trống!",
              },
            ]}
          >
            <Input placeholder="Email của bạn" />
          </Form.Item>
          <Form.Item
            className="auth-form-item"
            name="token"
            hasFeedback
            rules={[
              {
                validateStatus: "error",
                required: true,
                message: "Mã xác nhận không được để trống!",
              },
            ]}
          >
            <Input placeholder="Mã xác nhận" />
          </Form.Item>
          <Button className="button button--primary" htmlType="submit">
            Active
          </Button>
          <div className="auth-des">
            <Link to="/dang-nhap" className="travel-link auth-des-link">
              Đăng nhập?
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}
