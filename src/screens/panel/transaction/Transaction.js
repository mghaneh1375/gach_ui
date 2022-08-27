import React, {useState} from 'react';
import {MyView} from '../../../styles/Common';
import {dispatchStateContext} from '../../../App';
import {getTransactions} from './components/Utility';
import List from './components/List';

function Transaction(props) {
  const [mode, setMode] = useState('list');
  const [transactions, setTransactions] = useState();

  const navigate = props.navigate;
  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([getTransactions(props.token)]).then(res => {
      dispatch({loading: false});
      console.log(res[0]);
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setTransactions(res[0]);
    });
  }, [navigate, props.token, dispatch]);

  return (
    <MyView>
      {mode === 'list' && transactions !== undefined && (
        <List transactions={transactions} />
      )}
    </MyView>
  );
}

export default Transaction;
