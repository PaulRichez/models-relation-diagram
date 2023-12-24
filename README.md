# Strapi plugin models-relation-diagram

Entity Relationship Diagram => BETA Version

Create a diagram of your tables

![Alt text](images/v1.png)

## Plugin Configurations
```js
"models-relation-diagram": {
    enabled: true,
    config: {
      defaultExcludeAdmin: true, // hide admin:: + strapi:: + webhook + plugin::i18n.locale
      defaultHideUpload: true, // hide plugin::upload.file + plugin::upload.folder
      defaultExcludeComponents: false, // hide components
      defaultLayout: 'dagre', // default layout: ELK,Dagre
      defaultEdgesType: 'step', // default edge type: straight,step,smoothstep,bezier
      hideMarkers: true, // hide relation marker on edges 
    }
  },
```
