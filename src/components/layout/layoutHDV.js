import { SettingOutlined, BellOutlined } from "@ant-design/icons";
import { Layout, Menu, Badge } from "antd";
import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { avt, logo } from "../../constants/images";
import "../../assets/css/layoutHDV.css";
import { CommentOutlined } from "@ant-design/icons";
import { setRefreshToken, setToken } from "../../utils/storage";

function LayoutHDV({ children }) {
  const { Header, Content, Sider } = Layout;
  const history = useHistory();
  const SignOut = () => {
    setToken("");
    setRefreshToken("");
    history.push("/dang-nhap");
  };
  return (
    <>
      <Layout className="hdv_wrapper">
        <Header className="header">
          <Link to="/kenh-hdv">
            <div className="logo">
              <img alt="" src={logo} />
              <p className="title">Kênh HDV</p>
            </div>
          </Link>
          <div className="menu-right">
            <div className="account-info" onClick={() => SignOut()}>
              <img alt="" src={avt} className="account-avatar" />
              <span className="account-name">Đăng xuất</span>
            </div>
            <Badge count={1}>
              <BellOutlined />
            </Badge>
          </div>
          <div className="support">
            <Link to={`/kenh-hdv/chat/10`}>
              <Badge dot>
                <CommentOutlined
                  style={{
                    fontSize: 30,
                  }}
                />
              </Badge>
            </Link>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultOpenKeys={["1", "3", "5", "4"]}
              style={{
                height: "100%",
                borderRight: 0,
              }}
              className="navbar-left"
            >
              <Menu.SubMenu title="Tour" icon={<SettingOutlined />} key="1">
                {window.location.pathname === "/kenh-hdv/ds-tour" ? (
                  <Menu.Item className="ant-menu-item-selected ">
                    <NavLink to="/kenh-hdv/ds-tour">Danh sách tour</NavLink>
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    <NavLink to="/kenh-hdv/ds-tour">Danh sách tour</NavLink>
                  </Menu.Item>
                )}
                {window.location.pathname === "/kenh-hdv/don-hang" ? (
                  <Menu.Item className="ant-menu-item-selected ">
                    <NavLink to="/kenh-hdv/don-hang">Danh sách đơn</NavLink>
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    <NavLink to="/kenh-hdv/don-hang">Danh sách đơn</NavLink>
                  </Menu.Item>
                )}
                {window.location.pathname === "/kenh-hdv/them-tour" ? (
                  <Menu.Item className="ant-menu-item-selected ">
                    <NavLink to="/kenh-hdv/them-tour">Tạo tour</NavLink>
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    <NavLink to="/kenh-hdv/them-tour">Tạo tour</NavLink>
                  </Menu.Item>
                )}
                {/* {window.location.pathname === "/kenh-hdv/danh-gia-tour" ? (
                  <Menu.Item className="ant-menu-item-selected ">
                    <NavLink to="/kenh-hdv/danh-gia-tour">
                      Đánh giá tour
                    </NavLink>
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    <NavLink to="/kenh-hdv/danh-gia-tour">
                      Đánh giá tour
                    </NavLink>
                  </Menu.Item>
                )} */}
                {window.location.pathname === "/kenh-hdv/yeu-cau-chuyen-di" ? (
                  <Menu.Item className="ant-menu-item-selected ">
                    <NavLink to="/kenh-hdv/yeu-cau-chuyen-di">
                      Yêu cầu chuyến đi
                    </NavLink>
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    <NavLink to="/kenh-hdv/yeu-cau-chuyen-di">
                      Yêu cầu chuyến đi
                    </NavLink>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
              {/* <Menu.SubMenu
                title="Kênh Marketing"
                icon={<SettingOutlined />}
                key="3"
              >
                {window.location.pathname === "/kenh-hdv/voucher" ? (
                  <Menu.Item className="ant-menu-item-selected ">
                    <NavLink to="/kenh-hdv/voucher">Voucher</NavLink>
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    <NavLink to="/kenh-hdv/voucher">Voucher</NavLink>
                  </Menu.Item>
                )}
                {window.location.pathname === "/kenh-hdv/create-voucher" ? (
              <Menu.Item className="ant-menu-item-selected ">
                <NavLink to="/kenh-hdv/create-voucher"> Thêm Voucher</NavLink>
              </Menu.Item>
            ) : (
              <Menu.Item>
                <NavLink to="/kenh-hdv/create-voucher"> ThêmVoucher</NavLink>
              </Menu.Item>
            )}
              </Menu.SubMenu> */}
              <Menu.SubMenu
                title="Tài chính"
                icon={<SettingOutlined />}
                key="4"
              >
                {window.location.pathname === "/kenh-hdv/doanh-thu" ? (
                  <Menu.Item className="ant-menu-item-selected ">
                    <NavLink to="/kenh-hdv/doanh-thu"> Doanh thu</NavLink>
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    <NavLink to="/kenh-hdv/doanh-thu"> Doanh thu</NavLink>
                  </Menu.Item>
                )}
                {window.location.pathname === "/kenh-hdv/thanh-toan" ? (
                  <Menu.Item className="ant-menu-item-selected ">
                    <NavLink to="/kenh-hdv/thanh-toan"> Nạp tiền</NavLink>
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    <NavLink to="/kenh-hdv/thanh-toan"> Nạp tiền</NavLink>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
              <Menu.SubMenu
                title="Phát triển"
                icon={<SettingOutlined />}
                key="5"
              >
                {window.location.pathname === "/kenh-hdv/setting" ? (
                  <Menu.Item className="ant-menu-item-selected ">
                    <NavLink to="/kenh-hdv/setting"> Thiết lập</NavLink>
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    <NavLink to="/kenh-hdv/setting"> Thiết lập</NavLink>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            </Menu>
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
export default LayoutHDV;
