import React from 'react';
import { Handle, Position } from 'reactflow';
import './main.css';
import { KeyIcon } from '../keyIcon';

function TableNode({ data }) {
  return (
    <div className="table">
      <div
        style={{ backgroundColor: data.schemaColor }}
        className="table__name">
        {data.modelName ? data.modelName : data.uid}
      </div>
      <div className="table__columns">
        {Object.keys(data.attributes).map((column, index) => (
          <div
            key={index}
            className={"column-name"}
          >
            {data.attributes[column].handleType && <Handle
              type='source'
              position={Position.Right}
              id={`${column}-right`}
              isConnectable={false}
              className={"right-handle source-handle"}
            />}
            {data.attributes[column].handleType && <Handle
              type='target'
              position={Position.Left}
              isConnectable={false}
              id={`${column}-left`}
              className={"left-handle target-handle"}
            />}

            <div className="column-name__inner">
              <div className="column-name__name">
                {column == 'id' && <KeyIcon />}
                {column}
              </div>
              <div className="column-name__type">
                {data.attributes[column].type}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableNode;
