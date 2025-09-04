import React from 'react';
import {CommonWebBox} from '@/styles';
import Translate from '../translate';
import commonTranslator from '@/translator/common';
function Details(props) {
  return (
    <CommonWebBox
      header={commonTranslator.view + ' ' + Translate.info}
      backBtn={true}
      onBackClick={() => props.setMode('list')}
    />
  );
}
export default Details;
