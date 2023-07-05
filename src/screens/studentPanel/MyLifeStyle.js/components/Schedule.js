import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import {
  addItemToDay,
  fetchExamTags,
  fetchLifeStyleTags,
  fetchMyLifeStyle,
  removeItemFromDay,
  setMyExamInLifeStyle,
} from '../Utility';
import {dispatchScheduleContext, scheduleContext} from './Context';
import Day from './Day';
import commonTranslator from '../../../../translator/Common';
import {styles} from '../../../../styles/Common/Styles';
import Tag from './Tag';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {showError} from '../../../../services/Utility';
import Exam from './Exam';

function Schedule(props) {
  const useGlobalState = () => [
    React.useContext(scheduleContext),
    React.useContext(dispatchScheduleContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [selectedDay, setSelectedDay] = useState();
  const [selectedTag, setSelectedTag] = useState();
  const [selectedExams, setSelectedExams] = useState([]);
  const [duration, setDuration] = useState();
  const [startAt, setStartAt] = useState();

  const canEdit = props.userId === undefined;

  const fetchData = React.useCallback(() => {
    Promise.all([
      fetchMyLifeStyle(props.token, props.userId),
      fetchLifeStyleTags(props.token),
      fetchExamTags(props.token),
    ]).then(res => {
      if (res[0] == null || res[1] == null || res[2] == null) {
        props.navigate('/');
        return;
      }

      dispatch({
        myLifeStyle: res[0].days,
        myExams: res[0].exams,
        lifeStyleTags: res[1],
        examTags: res[2],
      });
      setSelectedExams(
        res[0].exams.map(e => {
          return res[2].find(ee => ee.label === e).id;
        }),
      );
    });
  }, [props, dispatch]);

  React.useEffect(() => {
    setSelectedTag();
    setStartAt();
    setDuration();
  }, [selectedDay]);

  useEffectOnce(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {selectedDay !== undefined && (
        <LargePopUp
          toggleShowPopUp={() => setSelectedDay(undefined)}
          btns={
            <CommonButton
              onPress={async () => {
                if (selectedTag == undefined) {
                  showError('لطفا تگ موردنظر خود را انتخاب کنید');
                  return;
                }
                if (duration === undefined) {
                  showError('لطفا مدت را تعیین کنید');
                  return;
                }
                props.setLoading(true);
                let res = await addItemToDay(
                  {
                    tag: selectedTag,
                    duration: duration,
                    startAt: startAt,
                    day: selectedDay,
                  },
                  props.token,
                );
                props.setLoading(false);
                if (res !== null) {
                  let tmp = state.myLifeStyle.find(e => e.day == selectedDay);
                  tmp.items.push({
                    tag: state.lifeStyleTags.find(e => e.id === selectedTag)
                      .label,
                    duration: duration,
                    startAt: startAt,
                  });
                  setSelectedDay();
                }
              }}
              theme={'dark'}
              title={commonTranslator.confirm}
            />
          }>
          <SimpleText text={'لطفا تگ موردنظر خود را انتخاب نمایید'} />
          <PhoneView style={{...styles.gap15}}>
            {state.lifeStyleTags !== undefined &&
              state.lifeStyleTags.map((e, index) => {
                return (
                  <Tag
                    selectedTag={selectedTag}
                    id={e.id}
                    onClick={() => {
                      setSelectedTag(e.id);
                    }}
                    label={e.label}
                    key={index}
                  />
                );
              })}
          </PhoneView>
          <PhoneView style={{...styles.gap15, ...styles.marginTop20}}>
            <JustBottomBorderTextInput
              subText={'مدت (به دقیقه)'}
              placeholder={'مدت (به دقیقه)'}
              value={duration}
              onChangeText={e => setDuration(e)}
            />
            <JustBottomBorderTextInput
              subText={'زمان شروع (اختیاری)'}
              placeholder={'زمان شروع (اختیاری)'}
              value={startAt}
              onChangeText={e => setStartAt(e)}
            />
          </PhoneView>
        </LargePopUp>
      )}
      <CommonWebBox>
        <SimpleText text={'آیا در آزمون خاصی شرکت می کنی؟'} />
        <PhoneView style={{...styles.gap15}}>
          {state.examTags !== undefined &&
            state.examTags.map((e, index) => {
              return (
                <Exam
                  selectedExams={selectedExams}
                  id={e.id}
                  onClick={() => {
                    if (!canEdit) return;
                    let tmp = [];
                    let shouldAdd = true;

                    selectedExams.forEach(itr => {
                      if (itr === e.id) {
                        shouldAdd = false;
                        return;
                      }
                      tmp.push(itr);
                    });

                    if (shouldAdd) tmp.push(e.id);
                    setSelectedExams(tmp);
                  }}
                  label={e.label}
                  key={index}
                />
              );
            })}
        </PhoneView>

        {canEdit && (
          <CommonButton
            onPress={async () => {
              await setMyExamInLifeStyle({exams: selectedExams}, props.token);
            }}
            title={commonTranslator.confirm}
            theme={'dark'}
          />
        )}
      </CommonWebBox>
      <CommonWebBox>
        {state.myLifeStyle !== undefined &&
          state.myLifeStyle.map((e, index) => {
            return (
              <Day
                setLoading={props.setLoading}
                token={props.token}
                addNewItem={() => {
                  setSelectedDay(e.day);
                }}
                boxes={e.items}
                day={e.day}
                key={index}
                canEdit={canEdit}
                onRemove={
                  !canEdit
                    ? undefined
                    : async (ee, callBack) => {
                        props.setLoading(true);
                        let res = await removeItemFromDay(
                          {
                            tag: ee.tag,
                            day: e.day,
                          },
                          props.token,
                        );
                        props.setLoading(false);
                        if (res != null) {
                          callBack();
                        }
                      }
                }
              />
            );
          })}
      </CommonWebBox>
    </>
  );
}

export default Schedule;
