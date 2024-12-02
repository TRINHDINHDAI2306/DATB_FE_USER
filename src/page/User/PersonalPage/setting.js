import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Input, Skeleton, message } from "antd";
import axios from "axios";
import "../../../assets/css/personal.css";
import { avt, camera } from "../../../constants/images";
import { sendGet, sendPost } from "../../../utils/api";
import Layout from "../../../components/layout/layout";
import { AppContext } from "../../../Context/AppContext";
function Account() {
  // const { infoUser } = useContext(AppContext);
  const [show, setShow] = useState(true);
  const [infoUser, setInfoUser] = useState([]);
  const [form] = Form.useForm();
  const onFinish = async (values) => {};
  // eslint-disable-next-line no-unused-vars
  // const user = getItem("user") ? JSON.parse(getItem("user")) : {};
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [imageUrl, setImageUrl] = useState(avt);
  const handleChangeImage = async () => {
    const { files } = document.querySelector(".img-input");
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "avatar");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/learnit2022/image/upload",
        formData
      )
      .then((response) => setImageUrl(response.data.secure_url))
      .catch((err) => console.error(err));
    return imageUrl;
  };
  const onChangePass = async (values) => {
    const res = await sendPost("/api/user/password", values);
    if (res.status === 200) {
      message.success("Đổi mật khẩu thành công");
      form.resetFields();
    } else {
      message.error("Không thể đổi mật khẩu");
    }
  };
  const onCancelChangePass = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const getData = async (values) => {
    const res = await sendGet("/users");
    if (res.statusCode === 200) {
      console.log(`data`, res.returnValue.data);
      setInfoUser(res.returnValue.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // if (!Object.keys(infoUser).length)
  // return (
  //   <>
  //     <Skeleton />
  //   </>
  // );
  return (
    <>
      <Layout>
        <div className="InfoUser-wwrapper">
          <h1>Cài đặt</h1>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item>
              <div className="btn-active">
                <Button className="active" htmlType="submit">
                  Lưu
                </Button>
                <button>Hủy</button>
              </div>
            </Form.Item>

            <h2>Thông tin cá nhân</h2>
            <div className="info">
              <h3>Họ tên</h3>
              <Form.Item name="name" initialValue={infoUser?.username}>
                <Input />
              </Form.Item>
              <p>
                Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình
                luận của bạn.
              </p>
            </div>
            <div className="info">
              <h3>SĐT</h3>
              <Form.Item name="bio" initialValue={infoUser?.phone}>
                <Input placeholder="Số điện thoại" />
              </Form.Item>
              {/* <p>
                Bio hiển thị trên trang cá nhân và trong các bài viết (blog) của
                bạn.
              </p> */}
            </div>

            <div className="info">
              <h3>Avatar</h3>
              <p>
                Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.
                <Form.Item initialValue={infoUser?.avatar}>
                  <div class="avtUpload">
                    <div class="avtUploadImg">
                      <img src={infoUser?.avatar} alt="Avatar" />
                    </div>
                    <label for="img">
                      <div class="photoupload" onChange={handleChangeImage}>
                        <img
                          src={camera}
                          class="photoupload-img"
                          alt="camera"
                        />
                      </div>
                      <div class="PhotoPic" hidden={true}>
                        <input
                          className="img-input"
                          type="file"
                          id="img"
                          name="img"
                          accept="image/*"
                          onChange={handleChangeImage}
                        />
                      </div>
                    </label>
                  </div>
                </Form.Item>
              </p>
            </div>

            <div className="info">
              <h3>Email</h3>
              <Form.Item name="email" initialValue={infoUser?.email}>
                <Input placeholder={"ktravel@gmail.com"} readOnly />
              </Form.Item>
            </div>
          </Form>
          <div className="ChangPassword">
            <div className="changeinfo">
              <div className="title">
                <i class="fa-solid fa-key"></i>
                <div style={{ marginLeft: "13px" }}>
                  <p style={{ color: "#181717" }}>Đổi mật khẩu</p>
                  <p style={{ color: "#383838" }}>
                    Bạn nên sử dụng mật khẩu mạnh mà mình chưa sử dụng ở đâu
                    khác
                  </p>
                </div>
              </div>
              <button onClick={() => setShow(!show)}>Thay đổi</button>
            </div>
            <Form
              hidden={show}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onChangePass}
              onFinishFailed={onCancelChangePass}
              autoComplete="off"
            >
              <Form.Item
                name="oldPassword"
                label="Mật khẩu cũ"
                rules={[
                  {
                    required: true,
                    message: "Nhập mật khẩu",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu mới"
                rules={[
                  {
                    required: true,
                    message: "Nhập mật khẩu",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Nhập lại mật khẩu"
                dependencies={["passwordConfirmation"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Nhật mật khẩu",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Lưu thay đổi
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Account;
