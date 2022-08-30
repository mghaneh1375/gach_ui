import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../../../styles/Common';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import Ops from './Ops';
import columns from './TableStructure';

function ParticipantReport(props) {
  const [showOpPane, setShowOpPane] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const handleOp = idx => {
    setSelectedUserId(props.data[idx].id);
    setShowOpPane(true);
  };

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
      <CommonWebBox>
        <CommonDataTable
          columns={columns}
          handleOp={handleOp}
          pagination={false}
          groupOps={[]}
          data={props.data}
        />
      </CommonWebBox>
    </MyView>
  );
}

export default ParticipantReport;
