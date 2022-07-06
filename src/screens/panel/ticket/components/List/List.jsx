import {View} from 'react-native';
import {routes} from '../../../../../API/APIRoutes';
import translator from '../../Translator';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {
  CommonButton,
  CommonWebBox,
  ShrinkView,
  SimpleText,
} from '../../../../styles/Common';
import {Col} from 'react-grid-system';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {useState} from 'react';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../tranlates/Common';
import {sectionKeyVals, statusKeyVals, priorityKeyVals} from './KeyVals';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import React, {useState} from 'react';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import {closeRequest, filter} from './Utility';
import commonTranslator from '../../../../../tranlates/Common';
import {sectionKeyVals, statusKeyVals, priorityKeyVals} from '../KeyVals';
import columns from '../TableStructure';
import {PhoneView} from '../../../../../styles/Common';

function List(props) {
  const [status, setStatus] = useState();
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [priority, setPriority] = useState();
  const [section, setSection] = useState();

  const handleOp = index => {
    if (index >= props.tickets.length) return;
    props.setSelectedTicket(props.tickets[index]);
    setSelectedId(props.tickets[index].id);
    toggleShowOpPopUp();
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
                onPress={() => filter(props, priority, section, status)}
                isHalf={true}
                title={commonTranslator.show}
                style={{alignSelf: 'flex-start'}}
              />
            </PhoneView>
            <PhoneView>
              <SimpleText
                style={{padding: 15, color: 'blue'}}
                text={translator.advancedSearch}
              />
            </PhoneView>
            <CommonDataTable
              handleOp={handleOp}
              columns={columns}
              removeUrl={routes.removeOffs}
              data={props.tickets}
            />
            {props.tickets !== undefined && (
              <CommonDataTable
                handleOp={handleOp}
                columns={columns}
                removeUrl={routes.removeTickets}
                token={props.token}
                data={props.tickets}
                setData={props.setTickets}
                setLoading={props.setLoading}
              />
            )}
          </ShrinkView>
        }
      />
    </ShrinkView>
  );
}

export default List;
