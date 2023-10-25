import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
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
  setDoneInSchedule,
} from './Utility';
import {
  advisorScheduleContext,
  dispatchAdvisorScheduleContext,
} from './Context';
import Day from '../../../studentPanel/MyLifeStyle.js/components/Day';
import {
  fetchExamTags,
  fetchMyLifeStyle,
  fetchMySchedulesDigest,
  fetchStudentSchedulesDigest,
} from '../../../studentPanel/MyLifeStyle.js/Utility';
import {
  faArrowLeft,
  faFilePdf,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../translator/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import Tag from '../../../studentPanel/MyLifeStyle.js/components/Tag';
import {
  removeItems,
  showError,
  showSuccess,
  trueFalseValues,
} from '../../../../services/Utility';
import TimePicker from '../../../../styles/Common/TimePicker';
import {downloadRequest, generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import vars from '../../../../styles/root';
import LastBuyer from '../../../general/Packages/components/Detail/LastBuyer';
import {getGrades} from '../../../panel/Basic/Utility';

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

  const [showDonePopUp, setShowDonePopUp] = useState(false);
  const [fullDone, setFullDone] = useState();
  const [doneDuration, setDoneDuration] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [doneAdditional, setDoneAdditional] = useState();

  const [selectedDay, setSelectedDay] = useState();
  const [showDailySchedule, setShowDailySchedule] = useState(props.isAdvisor);
  const [boxes, setBoxes] = useState();
  const [desc, setDesc] = useState();

  const [selectedGrade, setSelectedGrade] = useState();
  const [lessonsKeyVals, setLessonsKeyVals] = useState();

  const scheduleForValues = [
    {id: 0, item: 'هفته جاری'},
    {id: 1, item: 'هفته بعد'},
    {id: 2, item: 'دو هفته بعد'},
    {id: 3, item: 'سه هفته بعد'},
    {id: 4, item: 'چهار هفته بعد'},
  ];

  const [selectedSchedule, setSelectedSchedule] = useState();
  const [uniqueAdvisors, setUniqueAdvisors] = useState();

  const [isWorking, setIsWorking] = useState();

  const fetchLessons = React.useCallback(() => {
    if (isWorking) return;

    let grade = state.grades.find(e => e.id === selectedGrade);
    if (grade === undefined) return;

    if (grade.lessons !== undefined) {
      setLessonsKeyVals(grade.lessons);
      return;
    }

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([getLessons(selectedGrade, grade.isOlympiad)]).then(res => {
      props.setLoading(false);

      if (res[0] === null) return;

      grade.lessons = res[0].map(e => {
        return {
          id: e.id,
          item: e.name,
        };
      });
      state.grades = state.grades.map(e => {
        if (e.id === selectedGrade) return grade;
        return e;
      });
      dispatch({grades: state.grades});
      setLessonsKeyVals(grade.lessons);
      setIsWorking(false);
    });
  }, [selectedGrade, isWorking, state, dispatch, props]);

  React.useEffect(() => {
    if (selectedGrade == null) return;
    fetchLessons();
  }, [selectedGrade, fetchLessons]);

  React.useEffect(() => {
    if (state.selectedSchedule?.days === undefined) return;
    let tmp = [];
    state.selectedSchedule?.days.forEach(e => {
      e.items.forEach(ee => {
        if (tmp.find(eee => eee.name == ee.advisor?.name) !== undefined) return;
        tmp.push({
          ...ee.advisor,
          ...{selected: true},
        });
      });
    });
    setUniqueAdvisors(tmp);
  }, [state.selectedSchedule?.days]);

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
        if (res[0].advisorsDesc !== undefined)
          state.selectedSchedule.advisorsDesc = res[0].advisorsDesc;
        setDesc(res[0].advisorDesc);
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
    if (state.selectedSchedule?.id === undefined) return;
    fetchScheduleLocal();
  }, [state.selectedSchedule?.id, fetchScheduleLocal]);

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
        getGrades(props.token),
        fetchStudentSchedulesDigest(
          props.studentId,
          props.token,
          props.isInEditMode,
        ),
      ]).then(res => {
        props.setLoading(false);

        if (
          res[0] == null ||
          res[1] == null ||
          res[2] == null ||
          res[3] == null ||
          res[4] == null
        ) {
          props.navigate('/');
          return;
        }

        if (props.isInEditMode)
          setSelectedSchedule(
            res[4].find(e => e.id === state.selectedSchedule.id),
          );

        dispatch({
          myLifeStyle: res[1].days,
          myExams: res[2].exams,
          tags: res[0],
          grades: res[3].map(e => {
            return {
              id: e.id,
              item: e.name,
              isOlympiad: e.isOlympiad,
            };
          }),
          myAllSchedulesDigest: res[4],
        });
      });
    } else {
      Promise.all([
        fetchMyLifeStyle(props.token, props.studentId),
        fetchMySchedulesDigest(props.token),
      ]).then(res => {
        props.setLoading(false);

        if (res[0] == null || res[1] == null) {
          props.navigate('/');
          return;
        }
        setSelectedSchedule(
          res[1].find(e => e.id === state.selectedSchedule.id),
        );

        dispatch({
          myLifeStyle: res[0].days,
          myAllSchedulesDigest: res[1],
        });
      });
    }
  }, [props, dispatch, state.selectedSchedule]);

  useEffectOnce(() => {
    if (state.tags !== undefined) return;
    fetchData();
  }, [fetchData]);

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

  const doneJob = async () => {
    let data = fullDone
      ? {fullDone: true}
      : {fullDone: false, duration: doneDuration};

    if (selectedItem.additionalLabel !== undefined) {
      if (doneAdditional === undefined) {
        showError('لطفا ' + selectedItem.additionalLabel + ' را وارد نمایید');
        return;
      }
      data.additional = doneAdditional;
    }

    props.setLoading(true);
    let res = await setDoneInSchedule(
      props.token,
      state.selectedSchedule.id,
      selectedItem.id,
      data,
    );
    props.setLoading(false);
    if (res != null) {
      state.selectedSchedule.days = res.days;
      dispatch({selectedSchedule: state.selectedSchedule});
      setShowDonePopUp(false);
      setDoneDuration();
      setDoneAdditional();
      setFullDone();
    }
  };

  return (
    <>
      {showDonePopUp && (
        <LargePopUp
          btns={
            <CommonButton
              theme={'dark'}
              title={'تایید'}
              onPress={() => doneJob()}
            />
          }
          toggleShowPopUp={() => setShowDonePopUp(false)}>
          <PhoneView style={{...styles.gap15}}>
            <JustBottomBorderSelect
              values={trueFalseValues}
              setter={setFullDone}
              value={trueFalseValues.find(e => e.id === fullDone)}
              placeholder={'کل برنامه انجام شد؟'}
              subText={'کل برنامه انجام شد؟'}
            />
            {fullDone !== undefined && !fullDone && (
              <JustBottomBorderTextInput
                value={doneDuration}
                onChangeText={e => setDoneDuration(e)}
                justNum={true}
                placeholder={'مدت انجام'}
                subText={
                  'مدت انجام  -  حداکثر ' + selectedItem.duration + ' دقیقه'
                }
              />
            )}

            {selectedItem.additionalLabel !== undefined && (
              <JustBottomBorderTextInput
                value={doneAdditional}
                onChangeText={e => setDoneAdditional(e)}
                justNum={true}
                placeholder={selectedItem.additionalLabel}
                subText={
                  selectedItem.additionalLabel +
                  ' انجام شده  -  حداکثر ' +
                  selectedItem.additional
                }
              />
            )}
          </PhoneView>
        </LargePopUp>
      )}
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
                  lessonId: lesson,
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
                        lesson: lessonsKeyVals.find(e => e.id === lesson)?.item,
                        id: res.id,
                        additionalLabel: selectedTag.numberLabel,
                        additional: additional,
                        advisor: {
                          name:
                            props.user.firstName + ' ' + props.user.lastName,
                          pic: props.user.pic,
                        },
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
                  setSelectedGrade();
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
              <JustBottomBorderSelect
                placeholder={commonTranslator.grade}
                subText={commonTranslator.grade}
                setter={setSelectedGrade}
                values={state.grades}
                value={state.grades.find(e => e.id === selectedGrade)}
              />

              {selectedGrade != undefined && lessonsKeyVals !== undefined && (
                <JustBottomBorderSelect
                  placeholder={commonTranslator.lesson}
                  subText={commonTranslator.lesson}
                  setter={setLesson}
                  values={lessonsKeyVals}
                  value={lessonsKeyVals.find(e => e.id === lesson)}
                />

                // <JustBottomBorderTextInput
                // placeholder={commonTranslator.lesson}
                // subText={commonTranslator.lesson}
                //   resultPane={true}
                //   setSelectedItem={item => {
                //     setLesson(item);
                //   }}
                //   resultPaneHeight={300}
                //   values={lessonsKeyVals}
                //   value={lesson !== undefined ? lesson.name : ''}
                //   reset={false}
                // />
              )}

              <JustBottomBorderTextInput
                subText={'مدت (به دقیقه)'}
                placeholder={'مدت (به دقیقه)'}
                value={duration}
                onChangeText={e => setDuration(e)}
              />

              <TimePicker
                subText={'زمان شروع (اختیاری)'}
                placeholder={'hh:mm'}
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
        header={
          props.isInEditMode && props.isAdvisor
            ? 'برنامه هفتگی ' +
              state.selectedSchedule.weekStartAt +
              ' - ' +
              state.student.name
            : 'برنامه های هفتگی'
        }
        btn={
          <PhoneView style={{...styles.alignItemsCenter}}>
            <SimpleFontIcon
              icon={faFilePdf}
              kind={'large'}
              style={{color: 'orangeRed'}}
              onPress={() =>
                downloadRequest(
                  routes.exportPDF + state.selectedSchedule.id,
                  undefined,
                  props.token,
                  undefined,
                  'کاربرگ ' + state.selectedSchedule.weekStartAt + '.pdf',
                )
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
        <EqualTwoTextInputs>
          <SimpleText
            style={{
              ...styles.colorOrangeRed,
              ...styles.cursor_pointer,
              ...styles.bold,
              ...styles.fontSize13,
              ...{marginTop: -15},
            }}
            onPress={() => setShowDailySchedule(!showDailySchedule)}
            text={
              showDailySchedule
                ? 'مخفی کردن برنامه روزانه'
                : 'نمایش برنامه روزانه'
            }
          />
          {state.selectedSchedule !== undefined && props.isAdvisor && (
            <SimpleText
              style={{
                ...styles.red,
                ...styles.cursor_pointer,
                ...styles.bold,
                ...styles.fontSize17,
                ...{marginTop: -15},
              }}
              onPress={async () => {
                props.setLoading(true);
                let res = await generalRequest(
                  routes.notifyStudentForSchedule + state.selectedSchedule.id,
                  'post',
                  undefined,
                  undefined,
                  props.token,
                );
                props.setLoading(false);
                if (res !== null) {
                  showSuccess();
                }
              }}
              text={'مطلع کردن دانش آموز'}
            />
          )}
          {state.selectedSchedule !== undefined && !props.isAdvisor && (
            <SimpleText
              style={{
                ...styles.red,
                ...styles.cursor_pointer,
                ...styles.bold,
                ...styles.fontSize17,
                ...{marginTop: -15},
              }}
              onPress={async () => {
                props.setLoading(true);
                let res = await generalRequest(
                  routes.notifyAdvisorForSchedule + state.selectedSchedule.id,
                  'post',
                  undefined,
                  undefined,
                  props.token,
                );
                props.setLoading(false);
                if (res !== null) {
                  showSuccess();
                }
              }}
              text={'مطلع کردن مشاور/مشاوران'}
            />
          )}
        </EqualTwoTextInputs>
      </CommonWebBox>
      {props.isAdvisor ||
        (desc !== undefined && desc.length > 0 && (
          <CommonWebBox
            header={'توضیحات'}
            btn={
              props.isAdvisor && state.selectedSchedule?.id !== undefined ? (
                <FontIcon
                  icon={faSave}
                  theme={'rect'}
                  back={'yellow'}
                  onPress={async () => {
                    let res = await generalRequest(
                      routes.setScheduleDesc + state.selectedSchedule.id,
                      'put',
                      {description: desc},
                      undefined,
                      props.token,
                    );
                    if (res != null) showSuccess();
                  }}
                />
              ) : undefined
            }>
            {props.isAdvisor && state.selectedSchedule?.id !== undefined && (
              <JustBottomBorderTextInput
                isHalf={false}
                parentStyle={{width: '100%'}}
                style={{maxWidth: '100%'}}
                onChangeText={e => setDesc(e)}
                value={desc}
                placeholder={'توضیحات'}
                subText={
                  'توضیحات ( حتما بعد از تغییر، برای ذخیره سازی، دکمه ذخیره را کلیک کنید)'
                }
                multiline={true}
              />
            )}
            {!props.isAdvisor &&
              state.selectedSchedule.advisorsDesc !== undefined &&
              state.selectedSchedule.advisorsDesc.map((e, index) => {
                return (
                  <SimpleText
                    key={index}
                    text={e.advisor + ': "' + e.desc + '"'}
                  />
                );
              })}
          </CommonWebBox>
        ))}

      <CommonWebBox>
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
        {props.isInEditMode && state.myAllSchedulesDigest !== undefined && (
          <EqualTwoTextInputs
            style={{backgroundColor: vars.CREAM, borderRadius: 7, padding: 7}}>
            <PhoneView style={{minWidth: 'calc(100% - 200px)', gap: 10}}>
              <SimpleText
                text={'برنامه روزانه'}
                style={{...styles.BlueBold, ...styles.alignSelfCenter}}
              />
              <JustBottomBorderSelect
                parentStyle={{
                  backgroundColor: 'white',
                }}
                setter={item => {
                  let tmp = {
                    id: item,
                    item: '',
                  };
                  setSelectedSchedule(tmp);
                  state.selectedSchedule.id = item;
                  state.selectedSchedule.days = undefined;
                  dispatch({selectedSchedule: state.selectedSchedule});
                }}
                values={state.myAllSchedulesDigest}
                value={state.myAllSchedulesDigest.find(
                  elem => elem.id === selectedSchedule?.id,
                )}
                placeholder={'هفته موردنظر'}
              />
              <PhoneView
                style={{
                  ...styles.gap10,
                  ...styles.marginRight15,
                  ...{maxHeight: 40},
                }}>
                {uniqueAdvisors !== undefined &&
                  uniqueAdvisors.map((e, index) => {
                    return (
                      <LastBuyer
                        index={index}
                        key={index}
                        pic={e.pic}
                        text={e.name}
                        onPress={() => {
                          setUniqueAdvisors(
                            uniqueAdvisors.map(ee => {
                              if (ee.name !== e.name) return ee;
                              if (ee.selected === undefined || !ee.selected)
                                ee.selected = true;
                              else ee.selected = false;
                              return ee;
                            }),
                          );
                        }}
                        borderColor={
                          e.selected !== undefined && e.selected
                            ? 'orange'
                            : undefined
                        }
                      />
                    );
                  })}
              </PhoneView>
            </PhoneView>
            {!props.isInPhone && (
              <PhoneView>
                <SimpleText
                  text={'تاریخ شروع'}
                  style={{...styles.BlueBold, ...styles.alignSelfCenter}}
                />
                {state.myAllSchedulesDigest !== undefined &&
                  selectedSchedule !== undefined && (
                    <SimpleText
                      style={{
                        backgroundColor: vars.ORANGE_RED,
                        alignSelf: 'center',
                        color: 'white',
                        padding: 10,
                        marginRight: 10,
                      }}
                      text={
                        state.myAllSchedulesDigest.find(
                          elem => elem.id === selectedSchedule?.id,
                        ).item
                      }
                    />
                  )}
              </PhoneView>
            )}
          </EqualTwoTextInputs>
        )}
        <SimpleText
          style={{...styles.BlueBold}}
          text={'برای ارسال گزارش روی کارت ها کلیک کنید'}
        />
        {boxes !== undefined &&
          boxes.map((e, index) => {
            return (
              <Day
                isInPhone={props.isInPhone}
                selectedAdvisors={uniqueAdvisors.filter(ee => {
                  return ee.selected === undefined || ee.selected;
                })}
                currentAdvisor={props.advisorId}
                setLoading={props.setLoading}
                token={props.token}
                addNewItem={() => {
                  setSelectedDay(e.day);
                }}
                boxes={e.items}
                day={e.day}
                key={index}
                canEdit={props.isAdvisor}
                onDone={
                  props.isAdvisor
                    ? undefined
                    : e => {
                        setSelectedItem(e);
                        setDoneDuration(
                          e.doneDuration !== undefined
                            ? e.doneDuration
                            : undefined,
                        );
                        setFullDone(
                          e.doneDuration !== undefined
                            ? e.doneDuration === e.duration
                            : undefined,
                        );
                        setDoneAdditional(
                          e.doneAdditional !== undefined
                            ? e.doneAdditional
                            : undefined,
                        );
                        setShowDonePopUp(true);
                      }
                }
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
