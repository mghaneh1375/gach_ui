import {CommonButton, MyView, PhoneView} from '../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import {styles} from '../../../../styles/Common/Styles';
import translator from '../Translator';
import React, {useState} from 'react';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {getOpenQuizzes, getQuizzes} from './Utility';
import commonTranslator from '../../../../translator/Common';
import {dispatchQuizContext} from './Context';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {kindQuizKeyValsForFilter} from './KeyVals';

function ProSearch(props) {
  const [startDateSolar, setStartDateSolar] = useState('');
  const [startDateSolarEndLimit, setStartDateSolarEndLimit] = useState('');
  const [startRegistryDateSolar, setStartRegistryDateSolar] = useState('');
  const [startRegistrySolarEndLimit, setStartRegistrySolarEndLimit] =
    useState('');
  const [name, setName] = useState('');
  const [kindQuiz, setKindQuiz] = useState('all');

  const useGlobalState = () => [React.useContext(dispatchQuizContext)];
  const [dispatch] = useGlobalState();

  return (
    <MyView>
      <PhoneView style={styles.gap15}>
        <JustBottomBorderTextInput
          placeholder={translator.name}
          subText={translator.name}
          onChangeText={e => setName(e)}
          value={name}
        />

        <JustBottomBorderSelect
          values={kindQuizKeyValsForFilter}
          value={
            kindQuiz === undefined
              ? {}
              : kindQuizKeyValsForFilter.filter(element => {
                  return element.id === kindQuiz;
                })[0]
          }
          setter={setKindQuiz}
          placeholder={translator.kind}
          subText={translator.kind}
        />

        {(props.generalMode === undefined ||
          props.generalMode !== 'openQuiz') && (
          <JustBottomBorderDatePicker
            placeholder={translator.startDateFrom}
            subText={translator.startDateFrom}
            setter={setStartDateSolar}
            value={startDateSolar}
          />
        )}

        {(props.generalMode === undefined ||
          props.generalMode !== 'openQuiz') && (
          <JustBottomBorderDatePicker
            placeholder={translator.startDateEnd}
            subText={translator.startDateEnd}
            setter={setStartDateSolarEndLimit}
            value={startDateSolarEndLimit}
          />
        )}

        {(props.generalMode === undefined ||
          props.generalMode !== 'openQuiz') && (
          <JustBottomBorderDatePicker
            placeholder={translator.startRegistryDateFrom}
            subText={translator.startRegistryDateFrom}
            setter={setStartRegistryDateSolar}
            value={startRegistryDateSolar}
          />
        )}

        {(props.generalMode === undefined ||
          props.generalMode !== 'openQuiz') && (
          <JustBottomBorderDatePicker
            placeholder={translator.startRegistryDateEnd}
            subText={translator.startRegistryDateEnd}
            setter={setStartRegistrySolarEndLimit}
            value={startRegistrySolarEndLimit}
          />
        )}
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let res =
              props.generalMode === undefined ||
              props.generalMode !== 'openQuiz'
                ? await getQuizzes(
                    props.token,
                    name,
                    startDateSolar,
                    startDateSolarEndLimit,
                    startRegistryDateSolar,
                    startRegistrySolarEndLimit,
                    kindQuiz,
                  )
                : await getOpenQuizzes(props.token, name);
            props.setLoading(false);
            if (res !== null) dispatch({quizzes: res});
          }}
          title={commonTranslator.show}
          style={{alignSelf: 'flex-start'}}
        />
      </PhoneView>
    </MyView>
  );
}

export default ProSearch;
