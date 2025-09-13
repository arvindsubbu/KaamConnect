import React from "react";
import { Modal, Input, Button, List } from "antd";
import { EnvironmentOutlined, AimOutlined } from "@ant-design/icons";

function LocationModal({
  open,
  onCancel,
  suggestions,
  locationSearch,
  setLocationSearch,
  onUseCurrentLocation,
  onSelectLocation,
}) {
  return (
    <Modal
      title="Select Location"
      open={open}
      footer={null}
      onCancel={onCancel}
      width={700}
      styles={{ body: { maxHeight: "70vh", overflowY: "auto" } }}
    >
      {/* Search Input */}
      <Input
        placeholder="Search for your city / area"
        prefix={<EnvironmentOutlined />}
        value={locationSearch}
        onChange={(e) => setLocationSearch(e.target.value)}
        className="mb-4"
      />
      <Button
        type="primary"
        block
        className="mb-4"
        onClick={onUseCurrentLocation}
      >
        <AimOutlined /> Use My Current Location
      </Button>

      {/* Suggestions List */}
      <List
        dataSource={suggestions}
        renderItem={(item) => (
          <List.Item
            onClick={() => onSelectLocation(item)}
            className="cursor-pointer hover:bg-gray-50 rounded px-2"
          >
            {item.name}
          </List.Item>
        )}
      />
    </Modal>
  );
}

export default LocationModal;
