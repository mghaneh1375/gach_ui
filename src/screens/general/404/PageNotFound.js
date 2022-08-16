import React from 'react';
import {CommonWebBox, SimpleText} from '../../../styles/Common';
import commonTranslator from '../../../tranlates/Common';

function PageNotFound() {
  return (
    <CommonWebBox>
      <SimpleText text={commonTranslator.pageNotFound} />
    </CommonWebBox>
  );
}

export default PageNotFound;
