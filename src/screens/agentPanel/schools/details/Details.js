import React from 'react';
import {CommonWebBox} from '../../../../styles/Common';
import Translate from '../Translate';
import commonTranslator from '../../../../tranlates/Common';

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
