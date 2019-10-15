import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertsstatus: "",
      alerton: false,
      alertmsg: "",
      alertcolor: ""
    };
  }
 
  render() {
    let myalert = "";
    if (this.state.alertstatus === "failure") {
      myalert = (
        <div className={"alert alert-" + this.state.alertcolor}>
          {this.state.alertmsg}
        </div>
      );
    }

    if (this.state.alertstatus !== "success") {
      return (
        <div className="row ml-2 ml-md-0 mr-2 mr-md-0 mt-3">
          <div className="rounded p-3 bg-white col-12 col-md-8 offset-md-2">
            <h1 className="text-danger">Register to Play </h1>
            {myalert}
            <Formik
              initialValues={{
                firstname: "",
                email: "",
                password: "",
                confirmPassword: ""
              }}
              validationSchema={Yup.object().shape({
                firstname: Yup.string().required("First Name is required"),
                email: Yup.string()
                  .email("Email is invalid")
                  .required("Email is required"),
                password: Yup.string()
                  .min(4, "Password must be at least 4 characters")
                  .required("Password is required"),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .required("Confirm Password is required")
              })}
              onSubmit={fields => {
                axios
                  .post(`http://localhost:9000/createUser`, fields)
                  .then(res => {
                    if (res.data === "success") {
                      this.setState({
                        alerton: true,
                        alertstatus: "success",
                        alertcolor: "success",
                        alertmsg: "Your username has been successfully added!"
                      });
                    } else if (res.data === "emailexists") {
                      this.setState({
                        alerton: true,
                        alertstatus: "failure",
                        alertcolor: "warning",
                        alertmsg: "That email address is already registered."
                      });
                    } else {
                      this.setState({
                        alerton: true,
                        alertstatus: "failure",
                        alertcolor: "warning",
                        alertmsg: "Something went wrong."
                      });
                    }
                  });
                //alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
              }}
              render={({ errors, status, touched }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      type="text"
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <small className="text-secondary">
                      This will be your username. We will not use your email for
                      any other purposes.
                    </small>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="firstname">Child's First Name</label>
                    <Field
                      name="firstname"
                      type="text"
                      className={
                        "form-control" +
                        (errors.firstname && touched.firstname
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className={
                        "form-control" +
                        (errors.confirmPassword && touched.confirmPassword
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-success mr-2">
                      Register
                    </button>
                    <button type="reset" className="btn btn-secondary">
                      Reset
                    </button>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="row ml-2 ml-md-0 mr-2 mr-md-0 mt-3">
          <div className="rounded p-3 bg-white col-12 col-md-8 offset-md-2">
            <div className="alert alert-success">You have been successfully registered! <Link to="/wordButtonList">Click here to start playing.</Link></div>
          </div>
        </div>
      );
    }
  }
}

export default RegisterUser;
