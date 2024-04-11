import axiosClient from "@/config/axiosClient";

const getAllUsers = () => {
  return axiosClient.get("/users");
};

const editUser = (itemId, updatedItem) => {
  return axiosClient.put(`/users/${itemId}`, updatedItem);
};

const addNewUser = (addItem) => {
  return axiosClient.post("/users", addItem);
};

const removeUser = (itemId) => {
  return axiosClient.delete(`/users/${itemId}`);
};

export { getAllUsers, editUser, addNewUser, removeUser };
