import {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import columns from './TableStructure';
import commonTranslator from '../../../../../translator/Common';
import Ops from '../Ops';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
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
    props.setSelectedLesson(props.lessons[idx]);
    setSelected(props.lessons[idx]);
    toggleShowOpPopUp();
  };

  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          lesson={selected}
          token={props.token}
          setLoading={props.setLoading}
          changeMode={changeMode}
          toggleShowPopUp={toggleShowOpPopUp}
          afterDelete={ids => {
            removeItems(props.lessons, props.setLessons, ids);
            toggleShowOpPopUp();
          }}
        />
      )}
      <CommonWebBox
        header={commonTranslator.lessonsDefinition}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <CommonDataTable
          columns={columns}
          data={props.lessons}
          setData={props.setLessons}
          handleOp={handleOp}
          removeUrl={routes.removeLessons}
          token={props.token}
          setLoading={props.setLoading}
        />
      </CommonWebBox>
    </MyView>
  );
}

export default List;
