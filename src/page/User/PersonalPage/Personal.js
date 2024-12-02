/* eslint-disable */
import React, { useEffect } from "react";
import Layout from "../../../components/layout/layout";
import { avt, banner } from "../../../constants/images";
import "../../../assets/css/personal.css";
import { sendGet } from "../../../utils/api";
import { Rate, Skeleton, Tag } from "antd";
import TourItem from "../../../components/tourItem";
import OwlCarousel from "react-owl-carousel";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
export default function Personal() {
  const options = {
    loop: true,
    autoplay: true,
    nav: true,
    dots: true,
    items: 4,
    margin: 20,
    stagePadding: 80,
    navText: [
      "<i class='fa-solid fa-angle-left'></i>",
      "<i class='fa-solid fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
        stagePadding: 0,
      },
      380: {
        items: 2,
        stagePadding: 0,
        margin: 10,
      },
      768: {
        items: 3,
        stagePadding: 30,
        margin: 15,
      },
      991: {
        items: 3,
        stagePadding: 60,
        margin: 15,
      },
      1200: {
        items: 4,
      },
    },
  };
  const optionsPeople = {
    loop: true,
    autoplay: false,
    nav: true,
    dots: false,
    items: 8,
    margin: 20,
    navText: [
      "<i class='fa-solid fa-angle-left'></i>",
      "<i class='fa-solid fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 3,
      },
      380: {
        items: 4,
        margin: 10,
      },
      768: {
        items: 6,
        margin: 15,
      },
      991: {
        items: 7,
        margin: 15,
      },
      1200: {
        items: 8,
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
  const tourview = [
    {
      img: "https://phuonganhbeau.weebly.com/uploads/1/3/0/0/130045835/chua-mot-cot_orig.jpg",
      avt: "https://d3icb70lnx3c24.cloudfront.net/1200x614/7a7227030111fcf1.jpeg",
      tag: ["tour gia đình", "tour private"],
      place: "Bắc Ninh",
      time: "3 ngày",
      title: "3 ngày thăm thú Làng quan họ",
      des: "Về làng quan họ, đền Giếng, chùa Dâu, chùa Phật Tích,...",
      hdv: "Duy Nguyen",
      price: "200.000đ",
      rate: 123,
      id: "ghj6781q2",
    },
    {
      img: "https://phuonganhbeau.weebly.com/uploads/1/3/0/0/130045835/chua-mot-cot_orig.jpg",
      avt: "https://d3icb70lnx3c24.cloudfront.net/1200x614/7a7227030111fcf1.jpeg",
      tag: ["tour gia đình", "tour private"],
      place: "Bắc Ninh",
      time: "3 ngày",
      title: "3 ngày thăm thú Làng quan họ",
      des: "Về làng quan họ, đền Giếng, chùa Dâu, chùa Phật Tích,...",
      hdv: "Duy Nguyen",
      price: "200.000đ",
      rate: 123,
      id: "ghj6781q2",
    },
    {
      img: "https://icdn.dantri.com.vn/thumb_w/640/2020/04/24/thai-lan-1587703892914.jpeg",
      avt: "https://d3icb70lnx3c24.cloudfront.net/1200x614/7a7227030111fcf1.jpeg",
      tag: ["tour gia đình", "tour private"],
      place: "Bắc Ninh",
      time: "3 ngày",
      title: "3 ngày thăm thú Làng quan họ",
      des: "Về làng quan họ, đền Giếng, chùa Dâu, chùa Phật Tích,...",
      hdv: "Duy Nguyen",
      price: "200.000đ",
      rate: 123,
      id: "ghj6781q2",
    },
    {
      img: "https://icdn.dantri.com.vn/thumb_w/640/2020/04/24/thai-lan-1587703892914.jpeg",
      avt: "https://icdn.dantri.com.vn/thumb_w/640/2020/04/24/thai-lan-1587703892914.jpeg",
      tag: ["tour gia đình", "tour private"],
      place: "Bắc Ninh",
      time: "3 ngày",
      title: "3 ngày thăm thú Làng quan họ",
      des: "Về làng quan họ, đền Giếng, chùa Dâu, chùa Phật Tích,...",
      hdv: "Duy Nguyen",
      price: "200.000đ",
      rate: 123,
      id: "ghj6781q2",
    },
    {
      img: "https://phuonganhbeau.weebly.com/uploads/1/3/0/0/130045835/chua-mot-cot_orig.jpg",
      avt: "https://d3icb70lnx3c24.cloudfront.net/1200x614/7a7227030111fcf1.jpeg",
      tag: ["tour gia đình", "tour private"],
      place: "Bắc Ninh",
      time: "3 ngày",
      title: "3 ngày thăm thú Làng quan họ",
      des: "Về làng quan họ, đền Giếng, chùa Dâu, chùa Phật Tích,...",
      hdv: "Duy Nguyen",
      price: "200.000đ",
      rate: 123,
      id: "ghj6781q2",
    },
  ];
  const params = useParams();
  const [data, setData] = useState({});
  const [tour, setTour] = useState([]);
  const [guide, setGuide] = useState([]);
  function currencyFormat(num) {
    return new Intl.NumberFormat().format(num);
  }
  const detailHdv = async () => {
    const result = await sendGet(`/tour-guide/guest/${params.id}`);
    if (result.statusCode == 200) {
      setData(result.returnValue);
      setTour(result.returnValue?.tours);
      // return result.returnValue.data?.provinces[0]?.id;
    } else {
      message.error("thất bại");
    }
  };
  // const allHdv = async () => {
  //   let id = await detailHdv();
  //   console.log("id1", id);
  //   const result = await sendGet("/tour-guide", {
  //     provinces: id,
  //   });
  //   if (result.statusCode == 200) {
  //     setGuide(result.returnValue.data);
  //   } else {
  //     message.error("thất bại");
  //   }
  // };
  useEffect(() => {
    detailHdv();
  }, []);
  if (!Object.keys(data).length) return <Skeleton />;
  // if (!Object.keys(guide).length) return <Skeleton />;

  return (
    <>
      <Layout>
        <div className="personal__wrapper">
          <div className="personal-page__wrapper">
            <div className="cover-image">
              <img alt="" src={banner} />
            </div>
            <div className="content">
              <div className="personal-page__main">
                <div className="personal-page-left">
                  <div className="personal-page__avt">
                    <img alt="" src={data?.avatar} />
                  </div>
                  <h3 className="personal-page__name">{data?.name}</h3>
                  <h3 className="personal-page__position">
                    Hướng dẫn viên của{" "}
                    {data?.provinces?.map((item) => (
                      <> - {item.name} </>
                    ))}
                  </h3>
                  <div className="personal-page__contact">
                    <Link to={`/chat/${data?.id}`} className="button button--primary">
                      Liên hệ
                    </Link>
                  </div>

                  <div className="evaluate">
                    <h4 className="evaluate-title">Hài lòng</h4>
                    <div className="evaluate-star">
                      <Rate allowHalf disabled defaultValue={data?.avgStar} />
                    </div>
                    {/* <p className="evaluate-des">({data?.avgStar} đánh giá)</p> */}
                  </div>
                </div>
                <div className="personal-page-right">
                  <h3 className="personal-page-title">
                    Xin chào, mình là {data?.name}!
                  </h3>
                  <p className="personal-page-sub-title">{data?.bio}</p>
                  <div className="personal-page-infomation">
                    <div className="personal-page-infomation-item">
                      <h3 className="personal-page__title">Thông tin cơ bản</h3>
                      <ul className="personal-page__list">
                        <li className="personal-page__item">
                          <div className="personal-page-item__title">
                            <i className="fa-solid fa-location-dot"></i>
                            <p className="personal-page__des">Điểm đến chính</p>
                          </div>
                          <p className="personal-page__value">
                            {data?.provinces?.map((item) => (
                              <> - {item.name} </>
                            ))}
                          </p>
                        </li>
                        <li className="personal-page__item">
                          <div className="personal-page-item__title">
                            <i class="fa-solid fa-user"></i>
                            <p className="personal-page__des">Giới tính</p>
                          </div>
                          <p className="personal-page__value">
                            {data?.gender == 1 ? "Nam" : "Nữ"}
                          </p>
                        </li>
                        <li className="personal-page__item">
                          <div className="personal-page-item__title">
                            <i class="fa-solid fa-cake-candles"></i>
                            <p className="personal-page__des">Ngày sinh</p>
                          </div>
                          <p className="personal-page__value">{data?.dob}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="personal-page-infomation-item">
                      <h3 className="personal-page__title">Chuyến đi</h3>
                      <ul className="personal-page__list">
                        <li className="personal-page__item">
                          <div className="personal-page-item__title">
                            <i class="fa-solid fa-star"></i>
                            <p className="personal-page__des">Đánh giá</p>
                          </div>
                          <p className="personal-page__value">
                            {parseFloat(data?.avgStar).toFixed(1)}/5 sao
                          </p>
                        </li>
                        <li className="personal-page__item">
                          <div className="personal-page-item__title">
                            <i class="fa-solid fa-plane-arrival"></i>
                            <p className="personal-page__des">Chuyến đi</p>
                          </div>
                          <p className="personal-page__value">
                            {data?.numberOfOrder} chuyến
                          </p>
                        </li>
                        <li className="personal-page__item">
                          <div className="personal-page-item__title">
                            <i class="fa-solid fa-tags"></i>
                            <p className="personal-page__des">Tag</p>
                          </div>
                          <p className="personal-page__value">
                            <Tag color="orange">tour gia đình</Tag>
                            <Tag color="green">tour private</Tag>
                            <Tag color="red">tour tự lái</Tag>
                            <Tag color="blue">tour cao cấp</Tag>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="personal-page__container">
                {data?.tours.length > 0 &&
                  <> <p className="trip-suggest-title">Các chuyến đi gợi ý</p>
                    <div className="trip-suggest">
                      <OwlCarousel
                        className="trip-suggest__list owl-theme"
                        {...options}
                      >
                        {data?.tours?.map((item, index) => (
                          // <TourItem key={index} item={item} />
                          <div className="tour-view__item" key={index}>
                            <div className="tour-view__card-img">
                              <img alt="" className="tour-view__img" src={banner} />
                              <div className="tour-view__tag">
                                <p className="tour-view__tag-name tour-primary">
                                  {item.type == "Ecotourism"
                                    ? "Văn hóa"
                                    : item.type == "Cultural"
                                      ? "Nghỉ dưỡng"
                                      : item.type == "Entertainment"
                                        ? "Giải trí"
                                        : item.type == "Sports"
                                          ? "Thể thao"
                                          : "Khác"}
                                </p>
                              </div>
                            </div>
                            <div className="tour-view__card-content">
                              <div className="tour-view__head"></div>
                              <div className="tour-view-body">
                                <h3 className="tour-view__title">{item?.name}</h3>
                                <p className="tour-view__des">
                                  {item?.description}
                                </p>
                                <div className="tour-view__place">
                                  <i className="fa-solid fa-plane-arrival"></i>
                                  {/* <span className="tour-view__place-name">
                                {item?.place}
                              </span> */}
                                </div>
                                <Link
                                  to={`/tour/${item?.id}`}
                                  className="travel-link"
                                >
                                  Xem chi tiết
                                </Link>
                              </div>
                              <div className="tour-view-footer">
                                <p className="tour-view__price">
                                  khoảng
                                  <span>{currencyFormat(item?.basePrice)}đ</span>
                                  /một người
                                </p>
                                <div className="tour-view__evaluate">
                                  <div className="tour-view__star">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star-half-stroke"></i>
                                    <i className="fa-regular fa-star"></i>
                                    {/* <span>Đã đi {props?.item?.rate}</span> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </OwlCarousel>
                    </div>
                  </>
                }

                <p className="trip-suggest-title">Đánh giá từ du khách</p>
                <div className="tour-feedback__main">
                  <OwlCarousel
                    className="tour-feedback__list owl-theme"
                    {...optionsFeedback}
                  >
                    {tourview.map((item, index) => (
                      <div className="tour-feedback__item" key={index}>
                        <div className="tour-feedback__star">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <div className="tour-feedback__content">{item.des}</div>
                        <div className="tour-feedback__people">
                          <img
                            alt=""
                            className="tour-feedback__avt"
                            src={item.avt}
                          />
                          <div className="tour-feedback__info">
                            <p className="tour-feedback__name">{item.hdv}</p>
                            <p className="tour-feedback__time">{item.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </OwlCarousel>
                </div>
                <p className="trip-suggest-title">Có thể bạn quan tâm</p>
                <div className="trip-suggest">
                  <OwlCarousel
                    className="trip-suggest__list owl-theme"
                    {...optionsPeople}
                  >
                    {guide.map((item, index) => (
                      <div className="trip-suggest-main" key={index}>
                        <Link to={`/trang-ca-nhan/${item?.tourGuideId}`}>
                          <img
                            src={item?.tourGuideAvatar}
                            alt=""
                            className="tour-guide-hdv"
                          />
                          <div className="">
                            <h3 className="tour-guide-name">
                              {item?.tourGuideName}
                            </h3>
                            <p className="tour-guide-place">
                              {item?.provinceName}
                            </p>
                          </div>
                          <button class="button_xem">Xem HDV</button>
                        </Link>
                      </div>
                    ))}
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
