/* eslint-disable */
import React, { useEffect, useState } from "react";
import LayoutHDV from "../../../components/layout/layoutHDV";
import "./style.css";
import { Form, Input, Select, Radio, DatePicker, Button, Modal } from "antd";
import ModalAddVoucher from "../../../components/modalAddVoucher";
export default function AddVoucher() {
  useEffect(() => {}, []);
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const onFinish = (values) => {
    console.log(`values`, values);
  };
  const selectBefore = (
    <Select defaultValue="FIX" className="select-before">
      <Option value="FIX">Theo số tiền</Option>
      <Option value="RATE">Theo phần trăm</Option>
    </Select>
  );
  return (
    <>
      <LayoutHDV>
        <div className="voucher-create">
          <div className="card-style new-voucher">
            <div className="card-content">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <h3 className="title-voucher">Thông tin cơ bản</h3>
                <Form.Item
                  name="name"
                  label="Tên voucher"
                  rules={[
                    {
                      required: true,
                      message: "Tên voucher ko để trống!",
                    },
                  ]}
                >
                  <Input placeholder="Tên voucher" />
                </Form.Item>
                <Form.Item
                  name="code"
                  label="Mã voucher"
                  rules={[
                    {
                      required: true,
                      message: "Mã voucher ko để trống!",
                    },
                  ]}
                >
                  <Input showCount maxLength={5} placeholder="Mã voucher" />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Mô tả"
                  rules={[
                    {
                      required: true,
                      message: "Mô tả ko để trống!",
                    },
                  ]}
                >
                  <Input placeholder="Mô tả voucher" />
                </Form.Item>
                <Form.Item
                  name="times"
                  label="Thời gian sử dụng "
                  rules={[
                    {
                      required: true,
                      message: "Thời gian không để trống",
                    },
                  ]}
                >
                  <RangePicker showTime />
                </Form.Item>
                <h3 className="title-voucher">Thiết lập mã giảm giá</h3>
                <Form.Item
                  name="discountType"
                  label="thLoại giảm giá | Mức giảm "
                  rules={[
                    {
                      required: true,
                      message: "Loại giảm giá | Mức giảm không để trống",
                    },
                  ]}
                >
                  <Input addonBefore={selectBefore} addonAfter="đ" />
                </Form.Item>
                <Form.Item
                  name="value"
                  label="Số giảm"
                  rules={[
                    {
                      required: true,
                      message: " Mức giảm không để trống",
                    },
                  ]}
                >
                  <Input addonBefore="đ" placeholder="" allowClear />
                </Form.Item>
                <Form.Item
                  name="quantity"
                  label="Tổng lượt sử dụng tối đa"
                  rules={[
                    {
                      required: true,
                      message: "Tổng lượt sử dụng không để trống",
                    },
                  ]}
                >
                  <Input placeholder="Số mã giảm giá" />
                </Form.Item>
                <span className="form-desc">
                  Tổng số Mã giảm giá có thể sử dụng
                </span>
                <h3 className="title-voucher">
                  Hiển thị mã giảm giá và các sản phẩm áp dụng
                </h3>
                <Form.Item name="status" label="Hiển thị Voucher">
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={0}>Ẩn </Radio>
                    <Radio value={1}>Hiện</Radio>
                  </Radio.Group>
                </Form.Item>
                {/* <Form.Item name="apply" label="Áp dụng cho">
                  <ModalAddVoucher />
                </Form.Item> */}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="form-button"
                  >
                    Lưu
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </LayoutHDV>
    </>
  );
}
