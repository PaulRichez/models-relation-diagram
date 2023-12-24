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

import ReactFlow, {
  Controls,
  ReactFlowProvider,
} from 'reactflow';
import styled from 'styled-components';
import 'reactflow/dist/style.css';

import LayoutFlow from '../../components/LayoutFLow';
import Header from '../../components/header';

const HomePage = () => {
  const { data, status } = useQuery([], () => api.getModels());
  const { formatMessage, formatDate } = useIntl();
  let models = [];
  if (status === 'success') {
    models = data.data?.data;
  }

  const [options, setOptions] = useState({
    edgesType: 'smoothstep',
    layout: 'elk',
  });
  function toggleOption(optionName, optionValue = null) {
    setOptions({
      ...options,
      [optionName]: optionValue || !options[optionName],
    });
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
          <Header options={options} toggleOption={toggleOption} />
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
