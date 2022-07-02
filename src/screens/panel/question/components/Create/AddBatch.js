import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import UploadFile from '../../../../../components/web/UploadFile';
import translator from '../../Translator';

const AddBatch = props => {
  const [result, setResult] = useState(undefined);
  const [finalMsg, setFinalMsg] = useState();

  React.useEffect(() => {
    if (result === undefined || result.length === 0) return;
    setFinalMsg(result);
  }, [result]);

  return (
    <UploadFile
      url={routes.addBatchQuestions}
      token={props.token}
      maxFileSize={6}
      accept={['.xls', '.xlsx']}
      expectedRes="excepts"
      toggleShow={props.toggleShowPopUp}
      title={translator.addBatch}
      multi={false}
      setResult={setResult}
      finalMsg={finalMsg}
    />
  );
};

export default AddBatch;
