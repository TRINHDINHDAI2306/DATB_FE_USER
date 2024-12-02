/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../../components/layout/layout";
import "../../../assets/css/news.css";
import { sendGet } from "../../../utils/api";
import { Pagination } from "antd";
export default function News() {
  const numberPage = 6;
  const [data, setData] = useState();
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
        <div className="news__wrapper">
          <div className="banner">
            <img
              alt=""
              src="https://statics.vinpearl.com/dao-phu-quoc_1661246610.jpg"
            />
          </div>
          <div className="news-content">
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
                  <li>
                    <strong>Tin tức</strong>
                  </li>
                </ul>
              </div>
              <div className="news-search">
                <div className="news-input">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="news-list">
                {data?.slice(minValue, maxValue)?.map((item, index) => (
                  <div className="news-item" key={index}>
                    <div className="news-img">
                      <Link to={`/tin-tuc/${item?.id}`}>
                        <img alt="" src={item?.image} />
                      </Link>
                    </div>
                    <div className="news-main">
                      <h2 className="news-title">
                        <Link to={`/tin-tuc/${item?.id}`}>{item?.title}</Link>
                      </h2>
                      <p
                        className="news-des"
                        dangerouslySetInnerHTML={{
                          __html: item?.currentContent,
                        }}
                      />
                      <div className="news-post-share-box">
                        <div className="news-post-share-item">
                          <a href="#" className="news-post-like" title="Like">
                            <i className="fa-regular fa-heart"></i>
                          </a>
                          <a
                            className="post-share-facebook"
                            target="_blank"
                            rel="noreferrer"
                            href="#"
                            title="Facebook"
                          >
                            <i className="fa-brands fa-facebook-f"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="news-paging">
                {data && data.length > 0 && (
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
