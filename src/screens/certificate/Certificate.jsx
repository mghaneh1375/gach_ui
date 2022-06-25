import React from 'react';
import {CommonWebBox} from '../../styles/Common';
import CreateNewCertificate from './components/CreateNewCertificate';
import DynamicParameters from './components/DynamicParameters';
import SelectFile from './components/SelectFile';
import Buttons from './components/Buttons';

const Certificate = () => {
  return (
    <>
      <CommonWebBox child={<CreateNewCertificate />} />
      <CommonWebBox child={<DynamicParameters />} />
      <CommonWebBox child={<SelectFile />} />
      <CommonWebBox child={<Buttons />} />
    </>
  );
};

export default Certificate;
