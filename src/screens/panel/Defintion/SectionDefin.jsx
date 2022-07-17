import React, {useState} from 'react';
import {View} from 'react-native-web';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {CommonWebBox} from '../../../styles/Common';
import translator from '../../../tranlates/Common';

function SectionDefin() {
  const [mode, setMode] = useState('list');
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState();
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  return (
    <View>
      <CommonWebBox header={translator.sectionsDefin} />
    </View>
  );
}

export default SectionDefin;
