import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, message } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, clearCurrentUser } from '../actions/currentUserActions'; 

const SimpleTable = ({ dataSource, deleteUser, UpdateUser }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser); 
  const [openEditModal, setOpenEditModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue(currentUser);
    }
  }, [currentUser]);

  const showEditModal = (user) => {
    dispatch(setCurrentUser(user)); 
    setOpenEditModal(true);
  };

  const handleCancel = () => {
    setOpenEditModal(false);
    dispatch(clearCurrentUser());
    form.resetFields();
  };

  const handleUpdate = () => {
    form.validateFields().then(values => {
      UpdateUser(currentUser.id, values);
      setOpenEditModal(false);
      dispatch(clearCurrentUser()); 
      form.resetFields();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleDelete = (userId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        deleteUser(userId);
        message.success('User deleted successfully.');
      },
      onCancel() {
        console.log('Deletion cancelled.');
      },
    });
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => showEditModal(record)}>Edit</Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)} style={{marginLeft:'10px'}}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      {dataSource.length ? (
        <>
          <Table dataSource={dataSource} columns={columns} size={"medium"} pagination={{ position: ["bottomCenter"], }} />
          <Modal title="Edit User" visible={openEditModal} onCancel={handleCancel} onOk={handleUpdate}>
            <Form form={form} layout="vertical" name="form_in_modal">
              <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Name Field cannot be empty!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Email Field cannot be empty!' }]}>
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </>
      ) : (
        "No user data"
      )}
    </div>
  );
};

export default SimpleTable;
