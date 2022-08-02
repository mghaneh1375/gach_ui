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

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedGift(props.gifts[idx]);
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
            gift={props.selectedGift}
            toggleShowPopUp={toggleShowOpPopUp}
            token={props.token}
            setLoading={props.setLoading}
            //updateOff={props.updateOff}
            setMode={props.setMode}
            //removeOffs={props.removeOffs}
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
