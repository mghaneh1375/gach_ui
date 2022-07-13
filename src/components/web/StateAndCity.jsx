import React, {useState} from 'react';
import {routes} from '../../API/APIRoutes';
import {generalRequest} from '../../API/Utility';
import {EqualTwoTextInputs, PhoneView} from '../../styles/Common';
import JustBottomBorderTextInput from '../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../tranlates/Common';

function StateAndCity(props) {
  const [fetchedStates, setFetchedStates] = useState(false);
  const [states, setStates] = useState([]);

  const [state, setState] = useState(props.state);
  const [city, setCity] = useState(props.city);
  const [resetCity, setResetCity] = useState(false);

  React.useEffect(() => {
    if (fetchedStates) return;

    setFetchedStates(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(routes.fetchState, 'get', undefined, 'data'),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) setStates(res[0]);
    });
  }, [fetchedStates, props]);

  React.useEffect(() => {
    if (city === undefined) return;
    props.setter(city);
  }, [city, props]);

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
  };

  return (
    <EqualTwoTextInputs>
      <JustBottomBorderTextInput
        isHalf={true}
        placeholder={commonTranslator.state}
        resultPane={true}
        setSelectedItem={setSelectedState}
        values={states}
        value={state !== undefined ? state.name : ''}
        reset={false}
      />

      <JustBottomBorderTextInput
        isHalf={true}
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
