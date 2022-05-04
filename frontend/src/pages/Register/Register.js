import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { createAlert } from "../../helpers/createAlert";
import { Alert } from "../../constants/Alert";
import styleClasses from "./Register.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { SmSpinner } from "../../components/SmSpinner/SmSpinner";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  // Setting component state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handlers
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register({ name, email, password })).unwrap();
      createAlert({
        alert: [{ success: "Register Successful" }],
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
              <label>Name</label>
              <input
                className="form-input"
                type="text"
                value={name}
                placeholder="C Santhosh Reddy"
                name="name"
                required
                minLength={2}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                pattern="((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{10,42})"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className={styleClasses.notePassword}>
              Password must be at least 10 characters long and contain at least
              one upper-case, one special character and a number.
            </p>
          </div>
          <div className={styleClasses.RegisterActions}>
            <Link to={"/login"} className={styleClasses}>
              <IoMdArrowRoundBack className={styleClasses.Back} />
            </Link>
            {loading ? (
              <button
                disabled
                className={`custom-btn-spinner-wrapper custom-btn-spinner ${styleClasses.RegisterButton}`}
              >
                <SmSpinner />
              </button>
            ) : (
              <button
                type="submit"
                className={`custom-btn custom-btn-text custom-btn-positive ${styleClasses.RegisterButton}`}
              >
                SUBMIT
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
