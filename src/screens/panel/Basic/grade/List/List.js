import {useState} from 'react';
import {View} from 'react-native';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import {CommonWebBox} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {routes} from '../../../../../API/APIRoutes';
import columns from './TableStructure';
import commonTranslator from '../../../../../tranlates/Common';
import Ops from '../Ops';
import {removeItems} from '../../../../../services/Utility';

function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selected, setSelected] = useState();

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const changeMode = newMode => {
    props.setMode(newMode);
  };

  const handleOp = idx => {
    props.setSelectedGrade(props.grades[idx]);
    setSelected(props.grades[idx]);
    toggleShowOpPopUp();
  };

  return (
    <View>
      {showOpPopUp && (
        <Ops
          grade={selected}
          token={props.token}
          setLoading={props.setLoading}
          changeMode={changeMode}
          toggleShowPopUp={toggleShowOpPopUp}
          afterDelete={ids => {
            removeItems(props.grades, props.setGrades, ids);
            toggleShowOpPopUp();
          }}
        />
      )}
      <CommonWebBox>
        <View>
          <TextIcon
            onPress={() => changeMode('create')}
            theme={'rect'}
            text={commonTranslator.gradeDefinition}
            icon={faPlus}
          />
          <CommonDataTable
            columns={columns}
            data={props.grades}
            setData={props.setGrades}
            handleOp={handleOp}
            removeUrl={routes.removeGrades}
            token={props.token}
            setLoading={props.setLoading}
          />
        </View>
      </CommonWebBox>
    </View>
  );
}

export default List;
