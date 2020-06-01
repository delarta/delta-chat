import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from "../components/Header";
import ChatPage from "../pages/ChatPage";
import SideContent from "./SideContent";

export default function DefaultLayout() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [userId, setUserId] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("userdata")) {
      history.push("/login");
    } else {
      const { id ,username, rooms } = JSON.parse(localStorage.getItem("userdata"));
      setUsername(username);
      setRoom(rooms);
      setUserId(id);
    }
  }, [history]);
  return (
    <div id="app-layout">
      {username && (
        <>
          <Header username={username} />
          <SideContent rooms={room} userId={userId} />
          <Switch>
            <Route path="/chat" exact component={ChatPage} />
            <Redirect from="/" to="/chat" />
          </Switch>
        </>
      )}
    </div>
  );
}
