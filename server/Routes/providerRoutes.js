const providerRouter = require('express').Router();

const {createProvider,
  getProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
  searchProviders} = require('../Controller/providerController');

  providerRouter.get('/search',searchProviders);


  module.exports = providerRouter;