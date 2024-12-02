/* eslint-disable */

import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Badge, Drawer } from "antd";
import { logo } from "../../constants/images";
import { CommentOutlined } from "@ant-design/icons";
import { getItem, setRefreshToken, setToken } from "../../utils/storage";
function HeaderLayout() {
  const history = useHistory();
  const Token = localStorage.getItem("accessToken");
  const [open, setOpen] = useState(false);
  const user = getItem("user") ? JSON.parse(getItem("user")) : {};
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const SignOut = () => {
    setToken("");
    setRefreshToken("");
    history.push("/dang-nhap");
  };
  useEffect(() => {}, []);
  return (
    <>
      <header id="header" className="header header-sticky">
        <div className="header-wrapper">
          <div className="content">
            <nav className="main-menu">
              <div className="menu-left">
                <NavLink to="/">
                  <img alt="img" src={logo} />
                </NavLink>
                <ul className="menu-list">
                  <li className="menu-item">
                    <NavLink to="/diem-den">Điểm đến</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/tour">Tour HOT</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/hdv">Hướng dẫn viên</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/tin-tuc">Tin tức</NavLink>
                    {Token && (
                      <ul className="menu-sub">
                        <li className="menu-sub_item">
                          <NavLink to="/viet-bai">Viết bài</NavLink>
                        </li>
                        <li className="menu-sub_item">
                          <NavLink to="/tin-tuc">Danh sách bài viết</NavLink>
                        </li>
                      </ul>
                    )}
                  </li>
                  {/* <li className="menu-item">
                    <NavLink to="/gioi-thieu">Giới thiệu</NavLink>
                  </li> */}
                </ul>
              </div>
              <div className="menu-right">
                <div className="pc">
                  {Token ? (
                    <div className="your-trip">
                      <Link to="/chuyen-di"> Chuyến đi của bạn</Link>
                    </div>
                  ) : null}
                  {/* <div className="language">
                    <i className="fa-solid fa-globe"></i>
                  </div> */}
                  <div className="support">
                    <Link to={`/chat/10`}>
                      <Badge dot>
                        <CommentOutlined
                          style={{
                            fontSize: 30,
                          }}
                        />
                      </Badge>
                    </Link>
                  </div>

                  {Token ? (
                    <div className="header-user">
                      <img
                        src="https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="
                        alt="avt"
                      />
                      <ul className="list-info">
                        <li>
                          <div class="box-list-info">
                            <i class="fas fa-user"></i>
                            <Link to="/account">Cài đặt</Link>
                          </div>
                        </li>
                        <li>
                          {user.role == "TOURGUIDE" ? (
                            <div class="box-list-info">
                              <i class="fas fa-user"></i>
                              <Link to="/kenh-hdv">Kênh HDV</Link>
                            </div>
                          ) : null}
                        </li>
                        {user.role == "USER" && (
                          <li>
                            <div class="box-list-info">
                              <i class="fas fa-user"></i>
                              <Link to="/pay">Nạp tiền</Link>
                            </div>
                          </li>
                        )}

                        <li>
                          <div class="box-list-info">
                            <i class="fas fa-newspaper"></i>
                            <Link to="/me/posts">Bài viết của tôi</Link>
                          </div>
                        </li>
                        <li>
                          <div class="box-list-info" onClick={SignOut}>
                            <i class="fas fa-sign-out-alt"></i>
                            <Link to="#">Đăng xuất</Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="user-info">
                      <Link
                        to="/dang-nhap"
                        className="button button--primary pc"
                      >
                        Đăng nhập
                      </Link>
                      <Link to="/dang-nhap" className=" mb">
                        <i class="fa-regular fa-user"></i>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="menu-mb mb">
                  <i className="fa-solid fa-bars" onClick={showDrawer}></i>
                  <Drawer
                    title=""
                    placement="right"
                    onClose={onClose}
                    visible={open}
                  >
                    <ul className="menu-list-mb">
                      <li className="menu-item-mb">
                        <NavLink to="/">
                          <i class="fa-solid fa-house"></i> Home
                        </NavLink>
                      </li>
                      {Token && (
                        <li className="menu-item-mb">
                          <NavLink to="/chuyen-di">
                            <i class="fa-solid fa-user"></i>Chuyến đi của bạn
                          </NavLink>
                        </li>
                      )}
                      {/* <li className="menu-item-mb">
                        <NavLink to="/diem-den">
                          <i class="fa-solid fa-user"></i>Trang cá nhân
                        </NavLink>
                      </li> */}
                      <li className="menu-item-mb">
                        <NavLink to="/diem-den">
                          <i class="fa-solid fa-map-location-dot"></i>Điểm đến
                        </NavLink>
                      </li>
                      <li className="menu-item-mb">
                        <NavLink to="/tour">
                          <i class="fa-solid fa-mountain-city"></i>Tour HOT
                        </NavLink>
                      </li>
                      <li className="menu-item-mb">
                        <NavLink to="/hdv">
                          <i class="fa-solid fa-truck-plane"></i>Hướng dẫn viên
                        </NavLink>
                      </li>
                      <li className="menu-item-mb">
                        <NavLink to="/tin-tuc">
                          <i class="fa-solid fa-newspaper"></i>Tin tức
                        </NavLink>
                      </li>
                      {user.role == "USER" && (
                        <li className="menu-item-mb">
                          <NavLink to="/pay">
                            <i class="fa-solid fa-newspaper"></i>Nạp tiền
                          </NavLink>
                        </li>
                      )}

                      <li className="menu-item-mb">
                        <NavLink to="/me/posts">
                          <i class="fa-solid fa-newspaper"></i>Bài viết của tôi
                        </NavLink>
                      </li>
                      {/* <li className="menu-item-mb">
                        <NavLink to="/gioi-thieu">
                          <i class="fa-solid fa-layer-group"></i>Giới thiệu
                        </NavLink>
                      </li> */}
                      {Token ? (
                        <li className="menu-item-mb" onClick={SignOut}>
                          <NavLink to="#">
                            <i class="fa-solid fa-right-from-bracket"></i>Đăng
                            xuẩt
                          </NavLink>
                        </li>
                      ) : (
                        <li className="menu-item-mb">
                          <NavLink to="/dang-nhap">
                            <i class="fa-solid fa-user"></i>Đăng nhập
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </Drawer>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
export default HeaderLayout;
