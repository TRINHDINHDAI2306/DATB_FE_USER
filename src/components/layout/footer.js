/* eslint-disable */

import { useEffect } from "react";
import { logo } from "../../constants/images";

function Footer() {
  useEffect(() => {}, []);
  return (
    <>
      <footer className="foorwr__wrapper">
        <div className="content">
          <div className="tour-footer-sub">
            <div className="tour-footer-logo">
              <div className="tour-footer-img">
                <img src={logo} alt="" />
              </div>
              <h1 className="tour-footer-logo__text">Ktravel</h1>
            </div>
            <div className="tour-footer-list">
              <ul className="tour-footer-content">
                <li className="tour-footer__item">
                  <i className="fa-regular fa-star"></i>
                  <p className="tour-footer__text">Giá tốt nhất</p>
                </li>
                <li className="tour-footer__item">
                  <i className="fa-brands fa-cc-paypal"></i>
                  <p className="tour-footer__text">Thanh toán dễ dàng</p>
                </li>
                <li className="tour-footer__item">
                  <i className="fa-regular fa-heart"></i>
                  <p className="tour-footer__text">Yêu thích</p>
                </li>
                <li className="tour-footer__item">
                  <i className="fa-solid fa-shield-halved"></i>
                  <p className="tour-footer__text">Bảo mật tuyệt đối</p>
                </li>
                <li className="tour-footer__item">
                  <i className="fa-solid fa-person-walking-luggage"></i>
                  <p className="tour-footer__text">Nhanh chóng, dễ dàng</p>
                </li>
                <li className="tour-footer__item">
                  <i className="fa-solid fa-comments"></i>
                  <p className="tour-footer__text">Liên hệ hỏi đáp </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
