import {View} from 'react-native';
import {CommonButton} from '../../../../../styles/Common';
import {useFilePicker} from 'use-file-picker';
import React from 'react';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

function QuestionFile(props) {
  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 1,
      accept: ['image/*'],
      readAs: 'ArrayBuffer',
      multiple: false,
    });

  const removeFile = index => {
    remove(index);
  };

  React.useEffect(() => {
    if (filesContent !== undefined && filesContent.length === 1)
      props.setFile(filesContent[0]);
  }, [props, filesContent]);

  return (
    <MyView style={{width: 200}}>
      <CommonButton
        theme={'dark'}
        style={{alignSelf: 'flex-start'}}
        onPress={() => openFileSelector()}
        title={props.label}
      />
      {filesContent !== undefined && filesContent.length > 0 && (
        <TextIcon
          onPress={() => removeFile(0)}
          icon={faTrash}
          text={filesContent[0].name}
        />
      )}
    </MyView>
  );
}

export default QuestionFile;
