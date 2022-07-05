import {View} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import translator from '../Translator';
import {TextIcon} from '../../../../styles/Common/TextIcon';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import {Col} from 'react-grid-system';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {useState} from 'react';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import {generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';

function List(props) {
  const [status, setStatus] = useState();
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selectedId, setSelectedId] = useState();
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
        console.log(tickets);
        tickets = tickets.map(elem => {
          if (res[0].closedIds.indexOf(elem.id) !== -1)
            elem.statusFa = translator.closedRequest;
          return elem;
        });
        console.log(tickets);
        props.setTickets(tickets);
        toggleShowOpPopUp();
      }
    });
  };

  const columns = [
    {
      name: ' نام و نام خانوادگی',
      selector: row => row.student.name,
      grow: 1,
    },
    {
      name: 'واحد',
      selector: row => row.student.unit,
      grow: 1,
    },
    {
      name: 'ضرورت',
      selector: row => row.statusFa,
      grow: 1,
    },
    {
      name: 'زمان ایجاد',
      selector: row => row.answeredDate,
      grow: 4,
      wrap: true,
      style: {
        minWidth: '200px !important',
      },
      sortable: true,
      sortFunction: (a, b) => {
        return a.expireAt - b.expireAt;
      },
    },
    {
      name: 'تاریخ ایجاد آخرین وضعیت',
      selector: row => row.sendDate,
      grow: 4,
      wrap: true,
      style: {
        minWidth: '200px !important',
      },
      sortable: true,
      sortFunction: (a, b) => {
        return a.expireAt - b.expireAt;
      },
    },
    {
      name: 'وضعیت',
      selector: row => row.status,
      grow: 1,
    },
    {
      name: 'بررسی کننده',
      selector: row => row.status,
      grow: 1,
    },
  ];

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
            {/* <PhoneView>
              <Col lg={6}>
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
                </PhoneView>
              </Col>
              <Col lg={6}>
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
              </Col>
            </PhoneView> */}
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