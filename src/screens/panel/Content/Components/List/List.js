import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import Translator from '../../Translate';
import {contentContext, dispatchContentContext} from '../Context';
import {fetchContents} from '../Utility';
import columns from './TableStruncture';

function List(props) {
  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);

  const fetchData = React.useCallback(() => {
    if (isWorking || state.contents !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([fetchContents()]).then(res => {
      props.setLoading(false);
      if (res[0] === null) return props.navigate('/');
      dispatch({contents: res[0]});
      setIsWorking(false);
    });
  }, [isWorking, state.contents, dispatch, props]);

  React.useEffect(() => {
    if (state.contents === undefined) fetchData();
  }, [state.contents, fetchData]);

  return (
    <MyView>
      <CommonWebBox
        header={Translator.list}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        {state.contents !== undefined && (
          <CommonDataTable columns={columns} data={state.contents} />
        )}
      </CommonWebBox>
    </MyView>
  );
}

export default List;
