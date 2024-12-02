import Layout from "../../components/layout/layout";
import React from "react";
import "../../assets/css/chat.css";
// import Nav from "./nav/Nav";
import ChatBody from "./chatBody/ChatBody";
import { AppProvider } from "../../Context/AppContext";

function App() {
  return (
    <AppProvider>
      <Layout>
        <div className="__main">
          {/* <Nav /> */}
          <ChatBody />
        </div>
      </Layout>
    </AppProvider>
  );
}

export default App;
