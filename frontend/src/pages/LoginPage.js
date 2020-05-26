import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !room) {
      return alert("Username or room cannot be empty!");
    }

    localStorage.setItem("userdata", JSON.stringify({username, room}))

    history.push(`/`);
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
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                value={username}
                id="username"
                placeholder="eg: MickeyMouse"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="room">Room</Label>
              <Input
                value={room}
                id="room"
                placeholder="eg: Serious Discussion"
                onChange={(e) => setRoom(e.target.value)}
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
