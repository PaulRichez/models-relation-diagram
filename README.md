# Strapi plugin models-relation-diagram

Entity Relationship Diagram => BETA Version

[![Downloads](https://img.shields.io/npm/dm/strapi4-models-relation-diagram?style=for-the-badge)](https://www.npmjs.com/package/strapi4-models-relation-diagram)
[![Install size](https://img.shields.io/npm/l/strapi-plugin-server-route-permission?style=for-the-badge)](https://github.com/PaulRichez/strapi4-plugin-route-permission/blob/main/Licence)

Create a diagram of your tables

![Alt text](images/v1.png)

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
