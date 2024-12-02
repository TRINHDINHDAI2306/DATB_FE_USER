import { Steps } from "antd";
import React from "react";
const { Step } = Steps;
const description = "This is a description.";
const Process = () => (
  <Steps current={4} status="error">
    <Step title="Gửi yêu cầu" description={description} />
    <Step title="Chờ xác nhận" description={description} />
    <Step title="Chuyến đi đã thanh toán" description={description} />
    <Step title="Đã đi" description={description} />
    <Step title="Đánh giá" description={description} />
  </Steps>
);
export default Process;
