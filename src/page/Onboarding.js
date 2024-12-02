/* eslint-disable */
import React, { useEffect, useState } from "react";

import "../assets/css/introduce.css";
import { logo, imgwelcome } from "../constants/images";
export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [active, setActive] = useState(1);
  const changeStep = (index) => {
    setActive(2),
      active === 2
        ? localStorage.setItem("desiredTrip", index)
        : localStorage.setItem("placeTrip", index);
  };
  const completedOnboarding = () => {
    window.location.href = "/";
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="onboarding__wrapper">
        <div
          className={
            step === 1 ? "Onboarding-container step1" : "Onboarding-container"
          }
        >
          <div className="Welcome_wrapper">
            <div className="Welcome_welcome-left">
              <img src={logo} alt="welcome" />
            </div>
            <div className="Welcome_welcome-right">
              <h1>
                Xin chào, <span>My Vũ!</span>
              </h1>
              <p>
                <span class="Welcome_welcome-right-main">
                  Chào mừng bạn đã đến với cộng đồng <strong>Travelocal</strong>
                  ,{" "}
                </span>
                <span>nơi kết nối du khách và Hướng dẫn viên địa phương!</span>
              </p>
              <p>
                Để xây dựng chuyến đi hoàn hảo nhất, <br /> giúp chúng mình trả
                lời một vài câu hỏi nhé!
              </p>
              <div
                class="Welcome_button button-primary"
                onClick={() => setStep(2)}
              >
                <span class="Button_title">Bắt đầu khám phá</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            step === 2 ? "Onboarding-container step2" : "Onboarding-container"
          }
        >
          <div class="Onboarding_back" onClick={() => changeStep(1)}>
            <div class="Onboarding_back-button">
              <img
                src="https://fullstack.edu.vn/static/media/back.9f22d39712f419e9538f2a9ad6e3624e.svg"
                alt="back-icon"
              />
            </div>
          </div>
          <div className="Welcome_wrapper">
            <div className="Welcome_welcome-left">
              <img src={imgwelcome} alt="welcome" />
            </div>
            <div className="Welcome_welcome-right">
              <div className={active === 1 ? "step3" : "hidden"}>
                <h1>Chuyến đi mong muốn</h1>
                <div class="Welcome_button" onClick={() => changeStep(1)}>
                  <i class="fas fa-gift"></i>
                  <span class="Button_title">Thiên nhiên</span>
                </div>
                <div class="Welcome_button" onClick={() => changeStep(2)}>
                  <i class="fas fa-images"></i>
                  <span class="Button_title">Ấm cúm</span>
                </div>
                <div class="Welcome_button" onClick={() => changeStep(3)}>
                  <i class="fab fa-fort-awesome"></i>
                  <span class="Button_title">Hoang dã</span>
                </div>
                <div class="Welcome_button" onClick={() => changeStep(4)}>
                  <i class="fas fa-tram"></i>
                  <span class="Button_title">Tour gia đình</span>
                </div>
              </div>
              <div className={active === 2 ? "step4" : "hidden"}>
                <h1>Điểm đến</h1>
                <div class="Welcome_button" onClick={() => changeStep(1)}>
                  <i class="fas fa-gift"></i>
                  <span class="Button_title">Miền Bắc</span>
                </div>
                <div class="Welcome_button" onClick={() => changeStep(2)}>
                  <i class="fas fa-images"></i>
                  <span class="Button_title">Miền Trung</span>
                </div>
                <div class="Welcome_button" onClick={() => changeStep(3)}>
                  <i class="fab fa-fort-awesome"></i>
                  <span class="Button_title">Miền Nam</span>
                </div>
                <div
                  class="Welcome_button button-primary"
                  onClick={() => completedOnboarding()}
                >
                  <span class="Button_title">Bắt đầu khám phá</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
