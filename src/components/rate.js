import React, { useState } from "react";
import { Button, Form, Modal, message } from "antd";
import { Rate } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { sendPut } from "../utils/api";

function RateScreen(props) {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState(2.5);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async (value) => {
    try {
      value.orderId = props.data.id;
      value.star = number;
      let res = await sendPut(`/orders/rate-order`, value);
      if (res.statusCode === 200) {
        message.success("Đã đánh giá tour");
        setOpen(false);
      } else {
        message.error("thất bại");
      }
    } catch (error) {
      message.error("Không thể đánh giá tour");
    }
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  return (
    <>
      <div className="button button--primary" onClick={showModal}>
        Đánh giá
      </div>
      <Modal
        title="Đánh giá "
        centered
        visible={open}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Hủy"
        okText="Gửi"
      >
        <div className="mytrip-order__rate-header">
          <img
            className="mytrip-order-img"
            alt=""
            src={props.data?.tour?.images[0].url}
          />
          <h4 className="mytrip-order-name">{props.data.tour.name}</h4>
        </div>
        <div className="mytrip-order__rate-body">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={handleOk}
            onFinishFailed={handleCancel}
            autoComplete="off"
          >
            <Form.Item name="content" style={{ marginTop: "20px" }}>
              <TextArea rows={4} placeholder="nhập nội dung đánh giá" />
            </Form.Item>

            <Form.Item name="star">
              <div className="mytrip-order__rate-star">
                <Rate
                  allowHalf
                  defaultValue={2.5}
                  onChange={(value) => setNumber(value)}
                />
              </div>
            </Form.Item>
            <div className="mytrip-order__rate-note">
              <p className="mytrip-order__rate-note-name">
                Để đánh giá được duyệt, quý khách vui lòng tham khảo
              </p>
              <span className="mytrip-order__rate-note-value">
                Quy định duyệt đánh giá
              </span>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}
export default RateScreen;
