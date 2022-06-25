import React from 'react';
import {CommonWebBox} from '../../styles/Common';
import CreateNewCertificate from './components/CreateNewCertificate';
import DynamicParameters from './components/DynamicParameters';

const Certificate = () => {
  return (
    <>
      <CommonWebBox child={<CreateNewCertificate />} />
      <CommonWebBox child={<DynamicParameters />} />
    </>
  );
};

export default Certificate;
