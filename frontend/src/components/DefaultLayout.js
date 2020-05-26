import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from "../components/Header";
import ChatPage from "../pages/ChatPage";

export default function DefaultLayout() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const history = useHistory();

  useEffect(() => {
    if(!localStorage.getItem("userdata")){
      history.push("/login");
    }else{
      const { username, room } = JSON.parse(localStorage.getItem("userdata"));
      setUsername(username);
      setRoom(room);
    }
  }, [history]);
  return (
    <div id="app-layout">
      <Header username={username} room={room} />

      <Switch>
        <Route path="/chat" exact component={ChatPage} />
        <Redirect from="/" to="/chat" />
      </Switch>
    </div>
  );
}
