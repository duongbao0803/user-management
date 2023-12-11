import config from "../util/cus-axios";

const getAllUser = () => {
  return config.get("/users");
};

const getUserInfo = (id) => {
  return config.get(`/users/${id}`);
};

const addUser = (data) => {
  return config.post("/users", data);
};

const editUser = (id, dataUser) => {
  return config.put(`/users/${id}`, dataUser);
};

const deleteUser = (dataDelete) => {
  return config.delete(`/users/${dataDelete}`);
};

export { getAllUser, addUser, editUser, deleteUser, getUserInfo };
