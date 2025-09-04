import React from 'react';
import {CommonWebBox, MyView} from '@/styles';
import Translate from '../../../translate';
import Ops from './ops/Ops';
import {useState} from 'react';
import CommonDataTable from '../../../../../../styles/common/CommonDataTable';
import columns from './tableStructure';
import {routes} from '@/api/apiRoutes';
function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedGift(props.data[idx]);
    setSelectedId(props.data[idx].id);
    toggleShowOpPopUp();
  };
  return (
    <CommonWebBox
      header={Translate.selectGift}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      <MyView>
        {showOpPopUp && (
          <Ops
            id={selectedId}
            gift={props.selectedGift}
            toggleShowPopUp={toggleShowOpPopUp}
            token={props.token}
            setLoading={props.setLoading}
            remove={props.remove}
            update={props.update}
            setMode={props.setMode}
          />
        )}
        {props.data !== undefined && (
          <CommonDataTable
            columns={columns}
            data={props.data}
            setData={props.setData}
            handleOp={handleOp}
            removeUrl={routes.removeGift}
            token={props.token}
            setLoading={props.setLoading}
          />
        )}
      </MyView>
    </CommonWebBox>
  );
}
export default List;
