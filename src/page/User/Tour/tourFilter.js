/* eslint-disable */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/layout";
import { banner, address, nodata } from "../../../constants/images";
import "../../../assets/css/hdv-tour-all.css";
import { Pagination, message } from "antd";
import TourItem from "../../../components/tourItem";
import {
  Modal,
  Button,
  Result,
  Input,
  DatePicker,
  Form,
  InputNumber,
  Select,
} from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import { sendGet, sendPost } from "../../../utils/api";
import TextArea from "antd/lib/input/TextArea";

export default function ToursFilter() {
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState();
  const [time, setTime] = useState(localStorage.getItem("Timeprovice"));

  const nameProvice = localStorage.getItem("provice");
  const timeStart = localStorage.getItem("Timeprovice");
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const numberPage = 6;
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(numberPage);
  const handleChange = (value) => {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(numberPage);
    } else {
      setMinValue((value - 1) * numberPage);
      setMaxValue(value * numberPage);
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setShow(false);
  };
  const handleRequest = async (values) => {
    values.provinceId = parseInt(params.id);
    let res = await sendPost(`/requests`, values);
    if (res.statusCode === 200) {
      setIsModalOpen(true);
      message.success("Bạn đã gửi yêu cầu thành công");
    } else {
      message.error("thất bại");
    }
    setIsModalOpen(true);
  };
  const onChangeTimeStart = (date, dateString) => {
    console.log("dataa", dateString);
    setTime(dateString);
  };
  let params = useParams();
  const tourFiltter = async () => {
    const result = await sendGet(`/tours?provinceId=${params.id}`);
    if (result.statusCode === 200) {
      setData(
        result.returnValue.data.map((e) => {
          return { ...e, place: e.province?.name ? e.province?.name : "" };
        })
      );
    } else {
      message.error("thất bại");
    }
  };
  useEffect(() => {
    tourFiltter();
  }, []);
  return (
    <>
      <Layout>
        <div className="tours-all__wrapper tours-filter__wrapper">
          <div className="banner">
            <img alt="" src={banner} />
          </div>
          <div className="content">
            <div className="pathway">
              <ul>
                <li>
                  <a href="/">Trang chủ</a>
                </li>
                <li>
                  <span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </span>
                </li>
                <li>Tour</li>
                <li>
                  <span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </span>
                </li>
                <li>
                  <strong>{nameProvice}</strong>
                </li>
              </ul>
            </div>
            <div className="tours-all__main">
              <div className="tours-all__left">
                <div className="request_tour">
                  <div className="tour-detail__plan">
                    <div className="tour-detail__plan-header">
                      <img
                        alt=""
                        src="https://viettel.vn/images_content/img-solution-camera-2.png"
                      />
                      <div className="tour-detail__plan-info">
                        <span className="tour-plan__review">
                          Lên kế hoạch cho chuyến tham quan
                          <strong> {nameProvice}</strong> với KTravel
                        </span>
                      </div>
                    </div>
                    <div className="tour-detail__plan-body">
                      <Form
                        name="normal_senyc"
                        className="sendyc-form"
                        initialValues={{
                          remember: true,
                        }}
                        onFinish={handleRequest}
                      >
                        <label htmlFor="place">Địa điểm:</label>
                        <p className="ant-input">{nameProvice}</p>
                        <Form.Item name="startDate" label="Ngày bắt đầu:">
                          <DatePicker
                            onChange={onChangeTimeStart}
                            placeholder="Chọn ngày"
                            format={dateFormatList}
                            defaultValue={moment(timeStart)}
                          />
                        </Form.Item>

                        <Form.Item name="content" label="Mô tả:">
                          <TextArea
                            placeholder="Nhập yêu cầu"
                            rows={3}
                            onChange={(e) => setDesc(e.target.value)}
                          />
                        </Form.Item>

                        <Button
                          htmlType="submit"
                          className="button button--primary"
                        >
                          Yêu cầu
                        </Button>
                      </Form>

                      <Modal
                        title=""
                        open={isModalOpen}
                        visible={isModalOpen}
                        footer={null}
                        centered
                        onCancel={handleCancel}
                      >
                        <div className="modal-content">
                          {show && (
                            <div className="modal-body">
                              <p className="modal-place">
                                <strong>Địa điểm:</strong> {nameProvice}
                              </p>
                              <p className="modal-place">
                                <strong>Thời gian:</strong> {time}
                              </p>
                              <p>
                                <strong>Mô tả:</strong>{" "}
                              </p>
                              <p>{desc}</p>
                            </div>
                          )}
                          {!show && (
                            <div className="modal-noti">
                              <Result
                                status="success"
                                title="Gửi yêu cầu thành công"
                                subTitle="HDV sẽ gửi tour đề xuất đến cho bạn trong vòng 2 giờ tới."
                                extra={[
                                  <Button
                                    type="primary"
                                    onClick={() => setShow(true)}
                                  >
                                    Xem
                                  </Button>,
                                  <Button onClick={handleOk}>Đóng</Button>,
                                ]}
                              />
                            </div>
                          )}
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tours-all__right ">
                <h3 className="tour-all-result">
                  Chúng tôi tìm thấy {data.length} tours cho Quý khách.
                </h3>
                {data && data.length > 0 ? (
                  <>
                    <div className="tours-all__list">
                      {data.slice(minValue, maxValue).map((item, index) => (
                        <TourItem item={item} key={index} />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="no-data">
                      <img alt="" src={nodata} />
                      <p className="no-data-text">
                        Không tìm thấy tour trong hệ thống
                      </p>
                    </div>
                  </>
                )}
                {data.length > 0 && (
                  <Pagination
                    defaultCurrent={1}
                    defaultPageSize={numberPage}
                    total={data.length}
                    onChange={(value) => handleChange(value)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
