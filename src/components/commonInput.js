import React from "react";
import { Button, Form, Input, message } from "antd";

const InputHandler = ({ onSubmit, editMode = false }) => {
  const [form] = Form.useForm();

  // const validateEmail = (email) => {
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return regex.test(email);
  // };

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        // if (!validateEmail(values.email)) {
        //   message.error("Invalid email!");
        //   return;
        // }
        onSubmit(values);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <div className="header-box">
      <Form
        form={form}
        layout="vertical"
        name="inputForm"
        initialValues={{ name: '', email: '' }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Name cannot be empty!' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Email cannot be empty!' },
            { type: 'email', message: 'Invalid email format!' }
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            {editMode ? "Edit user" : "Add user"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputHandler;
