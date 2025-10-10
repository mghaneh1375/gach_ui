import React, {useCallback, useEffect, useState} from 'react';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import {PhoneView} from '@/styles/CommonComponents.jsx';
import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility.js';
import Card from './Card.jsx';
function Badge(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [badges, setBadges] = useState();
  const fetchData = useCallback(() => {
    dispatch({
      loading: true,
    });
    Promise.all([
      generalRequest(
        routes.getAllBadgesForPublic,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setBadges(res[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PhoneView
      style={{
        gap: '10px',
        paddingTop: '20px',
        paddingLeft: '10px',
        paddingRight: '10px',
      }}>
      {badges &&
        badges.map((e, index) => {
          return <Card key={index} badge={e} isInPhone={state.isInPhone} />;
        })}
    </PhoneView>
  );
}
export default Badge;
