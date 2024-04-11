/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col, Select, DatePicker } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import moment from "moment/moment";
import useUserStore from "@/hooks/useUserStore";
import { provinces, roles } from "@/shared/data";

const EditModal = ({ setIsOpen, isOpen, userInfo }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { updateItem, isFetching } = useUserStore();
  const { Option } = Select;
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      const updatedUserInfo = { ...userInfo };
      if (updatedUserInfo.dob) {
        updatedUserInfo.dob = dayjs(updatedUserInfo.dob);
      }
      form.setFieldsValue(updatedUserInfo);
    }
  }, [isOpen]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      setTimeout(async () => {
        try {
          await updateItem(userInfo.id, values);
          setConfirmLoading(false);
          setIsOpen(false);
        } catch (error) {
          setConfirmLoading(false);
          setIsOpen(true);
        }
      }, isFetching);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const disabledDate = (current) => {
    return current && current > moment().startOf("day");
  };

  return (
    <Modal
      title={<p className="text-[red] text-lg">Edit user</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Row gutter={16} className="relative">
          <Col span={15}>
            <Form.Item
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input name",
                },
                {
                  min: 5,
                  message: "Name must be at least 5 characters",
                },
              ]}
              colon={true}
              label="Name"
              labelCol={{ span: 24 }}
              className="absolute"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Please input dob",
                },
              ]}
              colon={true}
              label="Date of birth"
              labelCol={{ span: 24 }}
            >
              <DatePicker
                picker="date"
                disabledDate={disabledDate}
                format="YYYY-MM-DD"
                className="w-full"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative mt-1">
          <Col span={8}>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input phone",
                },
                {
                  pattern: /^\d{10}$/,
                  message: "Phone must be exactly 10 digits",
                },
              ]}
              colon={true}
              label="Phone"
              labelCol={{ span: 24 }}
              className="absolute"
            >
              <Input
                prefix={
                  <PhoneOutlined className="site-form-item-icon rotate-90" />
                }
                placeholder="Phone"
                maxLength={10}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please input role",
                },
              ]}
              colon={true}
              label="Role"
              labelCol={{ span: 24 }}
            >
              <Select placeholder="Select role">
                {roles.map((role) => (
                  <Select.Option key={role} value={role}>
                    {role}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="avatar"
              rules={[
                {
                  required: true,
                  message: "Please input URL",
                },
                {
                  type: "url",
                  message: "Please enter a valid URL",
                },
              ]}
              colon={true}
              label="Avatar"
              labelCol={{ span: 24 }}
            >
              <Input
                prefix={
                  <FileImageOutlined className="site-form-item-icon rotate-90" />
                }
                placeholder="url"
                autoFocus
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input email",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
          colon={true}
          label="Email"
          labelCol={{ span: 24 }}
          className="mt-2"
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="location"
          rules={[
            {
              required: true,
              message: "Please select location",
            },
          ]}
          colon={true}
          label="Location"
          labelCol={{ span: 24 }}
        >
          <Select
            mode="single"
            className="w-full"
            placeholder="Select location"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {provinces.map((province) => (
              <Option key={province} value={province}>
                {province}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
