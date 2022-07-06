import React, {useState} from 'react';
import {View} from 'react-native-web';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {CommonButton, CommonWebBox, SimpleText} from '../../../styles/Common';
import Create from './components/Create';
import List from './components/List';
import SearchUser from '../../../components/web/SearchUser';

const Off = props => {
  const [mode, setMode] = useState('sa');
  const [offs, setOffs] = useState([]);
  const [selectedOff, setSelectedOff] = useState();

  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const addOffs = items => {
    if (items === undefined) return;
    let allOffs = offs;
    items.forEach(element => {
      allOffs.unshift(element);
    });
    setOffs(allOffs);
  };

  const removeOffs = items => {
    let allOffs = offs;

    allOffs = allOffs.filter(function (element) {
      return items.indexOf(element.id) === -1;
    });

    setOffs(allOffs);
  };

  React.useEffect(() => {
    // dispatch({loading: true});
    // Promise.all([
    //   generalRequest(
    //     routes.fetchAllOffs,
    //     'get',
    //     undefined,
    //     'data',
    //     props.token,
    //   ),
    // ]).then(res => {
    //   if (res[0] == null) {
    //     navigate('/');
    //     return;
    //   }
    //   setOffs(res[0]);
    //   dispatch({loading: false});
    // });
  }, [navigate, props.token, dispatch]);

  const [showSearchUser, setShowSearchUser] = useState(false);
  const [foundUser, setFoundUser] = useState();

  return (
    <View style={{zIndex: 10}}>
      <CommonWebBox
        child={
          <View>
            {foundUser !== undefined && (
              <SimpleText
                text={foundUser.nameFa + ' ' + foundUser.lastNameFa}
              />
            )}
            <CommonButton
              title={'جست و جو دانش آموز'}
              onPress={() => setShowSearchUser(true)}
            />
            <SearchUser
              setFinalResult={setFoundUser}
              setShow={setShowSearchUser}
              token={props.token}
              setLoading={setLoading}
              show={showSearchUser}
            />
          </View>
        }
      />

      {mode === 'list' && (
        <List
          offs={offs}
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
          setSelectedOff={setSelectedOff}
          selectedOff={selectedOff}
          removeOffs={removeOffs}
        />
      )}
      {mode === 'create' && (
        <Create
          setMode={setMode}
          addOffs={addOffs}
          setLoading={setLoading}
          token={props.token}
        />
      )}
    </View>
  );
};

export default Off;
