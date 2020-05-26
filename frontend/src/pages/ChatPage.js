import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Form,
} from "reactstrap";

let socket;

export default function ChatPage() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState("");

  useEffect(() => {
    socket = io(process.env.REACT_APP_APIURL);

    const { username, room } = JSON.parse(localStorage.getItem("userdata"));

    setUsername(username);
    setRoom(room);

    socket.emit("join", { username, room }, (err) => {
      if (err) {
        alert(err);
      }
    });
  }, [localStorage]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("type", ({ user, completed }) => {
      if (!completed) {
        setTyping(`${user} is typing...`);
      } else {
        setTyping("");
      }
    });

    socket.on("roomInfo", ({ users }) => {
      console.log(users);
      setUsers(users);
    });
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
        socket.emit("typing", { completed: true });
      });
    }
  };

  const handleMessage = (e) => {
    if (e.target.value.length) {
      socket.emit("typing", { completed: false });
    } else {
      socket.emit("typing", { completed: true });
    }
    setMessage(e.target.value);
  };

  return (
    <>
      <div className="side-content">
        <ListGroup flush>
          <ListGroupItem>{room}</ListGroupItem>
        </ListGroup>
      </div>

      <div className="main-content">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.length ? (
              messages.map((item, index, arr) =>
                item.user !== "notification" ? (
                  <div
                    key={index}
                    className={`chat-item mb-2 ${
                      username.trim().toLowerCase() === item.user && "sender"
                    }`}
                  >
                    <div>
                      {index !== 0 ? (
                        item.user !== arr[index - 1].user && (
                          <strong>{item.user}</strong>
                        )
                      ) : (
                        <strong>{item.user}</strong>
                      )}
                    </div>
                    <div>
                      {item.text}
                    </div>
                  </div>
                ) : (
                  <div key={index} className="broadcast mb-2">
                    <div>{item.text}</div>
                  </div>
                )
              )
            ) : (
              <div className="broadcast mb-2">
                Start Chatting with your friend...
              </div>
            )}

            {typing && <div className="broadcast mb-2">{typing}</div>}
          </div>
        </div>
        <div className="chat-input">
          <Form onSubmit={handleSendMessage}>
            <InputGroup className="chat-form">
              <Input
                placeholder="Type a message"
                onChange={handleMessage}
                value={message}
              />
              <InputGroupAddon addonType="append">
                <Button type="submit" color="primary">
                  Send
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </div>
      </div>
    </>
  );
}
