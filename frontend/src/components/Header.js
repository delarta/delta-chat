import React from "react";
import {Container, Row, Col } from "reactstrap";

export default function Header({username, room}) {
  return (
    <div className="header">
      <Container fluid>
        <Row>
          <Col md={4}>
            <strong>{username}</strong>
          </Col>
          <Col md={8}>Room: {room}</Col>
        </Row>
      </Container>
    </div>
  );
}
