import {useState} from 'react';
import {View} from 'react-native';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
import Translator from '../../Translator';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {routes} from '../../../../../API/APIRoutes';
import columns from './TableStructure';
import Ops from '../Ops';
import {levelsKeyVals} from '../../../ticket/components/KeyVals';
import {useParams} from 'react-router';

function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const changeMode = newMode => {
    props.setMode(newMode);
  };

  const handleOp = idx => {
    props.setSelectedUser(props.users[idx]);
    toggleShowOpPopUp();
  };

  const currLevel = useParams().level;

  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          user={props.selectedUser}
          updateUser={props.updateUser}
          token={props.token}
          setLoading={props.setLoading}
          changeMode={changeMode}
          toggleShowPopUp={toggleShowOpPopUp}
        />
      )}
      <CommonWebBox
        addBtn={true}
        onAddClick={() => props.setMode('create')}
        header={
          Translator.list +
          levelsKeyVals.find(elem => elem.id === currLevel).item
        }>
        <MyView>
          {/* <Filter
            setData={props.setData}
            token={props.token}
            setLoading={props.setLoading}
            states={props.states}
          /> */}
          <CommonDataTable
            columns={columns}
            data={props.users}
            setData={props.setData}
            handleOp={handleOp}
            removeUrl={routes.removeSchools}
            token={props.token}
            setLoading={props.setLoading}
          />
        </MyView>
      </CommonWebBox>
    </MyView>
  );
}

export default List;
