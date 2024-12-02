/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Collapse } from "antd";

import Layout from "../../../components/layout/layout";
import "../../../assets/css/tour.css";
import { banner, trangan } from "../../../constants/images";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { sendGet } from "../../../utils/api";
export default function Tours() {
  const [data, setData] = useState();
  const { Panel } = Collapse;
  const formatterDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const listNews = async () => {
    const res = await sendGet("/posts/user-tourguide", { limit: 100 });
    if (res.statusCode == 200) {
      setData(res.returnValue.data);
    } else {
      message.error("Thất bại");
    }
  };
  useEffect(() => {
    listNews();
  }, []);
  return (
    <>
      <Layout>
        <div className="tours__wrapper">
          <main className="main-travel">
            <div className="lp-travel">
              <div className="lp-travel__banner">
                <img src={banner} alt="banner travel" />
              </div>
              <div className="lp-travel__detail">
                <div className="lp-travel__detail-bg"></div>
                <div className="lp-travel__detail-inner">
                  <div className="lp-travel__info">
                    <p className="lp-travel__des">
                      Cùng Ktravel khám phá vẻ đẹp của cảnh và người, để hiểu
                      sâu về văn hóa các vùng miền, để dâng trào cảm xúc tự hào
                      dân tộc, và thêm yêu tổ quốc.
                    </p>
                    <p className="lp-travel__des">
                      Hè này, nếu bạn đang có ý định đi du lịch, đừng quên tham
                      khảo các thông tin dưới đây để chuẩn bị cho mình một kỳ
                      nghỉ tuyệt vời và đáng nhớ.
                    </p>
                  </div>
                  <div className="lp-travel__map">
                    <div className="lp-travel__map-info">
                      <div className="lp-travel__map-bg"></div>
                    </div>
                  </div>
                  <a
                    className="lp-travel__location lc-hanoi"
                    href="/du-lich/thanh-pho-ha-noi"
                  ></a>
                  <a
                    className="lp-travel__location lc-quangninh"
                    href="/du-lich/quang-ninh"
                  ></a>
                  <a
                    className="lp-travel__location lc-hagiang"
                    href="/du-lich/ha-giang"
                  ></a>
                  <a
                    className="lp-travel__location lc-sapa"
                    href="/du-lich/lao-cai"
                  ></a>
                  <a
                    className="lp-travel__location lc-nghean"
                    href="/du-lich/nghe-an"
                  ></a>
                  <a
                    className="lp-travel__location lc-mocchau"
                    href="/du-lich/son-la"
                  ></a>
                  <a
                    className="lp-travel__location lc-ninhbinh"
                    href="/du-lich/ninh-binh"
                  ></a>
                  <a
                    className="lp-travel__location lc-quangbinh"
                    href="/du-lich/quang-binh"
                  ></a>
                  <a
                    className="lp-travel__location lc-hue"
                    href="/du-lich/thua-thien-hue"
                  ></a>
                  <a
                    className="lp-travel__location lc-danang"
                    href="/du-lich/thanh-pho-da-nang"
                  ></a>
                  <a
                    className="lp-travel__location lc-binhdinh"
                    href="/du-lich/binh-dinh"
                  ></a>
                  <a
                    className="lp-travel__location lc-daklak"
                    href="/du-lich/dak-lak"
                  ></a>
                  <a
                    className="lp-travel__location lc-nhatrang"
                    href="/du-lich/khanh-hoa"
                  ></a>
                  <a
                    className="lp-travel__location lc-dalat"
                    href="/du-lich/lam-dong"
                  ></a>
                  <a
                    className="lp-travel__location lc-hcm"
                    href="/du-lich/thanh-pho-ho-chi-minh"
                  ></a>
                  <a
                    className="lp-travel__location lc-bentre"
                    href="/du-lich/ben-tre"
                  ></a>
                  <a
                    className="lp-travel__location lc-cantho"
                    href="/du-lich/can-tho"
                  ></a>
                  <a
                    className="lp-travel__location lc-phuquoc"
                    href="/du-lich/kien-giang"
                  ></a>
                </div>
              </div>
            </div>
            <div className="tour-banner">
              <img className="tour-banner-img" alt="" src={trangan} />
              <div className="content">
                <div className="tour-banner__text">
                  <h3 className="tour-banner-title">
                    Tra cứu thông tin HDV du lịch dễ dàng
                  </h3>
                  <p className="tour-banner-des">
                    Tùy chỉnh và lên kế hoạch chuyến đi ngay
                  </p>
                  <div className="button button--primary">
                    <a href="/diem-den">Khám phá ngay</a>
                  </div>
                </div>
              </div>
            </div>
            <hr className="line" />
            <div className="content">
              {data && (
                <div className="travel-tips">
                  <div className="travel-title-all">
                    <h3 className="travel-title">Tin tức</h3>
                    <Link to="/tin-tuc" className="travel-link">
                      Xem tất cả
                    </Link>
                  </div>
                  <div className="travel-tip__content">
                    <div className="travel-tip__left">
                      <div className="travel-tip__thumb">
                        <Link className="" to={`/tin-tuc/${data[0]?.id}`}>
                          <img alt="" src={data[0]?.image} />
                        </Link>
                      </div>
                      <div className="travel-tip__detail">
                        <a className="" href="#">
                          <h4 className="travel-tip__title">
                            {data[0]?.title}
                          </h4>
                          <div className="travel-tip__meta">
                            <div className="travel-tip__author">
                              <img
                                alt=""
                                src={
                                  data[0]?.user != null
                                    ? data[0]?.user.avatar
                                    : data[0]?.tourGuide.avatar
                                }
                              />
                              <p className="travel-tip__name">Tác giả</p>
                            </div>
                            <p className="travel-tip__time">
                              {formatterDate.format(
                                Date.parse(data[0]?.createdAt)
                              )}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="travel-tip__right">
                      <ul className="travel-tip__list">
                        {data?.slice(1, 4)?.map((item, index) => (
                          <li className="travel-tip__item" key={index}>
                            <div className="travel-tip__thumb">
                              <Link to={`/tin-tuc/${item?.id}`}>
                                <img alt="" src={item?.image} />
                              </Link>
                            </div>
                            <div className="travel-tip__detail">
                              <Link to={`/tin-tuc/${item?.id}`}>
                                <h4 className="travel-tip__title">
                                  {item?.title}
                                </h4>
                                <div className="travel-tip__meta">
                                  <div className="travel-tip__author">
                                    <img alt="" src={item?.image} />
                                    <p className="travel-tip__name">Tác giả</p>
                                  </div>
                                  <p className="travel-tip__time">
                                    {formatterDate.format(
                                      Date.parse(item?.createdAt)
                                    )}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="travel-question">
                <h3 className="travel-title">CÂU HỎI THƯỜNG GẶP</h3>
                <hr className="line" />
                <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
                  <Panel
                    header="1. Du lịch Việt Nam nên đi đâu?"
                    className="custom-collapse__header-name"
                    key="1"
                  >
                    <p className="custom-collapse__content">
                      Việt Nam sở hữu hàng ngàn những cảnh đẹp làm xao xuyến
                      lòng người, trong đó một vài địa điểm du lịch nổi tiếng ở
                      Việt Nam có thể kể đến như: Phú Quốc, Nha Trang, Đà Nẵng,
                      Huế, Hà Nội, Sài Gòn, Bình Định.
                    </p>
                  </Panel>
                  <Panel
                    header="2. Du lịch Việt Nam nên đi tháng mấy?"
                    className="custom-collapse__header-name"
                    key="2"
                  >
                    <p className="custom-collapse__content">
                      Để có những trải nghiệm du lịch tốt nhất khi đi khám phá
                      các địa danh nổi tiếng ở Việt Nam, 2 thời điểm đẹp nhất là
                      khoảng thời gian từ tháng 2 – tháng 5 hay từ tháng 8 –
                      tháng 10. Đây là khoảng thời điểm có lượng mưa thấp, nhiệt
                      độ không quá cao để đi du lịch.
                    </p>
                  </Panel>
                  <Panel
                    header="3. Du lịch Việt Nam ở đâu đẹp nhất?"
                    className="custom-collapse__header-name"
                    key="3"
                  >
                    <p className="custom-collapse__content">
                      KTravel xin giới thiệu đến bạn 9 điểm đến được nhiều du
                      khách ưa thích nhất mảnh đất hình chữ S năm 2022: 1. Mù
                      Cang Chải – Yên Bái; 2.Pù Luông – Thanh Hóa; 3. Tràng An –
                      Ninh Bình; 4. Quần thể cố đô Huế; 5. Hội An – Đà Nẵng; 6.
                      Các bãi biển đẹp tại Nha Trang – Khánh Hòa; 7. Đảo Phú
                      Quốc – Kiên Giang; 8. Thành phố Sài Gòn; 9. Thủ đô Hà Nội.
                    </p>
                  </Panel>
                  <Panel
                    header="4. Khám phá slogan du lịch Việt Nam qua các thời kỳ?"
                    className="custom-collapse__header-name"
                    key="4"
                  >
                    <p className="custom-collapse__content">
                      1. Slogan du lịch Việt Nam 2001 – 2004: “Việt Nam – Điểm
                      đến của thiên niên kỷ mới”
                    </p>
                    <p className="custom-collapse__content">
                      2. Slogan du lịch Việt Nam 2004 – 2005: “Hãy đến với Việt
                      Nam”
                    </p>
                    <p className="custom-collapse__content">
                      3. Slogan du lịch Việt Nam 2006 – 2011: “Việt Nam – Vẻ đẹp
                      tiềm ẩn”
                    </p>
                    <p className="custom-collapse__content">
                      4. Slogan du lịch Việt Nam 2012 – nay: “Việt Nam – Vẻ đẹp
                      bất tận”.
                    </p>
                  </Panel>
                </Collapse>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
}
