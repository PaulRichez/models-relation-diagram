import React from 'react';
import { Handle, Position } from 'reactflow';
import './main.css';

import { useIntl } from 'react-intl';
import getTrad from "../../utils/getTrad";

import { Uid, FeatherSquare } from '@strapi/icons';

function TableNode({ data }) {
  const { formatMessage, formatDate } = useIntl();
  return (
    <div className="table">
      <div
        style={{ backgroundColor: data.schemaColor }}
        className="table__name">
        <div> {data.uid}</div>
        {data.options?.draftAndPublish && <div className="table__draft-and-publish" title={formatMessage({ id: getTrad('Draft_and_publish'), defaultMessage: 'Draft and publish' })}><FeatherSquare /></div>}
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
                {column}
              </div>
              <div className="column-name__type">
                {data.attributes[column].type}
              </div>
              <div className="column-name__key">
                {column == 'id' && <Uid />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableNode;
