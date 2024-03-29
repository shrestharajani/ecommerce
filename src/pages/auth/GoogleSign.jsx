import { Button, Divider, Row } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import google from "../../images/google-icon.png";
import { googleLoginUser } from "../../redux/actions/authActions";
import { loginState } from "../../redux/actions/actions";

export default function GoogleSign() {
  const dispatch = useDispatch();
  const handleGoogleSignIn = () => {
    dispatch(googleLoginUser());
    dispatch(loginState(false));
  };

  return (
    <>
      <Divider plain>or</Divider>
      <Row gutter={[0, 16]}>
        <Button block className="buttons" onClick={handleGoogleSignIn}>
          <div className="google-sign">
            <div className="google-image">
              <img src={google} alt="not found" />
            </div>
            <div>Continue with Google</div>
          </div>
        </Button>
      </Row>
      <div className="terms">
        By clicking Sign in or Continue with Google you agree to DrinkItAll's{" "}
        <Link to="/">Terms of Use and Privacy Policy</Link>. DrinkItAllmay send
        you communications; you may change your preferences in your account
        settings.
      </div>
    </>
  );
}
