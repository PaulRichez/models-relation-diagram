'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = {
      config: strapi.config.get('plugin.models-relation-diagram'),
      data: strapi
        .plugin('models-relation-diagram')
        .service('models')
        .getModels()
    };
  },
});
