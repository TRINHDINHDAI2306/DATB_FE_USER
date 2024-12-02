import React from "react";
import "../../../assets/css/chat.css";
// import Nav from "./nav/Nav";
import ChatBody from "./chatBody/ChatBody";
import { AppProvider } from "../../../Context/AppContext";
import LayoutHDV from "../../../components/layout/layoutHDV";

function App() {
  return (
    <AppProvider>
      <LayoutHDV>
        <div className="__main">
          {/* <Nav /> */}
          <ChatBody />
        </div>
      </LayoutHDV>
    </AppProvider>
  );
}

export default App;
