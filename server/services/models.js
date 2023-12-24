'use strict';

module.exports = ({ strapi }) => ({
  getModels() {
    return strapi.db.config.models.map((m) => ({
      modelName: m.modelName,
      attributes: {
        "id": {
          "type": "integer",
          "required": true,
          "unique": true
        },
        ...m.attributes,
      },
      uid: m.uid,
      modelType: m.modelType,
      kind: m.kind,
      options: m.options,
    }));
  }
});
