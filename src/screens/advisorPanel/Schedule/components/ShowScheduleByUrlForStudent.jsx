import {routes} from '@/api/apiRoutes';
import {downloadRequest, generalRequest} from '@/api/utility.js';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import {showError, showSuccess, trueFalseValues} from '@/services/utility.js';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleFontIcon,
  SimpleText,
} from '@/styles';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect.jsx';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import {styles} from '@/styles/common/styles';
import vars from '@/styles/root';
import {faFilePdf} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';
import LastBuyer from '../../../general/packages/components/detail/LastBuyer.jsx';
import Day from '../../../studentPanel/myLifeStyle/components/Day.jsx';
import {fetchMyLifeStyle} from '../../../studentPanel/myLifeStyle/utility';
import {setDoneInSchedule} from './utility';

function ShowScheduleByUrlForStudent() {
  const navigate = useNavigate();
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [showDonePopUp, setShowDonePopUp] = useState(false);
  const params = useParams();
  const [fullDone, setFullDone] = useState();
  const [doneDuration, setDoneDuration] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [doneAdditional, setDoneAdditional] = useState();

  const [boxes, setBoxes] = useState();
  const [desc, setDesc] = useState();
  const [selectedDescription, setSelectedDescription] = useState();

  const [selectedSchedule, setSelectedSchedule] = useState();
  const [uniqueAdvisors, setUniqueAdvisors] = useState();
  const [myLifeStyle, setMyLifeStyle] = useState();
  const [showDailySchedule, setShowDailySchedule] = useState(false);

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
      fetchMyLifeStyle(state.token),
    ]).then(res => {
      setLoading(false);
      if (res[0] === null || res[1] === null || res[2] === null) {
        navigate('/');
        return;
      }

      setSelectedSchedule(res[0]);
      setMyLifeStyle(res[1].days);
      setDesc(res[0].advisorDesc);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffectOnce(() => {
    fetchSchedule();
  }, []);

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

  React.useEffect(() => {
    if (!myLifeStyle || !selectedSchedule?.days) return;
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

  const doneJob = async () => {
    const data = fullDone
      ? {
          fullDone: true,
        }
      : {
          fullDone: false,
          duration: doneDuration,
        };
    if (selectedItem.additionalLabel !== undefined) {
      if (doneAdditional === undefined) {
        showError('لطفا ' + selectedItem.additionalLabel + ' را وارد نمایید');
        return;
      }
      data.additional = doneAdditional;
    }
    setLoading(true);
    const res = await setDoneInSchedule(
      state.token,
      params.id,
      selectedItem.id,
      data,
    );
    setLoading(false);
    if (res != null) {
      selectedSchedule.days = res.days;
      dispatch({
        selectedSchedule: selectedSchedule,
      });
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
          <MyView>
            {selectedDescription && (
              <SimpleText text={'توضیح مشاور: ' + selectedDescription} />
            )}
            <PhoneView
              style={{
                ...styles.gap15,
              }}>
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
          </MyView>
        </LargePopUp>
      )}

      <CommonWebBox
        header={'برنامه‌های هفتگی'}
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
                  routes.notifyAdvisorForSchedule + params.id,
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
              text={'مطلع کردن مشاور/مشاوران'}
            />
          )}
        </EqualTwoTextInputs>
      </CommonWebBox>

      <CommonWebBox>
        {selectedSchedule && (
          <EqualTwoTextInputs
            style={{
              backgroundColor: vars.CREAM,
              borderRadius: 7,
              padding: 7,
            }}>
            <PhoneView
              style={{
                minWidth: 'calc(100% - 200px)',
                gap: 10,
              }}>
              <SimpleText
                text={'برنامه روزانه'}
                style={{
                  ...styles.BlueBold,
                  ...styles.alignSelfCenter,
                }}
              />

              <PhoneView
                style={{
                  ...styles.gap10,
                  ...styles.marginRight15,
                  ...{
                    maxHeight: 40,
                  },
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
            {!state.isInPhone && (
              <PhoneView>
                <SimpleText
                  text={'تاریخ شروع'}
                  style={{
                    ...styles.BlueBold,
                    ...styles.alignSelfCenter,
                  }}
                />
              </PhoneView>
            )}
          </EqualTwoTextInputs>
        )}
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
                addNewItem={undefined}
                boxes={e.items}
                day={e.day}
                key={index}
                canEdit={false}
                onDone={e => {
                  setSelectedItem(e);
                  setDoneDuration(
                    e.doneDuration !== undefined ? e.doneDuration : undefined,
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
                  setSelectedDescription(e.description);
                  setShowDonePopUp(true);
                }}
                onRemove={undefined}
              />
            );
          })}
      </CommonWebBox>
    </>
  );
}

export default ShowScheduleByUrlForStudent;
