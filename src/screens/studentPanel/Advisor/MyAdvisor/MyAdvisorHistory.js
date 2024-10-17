import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {useParams} from 'react-router';
import {useCallback} from 'react';
import {fetchSchedule} from '../../../advisorPanel/Schedule/components/Utility';
import Day from '../../MyLifeStyle.js/components/Day';
import vars from '../../../../styles/root';

function MyAdvisorHistory(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [schedules, setSchedules] = useState();
  const [selectedSchedule, setSelectedSchedule] = useState();
  const [selectedWeek, setSelectedWeek] = useState();
  const params = useParams();

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.getMyAdvisorHistory + params.reqId,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setSchedules(res[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callFetchSchedule = useCallback(scheduleId => {
    Promise.all([fetchSchedule(state.token, scheduleId)]).then(res => {
      if (res[0] == null) {
        props.navigate('/');
        return;
      }
      setSelectedSchedule(res[0]);
      dispatch({isRightMenuVisible: false});
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectOnce(() => {
    fetchData();
  });

  return (
    <>
      {!selectedSchedule && (
        <CommonWebBox header={'تاریخچه کاربرگها'}>
          {schedules &&
            schedules.map((e, index) => {
              return (
                <SimpleText
                  onPress={() => {
                    setSelectedWeek(e.weekStartAt);
                    callFetchSchedule(e.id);
                  }}
                  text={'برنامه هفتگی ' + e.weekStartAt}
                  style={{
                    color: '#0000ff',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  key={index}
                />
              );
            })}
        </CommonWebBox>
      )}
      {selectedSchedule && (
        <>
          <EqualTwoTextInputs>
            <SimpleText
              style={{
                color: vars.DARK_BLUE,
                fontWeight: 'bold',
                fontSize: '20px',
                marginRight: '40px',
                alignContent: 'center',
              }}
              text={selectedWeek}
            />
            <CommonButton
              title={'بازگشت'}
              onPress={() => {
                setSelectedSchedule(undefined);
                dispatch({isRightMenuVisible: true});
              }}
            />
          </EqualTwoTextInputs>
          {selectedSchedule.days &&
            selectedSchedule.days.map((e, index) => {
              return (
                <Day
                  isInPhone={state.isInPhone}
                  token={state.token}
                  boxes={e.items}
                  day={e.day}
                  key={index}
                  canEdit={false}
                />
              );
            })}
        </>
      )}
    </>
  );
}

export default MyAdvisorHistory;
