import React from "react";
import {
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import {useHistory} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons/faCommentDots";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons/faPowerOff";

export default function Header({ username, room }) {
  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.replace("/login")
  }
  return (
    <div className="header">
      <div className="header-left">
        <strong>{username}</strong>
        {/* <Button outline color="primary">
          <FontAwesomeIcon icon={faCommentDots} />
        </Button> */}
        <UncontrolledButtonDropdown>
          <DropdownToggle outline color="primary">
            <FontAwesomeIcon icon={faCommentDots} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Start Chatting</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
      <div className="header-right">
        <div>Room: {room}</div>
        <Button outline color="danger">
          <FontAwesomeIcon icon={faPowerOff} onClick={handleLogout}/>
        </Button>
      </div>
    </div>
  );
}
