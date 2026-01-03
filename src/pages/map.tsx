import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function MapPage() {
  return (
    <div className="map-fullscreen-page">
      <BrowserOnly fallback={<div className="map-loading">Lade Map …</div>}>
        {() => {
          const Map = require('../components/Map/index').default;
          return <Map />;
        }}
      </BrowserOnly>
    </div>
  );
}