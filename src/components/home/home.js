/* eslint-disable */

import React, { useContext, useEffect, useState } from "react";
import {
  adjust,
  global,
  vocher,
  avt,
  address,
  hoguom,
  banner3,
  banner2,
  banner4,
  banner5,
  banner6,
  banner7,
  banner8,
  banner9,
} from "../../constants/images";
import OwlCarousel from "react-owl-carousel";
import { DatePicker, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { sendGet } from "../../utils/api";
import { AppContext } from "../../Context/AppContext";
const images = [
  {
    img: banner2,
    link: "#",
  },
  {
    img: banner3,
    link: "#",
  },
  {
    img: banner4,
    link: "#",
  },
  {
    img: banner5,
    link: "#",
  },
  {
    img: banner6,
    link: "#",
  },
  {
    img: banner7,
    link: "#",
  },
  {
    img: banner8,
    link: "#",
  },
  {
    img: banner9,
    link: "#",
  },
];
const feedback = [
  {
    name: "Nguyễn Văn A",
    time: "Thứ 2, 20/11/2022",
    des: "Tour giá tốt, dịch vụ xe cộ khách sạn ổn, hướng dẫn viên thân thiện, nhưng đồ ăn khá ít, nên cải thiện thêm khẩu phần ăn",
    img: { avt },
  },
  {
    name: "Nguyễn Văn A 1",
    time: "Thứ 2, 20/11/2022",
    des: "Dịch vụ ổn, khách sạn hơi cũ,nói chung phù hợp với giá tiền, sẽ tiếp tục trãi nghiệm các chương trình khác",
    img: { avt },
  },
  {
    name: "Nguyễn Văn A 2",
    time: "Thứ 2, 20/11/2022",
    des: "Tôi hài lòng, tour đi hướng dẫn viên vui, nhiệt tình, giá tốt",
    img: { avt },
  },
  {
    name: "Nguyễn Văn A 3",
    time: "Thứ 2, 20/11/2022",
    des: "Tour đi ổn, khách sạn hơi cũ, đồ ăn còn ít, nhưng bạn hướng dẫn viên rất nhiệt tình!",
    img: { avt },
  },
  {
    name: "Nguyễn Văn A 4",
    time: "Thứ 2, 20/11/2022",
    des: "HDV thân thiện, Phòng khách sạn 3* đúng tiêu chuẩn tuy nhiên hơi cũ. Bữa ăn đặc sản miền Tây ngon miệng. Giá cả hợp lý",
    img: { avt },
  },
];
const optionsPerson = {
  loop: true,
  autoplay: true,
  nav: true,
  dots: true,
  items: 3,
  margin: 20,
  stagePadding: 50,
  navText: [
    "<i class='fa-solid fa-angle-left'></i>",
    "<i class='fa-solid fa-angle-right'></i>",
  ],
  responsive: {
    0: {
      items: 2,
      stagePadding: 0,
    },
    768: {
      items: 2,
      stagePadding: 30,
    },
    991: {
      items: 2,
      stagePadding: 40,
    },
    1200: {
      items: 3,
    },
  },
};
const optionsFeedback = {
  loop: true,
  autoplay: false,
  autoplayTimeout: 3000,
  autoplayHoverPause: false,
  nav: true,
  dots: true,
  items: 5,
  margin: 30,
  navText: [
    "<i class='fa-solid fa-angle-left'></i>",
    "<i class='fa-solid fa-angle-right'></i>",
  ],
  responsive: {
    0: {
      items: 2,
    },
    500: {
      items: 3,
    },
    768: {
      items: 3,
    },
    991: {
      items: 4,
    },
    1200: {
      items: 5,
    },
  },
};
const optionsTouraddress = {
  loop: true,
  autoplay: true,
  autoplayTimeout: 4000,
  nav: true,
  dots: true,
  items: 5,
  margin: 20,
  stagePadding: 40,
  navText: [
    "<i class='fa-solid fa-angle-left'></i>",
    "<i class='fa-solid fa-angle-right'></i>",
  ],
  responsive: {
    0: {
      items: 2,
    },
    768: {
      items: 2,
    },
    991: {
      items: 3,
    },
    1200: {
      items: 5,
    },
  },
};
const optionsTourview = {
  loop: true,
  autoplay: false,
  nav: true,
  dots: true,
  items: 4,
  margin: 20,
  stagePadding: 50,
  navText: [
    "<i class='fa-solid fa-angle-left'></i>",
    "<i class='fa-solid fa-angle-right'></i>",
  ],
  responsive: {
    0: {
      items: 2,
    },
    768: {
      items: 2,
    },
    991: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};
function Home() {
  const [more, setMore] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const { provice } = useContext(AppContext);
  const [tourGuide, setTourGuide] = useState([]);
  const [tour, setTour] = useState([]);
  const [post, setPost] = useState([]);

  const onChangeTime = (date, dateString) => {
    localStorage.setItem("Timeprovice", date);
  };
  const handelProvice = (e) => {
    setSelectedOption(e.target.value);
    localStorage.setItem(
      "provice",
      e.target.options[e.target.selectedIndex].text
    );
    localStorage.setItem("proviceId", e.target.value);
  };
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const getData = async () => {
    const result = await sendGet("/tour-guide", { limit: 100 });
    if (result.returnValue.data.length >= 0) {
      setTourGuide(result?.returnValue?.data);
    } else {
      message.error("thất bại");
    }
  };
  const listTour = async () => {
    const res = await sendGet("/tours", { limit: 100 });
    if (res.returnValue.data.length >= 0) {
      setTour(res.returnValue.data);
    } else {
      message.error("Cập nhật tour thất bại");
    }
  };
  const formatterPrice = new Intl.NumberFormat("vi-VN", {
    hour: "2-digit",
    minute: "numeric",
  });
  const listNews = async () => {
    const res = await sendGet("/posts/user-tourguide", { limit: 100 });
    if (res.statusCode == 200) {
      setPost(res.returnValue.data);
    } else {
      message.error("Thất bại");
    }
  };
  useEffect(() => {
    listNews();
  }, []);
  useEffect(() => {
    getData();
    listTour();
  }, []);
  if (!Object.keys(tourGuide).length || !Object.keys(tour).length)
    return <Skeleton />;
  return (
    <>
      <div className="home__wrapper">
        <div class="travel-guarantee">
          <div class="travel-guarantee_title has-text-weight-bold mb-1">
            Du lịch thật dễ dàng
          </div>
          <div class="travel-guarantee_text">
            Thiết kế chuyến đi
            <span class="is-inline-block">|</span>
            Tiết kiệm chi phí
            <span class="is-inline-block">|</span>
            <Link class="link-component" to="/">
              Xem thêm
            </Link>
          </div>
        </div>
        <div className="banner__wrapper banner">
          <OwlCarousel
            className="owl-theme"
            loop
            margin={10}
            nav
            autoplay={false}
            dots={false}
            items={1}
          >
            {images.map((item, index) => (
              <div className="item" key={index}>
                <a href={item.link}>
                  <img src={item.img} alt="" />
                </a>
              </div>
            ))}
          </OwlCarousel>
          <div className="content">
            <div className="popup-place">
              <p className="banner-title">
                Lên kế hoạch cho chuyến đi của riêng mình cùng với HDV địa
                phương ngay!
              </p>
              <select
                name="select-place"
                id=""
                className=""
                onChange={(e) => handelProvice(e)}
              >
                <option defaultChecked value="">
                  Bạn muốn đi đâu?
                </option>
                {provice.map((item, index) => (
                  <option value={item?.id} key={index}>
                    {item?.name}
                  </option>
                ))}
              </select>
              {selectedOption && (
                <div className="times">
                  <DatePicker
                    onChange={onChangeTime}
                    placeholder="Chọn ngày"
                    format={dateFormatList}
                  />
                </div>
              )}
              <div className="button button--primary">
                <Link to={`/chuyen-di/${selectedOption}`}>Khám phá ngay</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row-banner-bg">
          <div className="content">
            <div className="row-banner">
              <div className="introduce-item">
                <img src={global} alt="" className="introduce-img" />
                <div className="introduce-des">
                  <h3>Hành trình thú vị</h3>
                  <p>
                    Hướng dẫn viên địa phương luôn sẵn sàng lên kế hoạch cho các
                    tour du lịch độc đáo, nổi bật nhất.
                  </p>
                </div>
              </div>
              <div className="introduce-item">
                <img src={adjust} alt="" className="introduce-img" />
                <div className="introduce-des">
                  <h3>100% có thể tùy chỉnh</h3>
                  <p>Tùy chỉnh chuyến đi của bạn đến từng chi tiết.</p>
                </div>
              </div>
              <div className="introduce-item">
                <img src={vocher} alt="" className="introduce-img" />
                <div className="introduce-des">
                  <h3>Giá thành rẻ</h3>
                  <p>
                    Bỏ qua các tour du lịch đắt đỏ bằng cách trao đổi trực tiếp
                    với các HDV địa phương
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="tour-guide">
            <div className="tour-guide-left">
              <h2 className="tour-guide-title">
                100% tour du lịch được thiết kế riêng từ các HDV địa phương được
                công nhận
              </h2>
              <p className="tour-guide-sub-title">
                HDV của chúng tôi chính là những người dân tại nơi đến. Họ là
                những người nắm rõ bản sắc văn hóa nơi mà họ đang sinh sống.{" "}
                <strong>KTravel</strong> đảm bảo rằng họ cung cấp các dịch vụ
                tốt nhất, có kiến thức địa phương sâu rộng và có niềm đam mê
                giúp bạn tạo ra chuyến đi đáng nhớ của mình.
              </p>
            </div>
            <OwlCarousel
              className="tour-guide-right owl-theme"
              {...optionsPerson}
            >
              {tourGuide?.map((item, index) => (
                <div className="tour-guide-item" key={index}>
                  <div>
                    <img src={item?.tourGuideAvatar} alt="" />
                    <div className="tour-guide-des">
                      <h3 className="tour-guide-name">{item?.tourGuideName}</h3>
                      <p className="tour-guide-place">{item?.provinceName}</p>
                    </div>
                  </div>
                  <Link
                    to={`/trang-ca-nhan/${item?.tourGuideId}`}
                    class="button_xem"
                  >
                    Xem HDV
                  </Link>
                </div>
              ))}
            </OwlCarousel>
          </div>
          <div className="tour-guides tour-view">
            <div className="travel-title-all">
              <h2 className="travel-title">Hướng dẫn viên</h2>
              <a href="#" className="travel-link">
                Xem tất cả <i class="fa-solid fa-angle-right"></i>
              </a>
            </div>

            <div className="tour-guides__main">
              <OwlCarousel
                className="tour-guides__list owl-theme "
                {...optionsTourview}
              >
                {tourGuide?.map((item, index) => (
                  <div className="tour-guides__item" key={index}>
                    <div className="tour-guides__card-img tour-view__card-img">
                      <img
                        alt=""
                        className="tour-guides__img tour-view__img"
                        src={item?.tourGuideAvatar}
                      />
                      <div className="tour-guides__tag tour-view__tag">
                        <p className="tour-guides__tag-name tour-view__tag-name">
                          Nature
                        </p>
                        <p className="tour-guides__tag-name tour-view__tag-name">
                          Private Tour
                        </p>
                      </div>
                    </div>
                    <div className="tour-guides__card-content">
                      <div className="tour-guides__head">
                        <p className="tour-guides__name">
                          {item?.tourGuideName}
                        </p>
                        <p className="tour-guides__time">
                          {item?.tourGuideGender == 1 ? "Nam" : "Nữ"}
                        </p>
                      </div>
                      <div className="tour-guides-body">
                        <ul className="tour-guides-list">
                          <li className="tour-guides--item">
                            <i className="fa-solid fa-calendar-days"></i>
                            <p className="tour-guides__text">
                              Tuổi:{" "}
                              {new Date().getFullYear() -
                                item?.tourGuideDob.split("-")[0]}
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
                              Đánh giá:{item?.star}{" "}
                            </p>
                          </li>
                          <li className="tour-guides--item">
                            <i className="fa-solid fa-plane-arrival"></i>
                            <p className="tour-guides__text">
                              Chuyến đi: {item?.totalTour}
                            </p>
                          </li>
                        </ul>
                        <Link
                          to={`trang-ca-nhan/${item?.tourGuideId}`}
                          className="travel-link"
                        >
                          Chi tiết <i class="fa-solid fa-angles-right"></i>
                        </Link>
                      </div>

                      <div className="button button--primary button-contact">
                        <Link to={`/chat/${item?.tourGuideId}`}>Liên hệ</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>
          <div className="tour-banner tour-banner2">
            <img className="tour-banner-img" alt="" src={hoguom} />
            <div className="content">
              <div className="tour-banner__text">
                <h3 className="tour-banner-title">Du lịch theo cá tính</h3>
                <p className="tour-banner-des">
                  Trải nghiệm trọn vẹn - Giá cả phải chăng
                </p>
                <div className="button">
                  <a href="#">Thiết kế chuyến đi</a>
                </div>
              </div>
            </div>
          </div>
          <div className="tour-address">
            <h2 className="travel-title">
              <Link to="diem-den">Điểm đến</Link>
            </h2>
            <p className="travel-des">
              Khám phá, tạo và đặt chuyến đi của bạn!
            </p>

            <div className="tour-address__main">
              <OwlCarousel
                className="tour-address__list owl-theme"
                {...optionsTouraddress}
              >
                {provice?.map((item, index) => (
                  <div className="tour-address__item" key={index}>
                    <Link to={`/du-lich/${item?.slug}`}>
                      <img
                        alt=""
                        className="tour-address__img"
                        src={item?.images}
                      />
                      <div className="tour-address__info">
                        <i class="fa-solid fa-map-location-dot"></i>
                        <p className="tour-address__name">{item?.name}</p>
                      </div>
                      <button class="button_xem">Xem điểm đến</button>
                    </Link>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>
          {/* bai viet */}
          {post && <div className="news">
            <div className="travel-title-all">
              <h2 className="travel-title">Bài viết</h2>
              <Link to='/tin-tuc' className="travel-link">
                Xem tất cả <i class="fa-solid fa-angle-right"></i>
              </Link>
            </div>
            <div className="news-main">
              <ul className="news-left">
                <li className="news-left-item">
                  <Link to={`/tin-tuc/${post[0]?.id}`}>
                    <div className="news-left-thumb">
                      <img
                        alt=""
                        src={post[0]?.image}
                      />
                    </div>{" "}
                  </Link>
                  <div className="news-left__intro">
                    <Link to={`/tin-tuc/${post[0]?.id}`}>
                      <h3 className="news-left__name"> {post[0]?.title}</h3>
                    </Link>
                    <p className="news-left-des" dangerouslySetInnerHTML={{
                      __html: post[0]?.currentContent,
                    }}>
                    </p>
                    <Link to={`/tin-tuc/${post[0]?.id}`} className="news-link">
                      Xem chi tiết
                    </Link>
                  </div>
                </li>
              </ul>
              <ul className="news-right">
                {post?.slice(1, 3)?.map((item, index) => (
                  <li className="news-right-item" key={index}>
                    <div className="news-right-thumb">
                      <Link to={`/tin-tuc/${item?.id}`}>
                        <img alt="" src={item?.image} />
                      </Link>
                    </div>
                    <div className="news-right__intro">
                      <Link to={`/tin-tuc/${item?.id}`}>
                        <h3 className="news-right__name"> {item?.title}</h3>
                      </Link>
                      <p className="news-right-des" dangerouslySetInnerHTML={{
                        __html: data[0]?.currentContent,
                      }}>
                      </p>
                      <Link to={`/tin-tuc/${item?.id}`} className="news-link">
                        Xem chi tiết
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>}

          <div className="tour-view">
            <div className="travel-title-all">
              <div>
                {" "}
                <h2 className="travel-title">Tour du lịch</h2>
                <p className="travel-des">
                  Chọn một chuyến đi bạn thích hoặc liên hệ trực tiếp với HDV
                </p>
              </div>
              <Link href="/tour" className="travel-link">
                Xem tất cả<i class="fa-solid fa-angle-right"></i>
              </Link>
            </div>

            <div className="tour-view__main">
              <OwlCarousel
                className="tour-view__list owl-theme "
                {...optionsTourview}
              >
                {tour?.map((item, index) => (
                  <div className="tour-view__item" key={index}>
                    <div className="tour-view__card-img">
                      <img
                        alt=""
                        className="tour-view__img"
                        src={item?.images[0]?.url}
                      />
                      <div className="tour-view__tag">
                        <p className="tour-view__tag-name">{item?.type}</p>
                      </div>
                      <div className="tour-view-avt">
                        <img
                          alt=""
                          className="tour-view__avt"
                          src={item?.tourGuide?.avatar}
                        />
                      </div>
                    </div>
                    <div className="tour-view__card-content">
                      <div className="tour-view__head">
                        <p className="tour-view__name">
                          {item?.province?.name}
                        </p>
                        <p className="tour-view__time">
                          {item?.tourSchedule.length} ngày
                        </p>
                      </div>
                      <div className="tour-view-body">
                        <h3 className="tour-view__title">{item?.name}</h3>
                        <p className="tour-view__des">{item?.description}</p>
                        <div className="tour-view__place">
                          <i className="fa-solid fa-plane-arrival"></i>
                          <span className="tour-view__place-name">
                            {item?.province?.name}
                          </span>
                        </div>
                      </div>
                      <div className="tour-view-footer">
                        <p className="tour-view__price">
                          khoảng{" "}
                          <span>
                            {formatterPrice.format(item?.basePrice)} đ
                          </span>
                        </p>
                        <div className="tour-view__evaluate">
                          <div className="tour-view__star">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half-stroke"></i>
                            <i className="fa-regular fa-star"></i>
                            <span>Đã đi 1.2k</span>
                          </div>
                          <Link to={`/tour/${item?.id}`}>
                            <div className="button button--primary button-contact">
                              Tùy chỉnh và liên hệ
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>
        </div>
        <div className="tour-banner">
          <img
            className="tour-banner-img"
            alt=""
            src="https://images.vietnamtourism.gov.vn/vn/images/2020/Thang_9/trang_an1.jpg"
          />
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
        <div className="content">
          <div className="tour-feedback">
            <h2 className="travel-title">Trải nghiệm đặc biệt</h2>
            <p className="travel-des">
              Đánh giá từ du khách về trải nghiệm của họ với Ktravel
            </p>
            <div className="tour-feedback__main">
              <OwlCarousel
                className="tour-feedback__list owl-theme"
                {...optionsFeedback}
              >
                {feedback.map((item, index) => (
                  <div className="tour-feedback__item" key={index}>
                    <div className="tour-feedback__star">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star-half-stroke"></i>
                    </div>
                    <div
                      className={
                        more
                          ? "tour-feedback__content more"
                          : "tour-feedback__content"
                      }
                    >
                      {item.des}
                    </div>
                    <div className="tour-feedback__people">
                      <img
                        alt=""
                        className="tour-feedback__avt"
                        src={item.img.avt}
                      />
                      <div className="tour-feedback__info">
                        <p className="tour-feedback__name">{item.name}</p>
                        <p className="tour-feedback__time">{item.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
