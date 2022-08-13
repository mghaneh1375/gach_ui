import {View} from 'react-native-web';
import {CommonWebBox} from '../../../../../../styles/Common';
import Translate from '../../../Translate';
import Ops from './Ops/Ops';
import {useState} from 'react';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import columns from './TableStructure';
import {routes} from '../../../../../../API/APIRoutes';

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
      <MyView style={{zIndex: 'unset'}}>
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
        <CommonDataTable
          columns={columns}
          data={props.data}
          setData={props.setData}
          handleOp={handleOp}
          removeUrl={routes.removeGift}
          token={props.token}
          setLoading={props.setLoading}
        />
      </MyView>
    </CommonWebBox>
  );
}

export default List;
