import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../../API/APIRoutes';
import UploadFile from '../../../../../components/web/UploadFile';
import {showSuccess} from '../../../../../services/Utility';
import {CommonButton, SimpleText} from '../../../../../styles/Common';
import commonTranslator from '../../../../../tranlates/Common';
import {correct} from '../Utility';

function Card(props) {
  const [showUploadPane, setShowUploadPane] = useState(false);
  const [answerSheet, setAnswerSheet] = useState();
  const [answerSheetAfterCorrection, setAnswerSheetAfterCorrection] =
    useState();

  React.useEffect(() => {
    setAnswerSheet(props.answerSheet);
  }, [props.answerSheet]);

  React.useEffect(() => {
    setAnswerSheetAfterCorrection(props.answerSheetAfterCorrection);
  }, [props.answerSheetAfterCorrection]);

  const afterAdd = res => {
    if (res !== null) {
      setAnswerSheet(res);
      showSuccess(commonTranslator.success);
      setShowUploadPane(false);
    }
  };

  return (
    <View style={{zIndex: 'unset'}}>
      {showUploadPane && (
        <UploadFile
          token={props.token}
          accept={['image/*']}
          url={
            routes.setQuizAnswerSheet +
            props.quizMode +
            '/' +
            props.quizId +
            '/' +
            props.user.id
          }
          expectedRes={'file'}
          setResult={afterAdd}
          multi={false}
          maxFileSize={1}
          setLoading={props.setLoading}
          toggleShow={() => setShowUploadPane(false)}
        />
      )}
      <SimpleText style={{alignSelf: 'center'}} text={props.user.name} />
      {answerSheet !== undefined && answerSheet !== '' && (
        <img style={{width: 100}} src={answerSheet} />
      )}
      {answerSheetAfterCorrection !== undefined &&
        answerSheetAfterCorrection !== '' && (
          <img src={answerSheetAfterCorrection} />
        )}
      <CommonButton
        onPress={() => setShowUploadPane(true)}
        theme={'dark'}
        title={'آپلود تصویر پاسخ برگ'}
      />
      {answerSheet !== undefined && answerSheet !== '' && (
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let res = await correct(props.quizId, props.user.id, props.token);
            props.setLoading(false);
            if (res !== null) {
              console.log(res.path);
              setAnswerSheetAfterCorrection(res.path);
            }
          }}
          theme={'dark'}
          title={'تصحیح'}
        />
      )}
    </View>
  );
}

export default Card;
