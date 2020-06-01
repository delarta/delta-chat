import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useHistory } from "react-router-dom";
export default function SideContent({ rooms, userId }) {
  const history = useHistory();

  return (
    <div className="side-content">
      <ListGroup flush>
        {rooms.map((room, index) => (
          <ListGroupItem
            key={index}
            tag="button"
            action
            onClick={() => history.push(`/chat?roomId=${room.id}`)}
          >
            {room.type === "personal"
              ? room.users.find((user) => user.id !== userId).username
              : room.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
