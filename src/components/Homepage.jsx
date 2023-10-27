import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { Button } from "@mui/material";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 100 },
  {
    id: "age",
    label: "Age",
    minWidth: 170,
    align: "right",
  },
  {
    id: "avatar",
    label: "Avatar",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
];

// ...

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [userEdit, setUserEdit] = useState({});

  const [dataDelete, setDataDelete] = useState("");

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    try {
      const res = await axios.get(
        "https://652fa0cc6c756603295d6229.mockapi.io/users"
      );
      const sortedUsers = res.data.sort((a, b) => b.age - a.age);
      setUser(sortedUsers);
    } catch (error) {
      console.log("Error fetching user", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (item) => {
    setDataDelete(item.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Link to="/add" style={{ textDecoration: "none" }}>
        <Button style={{ display: "flex" }}> + Add user</Button>
      </Link>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {user
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "avatar") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <img
                                src={value}
                                alt="Avatar"
                                style={{ width: "100px" }}
                              />
                            </TableCell>
                          );
                        }
                        if (column.id !== "Action") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                        if (column.id === "Action") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <DeleteIcon
                                onClick={() => handleDelete(row)}
                                style={{ cursor: "pointer" }}
                              />
                              <Link to={`/edit/${row.id}`}>
                                <EditIcon></EditIcon>
                              </Link>
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={user.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <DeleteModal
        open={open}
        handleClose={handleClose}
        dataDelete={dataDelete}
        fetchAllUser={fetchAllUser}
      />
    </>
  );
}
