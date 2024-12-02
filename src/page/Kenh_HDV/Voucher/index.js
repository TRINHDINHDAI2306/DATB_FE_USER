/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Input,
  Table,
  Space,
  Button,
  Popconfirm,
  Modal,
  Form,
  DatePicker,
  Select,
  Radio,
} from "antd";
import { Link } from "react-router-dom";
import LayoutHDV from "../../../components/layout/layoutHDV";
import { sendGet, sendDelete } from "../../../utils/api";
import "./style.css";
export default function Voucher() {
  useEffect(() => {}, []);
  const { Search } = Input;
  const onSearch = () => {};
  const columns = [
    {
      title: "Tên voucher",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mã voucher",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Loại mã",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tour áp dụng",
      dataIndex: "apply",
      key: "apply",
    },
    {
      title: "Giảm giá",
      dataIndex: "sale",
      key: "sale",
    },
    {
      title: "Tổng số mã",
      dataIndex: "sum",
      key: "sum",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div className="action" style={{ backgroundColor: "rgb(255 79 32)" }}>
            <ModalEditVoucher dataFromParent={record} list={listVoucher} />
          </div>
          <div className="action" style={{ backgroundColor: "#1890ff" }}>
            {data.length >= 1 ? (
              <Popconfirm
                title="Xóa Tour?"
                onConfirm={() => handleDelete(record.id)}
                key={data.key}
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
      time: "20/10/2023-22/10/2023",
      type: "1",
      sale: "20",
      apply: "Tour private",
      status: 1,
      sum: 20,
      code: "MD4",
    },
    {
      key: "2",
      name: "Du lịch Cẩn thơ 2 ngày",
      time: "20/10/2023-22/10/2023",
      type: "0",
      sale: "20",
      apply: "Tour private",
      status: 1,
      sum: 20,
      code: "MD4",
    },
    {
      key: "3",
      name: "Du lịch Cẩn thơ 2 ngày",
      time: "20/10/2023-22/10/2023",
      type: "1",
      sale: "20",
      apply: "Tour private",
      status: 1,
      sum: 20,
      code: "MD4",
    },
  ];
  const handleDelete = async (key) => {
    // eslint-disable-next-line no-unused-vars
    const del = await sendDelete(`api/course/${key}`);
    if (del.status === 200) {
      await listVoucher();
    } else {
      message.error("Không thể xóa khóa học");
    }
  };
  const listVoucher = async (key) => {
    const res = await sendGet("/vouchers", { limit: 100 });
    if (res.status === 200) {
      // setData(res.data);
    } else {
      message.error("Cập nhật voucher thất bại");
    }
  };
  useEffect(() => {
    listVoucher();
  }, []);
  return (
    <>
      <LayoutHDV>
        <div className="voucher_main">
          <div className="voucher_content">
            <div className="landing-page-title">Danh sách mã giảm giá</div>
            <div className="desc-content">
              Tạo Mã giảm giá toàn shop hoặc Mã giảm giá sản phẩm ngay bây giờ
              để thu hút người mua.
              <Link to="#" className="desc-link">
                Tìm hiểu thêm
              </Link>
            </div>
            <div className="landing-page-content aguth_iEwtiEw1ejuP3Yg">
              <div className="header-tab">
                <ul className="tab-nav">
                  <li className="tab-item active">Tất cả</li>
                  <li className="tab-item">Đang diễn ra</li>
                  <li className="tab-item">Sắp kết thúc</li>
                  <li className="tab-item">Đã kết thúc</li>
                </ul>
              </div>
              <Search
                addonBefore="Mã đơn hàng"
                placeholder="Nhập mã đơn hàng"
                allowClear
                onSearch={onSearch}
                style={{
                  width: 304,
                }}
              />
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </div>
      </LayoutHDV>
    </>
  );
}
const ModalEditVoucher = (props) => {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const data = props.dataFromParent;
  const showModal = () => {
    setIsModalVisible(true);
    console.log(props.dataFromParent);
  };
  const onFinish = async (values) => {
    setIsModalVisible(false);
    await sendPut(`/api/user/status/${data?.key}`, {
      roles: values.roles,
    });
    await props.list();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChangeStatus = (e) => {
    console.log("radio checked", e.target.value);
  };
  const selectBefore = (
    <Select
      defaultValue="1"
      className="select-before"
      initialValue={data?.type}
    >
      <Option value="1">Theo số tiền</Option>
      <Option value="0">Theo phần trăm</Option>
    </Select>
  );
  useEffect(() => {}, []);
  return (
    <>
      <div className="ModalVoucher-wrapper">
        <div onClick={showModal}>Sửa</div>
        <Modal
          title="Chỉnh sửa thông tin"
          visible={isModalVisible}
          open={isModalVisible}
          footer={null}
          onCancel={() => setIsModalVisible(false)}
          maskClosable={false}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="name"
              label="Tên voucher"
              rules={[
                {
                  required: true,
                  message: "Tên voucher ko để trống!",
                },
              ]}
              initialValue={data?.name}
            >
              <Input placeholder="Tên tour" />
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
              initialValue={data?.code}
            >
              <Input showCount maxLength={5} placeholder="Mã voucher" />
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
              name="sale"
              label="Loại giảm giá | Mức giảm "
              rules={[
                {
                  required: true,
                  message: "Loại giảm giá | Mức giảm không để trống",
                },
              ]}
              initialValue={data?.sale}
            >
              <Input addonBefore={selectBefore} addonAfter="đ" />
            </Form.Item>
            <Form.Item
              name="number"
              label="Tổng lượt sử dụng tối đa"
              rules={[
                {
                  required: true,
                  message: "Loại giảm giá | Mức giảm không để trống",
                },
              ]}
              initialValue={data?.sum}
            >
              <Input placeholder="Số mã giảm giá" />
            </Form.Item>
            <Form.Item name="status" label="Hiển thị Voucher">
              <Radio.Group onChange={onChangeStatus} value={1}>
                <Radio value={0}>Ẩn </Radio>
                <Radio value={1}>Hiện</Radio>
              </Radio.Group>
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "10px",
              }}
            >
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Button
                  type="primary"
                  htmlType="reset"
                  onClick={() => setIsModalVisible(false)}
                >
                  Hủy
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </div>
    </>
  );
};
