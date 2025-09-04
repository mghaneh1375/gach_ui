import React, {useState} from 'react';
import {CommonWebBox, MyView} from '@/styles';
import CommonDataTable from '../../../../styles/common/CommonDataTable.jsx';
import columns from './tableStructure';
import Ops from './Ops.jsx';
import Translate from '../translate';
import {routes} from '@/api/apiRoutes';
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
          isAdvisor={props.isAdvisor}
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
            removeUrl={
              props.isAdvisor
                ? routes.removeStudentsByAdvisor
                : routes.removeStudents
            }
            token={props.token}
          />
        )}
      </CommonWebBox>
    </MyView>
  );
}
export default List;
