import React, {useState} from 'react';
import {View} from 'react-native';
import {useLocation} from 'react-router';
import {dispatchStateContext, globalStateContext} from '../../../../../App';
import List from './list/List';
import Create from './create/Create';
import {addItem} from '../../../../../services/Utility';

function WinList(props) {
  const queryString = require('query-string');
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [mode, setMode] = useState('list');
  const [state, dispatch] = useGlobalState();
  const [gifts, setGifts] = useState();
  const [selectedGift, setSelectedGift] = useState({});
  //   const isAdmin = isUserAdmin(props.user);
  //   const setLoading = status => {
  //     dispatch({loading: status});
  //   };

  //   let {search} = useLocation();

  //   React.useEffect(() => {
  //     const params = queryString.parse(search);
  //     filter(
  //       {
  //         setLoading: status => dispatch({loading: status}),
  //         token: props.token,
  //         setGifts: setGifts,
  //         navigate: navigate,
  //         isAdmin: isAdmin,
  //       },
  //       undefined,
  //       params !== undefined ? params.section : undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //     );
  //   }, [navigate, props.token, isAdmin, search, dispatch]);

  return (
    <View>
      {mode === 'list' && (
        <List
          setMode={setMode}
          //   setLoading={setLoading}
          gifts={gifts}
          //   isAdmin={isAdmin}
          setGifts={setGifts}
          token={props.token}
          setSelectedGift={setSelectedGift}
        />
      )}
      {mode === 'create' && (
        <Create
          user={props.user}
          setMode={setMode}
          gifts={gifts}
          //   setLoading={setLoading}
          //   isAdmin={isAdmin}
          //   addGift={newGift => addItem(gifts, setGifts, newGift)}
          token={props.token}
        />
      )}
      {/*{mode === 'show' && (
        <Show
          isAdmin={isAdmin}
          user={props.user}
          setLoading={setLoading}
          updateGift={gift => editItem(gifts, setGifts, gift)}
          setSelectedGift={setSelectedGift}
          gift={selectedGift}
          token={props.token}
          setMode={setMode}
        />
      )} */}
    </View>
  );
}

export default WinList;
