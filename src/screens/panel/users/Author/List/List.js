import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native-web';
import {CommonWebBox, SimpleText} from '../../../../../styles/Common';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import Translate from '../Translator';
import {useState} from 'react';
import Ops from './Ops/Ops';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import Columns from './Ops/Columns';
//import {routes} from '../../../../../../API/APIRoutes';

function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(true);
  const changeMode = newMode => {
    props.setMode(newMode);
  };
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedUser(props.users[idx]);
    toggleShowOpPopUp();
  };

  return (
    <CommonWebBox
      header={Translate.author}
      addBtn={true}
      onAddClick={() => props.setMode('createAuthor')}>
      <View style={{zIndex: 'unset'}}>
        {showOpPopUp && (
          <Ops
            author={props.selectedUser}
            updateAuthor={props.updateAuthor}
            token={props.token}
            setMode={props.setMode}
            //setLoading={props.setLoading}
            changeMode={changeMode}
            toggleShowPopUp={toggleShowOpPopUp}
          />
        )}
      </View>
      <View>
        <CommonDataTable
          columns={Columns}
          data={props.users}
          setData={props.setData}
          handleOp={handleOp}
          //removeUrl={routes.removeSchools}
          token={props.token}
          setLoading={props.setLoading}
        />
      </View>
    </CommonWebBox>
  );
}

export default List;
