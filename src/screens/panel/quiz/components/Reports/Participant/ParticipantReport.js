import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../../../styles/Common';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import {fetchParticipantReport} from '../../Utility';
import Ops from './Ops';
import columns from './TableStructure';

function ParticipantReport(props) {
  const [showOpPane, setShowOpPane] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [data, setData] = useState(props.data);
  const [readOnly, setReadOnly] = useState(props.data === undefined);

  const handleOp = idx => {
    setSelectedUserId(props.data[idx].id);
    setShowOpPane(true);
  };

  const [isWorking, setIsWorking] = useState(false);

  const fetchData = React.useCallback(() => {
    if (props.quizId === undefined || isWorking) return;

    setIsWorking(true);
    props.setLoading(true);
    Promise.all([fetchParticipantReport(props.quizId, props.token)]).then(
      res => {
        props.setLoading(false);

        if (res[0] === null) {
          props.onBackClick();
          return;
        }
        setData(res[0]);
        setIsWorking(false);
      },
    );
  }, [props, isWorking]);

  React.useEffect(() => {
    if (data === undefined) fetchData();
  }, [data, fetchData, props.quizId]);

  return (
    <MyView>
      {showOpPane && (
        <Ops
          selectedUserId={selectedUserId}
          token={props.token}
          setLoading={props.setLoading}
          quizId={props.quizId}
          quizMode={props.quizMode}
          toggleShowPopUp={() => setShowOpPane(false)}
          resetTime={() => {
            let tmp = props.data.map(elem => {
              if (elem.id === selectedUserId) {
                elem.startAt = '';
                elem.finishAt = '';
              }
              return elem;
            });
            props.setData(tmp);
            setShowOpPane(false);
          }}
        />
      )}
      <CommonWebBox
        header={''}
        backBtn={props.onBackClick !== undefined}
        onBackClick={props.onBackClick}>
        {data !== undefined && (
          <CommonDataTable
            columns={columns}
            handleOp={readOnly ? undefined : handleOp}
            pagination={false}
            groupOps={[]}
            data={data}
          />
        )}
      </CommonWebBox>
    </MyView>
  );
}

export default ParticipantReport;
