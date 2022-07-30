import React from 'react';
import {CommonWebBox} from '../../../styles/Common';
import CreateNewCertificate from './components/CreateNewCertificate';
import DynamicParameters from './components/DynamicParameters';
import SelectFile from './components/SelectFile';
import Buttons from './components/Buttons';
import certTranslator from './Translator';

const Certificate = () => {
  return (
    <>
      <CommonWebBox
        header={certTranslator.createNewCert}
        child={<CreateNewCertificate />}
      />
      <CommonWebBox
        header={certTranslator.dynamicParameters}
        child={<DynamicParameters />}
      />
      <CommonWebBox child={<SelectFile />} />
      <CommonWebBox child={<Buttons />} />
    </>
  );
};

export default Certificate;
