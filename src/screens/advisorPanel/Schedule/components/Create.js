import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {
  addItemToSchedule,
  fetchSchedule,
  fetchTags,
  getLessons,
  removeItemFromSchedule,
} from './Utility';
import {
  advisorScheduleContext,
  dispatchAdvisorScheduleContext,
} from './Context';
import Day from '../../../studentPanel/MyLifeStyle.js/components/Day';
import {
  fetchExamTags,
  fetchMyLifeStyle,
} from '../../../studentPanel/MyLifeStyle.js/Utility';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../translator/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import Tag from '../../../studentPanel/MyLifeStyle.js/components/Tag';
import {removeItems, showError} from '../../../../services/Utility';
import TimePicker from '../../../../styles/Common/TimePicker';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(advisorScheduleContext),
    React.useContext(dispatchAdvisorScheduleContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [scheduleFor, setScheduleFor] = useState();
  const [description, setDescription] = useState();
  const [selectedTag, setSelectedTag] = useState();
  const [duration, setDuration] = useState();
  const [startAt, setStartAt] = useState();
  const [lesson, setLesson] = useState();
  const [additional, setAdditional] = useState();

  const scheduleForValues = [
    {id: 0, item: 'هفته جاری'},
    {id: 1, item: 'هفته بعد'},
    {id: 2, item: 'دو هفته بعد'},
    {id: 3, item: 'سه هفته بعد'},
    {id: 4, item: 'چهار هفته بعد'},
  ];

  const [isWorking, setIsWorking] = useState();

  const fetchScheduleLocal = React.useCallback(() => {
    if (isWorking || state.selectedSchedule?.days !== undefined) return;
    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      fetchSchedule(
        props.token,
        props.isInEditMode ? state.selectedSchedule.id : undefined,
        props.isInEditMode ? undefined : props.studentId,
        props.isInEditMode ? undefined : scheduleFor,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] == null) {
        props.navigate('/');
        return;
      }

      if (props.isInEditMode) {
        state.selectedSchedule.days = res[0].days;
        dispatch({
          selectedSchedule: state.selectedSchedule,
        });
      } else
        dispatch({
          selectedSchedule: res[0],
        });

      setIsWorking(false);
    });
  }, [props, isWorking, dispatch, scheduleFor, state.selectedSchedule]);

  React.useEffect(() => {
    if (scheduleFor === undefined) return;
    fetchScheduleLocal();
  }, [scheduleFor, fetchScheduleLocal]);

  React.useEffect(() => {
    if (!props.isInEditMode) return;

    fetchScheduleLocal();
  }, [props.isInEditMode, fetchScheduleLocal]);

  React.useEffect(() => {
    if (props.isInEditMode || scheduleFor === undefined) return;
    dispatch({selectedSchedule: undefined});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isInEditMode, scheduleFor]);

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    if (props.isAdvisor) {
      Promise.all([
        fetchTags(props.token),
        fetchMyLifeStyle(props.token, props.studentId),
        fetchExamTags(props.token),
        getLessons(),
      ]).then(res => {
        props.setLoading(false);

        if (
          res[0] == null ||
          res[1] == null ||
          res[2] == null ||
          res[3] == null
        ) {
          props.navigate('/');
          return;
        }

        dispatch({
          myLifeStyle: res[1].days,
          myExams: res[2].exams,
          tags: res[0],
          lessonsKeyVals: res[3],
        });
      });
    } else {
      Promise.all([fetchMyLifeStyle(props.token, props.studentId)]).then(
        res => {
          props.setLoading(false);

          if (res[0] == null) {
            props.navigate('/');
            return;
          }

          dispatch({
            myLifeStyle: res[0].days,
          });
        },
      );
    }
  }, [props, dispatch]);

  useEffectOnce(() => {
    if (state.tags !== undefined) return;
    fetchData();
  }, [fetchData]);

  const [selectedDay, setSelectedDay] = useState();
  const [showDailySchedule, setShowDailySchedule] = useState(true);
  const [boxes, setBoxes] = useState();

  React.useEffect(() => {
    if (
      state.myLifeStyle === undefined ||
      state.selectedSchedule?.days === undefined
    )
      return;
    if (showDailySchedule) {
      setBoxes(
        state.selectedSchedule.days.map((e, index) => {
          return {
            day: e.day,
            items: e.items.concat(
              state.myLifeStyle[index].items.map(itr => {
                return {...itr, canEdit: false, label: 'life'};
              }),
            ),
          };
        }),
      );
    } else setBoxes(state.selectedSchedule.days);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedSchedule?.days, state.myLifeStyle, showDailySchedule]);

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
                if (lesson === undefined) {
                  showError('لطفا حیطه موردنظر را وارد نمایید');
                  return;
                }

                if (
                  selectedTag?.numberLabel !== undefined &&
                  additional === undefined
                ) {
                  showError(
                    'لطفا ' + selectedTag?.numberLabel + ' را وارد نمایید',
                  );
                  return;
                }

                props.setLoading(true);
                let data = {
                  tag: selectedTag.id,
                  duration: duration,
                  startAt: startAt,
                  day: selectedDay,
                  lessonId: lesson.id,
                };

                if (state.selectedSchedule.id !== undefined)
                  data.id = state.selectedSchedule.id;
                else data.scheduleFor = scheduleFor;

                if (selectedTag?.numberLabel !== undefined)
                  data.additional = additional;

                if (description !== undefined) data.description = description;

                let res = await addItemToSchedule(
                  props.token,
                  props.studentId,
                  data,
                );
                props.setLoading(false);
                if (res !== null) {
                  if (res.scheduleId !== undefined)
                    state.selectedSchedule.id = res.scheduleId;

                  state.selectedSchedule.days = state.selectedSchedule.days.map(
                    e => {
                      if (e.day !== selectedDay) return e;
                      e.items.push({
                        tag: state.tags.find(e => e.id === selectedTag.id)
                          .label,
                        duration: duration,
                        startAt: startAt,
                        lesson: lesson.name,
                        id: res.id,
                        additionalLabel: selectedTag.numberLabel,
                        additional: additional,
                      });
                      return e;
                    },
                  );
                  dispatch({selectedSchedule: state.selectedSchedule});
                  setSelectedDay();
                  setDuration();
                  setSelectedTag();
                  setStartAt();
                  setDescription();
                  setLesson();
                  setAdditional();
                }
              }}
              theme={'dark'}
              title={commonTranslator.confirm}
            />
          }>
          <MyView
            style={{
              minHeight: '50vh',
            }}>
            <SimpleText text={'لطفا تگ موردنظر خود را انتخاب نمایید'} />
            <PhoneView style={{...styles.gap15}}>
              {state.tags !== undefined &&
                state.tags.map((e, index) => {
                  return (
                    <Tag
                      selectedTag={selectedTag?.id}
                      id={e.id}
                      onClick={() => {
                        setSelectedTag(e);
                      }}
                      label={e.label}
                      key={index}
                    />
                  );
                })}
            </PhoneView>
            <PhoneView
              style={{
                ...styles.gap15,
                ...styles.marginTop20,
              }}>
              <JustBottomBorderTextInput
                placeholder={commonTranslator.lesson}
                subText={commonTranslator.lesson}
                resultPane={true}
                setSelectedItem={item => {
                  setLesson(item);
                }}
                resultPaneHeight={300}
                values={state.lessonsKeyVals}
                value={lesson !== undefined ? lesson.name : ''}
                reset={false}
              />

              <JustBottomBorderTextInput
                subText={'مدت (به دقیقه)'}
                placeholder={'مدت (به دقیقه)'}
                value={duration}
                onChangeText={e => setDuration(e)}
              />

              <TimePicker
                subText={'زمان شروع (اختیاری)'}
                placeholder={'زمان شروع (اختیاری)'}
                onChangeText={e => setStartAt(e)}
              />
              {selectedTag?.numberLabel !== undefined && (
                <JustBottomBorderTextInput
                  placeholder={selectedTag.numberLabel}
                  subText={selectedTag.numberLabel}
                  justNum={true}
                  value={additional}
                  onChangeText={e => setAdditional(e)}
                />
              )}
            </PhoneView>
            <PhoneView>
              <JustBottomBorderTextInput
                multiline={true}
                value={description}
                onChangeText={e => setDescription(e)}
                placeholder={commonTranslator.description}
                subText={commonTranslator.optional}
              />
            </PhoneView>
          </MyView>
        </LargePopUp>
      )}
      <CommonWebBox
        header={props.isInEditMode ? '' : 'افزودن کاربرگ جدید'}
        btn={
          <PhoneView style={{...styles.alignItemsCenter}}>
            <CommonButton
              onPress={() => setShowDailySchedule(!showDailySchedule)}
              title={
                showDailySchedule
                  ? 'مخفی کردن برنامه روزانه'
                  : 'نمایش برنامه روزانه'
              }
            />
            <FontIcon
              onPress={() => {
                dispatch({schedules: undefined, selectedSchedule: undefined});
                props.setMode('list');
              }}
              theme="rect"
              kind="normal"
              icon={faArrowLeft}
            />
          </PhoneView>
        }>
        {props.isInEditMode && (
          <SimpleText
            text={
              'برنامه هفتگی ' +
              state.selectedSchedule.weekStartAt +
              ' - ' +
              state.student.name
            }
          />
        )}
        {!props.isInEditMode && (
          <PhoneView>
            <JustBottomBorderSelect
              setter={setScheduleFor}
              values={scheduleForValues}
              value={scheduleForValues.find(elem => elem.id === scheduleFor)}
              placeholder={'هفته موردنظر'}
            />
          </PhoneView>
        )}

        {boxes !== undefined &&
          boxes.map((e, index) => {
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
                canEdit={props.isAdvisor ? true : false}
                onRemove={
                  !props.isAdvisor
                    ? undefined
                    : async (ee, callBack) => {
                        props.setLoading(true);
                        let res = await removeItemFromSchedule(
                          props.token,
                          props.studentId,
                          ee.id,
                        );
                        props.setLoading(false);
                        if (res != null) {
                          removeItems(
                            state.selectedSchedule.days.find(
                              itr => itr.day === e.day,
                            ).items,
                            items => {
                              state.selectedSchedule.days =
                                state.selectedSchedule.days.map(itr => {
                                  if (itr.day === e.day) itr.items = items;
                                  return itr;
                                });
                              dispatch({
                                selectedSchedule: state.selectedSchedule,
                              });
                            },
                            [ee.id],
                          );
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

export default Create;
