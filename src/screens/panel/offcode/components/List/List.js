import {useState} from 'react';
import {View} from 'react-native';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import Ops from '../Ops';
import translator from '../../Translator';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import columns from './TableStructure';
import {routes} from '../../../../../API/APIRoutes';
import Filter from './Filter';

const List = props => {
  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedOff(props.offs[idx]);
    toggleShowOpPopUp();
  };

  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          off={props.selectedOff}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          updateOff={props.updateOff}
          setMode={props.setMode}
          removeOffs={props.removeOffs}
        />
      )}
      <CommonWebBox
        header={translator.offs}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <MyView>
          <Filter
            setData={props.setData}
            token={props.token}
            setLoading={props.setLoading}
          />
          <CommonDataTable
            columns={columns}
            data={props.offs}
            setData={props.setData}
            handleOp={handleOp}
            removeUrl={routes.removeOffs}
            token={props.token}
            setLoading={props.setLoading}
          />
        </MyView>
      </CommonWebBox>
    </MyView>
  );
};

export default List;
