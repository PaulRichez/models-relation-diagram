/*
 *
 * HomePage
 *
 */

import React, { useCallback } from 'react';

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

const HomePage = () => {
  const { data, status } = useQuery([], () => api.getModels());
  const { formatMessage, formatDate } = useIntl();
  let models = [];
  if (status === 'success') {
    models = data.data?.data;
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
          <Box background="neutral0" hasRadius style={{ height: "80vh", width: "100%" }}>
            <ReactFlowProvider>
              <LayoutFlow models={models} />
            </ReactFlowProvider >
          </Box>
        </ContentLayout>
      </Layout>
    </Box>
  );
};

export default HomePage;
