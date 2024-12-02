/* eslint-disable */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/introduce.css";
import Footer from "../components/layout/footer";
import {
  video,
  logo,
  intro,
  intro1,
  intro2,
  intro3,
  intro4,
  intro5,
} from "../constants/images";
export default function Introduce() {
  useEffect(() => {}, []);
  return (
    <>
      <div className="introduce__wrapper">
        <div className="introduce-header">
          <video autoPlay muted loop>
            <source src={video} />
          </video>
          <div className="intro-nav">
            <div className="content">
              <Link to="/">
                <img alt="" src={logo} />
              </Link>
              <div className="button button--primary">
                <Link to="/">Trang chủ</Link>
              </div>
            </div>
          </div>
          <div className="intro-main">
            <div className="intro-sub-main">
              <img alt="" src={intro} className="intro-main--bg1" />
              <img alt="" src={intro} className="intro-main--bg2" />
              <img alt="" src={intro} className="intro-main--bg3" />
              <img alt="" src={intro} className="intro-main--bg4" />
              <div className="intro-des">
                <h3 className="intro-title">
                  Chúng tôi đang mô phỏng lại công bằng hơn, du lịch bền vững
                  hơn
                </h3>
                <p className="intro-sub-title">
                  Du lịch có lợi cho tất cả; môi trường của chúng ta,
                </p>
                <div className="button button--normal">Cam kết</div>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="intro-item">
            <div className="intro-item-left">
              <h3 className="intro-item-title">
                Trong một thế giới đang thay đổi, không bao giờ có việc mô phỏng
                lại du lịch là quan trọng hơn.
              </h3>
            </div>
            <div className="intro-item-right">
              <p className="intro-item-content">
                Mục đích của chúng tôi ở đây tại Ktravel là kết nối mọi người để
                mô phỏng lại du lịch. Bây giờ, khi chúng ta đối mặt với tình
                trạng khẩn cấp khí hậu toàn cầu, việc không bao giờ mô phỏng lại
                việc đi lại là quan trọng hơn. Trong một thế giới đang thay đổi,
                du lịch cũng cần phải thay đổi và chúng tôi làm việc chăm chỉ để
                đảm bảo rằng du lịch vẫn là một trải nghiệm tích cực tuyệt vời
                cho thế giới. Những thách thức mà chúng ta phải đối mặt khi một
                ngành công nghiệp aren dễ dàng vượt qua và trong khi chúng ta
                đang tiếp tục thực hiện nhiều cải tiến, chúng ta không có câu
                trả lời. Chúng tôi học hỏi khi chúng tôi đi, rất lạc quan và
                đang thực hiện các bước quan trọng trên con đường hướng tới sự
                bền vững thực sự.
              </p>
            </div>
          </div>
          <div className="intro-item">
            <div className="intro-item-left">
              <div className="intro-item__img">
                <img alt="" src={intro1} />
              </div>
              <h3 className="intro-item-title">
                Trong một thế giới đang thay đổi, không bao giờ có việc mô phỏng
                lại du lịch là quan trọng hơn.
              </h3>
            </div>
            <div className="intro-item-right">
              <p className="intro-item-content">
                Mục đích của chúng tôi ở đây tại Ktravel là kết nối mọi người để
                mô phỏng lại du lịch. Bây giờ, khi chúng ta đối mặt với tình
                trạng khẩn cấp khí hậu toàn cầu, việc không bao giờ mô phỏng lại
                việc đi lại là quan trọng hơn.
              </p>
            </div>
          </div>
          <p className="intro-subtitle1">Tầm nhìn của chúng tôi cho du lịch</p>
          <p className="intro-subtitle2">Làm thế nào chúng ta đang thay đổi</p>
          <hr className="line" />
          <div className="intro-item">
            <div className="intro-item-left">
              <div className="intro-item__img">
                {" "}
                <img alt="" src={intro2} />
              </div>
              <h3 className="intro-item-title">
                Trong một thế giới đang thay đổi, không bao giờ có việc mô phỏng
                lại du lịch là quan trọng hơn.
              </h3>
            </div>
            <div className="intro-item-right">
              <p className="intro-item-content">
                Mục đích của chúng tôi ở đây tại Ktravel là kết nối mọi người để
                mô phỏng lại du lịch. Bây giờ, khi chúng ta đối mặt với tình
                trạng khẩn cấp khí hậu toàn cầu, việc không bao giờ mô phỏng lại
                việc đi lại là quan trọng hơn.
              </p>
            </div>
          </div>
          <div className="intro-item">
            <div className="intro-item-left">
              <div className="intro-item__img">
                <img alt="" src={intro3} />
              </div>
              <h3 className="intro-item-title">
                Trong một thế giới đang thay đổi, không bao giờ có việc mô phỏng
                lại du lịch là quan trọng hơn.
              </h3>
            </div>
            <div className="intro-item-right">
              <p className="intro-item-content">
                Mục đích của chúng tôi ở đây tại Ktravel là kết nối mọi người để
                mô phỏng lại du lịch. Bây giờ, khi chúng ta đối mặt với tình
                trạng khẩn cấp khí hậu toàn cầu, việc không bao giờ mô phỏng lại
                việc đi lại là quan trọng hơn.
              </p>
            </div>
          </div>
          <div className="intro-item">
            <div className="intro-item-left">
              <div className="intro-item__img">
                {" "}
                <img alt="" src={intro5} />
              </div>
              <h3 className="intro-item-title">
                Trong một thế giới đang thay đổi, không bao giờ có việc mô phỏng
                lại du lịch là quan trọng hơn.
              </h3>
            </div>
            <div className="intro-item-right">
              <p className="intro-item-content">
                Mục đích của chúng tôi ở đây tại Ktravel là kết nối mọi người để
                mô phỏng lại du lịch. Bây giờ, khi chúng ta đối mặt với tình
                trạng khẩn cấp khí hậu toàn cầu, việc không bao giờ mô phỏng lại
                việc đi lại là quan trọng hơn.
              </p>
            </div>
          </div>
        </div>
        <div className="intro-news">
          <div className="content">
            <h3 className="intro-news-title">Tin tức và lời khuyên bền vững</h3>
            <p className="intro-news-des">
              Tìm hiểu về những nỗ lực truyền cảm hứng mà các đối tác địa phương
              của chúng tôi đang thực hiện để giúp bảo tồn và tái tạo những điểm
              đến mà bạn thích ghé thăm.
            </p>
            <div className="intro-news-content">
              <div className="intro-news-item">
                <Link to="#">
                  <img alt=" " src={intro1} />
                  <div className="intro-card">
                    <p>Điểm đến kỳ nghỉ có ý thức sinh thái</p>
                  </div>
                </Link>
              </div>
              <div className="intro-news-item">
                <Link to="#">
                  <img alt=" " src={intro1} />
                  <div className="intro-card">
                    <p>Điểm đến kỳ nghỉ có ý thức sinh thái</p>
                  </div>
                </Link>
              </div>
              <div className="intro-news-item">
                <Link to="#">
                  <img alt=" " src={intro1} />
                  <div className="intro-card">
                    <p>Điểm đến kỳ nghỉ có ý thức sinh thái</p>
                  </div>
                </Link>
              </div>
              <div className="intro-news-item">
                <Link to="#">
                  <img alt=" " src={intro1} />
                  <div className="intro-card">
                    <p>Điểm đến kỳ nghỉ có ý thức sinh thái</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="intro-contact">
              <div className="intro-item">
                <div className="intro-item-left">
                  <h3 className="intro-item-contact">Hợp tác</h3>
                  <h3 className="intro-contact-sub-title">
                    Trong một thế giới đang thay đổi, không bao giờ có việc mô
                    phỏng lại du lịch là quan trọng hơn.
                  </h3>
                </div>
                <div className="intro-item-right">
                  <p className="intro-item-content">
                    Mục đích của chúng tôi ở đây tại Ktravel là kết nối mọi
                    người để mô phỏng lại du lịch. Bây giờ, khi chúng ta đối mặt
                    với tình trạng khẩn cấp khí hậu toàn cầu, việc không bao giờ
                    mô phỏng lại việc đi lại là quan trọng hơn.
                  </p>
                  <p>Email: kja2@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
