/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/layout/layout";
import { Tabs, Popconfirm, message, Modal } from "antd";

import "../../../assets/css/trip.css";
import {
  avt,
  banner,
  error,
  nodata2,
  voucher1,
  voucher2,
} from "../../../constants/images";
import RateScreen from "../../../components/rate";
import { Link } from "react-router-dom";
import Condition from "../../../components/condition";
import { sendDelete, sendGet, sendPost, sendPut } from "../../../utils/api";
import OrderDetail from "./OrderDetail";
import Request from "./Request";
import { getItem } from "../../../utils/storage";
export default function MyTrip() {
  const { TabPane } = Tabs;
  const [dataProcessing, setDataProcessing] = useState([]);
  const [dataPurchase, setDataPurchase] = useState([]);
  const [dataWaiting, setDataWaiting] = useState([]);
  const [dataEnd, setDataEnd] = useState([]);
  const [step, setStep] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [isCancelTour, setIsCancelTour] = useState(false);

  const showModal = () => {
    setIsCancelTour(true);
  };
  const handleOk = () => {
    setIsCancelTour(false);
  };
  const handleCancel = () => {
    setIsCancelTour(false);
  };
  const tourWaitting = async () => {
    const result = await sendGet(`/orders/user`, {
      type: "waiting_confirm",
      limit: 100,
    });
    if (result.statusCode == 200) {
      setDataWaiting(result.returnValue);
    } else {
      message.error("thất bại");
    }
  };
  const waiting_purchase = async () => {
    const result = await sendGet(`/orders/user`, {
      type: "waiting_purchase",
      limit: 100,
    });
    if (result.statusCode == 200) {
      setDataPurchase(result.returnValue);
    } else {
      message.error("thất bại");
    }
  };
  const tourProcessing = async () => {
    const result = await sendGet(`/orders/user`, {
      type: "processing",
      limit: 100,
    });
    if (result.statusCode == 200) {
      setDataProcessing(result.returnValue);
    } else {
      message.error("thất bại");
    }
  };
  const tourEnd = async () => {
    const result = await sendGet(`/orders/user`, {
      type: "end",
      limit: 100,
    });
    if (result.statusCode == 200) {
      setDataEnd(result.returnValue);
    } else {
      message.error("thất bại");
    }
  };
  const startUser = async (e) => {
    if (e.status == 3) {
      try {
        let res = await sendPut(`/orders/start-user/${e.id}`);
        if (res.statusCode == 200) {
          message.success("Thanh công");
        } else {
          message.error("thất bại");
        }
      } catch (error) {
        message.error("Chưa đến ngày bắt đầu");
      }
    } else message.success("Chuyến đi đang được thực hiện");
  };
  // huy và hoàn tiền
  const cancelTour = async (e) => {
    try {
      let res = await sendDelete(`/orders/user`, { orderId: e.id });
      if (res.statusCode == 200) {
        // huy chuyen di
        message.success("Hủy chuyến đi thành công");
        tourWaitting();
        waiting_purchase();
      } else {
        message.error("thất bại");
      }
    } catch (error) {
      message.error("Thất bại");
    }
  };
  const endTour = async (e) => {
    try {
      let res = await sendPut(`/orders/end-order`, {
        orderId: e.id,
      });
      if (res.statusCode == 200) {
        message.success("Xác nhận kết thúc tour thành công");
        tourEnd();
      } else {
        message.error("thất bại");
      }
    } catch (error) {
      message.error("Không thành công.");
    }
  };

  const handleStep = async (values) => {
    setStep(!step);
    setDataDetail(values);
  };
  const formatterPrice = new Intl.NumberFormat("vi-VN", {
    hour: "2-digit",
    minute: "numeric",
  });
  useEffect(() => {
    tourWaitting();
    tourEnd();
    waiting_purchase();
    tourProcessing();
  }, []);
  // if (!Object.keys(dataWaiting).length) return <Skeleton />;

  return (
    <>
      <Layout>
        <div className="My-trip__wrapper">
          <div className="content">
            <Tabs
              defaultActiveKey="1"
              className="mytrip-menu"
              tabPosition="left"
            >
              <TabPane
                tab={
                  <div className="mytrip-menu-item">
                    <i className="fa-solid fa-suitcase-rolling"></i>
                    <p className="mytrip-menu-name">Chuyến đi</p>
                  </div>
                }
                key="1"
              >
                {step ? (
                  <OrderDetail
                    dataDetail={dataDetail}
                    handleStep={handleStep}
                    tourWaitting={tourWaitting}
                    waiting_purchase={waiting_purchase}
                    tourEnd={tourEnd}
                    tourProcessing={tourProcessing}
                  />
                ) : (
                  <Tabs defaultActiveKey="0" className="mytrip-sub-menu">
                    <TabPane
                      tab={<p className="mytrip-sub-menu-name">Chờ xác nhận</p>}
                      key="0"
                    >
                      <div className="mytrip-order">
                        {dataWaiting.length > 0 ? (
                          <>
                            {dataWaiting?.map((value, index) => (
                              <div className="mytrip-order-item" key={index}>
                                <div className="mytrip-order__header">
                                  <div className="mytrip-order__header-left">
                                    <p className="mytrip-order__name">
                                      {value?.tourGuide?.name}
                                    </p>
                                    <Link to={`/chat/${value?.tourGuide?.id}`}>
                                      <div className="mytrip-order__chat">
                                        <i className="fa-regular fa-comments"></i>
                                        <p className="mytrip-order__contact">
                                          Chat
                                        </p>
                                      </div>
                                    </Link>
                                  </div>
                                  <div className="mytrip-order__header-right">
                                    {value.status == 0
                                      ? "Chờ xác nhận"
                                      : value.status == 1
                                      ? "Chờ đặt cọc"
                                      : value.status == 2
                                      ? "Chờ thanh toán"
                                      : value.status == 3
                                      ? "Chưa thực hiện"
                                      : value.status == 4
                                      ? "Đang thực hiện"
                                      : value.status == 5
                                      ? "Đã thực hiện"
                                      : "Đã hủy"}
                                  </div>
                                </div>
                                <div className="mytrip-order__main">
                                  <div
                                    className="mytrip-order__main-left"
                                    onClick={() => handleStep(value?.id)}
                                  >
                                    <img
                                      className="mytrip-order-img"
                                      alt=""
                                      src={
                                        value?.tour?.images[0].url
                                          ? value?.tour?.images[0].url
                                          : banner
                                      }
                                    />
                                    <div className="info-group">
                                      <h4
                                        className="mytrip-order-name"
                                        onClick={() => handleStep(value?.id)}
                                      >
                                        {value?.tour?.name}
                                      </h4>
                                      <h4 className="mytrip-order-time">
                                        {value?.startDate}
                                      </h4>
                                    </div>
                                  </div>
                                  <div className="mytrip-order__main-right">
                                    <p className="mytrip-order__main-price">
                                      {formatterPrice.format(
                                        value?.tour?.basePrice
                                      )}{" "}
                                      đ
                                    </p>
                                  </div>
                                </div>
                                <div className="mytrip-order__rate md-1">
                                  {value.status < 2 ? (
                                    <div className="button button--primary">
                                      <Popconfirm
                                        title="Hủy yêu cầu?"
                                        description="Xác nhận hủy chuyến đi"
                                        onConfirm={() => cancelTour(value)}
                                        okText="Đồng ý"
                                        cancelText="Hủy"
                                      >
                                        Hủy
                                      </Popconfirm>
                                    </div>
                                  ) : (
                                    <>
                                      <div
                                        className="button button--primary"
                                        onClick={() => showModal()}
                                      >
                                        Hủy
                                      </div>
                                      <Modal
                                        title=""
                                        open={isCancelTour}
                                        visible={isCancelTour}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                        footer={null}
                                      >
                                        <div className="modal-content">
                                          <p className="modal-title">
                                            Xác nhận hủy chuyến?
                                          </p>
                                          <div className="modal-img">
                                            <img alt="" src={error} />
                                          </div>
                                          <p className="modal-desc">
                                            Tiền cọc sẽ không được hoàn lại.
                                            Chắc chắn hủy?
                                          </p>
                                          <div className="button-group">
                                            <div
                                              className="button button--primary"
                                              onClick={() => cancelTour(value)}
                                            >
                                              Đồng ý
                                            </div>
                                            <div
                                              className="button button--normal"
                                              onClick={() => handleCancel()}
                                            >
                                              Hủy
                                            </div>
                                          </div>
                                        </div>
                                      </Modal>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="no-data">
                            <img alt="" src={nodata2} />
                            <p className="no-data-title">
                              Không thấy thông tin chuyến đi
                            </p>
                          </div>
                        )}
                      </div>
                    </TabPane>
                    <TabPane
                      tab={
                        <p className="mytrip-sub-menu-name">Chờ thanh toán</p>
                      }
                      key="1"
                    >
                      <div className="mytrip-order">
                        {dataPurchase.length > 0 ? (
                          <>
                            {dataPurchase?.map((value, index) => (
                              <div className="mytrip-order-item" key={index}>
                                <div className="mytrip-order__header">
                                  <div className="mytrip-order__header-left">
                                    <p className="mytrip-order__name">
                                      {value?.tourGuide?.name}
                                    </p>
                                    <Link to={`/chat/${value?.tourGuide?.id}`}>
                                      <div className="mytrip-order__chat">
                                        <i className="fa-regular fa-comments"></i>
                                        <p className="mytrip-order__contact">
                                          Chat
                                        </p>
                                      </div>
                                    </Link>
                                  </div>
                                  <div className="mytrip-order__header-right">
                                    {value.status == 0
                                      ? "Chờ xác nhận"
                                      : value.status == 1
                                      ? "Chờ đặt cọc"
                                      : value.status == 2
                                      ? "Chờ thanh toán"
                                      : value.status == 3
                                      ? "Chưa thực hiện"
                                      : value.status == 4
                                      ? "Đang thực hiện"
                                      : value.status == 5
                                      ? "Đã thực hiện"
                                      : "Đã hủy"}
                                  </div>
                                </div>
                                <div className="mytrip-order__main">
                                  <div
                                    className="mytrip-order__main-left"
                                    onClick={() => handleStep(value?.id)}
                                  >
                                    <img
                                      className="mytrip-order-img"
                                      alt=""
                                      src={
                                        value?.tour?.images[0].url
                                          ? value?.tour?.images[0].url
                                          : banner
                                      }
                                    />
                                    <div className="info-group">
                                      <h4
                                        className="mytrip-order-name"
                                        onClick={() => handleStep(value?.id)}
                                      >
                                        {value?.tour?.name}
                                      </h4>
                                      <h4 className="mytrip-order-time">
                                        {value?.startDate}
                                      </h4>
                                    </div>
                                  </div>
                                  <div className="mytrip-order__main-right">
                                    <p className="mytrip-order__main-price">
                                      {formatterPrice.format(
                                        value?.tour?.basePrice
                                      )}{" "}
                                      đ
                                    </p>
                                  </div>
                                </div>
                                <div className="mytrip-order__rate md-1">
                                  {value.status < 2 ? (
                                    <div className="button button--primary">
                                      <Popconfirm
                                        title="Hủy yêu cầu?"
                                        description="Xác nhận hủy chuyến đi"
                                        onConfirm={() => cancelTour(value)}
                                        okText="Đồng ý"
                                        cancelText="Hủy"
                                      >
                                        Hủy
                                      </Popconfirm>
                                    </div>
                                  ) : (
                                    <>
                                      <div
                                        className="button button--primary"
                                        onClick={() => showModal()}
                                      >
                                        Hủy
                                      </div>
                                      <Modal
                                        title=""
                                        open={isCancelTour}
                                        visible={isCancelTour}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                        footer={null}
                                      >
                                        <div className="modal-content">
                                          <p className="modal-title">
                                            Xác nhận hủy chuyến?
                                          </p>
                                          <div className="modal-img">
                                            <img alt="" src={error} />
                                          </div>
                                          <p className="modal-desc">
                                            Tiền cọc sẽ không được hoàn lại.
                                            Chắc chắn hủy?
                                          </p>
                                          <div className="button-group">
                                            <div
                                              className="button button--primary"
                                              onClick={() => cancelTour(value)}
                                            >
                                              Đồng ý
                                            </div>
                                            <div
                                              className="button button--normal"
                                              onClick={() => handleCancel()}
                                            >
                                              Hủy
                                            </div>
                                          </div>
                                        </div>
                                      </Modal>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="no-data">
                            <img alt="" src={nodata2} />
                            <p className="no-data-title">
                              Không thấy thông tin chuyến đi
                            </p>
                          </div>
                        )}
                      </div>
                    </TabPane>
                    <TabPane
                      tab={
                        <p className="mytrip-sub-menu-name">Đã thanh toán</p>
                      }
                      key="2"
                    >
                      <div className="mytrip-order">
                        {dataProcessing.length > 0 ? (
                          <>
                            {dataProcessing?.map((value, index) => (
                              <div className="mytrip-order-item" key={index}>
                                <div className="mytrip-order__header">
                                  <div className="mytrip-order__header-left">
                                    <p className="mytrip-order__name">
                                      {value?.tourGuide?.name}
                                    </p>
                                    <Link to={`/chat/${value?.tourGuide?.id}`}>
                                      <div className="mytrip-order__chat">
                                        <i className="fa-regular fa-comments"></i>
                                        <p className="mytrip-order__contact">
                                          Chat
                                        </p>
                                      </div>
                                    </Link>
                                  </div>{" "}
                                  <div className="mytrip-order__header-right">
                                    {value.status == 0
                                      ? "Chờ xác nhận"
                                      : value.status == 1
                                      ? "Chờ đặt cọc"
                                      : value.status == 2
                                      ? "Chờ thanh toán"
                                      : value.status == 3
                                      ? "Chưa thực hiện"
                                      : value.status == 4
                                      ? "Đang thực hiện"
                                      : value.status == 5
                                      ? "Đã thực hiện"
                                      : "Đã hủy"}
                                  </div>
                                </div>
                                <div className="mytrip-order__main">
                                  <div
                                    className="mytrip-order__main-left"
                                    onClick={() => handleStep(value?.id)}
                                  >
                                    <img
                                      className="mytrip-order-img"
                                      alt=""
                                      src={
                                        value?.tour?.images[0].url
                                          ? value?.tour?.images[0].url
                                          : banner
                                      }
                                    />
                                    <div className="info-group">
                                      <h4 className="mytrip-order-name">
                                        {value?.tour?.name}
                                      </h4>{" "}
                                      <h4 className="mytrip-order-time">
                                        {value?.startDate}
                                      </h4>
                                    </div>
                                  </div>
                                  <div className="mytrip-order__main-right">
                                    <p className="mytrip-order__main-price">
                                      {formatterPrice.format(value?.price)} đ
                                    </p>
                                  </div>
                                </div>
                                {value.status == 3 ? (
                                  <div className="mytrip-order__rate">
                                    Khởi hành vào ngày {value?.startDate}
                                    <div
                                      className="button button--primary"
                                      onClick={() => startUser(value)}
                                    >
                                      Bắt đầu
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="mytrip-order__rate">
                                      Kết thúc vào ngày vào ngày{" "}
                                      {value?.endDate}
                                      <div className="mytrip-group">
                                        <div
                                          className="button button--primary"
                                          onClick={() => endTour(value)}
                                        >
                                          Kết thúc
                                        </div>
                                        <Report data={value} />
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="no-data">
                            <img alt="" src={nodata2} />
                            <p className="no-data-title">
                              Không thấy thông tin chuyến đi
                            </p>
                          </div>
                        )}
                      </div>
                    </TabPane>
                    <TabPane
                      tab={<p className="mytrip-sub-menu-name">Hoàn thành</p>}
                      key="3"
                    >
                      {" "}
                      <div className="mytrip-order">
                        {dataEnd.length > 0 ? (
                          <>
                            {dataEnd?.map((value, index) => (
                              <div className="mytrip-order-item" key={index}>
                                <div className="mytrip-order__header">
                                  <div className="mytrip-order__header-left">
                                    <p className="mytrip-order__name">
                                      {value?.tourGuide?.name}
                                    </p>
                                    <Link to={`/chat/${value?.tourGuide?.id}`}>
                                      <div className="mytrip-order__chat">
                                        <i className="fa-regular fa-comments"></i>
                                        <p className="mytrip-order__contact">
                                          Chat
                                        </p>
                                      </div>
                                    </Link>
                                  </div>{" "}
                                  <div className="mytrip-order__header-right">
                                    {value.status == 0
                                      ? "Chờ xác nhận"
                                      : value.status == 1
                                      ? "Chờ đặt cọc"
                                      : value.status == 2
                                      ? "Chờ thanh toán"
                                      : value.status == 3
                                      ? "Chưa thực hiện"
                                      : value.status == 4
                                      ? "Đang thực hiện"
                                      : value.status == 5
                                      ? "Đã thực hiện"
                                      : "Đã hủy"}
                                  </div>
                                </div>
                                <div className="mytrip-order__main">
                                  <div
                                    className="mytrip-order__main-left"
                                    onClick={() => handleStep(value?.id)}
                                  >
                                    <img
                                      className="mytrip-order-img"
                                      alt=""
                                      src={
                                        value?.tour?.images[0].url
                                          ? value?.tour?.images[0].url
                                          : banner
                                      }
                                    />
                                    <div className="info-group">
                                      <h4 className="mytrip-order-name">
                                        {value?.tour?.name}
                                      </h4>{" "}
                                      <h4 className="mytrip-order-time">
                                        {value?.startDate}
                                      </h4>
                                    </div>
                                  </div>
                                  <div className="mytrip-order__main-right">
                                    <p className="mytrip-order__main-price">
                                      {formatterPrice.format(value?.price)} đ
                                    </p>
                                  </div>
                                </div>
                                <div className="mytrip-order__rate ">
                                  {value.status == 5 && (
                                    <>
                                      {value?.tour?.rates.length > 0 ? (
                                        <>
                                          <p className="mytrip-order__rate-note">
                                            Đã đánh giá
                                          </p>
                                        </>
                                      ) : (
                                        <>
                                          <p className="mytrip-order__rate-note">
                                            Chưa nhận được đánh giá
                                          </p>
                                          <div className="right-trip">
                                            <RateScreen data={value} />
                                          </div>
                                        </>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="no-data">
                            <img alt="" src={nodata2} />
                            <p className="no-data-title">
                              Không thấy thông tin chuyến đi
                            </p>
                          </div>
                        )}
                      </div>
                    </TabPane>
                  </Tabs>
                )}
              </TabPane>
              <TabPane
                tab={
                  <div className="mytrip-menu-item">
                    <i className="fa-solid fa-tags"></i>
                    <p className="mytrip-menu-name">Mã giảm giá</p>
                  </div>
                }
                key="2"
              >
                <h3 className="mytrip-voucher__search">Kho vocher</h3>
                <div className="mytrip-voucher-box-search">
                  <h4 className="mytrip-voucher__title">Mã giảm giá</h4>
                  <input placeholder="nhập mã voucher..." />
                  <div className="button button--primary">Tìm</div>
                </div>
                <Voucher />
              </TabPane>
              <TabPane
                tab={
                  <div className="mytrip-menu-item">
                    <i className="fa-solid fa-tags"></i>
                    <p className="mytrip-menu-name">Yêu cầu</p>
                  </div>
                }
                key="3"
              >
                <Request />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Layout>
    </>
  );
}
const Voucher = () => {
  const { TabPane } = Tabs;
  const [dataVoucher, setDataVoucher] = useState([]);
  const [dataVoucherAvailable, setdataVoucherAvailable] = useState([]);

  const listVoucher = async () => {
    let res = await sendGet(`/vouchers`, { limit: 100 });
    if (res.statusCode == 200) {
      setDataVoucher(res.returnValue.data);
    } else {
      message.error("thất bại");
    }
  };
  const listVoucherAvailable = async () => {
    let res1 = await sendGet(`/vouchers/available`, { limit: 100 });
    if (res1.statusCode == 200) {
      setdataVoucherAvailable(res1.returnValue);
    } else {
      message.error("thất bại");
    }
  };
  const saveVoucher = async (e) => {
    try {
      let result = await sendPut(`/vouchers/${e}`);
      if (result.statusCode == 200) {
        message.success("Lưu voucher thành công");
      } else {
        message.error("thất bại");
      }
    } catch (error) {
      if (error?.response.status == 400) {
        message.error("Bạn đã lưu Voucher này trước đó");
      } else {
        message.error("Bạn ko đủ xu để đổi voucher");
      }
    }
  };
  const formatterDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  useEffect(() => {
    listVoucher();
    listVoucherAvailable();
  }, []);
  return (
    <>
      <Tabs defaultActiveKey="1" className="mytrip-sub-menu">
        <TabPane tab={<p className="mytrip-sub-menu-name">Của bạn</p>} key="1">
          <div className="mytrip-voucher">
            {dataVoucherAvailable.length > 0 ? (
              <>
                {dataVoucherAvailable?.map((item, index) => (
                  <div className="mytrip-voucher-item" key={index}>
                    <div className="mytrip-voucher-left">
                      <img
                        className="mytrip-voucher-img"
                        alt=""
                        src={voucher1}
                      />
                      <h4 className="mytrip-voucher-name">{item?.code}</h4>
                    </div>
                    <div className="mytrip-voucher-right">
                      <div className="mytrip-voucher-top">
                        <h3 className="mytrip-voucher-title">{item?.name}</h3>
                        <Link to="/tour" className="mytrip-voucher-use">
                          Dùng ngay
                        </Link>
                      </div>
                      <div className="mytrip-voucher-bottom">
                        <h3 className="mytrip-voucher-time">
                          Hạn sử dụng: {item?.endDate}
                        </h3>
                        <Condition data={item} />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>Bạn chưa có voucher nào</p>
            )}
          </div>
        </TabPane>
        <TabPane tab={<p className="mytrip-sub-menu-name">Săn mã</p>} key="2">
          <div className="mytrip-voucher">
            {dataVoucher.length > 0 ? (
              <>
                {dataVoucher.map((item, index) => (
                  <div
                    className={
                      item?.claimed == item?.quantity
                        ? "mytrip-voucher-item mytrip-voucher-item-not-allow"
                        : "mytrip-voucher-item"
                    }
                    key={index}
                  >
                    <div className="mytrip-voucher-left">
                      <img
                        className="mytrip-voucher-img"
                        alt=""
                        src={voucher2}
                      />
                      <h4 className="mytrip-voucher-name">{item?.code}</h4>
                    </div>
                    <div className="mytrip-voucher-right">
                      <div className="mytrip-voucher-top">
                        <h3 className="mytrip-voucher-title">{item?.name}</h3>
                        <p
                          className="mytrip-voucher-use"
                          onClick={() => saveVoucher(item.id)}
                        >
                          Lưu mã
                        </p>
                      </div>

                      <div className="mytrip-voucher-bottom">
                        <h3 className="mytrip-voucher-time">
                          Hạn sử dụng:{" "}
                          {formatterDate.format(Date.parse(item?.endDate))}
                        </h3>
                        <Condition data={item} />
                      </div>
                      <div className="mytrip-voucher-claimed">
                        <h3 className="mytrip-voucher-claimed">
                          <i class="fa-solid fa-bag-shopping"></i>{" "}
                          <span>
                            {item?.claimed}/{item?.quantity}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>Voucher chưa có sẵn</p>
            )}
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};
const Report = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (!content) {
      message.error("Vui lòng nhập nội dung báo cáo");
      return;
    }
    const response = await sendPost(`/reports/tourguide`, {
      orderId: data?.id,
      content: content,
    });
    if (response.statusCode === 200) {
      message.success("Đã gửi báo cáo tới quản trị viên");
      setIsModalOpen(false);
      setContent("");
    } else {
      message.error("Báo cáo thất bại !!!");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setContent("");
  };
  const getcontent = (e) => {
    setContent(e.target.value);
  };
  return (
    <>
      <div className="button button--plus" onClick={showModal}>
        Báo cáo
      </div>
      <Modal
        className="modal-report"
        title=""
        open={isModalOpen}
        visible={isModalOpen}
        onOk={handleOk}
        centered
        footer={null}
        onCancel={handleCancel}
      >
        <h1 className="modal-title">Báo cáo HDV</h1>
        <p className="modal-des">
          Chuyến đi có vấn đề? Hãy báo lại cho chúng tôi ngay nhé!
        </p>
        <textarea
          value={content}
          onChange={getcontent}
          rows={3}
          placeholder="Nội dung báo cáo...."
        />
        <div className="modal-btn">
          <div className="button button--primary" onClick={handleOk}>
            Báo cáo ngay
          </div>
          <div className="button button--normal" onClick={handleCancel}>
            Hủy
          </div>
        </div>
      </Modal>
    </>
  );
};
