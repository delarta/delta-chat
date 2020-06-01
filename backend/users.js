let users = [];
let userRegistered = [
  {
    id: "1",
    username: "Johnny Joestar",
    email: "johnnyjoestar@mail.com",
    password: "qweasd123",
    rooms: ["1", "2"],
    contacts: ["4"],
  },
  {
    id: "3",
    username: "Jotaro Kujo",
    email: "jotaro@mail.com",
    password: "qweasd123",
    rooms: ["1"],
    contacts: ["2"],
  },
  {
    id: "2",
    username: "Funny Valentine",
    email: "funnyvalentine@mail.com",
    password: "dsaewq321",
    rooms: ["villains"],
    contacts: [],
  },
  {
    id: "4",
    username: "Gyro Zeppelli",
    email: "gyro@mail.com",
    password: "dsaewq321",
    rooms: ["2"],
    contacts: [],
  },
];

let rooms = [
  {
    id: "1",
    name: "Joestar",
    type: "group",
    chats: [],
  },
  {
    id: "2",
    users: [
      { id: "4", username: "Gyro Zeppelli" },
      { id: "1", username: "Johnny Joestar" },
    ],
    type: "personal",
    chats: [
      {
        id: "1",
        
        user: {
          userId: "4",
          id: "4",
          username: "Gyro Zeppelli",
        },
        text: "Pizza Mozzarella, Pizza Mozzarella, rella rella rella",
        timestamps: new Date(),
      },
    ],
  },
  {
    id: "4",
    name: "Jotaro Kujo",
    type: "personal",
    chats: [],
  },
  {
    id: "3",
    name: "villains",
    type: "group",
    chats: [],
  },
];

const userLogin = (req, res, next) => {
  const { email, password } = req.body;
  const userExist = userRegistered.find(
    (user) => user.email === email && user.password === password
  );

  if (userExist) {
    userExist.rooms = [
      ...userExist.rooms.map((item) => {
        return rooms.find(({ id }) => id === item);
      }),
    ];
    console.log(userExist);
    return res.status(200).json({
      success: true,
      data: userExist,
    });
  } else {
    return res.status(400).json({
      success: false,
      data: "Wrong email or password!",
    });
  }
};

const getRoomDataById = (req, res, next) => {
  const { roomId } = req.params;

  const room = rooms.find((item) => item.id === roomId);

  if (room) {
    return res.status(200).json({
      success: true,
      message: "data successfully retrieved!",
      data: room,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "data fail to retrieved!",
      data: [],
    });
  }
};

const addUser = ({userId, id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  // const isExist = users.map((user) => {
  //   if(user.username === username){
  //     return {
  //       ...user,
  //       id : id
  //     }
  //   }else{
  //     return user
  //   }
  // }).find(item => item.id === id);   
  
  // if (isExist) {
  //   console.log("id", id)
  //   console.log("exist", isExist);
  //   return { user: isExist };

  // } else {
    const newUser = {
      userId,
      id,
      username,
      room,
    };
    users.push(newUser);
    console.log(users);

    return { user: newUser };
  // }
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  // remove from array BUT return the removed item
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => {
  console.log(id, users)
  const user = users.find((user) => user.id === id)
  return user;
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = {
  getUser,
  addUser,
  removeUser,
  getUsersInRoom,
  userLogin,
  getRoomDataById,
};
