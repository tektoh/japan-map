import React from 'react'
import Head from 'next/head'
import JapanMap from '../components/JapanMap'

const prefectures = {
  '徳島県': {
    color: '#ff0000'
  }
};

const Index = () => (
  <div>
    <Head>
      <title>日本地図</title>
    </Head>
    <main id="map">
      <JapanMap prefectures={prefectures}/>
    </main>
  </div>
);

export default Index;
