import React, {useState} from 'react';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {CommonWebBox} from '../../../../../../styles/Common';
import {TextIcon} from '../../../../../../styles/Common/TextIcon';
import translator from '../../Translator';
import Filter from './Filter';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import columns from './TableStruture';
import {routes} from '../../../../../../API/APIRoutes';
import Ops from '../Ops';

function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const changeMode = newMode => {
    props.setMode(newMode);
  };

  const handleOp = idx => {
    props.setSelectedSchool(props.schools[idx]);
    toggleShowOpPopUp();
  };

  return (
    <View>
      {showOpPopUp && (
        <Ops
          school={props.selectedSchool}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          updateSchool={props.updateSchool}
          setMode={props.setMode}
          removeSchools={props.removeSchools}
        />
      )}
      <CommonWebBox
        header={translator.offs}
        addbtn={true}
        onAddBtn={() => props.setMode('create')}>
        <View>
          <Filter
            setData={props.setData}
            token={props.token}
            setLoading={props.setLoading}
            states={props.states}
          />
          <CommonDataTable
            columns={columns}
            data={props.schools}
            setData={props.setData}
            handleOp={handleOp}
            removeUrl={routes.removeSchools}
            token={props.token}
            setLoading={props.setLoading}
          />
        </View>
      </CommonWebBox>
    </View>
  );
}

export default List;
