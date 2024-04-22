/* eslint-disable no-unused-vars */
import { Table } from "antd";
import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Input, Button, Tag } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import AddModal from "./AddModal";
import useUserStore from "@/hooks/useUserStore";
import DropdownBox from "@/components/Dropdown";
import { formatDate } from "@/utils/dateUtils";
import ExportButton from "./ExportButton";

const UserList = () => {
  const { users, isFetching } = useUserStore();

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      width: "20%",
      className: "first-column",
    },
    {
      title: "Date of birth",
      dataIndex: "dob",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      width: "5%",
      render: (avatarUrl) => (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="rounded-[100%] w-[40px] h-[40px]"
        />
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "13%",
      filters: [
        { text: "PM", value: "PM" },
        { text: "DEVELOPER", value: "DEVELOPER" },
        { text: "TESTER", value: "TESTER" },
        { text: "BA", value: "BA" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        let color;
        switch (role) {
          case "PM":
            color = "blue";
            break;
          case "DEVELOPER":
            color = "green";
            break;
          case "TESTER":
            color = "red";
            break;
          case "BA":
            color = "orange";
            break;
          default:
            color = "default";
        }
        return (
          <Tag color={color} key={role}>
            {role}
          </Tag>
        );
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "12%",
    },
    {
      title: "Location",
      dataIndex: "location",
      width: "15%",
    },
    {
      title: "",
      dataIndex: "",
      render: () => <DropdownBox userId={userId} userInfo={userInfo} />,
    },
  ];

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [searchValue, setSearchValue] = useState("");
  const [userId, setUserId] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const [filterData, setFilterData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const deferredSearchValue = useDeferredValue(searchValue, {
    timeoutMs: 1000,
  });

  useEffect(() => {
    if (!users || users.length === 0) {
      return;
    }
    handleSearch(deferredSearchValue);
  }, [deferredSearchValue, users]);

  const handleSearch = useMemo(() => {
    return (value) => {
      if (!users) {
        console.error("User data is undefined or empty");
        return;
      }
      const searchData = users.filter((user) => {
        return user?.fullName.toLowerCase().includes(value.toLowerCase());
      });
      setFilterData(searchData.length > 0 ? searchData : []);
    };
  }, [users]);

  const handleSort = () => {
    let sortedData = [...filterData];

    if (sortedData.length > 0) {
      sortedData = sortedData.sort((a, b) =>
        sortOrder.includes("asc")
          ? a.fullName.localeCompare(b.fullName)
          : b.fullName.localeCompare(a.fullName)
      );

      setSortOrder(sortOrder.includes("asc") ? "desc" : "asc");
      setFilterData(sortedData);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const handleRowClick = (value) => {
    setUserId(value.id);
    setUserInfo(value);
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-x-2">
            <Input
              placeholder="Search by..."
              className="sm:mb-5 max-w-lg sm:w-[300px] h-8 rounded-lg"
              onChange={(e) => setSearchValue(e.target.value)}
              data-testid="inputSearch"
            />
            <Button
              className="flex items-center"
              onClick={handleSort}
              type="primary"
            >
              <FilterOutlined className="align-middle" />
              Sort
            </Button>
          </div>
          <div className="flex gap-x-2">
            <div>
              <ExportButton />
            </div>
            <div>
              <Button type="primary" onClick={() => setIsOpen(true)}>
                + Add User
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Table
        id="myTable"
        columns={columns}
        dataSource={
          filterData
            ? filterData.map((record) => ({
                ...record,
                key: record.id,
                dob: formatDate(record.dob),
              }))
            : users.map((record) => ({
                ...record,
                key: record.id,
                dob: formatDate(record.dob),
              }))
        }
        pagination={{
          ...tableParams.pagination,
          position: ["bottomCenter"],
        }}
        loading={isFetching}
        onChange={handleTableChange}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      <AddModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default UserList;
