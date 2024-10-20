import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import {BASE_SITE_NAME, BASE_URL} from '../../../../../API/Utility';
import UploadFile from '../../../../../components/web/UploadFile';
import {showSuccess} from '../../../../../services/Utility';
import translator from '../../Translator';

const AddBatch = props => {
  const [result, setResult] = useState(undefined);
  const [finalMsg, setFinalMsg] = useState();

  React.useEffect(() => {
    if (result === undefined || result.length === 0) return;
    if (result.errs === undefined || result.errs.length === 0) {
      setFinalMsg(result.excepts);
      showSuccess();
    } else setFinalMsg(result.excepts + '\n' + result.errs);
  }, [result]);

  return (
    <UploadFile
      url={routes.addBatchQuestions}
      token={props.token}
      maxFileSize={6}
      accept={['.xls', '.xlsx']}
      expectedRes={['excepts', 'errs']}
      toggleShow={props.toggleShowPopUp}
      title={translator.addBatch}
      multi={false}
      setResult={setResult}
      finalMsg={finalMsg}
      helps={[
        {
          link: BASE_SITE_NAME + 'assets/add_question_sample.xlsx',
          text: 'دانلود فایل نمونه سوالات',
        },
        {
          link: BASE_URL + routes.getQuestionTagsExcel,
          text: 'دانلود فایل آی دی تگ\u200cها',
        },
        {
          link: BASE_URL + routes.getSubjectCodesExcel,
          text: 'دانلود فایل کد حیطه\u200cها',
        },
        {
          link: BASE_URL + routes.getAuthorCodesExcel,
          text: 'دانلود فایل کد مولفین',
        },
      ]}
    />
  );
};

export default AddBatch;
