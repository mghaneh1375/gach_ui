import {View} from 'react-native-web';
import {CommonWebBox} from '../../../../../../styles/Common';
import Translate from '../../../Translate';
import Ops from './Ops/Ops';
import {useState} from 'react';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import columns from './TableStructure';
import {routes} from '../../../../../../API/APIRoutes';

function List(props) {
  const [showOpModel, setShowOpModel] = useState();
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selected, setSelected] = useState();
  const toggleShowOpPopUp = () => {
    setShowOpModel(!showOpModel);
  };
  const handleOp = idx => {
    props.setSelectedSubject(props.subjects[idx]);
    setSelected(props.subjects[idx]);
    toggleShowOpPopUp();
  };

  return (
    <CommonWebBox
      header={Translate.selectGift}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      <View style={{zIndex: 'unset'}}>
        {showOpPopUp && (
          <Ops
            gift={props.selectedUser}
            updateGift={props.updateGift}
            token={props.token}
            setMode={props.setMode}
            setLoading={props.setLoading}
            toggleShowPopUp={toggleShowOpPopUp}
          />
        )}
        <CommonDataTable
          columns={columns}
          data={props.gifts}
          setData={props.setGifts}
          handleOp={handleOp}
          removeUrl={routes.removeGifts}
          token={props.token}
          //   setLoading={props.setLoading}
        />
      </View>
    </CommonWebBox>
  );
}

export default List;
