/* eslint-disable */
import React, { useEffect, useState } from "react";
import "../../assets/css/homehdv.css";
import { Tabs } from "antd";

import LayoutHDV from "../../components/layout/layoutHDV";
import { sendGet } from "../../utils/api";
export default function MyPage() {
  const [request, setRequest] = useState();
  const [deposit, setDeposit] = useState();
  const [waitPay, setWaitPay] = useState();
  const [unfulfilled, setUnfulfilled] = useState();
  const [progress, setProgress] = useState();
  const [made, setMade] = useState();
  const [cancel, setCancel] = useState();

  const listOrder = async () => {
    const res = await sendGet("/orders/tourguide", {
      type: "all",
      limit: 100,
    });
    if (res.statusCode === 200) {
      setRequest(res.returnValue?.filter((item) => item.status == 0));
      setDeposit(res.returnValue?.filter((item) => item.status == 1));
      setWaitPay(res.returnValue?.filter((item) => item.status == 2));
      setUnfulfilled(res.returnValue?.filter((item) => item.status == 3));
      setProgress(res.returnValue?.filter((item) => item.status == 4));
      setMade(res.returnValue?.filter((item) => item.status == 5));
      setCancel(res.returnValue?.filter((item) => item.status == 6));
    } else {
      message.error("Thất bại");
    }
  };

  useEffect(() => {
    listOrder();
  }, []);
  return (
    <>
      <LayoutHDV>
        <div class="card card-offset">
          <div class="landing-page-title">
            Danh sách cần làm
            <p class="card-tips">Những việc bạn sẽ phải làm</p>
          </div>
          <div class="async-data-wrapper">
            <div class="status">
              <div
                class="to-do-box"
                style={{ minHeight: "154px", overflow: "hidden" }}
              >
                <a href="#" class="to-do-box-aitem">
                  <p class="item-title">
                    {request?.length >= 0 ? request?.length : "0"}
                  </p>
                  <p class="item-desc">Chờ Xác Nhận</p>
                </a>

                <a href="" class="to-do-box-aitem">
                  <p class="item-title">
                    {deposit?.length >= 0 ? deposit?.length : "0"}
                  </p>
                  <p class="item-desc">Chờ đặt cọc</p>
                </a>
                <a href="" class="to-do-box-aitem">
                  <p class="item-title">
                    {waitPay?.length >= 0 ? waitPay?.length : "0"}
                  </p>
                  <p class="item-desc">Chờ thanh toán</p>
                </a>
                <a href="" class="to-do-box-aitem">
                  <p class="item-title">
                    {unfulfilled?.length >= 0 ? unfulfilled?.length : "0"}
                  </p>
                  <p class="item-desc">Chưa thực hiện</p>
                </a>
                <a href="" class="to-do-box-aitem">
                  <p class="item-title">
                    {progress?.length >= 0 ? progress?.length : "0"}
                  </p>
                  <p class="item-desc">Đang thực hiện</p>
                </a>
                <a href="" class="to-do-box-aitem">
                  <p class="item-title">
                    {made?.length >= 0 ? made?.length : "0"}
                  </p>
                  <p class="item-desc">Đã hoàn thành</p>
                </a>
                <a href="" class="to-do-box-aitem">
                  <p class="item-title">
                    {cancel?.length >= 0 ? cancel?.length : "0"}
                  </p>
                  <p class="item-desc">Đã hủy</p>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div class="card">
          <div class="title-box">
            <div class="landing-page-sub-title">
              Điểm Sao Quả Tạ
              <span class="title-tip">
                (Từ 2 Tháng 1 2023 đến 2 Tháng 4 2023)
              </span>
              <p class="card-tips">
                Hệ thống Sao Quả Tạ giúp HDV duy trì dịch vụ chất lượng, mang
                đến sự hài lòng cho du khách.
              </p>
            </div>
            <button
              type="button"
              class="shopee-button shopee-button--link shopee-button--normal"
            >
              <span>Xem thêm</span>
              <i class="shopee-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path d="M9.18933983,8 L5.21966991,11.9696699 C4.9267767,12.2625631 4.9267767,12.7374369 5.21966991,13.0303301 C5.51256313,13.3232233 5.98743687,13.3232233 6.28033009,13.0303301 L10.7803301,8.53033009 C11.0732233,8.23743687 11.0732233,7.76256313 10.7803301,7.46966991 L6.28033009,2.96966991 C5.98743687,2.6767767 5.51256313,2.6767767 5.21966991,2.96966991 C4.9267767,3.26256313 4.9267767,3.73743687 5.21966991,4.03033009 L9.18933983,8 Z"></path>
                </svg>
              </i>
            </button>
          </div>
          <div class="async-data-wrapper">
            <div class="status">
              <div class="doughnut">
                <div class="container chart">
                  <div class="content1">
                    <p class="num" style={{ color: " rgb(85, 204, 119)" }}>
                      0
                    </p>
                    <p class="desc" style={{ color: " rgb(85, 204, 119)" }}>
                      điểm
                    </p>
                  </div>
                </div>
                <div class="content2">
                  Bạn đang hoạt động rất hiệu quả, hãy giữ vững kết quả này để
                  khách hàng thêm vững lòng tin bạn nhé!
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </LayoutHDV>
    </>
  );
}
