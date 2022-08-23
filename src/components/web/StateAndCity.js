import React, {useState} from 'react';
import {routes} from '../../API/APIRoutes';
import {generalRequest} from '../../API/Utility';
import {EqualTwoTextInputs} from '../../styles/Common';
import JustBottomBorderTextInput from '../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../tranlates/Common';

function StateAndCity(props) {
  const [fetchedStates, setFetchedStates] = useState(
    props.states !== undefined,
  );
  const [states, setStates] = useState(
    props.states === undefined ? [] : props.states,
  );

  const [state, setState] = useState();
  const [city, setCity] = useState();

  const [resetCity, setResetCity] = useState(false);
  const [choose, setChoose] = useState(false);

  React.useEffect(() => {
    if (state === undefined || props.city === undefined) return;
    let c = state.cities.find(elem => props.city.id === elem.id);
    setCity(c);
  }, [props.city, state]);

  React.useEffect(() => {
    if (states === undefined || props.state === undefined) return;
    let s = states.find(elem => props.state.id === elem.id);
    setState(s);
  }, [props.state, states]);

  React.useEffect(() => {
    if (fetchedStates) return;

    setFetchedStates(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(routes.fetchState, 'get', undefined, 'data'),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        setStates(res[0]);
      }
    });
  }, [fetchedStates, props]);

  React.useEffect(() => {
    if (state === undefined || city === undefined || !choose) return;
    props.setter(city);
    props.stateSetter(state);
    setChoose(false);
  }, [city, state, choose, props]);

  const setSelectedState = item => {
    setState(item);
    if (city !== undefined) {
      setCity(undefined);
      setResetCity(true);
    }
  };

  const setSelectedCity = item => {
    setCity(item);
    setResetCity(false);
    setChoose(true);
  };

  return (
    <EqualTwoTextInputs style={{gap: 15}}>
      <JustBottomBorderTextInput
        placeholder={commonTranslator.state}
        resultPane={true}
        setSelectedItem={setSelectedState}
        values={states}
        value={state !== undefined ? state.name : ''}
        reset={false}
      />

      <JustBottomBorderTextInput
        resultPane={true}
        placeholder={commonTranslator.city}
        setSelectedItem={setSelectedCity}
        reset={resetCity}
        value={city !== undefined ? city.name : ''}
        values={state !== undefined ? state.cities : []}
      />
    </EqualTwoTextInputs>
  );
}

export default StateAndCity;
