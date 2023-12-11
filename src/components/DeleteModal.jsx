import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast, { Toaster } from "react-hot-toast";
import { deleteUser } from "../services/UserServices";

export default function DeleteModal({
  open,
  handleClose,
  dataDelete,
  fetchAllUser,
}) {
  const handleSubmit = async () => {
    try {
      let res = await deleteUser(dataDelete);
      if (res && res.status === 200) {
        toast.success("Xóa thành công");
        handleClose();
        fetchAllUser();
      }
    } catch (error) {
      console.log("Error deleting user", error);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Modal"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete user ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
