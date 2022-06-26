import {CommonButton, PhoneView} from '../../../../../styles/Common';
import {useFilePicker} from 'use-file-picker';
import {View} from 'react-native';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';

const QuizAnswerSheetInfo = props => {
  const [openFileSelector, {filesContent, loading, errors}] = useFilePicker({
    maxFileSize: 100,
    accept: 'image/*',
    readAs: 'ArrayBuffer',
  });

  // if (loading) {
  //   props.setLoading(true);
  // }

  const doUpload = () => {
    const data = new FormData();
    var myblob = new Blob([new Uint8Array(filesContent[0].content)]);
    data.append('file', myblob, filesContent[0].name);
    props.setLoading(true);

    Promise.all([
      generalRequest(routes.sampleUpload, 'post', data, undefined),
    ]).then(res => {
      props.setLoading(false);
      console.log(res[0]);
    });
  };

  return (
    <View>
      <PhoneView>
        <button onClick={() => openFileSelector()}>upload</button>

        {errors.length > 0 &&
          errors[0].fileSizeTooSmall &&
          'File size is too small!'}
        {errors.length > 0 &&
          errors[0].fileSizeToolarge &&
          'File size is too large!'}
        {errors.length > 0 &&
          errors[0].readerError &&
          'Problem occured while reading file!'}
        {errors.length > 0 && errors[0].maxLimitExceeded && 'Too many files'}
        {errors.length > 0 &&
          errors[0].minLimitNotReached &&
          'Not enought files'}
      </PhoneView>
      {filesContent.map((file, index) => (
        <div key={index}>
          <h2>{file.name}</h2>
          <img alt={file.name} src={file.content}></img>
          <br />
        </div>
      ))}

      <CommonButton onPress={() => doUpload()} />
    </View>
  );
};

export default QuizAnswerSheetInfo;
