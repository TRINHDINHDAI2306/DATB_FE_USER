/* eslint-disable */
import React, { useEffect, useState } from "react";
import PayHistory from "./history-pay";
import { Form, Input, Button, Radio, Tabs } from "antd";
import { sendGet, sendPost } from "../../../utils/api";
import { vnpay } from "../../../constants/images";
import LayoutHDV from "../../../components/layout/layoutHDV";

export default function Pay() {
  const [coin, setCoin] = useState();

  const PayOnline = async (value) => {
    value.amount = parseInt(value.amount);
    value.fromWeb = true;
    const res = await sendPost("/tour-guide/deposit", value);
    if (res.statusCode == 200) {
      window.location.href = res.returnValue;
    } else {
      //đơn hàng thất bại
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const optionsWithDisabled = [
    {
      label: "100.000đ",
      value: "100000",
    },
    {
      label: "500.000đ",
      value: "500000",
    },
    {
      label: "1.000.000đ",
      value: "1000000",
    },
    {
      label: "2.000.000đ",
      value: "2000000",
    },
    {
      label: "3.000.000đ",
      value: "3000000",
    },
    {
      label: "5.000.000đ",
      value: coin,
    },
  ];
  const HdvTransactions = async () => {
    const res = await sendGet("/auth/me");
    if (res.statusCode == 200) {
      setCoin(res?.returnValue?.availableBalance);
    }
  };
  const formatterPrice = new Intl.NumberFormat("vi-VN", {
    hour: "2-digit",
    minute: "numeric",
  });
  useEffect(() => {
    HdvTransactions();
  }, []);
  return (
    <>
      <LayoutHDV>
        <div className="pay__wrapper">
          <div className="method-payment-component">
            <div className="payment-online">
              <div className="content">
                <h3 className="payment-online__title">Nạp tiền</h3>
                <h4 className="payment-online__sub-title">
                  Tổng số tiền bạn đang có: {formatterPrice.format(coin)} VND
                </h4>
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="Nạp tiền " key="1">
                    <div className="payment-online__inner">
                      <div className="payment-online__left">
                        <div className="order-payment">
                          <h4 className="order-payment__title">
                            Thông tin chi tiết
                          </h4>

                          <Form
                            name="basic"
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={PayOnline}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <Form.Item
                              label="Số tiền thanh toán"
                              name="amount"
                              rules={[
                                {
                                  required: true,
                                  message: "Nhập số tiền bạn muốn thanh toán.",
                                },
                              ]}
                            >
                              <Input placeholder="Nhập số tiền bạn muốn thanh toán" />
                            </Form.Item>
                            <Form.Item label="" name="amount">
                              <Radio.Group
                                options={optionsWithDisabled}
                                optionType="button"
                                buttonStyle="solid"
                              />
                            </Form.Item>

                            <Form.Item
                              wrapperCol={{
                                offset: 8,
                                span: 16,
                              }}
                            >
                              <Button
                                type="primary"
                                htmlType="submit"
                                className="button button--primary"
                              >
                                Thanh toán
                              </Button>
                            </Form.Item>
                          </Form>
                        </div>
                      </div>
                      <div className="payment-online__right">
                        <div className="payment-online__row">
                          <h4 className="payment-online__sub">
                            Phương thức thanh toán*
                          </h4>
                          <div className="method-payment">
                            <ul className="method-payment__list">
                              <li className="method-payment__item">
                                <div className="method-payment__left">
                                  <span className="method-payment__icon">
                                    <img src={vnpay} width="30" height="30" />
                                  </span>
                                  <div className="method-payment__detail">
                                    <div className="method-payment__info">
                                      <div className="method-payment__top js-toggle">
                                        <h5 className="method-payment__name">
                                          VNPay: ATM/VISA
                                        </h5>
                                      </div>
                                      <div className="method-payment__choose">
                                        <label className="radio-custom1">
                                          <input
                                            type="radio"
                                            name="radio"
                                            checked
                                          />
                                          <span className="checkmark"></span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Tra cứu" key="2">
                    <PayHistory />
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </LayoutHDV>
    </>
  );
}
