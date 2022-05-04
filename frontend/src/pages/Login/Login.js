import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SmSpinner } from "../../components/SmSpinner/SmSpinner";
import { Alert } from "../../constants/Alert";
import { login } from "../../features/auth/authSlice";
import { createAlert } from "../../helpers/createAlert";
import styleClasses from "./Login.module.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  //Setting component state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handlers
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      createAlert({
        alert: [{ success: "Login Successful" }],
        type: Alert.SUCCESS,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      createAlert({ alert: error, type: Alert.ERROR });
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form className="form" onSubmit={onSubmitHandler}>
          <div className="form-body">
            <div className="form-field">
              <label>Email</label>
              <input
                className="form-input"
                type="email"
                value={email}
                placeholder="lorumipsum@gmail.com"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input
                className="form-input"
                type="password"
                value={password}
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                required
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form-actions">
            {loading ? (
              <button
                disabled
                className={`custom-btn-spinner-wrapper custom-btn-spinner ${styleClasses.LoginButton}`}
              >
                <SmSpinner />
              </button>
            ) : (
              <button
                type="submit"
                className={`custom-btn custom-btn-text custom-btn-positive ${styleClasses.LoginButton}`}
              >
                LOGIN
              </button>
            )}

            <button
              onClick={() => navigate("/register")}
              className="custom-btn custom-btn-text custom-btn-neutral"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
