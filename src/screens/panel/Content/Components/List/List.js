import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import {VIDEO_BASE_URL} from '../../../../../API/Utility';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import Translator from '../../Translate';
import {contentContext, dispatchContentContext} from '../Context';
import {fetchContents} from '../Utility';
import Ops from './Ops';
import columns from './TableStruncture';

function List(props) {
  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [showOp, setShowOp] = useState(false);

  const fetchData = React.useCallback(() => {
    if (isWorking || state.contents !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([fetchContents(props.token)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) return props.navigate('/');
      dispatch({contents: res[0]});
      setIsWorking(false);
    });
  }, [isWorking, state.contents, dispatch, props]);

  React.useEffect(() => {
    if (state.contents === undefined) fetchData();
  }, [state.contents, fetchData]);

  const handleOp = (idx, row) => {
    dispatch({selectedContent: state.contents[idx]});
    setShowOp(true);
  };

  return (
    <MyView>
      {showOp && (
        <Ops
          setSelectedContentId={props.setSelectedContentId}
          setLoading={props.setLoading}
          token={props.token}
          setMode={props.setMode}
          toggleShowPopUp={() => setShowOp(!showOp)}
          isEditor={props.isEditor}
          isAdmin={props.isAdmin}
        />
      )}
      <CommonWebBox
        header={Translator.list}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        {state.contents !== undefined && (
          <CommonDataTable
            removeUrl={VIDEO_BASE_URL + routes.removeContent}
            handleOp={handleOp}
            setLoading={props.setLoading}
            columns={columns}
            data={state.contents}
            token={props.token}
            setData={newData => {
              dispatch({contents: newData});
            }}
          />
        )}
      </CommonWebBox>
    </MyView>
  );
}

export default List;
