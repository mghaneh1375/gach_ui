import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '../../../../../styles/Common';
import Translate from '../Translator';
import React, {useState} from 'react';
import Ops from './Ops/Ops';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import columns from './AuthorTableStructure';
import {routes} from '../../../../../API/APIRoutes';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../../tranlates/Common';
import {changeText} from '../../../../../services/Utility';

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
      <MyView>
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
      </MyView>
      <MyView>
        <PhoneView style={{gap: 15}}>
          <JustBottomBorderTextInput
            placeholder={commonTranslator.tag}
            subText={commonTranslator.tag}
            value={tag}
            onChangeText={text => changeText(text, setTag)}
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
      </MyView>
    </CommonWebBox>
  );
}

export default List;
