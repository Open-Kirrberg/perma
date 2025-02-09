import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function HomePage() {
  return (
    <Layout>
      <h1>Fruit Trees and Areas</h1>
      <BrowserOnly fallback={<div>Lade Map …</div>}>
        {() => {
          const Map = require('../components/Map/index').default;
          return <Map />;
        }}
      </BrowserOnly>
    </Layout>
  );
}