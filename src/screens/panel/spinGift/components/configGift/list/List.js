import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
  MyView,
} from '../../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../../../translator/Common';
import Translate from '../../../Translate';
import React, {useState} from 'react';
import {TextIcon} from '../../../../../../styles/Common/TextIcon';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {convertTimestamp, showError} from '../../../../../../services/Utility';
import {FontIcon} from '../../../../../../styles/Common/FontIcon';
import {LargePopUp} from '../../../../../../styles/Common/PopUp';
import {CommonDatePicker} from '../../../../../../styles/Common/CommonDatePicker';
import {updateGift} from '../Utility';
import JustBottomBorderSelect from '../../../../../../styles/Common/JustBottomBorderSelect';
import {
  fetchContentDigests,
  fetchQuizDigests,
} from '../../../../notifs/components/Utility';
import {styles} from '../../../../../../styles/Common/Styles';

function List(props) {
  const [newDate, setNewDate] = useState();
  const [appNewDate, setAppNewDate] = useState();
  const [showPane, setShowPane] = useState(false);
  const [maxSlot, setMaxSlot] = useState(props.data.maxWebGiftSlot);
  const [appMaxSlot, setAppMaxSlot] = useState(props.data.maxAppGiftSlot);
  const toggleShowPopUpPane = () => {
    setShowPane(!showPane);
  };
  const [appShowPane, setAppShowPane] = useState(false);
  const appToggleShowPopUpPane = () => {
    setAppShowPane(!appShowPane);
  };

  const [webDateList, setWebDateList] = useState([]);
  const [appDateList, setAppDateList] = useState([]);
  const [quizzes, setQuizzes] = useState();
  const [contents, setContents] = useState();
  const [isWorking, setIsWorking] = useState(false);

  const fetchPreReq = React.useCallback(() => {
    if (isWorking || quizzes !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      fetchQuizDigests(props.token),
      fetchContentDigests(props.token),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null || res[1] === null) {
        props.navigate('/');
        return;
      }

      setQuizzes(res[0]);
      setContents(
        res[1].map(elem => {
          return {id: elem.id, name: elem.title};
        }),
      );

      setIsWorking(false);
    });
  }, [props, isWorking, quizzes]);

  React.useEffect(() => {
    fetchPreReq();
  }, [props.data, fetchPreReq]);

  React.useEffect(() => {
    setWebDateList(props.data.webGiftDays);
    setAppDateList(props.data.appGiftDays);
    setCoinForSecondTime(props.data.coinForSecondTime);
    setCoinForThirdTime(props.data.coinForThirdTime);
    setCoinForForthTime(props.data.coinForForthTime);
    setCoinForFifthTime(props.data.coinForFifthTime);
  }, [props.data]);

  const items = [
    {id: 'public', item: 'عمومی'},
    {
      id: 'all_package',
      item: 'دوره‌های آموزشی(خریدار هر دوره آموزشی تعریف شده)',
    },
    {id: 'all_quiz', item: 'آزمونهای آیریسک(خریدار هر آزمون تعریف شده)'},
    {id: 'package', item: 'دوره‌های آموزشی(خریداران یک دوره آموزشی خاص)'},
    {id: 'quiz', item: 'آزمونهای آیریسک(خریداران یک آزمون خاص)'},
  ];
  const [target, setTarget] = useState();
  const [choices, setChoices] = useState();
  const [allSelectedVals, setAllSelectedVals] = useState();

  const addToSelected = selected => {
    if (allSelectedVals === undefined) setAllSelectedVals([selected]);
    else {
      let tmp = [];
      allSelectedVals.forEach(e => {
        tmp.push(e);
      });
      tmp.push(selected);
      setAllSelectedVals(tmp);
    }
  };

  const [coinForSecondTime, setCoinForSecondTime] = useState();
  const [coinForThirdTime, setCoinForThirdTime] = useState();
  const [coinForForthTime, setCoinForForthTime] = useState();
  const [coinForFifthTime, setCoinForFifthTime] = useState();

  return (
    <MyView>
      <CommonWebBox header={'پیکربندی کلی'}>
        <PhoneView style={{...styles.gap10}}>
          <JustBottomBorderTextInput
            justNum={true}
            float={true}
            value={coinForSecondTime}
            onChangeText={e => setCoinForSecondTime(e)}
            placeholder={'مقدار ایکس پول برای شرکت برای بار دوم'}
            subText={'مقدار ایکس پول برای شرکت برای بار دوم'}
          />
          <JustBottomBorderTextInput
            justNum={true}
            float={true}
            value={coinForThirdTime}
            onChangeText={e => setCoinForThirdTime(e)}
            placeholder={'مقدار ایکس پول برای شرکت برای بار سوم'}
            subText={'مقدار ایکس پول برای شرکت برای بار سوم'}
          />
          <JustBottomBorderTextInput
            justNum={true}
            float={true}
            value={coinForForthTime}
            onChangeText={e => setCoinForForthTime(e)}
            placeholder={'مقدار ایکس پول برای شرکت برای بار چهارم'}
            subText={'مقدار ایکس پول برای شرکت برای بار چهارم'}
          />
          <JustBottomBorderTextInput
            justNum={true}
            float={true}
            value={coinForFifthTime}
            onChangeText={e => setCoinForFifthTime(e)}
            placeholder={'مقدار ایکس پول برای شرکت برای بار پنجم'}
            subText={'مقدار ایکس پول برای شرکت برای بار پنجم'}
          />
        </PhoneView>
        <CommonButton
          theme={'dark'}
          title={commonTranslator.confirm}
          onPress={async () => {
            props.setLoading(true);
            let data = {
              coinForSecondTime: coinForSecondTime,
              coinForThirdTime: coinForThirdTime,
              coinForForthTime: coinForForthTime,
              coinForFifthTime: coinForFifthTime,
            };
            await updateGift(data, props.token);
            props.setLoading(false);
          }}
        />
      </CommonWebBox>

      <PhoneView>
        <CommonWebBox
          width={350}
          header={commonTranslator.configuration + ' ' + commonTranslator.web}>
          {showPane && (
            <LargePopUp
              removeCancel={true}
              title={commonTranslator.addDate}
              toggleShowPopUp={toggleShowPopUpPane}>
              <MyView style={{minHeight: 300}}>
                <CommonDatePicker
                  isHalf={true}
                  placeholder={Translate.newDate}
                  subText={Translate.newDate}
                  setter={d => {
                    if (d < Date.now() - 86400000)
                      showError('تاریخ باید از دیروز بزرگتر باشد');
                    else setNewDate(d);
                  }}
                  value={newDate}
                />
                <JustBottomBorderSelect
                  placeholder={'مخاطب'}
                  isHalf={true}
                  subText={'مخاطب'}
                  values={items}
                  setter={selected => {
                    if (selected === 'package') setChoices(contents);
                    else if (selected === 'quiz') setChoices(quizzes);
                    else setChoices(undefined);
                    setTarget(selected);
                  }}
                  value={
                    target === undefined
                      ? undefined
                      : items.find(elem => elem.id === target)
                  }
                />
                {choices !== undefined && (
                  <JustBottomBorderTextInput
                    setSelectedItem={selected => {
                      if (selected !== undefined) addToSelected(selected);
                    }}
                    isHalf={true}
                    resultPane={true}
                    value={
                      allSelectedVals === undefined ||
                      allSelectedVals.length === 0
                        ? undefined
                        : choices.find(
                            elem => elem.id === allSelectedVals[0].id,
                          ).name
                    }
                    subText={'آیتم موردنظر'}
                    placeholder={'آیتم موردنظر'}
                    values={choices}
                  />
                )}
              </MyView>

              <PhoneView style={{flexDirection: 'row-reverse'}}>
                <CommonButton
                  theme={'dark'}
                  title={commonTranslator.confirm}
                  onPress={() => {
                    if (
                      newDate === undefined ||
                      target === undefined ||
                      ((target === 'quiz' || target === 'package') &&
                        (allSelectedVals === undefined ||
                          allSelectedVals.length === 0))
                    ) {
                      showError(commonTranslator.pleaseFillAllFields);
                      return;
                    }
                    let allItems = webDateList;
                    allItems.push({
                      date: newDate,
                      target: target,
                      additional:
                        allSelectedVals === undefined ||
                        allSelectedVals.length === 0
                          ? undefined
                          : allSelectedVals[0],
                    });
                    setWebDateList(allItems);
                    setNewDate(undefined);
                    setTarget(undefined);
                    toggleShowPopUpPane();
                  }}
                />
                <CommonButton
                  title={commonTranslator.cancel}
                  onPress={toggleShowPopUpPane}
                />
              </PhoneView>
            </LargePopUp>
          )}
          <JustBottomBorderTextInput
            subText={Translate.maxCut}
            placeholder={Translate.maxCut}
            justNum={true}
            onChangeText={text => setMaxSlot(text)}
            value={maxSlot}
            isHalf={true}
          />
          <PhoneView style={{gap: 15}}>
            <SimpleText text={Translate.launchDates} />
            <PhoneView>
              {webDateList !== undefined &&
                webDateList.map((elem, index) => {
                  return (
                    <MyView key={index} style={{marginBottom: 15}}>
                      <TextIcon
                        style={{gap: 15}}
                        onPress={() => {
                          let allItems = webDateList.filter((elem, idx) => {
                            return index !== idx;
                          });

                          setWebDateList(allItems);
                        }}
                        theme={'rect'}
                        icon={faTrash}
                        text={convertTimestamp(elem.date)}
                      />
                      <SimpleText
                        style={{...styles.fontSize11}}
                        text={items.find(itr => itr.id === elem.target).item}
                      />
                      {elem.additional !== undefined && (
                        <SimpleText
                          style={{...styles.fontSize11}}
                          text={elem.additional.name}
                        />
                      )}
                    </MyView>
                  );
                })}
              <FontIcon
                parentStyle={{alignSelf: 'flex-start', marginRight: 15}}
                theme={'rect'}
                kind={'normal'}
                back={'yellow'}
                icon={faPlus}
                onPress={toggleShowPopUpPane}
              />
            </PhoneView>
          </PhoneView>
          <MyView>
            <CommonButton
              title={commonTranslator.confrim}
              onPress={async () => {
                props.setLoading(true);
                let webData = {
                  maxWebGiftSlot: maxSlot,
                  webGiftDays: webDateList,
                };
                await updateGift(webData, props.token);
                props.setLoading(false);
              }}
            />
          </MyView>
        </CommonWebBox>
        {/* for app */}
        <CommonWebBox
          width={350}
          header={commonTranslator.configuration + ' ' + commonTranslator.app}>
          {appShowPane && (
            <LargePopUp
              removeCancel={true}
              title={commonTranslator.addDate + ' ' + commonTranslator.app}
              toggleShowPopUp={appToggleShowPopUpPane}>
              <PhoneView>
                <CommonDatePicker
                  placeholder={Translate.newDate}
                  subText={Translate.newDate}
                  setter={setAppNewDate}
                  value={appNewDate}
                />
              </PhoneView>

              <PhoneView style={{flexDirection: 'row-reverse'}}>
                <CommonButton
                  theme={'dark'}
                  title={commonTranslator.confirm}
                  onPress={() => {
                    let allItems = appDateList;
                    allItems.push(appNewDate);
                    setAppDateList(allItems);
                    setAppNewDate(undefined);
                    appToggleShowPopUpPane();
                  }}
                />
                <CommonButton
                  title={commonTranslator.cancel}
                  onPress={appToggleShowPopUpPane}
                />
              </PhoneView>
            </LargePopUp>
          )}
          <PhoneView>
            <JustBottomBorderTextInput
              subText={Translate.maxCut}
              placeholder={Translate.maxCut}
              justNum={true}
              onChangeText={text => setAppMaxSlot(text)}
              value={appMaxSlot}
            />
          </PhoneView>
          <PhoneView style={{gap: 15}}>
            <SimpleText text={Translate.launchDates} />
            <PhoneView style={{gap: 15}}>
              {appDateList.map((elem, index) => {
                return (
                  <TextIcon
                    style={{gap: 15, marginBottom: 15}}
                    onPress={() => {
                      let allItems = appDateList.filter((elem, idx) => {
                        return index !== idx;
                      });

                      setAppDateList(allItems);
                    }}
                    theme={'rect'}
                    icon={faTrash}
                    key={index}
                    text={convertTimestamp(elem)}
                  />
                );
              })}
              <FontIcon
                parentStyle={{alignSelf: 'flex-start'}}
                theme={'rect'}
                kind={'normal'}
                back={'yellow'}
                icon={faPlus}
                onPress={appToggleShowPopUpPane}
              />
            </PhoneView>
          </PhoneView>
          <MyView>
            <CommonButton
              title={commonTranslator.confrim}
              onPress={async () => {
                props.setLoading(true);
                let appData = {
                  maxAppGiftSlot: appMaxSlot,
                  appGiftDays: appDateList,
                };
                await updateGift(appData, props.token);
                props.setLoading(false);
              }}
            />
          </MyView>
        </CommonWebBox>
      </PhoneView>
    </MyView>
  );
}

export default List;
