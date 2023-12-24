import React, { useEffect } from 'react';
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import styled from 'styled-components';
import 'reactflow/dist/style.css';

import TableNode from '../TableNode';

import elkLayout from '../../utils/elkLayout';

import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Markers } from '../markers';

const nodeTypes = { table: TableNode };

const ControlsStyled = styled(Controls)`
  button {
    background-color: ${(props) => props.theme.controlsBg};
    color: ${(props) => props.theme.controlsColor};
    border-bottom: 1px solid ${(props) => props.theme.controlsBorder};

    &:hover {
      background-color: ${(props) => props.theme.controlsBgHover};
    }

    path {
      fill: currentColor;
    }
  }
`;


const LayoutFlow = ({ models }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  useEffect(() => {
    const layout = async () => {
      const elkGraph = await elkLayout(models);
      console.log(elkGraph)
      setNodes(elkGraph.nodes);
      setEdges(elkGraph.edges);
    };
    layout();
  }
    , [models]);

  let view;
  if (models && models.length > 0) {
    view = <>
      <Markers />
      <ReactFlow
        init
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <ControlsStyled />
      </ReactFlow >
    </>

  } else {
    view = <LoadingIndicatorPage />;
  }


  return (
    view
  );
};

export default LayoutFlow;
