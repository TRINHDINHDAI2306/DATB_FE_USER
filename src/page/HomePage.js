import React, { useEffect } from "react";
import "../assets/css/home.css"
import Home from "../components/home/home";
import Layout from "../components/layout/layout";
function HomePage() {
    useEffect(() => {
    }, []);
    return (
        <>
            <Layout>
                <div className="home__wrapper">
                    <Home />
                </div>
            </Layout>
        </>
    );
}
export default HomePage;