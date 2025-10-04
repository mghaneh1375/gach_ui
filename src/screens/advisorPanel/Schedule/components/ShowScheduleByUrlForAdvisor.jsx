import {routes} from '@/api/apiRoutes';
import {downloadRequest, generalRequest} from '@/api/utility';
import {removeItems, showError, showSuccess} from '@/services/utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  FontIcon,
  MyView,
  PhoneView,
  SimpleFontIcon,
  SimpleText,
} from '@/styles';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect.jsx';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import {styles} from '@/styles/common/styles';
import TimePicker from '@/styles/common/TimePicker.jsx';
import commonTranslator from '@/translator/common';
import {faFilePdf, faSave} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';
import {getGrades} from '../../../panel/basic/utility';
import Day from '../../../studentPanel/myLifeStyle/components/Day.jsx';
import Tag from '../../../studentPanel/myLifeStyle/components/Tag.jsx';
import {fetchMyLifeStyle} from '../../../studentPanel/myLifeStyle/utility';
import {
  addItemToSchedule,
  fetchTags,
  getLessons,
  removeItemFromSchedule,
  updateScheduleItem,
} from './utility';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';

function ShowScheduleByUrlForAdvisor() {
  const navigate = useNavigate();
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [description, setDescription] = useState();
  const [selectedTag, setSelectedTag] = useState();
  const [duration, setDuration] = useState();
  const [startAt, setStartAt] = useState();
  const [lesson, setLesson] = useState();
  const [additional, setAdditional] = useState();

  const [showUpdatePopUp, setShowUpdatePopUp] = useState(false);
  const [selectedItemForUpdate, setSelectedItemForUpdate] = useState();

  const [selectedDay, setSelectedDay] = useState();
  const [selectedDayForUpdate, setSelectedDayForUpdate] = useState();
  const [showDailySchedule, setShowDailySchedule] = useState(true);
  const [boxes, setBoxes] = useState();
  const [desc, setDesc] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [lessonsKeyVals, setLessonsKeyVals] = useState();
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);

  const [selectedSchedule, setSelectedSchedule] = useState();
  const [uniqueAdvisors, setUniqueAdvisors] = useState();
  const [isWorking, setIsWorking] = useState();
  const [myLifeStyle, setMyLifeStyle] = useState();
  const [grades, setGrades] = useState();
  const [tags, setTags] = useState();
  const params = useParams();

  const setLoading = loadingStatus => {
    dispatch({loading: loadingStatus});
  };

  const fetchSchedule = React.useCallback(() => {
    setLoading(true);
    Promise.all([
      generalRequest(
        routes.getStudentSchedule + params.id,
        'get',
        undefined,
        'data',
        state.token,
      ),
      fetchMyLifeStyle(state.token, params.studentId),
      fetchTags(state.token),
      getGrades(state.token),
    ]).then(res => {
      setLoading(false);
      if (
        res[0] === null ||
        res[1] === null ||
        res[2] === null ||
        res[3] === null
      ) {
        navigate('/');
        return;
      }

      setSelectedSchedule(res[0]);
      setMyLifeStyle(res[1].days);
      setDesc(res[0].advisorDesc);
      setTags(res[2]);
      setGrades(
        res[3].map(e => ({
          id: e.id,
          item: e.name,
          isOlympiad: e.isOlympiad,
        })),
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchLessons = React.useCallback(() => {
    if (isWorking) return;
    const grade = grades.find(e => e.id === selectedGrade);
    if (grade === undefined) return;
    if (grade.lessons !== undefined) {
      setLessonsKeyVals(grade.lessons);
      return;
    }
    setIsWorking(true);
    setLoading(true);
    Promise.all([getLessons(selectedGrade, grade.isOlympiad)]).then(res => {
      setLoading(false);
      if (res[0] === null) return;
      const lessons = res[0].map(e => {
        return {
          id: e.id,
          item: e.name,
        };
      });
      setGrades(
        grades.map(e => {
          if (e.id === selectedGrade)
            return {
              ...grade,
              lessons: lessons,
            };
          return e;
        }),
      );

      setLessonsKeyVals(grade.lessons);
      setIsWorking(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGrade, isWorking, state]);

  React.useEffect(() => {
    if (selectedGrade == null) return;
    fetchLessons();
  }, [selectedGrade, fetchLessons]);

  React.useEffect(() => {
    if (selectedSchedule?.days === undefined) return;
    const tmp = [];
    selectedSchedule?.days.forEach(e => {
      e.items.forEach(ee => {
        if (tmp.find(eee => eee.name == ee.advisor?.name) !== undefined) return;
        tmp.push({
          ...ee.advisor,
          ...{
            selected: true,
          },
        });
      });
    });
    setUniqueAdvisors(tmp);
  }, [selectedSchedule?.days]);

  const [selectedDayForRemove, setSelectedDayForRemove] = useState();
  const [selectedItemForRemove, setSelectedItemForRemove] = useState();

  const removeItem = async () => {
    setLoading(true);
    const res = await removeItemFromSchedule(
      state.token,
      params.studentId,
      selectedItemForRemove.id,
    );
    setLoading(false);
    if (res != null) {
      removeItems(
        selectedSchedule.days.find(itr => itr.day === selectedDayForRemove)
          .items,
        items => {
          selectedSchedule.days = selectedSchedule.days.map(itr => {
            if (itr.day === selectedDayForRemove) itr.items = items;
            return itr;
          });
          dispatch({
            selectedSchedule: selectedSchedule,
          });
        },
        [selectedItemForRemove.id],
      );
      setShowRemoveConfirmation(false);
    }
  };

  useEffectOnce(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  React.useEffect(() => {
    if (myLifeStyle === undefined || selectedSchedule?.days === undefined)
      return;

    if (showDailySchedule) {
      setBoxes(
        selectedSchedule.days.map((e, index) => {
          return {
            day: e.day,
            items: e.items.concat(
              myLifeStyle[index].items.map(itr => {
                return {
                  ...itr,
                  canEdit: false,
                  label: 'life',
                };
              }),
            ),
          };
        }),
      );
    } else setBoxes(selectedSchedule.days);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSchedule?.days, myLifeStyle, showDailySchedule]);

  React.useEffect(() => {
    if (selectedItemForUpdate === undefined || tags === undefined) return;
    setDuration(selectedItemForUpdate.duration);
    setStartAt(selectedItemForUpdate.startAt);
    setDescription(selectedItemForUpdate.description);
    setSelectedTag(tags.find(e => e.label === selectedItemForUpdate.tag));
    setAdditional(selectedItemForUpdate.additional);
    setShowUpdatePopUp(true);
  }, [selectedItemForUpdate, tags]);
  React.useEffect(() => {
    if (!showUpdatePopUp) {
      setSelectedItemForUpdate(undefined);
      setSelectedDayForUpdate(undefined);
    }
  }, [showUpdatePopUp]);
  return (
    <>
      {showRemoveConfirmation && (
        <LargePopUp
          toggleShowPopUp={() => setShowRemoveConfirmation(false)}
          btns={
            <CommonButton
              theme={'dark'}
              title={'تایید'}
              onPress={() => removeItem()}
            />
          }>
          <SimpleText text={'آیا از حذف آیتم موردنظر اطمینان دارید؟'} />
        </LargePopUp>
      )}

      {selectedDay && (
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
                setLoading(true);
                const data = {
                  tag: selectedTag.id,
                  duration: duration,
                  startAt: startAt,
                  day: selectedDay,
                  lessonId: lesson,
                };
                data.id = params.id;

                if (selectedTag?.numberLabel !== undefined)
                  data.additional = additional;
                if (description !== undefined) data.description = description;
                const res = await addItemToSchedule(
                  state.token,
                  params.studentId,
                  data,
                );
                setLoading(false);
                if (res !== null) {
                  selectedSchedule.days = selectedSchedule.days.map(e => {
                    if (e.day !== selectedDay) return e;
                    e.items.push({
                      tag: tags.find(e => e.id === selectedTag.id).label,
                      duration: duration,
                      startAt: startAt,
                      lesson: lessonsKeyVals.find(e => e.id === lesson)?.item,
                      id: res.id,
                      additionalLabel: selectedTag.numberLabel,
                      additional: additional,
                      description: description,
                      owner: true,
                      advisor: {
                        name:
                          state.user.user.firstName +
                          ' ' +
                          state.user.user.lastName,
                        pic: state.user.user.pic,
                      },
                    });
                    return e;
                  });
                  dispatch({
                    selectedSchedule: selectedSchedule,
                  });
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
            <PhoneView
              style={{
                ...styles.gap15,
              }}>
              {tags &&
                tags.map((e, index) => {
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
                values={grades}
                value={grades.find(e => e.id === selectedGrade)}
              />

              {
                selectedGrade != undefined && lessonsKeyVals !== undefined && (
                  <JustBottomBorderSelect
                    placeholder={commonTranslator.lesson}
                    subText={commonTranslator.lesson}
                    setter={setLesson}
                    values={lessonsKeyVals}
                    value={lessonsKeyVals.find(e => e.id === lesson)}
                  />
                )

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
              }

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
      {showUpdatePopUp && (
        <LargePopUp
          toggleShowPopUp={() => setShowUpdatePopUp(false)}
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
                if (
                  selectedTag?.numberLabel !== undefined &&
                  additional === undefined
                ) {
                  showError(
                    'لطفا ' + selectedTag?.numberLabel + ' را وارد نمایید',
                  );
                  return;
                }
                setLoading(true);
                const data = {
                  tag: selectedTag.id,
                  duration: duration,
                  startAt: startAt,
                };
                if (selectedTag?.numberLabel !== undefined)
                  data.additional = additional;
                if (description !== undefined) data.description = description;
                const res = await updateScheduleItem(
                  state.token,
                  selectedItemForUpdate.id,
                  data,
                );
                setLoading(false);
                if (res !== null) {
                  selectedSchedule.days = selectedSchedule.days.map(e => {
                    if (e.day !== selectedDayForUpdate) return e;
                    e.items.map(itemItr => {
                      if (itemItr.id === selectedItemForUpdate.id) {
                        itemItr.tag = tags.find(
                          e => e.id === selectedTag.id,
                        ).label;
                        itemItr.duration = duration;
                        itemItr.startAt = startAt;
                        itemItr.additionalLabel = selectedTag.numberLabel;
                        itemItr.additional = additional;
                        itemItr.description = description;
                      }
                      return itemItr;
                    });
                    return e;
                  });
                  dispatch({
                    selectedSchedule: selectedSchedule,
                  });
                  setDuration();
                  setSelectedTag();
                  setStartAt();
                  setDescription();
                  setAdditional();
                  setShowUpdatePopUp(false);
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
            <PhoneView
              style={{
                ...styles.gap15,
              }}>
              {tags !== undefined &&
                tags.map((e, index) => {
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
                subText={'مدت (به دقیقه)'}
                placeholder={'مدت (به دقیقه)'}
                value={duration}
                onChangeText={e => setDuration(e)}
              />

              <TimePicker
                value={startAt}
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
          'برنامه هفتگی ' +
          selectedSchedule?.weekStartAt +
          ' - ' +
          selectedSchedule?.studentName
        }
        btn={
          <PhoneView
            style={{
              ...styles.alignItemsCenter,
            }}>
            <SimpleFontIcon
              icon={faFilePdf}
              kind={'large'}
              style={{
                color: 'orangeRed',
              }}
              onPress={() =>
                downloadRequest(
                  routes.exportPDF + params.id,
                  undefined,
                  state.token,
                  undefined,
                  'کاربرگ ' + selectedSchedule.weekStartAt + '.pdf',
                )
              }
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
              ...{
                marginTop: -15,
              },
            }}
            onPress={() => setShowDailySchedule(!showDailySchedule)}
            text={
              showDailySchedule
                ? 'مخفی کردن برنامه روزانه'
                : 'نمایش برنامه روزانه'
            }
          />
          {selectedSchedule && (
            <SimpleText
              style={{
                ...styles.red,
                ...styles.cursor_pointer,
                ...styles.bold,
                ...styles.fontSize17,
                ...{
                  marginTop: -15,
                },
              }}
              onPress={async () => {
                setLoading(true);
                const res = await generalRequest(
                  routes.notifyStudentForSchedule + params.id,
                  'post',
                  undefined,
                  undefined,
                  state.token,
                );
                setLoading(false);
                if (res !== null) {
                  showSuccess();
                }
              }}
              text={'مطلع کردن دانش آموز'}
            />
          )}
        </EqualTwoTextInputs>
      </CommonWebBox>
      {desc && desc.length > 0 && (
        <CommonWebBox
          header={'توضیحات'}
          btn={
            <FontIcon
              icon={faSave}
              theme={'rect'}
              back={'yellow'}
              onPress={async () => {
                const res = await generalRequest(
                  routes.setScheduleDesc + params.id,
                  'put',
                  {
                    description: desc,
                  },
                  undefined,
                  state.token,
                );
                if (res != null) showSuccess();
              }}
            />
          }>
          <JustBottomBorderTextInput
            isHalf={false}
            parentStyle={{
              width: '100%',
            }}
            style={{
              maxWidth: '100%',
            }}
            onChangeText={e => setDesc(e)}
            value={desc}
            placeholder={'توضیحات'}
            subText={
              'توضیحات ( حتما بعد از تغییر، برای ذخیره سازی، دکمه ذخیره را کلیک کنید)'
            }
            multiline={true}
          />
        </CommonWebBox>
      )}

      <CommonWebBox>
        <SimpleText
          style={{
            ...styles.BlueBold,
          }}
          text={'برای ارسال گزارش روی کارت\u200cها کلیک کنید'}
        />
        {boxes !== undefined &&
          boxes.map((e, index) => {
            return (
              <Day
                isInPhone={state.isInPhone}
                selectedAdvisors={uniqueAdvisors.filter(ee => {
                  return ee.selected === undefined || ee.selected;
                })}
                setLoading={setLoading}
                token={state.token}
                addNewItem={() => {
                  setSelectedDay(e.day);
                }}
                boxes={e.items}
                day={e.day}
                key={index}
                canEdit={true}
                onDone={ee => {
                  setSelectedItemForUpdate(ee);
                  setSelectedDayForUpdate(e.day);
                }}
                onRemove={ee => {
                  setSelectedItemForRemove(ee);
                  setSelectedDayForRemove(e.day);
                  setShowRemoveConfirmation(true);
                }}
              />
            );
          })}
      </CommonWebBox>
    </>
  );
}

export default ShowScheduleByUrlForAdvisor;
