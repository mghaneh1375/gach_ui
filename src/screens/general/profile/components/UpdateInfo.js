import React, {useState} from 'react';
import {JustBottomBorderTextInput} from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';
import {BigBoldBlueText, EqualTwoTextInputs} from '../../../../styles/Common';
import {Text, View} from 'react-native';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';

const UpdateInfo = props => {
  const [states, setStates] = useState([]);
  const [state, setState] = useState('');
  const [fetchedStates, setFetchedStates] = useState(false);

  const changeState = text => {
    setState(text);
    if (state.length < 2) return;
    for (var i = 0; i < states.length; i++) {
      if (states[i].state.includes(text)) console.log(states[i].state);
    }
  };

  React.useEffect(() => {
    if (fetchedStates) return;

    setFetchedStates(true);
    // props.setLoading(true);

    // Promise.all([
    //   generalRequest(routes.fetchState, 'get', undefined, 'data'),
    // ]).then(res => {
    //   props.setLoading(false);
    //   if (res[0] !== null) {
    //     setStates(res[0]);
    //   }
    // });
  }, [fetchedStates, props]);

  return (
    <View>
      <BigBoldBlueText text={translator.yourInfo} />
      <View style={{paddingLeft: 100}}>
        <EqualTwoTextInputs>
          <JustBottomBorderTextInput
            isHalf={true}
            subText={commonTranslator.necessaryField}
            placeholder={commonTranslator.firstname}
          />
          <JustBottomBorderTextInput
            isHalf={true}
            subText={commonTranslator.necessaryField}
            placeholder={commonTranslator.lastname}
          />
        </EqualTwoTextInputs>
        <EqualTwoTextInputs style={{marginTop: 20}}>
          <JustBottomBorderTextInput
            isHalf={true}
            justNum={true}
            subText={commonTranslator.necessaryField}
            placeholder={commonTranslator.NID}
          />
          <JustBottomBorderTextInput
            isHalf={true}
            subText={commonTranslator.necessaryField}
            placeholder={commonTranslator.sex}
          />
        </EqualTwoTextInputs>
        <EqualTwoTextInputs style={{marginTop: 20}}>
          <JustBottomBorderTextInput
            isHalf={true}
            onChangeText={e => changeState(e)}
            value={state}
            placeholder={commonTranslator.state}
            resultPane={true}
          />

          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={commonTranslator.city}
          />
        </EqualTwoTextInputs>
      </View>
    </View>
  );
};
export default UpdateInfo;
