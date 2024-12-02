/* eslint-disable eqeqeq */
// /* eslint-disable */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Tabs,
  Select,
  notification,
  message,
  DatePicker,
} from "antd";
import "../../assets/css/auth.css";
import { useHistory } from "react-router-dom";
import { sendPost } from "../../utils/api";
import { SmileOutlined } from "@ant-design/icons";
import { AppContext } from "../../Context/AppContext";
export default function SignUp() {
  const { provice } = useContext(AppContext);
  const { Option } = Select;
  const [form] = Form.useForm();
  const [formhdv] = Form.useForm();
  const history = useHistory();
  const onFinish = async (values) => {
    const res = await sendPost("/auth/register", values);
    if (res.statusCode == 200) {
      notification.open({
        message: "Đăng kí thành công",
        description: "Bạn vui lòng kiểm tra Email ",
        icon: <SmileOutlined style={{ color: "#e52525" }} />,
      });
      form.resetFields();
      history.push(`/active-user/${values.email}`);
    }
    if (res.statusCode === 400) {
      if (values.password < 6) {
        return message.error("Password cần trên 6 kí tự!");
      }
      return message.error("Email đã tồn tại");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinishHDV = async (values) => {
    const res = await sendPost("/auth/register-tourguide", values);
    if (res.statusCode === 200) {
      notification.open({
        message: "Đăng kí thành công",
        description: "Bạn vui lòng kiểm tra Email ",
        icon: <SmileOutlined style={{ color: "#e52525" }} />,
      });
      formhdv.resetFields();
    } else {
      return message.error("Vui lòng kiểm tra lại, email đã tồn tại.");
    }
  };

  const onFinishFailedHDV = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="signin__wrapper signup__wrapper">
        <div className="auth-form">
          <h3 className="auth-title">Đăng ký</h3>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Người dùng" key="1">
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  name="username"
                  hasFeedback
                  rules={[
                    {
                      validateStatus: "error",
                      required: true,
                      message: "Username không được để trống!",
                    },
                  ]}
                >
                  <Input placeholder="Username của bạn" />
                </Form.Item>
                <Form.Item
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
                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Mật khẩu không để trống!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Password không khớp!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Nhập lại mật khẩu" />
                </Form.Item>
                <Button htmlType="submit" className="button button--primary">
                  Đăng Ký
                </Button>
                <div className="auth-des">
                  <p className="auth-des-note">
                    Đã có tài khoản? Bạn muốn{" "}
                    <Link
                      to="/dang-nhap"
                      className="travel-link auth-des-link-note"
                    >
                      Đăng nhập?
                    </Link>
                  </p>
                </div>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Hướng dẫn viên" key="2">
              <Form
                onFinish={onFinishHDV}
                onFinishFailed={onFinishFailedHDV}
                autoComplete="off"
                form={formhdv}
              >
                <Form.Item
                  name="name"
                  hasFeedback
                  rules={[
                    {
                      validateStatus: "error",
                      required: true,
                      message: "Họ tên không được để trống!",
                    },
                  ]}
                >
                  <Input placeholder="Họ tên của bạn" />
                </Form.Item>

                <div className="auth-group">
                  <Form.Item
                    name="username"
                    hasFeedback
                    rules={[
                      {
                        validateStatus: "error",
                        required: true,
                        message: "Username không được để trống!",
                      },
                    ]}
                  >
                    <Input placeholder="Username của bạn" />
                  </Form.Item>
                  <Form.Item
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
                </div>
                <div className="auth-group">
                  <Form.Item
                    name="phone"
                    hasFeedback
                    rules={[
                      {
                        validateStatus: "error",
                        required: true,
                        message: "SDT không được để trống!",
                      },
                    ]}
                  >
                    <Input placeholder="SDT của bạn" />
                  </Form.Item>
                  <Form.Item
                    name="gender"
                    hasFeedback
                    rules={[
                      {
                        validateStatus: "error",
                        required: true,
                        message: "Giới tính không được để trống!",
                      },
                    ]}
                  >
                    <Select placeholder="Giới tính" allowClear>
                      <Option value="1">Nam</Option>
                      <Option value="0">Nữ</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="auth-group">
                  <Form.Item
                    name="provinces"
                    hasFeedback
                    rules={[
                      {
                        type: "array",
                        validateStatus: "error",
                        required: true,
                        message: "Provice không được để trống!",
                      },
                    ]}
                  >
                    <Select placeholder="Tỉnh thành phố" mode="multiple">
                      {provice.map((item, index) => (
                        <Option value={item?.id} key={index}>
                          {item?.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="dob"
                    hasFeedback
                    rules={[
                      {
                        validateStatus: "error",
                        required: true,
                        type: "object",
                        message: "Ngày sinh không được để trống!",
                      },
                    ]}
                  >
                    <DatePicker placeholder="chọn ngày sinh" />
                  </Form.Item>
                </div>
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
                  Đăng Ký
                </Button>
                <div className="auth-des">
                  <p className="auth-des-note">
                    Đã có tài khoản? Bạn muốn{" "}
                    <Link
                      to="/dang-nhap"
                      className="travel-link auth-des-link-note"
                    >
                      Đăng nhập?
                    </Link>
                  </p>
                </div>
              </Form>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}
