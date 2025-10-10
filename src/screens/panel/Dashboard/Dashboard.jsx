import {faCog} from '@fortawesome/free-solid-svg-icons';
import React, {useMemo, useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility.js';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import {CommonWebBox, MyView, PhoneView} from '@/styles/CommonComponents.jsx';
import {FontIcon} from '@/styles/common/FontIcon.jsx';
import vars from '@/styles/root';
import DashboardCard from '../../studentPanel/dashboard/dashboardCard/DashboardCard.jsx';
import Config from './components/Config.jsx';
import {itemsIcon, itemsUrl} from './components/items';
import {Translate} from './components/translate';
import {useNavigate} from 'react-router';
import TopAdvisor from './components/TopAdvisor.jsx';
import Titr from '../quiz/components/Titr.jsx';
import Card from '@/screens/general/packages/components/Card';

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
        routes.adminDashboardInfo,
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
                      subtext={data[e]}
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
            {data?.topAdvisors && (
              <>
                <Titr title={Translate.topAdvisors} />
                <PhoneView style={{gap: 10}}>
                  {data.topAdvisors.map((advisor, index) => (
                    <TopAdvisor key={index} advisor={advisor} />
                  ))}
                </PhoneView>
              </>
            )}
            {data.topLastWeekBestSeller &&
              data.topLastWeekBestSeller.length > 0 && (
                <>
                  <Titr title={Translate.topLastWeekBestSeller} />
                  <PhoneView style={{gap: 10}}>
                    {data.topLastWeekBestSeller.map((e, index) => (
                      <Card
                        isInMyMode={false}
                        isInPhone={state.isInPhone}
                        tutorial={e}
                        key={index}
                      />
                    ))}
                  </PhoneView>
                </>
              )}
          </>
        )}

        {mode === 'config' && (
          <Config token={state.token} onClose={() => setMode('dashboard')} />
        )}
      </CommonWebBox>
    </MyView>
  );
}
export default Dashboard;
