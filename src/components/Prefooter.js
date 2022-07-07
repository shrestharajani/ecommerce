import React from "react";
import { Col, Row } from "antd";
import playstore from "../images/playstore.png";
import { HomeContent } from "../pages/UserPanel/HomeContent";
import { Link } from "react-router-dom";

export default function Prefooter() {
  return (
    <div id="preFooter">
      <Row justify="space-between">
        <Col>
          <div className="footer-title">Contact Us</div>
          <div className="footer-bar"></div>
          <div className="footer-li">44600, Sorakhutte, Kathmandu, Nepal</div>
          <div className="footer-li">98********, 98********</div>
          <div className="footer-li">drinkitall@website.com</div>
          <a href="contactus.html" className="contact-us-btn">
            Contact Us
          </a>
        </Col>
        <Col>
          <div className="footer-title">Quick Links</div>
          <div className="footer-bar"></div>
          <div className="footer-li">
            <Link to="/">Home</Link>
          </div>

          {HomeContent.map(
            (item, index) =>
              index < 6 && (
                <div className="footer-li">
                  <Link to={item.link}>{item.title}</Link>
                </div>
              )
          )}

          <div className="footer-li">
            <Link to="/kodo">Kodo</Link>
          </div>
        </Col>
        <Col>
          <div className="footer-title">Policy</div>
          <div className="footer-bar"></div>
          <div className="footer-li">
            <a href="paymentpolicy.html">Payment Policy</a>
          </div>
          <div className="footer-li">
            <a href="returnpolicy.html">Return Policy</a>
          </div>
          <div className="footer-li">
            <a href="privacypolicy.html">Privacy Policy</a>
          </div>
          <div className="footer-li">
            <a href="dealerpolicy.html">Dealer Policy</a>
          </div>
          <div className="footer-li">
            <a href="termsnconditions.html">Terms & Conditions</a>
          </div>
        </Col>
        <Col>
          <div className="footer-title">Follow Us</div>
          <div className="footer-bar"></div>
          <div className="footer-social">
            <a href="www.facebook.com" target="_blank">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="www.twitter.com" target="_blank">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="www.instagram.com" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="mt-3">
            <a href="www.playstore.com">
              <img className="app-img" src={playstore} alt="not found" />
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
}
