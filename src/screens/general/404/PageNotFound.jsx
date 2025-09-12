import React from 'react';
import {CommonWebBox, SimpleText} from '@/styles/CommonComponents.jsx';
import commonTranslator from '@/translator/common';
function PageNotFound() {
  return (
    <CommonWebBox>
      <SimpleText text={commonTranslator.pageNotFound} />
    </CommonWebBox>
  );
}
export default PageNotFound;
