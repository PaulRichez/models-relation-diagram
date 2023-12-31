import elkLayout from "./layouts/elkLayout"
import dagreLayout from "./layouts/dagreLayout"

const createLayout = async (models, options) => {
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

  models = models.filter((model) => options.models.includes(model.uid));

  models.forEach((model, index) => {
    Object.keys(model.attributes).forEach((column, index) => {
      const columnData = model.attributes[column];
      columnData.handleType = 'source';
      if (columnData.relation && columnData.relation !== undefined && columnData.relation !== 'morphToMany' && !columnData.inversedBy) {
        if (models.map((m) => m.uid).includes(columnData.target)) {
          const newEdge = {
            id: `${model.uid}-${column}-${columnData.target}`,
            type: options.edgesType,
            source: `${model.uid}`,
            target: `${columnData.target}`,
            sourceHandle: `${column}-right`,
            targetHandle: `${getTargetHandle(column, columnData, model)}-left`,
          }
          if (!options.hideMarkers) {
            if (columnData.relation == 'manyToMany') {
              newEdge.markerStart = 'hasManyReversed';
              newEdge.markerEnd = 'hasMany';
            }
            if (columnData.relation == 'oneToMany') {
              newEdge.markerStart = 'hasManyReversed';
            }
            if (columnData.relation == 'manyToOne') {
              newEdge.markerEnd = 'hasMany';
            }
          }
          edges.push(newEdge);
        }
      }
      if (columnData.type == 'component') {
        if (models.map((m) => m.uid).includes(columnData.component)) {
          edges.push({
            id: `${model.uid}-${column}-${columnData.component}`,
            type: options.edgesType,
            source: `${model.uid}`,
            target: `${columnData.component}`,
            sourceHandle: `${column}-right`,
            targetHandle: `${getTargetHandle(column, columnData, model)}-left`,
            markerStart: columnData.repeatable ? 'hasManyReversed' : '',
          });
        }
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
  switch (options.layout) {
    case 'dagre':
      return dagreLayout(nodes, edges);
    case 'elk':
      return elkLayout(nodes, edges);
    default:
      return elkLayout(nodes, edges);
  }
}

export default createLayout;
