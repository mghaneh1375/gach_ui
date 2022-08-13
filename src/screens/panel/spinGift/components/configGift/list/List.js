import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
  MyView,
} from '../../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../../../tranlates/Common';
import Translate from '../../../Translate';
import React, {useState} from 'react';
import {View} from 'react-native';
import {TextIcon} from '../../../../../../styles/Common/TextIcon';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {convertTimestamp} from '../../../../../../services/Utility';
import {FontIcon} from '../../../../../../styles/Common/FontIcon';
import {LargePopUp} from '../../../../../../styles/Common/PopUp';
import {CommonDatePicker} from '../../../../../../styles/Common/CommonDatePicker';
import {updateGift} from '../Utility';

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

  React.useEffect(() => {
    setWebDateList(props.data.webGiftDays);
    setAppDateList(props.data.appGiftDays);
  }, [props.data]);

  return (
    // for web
    <MyView>
      <CommonWebBox
        header={commonTranslator.configuration + ' ' + commonTranslator.web}>
        {showPane && (
          <LargePopUp
            removeCancel={true}
            title={commonTranslator.addDate}
            toggleShowPopUp={toggleShowPopUpPane}>
            <MyView>
              <PhoneView>
                <CommonDatePicker
                  placeholder={Translate.newDate}
                  subText={Translate.newDate}
                  setter={setNewDate}
                  value={newDate}
                  isHalf={true}
                />
              </PhoneView>
              <PhoneView style={{flexDirection: 'row-reverse'}}>
                <CommonButton
                  title={commonTranslator.confirm}
                  onPress={() => {
                    let allItems = webDateList;
                    allItems.push(newDate);
                    setWebDateList(allItems);
                    setNewDate(undefined);
                    toggleShowPopUpPane();
                  }}
                />
                <CommonButton
                  title={commonTranslator.cancel}
                  onPress={toggleShowPopUpPane}
                />
              </PhoneView>
            </MyView>
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
        <PhoneView style={{marginTop: 25, gap: 10}}>
          <SimpleText text={Translate.launchDates} />
          <MyView>
            {webDateList.map((elem, index) => {
              return (
                <TextIcon
                  onPress={() => {
                    let allItems = webDateList.filter((elem, idx) => {
                      return index !== idx;
                    });

                    setWebDateList(allItems);
                  }}
                  theme={'rect'}
                  icon={faTrash}
                  key={index}
                  text={convertTimestamp(elem)}
                />
              );
            })}
          </MyView>
          <FontIcon
            parentStyle={{alignSelf: 'flex-start'}}
            theme={'rect'}
            kind={'normal'}
            back={'yellow'}
            icon={faPlus}
            onPress={toggleShowPopUpPane}
          />
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
        header={commonTranslator.configuration + ' ' + commonTranslator.app}>
        {appShowPane && (
          <LargePopUp
            removeCancel={true}
            title={commonTranslator.addDate + ' ' + commonTranslator.app}
            toggleShowPopUp={appToggleShowPopUpPane}>
            <MyView>
              <PhoneView>
                <CommonDatePicker
                  placeholder={Translate.newDate}
                  subText={Translate.newDate}
                  setter={setAppNewDate}
                  value={appNewDate}
                  isHalf={true}
                />
              </PhoneView>
              <PhoneView style={{flexDirection: 'row-reverse'}}>
                <CommonButton
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
            </MyView>
          </LargePopUp>
        )}
        <JustBottomBorderTextInput
          subText={Translate.maxCut}
          placeholder={Translate.maxCut}
          justNum={true}
          onChangeText={text => setAppMaxSlot(text)}
          value={appMaxSlot}
          isHalf={true}
        />
        <PhoneView style={{marginTop: 25, gap: 10}}>
          <SimpleText text={Translate.launchDates} />
          <MyView>
            {appDateList.map((elem, index) => {
              return (
                <TextIcon
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
          </MyView>
          <FontIcon
            parentStyle={{alignSelf: 'flex-start'}}
            theme={'rect'}
            kind={'normal'}
            back={'yellow'}
            icon={faPlus}
            onPress={appToggleShowPopUpPane}
          />
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
    </MyView>
  );
}

export default List;
