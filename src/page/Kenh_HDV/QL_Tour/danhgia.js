/* eslint-disable */
import React, { useEffect } from "react";
import LayoutHDV from "../../../components/layout/layoutHDV";
import "./style.css";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Table,
  Space,
  Popconfirm,
} from "antd";

export default function DanhGia() {
  const columns = [
    {
      title: "Tên tour",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đánh giá người dùng",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Mức độ hài lòng",
      dataIndex: "star",
      key: "star",
    },
    {
      title: "Trả lời đánh giá",
      dataIndex: "reply",
      key: "reply",
    },

    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div className="action" style={{ backgroundColor: "#1890ff" }}>
            {data.length >= 1 ? (
              <Popconfirm
                title="Xóa Tour?"
                onConfirm={() => handleDelete(record.id)}
              >
                Xóa
              </Popconfirm>
            ) : null}
          </div>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "Du lịch Cẩn thơ 2 ngày",
      rate: "Đây là mô tả đánh giá",
      star: "4",
      reply: "rep ly",
    },
    {
      key: "1",
      name: "Du lịch Cẩn thơ 2 ngày",
      rate: "Đây là mô tả đánh giá",
      star: "4",
      reply: "rep ly",
    },
    {
      key: "1",
      name: "Du lịch Cẩn thơ 2 ngày",
      rate: "Đây là mô tả đánh giá",
      star: "4",
      reply: "rep ly",
    },
  ];
  const handleDelete = async (key) => {
    // eslint-disable-next-line no-unused-vars
    const del = await sendDelete(`api/course/${key}`);
    if (del.status === 200) {
      await listCourse();
    } else {
      message.error("Không thể xóa khóa học");
    }
  };
  const listCourse = async (key) => {
    const res = await sendGet("/api/course", {});
    if (res.status === 200) {
      setData(res.data);
    } else {
      message.error("Cập nhật khóa học thất bại");
    }
  };
  useEffect(() => {
    listCourse();
  }, []);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const { RangePicker } = DatePicker;

  return (
    <>
      <LayoutHDV>
        <div className="rate_main">
          <div className="rate_header">
            <p className="landing-page-title">Đánh giá tour</p>
            <p className="desc-content">Xem đánh giá tour của bạn</p>
          </div>
          <div className="rate-body">
            <div className="rate-search">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item name="name" label="Tên Tour">
                  <Input placeholder="Tên tour" />
                </Form.Item>
                <Form.Item name="code" label="Mã tour">
                  <Input showCount maxLength={5} placeholder="Mã tour" />
                </Form.Item>
                <Form.Item name="times" label="Thời gian đánh giá ">
                  <RangePicker />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="form-button"
                  >
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="rate-body">
              <div className="header-tab">
                <ul className="tab-nav">
                  <li className="tab-item active">Tất cả</li>
                  <li className="tab-item">Chưa trả lời</li>
                  <li className="tab-item">Đã trả lời</li>
                </ul>
              </div>
              <div className="rate-content">
                <div className="shopee-tabs__nav-warp">
                  <div
                    className="shopee-tabs__nav-tabs"
                    style={{ transform: "translateX(0px)" }}
                  >
                    <div className="shopee-tabs__nav-tab">Tất cả </div>
                    <div className="shopee-tabs__nav-tab">
                      <span className="title">5 Sao</span>
                    </div>
                    <div className="shopee-tabs__nav-tab">
                      <span className="title">4 Sao</span>
                    </div>
                    <div className="shopee-tabs__nav-tab">
                      <span className="title">3 Sao</span>
                    </div>
                    <div className="shopee-tabs__nav-tab">
                      <span className="title">2 Sao</span>
                    </div>
                    <div className="shopee-tabs__nav-tab active">
                      <span className="title">1 Sao</span>
                    </div>
                  </div>
                </div>
                <Table columns={columns} dataSource={data} />
              </div>
            </div>
          </div>
        </div>
      </LayoutHDV>
    </>
  );
}
