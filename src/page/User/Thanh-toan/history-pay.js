/* eslint-disable */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/layout";
import "../../../assets/css/pay.css";
import { sendGet, sendPost } from "../../../utils/api";
import { vnpay, vnpayv2 } from "../../../constants/images";
import { Skeleton, DatePicker } from "antd";
import moment from "moment";

export default function PayHistory() {
  const { RangePicker } = DatePicker;
  const [startDate, setStartDate] = useState(
    moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const dateFormat = "YYYY-MM-DD";
  const [history, seyHistory] = useState([]);
  const historyPayOnline = async () => {
    const res = await sendGet("/users/transaction", {
      startDate: startDate,
      endDate: endDate,
    });
    if (res.statusCode == 200) {
      seyHistory(res?.returnValue?.data);
    } else {
      //đơn hàng thất bại
    }
  };
  const changeDate = (date, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
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
  useEffect(() => {
    historyPayOnline();
  }, []);
  // if (!Object.keys(history).length) return <Skeleton />;
  return (
    <>
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
          <h4 className="search-title">Kết quả tìm kiếm ({history.length})</h4>
          <ul class="Result-request__list">
            {history &&
              history.length > 0 &&
              history.map((item, index) => (
                <li className="Result-request__item" key={index}>
                  <div className="box-request__top">
                    <div className="code-request">
                      <p className="code-request__name">
                        Mã yêu cầu:{" "}
                        <span className="code-request__name name-highlight">
                          {item?.id}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="box-request__body">
                    <p className="box-request__title">
                      {item?.type == "WITHDRAW" ? "Rút tiền" : "Nạp tiền"}
                    </p>
                    <p class="box-request__des">
                      Số tiền giao dịch:{" "}
                      <span className="code-request__name name-highlight">
                        {formatterPrice.format(item?.amount)} đ
                      </span>
                    </p>
                  </div>{" "}
                  <div className="box-request__bottom">
                    {item?.status == 1 ? (
                      <div
                        className="request-bottom__detail"
                        style={{ color: "#51bb4c" }}
                      >
                        <i class="fa-solid fa-circle-check"></i>
                        <p className="request-bottom__name">Đã thanh toán</p>
                      </div>
                    ) : item?.status == 0 ? (
                      <div
                        className="request-bottom__detail"
                        style={{ color: "#dc1b1b" }}
                      >
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <p className="request-bottom__name">Thất bại</p>
                      </div>
                    ) : (
                      <div
                        className="request-bottom__detail"
                        style={{ color: "#fe7d05" }}
                      >
                        <i class="fa-solid fa-rotate-right"></i>
                        <p className="request-bottom__name">Đang thực hiện</p>
                      </div>
                    )}{" "}
                    <div className="request-bottom__time">
                      <i class="fa-regular fa-clock"></i>
                      <p className="request-bottom__datetime">
                        {" "}
                        {formatterTime.format(Date.parse(item?.time))}{" "}
                        {formatterDate.format(Date.parse(item?.time))}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </div>
    </>
  );
}
