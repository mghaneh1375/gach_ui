import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import Create from './components/create/Create.jsx';
import Detail from './components/detail/Detail.jsx';
import {QuestionProvider} from './components/detail/Context.jsx';
import {MyView} from '@/styles';
const SpecQuestion = () => {
  const [mode, setMode] = useState('detail');
  const [organizationCodeFilter, setOrganizationCodeFilter] = useState();
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({
      loading: status,
    });
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
