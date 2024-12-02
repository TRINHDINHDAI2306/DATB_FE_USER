/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Modal, Table } from "antd";
export default function ModalAddVoucher() {
  useEffect(() => {}, []);
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinishModal = (values) => {
    console.log("Success:", values);
  };
  const onFinishModalFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const selectBefore = (
    <Select defaultValue="1" className="select-before">
      <Option value="1">Theo số tiền</Option>
      <Option value="0">Theo phần trăm</Option>
    </Select>
  );
  const columns = [
    {
      title: "Tên tour",
      dataIndex: "name",
    },
    {
      title: "Mã KH",
      dataIndex: "codePerson",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Mã tour",
      dataIndex: "code",
    },
  ];
  const data = [
    {
      key: "1",
      name: "Du lịch 4 phương",
      codePerson: "1289",
      price: "120.00đ",
      code: "768",
    },
    {
      key: "2",
      name: "Du lịch 4 phương",
      codePerson: "1289",
      price: "120.00đ",
      code: "768",
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <>
      <div class="button-add" onClick={showModal}>
        <i class="fa-solid fa-plus"></i>
        <span>Thêm tour</span>
      </div>
      <Modal
        title="Chọn tour"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="modal_slect_tour">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishModal}
            onFinishFailed={onFinishModalFailed}
            autoComplete="off"
          >
            <Form.Item label="Phân loại" name="type">
              <Select defaultValue="1">
                <Option value="1">Tour kín</Option>
                <Option value="2">Tour ẩm thực</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Tên sản phẩm" name="name">
              <Input placeholder="Tên sản phẩm" />
            </Form.Item>

            <Form.Item>
              <div className="button-modal">
                <Button type="primary" htmlType="submit">
                  Tìm
                </Button>
              </div>
            </Form.Item>
          </Form>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      </Modal>
    </>
  );
}
