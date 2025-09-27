import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import {formatPrice} from '@/services/utility.js';
import {FontIcon} from '@/styles/common/FontIcon.jsx';
import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '@/styles/CommonComponents.jsx';
import vars from '@/styles/root';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import React, {useMemo, useState} from 'react';
import {useNavigate} from 'react-router';
import DashboardCard from '../../studentPanel/dashboard/dashboardCard/DashboardCard.jsx';
import AdviceRequest from './components/AdviceRequest.jsx';
import Config from './components/Config.jsx';
import {itemsIcon, itemsUrl} from './components/items';
import Notif from './components/Notif.jsx';
import {Translate} from './components/translate';
import UnSeenTickets from './components/UnSeenTickets.jsx';
import LastComment from './components/LastComment.jsx';
import Schedules from './components/Schedules.jsx';

function Dashboard() {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [data, setData] = useState();
  const [mode, setMode] = useState('dashboard');
  const [state, dispatch] = useGlobalState();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch({
      loading: true,
    });
    Promise.all([
      generalRequest(
        routes.advisorDashboardInfo,
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
        navigate('/');
        return;
      }
      setData(res[0]);
    });
  }, [navigate, state.token, dispatch]);
  const [colors, icons, urls] = useMemo(
    () => [
      [vars.YELLOW, vars.GREEN, vars.ORANGE_RED, vars.DARK_BLUE],
      itemsIcon,
      itemsUrl,
    ],
    [],
  );
  return (
    <MyView>
      <CommonWebBox
        header={Translate.dashboard}
        btn={
          <FontIcon
            onPress={() => setMode('config')}
            back={'blue'}
            theme="rect"
            kind="normal"
            icon={faCog}
          />
        }>
        {data && mode === 'dashboard' && (
          <>
            {data.adviceRequests &&
              data.adviceRequests !== null &&
              data.adviceRequests.length > 0 && (
                <>
                  <SimpleText
                    style={{
                      color: vars.DARK_BLUE,
                      fontWeight: 'bold',
                      fontSize: '18px',
                      borderBottom: `2px solid ${vars.DARK_BLUE}`,
                      paddingBottom: '8px',
                    }}
                    text={Translate.newRequests}
                  />
                  {data.adviceRequests.map((request, index) => (
                    <AdviceRequest
                      key={index}
                      firstname={request.student.firstname}
                      lastname={request.student.lastname}
                      price={request.planDigest.price}
                      title={request.planDigest.title}
                      requestAt={request.requestAt}
                    />
                  ))}
                </>
              )}

            {data.lastNotifs &&
              data.lastNotifs !== null &&
              data.lastNotifs.length > 0 && (
                <>
                  <SimpleText
                    style={{
                      color: vars.DARK_BLUE,
                      fontWeight: 'bold',
                      fontSize: '18px',
                      borderBottom: `2px solid ${vars.DARK_BLUE}`,
                      paddingBottom: '8px',
                    }}
                    text={Translate.lastNotifs}
                  />
                  {data.lastNotifs.map((notif, index) => (
                    <Notif
                      key={index}
                      createdAt={notif.createdAt}
                      title={notif.title}
                      id={notif.id}
                    />
                  ))}
                </>
              )}

            <SimpleText
              style={{
                color: vars.DARK_BLUE,
                fontWeight: 'bold',
                fontSize: '18px',
                borderBottom: `2px solid ${vars.DARK_BLUE}`,
                paddingBottom: '8px',
              }}
              text={Translate.stats}
            />
            <PhoneView>
              {Object.keys(data)
                .filter(e => Number.isInteger(data[e]))
                .map((e, index) => {
                  return (
                    <DashboardCard
                      key={index}
                      width={state.isInPhone ? '100%' : undefined}
                      fontSize={18}
                      text={Translate[e]}
                      theme={colors[index % 4]}
                      subtext={formatPrice(data[e])}
                      borderRight={true}
                      borderRightWidth={18}
                      multiline={true}
                      icon={icons[e]}
                      onPress={() =>
                        urls[e] !== undefined
                          ? window.open(urls[e])
                          : console.log('no_action_defined')
                      }
                    />
                  );
                })}
            </PhoneView>

            {data.inProgressSchedules &&
              data.inProgressSchedules !== null &&
              data.inProgressSchedules.length > 0 && (
                <>
                  <SimpleText
                    style={{
                      color: vars.DARK_BLUE,
                      fontWeight: 'bold',
                      fontSize: '18px',
                      borderBottom: `2px solid ${vars.DARK_BLUE}`,
                      paddingBottom: '8px',
                    }}
                    text={Translate.inProgressKarbargs}
                  />
                  <Schedules schedules={data.inProgressSchedules} />
                </>
              )}

            {data.unSeenTickets &&
              data.unSeenTickets !== null &&
              data.unSeenTickets.length > 0 && (
                <UnSeenTickets tickets={data.unSeenTickets} />
              )}

            {data.lastComments &&
              data.lastComments !== null &&
              data.lastComments.length > 0 && (
                <>
                  <SimpleText
                    style={{
                      color: vars.DARK_BLUE,
                      fontWeight: 'bold',
                      fontSize: '18px',
                      borderBottom: `2px solid ${vars.DARK_BLUE}`,
                      paddingBottom: '8px',
                    }}
                    text={Translate.lastComments}
                  />
                  {data.lastComments.map((comment, index) => (
                    <LastComment
                      isInPhone={state.isInPhone}
                      key={index}
                      comment={comment}
                    />
                  ))}
                </>
              )}
          </>
        )}

        {mode === 'config' && (
          <Config onClose={() => setMode('dashboard')} token={state.token} />
        )}
      </CommonWebBox>
    </MyView>
  );
}
export default Dashboard;
