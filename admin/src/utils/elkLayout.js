// elk layout flow
import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();


const elkLayout = async (models) => {
  const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
    'elk.spacing.nodeNode': '80',
    // 'elk.direction': 'UP',
  };
  const nodes = [];
  const edges = [];

  const getTargetHandle = (column, columnData, model) => {
    let columnTarget = 'id';
    const modelTarget = models.find((model) => model.uid === columnData.target);
    if (!modelTarget) {
      return 'id';
    }
    columnTarget = Object.keys(modelTarget.attributes).find((c) => modelTarget.attributes[c].inversedBy === column && modelTarget.attributes[c].target === model.uid);
    return columnTarget ? columnTarget : 'id';
  };

  models.forEach((model, index) => {
    Object.keys(model.attributes).forEach((column, index) => {
      const columnData = model.attributes[column];
      columnData.handleType = 'source';
      if (columnData.relation && columnData.relation !== undefined && columnData.relation !== 'morphToMany' && !columnData.inversedBy) {
        edges.push({
          id: `${model.uid}-${column}-${columnData.target}`,
          type: "smoothstep",
          source: `${model.uid}`,
          target: `${columnData.target}`,
          sourceHandle: `${column}-right`,
          targetHandle: `${getTargetHandle(column, columnData, model)}-left`,
        });
      }
      if (columnData.type == 'component') {
        console.log(column)
        edges.push({
          id: `${model.uid}-${column}-${columnData.component}`,
          type: "smoothstep",
          source: `${model.uid}`,
          target: `${columnData.component}`,
          sourceHandle: `${column}-right`,
          targetHandle: `${getTargetHandle(column, columnData, model)}-left`,
        });
      }
    });
    nodes.push(
      {
        id: model.uid,
        position: { x: 0, y: 0 },
        type: 'table',
        data: { ...model },
      });
  });

  //console.log('nodes', nodes);
  //console.log('edges', edges);


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

  // console.log(graph)

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
