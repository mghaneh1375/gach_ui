import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import columns from './TableStructure';
import Ops from './Ops';
import Translate from '../Translate';
import {routes} from '../../../../API/APIRoutes';

function List(props) {
  const [selectedId, setSelectedId] = useState();
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const [data, setData] = useState();

  React.useEffect(() => {
    if (props.data !== undefined) setData(props.data);
  }, [props.data]);

  const handleOp = idx => {
    props.setSelectedStudent(data[idx]);
    setSelectedId(data[idx].id);
    toggleShowOpPopUp();
  };
  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          selectedId={selectedId}
          data={props.data}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          edit={props.edit}
          remove={props.remove}
          setMode={props.setMode}
        />
      )}
      <CommonWebBox
        header={Translate.managementStudents}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        {data !== undefined && (
          <CommonDataTable
            columns={columns}
            data={data}
            setData={setData}
            handleOp={handleOp}
            setLoading={props.setLoading}
            removeUrl={routes.removeStudents}
            token={props.token}
          />
        )}
      </CommonWebBox>
    </MyView>
  );
}

export default List;
