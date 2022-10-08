import {CommonButton, MyView, PhoneView} from '../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import {styles} from '../../../../styles/Common/Styles';
import translator from '../Translator';
import React, {useState} from 'react';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {getQuizzes} from './Utility';
import commonTranslator from '../../../../translator/Common';
import {dispatchQuizContext} from './Context';

function ProSearch(props) {
  const [startDateSolar, setStartDateSolar] = useState('');
  const [startDateSolarEndLimit, setStartDateSolarEndLimit] = useState('');
  const [startRegistryDateSolar, setStartRegistryDateSolar] = useState('');
  const [startRegistrySolarEndLimit, setStartRegistrySolarEndLimit] =
    useState('');
  const [name, setName] = useState('');

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
        <JustBottomBorderDatePicker
          placeholder={translator.startDateFrom}
          subText={translator.startDateFrom}
          setter={setStartDateSolar}
          value={startDateSolar}
        />
        <JustBottomBorderDatePicker
          placeholder={translator.startDateEnd}
          subText={translator.startDateEnd}
          setter={setStartDateSolarEndLimit}
          value={startDateSolarEndLimit}
        />
        <JustBottomBorderDatePicker
          placeholder={translator.startRegistryDateFrom}
          subText={translator.startRegistryDateFrom}
          setter={setStartRegistryDateSolar}
          value={startRegistryDateSolar}
        />
        <JustBottomBorderDatePicker
          placeholder={translator.startRegistryDateEnd}
          subText={translator.startRegistryDateEnd}
          setter={setStartRegistrySolarEndLimit}
          value={startRegistrySolarEndLimit}
        />
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let res = await getQuizzes(
              props.token,
              name,
              startDateSolar,
              startDateSolarEndLimit,
              startRegistryDateSolar,
              startRegistrySolarEndLimit,
            );
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
