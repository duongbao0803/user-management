import { useQuery, useMutation, useQueryClient } from "react-query";
import { notification } from "antd";
import { addNewUser, editUser, getAllUsers, removeUser } from "@/api/userApi";

const useUserStore = () => {
  const queryClient = useQueryClient();

  const fetchUsers = async () => {
    const res = await getAllUsers();
    return res.data.data;
  };

  const updateUser = async ({ itemId, updatedItem }) => {
    await editUser(itemId, updatedItem);
  };

  const addUser = async (addItem) => {
    await addNewUser(addItem);
  };

  const deleteUser = async (itemId) => {
    await removeUser(itemId);
    return itemId;
  };

  const { data: users = [], isLoading: isFetching } = useQuery(
    "users",
    fetchUsers,
    {
      retry: 3,
      retryDelay: 5000,
    }
  );

  const updateItemMutation = useMutation(updateUser, {
    onSuccess: () => {
      notification.success({
        message: "Edit Successful",
        description: "Edit user successful",
        duration: 2,
      });
      queryClient.invalidateQueries("users");
    },
    onError: (err) => {
      console.error("Error update", err);
      notification.error({
        message: "Edit Failed",
        description: "Edit user failed",
        duration: 2,
      });
    },
  });

  const addItemMutation = useMutation(addUser, {
    onSuccess: () => {
      notification.success({
        message: "Add Successful",
        description: "Add user successful",
        duration: 2,
      });
      queryClient.invalidateQueries("users");
    },
    onError: (err) => {
      console.error("Error add", err);
      notification.error({
        message: "Add Failed",
        description: "Add user failed",
        duration: 2,
      });
    },
  });

  const deleteItemMutation = useMutation(deleteUser, {
    onSuccess: () => {
      notification.success({
        message: "Delete Successful",
        description: "Delete user successful",
        duration: 2,
      });
      queryClient.invalidateQueries("users");
    },
    onError: (err) => {
      console.error("Error delete", err);
      notification.error({
        message: "Delete Failed",
        description: "Delete user failed",
        duration: 2,
      });
    },
  });

  const updateItem = async (itemId, updatedItem) => {
    await updateItemMutation.mutateAsync({ itemId, updatedItem });
  };

  const addItem = async (addItem) => {
    await addItemMutation.mutateAsync(addItem);
  };

  const deleteItem = async (itemId) => {
    await deleteItemMutation.mutateAsync(itemId);
  };

  return {
    users,
    fetchUsers,
    updateItem,
    addItem,
    deleteItem,
    isFetching,
  };
};

export default useUserStore;
