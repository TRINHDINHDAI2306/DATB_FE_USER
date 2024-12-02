import { Upload } from "antd";
import React, { useState } from "react";
const Image = ({ lengthImg }) => {
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    // xem anh
    // const imgWindow = window.open(src);
    // imgWindow?.document.write(image.outerHTML);
  };
  return (
    <Upload
      action="http://localhost:3000"
      listType="picture-card"
      fileList={fileList}
      accept=".png, .jpg, .jpeg"
      onChange={onChange}
      onPreview={onPreview}
    >
      {fileList.length < lengthImg && "+ Upload"}
    </Upload>
  );
};
export default Image;
