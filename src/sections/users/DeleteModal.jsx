/* eslint-disable no-unused-vars */
import React from "react";
import { Modal } from "antd";

function showDeleteConfirm({ userId, deleteItem }) {
  const confirm = Modal.confirm;
  confirm({
    title: "Delete class",
    content:
      "Do you really want to delete “Username” ? This user cannot be restored.",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      deleteItem(userId);
    },
  });
}

export default showDeleteConfirm;
