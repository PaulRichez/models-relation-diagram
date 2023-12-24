import elkLayout from "./layouts/elkLayout"

const createLayout = async (models, options) => {
  const nodes = [];
  const edges = [];
  console.log(models, options)
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
        const newEdge = {
          id: `${model.uid}-${column}-${columnData.target}`,
          type: options.edgesType,
          source: `${model.uid}`,
          target: `${columnData.target}`,
          sourceHandle: `${column}-right`,
          targetHandle: `${getTargetHandle(column, columnData, model)}-left`,
          markerEnd: 'hasMany',
          // markerStart: 'hasManyReversed',
        }
        if (columnData.relation == 'manyToMany') {
          newEdge.markerStart = 'hasManyReversed';
        }
        edges.push(newEdge);
      }
      if (columnData.type == 'component') {
        console.log(column)
        edges.push({
          id: `${model.uid}-${column}-${columnData.component}`,
          type: options.edgesType,
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


  return elkLayout(nodes, edges);
}

export default createLayout;
