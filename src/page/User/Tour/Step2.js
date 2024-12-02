import React, { useEffect, useState } from "react";
import "../../../assets/css/create-tour.css";
import Image from "../../../components/image";
import Step3 from "./Step3";
function Step2({ step }) {
  const [next, setNext] = useState(1);
  const onFinish = () => {
    setNext(2);
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className={step === 1 && next === 1 ? "step1__wrapper" : "hidden"}>
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
                <strong>Lên kế hoạch chi tiết</strong>
              </li>
            </ul>
          </div>
          <h1 className="title">Kế hoạch chi tiết </h1>
          <div className="main">
            <section className="main-left">
              <div className="main-form">
                <div className="form-item">
                  <h3 className="form-title">Tiêu đề</h3>
                  <input placeholder="Tiêu đề" />
                </div>
                <div className="form-item">
                  <h3 className="form-title">Mô tả</h3>
                  <div className="form-group group-2">
                    <textarea cols={3} placeholder="Mô tả" />
                    <textarea cols={3} placeholder="Mô tả" />
                  </div>
                </div>
                <div className="form-item">
                  <h3 className="form-title">Dịch vụ</h3>
                  <div className="form-group group-3">
                    <textarea cols={3} placeholder="Bao gồm" />
                    <textarea cols={3} placeholder="Không bao gồm" />
                    <textarea cols={3} placeholder="Tùy chọn" />
                  </div>
                </div>
                <div className="form-item">
                  <h3 className="form-title">Đặt lịch đón</h3>
                  <div className="form-group group-2">
                    <div className="form-group-calender">
                      <h5 className="form-group-calender-box-sub">Ngày</h5>
                      <div className="group-calender">
                        <i className="icon-calendar"></i>
                        <input type="date" />
                      </div>
                    </div>
                    <div className="form-group-calender">
                      <h5 className="form-group-calender-box-sub">Giờ</h5>
                      <div className="group-calender">
                        <i className="icon-calendar"></i>
                        <input type="time" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-item">
                  <h3 className="form-title">Ảnh mô tả</h3>
                  <Image lengthImg={5} />
                </div>
              </div>
            </section>
            <section className="main-right">
              <div className="tour-detail__plan">
                <div className="tour-detail__plan-header">
                  <img
                    alt=""
                    src="https://viettel.vn/images_content/img-solution-camera-2.png"
                  />
                  <div className="tour-detail__plan-info">
                    <span className="tour-plan__review">Mã tour: 23456</span>
                    <p className="tour-plan__name">Nguyễn Văn A</p>
                    <span className="tour-plan__review">32 tuổi - Nữ</span>
                  </div>
                </div>
                <div className="tour-detail__plan-body">
                  <div className="tour-info-item">
                    <p className="tour-info-title">Sở thích</p>
                    <p className="tour-info-value">Du lịch gia đình</p>
                  </div>
                  <div className="tour-info-item">
                    <p className="tour-info-title">Số chuyến đi</p>
                    <p className="tour-info-value">234</p>
                  </div>
                  <div className="tour-info-item">
                    <p className="tour-info-title">Trip</p>
                    <p className="tour-info-value">Miền Bắc</p>
                  </div>
                  <div className="tour-info-item">
                    <p className="tour-info-title">SĐT</p>
                    <p className="tour-info-value">0978684632</p>
                  </div>
                  <div className="button button--sub">Chat</div>
                </div>
              </div>
            </section>
          </div>
          <div
            className="button-step2 button button--primary"
            onClick={onFinish}
          >
            Tiếp theo
          </div>
        </div>
      </div>
      <Step3 step={next} />
    </>
  );
}
export default Step2;
