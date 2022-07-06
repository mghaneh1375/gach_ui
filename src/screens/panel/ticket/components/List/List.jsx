import {View} from 'react-native';
import {routes} from '../../../../../API/APIRoutes';
import translator from '../../Translator';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {
  CommonButton,
  CommonWebBox,
  ShrinkView,
<<<<<<< HEAD:src/screens/panel/ticket/components/List.jsx
  SimpleText,
} from '../../../../styles/Common';
import {Col} from 'react-grid-system';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {useState} from 'react';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import {generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../tranlates/Common';
import {sectionKeyVals, statusKeyVals, priorityKeyVals} from './KeyVals';
=======
  PhoneView,
} from '../../../../../styles/Common';
>>>>>>> 555535581aaf9a07e4ee526b7e7fc2cd02d4647c:src/screens/panel/ticket/components/List/List.jsx

import {Col} from 'react-grid-system';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import React, {useState} from 'react';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import {closeRequest, filter} from './Utility';
import commonTranslator from '../../../../../tranlates/Common';
import {sectionKeyVals, statusKeyVals, priorityKeyVals} from '../KeyVals';
import columns from '../TableStructure';

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
              {/* <Col lg={6}>
                <PhoneView>
                  <JustBottomBorderSelect
                    isHalf={true}
                    onSelect={selectStatus}
                    values={statusKeyVals}
                    value={
                      status === undefined
                        ? ''
                        : status === 'pending'
                        ? translator.pending
                        : translator.finished
                    }
                    placeholder={translator.status}
                  />
                  <CommonButton isHalf={true} title={commonTranslator.show} />
                </PhoneView>
              </Col> */}
              <CommonButton
                onPress={() => filter(props, priority, section, status)}
                isHalf={true}
                title={commonTranslator.show}
                style={{alignSelf: 'flex-start'}}
              />
            </PhoneView>
<<<<<<< HEAD:src/screens/panel/ticket/components/List.jsx
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
=======
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
>>>>>>> 555535581aaf9a07e4ee526b7e7fc2cd02d4647c:src/screens/panel/ticket/components/List/List.jsx
          </ShrinkView>
        }
      />
    </ShrinkView>
  );
}

export default List;
