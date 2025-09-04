import {CommonButton, CommonWebBox, PhoneView, MyView} from '@/styles';
import Translate from '../translator';
import React, {useState} from 'react';
import Ops from './ops/Ops.jsx';
import CommonDataTable from '../../../../../styles/common/CommonDataTable.jsx';
import columns from './authorTableStructure';
import {routes} from '@/api/apiRoutes';
import JustBottomBorderTextInput from '../../../../../styles/common/JustBottomBorderTextInput.jsx';
import commonTranslator from '@/translator/common';
import {changeText, removeItems} from '../../../../../services/utility';
function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [tag, setTag] = useState();
  const changeMode = newMode => {
    props.setMode(newMode);
  };
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const [selectedUserId, setSelectedUserId] = useState();
  const handleOp = idx => {
    props.setSelectedUser(props.authors[idx]);
    setSelectedUserId(props.authors[idx].id);
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
            authorId={selectedUserId}
            updateAuthor={props.updateAuthor}
            token={props.token}
            setMode={props.setMode}
            setLoading={props.setLoading}
            changeMode={changeMode}
            toggleShowPopUp={toggleShowOpPopUp}
            afterDelete={ids => {
              removeItems(props.authors, props.setAuthors, ids);
              toggleShowOpPopUp();
            }}
          />
        )}
      </MyView>
      <MyView>
        <PhoneView
          style={{
            gap: 15,
          }}>
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
