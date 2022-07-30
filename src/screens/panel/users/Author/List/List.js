import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native-web';
import {CommonWebBox, SimpleText} from '../../../../../styles/Common';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import Translate from '../Translator';
import {useState} from 'react';
import Ops from './Ops/Ops';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import columns from './AuthorTableStructure';
import {routes} from '../../../../../API/APIRoutes';

//import {routes} from '../../../../../../API/APIRoutes';

function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const changeMode = newMode => {
    props.setMode(newMode);
  };
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedUser(props.authors[idx]);
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
            setLoading={props.setLoading}
            changeMode={changeMode}
            toggleShowPopUp={toggleShowOpPopUp}
          />
        )}
      </View>
      <View>
        <CommonDataTable
          columns={columns}
          data={props.authors}
          setData={props.setAuthors}
          handleOp={handleOp}
          removeUrl={routes.removeAuthors}
          token={props.token}
          setLoading={props.setLoading}
        />
      </View>
    </CommonWebBox>
  );
}

export default List;
