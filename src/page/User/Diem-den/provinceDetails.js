/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/layout/layout";
import "../../../assets/css/province-details.css";
import { data, banner } from "../../../constants/images";
export default function ProvinceDetails() {
  let params = useParams();
  console.log("params", params);
  const [province, setProvince] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [dataShow, setDataShow] = useState([]);
  const dataTab = () => {
    switch (currentTab) {
      case 0:
        setDataShow(province.kham_pha);
        break;
      case 1:
        setDataShow(province.am_thuc);
        break;
      case 2:
        setDataShow(province.mua_sam);
        break;
      case 3:
        setDataShow(province.hanh_trang);
        break;
    }
  };
  useEffect(() => {
    let check = false;
    data.forEach((e) => {
      if (e.path === params.id) {
        setProvince(e);
        check = true;
        return;
      }
    });
    if (check == false) {
      setProvince(data[data.length - 1]);
    }
  }, [params]);
  useEffect(() => {
    dataTab();
  }, [province, currentTab]);
  return (
    <>
      <Layout>
        <div className="province-details__wrapper">
          <div className="discover-detail">
            <div className="discover-detail__banner">
              <img
                src={province.banner ? province.banner : { banner }}
                alt={province?.label}
              />
              {province.label && (
                <div className="discover-detail__banner-info">
                  <div className="content">
                    <h2 className="discover-detail__banner-name">
                      {province?.label}
                    </h2>
                  </div>
                </div>
              )}
            </div>
            <div className="discover-detail__menu">
              <div className="content">
                <ul className="discover-detail__menu-list">
                  <li
                    className={
                      currentTab == 0
                        ? "discover-detail__menu-item active"
                        : "discover-detail__menu-item "
                    }
                    onClick={() => setCurrentTab(0)}
                  >
                    <a href="#" className="discover-detail__menu-link">
                      <h5 className="discover-detail__menu-name">
                        KHÁM PHÁ
                        <br />
                        TRẢI NGHIỆM
                      </h5>
                      <img
                        src="https://vietteltelecom.vn/images_content/img-travel-menu-4.png"
                        alt="icon KHÁM PHÁ TRẢI NGHIỆM"
                      />
                    </a>
                  </li>
                  <li
                    className={
                      currentTab == 1
                        ? "discover-detail__menu-item active"
                        : "discover-detail__menu-item "
                    }
                    onClick={() => setCurrentTab(1)}
                  >
                    <a href="#" className="discover-detail__menu-link">
                      <h5 className="discover-detail__menu-name">ẩm thực</h5>
                      <img
                        src="https://vietteltelecom.vn/images_content/img-travel-menu-3.png"
                        alt="icon ẩm thực"
                      />
                    </a>
                  </li>
                  <li
                    className={
                      currentTab == 2
                        ? "discover-detail__menu-item active"
                        : "discover-detail__menu-item "
                    }
                    onClick={() => setCurrentTab(2)}
                  >
                    <a href="#" className="discover-detail__menu-link">
                      <h5 className="discover-detail__menu-name">mua sắm</h5>
                      <img
                        src="https://vietteltelecom.vn/images_content/img-travel-menu-2.png"
                        alt="icon mua sắm"
                      />
                    </a>
                  </li>
                  <li
                    className={
                      currentTab == 3
                        ? "discover-detail__menu-item active"
                        : "discover-detail__menu-item "
                    }
                    onClick={() => setCurrentTab(3)}
                  >
                    <a href="#" className="discover-detail__menu-link">
                      <h5 className="discover-detail__menu-name">hành trang</h5>
                      <img
                        src="https://vietteltelecom.vn/images_content/img-travel-menu-1.png"
                        alt="icon hành trang"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="discover-detail__info">
              {dataShow?.map((item, index) => (
                <div className="content" key={index}>
                  <h3 className="discover-detail__info-title">{item.title}</h3>
                  <div
                    className="discover-detail__info-intro discover-detail__info-des"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
