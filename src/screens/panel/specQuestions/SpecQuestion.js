import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import Create from './components/Create/Create';
import Detail from './components/Detail/Detail';
import {filter} from './components/Utility';
import {QuestionProvider} from './components/Detail/Context';
import {MyView} from '../../../styles/Common';

const SpecQuestion = props => {
  const [mode, setMode] = useState('detail');
  const [organizationCodeFilter, setOrganizationCodeFilter] = useState();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  return (
    <MyView>
      <QuestionProvider>
        {mode === 'create' && (
          <Create
            setMode={setMode}
            token={state.token}
            setLoading={setLoading}
            isInEditMode={false}
          />
        )}
        {mode === 'edit' && (
          <Create
            setMode={setMode}
            token={state.token}
            setLoading={setLoading}
            isInEditMode={true}
          />
        )}
        {mode === 'detail' && (
          <Detail
            setMode={setMode}
            token={state.token}
            organizationCodeFilter={organizationCodeFilter}
            setLoading={setLoading}
          />
        )}
      </QuestionProvider>
    </MyView>
  );
};

export default SpecQuestion;
