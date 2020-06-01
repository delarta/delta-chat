import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { useHistory, useLocation } from "react-router-dom";
import qs from "querystring";
import moment from "moment";
import {
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Form,
} from "reactstrap";
import axios from "axios";

let socket;

export default function ChatPage() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState("");

  const history = useHistory();
  const location = useLocation();

  const urlAPI = process.env.REACT_APP_APIURL;

  useEffect(() => {
    console.log(qs.parse(location.search.substring(1)));
    socket = io(process.env.REACT_APP_APIURL);

    const { roomId } = qs.parse(location.search.substring(1));

    const { id, username } = JSON.parse(localStorage.getItem("userdata"));

    if (roomId) {
      axios({
        url: `${urlAPI}room/${roomId}`,
        method: "GET",
      })
        .then((res) => {
          const { data } = res.data;
          if (data.type === "personal") {
            setRoom(data.users.find((item) => item.id !== id).username);
          } else if (data.type === "group") {
            setRoom(data.name);
          }
          setUserId(id);
          setMessages(data.chats);
          socket.emit("join", { userId: id, username, room: roomId }, (err) => {
            if (err) {
              alert(err);
              // history.replace("/login");
            }
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }

    // setUsername(username);
    // setRoom(roomId);
  }, [history, location.search, urlAPI]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("type", ({ user, completed }) => {
      console.log(user);
      if (!completed) {
        setTyping(`${user} is typing...`);
      } else {
        setTyping("");
      }
    });

    // socket.on("roomInfo", ({ users }) => {
    //   console.log(users);
    //   setUsers(users);
    // });
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
    <div className="main-content">
      <ScrollToBottom className="chat-container">
        <div className="chat-messages">
          {messages.length ? (
            messages.map((item, index, arr) =>
              item.user.userId !== "notification" ? (
                <div
                  key={index}
                  className={`chat-item mb-2 ${
                    userId === item.user.userId && "sender"
                  }`}
                >
                  <div>
                    {index !== 0 ? (
                      item.user.userId !== arr[index - 1].user.userId && (
                        <strong>{item.user.username}</strong>
                      )
                    ) : (
                      <strong>{item.user.username}</strong>
                    )}
                  </div>
                  <div>{item.text}</div>
                  <small className="text-secondary">
                    {moment(item.timestamps).format("h:mm A")}
                  </small>
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
      </ScrollToBottom>
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
  );
}
