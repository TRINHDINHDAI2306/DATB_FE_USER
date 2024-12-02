import React, { useEffect, useState } from "react";
import "../../../assets/css/create-tour.css";
import Image from "../../../components/image";
import { Link } from "react-router-dom";
function Step3({ step }) {
  useEffect(() => {}, []);

  return (
    <>
      <div className={step === 2 ? "step3__wrapper" : "hidden"}>
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
                <strong>Hành trình</strong>
              </li>
            </ul>
          </div>
          <h1 className="title">Hành trình</h1>
          <div className="main main-step3">
            <StepItem props={true} />
            <StepItem />
          </div>
          {/* tạo mới tự sinh id */}
          <Link to={`/tour/111`}>
            <div className="button-step2 button button--primary">Tạo tour</div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Step3;
function StepItem({ props }) {
  const [active, setActive] = useState(props ? props : false);
  const openServices = () => {
    setActive(!active);
  };
  return (
    <>
      <div className="main-form-step3">
        <div className="main-form-title-box" onClick={() => openServices()}>
          <h3 className="title-ht">Ngày 1</h3>
          <i class={active ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i>
        </div>
        <div className={active ? "main-form-item" : "hidden"}>
          <div className="form-item form-item-step3">
            <h3 className="form-title">Tiêu đề</h3>
            <input placeholder="Tiêu đề" />
          </div>
          <div className="form-item form-item-step3">
            <h3 className="form-title">Mô tả</h3>
            <div className="form-group group-2">
              <textarea cols={2} placeholder="Mô tả ngắn" />
              <textarea cols={3} placeholder="Mô tả chi tiết" />
            </div>
          </div>
          <div className="form-item form-item-step3">
            <h3 className="form-title">Dịch vụ</h3>
            <div className="form-group group-5">
              <label class="check-box">
                <input type="checkbox" class="check-box__input" />
                <span class="check-box__checkmark"></span>
                <p class="check-box__txt">Bữa sáng</p>
              </label>
              <label class="check-box">
                <input type="checkbox" class="check-box__input" />
                <span class="check-box__checkmark"></span>
                <p class="check-box__txt">Bữa trưa</p>
              </label>
              <label class="check-box">
                <input type="checkbox" class="check-box__input" />
                <span class="check-box__checkmark"></span>
                <p class="check-box__txt">Bữa tối</p>
              </label>
              <label class="check-box">
                <input type="checkbox" class="check-box__input" />
                <span class="check-box__checkmark"></span>
                <p class="check-box__txt">Vé vào</p>
              </label>
              <label class="check-box">
                <input type="checkbox" class="check-box__input" />
                <span class="check-box__checkmark"></span>
                <p class="check-box__txt">Phòng nghỉ</p>
              </label>
            </div>
          </div>
          <div className="form-item form-item-step3">
            <h3 className="form-title">Ảnh mô tả</h3>
            <Image lengthImg={1} />
          </div>
        </div>
      </div>
    </>
  );
}
