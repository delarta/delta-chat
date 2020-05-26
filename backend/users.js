let users = []

const addUser = ({id, username, room}) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const isDuplicate = users.find(user => user.username === username )

  if(isDuplicate) return {error: "Username already taken"}

  const newUser = {
    id,
    username, 
    room
  }
  users.push(newUser);

  return {user: newUser}

}

const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id)

  // remove from array BUT return the removed item
  if(index !== -1) return users.splice(index, 1)[0]
}

const getUser = (id) => {
  return users.find(user => user.id === id);
}

const getUsersInRoom = (room) => {
  return users.filter(user => user.room === room)
}

module.exports = {getUser, addUser, removeUser, getUsersInRoom}