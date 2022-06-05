import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import loginImg from "../usingImages/loginImg.svg";
import { Link } from "react-router-dom";
import { defaultAPI } from "../api/api";

function ChangePassword({ user }) {
  if (user) return <Navigate to="/" />;

    const passwordRef = useRef();
    const confirm_passwordRef = useRef();
    const queryString = window.location.search
    const urlParam = new URLSearchParams(queryString)

  return (
    <div>
      <div className="container">
        <div className="row resgister-div">
          <div className="col-sm-6 offset-sm-3 ">
            <ToastContainer />
            <div className="card card-sign">
              <div className="row">
                <div className="col-md-6">
                  <img src={loginImg} alt="" className="loginImg" />
                </div>
                <div className="col-md-6">
                  <strong>Change password</strong>

                  <br />
                  <br />
                  <form action="" className="login-form">
                    <label htmlFor="emailTb">Enter password</label>
                    <input
                    ref={passwordRef}
                      id="emailTb"
                      type="password"
                      className="form-control"
                      placeholder="password"
                      required
                    />
                    <br />
                    <input
                    ref={confirm_passwordRef}
                      id="emailTb"
                      type="password"
                      className="form-control"
                      placeholder="password"
                      required
                    />
                    <br />

                    <div className="btn-group">
                      
                      <button type="button" className="btn btn-sign" onClick={() => {
                          const reset_token = urlParam().get('reset_token');

                         fetch(`${defaultAPI.api.authUrl}/identity/users/password/confirm_code?reset_password_token=${reset_token}&password=${passwordRef}&confirm_password=${confirm_passwordRef}`, {
                            method: "POST",
                            headers:{
                                "Content-Type": "application/json",
                                Accept: "application/json"
                            }
                            
                        }).then(
                            toast.success("Done!", {
                                position: "top-center"
                            })
                        ).catch((err)=>{
                          toast.error("Error!", {
                              position: "top-center"
                          })
                        })
                      }}>
                        Forgot Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
