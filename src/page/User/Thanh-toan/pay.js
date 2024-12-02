/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../../../components/layout/layout";
import Condition from "../../../components/condition";
import PayHistory from "./history-pay";
import "../../../assets/css/pay.css";
import moment from "moment";
import {
  Form,
  Input,
  Modal,
  Button,
  Radio,
  Tabs,
  message,
  DatePicker,
} from "antd";
import { sendGet, sendPost } from "../../../utils/api";
import { note, vnpay } from "../../../constants/images";

export default function Pay() {
  const [coin, setCoin] = useState();
  const [amount, setAmount] = useState(0);

  const PayOnline = async (value) => {
    value.amount = parseInt(value.amount);
    value.fromWeb = true;
    const res = await sendPost("/users/deposit", value);
    if (res.statusCode == 200) {
      window.location.href = res.returnValue;
    } else {
      //đơn hàng thất bại
    }
  };
  const UserTransactions = async () => {
    const res = await sendGet("/auth/me");
    if (res.statusCode == 200) {
      setCoin(res?.returnValue?.availableBalance);
    }
  };
  const formatterPrice = new Intl.NumberFormat("vi-VN", {
    hour: "2-digit",
    minute: "numeric",
  });
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
      value: "5000000",
    },
  ];
  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };
  useEffect(() => {
    UserTransactions();
  }, []);
  return (
    <>
      <Layout>
        <div className="pay__wrapper">
          <div className="method-payment-component">
            <div className="pathway">
              <div className="content">
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
                    <strong>Thanh toán online</strong>
                  </li>
                </ul>
              </div>
            </div>
            <div className="payment-online">
              <div className="content">
                <h3 className="payment-online__title">Thông tin chi tiết</h3>
                <h3 className="payment-online__sub-title">
                  Bạn đang có {formatterPrice.format(coin)} VND
                </h3>
                <div className="payment-main">
                  <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Nạp tiền " key="1">
                      <div className="payment-online__inner">
                        <div className="payment-online__left">
                          <div className="order-payment">
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
                                    message:
                                      "Nhập số tiền bạn muốn thanh toán.",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Nhập số tiền bạn muốn thanh toán"
                                  onChange={(e) => setAmount(e.target.value)}
                                />
                              </Form.Item>
                              <Form.Item label="" name="amount">
                                <Radio.Group
                                  onChange={onChangeAmount}
                                  options={optionsWithDisabled}
                                  optionType="button"
                                  buttonStyle="solid"
                                />
                              </Form.Item>
                              <label class="trouble-warn__text">
                                <div>
                                  <img src={note} alt=".png" />
                                </div>{" "}
                                <p class="check-box__txt check-box__txt-payment">
                                  Nhấn vào "Thanh toán" đồng nghĩa với việc Quý
                                  khách đồng ý với
                                  <a href="#" class="check-box__link">
                                    điều khoản mua hàng và thanh toán của
                                    KTravel
                                  </a>
                                </p>
                              </label>
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
                              Tổng thanh toán
                            </h4>
                            <div className="method-payment">
                              <ul className="method-payment__list">
                                <li class="order-payment__item last">
                                  <span class="order-payment__name">
                                    Tổng tiền
                                  </span>{" "}
                                  <span class="order-payment__value">
                                    {formatterPrice.format(amount)} đ
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
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
                                            <input type="radio" name="radio" />
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
                    <Tabs.TabPane tab="Rút tiền" key="2">
                      <DrwarMoney coin={coin} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Giao dịch" key="3">
                      <PayHistory />
                    </Tabs.TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
const DrwarMoney = ({ coin }) => {
  const [amountDraw, setAmountDraw] = useState(0);
  const DrawOnline = async (value) => {
    value.amount = parseInt(value.amount);
    try {
      const res = await sendPost("/transactions/user-withdraw", value);
      if (res.statusCode == 200) {
        message.success("Tạo yêu cầu rút tiền thành công");
        await gethistoryDraw();
      } else {
        //đơn hàng thất bại
      }
    } catch (error) {
      message.success("Lỗi");
    }
  };
  const formatterPrice = new Intl.NumberFormat("vi-VN", {
    hour: "2-digit",
    minute: "numeric",
  });
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const optionsPayMoney = [
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
      value: "5000000",
    },
    {
      label: "Rút hết",
      value: coin,
    },
  ];
  const onChangeAmountDraw = (e) => {
    setAmountDraw(e.target.value);
  };

  return (
    <div className="payment-online__inner">
      <div className="payment-online__left">
        <div className="order-payment">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={DrawOnline}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Số tiền cần rút"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Nhập số tiền bạn muốn rút.",
                },
              ]}
            >
              <Input
                placeholder="Nhập số tiền bạn muốn rút"
                onChange={(e) => setAmountDraw(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="" name="amount">
              <Radio.Group
                onChange={onChangeAmountDraw}
                options={optionsPayMoney}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <label class="trouble-warn__text">
              <div>
                <img src={note} alt=".png" />
              </div>{" "}
              <p class="check-box__txt check-box__txt-payment">
                Nhấn vào "Rút tiền" đồng nghĩa với việc Quý khách đồng ý với
                <a href="#" class="check-box__link">
                  điều khoản mua hàng và thanh toán của KTravel
                </a>
              </p>
            </label>
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
                Rút tiền
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="payment-online__right">
        <div className="payment-online__row">
          <h4 className="payment-online__sub">Tổng thanh toán</h4>
          <div className="method-payment">
            <ul className="method-payment__list">
              <li class="order-payment__item last">
                <span class="order-payment__name">Tổng tiền</span>{" "}
                <span class="order-payment__value">
                  {formatterPrice.format(amountDraw)} đ
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
