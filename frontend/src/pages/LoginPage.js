import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Form,
  FormGroup,
  Label,
  Alert,
} from "reactstrap";
import { useHistory } from "react-router-dom";

import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMsg] = useState({
    status: false,
    message: "",
  });
  const urlAPI = process.env.REACT_APP_APIURL;

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setErrorMsg({
        status: true,
        message: "Email or password cannot be empty!",
      });
    }

    axios({
      url: `${urlAPI}user/login`,
      method: "POST",
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        localStorage.setItem("userdata", JSON.stringify(res.data.data));
        history.push(`/`);
      })
      .catch((err) => {
        console.log(err.response);
        setErrorMsg({
          status: true,
          message: err.response.data.data,
        });
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: "40vw" }}>
        <CardBody>
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Alert
              color="danger"
              isOpen={error.status}
              toggle={() => setErrorMsg({ status: false, message: "" })}
              fade={false}
            >
              {error.message}
            </Alert>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                id="email"
                type="email"
                placeholder="eg: MickeyMouse"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                value={password}
                id="password"
                type="password"
                placeholder="eg: Serious Discussion"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button block color="primary">
              Login
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
