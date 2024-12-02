/* eslint-disable */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/layout";
import "../../../assets/css/pay.css";
import { sendGet, sendPost } from "../../../utils/api";
import { vnpay, vnpayv2 } from "../../../constants/images";
import { Skeleton, DatePicker } from "antd";
import moment from "moment";

export default function PayHistory() {
  const [startDate, setStartDate] = useState(
    moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [history, seyHistory] = useState([]);
  const dateFormat = "YYYY-MM-DD";
  const changeDate = (date, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };
  const historyPay = async () => {
    const res = await sendGet("/tour-guide/transaction", {
      startDate: moment()
        .subtract(1, "months")
        .startOf("month")
        .format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    });
    if (res.statusCode == 200) {
      seyHistory(res?.returnValue?.data);
    } else {
      //đơn hàng thất bại
    }
  };
  const historyPayOnline = async () => {
    const res = await sendGet("/tour-guide/transaction", {
      startDate: startDate,
      endDate: endDate,
    });
    if (res.statusCode == 200) {
      seyHistory(res?.returnValue?.data);
    } else {
      //đơn hàng thất bại
    }
  };
  const formatterDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formatterTime = new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "numeric",
  });
  const formatterPrice = new Intl.NumberFormat("vi-VN", {
    hour: "2-digit",
    minute: "numeric",
  });
  const { RangePicker } = DatePicker;
  useEffect(() => {
    historyPay();
  }, []);
  return (
    <>
      {history ? (
        <div className="pay__wrapper">
          <div className="pay-search">
            <RangePicker
              defaultValue={[
                moment().subtract(1, "months").startOf("month"),
                moment(),
              ]}
              format={dateFormat}
              onChange={changeDate}
            />
            <div
              className="btn-pay-search button button--primary"
              onClick={() => historyPayOnline()}
            >
              Tìm kiếm
            </div>
          </div>
          <li class="History-list__info-year">
            <h4 className="search-title">Kết quả tìm kiếm </h4>
            <ul class="History-list__info">
              {history.map((item, index) => (
                <li class="History-item__info">
                  <div class="History-images">
                    <img src={vnpay} alt="" />
                  </div>
                  <div class="History-des">
                    <div class="History-des__title_group">
                      <h4 class="History-des__title">
                        {item?.type == "WITHDRAW"
                          ? "Rút tiền"
                          : item?.type == "DEPOSIT"
                          ? "Nạp tiền"
                          : "Đang xử lý"}
                      </h4>
                      <div class="History-des__sub-price">
                        <p>{formatterPrice.format(item?.amount)}đ</p>
                      </div>
                    </div>
                    <div className="History-des__sub-bottom">
                      <p>
                        {item?.status == 1
                          ? "Hoàn tất"
                          : item?.status == 2
                          ? "Đang xử lý"
                          : "Thất bại"}
                      </p>
                      <div class="History-des__sub-title">
                        <div class="History-des__sub-date_time">
                          <p>
                            {formatterTime.format(Date.parse(item?.createdAt))}
                          </p>
                        </div>
                        <div class="History-des__sub-date_time">
                          <p>
                            {formatterDate.format(Date.parse(item?.createdAt))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </div>
      ) : (
        <Skeleton />
      )}
    </>
  );
}
