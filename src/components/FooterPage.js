import { Col, Row } from "antd";
import React from "react";
import img24 from "../images/24.png";

export default function FooterPage() {
  return (
    <section className="newsletterSection">
      <Row>
        <Col span={6}>
          <div className="callblock24">
            <img className="img24" src={img24} alt="not found" />
            <a href="tel:+977-9851119509">+977-98********</a>
          </div>
        </Col>
        <Col span={18}>
          <form className="subscribeForm">
            <Row>
              <Col
                span={10}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="subscribe-txt">
                  Subscribe Us for Latest News and Offers
                </div>
              </Col>
              <Col span={14}>
                <div className="subscribe-block">
                  <input type="text" placeholder="Enter Email Address"></input>
                  <button className="subscribe">Subscribe Now</button>
                </div>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </section>
  );
}
