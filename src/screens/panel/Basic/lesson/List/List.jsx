import {useState} from 'react';
import {View} from 'react-native';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import {routes} from '../../../../../API/APIRoutes';
import columns from './TableStructure';
import commonTranslator from '../../../../../tranlates/Common';
import Ops from '../Ops';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {CommonWebBox} from '../../../../../styles/Common';
function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const changeMode = newMode => {
    props.setMode(newMode);
  };

  const handleOp = idx => {
    props.setSelectedGrade(props.grades[idx]);
    toggleShowOpPopUp();
  };

  return (
    <View>
      {showOpPopUp && (
        <Ops
          lesson={props.selectedLesson}
          token={props.token}
          setLoading={props.setLoading}
          changeMode={changeMode}
          toggleShowPopUp={toggleShowOpPopUp}
        />
      )}

      <CommonWebBox>
        <View>
          <TextIcon
            onPress={() => changeMode('create')}
            theme={'rect'}
            text={commonTranslator.lessonsDefinition}
            icon={faPlus}
          />
          <CommonDataTable
            columns={columns}
            data={props.Lesson}
            setData={props.setLesson}
            handleOp={handleOp}
            removeUrl={routes.removeLesson}
            token={props.token}
            setLoading={props.setLoading}
          />
        </View>
      </CommonWebBox>
    </View>
  );
}

export default List;