import {View} from 'react-native';
import {CommonWebBox, SimpleText} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import Translate from '../Translator';
import Columns from './Ops/Columns';
import {useState} from 'react';
import Ops from './Ops/Ops';

function Show(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
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
      header={Translate.showAuthor}
      addBtn={true}
      onAddClick={() => props.setMode('createTransaction')}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
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

export default Show;
