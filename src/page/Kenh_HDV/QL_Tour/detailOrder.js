/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Form,
  DatePicker,
  Input,
  Button,
  Modal,
  Result,
  message,
} from "antd";
import "./style.css";
import { PlusOutlined } from "@ant-design/icons";
import LayoutHDV from "../../../components/layout/layoutHDV";
import "./style.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { sendDelete, sendGet, sendPut } from "../../../utils/api/index";
export default function DetailOrder() {
  const params = useParams();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleStatusTour = async (e) => {
    try {
      const res = await sendPut("/orders/tourguide/approve-order", {
        action: e,
        orderId: parseInt(params.id),
      });
      setIsModalOpen(false);
      if (res.statusCode === 200) {
        message.error("Thành công");
        history.push("/kenh-hdv/don-hang");
      } else {
        message.error(" thất bại");
      }
    } catch (error) {
      message.error("Ko thành công");
    }
  };
  return (
    <>
      <LayoutHDV>
        <div className="mainDetail">
          <div className="btn-group">
            <Button onClick={() => showModal()}>Xác nhận</Button>
            <Button onClick={() => handleStatusTour("reject")}>Từ chối</Button>
            <Button>Quay lại</Button>
          </div>
          <h3 className="nameTour">Tên tour</h3>
          <p className="des">nội dung gì đó</p>
        </div>

        <Modal
          title=""
          open={isModalOpen}
          visible={isModalOpen}
          onOk={handleStatusTour}
          onCancel={handleCancel}
          footer={null}
          width={400}
        >
          <div className="noti-changestatus">
            <h3>Xác nhận đặt cọc</h3>
            <div className="change-money">
              <p className="change-money-value">10.000đ</p>
              <p className="change-money-icon">
                <i class="fa-solid fa-repeat"></i>
              </p>
              <p className="change-money-value">30%</p>
            </div>
            <div className="btn-group">
              <div
                className="button button--primary"
                onClick={() => handleStatusTour("accept")}
              >
                Xác nhận
              </div>
              <div className="button button--normal" onClick={handleCancel}>
                Hủy
              </div>
            </div>
          </div>
        </Modal>
      </LayoutHDV>
    </>
  );
}
