import React from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { mapStyle, markerStyle } from './style';

export function MapBlock() {
  return (
    <>
      {/* <div css={mapStyle} /> */}
      <Map
        center={{ lat: 37.349733, lng: 127.106970, }}
        level={3}
        css={mapStyle}
      >
        <MapMarker position={{ lat: 37.349733, lng: 127.106970, }} />
        <CustomOverlayMap position={{ lat: 37.349733, lng: 127.106970, }}>
          <div css={markerStyle}>KALL 본점</div>
        </CustomOverlayMap>
      </Map>
    </>
  );
}
