/* eslint-disable */

import { useEffect } from "react";
import { Link } from "react-router-dom";

function HdvItem({ item }) {
  useEffect(() => { }, []);
  return (
    <>
      <div className="tour-guides__item">
        <div className="tour-guides__card-img tour-view__card-img">
          <img
            alt=""
            className="tour-guides__img tour-view__img"
            src={item?.tourGuideAvatar}
          />
          <div className="tour-guides__tag tour-view__tag">
            <p className="tour-guides__tag-name tour-view__tag-name">
              Hoang dã
            </p>
            <p className="tour-guides__tag-name tour-view__tag-name">Ẩm thực</p>
          </div>
        </div>
        <div className="tour-guides__card-content">
          <div className="tour-guides__head">
            <p className="tour-guides__name">{item?.tourGuideUsername}</p>
            <p className="tour-guides__time">
              {item?.tourGuideGender == 1 ? "Nam" : "Nữ"}
            </p>
          </div>
          <div className="tour-guides-body">
            <ul className="tour-guides-list">
              <li className="tour-guides--item">
                <i className="fa-solid fa-calendar-days"></i>
                <p className="tour-guides__text">
                  Tuổi:
                  {new Date().getFullYear().toString() -
                    "1899-11-30T00:00:00.000Z".split("-")[0]}{" "}
                </p>
              </li>
              <li className="tour-guides--item">
                <i className="fa-solid fa-location-dot"></i>
                <p className="tour-guides__text">
                  Địa chỉ: {item?.provinceName}
                </p>
              </li>
              <li className="tour-guides--item">
                <i className="fa-solid fa-heart"></i>
                <p className="tour-guides__text">
                  Đánh giá:{" "}
                  {item?.star != null
                    ? `${parseInt(item?.star)} sao`
                    : "Chưa có đánh giá"}
                </p>
              </li>
              <li className="tour-guides--item">
                <i className="fa-solid fa-hand-holding-heart"></i>
                <p className="tour-guides__text">Tham gia: 5 năm trước</p>
              </li>
              <li className="tour-guides--item">
                <i className="fa-solid fa-plane-arrival"></i>
                <p className="tour-guides__text">
                  Chuyến đi: {item?.totalTour}
                </p>
              </li>
            </ul>
          </div>
          <Link to={`/trang-ca-nhan/${item?.tourGuideId}`}>
            <div className="button button--primary button-contact">Chi tiết</div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default HdvItem;
