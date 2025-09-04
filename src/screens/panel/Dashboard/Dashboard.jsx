import {faCog} from '@fortawesome/free-solid-svg-icons';
import React, {useMemo, useState} from 'react';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {CommonWebBox, MyView, PhoneView} from '../../../styles/Common';
import {FontIcon} from '../../../styles/Common/FontIcon';
import vars from '../../../styles/root';
import DashboardCard from '../../studentPanel/dashboard/DashboardCard/DashboardCard';
import Config from './components/Config';
import {itemsIcon, itemsUrl} from './components/items';
import {Translate} from './components/translate';
import {useNavigate} from 'react-router';

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
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.adminDashboardInfo,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});

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
          <PhoneView>
            {Object.keys(data).map((e, index) => {
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
        )}
        {mode === 'config' && <Config />}
      </CommonWebBox>
    </MyView>
  );
}

export default Dashboard;
