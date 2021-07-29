import React from "react"; 
import { Button, Tooltip } from 'antd'; 
import { PlusOutlined } from '@ant-design/icons'; 

// Déclaration du composant fonction 'AddButton'
export default function AddButton(props) {
  return (
    <>
      <Tooltip title={props.content}>
        <Button
            type="primary" 
            shape="round" 
            icon={<PlusOutlined />} 
            size="large" 
            onClick={() => props.onClick()} 
        >
          {props.content}
        </Button>
      </Tooltip>
    </>
  );
}