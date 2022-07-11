import React, {useState} from 'react';
import commonTranslator from '../../../../../tranlates/Common';
import {View} from 'react-native';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import translator from '../../Translator';
import {
  startWithVals,
  statusKeyVals,
  priorityKeyVals,
  sectionKeyVals,
} from '../KeyVals';
import {
  PhoneView,
  CommonRadioButton,
  SimpleText,
  CommonButton,
} from '../../../../../styles/Common';

import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
import {filter} from '../List/Utility';
import vars from '../../../../../styles/root';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import RadioButtonYesOrNo from '../../../../../components/web/RadioButtonYesOrNo';

function Filter(props) {
  const [showProSearch, setShowProSearch] = useState(false);
  const [status, setStatus] = useState();
  const [startWith, setStartWith] = useState('all');
  const [searchArchive, setSearchArchive] = useState('yes');
  const [sendDateSolar, setSendDateSolar] = useState('');
  const [sendDateSolarEndLimit, setSendDateSolarEndLimit] = useState('');
  const [answerDateSolar, setAnswerDateSolar] = useState('');
  const [answerDateSolarEndLimit, setAnswerDateSolarEndLimit] = useState('');
  const [wantedIcon, setWantedIcon] = useState(faAngleDoubleDown);
  const [priority, setPriority] = useState();
  const [section, setSection] = useState();

  const toggleShowProSearch = () => {
    if (showProSearch) setWantedIcon(faAngleDoubleDown);
    else setWantedIcon(faAngleDoubleUp);
    setShowProSearch(!showProSearch);
  };

  return (
    <View style={{zIndex: 'unset'}}>
      <PhoneView>
        <JustBottomBorderSelect
          isHalf={true}
          setter={setStatus}
          values={statusKeyVals}
          value={statusKeyVals.find(elem => elem.id === status)}
          placeholder={translator.status}
        />
        <JustBottomBorderSelect
          isHalf={true}
          setter={setPriority}
          values={priorityKeyVals}
          value={priorityKeyVals.find(elem => elem.id === priority)}
          placeholder={translator.priority}
        />
        <JustBottomBorderSelect
          isHalf={true}
          setter={setSection}
          values={sectionKeyVals}
          value={sectionKeyVals.find(elem => elem.id === section)}
          placeholder={translator.section}
        />
        <CommonButton
          onPress={() =>
            filter(
              props,
              priority,
              section,
              startWith,
              status,
              searchArchive,
              sendDateSolar,
              sendDateSolarEndLimit,
              answerDateSolar,
              answerDateSolarEndLimit,
            )
          }
          isHalf={true}
          title={commonTranslator.show}
          style={{alignSelf: 'flex-start'}}
        />
      </PhoneView>
      <PhoneView>
        <SimpleText
          onPress={() => toggleShowProSearch()}
          style={{
            paddingTop: 15,
            paddingrRight: 15,
            paddingBottom: 15,
            cursor: 'pointer',
            color: vars.DARK_BLUE,
          }}
          text={commonTranslator.advancedSearch}
        />
        <View
          style={{
            width: 20,
            height: 20,
            alignSelf: 'center',
          }}>
          <SimpleFontIcon
            style={{
              color: vars.DARK_BLUE,
            }}
            icon={wantedIcon}
          />
        </View>
      </PhoneView>
      {showProSearch && (
        <View style={{zIndex: 'unset'}}>
          <PhoneView style={{zIndex: 'unset'}}>
            <JustBottomBorderDatePicker
              placeholder={translator.dateStartRequest}
              setter={setSendDateSolar}
              value={sendDateSolar}
              isHalf={true}
            />
            <JustBottomBorderDatePicker
              placeholder={translator.dateEndRequest}
              setter={setSendDateSolarEndLimit}
              value={sendDateSolarEndLimit}
              isHalf={true}
            />
            <JustBottomBorderSelect
              isHalf={true}
              setter={setStartWith}
              values={startWithVals}
              value={startWithVals.find(elem => elem.id === startWith)}
              placeholder={translator.startWith}
            />
          </PhoneView>
          <PhoneView style={{marginTop: 10, zIndex: 'unset'}}>
            <JustBottomBorderDatePicker
              placeholder={translator.lastStartUpdate}
              subText={translator.lastStartUpdate}
              setter={setAnswerDateSolar}
              value={answerDateSolar}
              isHalf={true}
            />
            <JustBottomBorderDatePicker
              placeholder={translator.lastEndUpdate}
              setter={setAnswerDateSolarEndLimit}
              value={answerDateSolarEndLimit}
              isHalf={true}
            />
            <View style={{marginTop: 10}}>
              <RadioButtonYesOrNo
                label={translator.searchArchive}
                selected={searchArchive}
                setSelected={setSearchArchive}
              />
            </View>
          </PhoneView>
        </View>
      )}
    </View>
  );
}

export default Filter;
