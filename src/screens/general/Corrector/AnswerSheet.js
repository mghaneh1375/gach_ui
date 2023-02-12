import React, {useState} from 'react';
import {useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {getDevice} from '../../../services/Utility';
import {PhoneView} from '../../../styles/Common';
import Filter from './components/Filter';

function AnswerSheet(props) {
  const params = useParams();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const fetchAnswerSheet = React.useCallback(() => {}, []);

  useEffectOnce(() => {}, []);

  return (
    <>
      <PhoneView>
        <Filter />
      </PhoneView>
    </>
  );
}

export default AnswerSheet;
