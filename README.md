# Strapi plugin models-relation-diagram

Entity Relationship Diagram => BETA Version

[![Downloads](https://img.shields.io/npm/dm/strapi4-models-relation-diagram?style=for-the-badge)](https://www.npmjs.com/package/strapi4-models-relation-diagram)
[![Install size](https://img.shields.io/npm/l/strapi-plugin-server-route-permission?style=for-the-badge)](https://github.com/PaulRichez/smodels-relation-diagram/blob/master/Licence)

Create a diagram of every strapi collections and components with fields and relation.


Possibility of displaying or not all collections and components.  
Possibility to choose the layout among Elk and dagre.  
Possibility to choose the type of edge.  


![Alt text](https://github.com/PaulRichez/models-relation-diagram/blob/master/images/v1.png?raw=true)

## Plugin Configurations
```js
"models-relation-diagram": {
    enabled: true,
    config: {
      defaultExcludeAdmin: true, // hide admin:: + strapi:: + webhook + plugin::i18n.locale + plugin::content-releases
      defaultHideUpload: true, // hide plugin::upload.file + plugin::upload.folder
      defaultExcludeComponents: false, // hide components
      defaultLayout: 'dagre', // default layout: ELK,Dagre
      defaultEdgesType: 'step', // default edge type: straight,step,smoothstep,bezier
      hideMarkers: true, // hide relation marker on edges 
    }
  },
```
