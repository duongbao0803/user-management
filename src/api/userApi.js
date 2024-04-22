// import axiosClient from "@/config/axiosClient";
import axios from "axios";

const getAllUsers = () => {
  return axios.get("http://localhost:8080/api/v1");
};

const editUser = (itemId, updatedItem) => {
  return axios.put(
    `http://localhost:8080/api/v1/update-user/${itemId}`,
    updatedItem
  );
};

const addNewUser = (addItem) => {
  return axios.post("http://localhost:8080/api/v1/create-user", addItem);
};

const removeUser = (itemId) => {
  return axios.delete(`http://localhost:8080/api/v1/delete-user/${itemId}`);
};

export { getAllUsers, editUser, addNewUser, removeUser };
