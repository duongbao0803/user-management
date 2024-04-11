import axios from "axios";

const API_BASE_URL = "https://65460c46fe036a2fa9551d05.mockapi.io";

const fetchTodos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch todos");
  }
};

const addTodo = async (todo) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/todos`, todo);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add todo");
  }
};

const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/todos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete todo");
  }
};

const updateTodo = async ({ id, text }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, { text });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update todo");
  }
};

export { fetchTodos, addTodo, deleteTodo, updateTodo };
