/*
 *
 * HomePage
 *
 */

import React, { useState } from 'react';

import pluginId from '../../pluginId';


import { ContentLayout, HeaderLayout, Box, Layout } from "@strapi/design-system";

import { useQuery } from "react-query";

import { useIntl } from 'react-intl';
import getTrad from "../../utils/getTrad";

import { api } from "../../utils/api";

import { ReactFlowProvider } from 'reactflow';

import LayoutFlow from '../../components/LayoutFLow';
import Header from '../../components/header';

const HomePage = () => {
  const { data, status } = useQuery([], () => api.getModels());
  const { formatMessage, formatDate } = useIntl();
  let models = [];
  let config = {};
  const [modelsInit, setModelsInit] = useState(false);
  const [options, setOptions] = useState({
    edgesType: 'smoothstep',
    layout: 'elk',
    models: []
  });
  function toggleOption(optionName, optionValue = null) {
    setOptions({
      ...options,
      [optionName]: optionValue || !options[optionName],
    });
  }

  if (status === 'success') {
    models = data.data?.data;
    config = data.data?.config;
    console.log(config)
    if (!modelsInit) {
      setModelsInit(true);
      const newOptions = {
        models: models
      }
      if (config.defaultExcludeAdmin) {
        newOptions.models = newOptions.models.filter((model) => !model.uid.startsWith("admin::"));
        newOptions.models = newOptions.models.filter((model) => !model.uid.startsWith("strapi::"));
        newOptions.models = newOptions.models.filter((model) => model.uid != "webhook");
        newOptions.models = newOptions.models.filter((model) => model.uid != "plugin::i18n.locale");
      }
      if (config.defaultHideUpload) {
        newOptions.models = newOptions.models.filter((model) => model.uid != "plugin::upload.file");
        newOptions.models = newOptions.models.filter((model) => model.uid != "plugin::upload.folder");
      }
      if (config.defaultExcludeComponents) {
        newOptions.models = newOptions.models.filter((model) => model.modelType != "component");
      }
      if (config.defaultLayout) {
        newOptions.layout = config.defaultLayout;
      }
      if (config.defaultEdgesType) {
        newOptions.edgesType = config.defaultEdgesType;
      }
      if (config.hideMarkers)  {
        newOptions.hideMarkers = config.hideMarkers;
      }
      newOptions.models = newOptions.models.map((model) => model.uid),
        setOptions({
          ...options,
          ...newOptions,
        });
    }
  }

  return (
    <Box background="neutral100">
      <Layout>
        <>
          <HeaderLayout
            title={formatMessage({ id: getTrad({ pluginId }), defaultMessage: 'Models relation diagram' })}
            as="h2"
          />
        </>
        <ContentLayout>
          <Header options={options} toggleOption={toggleOption} models={models} />
          <Box background="neutral0" hasRadius style={{ height: "calc(100vh - 280px)", width: "100%" }}>
            <ReactFlowProvider>
              <LayoutFlow models={models} options={options} />
            </ReactFlowProvider >
          </Box>
        </ContentLayout>
      </Layout>
    </Box>
  );
};

export default HomePage;
