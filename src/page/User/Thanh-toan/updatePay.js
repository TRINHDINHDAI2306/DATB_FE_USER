import React, { useEffect } from "react";
import axios from "axios";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
function UpdatePay() {
  const getParams = (url = window.location) => {
    let params = {};
    new URL(url).searchParams.forEach(function (val, key) {
      if (params[key] !== undefined) {
        if (!Array.isArray(params[key])) {
          params[key] = [params[key]];
        }
        params[key].push(val);
      } else {
        params[key] = val;
      }
    });
    return params;
  };
  useEffect(() => {
    let params = getParams();
    const getDetailOrder = async (id) => {
      let formdata = new FormData();
      formdata.append("orderId", id);
      const res = await axios.post(
        "http://localhost/learning-online/api/query_transaction.php",
        formdata
      );
      if (res?.data) {
        //success
        //đơn hàng thanh toán thành công
        if (res.data?.resultCode === 0) {
          //api update ở đây
        } else {
          //đơn hàng thất bại
        }
      }
    };
    if (params?.orderId) {
      getDetailOrder(params?.orderId);
    }
  }, []);
  return (
    <>
      <Result
        status="success"
        title="Thanh toán thành công"
        subTitle="Tài khoản của bạn sẽ được cập nhật trong vòng 2 giờ"
        extra={[
          <Link to="/">
            <Button type="primary" key="console">
              Về trang chủ
            </Button>
          </Link>,
          <Link to="/pay">
            <Button key="buy">Mua lại</Button>
          </Link>,
        ]}
      />
    </>
  );
}

export default UpdatePay;
