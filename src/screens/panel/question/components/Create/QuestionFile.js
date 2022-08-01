import {View} from 'react-native';
import {CommonButton} from '../../../../../styles/Common';
import {useFilePicker} from 'use-file-picker';
import AttachBox from '../../../ticket/components/Show/AttachBox/AttachBox';

function QuestionFile(props) {
  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 1,
      accept: ['image/*'],
      readAs: 'DataURL',
      multiple: false,
    });

  const removeFile = index => {
    remove(index);
  };

  return (
    <View style={{width: 200}}>
      <CommonButton
        theme={'dark'}
        style={{alignSelf: 'flex-start'}}
        onPress={() => openFileSelector()}
        title={props.label}
      />
      {filesContent !== undefined && filesContent.length > 0 && (
        <AttachBox
          filename={filesContent[0].name}
          fileContent={filesContent[0].content}
          removeAttach={() => removeFile(0)}
        />
      )}
    </View>
  );
}

export default QuestionFile;
