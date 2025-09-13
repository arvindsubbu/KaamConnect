import React, { useState } from "react";
import {
  Modal,
  Avatar,
  Typography,
  DatePicker,
  Input,
  Select,
  Button,
  Form,
} from "antd";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function BookServiceModal({ open, onCancel, selectedWorker, onConfirm }) {
  const { form } = Form.useForm();
 
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      title={`Book ${selectedWorker?.service}`}
    >
      {/* Worker Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar src={selectedWorker?.photo} size={48} />
        <div>
          <Text strong>{selectedWorker?.name}</Text>
          <br />
          <Text type="secondary">{selectedWorker?.service}</Text>
          <div className="text-yellow-500">⭐ {selectedWorker?.rating}</div>
          <Text strong>{selectedWorker?.price}</Text>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
         // console.log("from booking modal", values);
          if(onConfirm){
            onConfirm(values)
          }
          onCancel();
        }}
      >
        <Form.Item
          label="Date & Time"
          name="dateTime"
          rules={[{ required: true, message: "Please select date & time" }]}
        >
          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            className="w-full"
            placeholder="Select preferred date & time"
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <TextArea
            rows={3}
            placeholder="Enter the address where the service is required"
          />
        </Form.Item>

        <Form.Item
          label="Work Details"
          name="workDetails"
          rules={[{ required: true, message: "Please describe the work" }]}
        >
          <TextArea
            rows={3}
            placeholder="Describe the exact work (eg., Fix the leaking tap in kitchen)"
          />
        </Form.Item>

        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          rules={[
            { required: true, message: "Please select the payment method" },
          ]}
        >
          <Select placeholder="Select payment method">
            <Option value="cash">Cash on Service</Option>
            <Option value="online">Pay Online</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <TextArea
            rows={2}
            placeholder="Any additional instructions? (optional)"
          />
        </Form.Item>

        <Form.Item>
          <div className="flex flex-row md:flex-col gap-2">
            <Button
              type="primary"
              size="large"
              className="flex-1"
              htmlType="submit"
            >
              Confirm Booking
            </Button>
            <Button
              size="large"
              className="flex-1"
              onClick={() => {
                form.resetFields();
                onCancel();
              }}
            >
              Cancel Booking
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default BookServiceModal;
