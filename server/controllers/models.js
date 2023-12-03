'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = {
      data: strapi
        .plugin('models-relation-diagram')
        .service('models')
        .getModels()
    };
  },
});
