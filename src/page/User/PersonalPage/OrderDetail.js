/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Modal, Popconfirm, Steps } from "antd";
import "../../../assets/css/trip.css";
import { sendGet, sendPut } from "../../../utils/api";
import { message } from "antd";
import { Link } from "react-router-dom";
import { avt, banner } from "../../../constants/images";
export default function OrderDetail({
  dataDetail,
  handleStep,
  tourWaitting,
  tourProcessing,
  waiting_purchase,
  tourEnd,
}) {
  const [data, setData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orderDetail = async () => {
    const result = await sendGet(`/orders/user/${dataDetail}`);
    if (result.statusCode == 200) {
      setData(result.returnValue);
    } else {
      message.error("thất bại");
    }
  };
  const { Step } = Steps;
  const prePaid = async (e) => {
    try {
      let res = await sendPut(`/orders/prepaid`, {
        orderId: e,
      });
      if (res.statusCode == 200) {
        message.success("Thanh toán thành công");
        await tourProcessing();
        handleStep();
      } else {
        message.error("thất bại");
      }
    } catch (error) {
      message.error("Số dư ko đủ");
    }
  };
  const paid = async (e) => {
    try {
      let res = await sendPut(`/orders/paid`, {
        orderId: e.id,
        amount: parseInt(e.price - e.paid),
      });
      if (res.statusCode == 200) {
        message.success("Thanh toán thành công");
        await tourProcessing();
        handleStep();
      } else {
        message.error("thất bại");
      }
    } catch (error) {
      message.error("Số dư ko đủ");
    }
  };
  const formatterPrice = new Intl.NumberFormat("vi-VN", {
    hour: "2-digit",
    minute: "numeric",
  });
  useEffect(() => {
    orderDetail();
  }, []);
  return (
    <>
      <div className="order-detail">
        <div class="cBtCqV">
          <div class="yO9lYJ">
            <span onClick={() => handleStep()}>
              <i class="fa-solid fa-chevron-left"></i> TRỞ LẠI
            </span>
          </div>
          <div>
            <span>MÃ TOUR. {data?.id}</span>
            <span class="EkDKzu">|</span>
          </div>
        </div>
        <div className="process">
          {/* sttus = 0: chờ xác nhận
          1: chờ đặt cọc
          2: chờ thanh toán:
          3: chưa thực hiện
          4: đang thực hiện
          5: đã thực hiện
          6: đã hủy
          */}
          <Steps
            current={
              data.status == 0
                ? 0
                : data.status == 1
                ? 1
                : data.status == 2
                ? 2
                : data.status == 3
                ? 3
                : data.status == 4
                ? 4
                : data.status == 5
                ? 5
                : data.status == 6
                ? 6
                : 6
            }
            status={data.status == 5 ? "error" : "process"}
          >
            <Step title="Chờ xác nhận" />
            <Step title="Chờ đặt cọc" />
            <Step title="Chờ thanh toán" />
            <Step title="Chưa thực hiện" description={data?.startDate} />
            <Step title="Đang thực hiện" />
            <Step title="Đã đi" />
            <Step title="Đã hủy" />
          </Steps>
        </div>
        <p className="process-note">
          Trạng thái chuyến đi:
          <span>
            {data.status == 0
              ? "Chờ HDV xác nhận"
              : data.status == 1
              ? "Chờ đặt cọc"
              : data.status == 2
              ? "Chờ thanh toán"
              : data.status == 3
              ? "Chưa thực hiện"
              : data.status == 4
              ? "Đang thực hiện"
              : data.status == 5
              ? "Đã thực hiện"
              : "Đã hủy"}
          </span>
        </p>
        <div>
          {data.status == 5 ? (
            <div class="evyOM">
              <div class="ICo-FQ">
                <div class="-evyOM">
                  Bạn đã hoàn thành chuyến đi này vào ngày
                  <div
                    class="stardust-popover b6+tp4"
                    id="stardust-popover3"
                    tabindex="0"
                  >
                    <div role="button" class="stardust-popover__target">
                      <div>
                        <u>{data?.endDate}</u>
                      </div>
                    </div>
                  </div>
                  .
                </div>
                <div class="_5roFKV">
                  <button class="stardust-button stardust-button--primary WgYvse">
                    Đi lại
                  </button>
                </div>
              </div>
            </div>
          ) : data.status == 4 ? (
            <div class="evyOM">
              <div class="ICo-FQ">
                <div class="-evyOM">
                  Kêt thúc chuyến đi
                  <div
                    class="stardust-popover b6+tp4"
                    id="stardust-popover3"
                    tabindex="0"
                  >
                    <div role="button" class="stardust-popover__target">
                      <div>
                        <u>{data?.endDate}</u>
                      </div>
                    </div>
                  </div>
                  .
                </div>
              </div>
            </div>
          ) : data.status == 3 ? (
            <div class="evyOM">
              <div class="ICo-FQ">
                <div class="-evyOM">
                  Chuyến đi bắt đầu vào ngày
                  <div
                    class="stardust-popover b6+tp4"
                    id="stardust-popover3"
                    tabindex="0"
                  >
                    <div role="button" class="stardust-popover__target">
                      <div>
                        <u>{data?.startDate}</u>
                      </div>
                    </div>
                  </div>
                  .
                </div>
              </div>
            </div>
          ) : data.status == 2 ? (
            <div class="evyOM">
              <div class="ICo-FQ">
                <div class="-evyOM">
                  <div
                    class="stardust-popover b6+tp4"
                    id="stardust-popover3"
                    tabindex="0"
                  >
                    <p className="stardust1">
                      Số tiền đã thanh toán:{" "}
                      <span>{formatterPrice.format(data.paid)} đ </span>
                    </p>
                    <p className="stardust1">
                      Số tiền còn lại:{" "}
                      <span>
                        {formatterPrice.format(data.price - data.paid)} đ
                      </span>
                    </p>
                    <div role="button" class="stardust-popover__target">
                      <div>
                        Ngày bắt đầu:
                        <u>
                          <span>{data?.startDate} </span>
                        </u>
                      </div>
                    </div>
                  </div>
                  .
                </div>
                <div class="_5roFKV">
                  <div
                    className="button button--primary"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Thanh toán ngay
                  </div>
                  <Modal
                    title=""
                    open={isModalOpen}
                    visible={isModalOpen}
                    footer={null}
                    centered
                    onCancel={() => setIsModalOpen(false)}
                  >
                    <h3 className="modal-title">Xác nhận thanh toán</h3>
                    <p className="modal-des">
                      Bạn sẽ thanh toán số tiền chuyến đi này cho hệ thống, để
                      đảm bảo chuyến đi diễn ra một cách hoàn hảo.
                      <span
                        style={{
                          color: "#1c50bc",
                          fontWeight: "600",
                        }}
                      >
                        Thanh toán ngay
                      </span>{" "}
                    </p>
                    <div className="modal-btn">
                      <div
                        className="button button--primary"
                        onClick={() => paid(data)}
                      >
                        Thanh toán ngay
                      </div>
                      <div
                        className="button button--normal"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Hủy
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          ) : data.status == 1 ? (
            <div class="evyOM">
              <div class="ICo-FQ">
                <div class="-evyOM">
                  Đặt cọc (10% giá trị đơn hàng)
                  <div
                    class="stardust-popover b6+tp4"
                    id="stardust-popover3"
                    tabindex="0"
                  >
                    <div role="button" class="stardust-popover__target">
                      <div>
                        Số tiền cần đặt cọc
                        <u className="price">
                          {formatterPrice.format(data?.price * 0.1)} đ
                        </u>
                      </div>
                    </div>
                  </div>
                  .
                </div>
                <div class="_5roFKV">
                  <div
                    className="button button--primary"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Đặt cọc ngay
                  </div>
                  <Modal
                    title=""
                    open={isModalOpen}
                    visible={isModalOpen}
                    footer={null}
                    centered
                    onCancel={() => setIsModalOpen(false)}
                  >
                    <h3 className="modal-title">Xác nhận thanh toán</h3>
                    <p className="modal-des">
                      Bạn sẽ đặt cọc trước 10% giá trị chuyến đi để đảm bảo
                      chuyến đi diễn ra một cách hoàn hảo.
                      <span
                        style={{
                          color: "#1c50bc",
                          fontWeight: "600",
                        }}
                      >
                        Đặt cọc ngay
                      </span>{" "}
                    </p>
                    <div className="modal-btn">
                      <div
                        className="button button--primary"
                        onClick={() => prePaid(data.id)}
                      >
                        Đặt cọc ngay
                      </div>
                      <div
                        className="button button--normal"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Hủy
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="process-content">
          <div className="mytrip-order-item">
            <div className="mytrip-order__header">
              <div className="mytrip-order__header-left">
                <p className="mytrip-order__name">{data?.name}</p>
                <Link to={`/chat/${data?.tourGuide?.id}`}>
                  <div className="mytrip-order__chat">
                    <i className="fa-regular fa-comments"></i>
                    <p className="mytrip-order__contact">Chat</p>
                  </div>
                </Link>
                <Link to={`/trang-ca-nhan/${data?.tourGuide?.id}`}>
                  <p className="mytrip-order__hdv">
                    <i class="fa-solid fa-user-check"></i> Xem HDV
                  </p>
                </Link>
              </div>
            </div>
            <div className="mytrip-order__main">
              <Link to={`tour/${data?.tour?.id}`}>
                <div className="mytrip-order__main-left">
                  <img
                    className="mytrip-order-img"
                    alt=""
                    src={
                      data?.tour?.images[0].url
                        ? data?.tour?.images[0].url
                        : banner
                    }
                  />
                  <div className="info-group">
                    <h4 className="mytrip-order-name">{data?.tour?.name}</h4>
                    <h4 className="mytrip-order-time">{data?.startDate}</h4>
                  </div>
                </div>
              </Link>
              <div className="mytrip-order__main-right">
                <p className="mytrip-order__main-price">
                  {formatterPrice.format(data?.tour?.basePrice)}đ
                </p>
              </div>
            </div>
          </div>
          <div class="RZJjTX">
            <div class="TokOv1">
              <div class="_8kMYJ3">
                <span>Phí tour</span>
              </div>
              <div class="CxyZBG">
                <div>₫{formatterPrice.format(data?.tour?.basePrice)}</div>
              </div>
            </div>
            <div class="TokOv1">
              <div class="_8kMYJ3">
                <span>Phí phụ thu</span>
              </div>
              <div class="CxyZBG">
                <div>₫{formatterPrice.format(data?.tour?.feePerMember)}</div>
              </div>
            </div>
            <div class="TokOv1">
              <div class="_8kMYJ3">
                <span>Số lượng</span>
                <div
                  class="stardust-popover W97Kqg"
                  id="stardust-popover5"
                  tabindex="0"
                >
                  <div role="button" class="stardust-popover__target">
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="CxyZBG">
                <div>{data?.size}</div>
              </div>
            </div>
            <div class="TokOv1 a59vwO">
              <div class="_8kMYJ3 B6pCRN">
                <span>Thành tiền</span>
              </div>
              <div class="CxyZBG">
                <div class="_8ZGgbl">₫{formatterPrice.format(data?.price)}</div>
              </div>
            </div>
          </div>
          <div className="note-process">
            <div className="panel-body content-tour-item content-tour-tab-tour-rule-2 active">
              <p>
                <meta charSet="utf-8" />
              </p>
              <h3 dir="ltr" style={{ textAlign: "center" }}>
                <span style={{ color: "#B22222" }}>
                  <u>
                    <div style={{ marginTop: 5 }}>
                      <strong>QUY TRÌNH ĐĂNG KÝ TOUR</strong>
                    </div>
                  </u>
                </span>
              </h3>
              <ul dir="ltr">
                <li role="presentation" style={{ textAlign: "justify" }}>
                  <strong>Đợt 01:</strong> Quý khách thanh toán 10% giá trị của
                  tour ngay khi đăng ký mua tour.
                </li>
                <li role="presentation" style={{ textAlign: "justify" }}>
                  <strong>Đợt 02:</strong> Quý khách thanh toán 30% giá trị của
                  tour trước lịch khởi hành 07&nbsp;ngày.
                </li>
              </ul>
              <p dir="ltr" style={{ textAlign: "justify" }}>
                <u>
                  <strong>*Lưu ý:</strong>
                </u>
                Đối với những tour quý khách đăng ký sát lịch khởi hành từ
                03&nbsp;cho đến 07&nbsp;ngày, quý khách vui lòng liên hệ
                <span style={{ color: "#FF0000" }}>1900 3398</span>
                để xác nhận số chỗ còn lại và&nbsp;thanh toán 100% giá trị của
                tour.
              </p>
              <h3 dir="ltr" style={{ textAlign: "center" }}>
                <span style={{ color: "#B22222" }}>
                  <u>
                    <strong>ĐIỀU KIỆN HỦY TOUR</strong>
                  </u>
                </span>
              </h3>
              <p dir="ltr" style={{ textAlign: "justify" }}>
                <u>
                  <em>
                    <strong>Trường hợp hủy bỏ dịch vụ từ Ktravel:</strong>
                  </em>
                </u>
              </p>
              <p dir="ltr" style={{ textAlign: "justify" }}>
                Nếu <strong>Ktravel</strong> không thực hiện được chuyến du
                lịch/ dịch vụ, công ty phải báo ngay cho khách hàng biết và
                thanh toán lại cho khách hàng toàn bộ số tiền mà khách hàng đã
                đóng trong vòng 3 ngày kể từ lúc chính thức thông báo hủy chuyến
                đi/ dịch vụ du lịch bằng hình thức tiền mặt hoặc chuyển khoản.
              </p>
              <p dir="ltr" style={{ textAlign: "justify" }}>
                <em>
                  <strong>
                    <u>Trường hợp hủy bỏ dịch vụ từ Quý khách hàng:</u>
                  </strong>
                </em>
              </p>
              <p dir="ltr" style={{ textAlign: "justify" }}>
                Trong trường hợp không thể tiếp tục sử dụng dịch vụ/ tour, Quý
                khách phải thông báo cho Công ty bằng văn bản hoặc email (Không
                giải quyết các trường hợp liên hệ chuyển/ hủy tour qua điện
                thoại). Đồng thời Quý khách vui lòng mang Biên bản đăng ký tour/
                dịch vụ &amp; biên lai đóng tiền đến văn phòng Vietnam Booking
                để làm thủ tục hủy/ chuyển tour.
              </p>
              <ul dir="ltr">
                <li style={{ textAlign: "justify" }}>
                  Các trường hợp chuyển/ đổi dịch vụ/ tour: Cty sẽ căn cứ xem
                  xét tình hình thực tế để tính phí và có mức hỗ trợ Quý khách
                  hàng
                </li>
                <li style={{ textAlign: "justify" }}>
                  Trường hợp hủy dịch vụ/ tour: Quý khách phải chịu chi phí hủy
                  tour/ dịch vụ theo quy định của Ktravel và toàn bộ phí ngân
                  hàng cho việc thanh toán trực tuyến.
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <strong>Phí hủy được quy định như sau:</strong>
              </p>
              <ul>
                <li>
                  Ngay sau khi đặt cọc hoặc thanh toán hoặc trước 10 ngày: phí
                  hủy 30% tiền tour.
                </li>
                <li>Hủy 7 ngày trước ngày khởi hành: phí hủy 50% tiền tour.</li>
                <li>Hủy 3 ngày trước ngày khởi hành: phí hủy 85% tiền tour</li>
                <li>
                  Hủy 05 ngày trước ngày khởi hành: phí hủy 100% tiền tour
                </li>
                <li>
                  Trường hợp quý khách đến trễ giờ khởi hành được tính là hủy
                  05&nbsp;ngày trước ngày khởi hành.
                </li>
                <li>Giai đoạn Lễ/Tết: không hoàn, không hủy, không đổi.</li>
              </ul>
              <p>
                Việc huỷ bỏ chuyến đi phải được thông báo trực tiếp với Công ty
                hoặc qua fax, email, tin nhắn và phải được Công ty xác nhận.
                Việc huỷ bỏ bằng điện thoại không được chấp nhận.
              </p>
              <p>
                Các ngày đặt cọc, thanh toán, huỷ và dời tour: không tính thứ
                07, Chủ Nhật.
              </p>
              <p>
                Đến ngày hẹn thanh toán 100% giá trị tour, nếu quý khách không
                thực hiện thanh toán đúng hạn và đúng số tiền, xem như quý khách
                tự ý&nbsp;hủy tour và mất hết số tiền đặt cọc giữ chỗ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
