import translator from '../../Translator';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {
  CommonButton,
  CommonWebBox,
  ShrinkView,
} from '../../../../../styles/Common';
import {useState} from 'react';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import {routes} from '../../../../../API/APIRoutes';
import {closeRequest} from './Utility';
import columns from '../TableStructure';
import {PhoneView} from '../../../../../styles/Common';
import Filter from '../ProSearch/Filter';

function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const handleOp = index => {
    if (index >= props.tickets.length) return;
    props.setSelectedTicket(props.tickets[index]);
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
            {props.isAdmin && (
              <CommonButton
                title={translator.showRecords}
                theme={'transparent'}
              />
            )}
            {props.isAdmin && (
              <CommonButton
                onPress={() => closeRequest()}
                title={translator.closeRecords}
                theme={'transparent'}
              />
            )}
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
            {props.isAdmin && (
              <Filter token={props.token} setLoading={props.setLoading} />
            )}
            {props.tickets !== undefined && (
              <CommonDataTable
                handleOp={handleOp}
                columns={columns}
                token={props.token}
                data={props.tickets}
                setData={props.setTickets}
                setLoading={props.setLoading}
                groupOps={
                  !props.isAdmin
                    ? []
                    : [
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
                              if (res.doneIds.indexOf(elem.id) === -1)
                                return elem;
                              elem.status = 'finish';
                              elem.statusFa = translator.closedRequest;
                              return elem;
                            });
                            props.setTickets(props.tickets);
                          },
                        },
                      ]
                }
              />
            )}
          </ShrinkView>
        }
      />
    </ShrinkView>
  );
}

export default List;
