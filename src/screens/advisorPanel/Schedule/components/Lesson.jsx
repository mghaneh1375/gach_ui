import React, {useState} from 'react';
import {View} from 'react-native';
import {convertSecToMinWithOutSec} from '../../../../services/Utility';
import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import {
  advisorScheduleContext,
  dispatchAdvisorScheduleContext,
} from './Context';
import {lessonsInSchedule} from './Utility';

function Lesson(props) {
  const [boxes, setBoxes] = useState();
  const [isWorking, setIsWorking] = useState(false);

  const useGlobalState = () => [
    React.useContext(advisorScheduleContext),
    React.useContext(dispatchAdvisorScheduleContext),
  ];

  const [state, dispatch] = useGlobalState();

  React.useEffect(() => {
    setBoxes(props.boxes);
  }, [props.boxes]);

  const fetchData = React.useCallback(() => {
    if (isWorking || state.selectedSchedule.lessonsStats !== undefined) return;

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      lessonsInSchedule(
        props.token,
        state.selectedSchedule.id,
        props.isAdvisor,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) {
        props.setMode('list');
        return;
      }

      state.selectedSchedule.lessonsStats = res[0];

      dispatch({selectedSchedule: state.selectedSchedule});

      setIsWorking(false);
    });
  }, [state.selectedSchedule, dispatch, props, isWorking]);

  React.useEffect(() => {
    if (
      state.selectedSchedule === undefined ||
      state.selectedSchedule.lessonsStats !== undefined
    )
      return;
    fetchData();
  }, [state.selectedSchedule, fetchData]);

  return (
    <CommonWebBox
      header={
        props.isAdvisor ? 'گزارش تفکیکی ' + state.student.name : 'گزارش تفکیکی '
      }
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      {state.selectedSchedule?.lessonsStats !== undefined &&
        state.selectedSchedule.lessonsStats.map((e, index) => {
          return (
            <PhoneView
              key={index}
              style={{...styles.gap15, ...{flexWrap: 'nowrap'}}}>
              <MyView
                style={{
                  backgroundColor: vars.DARK_BLUE,
                  padding: 40,
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  minWidth: 150,
                  gap: 10,
                }}>
                <SimpleText
                  text={e.lesson}
                  style={{fontSize: 18, color: 'white'}}
                />
                <SimpleText
                  text={
                    'مدت برنامه ریزی شده: ' +
                    convertSecToMinWithOutSec(e.stats.total * 60)
                  }
                  style={{fontSize: 12, color: 'white', maxWidth: 130}}
                />
                <SimpleText
                  text={
                    'مدت انجام شده: ' +
                    convertSecToMinWithOutSec(e.stats.done * 60)
                  }
                  style={{fontSize: 12, color: 'white', maxWidth: 130}}
                />
              </MyView>
              <View
                style={{
                  flexWrap: 'nowrap',
                  flexDirection: 'row',
                  overflow: 'auto',
                  maxWidth: 'calc(100% - 300px)',
                  gap: 20,
                }}>
                {e.stats.tags.map((itr, index2) => {
                  return (
                    <MyView
                      key={index2}
                      style={{
                        backgroundColor: vars.DARK_BLUE,
                        padding: 40,
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                        minWidth: 150,
                        gap: 10,
                      }}>
                      <SimpleText
                        text={itr.tag}
                        style={{fontSize: 14, color: 'white'}}
                      />
                      <SimpleText
                        text={
                          'مدت برنامه ریزی شده: ' +
                          convertSecToMinWithOutSec(itr.stats.total * 60)
                        }
                        style={{fontSize: 12, color: 'white', maxWidth: 130}}
                      />
                      <SimpleText
                        text={
                          'مدت انجام شده: ' +
                          convertSecToMinWithOutSec(itr.stats.done * 60)
                        }
                        style={{fontSize: 12, color: 'white', maxWidth: 130}}
                      />

                      {itr.stats.additionalLabel !== undefined && (
                        <SimpleText
                          text={
                            itr.stats.additionalLabel +
                            ' تعریف شده : ' +
                            itr.stats.additionalTotal
                          }
                          style={{fontSize: 12, color: 'white', maxWidth: 130}}
                        />
                      )}

                      {itr.stats.additionalLabel !== undefined && (
                        <SimpleText
                          text={
                            itr.stats.additionalLabel +
                            ' انجام شده : ' +
                            itr.stats.additionalDone
                          }
                          style={{fontSize: 12, color: 'white', maxWidth: 130}}
                        />
                      )}
                    </MyView>
                  );
                })}
              </View>
            </PhoneView>
          );
        })}
    </CommonWebBox>
  );
}

export default Lesson;
