/* eslint-disable */
import React, { useEffect, useState } from "react";
import LayoutHDV from "../../../components/layout/layoutHDV";
import "./style.css";
import { Button, Switch, Tabs } from "antd";
export default function Setting() {
  useEffect(() => {}, []);
  const [active, setActive] = useState(false);
  const onChange = (checked) => {
    setActive(checked);
  };
  return (
    <>
      <LayoutHDV>
        <div className="setting-main">
          <div class="header-setting">
            <div class="landing-page-title">Thiết Lập</div>
            <div class="desc">Thay đổi các cài đặt cho bạn.</div>
          </div>
          <Tabs>
            <Tabs.TabPane tab="Thiết lập cơ bản" key="item-1">
              <div className="content_tab">
                <div className={active ? "tab-left active" : "tab-left"}>
                  <i class="fa-regular fa-moon"></i>
                  <div className="tab_info">
                    <p className="tab-title">Chế độ Tạm nghỉ</p>
                    <p className="tab_des">
                      Kích hoạt Chế độ Tạm nghỉ để ngăn du khách tạo yêu cầu
                      chuyến đi mới. Những chuyến đi đang tiến hành vẫn phải
                      được xử lý.
                    </p>
                  </div>
                </div>
                <div className="tab_right">
                  <Switch defaultChecked onChange={onChange} />
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Cài đặt thông báo" key="item-2">
              <div className="content_tab">
                <div className="tab-left">
                  <i class="fa-regular fa-envelope"></i>
                  <div className="tab_info">
                    <p className="tab-title">Thông báo Email</p>
                    <p className="tab_des">
                      Kiểm soát việc KTRAVEL gửi email đến bạn
                    </p>
                  </div>
                </div>
                <div className="tab_right">
                  {/* ấn vào ẩn hiện nội dung bên dưới */}
                  <Button>Bỏ Email</Button>
                </div>
              </div>
              <div className="content_sub">
                <SubItem text="Cập nhật đơn hàng" />
                <SubItem text="Tin tức mới" />
                <SubItem text="Tour du lịch" />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </LayoutHDV>
    </>
  );
}
const SubItem = ({ text }) => {
  const [active, setActive] = useState(true);
  const onChange = (checked) => {
    setActive(checked);
  };
  return (
    <>
      <div className="sub_item">
        <div className={active ? "tab-left active" : "tab-left"}>
          <i class="fa-regular fa-moon"></i>
          <div className="tab_info">
            <p className="tab-title">{text}</p>
          </div>
        </div>
        <div className="tab_right">
          <Switch defaultChecked onChange={onChange} />
        </div>
      </div>
    </>
  );
};
