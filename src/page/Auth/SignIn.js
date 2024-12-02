/* eslint-disable */
import React, { useEffect } from "react";
import { Form, Input, Button, Tabs, notification, message } from "antd";
import "../../assets/css/auth.css";
import { SmileOutlined } from "@ant-design/icons";

import { Link, useHistory } from "react-router-dom";
import { sendPost } from "../../utils/api";
import { setItem, setRefreshToken, setToken } from "../../utils/storage";
export default function SignIn() {
  const [form] = Form.useForm();
  const [formHDV] = Form.useForm();
  const history = useHistory();
  const isSetting = 1;
  const onFinish = async (values) => {
    try {
      const res = await sendPost("/auth/login", values);
      if (res.statusCode == 200) {
        notification.open({
          message: "Đăng nhập thành công",
          // description: "Bạn vui lòng kiểm tra Email để có thể vào học nhé~~",
          icon: <SmileOutlined style={{ color: "#e52525" }} />,
        });
        setToken(res.returnValue.accessToken);
        setRefreshToken(res.returnValue.refreshToken);
        setItem("user", JSON.stringify(res?.returnValue));
        window.location.replace("/");
        form.resetFields();
      } else {
        message.error("Không khớp");
      }
    } catch (error) {
      message.error("Đăng nhập không hợp lệ");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinishHDV = async (values) => {
    try {
      const res = await sendPost("/auth/login-tourguide", values);
      if (res.statusCode === 200) {
        notification.open({
          message: "Đăng nhập thành công",
          icon: <SmileOutlined style={{ color: "#e52525" }} />,
        });
        setToken(res.returnValue.accessToken);
        setRefreshToken(res.returnValue.refreshToken);
        setItem("user", JSON.stringify(res?.returnValue));
        window.location.replace("/kenh-hdv");
        form.resetFields();
      } else {
        message.error("Không khớp");
      }
    } catch (error) {
      message.error("Đăng nhập không hợp lệ");
    }
  };

  const onFinishFailedHDV = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="signin__wrapper">
        <div className="auth-form">
          <h3 className="auth-title">Đăng nhập</h3>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Người dùng" key="1">
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  className="auth-form-item"
                  name="email"
                  hasFeedback
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
                  name="password"
                  hasFeedback
                  rules={[
                    {
                      validateStatus: "error",
                      required: true,
                      message: "Mật khẩu không được để trống!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Mật khẩu của bạn" />
                </Form.Item>

                <Button htmlType="submit" className="button button--primary">
                  Đăng nhập
                </Button>
                <div className="auth-des">
                  <Link to="/dang-ky" className="travel-link auth-des-link">
                    Đăng ký
                  </Link>
                  <Link
                    to="/quen-mat-khau"
                    className="travel-link auth-des-link"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Hướng dẫn viên" key="2">
              <Form
                onFinish={onFinishHDV}
                onFinishFailed={onFinishFailedHDV}
                autoComplete="off"
                form={formHDV}
              >
                <Form.Item
                  className="auth-form-item"
                  name="email"
                  hasFeedback
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
                  name="password"
                  hasFeedback
                  rules={[
                    {
                      validateStatus: "error",
                      required: true,
                      message: "Mật khẩu không được để trống!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Mật khẩu của bạn" />
                </Form.Item>

                <Button className="button button--primary" htmlType="submit">
                  Đăng nhập
                </Button>
                <div className="auth-des">
                  <Link to="/dang-ky" className="travel-link auth-des-link">
                    Đăng ký
                  </Link>
                  <Link
                    to="/quen-mat-khau"
                    className="travel-link auth-des-link"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </Form>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}
