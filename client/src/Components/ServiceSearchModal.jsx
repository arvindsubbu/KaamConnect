import React,{useState,useEffect} from 'react'
import { Modal,Input,List,Typography} from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { serviceCategories } from '../utils/serviceCategories';

const {Text} = Typography;
function ServiceSearchModal({open,onCancel,setSelectedService,selectedService, selectedLocation}) {
    const [debouncedSearch,setDebouncedSearch] = useState('');
    const navigate = useNavigate();
  // debounce for service search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(selectedService);
    }, 300);
    return () => clearTimeout(handler);
  }, [selectedService]);
 
   const buildUrl = (service, location) => {
    let url = "/service";
    if (location && service) {
      url += `/${location.toLowerCase()}/${service.toLowerCase()}`;
    }else if(service){
      url += `/${service.toLowerCase()}`;
    }
    return url;
  };

  return (
    <Modal
          title="Find a Service"
          open={open}
          footer={null}
          onCancel={onCancel}
          width={600}
          styles={{
            body: { maxHeight: "60vh", overflowY: "auto" },
          }}
        >
          {/* Search inside modal */}
          <Input
            autoFocus
            placeholder="Search for service!!"
            prefix={<SearchOutlined />}
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="mb-4"
          />

          {/* Category list */}
          <List
            dataSource={serviceCategories.filter((cat) =>
              cat.label.toLowerCase().includes((debouncedSearch || '').toLowerCase())
            )}
            renderItem={(cat) => (
              <List.Item
                onClick={() => {
                  // setSelectedService(cat.label);
                  //setIsModalOpen(false);
                  onCancel();
                  //use slugify to remove unwanted char
                  const url = buildUrl(cat.label, selectedLocation);
                  navigate(url);
                }}
                className="cursor-pointer hover:bg-gray-50 rounded px-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <Text strong>{cat.label}</Text>
                </div>
              </List.Item>
            )}
          />
        </Modal>
  )
}

export default ServiceSearchModal