import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {dispatchStateContext, globalStateContext} from '../../../../../App';
import {CommonWebBox} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import Filter from './Filter';
import columns from './TableStructure';
import {filter} from './Utility';

function Report(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [users, setUsers] = useState();
  const [gifts, setGifts] = useState();

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([filter(state.token)]).then(res => {
      dispatch({loading: false});

      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      setUsers(res[0].data);
      setGifts(res[0].gifts);
    });
  }, [props, dispatch, state.token]);

  useEffectOnce(() => {
    fetchData();
  }, [fetchData]);

  return (
    <CommonWebBox>
      <Filter
        setLoading={status => dispatch({loading: status})}
        token={state.token}
        gifts={gifts}
        setUsers={setUsers}
      />
      {users !== undefined && (
        <CommonDataTable columns={columns} data={users} />
      )}
    </CommonWebBox>
  );
}

export default Report;
