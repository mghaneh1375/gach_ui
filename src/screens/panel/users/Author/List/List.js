import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import Translate from '../Translator';
import {useState} from 'react';
import Ops from './Ops/Ops';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import columns from './AuthorTableStructure';
import {routes} from '../../../../../API/APIRoutes';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../../tranlates/Common';

function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [tag, setTag] = useState();

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
        <PhoneView>
          <JustBottomBorderTextInput
            placeholder={'تگ'}
            value={tag}
            onChangeText={e => setTag(e)}
          />
          <CommonButton
            onPress={() => props.setTag(tag)}
            title={commonTranslator.search}
          />
        </PhoneView>
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
