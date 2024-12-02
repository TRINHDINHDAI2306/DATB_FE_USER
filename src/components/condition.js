import React, { useState } from "react";
import { Modal } from "antd";
function Condition(props) {
  const [open, setOpen] = useState(false);
  const formatterDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  return (
    <>
      <p className="mytrip-voucher-condition" onClick={showModal}>
        Điều kiện
      </p>
      <Modal
        title={props.data?.name}
        centered
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h4 className="voucher-popup-title">
          {props.data?.name ? props.data?.name : " Tên Voucher"}
        </h4>
        <p className="voucher-popup-time">
          Thời gian: Áp dụng đến {formatterDate.format(Date.parse(props.data.endDate))}
        </p>
        <p className="voucher-popup-dk">Điều kiện sử dụng:</p>
        <p className="voucher-popup-des">{props.data?.description}</p>
        {props.data?.claimed && <h3 className="voucher-popup-claimed">
          <i class="fa-solid fa-bag-shopping"></i>Số lượng đã lấy:  <span>{ }/{props.data?.quantity}</span>
        </h3>}
      </Modal>
    </>
  );
}
export default Condition;
