import React from 'react';
import {routes} from '../../../../../API/APIRoutes';
import UploadFile from '../../../../../components/web/UploadFile';
import translator from '../../Translator';

const AddBatchFiles = props => {
  return (
    <UploadFile
      url={routes.addBatchFiles + 'question'}
      token={props.token}
      maxFileSize={30}
      accept={['.zip']}
      toggleShow={props.toggleShowPopUp}
      title={translator.addBatchFiles}
      multi={false}
    />
  );
};

export default AddBatchFiles;
