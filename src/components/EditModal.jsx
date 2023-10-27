import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function EditModal() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      avatar: "",
      address: "",
      age: "",
      agree: false,
    },

    onSubmit: (values) => {
      try {
        const res = axios.put(
          `https://652fa0cc6c756603295d6229.mockapi.io/users/${id}`,
          {
            name: values.name,
            avatar: values.avatar,
            address: values.address,
            age: values.address,
          }
        );
        console.log("check add user", res);
        alert("Edit thành công");
        navigate("/home");
      } catch (error) {
        console.log("Error Adding User", error);
      }
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(3, "Must be 3 characters or more"),
      avatar: Yup.string().required("Required.").url("Please type URL"),
      address: Yup.string().required("Required."),
      age: Yup.number()
        .required("Required.")
        .max(120, "Please type age from 1 to 120"),
    }),
  });

  return (
    <>
      <div
        className="form"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            flexDirection: "column",
            display: "flex",
            width: "90%",
            border: "1px solid black",
            padding: "20px",
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <span></span>
          {formik.errors.name && (
            <Typography variant="caption" color="red">
              {formik.errors.name}
            </Typography>
          )}

          <TextField
            label="Age"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
          />
          <span></span>
          {formik.errors.age && (
            <Typography variant="caption" color="red">
              {formik.errors.age}
            </Typography>
          )}

          <TextField
            label="Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          {formik.errors.address && (
            <Typography variant="caption" color="red">
              {formik.errors.address}
            </Typography>
          )}
          <TextField
            label="avatar"
            name="avatar"
            value={formik.values.avatar}
            onChange={formik.handleChange}
          />
          {formik.errors.avatar && (
            <Typography variant="caption" color="red">
              {formik.errors.avatar}
            </Typography>
          )}

          <Button type="submit">Send</Button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default EditModal;
