/* eslint-disable eqeqeq */
/* eslint-disable */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/layout";
import { Link, useHistory, useParams } from "react-router-dom";
import "../../../assets/css/tour-detail.css";
import OwlCarousel from "react-owl-carousel";
import * as ReactMarkdown from "react-markdown";

import {
  Input,
  InputNumber,
  message,
  Form,
  DatePicker,
  Modal,
  Button,
  Skeleton,
} from "antd";
import Condition from "../../../components/condition";
import { sendGet, sendPost } from "../../../utils/api";
import {
  haiphong,
  halong,
  hanoi,
  voucher1,
  voucher2,
} from "../../../constants/images";
import Voucher from "../../Kenh_HDV/Voucher";

export default function TourDetail() {
  const [number, setNumber] = useState(1);
  const [priceNumber, setPriceNumber] = useState(20000);
  const [date, setdate] = useState("");
  const [data, setData] = useState([]);
  const [voucher, setVoucher] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  const handleVoucher = (value) => {
    setVoucher(value);
    if (value) {
      if (value.discountType == 1) {
        if (number - data.numOfFreeMember > 0) {
          setTotalPrice(
            data.basePrice +
              (number - data.numOfFreeMember) * data.feePerMember -
              value.value
          );
        } else setTotalPrice(data.basePrice - value.value);
      } else {
        if (number - data.numOfFreeMember > 0) {
          let discountPrice =
            (value.value / 100) *
            (data.basePrice +
              (number - data.numOfFreeMember) * data.feePerMember);
          setTotalPrice(
            data.basePrice +
              (number - data.numOfFreeMember) * data.feePerMember -
              discountPrice
          );
        } else {
          let discountPrice = (value.value / 100) * data.basePrice;
          setTotalPrice(data.basePrice - discountPrice);
        }
      }
    } else {
      if (number - data.numOfFreeMember > 0) {
        setTotalPrice(
          data.basePrice + (number - data.numOfFreeMember) * data.feePerMember
        );
      } else setTotalPrice(data.basePrice);
    }
  };

  const [tourProvice, setTourProvice] = useState();
  const formatterPrice = new Intl.NumberFormat("vi-VN", {
    hour: "2-digit",
    minute: "numeric",
  });
  const param = useParams();
  const history = useHistory();
  const onChange = (date, dateString) => {
    setdate(dateString);
  };
  const onFinish = async (values) => {
    try {
      values.tourId = data.id;
      values.startDate = date;
      let respon = await sendPost("/orders", values);
      if (respon.statusCode == 200) {
        message.success("gửi yêu cầu thành công");
        history.push("/chuyen-di");
      } else {
        message.error("thất bại");
      }
    } catch (error) {
      message.error("Bạn đang là HDV");
    }
  };
  const handleNumber = (value) => {
    setNumber(value);
    if (voucher) {
      if (voucher.discountType == 1) {
        if (value - data.numOfFreeMember > 0) {
          setTotalPrice(
            data.basePrice +
              (value - data.numOfFreeMember) * data.feePerMember -
              voucher.value
          );
        } else setTotalPrice(data.basePrice - voucher.value);
      } else {
        if (value - data.numOfFreeMember > 0) {
          let discountPrice =
            (voucher.value / 100) *
            (data.basePrice +
              (value - data.numOfFreeMember) * data.feePerMember);
          setTotalPrice(
            data.basePrice +
              (value - data.numOfFreeMember) * data.feePerMember -
              discountPrice
          );
        } else {
          let discountPrice = (voucher.value / 100) * data.basePrice;
          setTotalPrice(data.basePrice - discountPrice);
        }
      }
    } else {
      if (value - data.numOfFreeMember > 0) {
        setTotalPrice(
          data.basePrice + (value - data.numOfFreeMember) * data.feePerMember
        );
      } else setTotalPrice(data.basePrice);
    }
  };
  const dataTour = async () => {
    const res = await sendGet(`/tours/${param.id}`);
    if (res.statusCode == 200) {
      setData(res.returnValue);
      setTotalPrice(res.returnValue?.basePrice);
      await tourFiltter(res.returnValue?.province.id);
    } else {
      message.error("Lỗi hệ thống");
    }
  };
  const tourFiltter = async (e) => {
    const result = await sendGet(`/tours?provinceId=${e}`);
    if (result.statusCode === 200) {
      setTourProvice(result.returnValue.data);
    } else {
      message.error("thất bại");
    }
  };
  useEffect(() => {
    dataTour();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!Object.keys(data).length) return <Skeleton />;
  return (
    <>
      <Layout>
        <div className="tour-detail single-box-content">
          <div className="content">
            <div className="tour-detail__content">
              <div className="single-box-content-inner tour-detail__left">
                <h1 className="title-tour">{data?.name}</h1>
                <div className="single-content">
                  <div className="owl-image">
                    <OwlCarousel
                      className="owl-theme"
                      loop
                      margin={10}
                      nav={false}
                      autoplay={false}
                      dots={true}
                      items={1}
                    >
                      {data?.images.map((item, index) => (
                        <div className="tour-detail__img-introduce" key={index}>
                          <img src={item.url} alt="" />
                        </div>
                      ))}
                    </OwlCarousel>
                  </div>
                  <div className="box-tlb-tour">
                    <table className="tlb-info-tour">
                      <tbody>
                        <tr>
                          <td>
                            <i
                              className="fa fa-map-marker-alt"
                              aria-hidden="true"
                            />
                            {data?.province?.name}
                          </td>
                          <td>
                            <i className="fa fa-clock-o" aria-hidden="true" />
                            <span>{data?.tourSchedule.length} ngày</span>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <span className="title-tour">Mã tour: </span>
                            <span className="id-tour">{data?.id}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <i
                              className="fa fa-calendar-alt"
                              aria-hidden="true"
                            />
                            {/* Khởi hành từ: <span>{data?.createdAt}</span> */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="single-box-excerpt">
                    <p style={{ textAlign: "justify" }}>
                      <b>{data?.description} </b>
                    </p>
                    <p
                      style={{
                        textAlign: "justify",
                        marginTop: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      <span style={{ color: "#FF0000" }}>
                        <u>
                          <b>ĐIỂM NỔI BẬT NHẤT:</b>
                        </u>
                      </span>
                    </p>
                    <ul style={{ marginBottom: "20px" }}>
                      <li style={{ textAlign: "justify" }}>
                        <span style={{ color: "#008000" }}>
                          {data?.description}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="panel-group"
                    id="tour-product"
                    role="tablist"
                    aria-multiselectable="true"
                  >
                    <div className="panel panel-tour-product">
                      <div
                        className="panel-heading"
                        role="tab"
                        id="heading-program-tour-0"
                      >
                        <h4 className="panel-title">
                          <a
                            role="button"
                            id="a-title-program-tour-0"
                            data-toggle="collapse"
                            data-parent="#tour-product"
                            href="#program-tour-0"
                            aria-expanded="true"
                            aria-controls="program-tour-0"
                            className=""
                          >
                            Chương trình tour
                            <i className="pull-right fa fa-chevron-down" />
                          </a>
                        </h4>
                      </div>
                      <div
                        id="program-tour-0"
                        className="panel-collapse collapse in show"
                        role="tabpanel"
                        aria-labelledby="heading-program-tour-0"
                        style={{ height: "auto" }}
                      >
                        <div className="panel-body content-tour-item content-tour-tab-program-tour-0 active">
                          {data?.tourSchedule.map((value, index) => (
                            <div key={index}>
                              <h3
                                className="title"
                                style={{
                                  textAlign: "justify",
                                  fontSize: "18px",
                                }}
                              >
                                <span style={{ color: "#B22222" }}>
                                  <strong> Ngày {index + 1}</strong>
                                </span>
                              </h3>

                              <p
                                className="title-tour"
                                style={{ textAlign: "justify" }}
                              >
                                {value?.title ? value?.title : ""}
                              </p>
                              <div className="content-tour">
                                <p style={{ textAlign: "justify" }}>
                                  <ReactMarkdown>
                                    {value?.content}
                                  </ReactMarkdown>
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="panel panel-tour-product">
                      <div
                        className="panel-heading"
                        role="tab"
                        id="heading-tour-rule-2"
                      >
                        <h4 className="panel-title">
                          <a
                            role="button"
                            id="a-title-tour-rule-2"
                            data-toggle="collapse"
                            data-parent="#tour-product"
                            href="#tour-rule-2"
                            aria-expanded="true"
                            aria-controls="tour-rule-2"
                          >
                            Quy định
                            <i className="pull-right fa fa-chevron-down" />
                          </a>
                        </h4>
                      </div>
                      <div
                        id="tour-rule-2"
                        className="panel-collapse collapse show"
                        role="tabpanel"
                        aria-labelledby="heading-tour-rule-2"
                      >
                        <div className="panel-body content-tour-item content-tour-tab-tour-rule-2 active">
                          <p>
                            <meta charSet="utf-8" />
                          </p>
                          <h3 dir="ltr" style={{ textAlign: "center" }}>
                            <span style={{ color: "#B22222" }}>
                              <u>
                                <div style={{ marginTop: 5 }}>
                                  <strong>QUY TRÌNH ĐĂNG KÝ TOUR</strong>
                                </div>
                              </u>
                            </span>
                          </h3>
                          <ul dir="ltr">
                            <li
                              role="presentation"
                              style={{ textAlign: "justify" }}
                            >
                              <strong>Đợt 01:</strong> Quý khách thanh toán 10%
                              giá trị của tour ngay khi đăng ký mua tour.
                            </li>
                            <li
                              role="presentation"
                              style={{ textAlign: "justify" }}
                            >
                              <strong>Đợt 02:</strong> Quý khách thanh toán 90%
                              giá trị của tour trước lịch khởi hành.
                            </li>
                          </ul>

                          <h3 dir="ltr" style={{ textAlign: "center" }}>
                            <span style={{ color: "#B22222" }}>
                              <u>
                                <strong>ĐIỀU KIỆN HỦY TOUR</strong>
                              </u>
                            </span>
                          </h3>
                          <p dir="ltr" style={{ textAlign: "justify" }}>
                            <u>
                              <em>
                                <strong>
                                  Trường hợp hủy bỏ dịch vụ từ Ktravel:
                                </strong>
                              </em>
                            </u>
                          </p>
                          <p dir="ltr" style={{ textAlign: "justify" }}>
                            Nếu <strong>HDV</strong> không thực hiện được chuyến
                            du lịch/ dịch vụ, HDV phải báo ngay cho khách hàng
                            biết và thanh toán lại cho khách hàng toàn bộ số
                            tiền mà khách hàng đã đóng trong vòng 3 ngày kể từ
                            lúc chính thức thông báo hủy chuyến đi/ dịch vụ du
                            lịch bằng hình thức tiền mặt hoặc chuyển khoản.
                          </p>
                          <p dir="ltr" style={{ textAlign: "justify" }}>
                            <em>
                              <strong>
                                <u>
                                  Trường hợp hủy bỏ dịch vụ từ Quý khách hàng:
                                </u>
                              </strong>
                            </em>
                          </p>
                          <p dir="ltr" style={{ textAlign: "justify" }}>
                            Trong trường hợp không thể tiếp tục sử dụng dịch vụ/
                            tour, Quý khách phải hủy chuyến trên hệ thống.
                          </p>
                          <ul dir="ltr">
                            <li style={{ textAlign: "justify" }}>
                              Các trường hợp chuyển/ đổi dịch vụ/ tour: Khách
                              hàng sẽ không được hoàn lại phí đặt cọc
                            </li>
                            <li style={{ textAlign: "justify" }}>
                              Trường hợp hủy dịch vụ/ tour: Quý khách phải chịu
                              chi phí hủy tour/ dịch vụ theo quy định của
                              Ktravel và toàn bộ phí ngân hàng cho việc thanh
                              toán trực tuyến.
                            </li>
                          </ul>
                          <p style={{ textAlign: "justify" }}>
                            <strong>Phí hủy được quy định như sau:</strong>
                          </p>

                          <p>
                            Việc huỷ bỏ chuyến đi phải được hủy bỏ trên hệ
                            thống. Việc huỷ bỏ bằng liên hệ qua kênh chat, trao
                            đổi không được chấp nhận.
                          </p>
                          <p>
                            Đến ngày hẹn thanh toán 100% giá trị tour, nếu quý
                            khách không thực hiện thanh toán đúng hạn và đúng số
                            tiền, xem như quý khách tự ý&nbsp;hủy tour và mất
                            hết số tiền đặt cọc giữ chỗ.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-form-price-tour horizontal box-left">
                    <Form
                      name="normal_senyc"
                      className="sendyc-form"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                    >
                      <table className="tlb-box-price-tour">
                        <tbody>
                          <tr>
                            <td>
                              <Form.Item
                                name="startDate"
                                label="Ngày bắt đầu:"
                                rules={[
                                  {
                                    required: true,
                                    message: "Ngày bắt đầu ko để trống!",
                                  },
                                ]}
                              >
                                <DatePicker
                                  onChange={onChange}
                                  className="form-control txt-date-start hasDatepicker"
                                />
                              </Form.Item>
                            </td>
                            <td>
                              <Form.Item
                                name="numberOfMember"
                                label="Số khách:"
                                rules={[
                                  {
                                    required: true,
                                    message: "số lượng ko để trống!",
                                  },
                                ]}
                              >
                                <InputNumber
                                  className="form-control slc-tour-people"
                                  placeholder="Số lượng"
                                  onChange={handleNumber}
                                />
                              </Form.Item>
                            </td>
                            <td>
                              <Button
                                htmlType="submit"
                                className="button button--primary"
                              >
                                Đặt tour
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Form>
                  </div>
                </div>
              </div>
              <div className="tour-detail__right">
                <div className="tour-detail__plan">
                  <div className="box-form-price-tour vertical">
                    <Form
                      name="normal_senyc"
                      className="sendyc-form"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                    >
                      <table className="tlb-box-price-tour">
                        <tbody>
                          <tr>
                            <td colSpan={2}>
                              <span className="price-tour">
                                <div className="title-price-old">
                                  {/* <del>6,129,000 VND</del> */}
                                </div>
                                Giá cơ bản:{" "}
                                {data?.basePrice
                                  .toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "VND",
                                  })
                                  .replace("₫", "")}{" "}
                                <span>VNĐ/{data?.numOfFreeMember} người</span>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <Form.Item
                              name="startDate"
                              label="Ngày bắt đầu:"
                              rules={[
                                {
                                  required: true,
                                  message: "Ngày bắt đầu không để trống!",
                                },
                              ]}
                            >
                              <DatePicker
                                onChange={onChange}
                                className="form-control txt-date-start hasDatepicker"
                              />
                            </Form.Item>
                          </tr>
                          <tr>
                            <Form.Item
                              name="numberOfMember"
                              label="Số khách:"
                              rules={[
                                {
                                  required: true,
                                  message: "số lượng không để trống!",
                                },
                              ]}
                            >
                              <InputNumber
                                className="form-control slc-tour-people"
                                placeholder="Số lượng"
                                onChange={handleNumber}
                              />
                            </Form.Item>
                          </tr>
                          <tr>
                            <ModalVoucher voucher={handleVoucher} />
                          </tr>
                          <tr>
                            <div className="total-price">
                              <p className="total-price-title">
                                Tổng thanh toán
                              </p>
                              <p className="total-price-price">
                                {formatterPrice.format(totalPrice)} đ
                              </p>
                            </div>
                          </tr>
                        </tbody>
                      </table>
                      <Button
                        htmlType="submit"
                        className="button button--primary"
                      >
                        Đặt tour
                      </Button>
                    </Form>
                  </div>
                </div>
                <div className="box-tour-special type-sidebar sidebar-tour-item sidebar-box-item sidebar-box-item-default">
                  <div style={{ marginTop: 20 }} className="box-title">
                    <h3>Tour Cùng Tỉnh</h3>
                  </div>
                  <ul className="list-item">
                    {tourProvice?.length >= 0 &&
                      tourProvice.slice(0, 4)?.map((item, index) => (
                        <li key={index}>
                          <div className="box-img">
                            <Link to={`/tour/${item.id}`}>
                              <img
                                src={
                                  item?.images[0]
                                    ? item?.images[0].url
                                    : { hanoi }
                                }
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="box-content">
                            <div className="box-title">
                              <Link to={`/tour/${item.id}`}>{item?.name}</Link>
                            </div>
                            <div className="box-price">
                              <div className="box-price-old"></div>
                              <div className="price-present">
                                {formatterPrice.format(item?.basePrice)} VND
                              </div>
                            </div>
                            <div className="box-readmore">
                              <Link to={`/tour/${item.id}`}>Xem chi tiết</Link>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

const ModalVoucher = ({ voucher }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountPrice, setDiscountPrice] = useState();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleVoucher = (item) => {
    setIsModalOpen(false);
    voucher(item);
    setDiscountPrice(item);
  };
  const [vouchers, setListVoucher] = useState("");

  const listVoucherAvailable = async () => {
    let res1 = await sendGet(`/vouchers/available`, { limit: 100 });
    if (res1.statusCode == 200) {
      setListVoucher(res1.returnValue);
    } else {
      message.error("thất bại");
    }
  };
  useEffect(() => {
    listVoucherAvailable();
  }, []);
  return (
    <>
      <span className="order-payment_voucher" onClick={showModal}>
        {discountPrice && (
          <span className="coupon-label success">{discountPrice?.code}</span>
        )}
        <i className="fa-solid fa-percent"></i>
        Sử dụng Voucher
      </span>
      <Modal
        footer={null}
        width="50%"
        title="Mã giảm giá "
        visible={isModalOpen}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <div className="mytrip-voucher">
          {vouchers && vouchers.length > 0 ? (
            <>
              {vouchers?.map((item, index) => (
                <div className="mytrip-voucher-item" key={index}>
                  <div className="mytrip-voucher-left">
                    <img className="mytrip-voucher-img" alt="" src={voucher1} />
                    <h4 className="mytrip-voucher-name">{item?.code}</h4>
                  </div>
                  <div className="mytrip-voucher-right">
                    <div className="mytrip-voucher-top">
                      <h3 className="mytrip-voucher-title">{item?.name}</h3>
                      <div
                        onClick={() => handleVoucher(item)}
                        className="mytrip-voucher-use"
                      >
                        Dùng ngay
                      </div>
                    </div>
                    <div className="mytrip-voucher-bottom">
                      <h3 className="mytrip-voucher-time">
                        Hạn sử dụng: {item?.endDate}
                      </h3>
                      {/* <Condition data={item} /> */}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>Bạn chưa có voucher nào</p>
          )}
        </div>
      </Modal>
    </>
  );
};
