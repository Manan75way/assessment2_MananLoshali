interface RegisterUsers {
  username: string;
  email: string;
  password: string;
}

interface LoginUsers {
  email: string;
  password: string;
}

interface User {
  msg: string;
  token: string;
  users: {
    createdAt: string;
    email: string;
    password: string;
    username: string;
    __v: number;
    _id: string;
    [[Prototype]]: Object;
  };
}

interface Vehicle {
  vehicleName: string;
  vehicleType: string;
  vehicleNumber: string;
}
