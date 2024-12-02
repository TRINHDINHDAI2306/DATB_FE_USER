/* eslint-disable */
import React, { useEffect } from "react";
import { Form, Input, Button, Popconfirm, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LayoutHDV from "../../../components/layout/layoutHDV";
import "./style.css";
import { sendDelete, sendGet } from "../../../utils/api/index";
export default function Detail() {
  const history = useHistory();
  useEffect(() => {}, []);
  const onFinish = (values) => {
    console.log(`values`, values);
  };
  const { Option } = Select;

  return (
    <>
      <LayoutHDV>
        <div className="mainDetail">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Tên tour"
              rules={[
                {
                  required: true,
                  message: "Tên tour ko để trống!",
                },
              ]}
              initialValue="Tour Bắc Ninh 2 ngày 1 đêm"
            >
              <Input placeholder="Tên tour" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả "
              rules={[
                {
                  required: true,
                  message: "Mô tả ko để trống!",
                },
              ]}
            >
              <Input placeholder="Mô tả" />
            </Form.Item>
            <Form.Item label="Upload" valuePropName="fileList">
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="form-button">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </LayoutHDV>
    </>
  );
}
