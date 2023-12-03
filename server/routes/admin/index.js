module.exports = {
  type: "admin",
  routes: [
    {
      method: 'GET',
      path: '/models',
      handler: 'models.index',
      config: {
        policies: [],
      },
    },
  ],
};
