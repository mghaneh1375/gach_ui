import React from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '@/styles';
import {dispatchQuizContext, quizContext} from '../Context';
import {useState} from 'react';
import JustBottomBorderTextInput from '../../../../../styles/common/JustBottomBorderTextInput';
import translator from '../../translator';
import commonTranslator from '@/translator/common';
import JustBottomBorderDatePicker from '../../../../../styles/common/JustBottomBorderDatePicker';
import {generalRequest} from '../../../../../api/utility';
import {routes} from '@/api/apiRoutes';
import {showSuccess} from '@/services/utility';
function Copy(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [name, setName] = useState();
  const [description, setDescription] = useState(
    state.selectedQuiz.description,
  );
  const [start, setStart] = useState(state.selectedQuiz.start);
  const [end, setEnd] = useState(state.selectedQuiz.end);
  const [startRegistry, setStartRegistry] = useState(
    state.selectedQuiz.startRegistry,
  );
  const [endRegistry, setEndRegistry] = useState(
    state.selectedQuiz.endRegistry,
  );
  const changeInput = (label, text) => {
    if (label === 'name') setName(text);
    else if (label === 'desc') setDescription(text);
  };
  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={'کپی کردن آزمون ' + state.selectedQuiz.title}>
      <PhoneView>
        <JustBottomBorderTextInput
          placeholder={translator.name}
          onChangeText={e => changeInput('name', e)}
          value={name}
          subText={translator.name}
        />
      </PhoneView>
      <PhoneView
        style={{
          marginTop: 20,
          marginBottom: 20,
          marginRight: 10,
          flexDirection: 'column',
        }}>
        <JustBottomBorderTextInput
          placeholder={commonTranslator.desc}
          subText={commonTranslator.desc}
          value={description}
          onChangeText={e => changeInput('desc', e)}
          multiline={true}
        />
      </PhoneView>
      {state.selectedQuiz.generalMode !== 'open' && (
        <>
          <PhoneView
            style={{
              gap: 10,
            }}>
            <JustBottomBorderDatePicker
              placeholder={translator.startDate}
              subText={translator.startDate}
              value={start}
              setter={setStart}
            />
            <JustBottomBorderDatePicker
              placeholder={translator.endDate}
              subText={translator.endDate}
              value={end}
              setter={setEnd}
            />
          </PhoneView>
          <PhoneView
            style={{
              gap: 10,
            }}>
            <JustBottomBorderDatePicker
              placeholder={translator.startRegistryDate}
              subText={translator.startRegistryDate}
              value={startRegistry}
              setter={setStartRegistry}
            />
            <JustBottomBorderDatePicker
              placeholder={translator.endRegistryDate}
              subText={translator.endRegistryDate}
              value={endRegistry}
              setter={setEndRegistry}
            />
          </PhoneView>
        </>
      )}
      <CommonButton
        onPress={async () => {
          props.setLoading(true);
          const data = {
            title: name,
          };
          if (description && description.length > 0)
            data.description = description;
          if (state.selectedQuiz.generalMode !== 'open') {
            data.start = start;
            data.end = end;
            data.startRegistry = startRegistry;
            data.endRegistry = endRegistry;
          }
          const res = await generalRequest(
            routes.copyQuiz +
              state.selectedQuiz.generalMode +
              '/' +
              state.selectedQuiz.id,
            'post',
            data,
            'quiz',
            props.token,
          );
          props.setLoading(false);
          if (res != null) {
            showSuccess();
            dispatch({
              quizzes: [res, ...state.quizzes],
            });
            props.setMode('list');
          }
        }}
        theme="dark"
        title={commonTranslator.confirm}
      />
    </CommonWebBox>
  );
}
export default Copy;
