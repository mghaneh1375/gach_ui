import React, {useState} from 'react';
import commonTranslator from '../../../../../translator/Common';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import translator from '../../Translator';
import {
  startWithVals,
  statusKeyVals,
  sectionKeyValsForFilter,
  priorityKeyValsForFilter,
} from '../KeyVals';
import {
  PhoneView,
  SimpleText,
  CommonButton,
  MyView,
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
import {styles} from '../../../../../styles/Common/Styles';

function Filter(props) {
  const [showProSearch, setShowProSearch] = useState(false);
  const [status, setStatus] = useState();
  const [startWith, setStartWith] = useState('all');
  const [searchArchive, setSearchArchive] = useState('no');
  const [sendDateSolar, setSendDateSolar] = useState('');
  const [sendDateSolarEndLimit, setSendDateSolarEndLimit] = useState('');
  const [answerDateSolar, setAnswerDateSolar] = useState('');
  const [answerDateSolarEndLimit, setAnswerDateSolarEndLimit] = useState('');
  const [wantedIcon, setWantedIcon] = useState(faAngleDoubleDown);
  const [priority, setPriority] = useState();
  const [section, setSection] = useState();
  const [item, setItem] = useState();

  React.useEffect(() => {
    if (section === undefined && props.section !== undefined) {
      setSection(props.section);
    }
  }, [props.section, section]);

  React.useEffect(() => {
    if (props.userId !== undefined) {
      setItem(props.userId);
    }
  }, [props.userId]);

  React.useEffect(() => {
    if (section === 'advisor' && props.section !== 'advisor')
      props.setSection('advisor');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  const toggleShowProSearch = () => {
    if (showProSearch) setWantedIcon(faAngleDoubleDown);
    else setWantedIcon(faAngleDoubleUp);
    setShowProSearch(!showProSearch);
  };

  const [items, setItems] = useState();
  const [refId, setRefId] = useState();

  React.useEffect(() => {
    if (section === undefined || props.items === undefined) {
      setItems(undefined);
      return;
    }

    let list = props.items.find(e => e.key === section);

    if (list !== undefined) setItems(list.list);
    else setItems(undefined);
  }, [section, props.items]);

  React.useEffect(() => {
    if (items === undefined) setRefId(undefined);
  }, [items]);

  return (
    <MyView>
      <PhoneView style={styles.gap15}>
        <JustBottomBorderSelect
          setter={setStatus}
          values={statusKeyVals}
          value={statusKeyVals.find(elem => elem.id === status)}
          placeholder={translator.status}
          subText={translator.status}
        />
        <JustBottomBorderSelect
          setter={setPriority}
          values={priorityKeyValsForFilter}
          value={priorityKeyValsForFilter.find(elem => elem.id === priority)}
          placeholder={translator.priority}
          subText={translator.priority}
        />
        <JustBottomBorderSelect
          setter={setSection}
          values={sectionKeyValsForFilter}
          value={sectionKeyValsForFilter.find(elem => elem.id === section)}
          placeholder={translator.section}
          subText={translator.section}
        />
        {section === 'advisor' && props.items !== undefined && (
          <JustBottomBorderSelect
            setter={item => {
              setItem(item);
              props.setRefId(item);
            }}
            values={props.items}
            value={props.items.find(elem => elem.id === item)}
            placeholder={
              props.isAdvisor ? translator.student : translator.advisor
            }
            subText={props.isAdvisor ? translator.student : translator.advisor}
          />
        )}
        {items !== undefined && (
          <JustBottomBorderSelect
            setter={setRefId}
            values={items}
            value={items.find(elem => elem.id === refId)}
            placeholder={translator.item}
            subText={translator.item}
          />
        )}
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
              refId,
            )
          }
          title={commonTranslator.show}
          style={{alignSelf: 'flex-start'}}
        />
        {item !== undefined && section === 'advisor' && (
          <CommonButton
            theme={'dark'}
            onPress={() => props.setIsInCreateMode(true)}
            title={
              props.isAdvisor
                ? 'ارسال پیام جدید به دانش آموز'
                : 'ارسال پیام جدید به مشاور'
            }
          />
        )}
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
        <MyView
          style={{
            width: 20,
            height: 20,
            alignSelf: 'center',
          }}>
          <SimpleFontIcon
            onPress={() => toggleShowProSearch()}
            style={{
              color: vars.DARK_BLUE,
            }}
            icon={wantedIcon}
          />
        </MyView>
      </PhoneView>
      {showProSearch && (
        <MyView>
          <PhoneView style={{gap: 15}}>
            <JustBottomBorderDatePicker
              placeholder={translator.dateStartRequest}
              subText={translator.dateStartRequest}
              setter={setSendDateSolar}
              value={sendDateSolar}
            />
            <JustBottomBorderDatePicker
              placeholder={translator.dateEndRequest}
              subText={translator.dateEndRequest}
              setter={setSendDateSolarEndLimit}
              value={sendDateSolarEndLimit}
            />
            {props.isAdmin && (
              <JustBottomBorderSelect
                setter={setStartWith}
                values={startWithVals}
                value={startWithVals.find(elem => elem.id === startWith)}
                placeholder={translator.startWith}
                subText={translator.startWith}
              />
            )}
          </PhoneView>
          <PhoneView style={{gap: 15}}>
            <JustBottomBorderDatePicker
              placeholder={translator.lastStartUpdate}
              subText={translator.lastStartUpdate}
              setter={setAnswerDateSolar}
              value={answerDateSolar}
            />
            <JustBottomBorderDatePicker
              placeholder={translator.lastEndUpdate}
              subText={translator.lastEndUpdate}
              setter={setAnswerDateSolarEndLimit}
              value={answerDateSolarEndLimit}
            />
            {props.isAdmin && (
              <MyView style={{marginTop: 10}}>
                <RadioButtonYesOrNo
                  label={translator.searchArchive}
                  selected={searchArchive}
                  setSelected={setSearchArchive}
                />
              </MyView>
            )}
          </PhoneView>
        </MyView>
      )}
    </MyView>
  );
}

export default Filter;
