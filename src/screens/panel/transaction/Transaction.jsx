import React, {useState} from 'react';
import {MyView} from '@/styles';
import {dispatchStateContext} from '@/App.jsx';
import {getTransactions} from './components/utility';
import List from './components/List.jsx';
function Transaction(props) {
  const [transactions, setTransactions] = useState();
  const [sum, setSum] = useState();
  const [accountMoneySum, setAccountMoneySum] = useState();
  const [pageIndex, setPageIndex] = useState(1);
  const navigate = props.navigate;
  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };
  React.useEffect(() => {
    dispatch({
      loading: true,
    });
    Promise.all([
      getTransactions(
        props.token,
        undefined,
        undefined,
        undefined,
        undefined,
        'all',
        pageIndex,
      ),
    ]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setTransactions(res[0].data);
      setSum(res[0].sum);
      setAccountMoneySum(res[0].accountMoneySum);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);
  return (
    <MyView>
      {transactions && (
        <List
          setTransactions={setTransactions}
          setSum={setSum}
          setAccountMoneySum={setAccountMoneySum}
          token={props.token}
          setLoading={setLoading}
          transactions={transactions}
          sum={sum}
          accountMoneySum={accountMoneySum}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
    </MyView>
  );
}
export default Transaction;
