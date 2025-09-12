import React from 'react';
import {getPDFQuizSubjects, setPDFSubjects} from '../utility';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
  SimpleFontIcon,
} from '@/styles';
import translator from '../../translator';
import commonTranslator from '@/translator/common';
import {showError, showSuccess} from '@/services/utility';
import {useFilePicker} from 'use-file-picker';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import AttachBox from '../../../ticket/components/show/attachBox/AttachBox.jsx';
import {styles} from '@/styles/common/styles';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import columns from './tableStructure';
import {BASE_SITE_NAME, BASE_URL} from '@/api/utility';
import {routes} from '@/api/apiRoutes';
function UploadSubjects(props) {
  const [isWorking, setIsWorking] = React.useState(false);
  const [openFileSelector, {filesContent, remove}] = useFilePicker({
    maxFileSize: 6,
    accept: ['excel/*'],
    readAs: 'ArrayBuffer',
    multiple: false,
  });
  React.useEffect(() => {
    if (isWorking) return;
    if (props.state.selectedQuiz.subjects !== undefined) return;
    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      getPDFQuizSubjects(props.token, props.state.selectedQuiz.id),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        props.state.selectedQuiz.subjects = res[0].subjects;
        props.state.selectedQuiz.choicesCounts = res[0].choicesCounts;
        props.dispatch({
          selectedQuiz: props.state.selectedQuiz,
          needUpdate: true,
        });
      } else props.setMode('list');
      setIsWorking(false);
    });
  }, [props, isWorking, props.state.selectedQuiz, props.dispatch]);
  return (
    <CommonWebBox header={translator.subjects}>
      <PhoneView
        style={{
          ...styles.gap15,
        }}>
        <SimpleText
          style={{
            ...styles.alignSelfCenter,
            ...styles.BlueBold,
          }}
          text={translator.subjectsFile}
        />
        <SimpleFontIcon
          onPress={() => openFileSelector()}
          kind={'normal'}
          icon={faPaperclip}
        />

        <PhoneView
          style={{
            marginTop: 20,
          }}>
          {filesContent !== undefined &&
            filesContent.length > 0 &&
            filesContent.map((elem, index) => {
              return (
                <AttachBox
                  key={index}
                  filename={elem.name}
                  fileContent={elem.content}
                  removeAttach={() => {
                    remove(index);
                  }}
                />
              );
            })}
        </PhoneView>
      </PhoneView>

      <a
        style={{
          fontFamily: 'IRANSans',
        }}
        target="_blank"
        href={BASE_URL + routes.getSubjectCodesExcel}
        download>
        دانلود فایل کد مباحث
      </a>

      <a
        style={{
          fontFamily: 'IRANSans',
        }}
        target="_blank"
        href={BASE_SITE_NAME + 'assets/add_subjects_to_pdf_quiz.xlsx'}
        download>
        دانلود نمونه فایل افزودن مباحث
      </a>

      <CommonButton
        onPress={async () => {
          if (
            filesContent === undefined ||
            filesContent.length < 1 ||
            filesContent[0] === undefined ||
            filesContent[0] === null
          ) {
            showError('لطفا فایل اکسل را مشخص کنید');
            return;
          }
          props.setLoading(true);
          const res = await setPDFSubjects(
            props.state.selectedQuiz.id,
            props.token,
            filesContent[0],
          );
          props.setLoading(false);
          if (res == null) return;
          showSuccess();
          props.state.selectedQuiz.subjects = undefined;
          props.dispatch({
            selectedQuiz: props.state.selectedQuiz,
          });
        }}
        theme={'dark'}
        title={commonTranslator.confirm}
      />
      {props.state.selectedQuiz.subjects && (
        <CommonDataTable
          show_row_no={false}
          excel={false}
          pagination={false}
          data={props.state.selectedQuiz.subjects.map((e, index) => {
            return {
              subject: e,
              index: index + 1,
              choicesCount: props.state.selectedQuiz.choicesCounts[index],
            };
          })}
          columns={columns}
        />
      )}
    </CommonWebBox>
  );
}
export default UploadSubjects;
