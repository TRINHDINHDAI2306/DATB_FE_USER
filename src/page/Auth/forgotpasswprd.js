/* eslint-disable */
import React, { useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Form, Input, Button, notification, message, Result } from "antd";
import "../../assets/css/auth.css";
import { Link } from "react-router-dom";
import { sendPost } from "../../utils/api";
export default function ForgotPassword() {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const onFinish = async (values) => {
    const res = await sendPost("/auth/send-otp-forgot-password", values);
    if (res.statusCode === 200) {
      notification.open({
        message: "Mật khẩu mới đã gửi về Email thành công",
        description: "Bạn vui lòng kiểm tra Email để có thể vào học nhé~~",
        icon: <SmileOutlined style={{ color: "#e52525" }} />,
      });
      setStep(2);
      form.resetFields();
    } else {
      return message.error("Không tìm thấy Tài khoản");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish2 = async (values) => {
    values.email = email;
    const res = await sendPost("/auth/forgot-password", values);
    if (res.statusCode === 200) {
      notification.open({
        message: "THành công",
        description: "",
        icon: <SmileOutlined style={{ color: "#e52525" }} />,
      });
      setStep(3);
      form.resetFields();
    }
    if (res.status === 400) {
      if (values.password < 6) {
        return message.error("Password cần trên 6 kí tự!");
      }
      return message.error("Email đã tồn tại");
    }
  };

  const onFinishFailed2 = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="signin__wrapper">
        {step == 1 && (
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
            className="auth-form"
          >
            <h3 className="auth-title">Quên mật khẩu</h3>

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
              <Input
                placeholder="Email của bạn"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Button className="button button--primary" htmlType="submit">
              Nhận mã
            </Button>
            <div className="auth-des">
              <Link to="/dang-nhap" className="travel-link auth-des-link">
                Đăng nhập?
              </Link>
            </div>
          </Form>
        )}
        {step == 2 && (
          <>
            <Form
              onFinish={onFinish2}
              onFinishFailed={onFinishFailed2}
              autoComplete="off"
              form={form}
              className="auth-form"
            >
              <h3 className="auth-title">Nhập mã xác nhận</h3>

              <Form.Item
                className="auth-form-item"
                name="otp"
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
              <Form.Item
                className="auth-form-item"
                name="password"
                hasFeedback
                rules={[
                  {
                    validateStatus: "error",
                    required: true,
                    message: "Mật khẩu ko để trống",
                  },
                ]}
              >
                <Input placeholder="Mật khẩu mới" />
              </Form.Item>
              <Button className="button button--primary" htmlType="submit">
                Đổi mật khẩu
              </Button>
              <div className="auth-des">
                <Link to="/dang-nhap" className="travel-link auth-des-link">
                  Đăng nhập?
                </Link>
              </div>
            </Form>
          </>
        )}
        {step == 3 && (
          <>
            <Result
              status="success"
              title="Đổi mật khẩu thành công"
              subTitle=""
              extra={[
                <Link to="/dang-nhap" className=" button button--primary ">
                  Đăng nhập?
                </Link>,
              ]}
            />
          </>
        )}
      </div>
    </>
  );
}
