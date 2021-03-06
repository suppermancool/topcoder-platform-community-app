/**
 * Loader for the community's code chunks.
 */

import LoadingIndicator from 'components/LoadingIndicator';
import path from 'path';
import PT from 'prop-types';
import React from 'react';
import { AppChunk, webpack } from 'topcoder-react-utils';

export default function ChunkLoader({ base, member, meta }) {
  return (
    <AppChunk
      chunkName="mobile-community/chunk"
      renderClientAsync={() => import(/* webpackChunkName: "mobile-community/chunk" */ './Routes')
        .then(({ default: Routes }) => (
          <Routes base={base} member={member} meta={meta} />
        ))
      }
      renderPlaceholder={() => <LoadingIndicator />}
      renderServer={() => {
        const Routes = webpack.requireWeak(path.resolve(__dirname, './Routes'));
        return <Routes base={base} member={member} meta={meta} />;
      }}
    />
  );
}

ChunkLoader.propTypes = {
  base: PT.string.isRequired,
  member: PT.bool.isRequired,
  meta: PT.shape().isRequired,
};
