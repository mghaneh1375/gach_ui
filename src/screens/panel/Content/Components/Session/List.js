import {routes} from '../../../../../API/APIRoutes';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {contentContext, dispatchContentContext} from '../Context';
import Ops from './Ops';
import React, {useState} from 'react';
import {fetchSessions} from '../Utility';
import Translator from '../../Translate';
import columns from './TableStructure';

function List(props) {
  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [showOp, setShowOp] = useState(false);

  const fetchData = React.useCallback(() => {
    if (isWorking || state.selectedContent.sessions !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([fetchSessions(props.token, state.selectedContent.id)]).then(
      res => {
        props.setLoading(false);
        if (res[0] === null) return props.navigate('/');
        state.selectedContent.sessions = res[0];
        dispatch({
          selectedContent: state.selectedContent,
          needUpdate: true,
        });
        setIsWorking(false);
      },
    );
  }, [isWorking, state.selectedContent, dispatch, props]);

  React.useEffect(() => {
    if (state.selectedContent.sessions === undefined) fetchData();
  }, [state.selectedContent, fetchData]);

  const handleOp = (idx, row) => {
    dispatch({selectedSession: state.selectedContent.sessions[idx]});
    setShowOp(true);
  };

  return (
    <MyView>
      {showOp && (
        <Ops
          setLoading={props.setLoading}
          token={props.token}
          setMode={props.setMode}
          toggleShowPopUp={() => setShowOp(!showOp)}
        />
      )}
      <CommonWebBox
        header={Translator.list + state.selectedContent.title}
        addBtn={true}
        onAddClick={() => props.setMode('createSession')}>
        {state.selectedContent.sessions !== undefined && (
          <CommonDataTable
            removeUrl={routes.removeSessionFromContent}
            handleOp={handleOp}
            setLoading={props.setLoading}
            columns={columns}
            data={state.selectedContent.sessions}
            token={props.token}
            setData={newData => {
              state.selectedContent.sessions = newData;
              dispatch({
                selectedContent: state.selectedContent,
                needUpdate: true,
              });
            }}
          />
        )}
      </CommonWebBox>
    </MyView>
  );
}

export default List;
