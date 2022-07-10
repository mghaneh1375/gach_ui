import translator from '../../Translator';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import {faAngleDoubleUp, faPlus} from '@fortawesome/free-solid-svg-icons';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import {
  CommonButton,
  CommonWebBox,
  ShrinkView,
  SimpleText,
  CommonRadioButton,
} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import {useState} from 'react';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../tranlates/Common';
import {routes} from '../../../../../API/APIRoutes';
import {
  sectionKeyVals,
  statusKeyVals,
  priorityKeyVals,
  startWithVals,
} from './../KeyVals';
import {closeRequest, filter} from './Utility';
import columns from '../TableStructure';
import {PhoneView} from '../../../../../styles/Common';
import vars from '../../../../../styles/root';
import {faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {View} from 'react-native';

function List(props) {
  const [status, setStatus] = useState();
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [showProSearch, setShowProSearch] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [priority, setPriority] = useState();
  const [section, setSection] = useState();
  const [wantedIcon, setWantedIcon] = useState(faAngleDoubleDown);
  const [startWith, setStartWith] = useState();
  const [searchArchive, setSearchArchive] = useState('yes');
  const [sendDateSolar, setSendDateSolar] = useState('');
  const [sendDateSolarEndLimit, setSendDateSolarEndLimit] = useState('');
  const [answerDateSolar, setAnswerDateSolar] = useState('');
  const [answerDateSolarEndLimit, setAnswerDateSolarEndLimit] = useState('');

  const handleOp = index => {
    if (index >= props.tickets.length) return;
    props.setSelectedTicket(props.tickets[index]);
    setSelectedId(props.tickets[index].id);
    toggleShowOpPopUp();
  };

  const toggleShowProSearch = () => {
    if (showProSearch) setWantedIcon(faAngleDoubleDown);
    else setWantedIcon(faAngleDoubleUp);
    setShowProSearch(!showProSearch);
  };

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const changeMode = newMode => {
    props.setMode(newMode);
    toggleShowOpPopUp();
  };

  return (
    <ShrinkView>
      {showOpPopUp && (
        <LargePopUp toggleShowPopUp={toggleShowOpPopUp}>
          <PhoneView>
            <CommonButton
              onPress={() => changeMode('show')}
              title={translator.showRequest}
              theme={'transparent'}
            />
            <CommonButton
              title={translator.showRecords}
              theme={'transparent'}
            />
            <CommonButton
              onPress={() => closeRequest()}
              title={translator.closeRecords}
              theme={'transparent'}
            />
          </PhoneView>
        </LargePopUp>
      )}
      <CommonWebBox
        child={
          <ShrinkView>
            <TextIcon
              onPress={() => props.setMode('create')}
              theme={'rect'}
              text={translator.allRequests}
              icon={faPlus}
            />
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
              <View style={{zIndex: 11}}>
                <PhoneView>
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
                <PhoneView style={{marginTop: 10}}>
                  <JustBottomBorderDatePicker
                    placeholder={translator.lastStartUpdate}
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
                    <PhoneView>
                      <SimpleText
                        style={{
                          padding: 10,
                        }}
                        text={translator.SearchArchive}
                      />
                      <CommonRadioButton
                        status={
                          searchArchive === 'yes' ? 'checked' : 'unchecked'
                        }
                        onPress={() => setSearchArchive('yes')}
                        text={commonTranslator.yes}
                      />
                      <CommonRadioButton
                        status={
                          searchArchive === 'no' ? 'checked' : 'unchecked'
                        }
                        onPress={() => setSearchArchive('no')}
                        text={commonTranslator.no}
                      />
                    </PhoneView>
                  </View>
                </PhoneView>
              </View>
            )}
            {props.tickets !== undefined && (
              <CommonDataTable
                handleOp={handleOp}
                columns={columns}
                token={props.token}
                data={props.tickets}
                setData={props.setTickets}
                setLoading={props.setLoading}
                groupOps={[
                  {
                    key: 'removeAll',
                    url: routes.removeTickets,
                  },
                  {
                    key: 'closeAll',
                    label: translator.closeRecords,
                    url: routes.closeTicketRequest,
                    warning: translator.sureClose,
                    method: 'post',
                    afterFunc: res => {
                      props.tickets = props.tickets.map(elem => {
                        if (res.doneIds.indexOf(elem.id) === -1) return elem;
                        elem.status = 'finish';
                        elem.statusFa = translator.closedRequest;
                        return elem;
                      });
                      props.setTickets(props.tickets);
                    },
                  },
                ]}
              />
            )}
          </ShrinkView>
        }
      />
    </ShrinkView>
  );
}

export default List;
