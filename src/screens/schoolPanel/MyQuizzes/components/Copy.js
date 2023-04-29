import React, {useState} from 'react';
import RadioButtonYesOrNo from '../../../../components/web/RadioButtonYesOrNo';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../styles/Common/Styles';
import translator from '../../../panel/quiz/Translator';
import {dispatchMyQuizzesContext, myQuizzesContext} from './Context';
import commonTranslator from '../../../../translator/Common';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {showError, showSuccess} from '../../../../services/Utility';
import {launchModeKeyVals} from '../../../panel/quiz/components/KeyVals';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';

function Copy(props) {
  const useGlobalState = () => [
    React.useContext(myQuizzesContext),
    React.useContext(dispatchMyQuizzesContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [name, setName] = useState();
  const [copyStudents, setCopyStudents] = useState('no');
  const [launchMode, setLaunchMode] = useState();

  return (
    <CommonWebBox
      header={translator.copy + ' ' + state.selectedQuiz.title}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={{...styles.gap15}}>
        <JustBottomBorderTextInput
          placeholder={translator.name}
          onChangeText={e => setName(e)}
          value={name}
          subText={translator.name}
        />

        <JustBottomBorderDatePicker
          placeholder={translator.startDate}
          value={start}
          setter={setStart}
          subText={translator.startDate}
        />

        <JustBottomBorderDatePicker
          placeholder={translator.endDate}
          value={end}
          setter={setEnd}
          subText={translator.endDate}
        />

        <JustBottomBorderSelect
          values={launchModeKeyVals}
          value={
            launchMode === undefined
              ? {}
              : launchModeKeyVals.filter(element => {
                  return element.id === launchMode;
                })[0]
          }
          setter={setLaunchMode}
          placeholder={translator.isOnline}
          subText={translator.isOnline}
        />

        <RadioButtonYesOrNo
          selected={copyStudents}
          setSelected={setCopyStudents}
          label={translator.copyStudents}
        />
      </PhoneView>
      <CommonButton
        theme={'dark'}
        title={commonTranslator.confirm}
        onPress={async () => {
          props.setLoading(true);
          try {
            let res = await generalRequest(
              routes.copySchoolQuiz + state.selectedQuiz.id,
              'post',
              {
                start: start,
                end: end,
                title: name,
                copyStudents: copyStudents === 'yes',
                launchMode: launchMode,
              },
              'data',
              props.token,
              ['start', 'end', 'title', 'copyStudents', 'launchMode'],
            );

            props.setLoading(false);

            if (res !== null) {
              showSuccess();
              state.quizzes.unshift(res);
              dispatch({quizzes: state.quizzes});
              props.setMode('list');
            }
          } catch (x) {
            props.setLoading(false);
          }
        }}
      />
    </CommonWebBox>
  );
}

export default Copy;
