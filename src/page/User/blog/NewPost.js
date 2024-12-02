import React, { useState } from "react";
import axios from "axios";
import MarkdownIt from "markdown-it";
import { message, Select } from "antd";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useHistory } from "react-router-dom";
import "./NewPost.scss";
import { sendPost } from "../../../utils/api";
import Layout from "../../../components/layout/layout";
import { add } from "../../../constants/images";
const mdParser = new MarkdownIt();
function Blogging() {
  document.title = "Viết Blog";
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("11");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [select, setSelect] = useState('FOOD');
  const options = [
    // thay doi
    { label: "Ẩm thực", value: "FOOD" },
    { label: "Chia sẻ", value: "SHARE" },
    { label: "Trải nghiệm", value: "REVIEW" },
    { label: "Hướng dẫn đi", value: "SUGGEST" },
  ];
  const handleChange = (value) => {
    setSelect(value)
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleGetImage = async () => {
    const { files } = document.querySelector(".img-input");
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "descriptionCourse");
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/learnit2022/image/upload",
        formData
      );
      setImageUrl(data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error(error);
    }
  };
  //nội dung trong mackdown
  function handleEditorChange({ html }) {
    setContent(html);
  }
  function onImageUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
  const handleChangeSubmit = async (values) => {
    const data = {
      image: await handleGetImage(),
      title: title,
      content: content,
      topic: select
    };
    // eslint-disable-next-line no-unused-vars
    const add = await sendPost("/posts/user-tourguide", data);
    // console.log(add);
    if (add.statusCode === 200) {
      message.success("Bài viết của bạn đang được duyệt");
      history.push("/viet-bai");
    } else {
      message.error("Lỗi kĩ thuật");
    }
  };

  return (
    <>
      <Layout>
        <div className="Blogging-wrapper ">

          <input
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* content */}
          <MdEditor
            placeholder="Nội dung viết ở đây"
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onImageUpload={onImageUpload}
            onChange={handleEditorChange}
          />
          <div className="select-toppic">
            <p className="select-topic-title">Phân loại bài viết</p>
            <Select placeholder="Chọn Topic"
              onChange={handleChange}
              defaultValue="FOOD"
              style={{ width: "100%" }}
              options={options}
            />
          </div>
          <section className="block-img_thumb">
            <label htmlFor="img">
              <div
                className="img"
                style={{ backgroundImage: `url(${imageUrl})` }}
              >
                <p>Upload ảnh tại đây</p>
                <img alt="" src={add} />
                <input
                  className="img-input"
                  hidden
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={onImageChange}
                />
              </div>
            </label>
          </section>
          <div style={{ display: " flex", justifyContent: "flex-end" }}>
            <button className="Xuat-ban" onClick={handleChangeSubmit}>
              Xuất bản
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Blogging;
