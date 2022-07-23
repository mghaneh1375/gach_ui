import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import AddBatch from './AddBatch';
import AddBatchFiles from './AddBatchFiles';

function Create(props) {
  const [showAddBatchPopUp, setShowAddBatchPopUp] = useState(false);
  const [showAddBatchFilesPopUp, setShowAddBatchFilesPopUp] = useState(false);

  const toggleShowAddBatchPopUp = () => {
    setShowAddBatchPopUp(!showAddBatchPopUp);
  };

  const toggleShowAddBatchFilesPopUp = () => {
    setShowAddBatchFilesPopUp(!showAddBatchFilesPopUp);
  };

  return (
    <CommonWebBox
      onBackClick={() => props.setMode('list')}
      header={translator.addQuestions}
      backBtn={true}>
      {showAddBatchPopUp && (
        <AddBatch
          toggleShowPopUp={toggleShowAddBatchPopUp}
          token={props.token}
          setLoading={props.setLoading}
          setMode={props.setMode}
        />
      )}
      {showAddBatchFilesPopUp && (
        <AddBatchFiles
          toggleShowPopUp={toggleShowAddBatchFilesPopUp}
          token={props.token}
          setLoading={props.setLoading}
        />
      )}
      <PhoneView style={{alignSelf: 'flex-end'}}>
        <CommonButton
          onPress={() => toggleShowAddBatchPopUp()}
          theme={'dark'}
          title={translator.uploadExcelFile}
        />
        <CommonButton
          onPress={() => toggleShowAddBatchFilesPopUp()}
          theme={'dark'}
          title={translator.uploadZipFile}
        />
      </PhoneView>
    </CommonWebBox>
  );
}

export default Create;
