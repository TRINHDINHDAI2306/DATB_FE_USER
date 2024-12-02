/* eslint-disable */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/layout";
import { banner, home } from "../../../constants/images";
import { DatePicker, Form, Input, Select } from "antd";
import Step2 from "./Step2";
import "../../../assets/css/create-tour.css";
const { RangePicker } = DatePicker;
const { Option } = Select;

function CreateTour() {
  const [step, setStep] = useState(0);
  const onFinish = (values) => {
    console.log("Success:", values);
    setStep(1);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        this.formRef.current.setFieldsValue({
          note: "Hi, man!",
        });
        return;
      case "female":
        this.formRef.current.setFieldsValue({
          note: "Hi, lady!",
        });
        return;
      case "other":
        this.formRef.current.setFieldsValue({
          note: "Hi there!",
        });
        break;
      default:
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <Layout>
        <div className={step === 0 ? "create-tour__wrapper" : "hidden"}>
          <div className="content">
            <main className="create-tour">
              <div className="banner-bg">
                <img alt="" src={banner} />
              </div>
              <div className="pathway breadcrumbs">
                <ul>
                  <li>
                    <a href="/">Trang chủ</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li>
                    <strong>Du lịch</strong>
                  </li>
                </ul>
              </div>
              <select className="select-place">
                <option value="#">Chọn tỉnh/thành phố</option>
              </select>
              <div className="create-tour__block">
                <div className="travel-title-all">
                  <div className="travel-title-group">
                    <h3>Địa điểm đến?</h3>
                    <p>Lựa chọn các điểm đến.</p>
                  </div>
                  <select>
                    <option value="#">Chọn vị trí</option>
                  </select>
                </div>
                <ul className="place-form__choose">
                  <li className="checkbox-customize active">
                    <label className="checkbox-custom1 nowrap">
                      <input
                        type="checkbox"
                        defaultChecked
                        name="choose-object"
                      />
                      <span className="checkmark"></span>
                      <img
                        alt=" "
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDIybgZ8r8Is8-S0pQi9YyM1ya5i5jsGQc_g&usqp=CAU"
                      />
                      <p className="checkbox-name">Yên Phong</p>
                    </label>
                  </li>
                  <li className="checkbox-customize active">
                    <label className="checkbox-custom1 nowrap">
                      <input type="checkbox" name="choose-object" />
                      <span className="checkmark"></span>
                      <img
                        alt=" "
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDIybgZ8r8Is8-S0pQi9YyM1ya5i5jsGQc_g&usqp=CAU"
                      />
                      <p className="checkbox-name">Yên Phong</p>
                    </label>
                  </li>
                  <li className="checkbox-customize active">
                    <label className="checkbox-custom1 nowrap">
                      <input type="checkbox" name="choose-object" />
                      <span className="checkmark"></span>
                      <img
                        alt=" "
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDIybgZ8r8Is8-S0pQi9YyM1ya5i5jsGQc_g&usqp=CAU"
                      />
                      <p className="checkbox-name">Yên Phong</p>
                    </label>
                  </li>
                </ul>
              </div>
              <div className="create-tour__block">
                <div className="travel-title-all">
                  <div className="travel-title-group">
                    <h3>Khám phá</h3>
                    <p>Sở thích</p>
                  </div>
                  <select>
                    <option value="#">Chọn vị trí</option>
                  </select>
                </div>
                <ul className="place-form__choose">
                  <li className="checkbox-customize active">
                    <label className="checkbox-custom1 nowrap">
                      <input
                        type="checkbox"
                        defaultChecked
                        name="choose-object"
                      />
                      <span className="checkmark"></span>
                      <img
                        alt=" "
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDIybgZ8r8Is8-S0pQi9YyM1ya5i5jsGQc_g&usqp=CAU"
                      />
                      <p className="checkbox-name">Ẩm thực</p>
                    </label>
                  </li>
                  <li className="checkbox-customize active">
                    <label className="checkbox-custom1 nowrap">
                      <input type="checkbox" name="choose-object" />
                      <span className="checkmark"></span>
                      <img
                        alt=" "
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDIybgZ8r8Is8-S0pQi9YyM1ya5i5jsGQc_g&usqp=CAU"
                      />
                      <p className="checkbox-name">Khám phá</p>
                    </label>
                  </li>
                  <li className="checkbox-customize active">
                    <label className="checkbox-custom1 nowrap">
                      <input type="checkbox" name="choose-object" />
                      <span className="checkmark"></span>
                      <img
                        alt=" "
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDIybgZ8r8Is8-S0pQi9YyM1ya5i5jsGQc_g&usqp=CAU"
                      />
                      <p className="checkbox-name">Mới</p>
                    </label>
                  </li>
                </ul>
              </div>
              <div className="create-tour__block">
                <div className="travel-title-all">
                  <div className="travel-title-group">
                    <h3>Nơi ở</h3>
                    <p>Chọn phong cách mong muốn</p>
                  </div>
                </div>
                <ul className="place-form__choose place-form__choose_radio">
                  <li className="radio-customize active">
                    <label className="checkbox-custom1 nowrap">
                      <input type="radio" name="choose-object" />
                      <span className="checkmark"></span>
                      <img alt=" " src={home} />
                      <p className="radio-name">Nhà dân</p>
                    </label>
                  </li>
                  <li className="radio-customize active">
                    <label className="checkbox-custom1 nowrap">
                      <input type="radio" name="choose-object" />
                      <span className="checkmark"></span>
                      <img alt=" " src={home} />
                      <p className="radio-name">Nhà nghỉ</p>
                    </label>
                  </li>
                  <li className="radio-customize active">
                    <label className="checkbox-custom1 nowrap">
                      <input type="radio" name="choose-object" />
                      <span className="checkmark"></span>
                      <img alt=" " src={home} />
                      <p className="radio-name">Khách sạn</p>
                    </label>
                  </li>
                  <li className="radio-customize active">
                    <label className="checkbox-custom1 nowrap">
                      <input type="radio" name="choose-object" />
                      <span className="checkmark"></span>
                      <img alt=" " src={home} />
                      <p className="radio-name">Cắm trại</p>
                    </label>
                  </li>
                </ul>
              </div>
              <div className="create-tour__block-group">
                <div className="create-tour__block">
                  <div className="travel-title-all">
                    <div className="travel-title-group">
                      <h3>Số lượng</h3>
                    </div>
                  </div>
                  <div className="create-tour__people">
                    <div className="create-tour__people-item">
                      <p className="create-tour__people-des">
                        Người lớn
                        <br />
                        Trên 12
                      </p>
                      <div className="people_unit">
                        <div className="minus">
                          <i class="fa-solid fa-minus"></i>
                        </div>
                        <div className="unit">0</div>
                        <div className="plus">
                          <i class="fa-solid fa-plus"></i>
                        </div>
                      </div>
                    </div>
                    <div className="create-tour__people-item">
                      <p className="create-tour__people-des">
                        Trẻ em
                        <br /> Lứa tuổi 2 - 12
                      </p>
                      <div className="people_unit">
                        <div className="minus">
                          <i class="fa-solid fa-minus"></i>
                        </div>
                        <div className="unit">0</div>
                        <div className="plus">
                          <i class="fa-solid fa-plus"></i>
                        </div>
                      </div>
                    </div>
                    <div className="create-tour__people-item">
                      <p className="create-tour__people-des">
                        Trẻ sơ sinh <br />
                        Dưới 2
                      </p>
                      <div className="people_unit">
                        <div className="minus">
                          <i class="fa-solid fa-minus"></i>
                        </div>
                        <div className="unit">0</div>
                        <div className="plus">
                          <i class="fa-solid fa-plus"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="create-tour__block">
                  <div className="travel-title-all">
                    <div className="travel-title-group">
                      <h3>Thời gian bắt đầu</h3>
                    </div>
                  </div>
                  <div className="create-tour__datepicker">
                    <RangePicker />
                  </div>
                  <div className="travel-title-all">
                    <div className="travel-title-group">
                      <h3>Khoảng giá(đ)</h3>
                      <p className="travel-title-price">
                        <input placeholder="Tối thiểu" />
                        <span> - </span> <input placeholder="Tối đa" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="create-tour__block">
                <div className="travel-title-group">
                  <h3>Liên hệ</h3>
                </div>
                <Form
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <div className="form-contact-group">
                    <Form.Item
                      label="Họ tên"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Họ tên không được để trống",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="E-mail"
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="gender"
                      label="Giới tính"
                      rules={[{ required: false }]}
                    >
                      <Select
                        onChange={onGenderChange}
                        allowClear
                        defaultValue="male"
                      >
                        <Option value="#" se>
                          Chọn giới tính
                        </Option>
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                        <Option value="other">Khác</Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <Form.Item>
                    <div className="button button--primary" onClick={onFinish}>
                      Tiếp
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </main>
          </div>
        </div>
        <Step2 step={step} />
      </Layout>
    </>
  );
}
export default CreateTour;
