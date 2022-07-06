import {View} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import translator from '../Translator';
import {TextIcon} from '../../../../styles/Common/TextIcon';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import {Col} from 'react-grid-system';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {useState} from 'react';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import {generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../tranlates/Common';
import {sectionKeyVals, statusKeyVals, priorityKeyVals} from './KeyVals';

import columns from './TableStructure';

function List(props) {
  const [status, setStatus] = useState();
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [priority, setPriority] = useState();
  const [section, setSection] = useState();

  const handleOp = index => {
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

  const closeRequest = () => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.closeTicketRequest,
        'post',
        {items: [selectedId]},
        ['excepts', 'closedIds'],
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        showSuccess(res[0].excepts);
        let tickets = props.tickets;
        tickets = tickets.map(elem => {
          if (res[0].closedIds.indexOf(elem.id) !== -1)
            elem.statusFa = translator.closedRequest;
          return elem;
        });
        props.setTickets(tickets);
        toggleShowOpPopUp();
      }
    });
  };

  const filter = () => {
    let query = new URLSearchParams();

    if (priority !== undefined && priority !== 'all')
      query.append('priority', priority);
    if (section !== undefined && priority !== 'all')
      query.append('section', section);
    if (statusKeyVals !== undefined) query.append('status', status);

    console.log(query.toString());
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.fetchAllTickets + '?' + query.toString(),
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        props.setTickets(res[0]);
      }
    });
  };

  return (
    <View>
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
          <View>
            <TextIcon
              onPress={() => props.setMode('create')}
              theme={'rect'}
              text={translator.allRequests}
              icon={faPlus}
            />
            <PhoneView>
              <Col lg={6}>
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
                </PhoneView>
              </Col>
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
                onPress={() => filter()}
                isHalf={true}
                title={commonTranslator.show}
              />
            </PhoneView>
            <CommonDataTable
              handleOp={handleOp}
              columns={columns}
              removeUrl={routes.removeOffs}
              data={props.tickets}
            />
          </View>
        }
      />
    </View>
  );
}

export default List;
