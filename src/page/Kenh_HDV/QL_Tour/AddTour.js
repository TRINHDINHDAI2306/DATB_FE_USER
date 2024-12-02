// /* eslint-disable */
import React, { useContext, useEffect } from "react";
import "../../../assets/css/homehdv.css";
import "./style.css";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";

import {
  Form,
  Input,
  Select,
  Button,
  message,
  InputNumber,
  Upload,
} from "antd";
import axios from "axios";
import Image from "../../../components/image";
import { PlusOutlined } from "@ant-design/icons";
import LayoutHDV from "../../../components/layout/layoutHDV";
import { useState } from "react";
import { sendPost } from "../../../utils/api";
import { AppContext } from "../../../Context/AppContext";
import { useHistory } from "react-router-dom";
export default function AddTour() {
  const { TextArea } = Input;
  const { provice } = useContext(AppContext);
  const [showtt, setShowtt] = useState(true);
  const defileTime = 100000;
  const history = useHistory();
  const [fileList, setFileList] = React.useState([]);
  const [listFile, setListFile] = React.useState([]);
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const upLoadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "avatar");
      let res = await axios.post(
        "https://api.cloudinary.com/v1_1/learnit2022/image/upload",
        formData
      );

      return res?.data;
    } catch (error) {
      return error;
    }
  };
  const onGetImg = async () => {
    try {
      let files = [];
      for await (const file of fileList) {
        let res = await upLoadFile(file.originFileObj);
        if (res) {
          files = [...files, res];
        }
        await wait(!res ? defileTime : 0);
      }
      setListFile(files);
      return files;
    } catch (err) {
      console.log("error", err);
    }
    return listFile;
  };
  const onFinish = async (values) => {
    values.tourImages = await onGetImg();
    console.log(`values`, values);
    const res = await sendPost("/tours", values);
    if (res.statusCode === 400) {
      message.error("Thất bại");
    } else {
      message.success("tạo mới tour thành công, vùi lòng đợi Admin phê duyệt");
      history.push("/kenh-hdv/ds-tour");
    }
  };
  const { Option } = Select;
  const openTT = () => {
    setShowtt(!showtt);
  };
  return (
    <>
      <LayoutHDV>
        <div className="add-tour">
          <div className="add-tour-title" onClick={() => openTT()}>
            <p class="landing-page-title"> Thông tin cơ bản </p>
            <i class={showtt ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            {showtt && (
              <div className="tt-group">
                <Form.Item
                  name="name"
                  label="Tên tour"
                  rules={[
                    {
                      required: true,
                      message: "Tên tour ko để trống!",
                    },
                  ]}
                >
                  <Input placeholder="Tên tour" />
                </Form.Item>
                <Form.Item
                  name="type"
                  label="Phân loại"
                  rules={[
                    {
                      required: true,
                      message: "Phân loại",
                    },
                  ]}
                >
                  <Select placeholder="Phân loại tour">
                    <Option value="Ecotourism">Du lịch văn hóa</Option>
                    <Option value="Cultural">Du lịch nghỉ dưỡng</Option>
                    <Option value="Resort">Du lịch giải trí</Option>
                    <Option value="Entertainment">Du lịch khám phá</Option>
                    <Option value="Sports">Du lịch thể thao</Option>
                    <Option value="Discovery">Du lịch mạo hiểm</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Mô tả "
                  rules={[
                    {
                      required: true,
                      message: "Mô tả ko để trống!",
                    },
                  ]}
                >
                  <Input placeholder="Mô tả" />
                </Form.Item>
                <Form.Item
                  name="overview"
                  label="Tổng quan"
                  rules={[
                    {
                      required: true,
                      message: "Tổng quan ko để trống!",
                    },
                  ]}
                >
                  <TextArea rows={4} placeholder="Nhập tổng quan " />
                </Form.Item>
                <Form.Item
                  name="provinceId"
                  label="Tỉnh thành"
                  rules={[
                    {
                      required: true,
                      message: "Tỉnh thành ko để trống!",
                    },
                  ]}
                >
                  <Select placeholder="Tỉnh thành">
                    {provice.map((item, index) => (
                      <Option value={item?.id} key={index}>
                        {item?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <div className="group">
                  <Form.Item
                    name="maxMember"
                    label="Số lượng người tối đa"
                    rules={[
                      {
                        required: true,
                        message: "Số lượng ko để trống!",
                      },
                    ]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                  <Form.Item
                    name="feePerMember"
                    label="Phí phị thu thêm khi quá số người người"
                    rules={[
                      {
                        required: true,
                        message: "Phí phụ thu ko để trống!",
                      },
                    ]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                  <Form.Item
                    name="basePrice"
                    label="Giá tour"
                    rules={[
                      {
                        required: true,
                        message: "Giá tour ko để trống!",
                      },
                    ]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                </div>
                <Form.Item label="Ảnh mô tả" valuePropName="fileList">
                  <Upload
                    accept="image/png, image/jpeg"
                    action="https://www.mocky.io/v3/e34ba2ea-9db5-4bb7-ab5a-c7208e4f9ae1"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                </Form.Item>
              </div>
            )}

            <div className="main-ht">
              <Form.List name="tourSchedules">
                {(fields, { add, remove }) => {
                  return (
                    <div>
                      <div className="lt-group">
                        <p className="landing-page-title"> Lịch trình </p>
                        <div
                          className="button button--primary button-add"
                          onClick={() => {
                            add();
                          }}
                        >
                          Thêm mới
                        </div>
                      </div>
                      {fields.map((field, index) => (
                        <div key={field.key}>
                          <StepItem field={field} index={index} />
                          {fields.length > 1 ? (
                            <Button
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            >
                              Xóa lịch trình
                            </Button>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  );
                }}
              </Form.List>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="form-button">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </LayoutHDV>
    </>
  );
}
function StepItem({ field, index }) {
  const [active, setActive] = useState(true);
  const mdParser = new MarkdownIt();
  const openServices = () => {
    setActive(!active);
  };
  return (
    <>
      <div className="main-form-step3">
        <div className="main-form-title-box" onClick={() => openServices()}>
          <h3 className="title-ht">Ngày {index + 1}</h3>
          <i class={active ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i>
        </div>
        <div className={active ? "main-form-item" : "hidden"}>
          <Form.Item>
            <Input.Group>
              <Form.Item
                name={[index, "title"]}
                label="Tiêu đề"
                rules={[
                  {
                    required: true,
                    message: "Tiêu đề ko để trống!",
                  },
                ]}
              >
                <Input placeholder="Tiêu đề" />
              </Form.Item>
              <Form.Item name={[index, "content"]} label="Mô tả">
                <div className="service-group">
                  <MdEditor
                    placeholder="Mô tả"
                    style={{ height: "200px" }}
                    renderHTML={(text) => mdParser.render(text)}
                  />
                </div>
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </div>
      </div>
    </>
  );
}
