// elk layout flow
import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();


const elkLayout = async (nodes, edges) => {
  const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
    'elk.spacing.nodeNode': '80',
    // 'elk.direction': 'UP',
  };

  const graph = {
    id: 'root',
    layoutOptions: elkOptions,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: 'left',
      sourcePosition: 'right',
      // Hardcode a width and height for elk to use when layouting.
      width: 250,
      height: ((Object.keys(node.data.attributes).length * 28) + 2 + 32),
    })),
    edges: edges,
  };

  const elkGraph = await elk.layout(graph).then((layoutedGraph) => ({
    nodes: layoutedGraph.children.map((node) => ({
      ...node,
      position: { x: node.x, y: node.y },
    })),

    edges: layoutedGraph.edges,

  }))
    .catch(console.error);

  return elkGraph;
};


export default elkLayout;
