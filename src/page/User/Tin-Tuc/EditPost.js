import React, { useState, useEffect } from "react";
import axios from "axios";
import MarkdownIt from "markdown-it";
import { message, Select } from "antd";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useHistory, useParams } from "react-router-dom";
import "../../User/blog/NewPost.scss";
import { sendGet, sendPost, sendPut } from "../../../utils/api"; import TurndownService from "turndown";

import Layout from "../../../components/layout/layout";
const mdParser = new MarkdownIt(); const turndownService = new TurndownService();
function EditPost() {
    document.title = "Edit bài viết";
    const history = useHistory();
    const params = useParams();
    const [imageUrl, setImageUrl] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [select, setSelect] = useState();
    const [data, setData] = useState();
    const [main, setMain] = useState("");
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
    function handleEditorChange({ text, html }) {
        setMain(text);
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
        let data1 = {
            image: await handleGetImage(),
            title: title,
            content: content,
            topic: select,
            postId: parseInt(params.id)
        };
        // eslint-disable-next-line no-unused-vars
        const add = await sendPut("/posts/user-tourguide", data1);
        // console.log(add);
        if (add.statusCode === 200) {
            message.success("Bài viết của bạn đang được duyệt");
            history.push("/viet-bai");
        } else {
            message.error("Lỗi kĩ thuật");
        }
    };
    const getValuePost = async (values) => {
        const res = await sendGet(`/posts/user-tourguide/${params.id}`);
        if (res.statusCode === 200) {
            setData(res.returnValue);
            setImageUrl(res.returnValue.image);
            setTitle(res.returnValue.title);
            setSelect(res.returnValue.topic)
            setMain(turndownService.turndown(res.returnValue?.currentContent));
        } else {
            message.error("Lỗi kĩ thuật");
        }
    };
    useEffect(() => {
        getValuePost();
    }, []);
    return (
        <>
            <Layout>
                <div className="Blogging-wrapper ">
                    <div style={{ display: " flex", justifyContent: "flex-end" }}>
                        <button className="Xuat-ban" onClick={handleChangeSubmit}>
                            Xuất bản
                        </button>
                    </div>
                    <input
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {/* content */}
                    <MdEditor value={main}
                        placeholder="Nội dung viết ở đây"
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onImageUpload={onImageUpload}
                        onChange={handleEditorChange}
                    />
                    <Select placeholder="Chọn Topic"
                        onChange={handleChange}
                        defaultValue={select}
                        style={{ width: "100%" }}
                        options={options}
                    />
                    <section className="block-img_thumb">
                        <label htmlFor="img">
                            <div
                                className="img"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                            >
                                <p style={{ padding: "38px 20px 0" }}>
                                    Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn
                                    hút hơn với độc giả.
                                </p>
                                <p style={{ color: "red" }}>
                                    Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh.
                                </p>
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
                </div>
            </Layout>
        </>
    );
}

export default EditPost;
