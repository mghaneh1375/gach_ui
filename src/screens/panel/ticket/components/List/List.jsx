import translator from '../../translator';
import {CommonButton, CommonWebBox, ShrinkView} from '@/styles';
import React, {useEffect, useState} from 'react';
import CommonDataTable from '../../../../../styles/common/CommonDataTable.jsx';
import {LargePopUp} from '../../../../../styles/common/PopUp.jsx';
import {routes} from '@/api/apiRoutes';
import {closeRequest} from './utility';
import {StudentTableStructure, TableStructure} from '../tableStructure';
import {PhoneView} from '@/styles';
import Filter from '../proSearch/Filter.jsx';
import {useLocation} from 'react-router';
import {login} from '../../../users/components/utility';
const queryString = require('query-string');
function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [isInUpgradeMode, setIsInUpgradeMode] = useState(false);
  const [selected, setSelected] = useState();
  const [params, setParams] = useState();
  const {search} = useLocation();
  useEffect(() => {
    if (search) setParams(queryString.parse(search));
  }, [search]);
  React.useEffect(() => {
    if (params?.section === 'upgradelevel') setIsInUpgradeMode(true);
  }, [params]);
  const handleOp = index => {
    if (index >= props.tickets.length) return;
    props.setSelectedTicket(props.tickets[index]);
    setSelected(props.tickets[index]);
    toggleShowOpPopUp();
  };
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  return (
    <ShrinkView>
      {showOpPopUp && (
        <LargePopUp toggleShowPopUp={toggleShowOpPopUp}>
          <PhoneView>
            {props.isAdmin &&
              (isInUpgradeMode || selected.section === 'upgradelevel') && (
                <>
                  <CommonButton
                    title={translator.seeForm}
                    onPress={() =>
                      window.open('/profile/' + selected.student.id)
                    }
                    theme={'transparent'}
                  />
                  <CommonButton
                    title={'ارتقا سطح'}
                    onPress={() => props.setMode('changeLevel')}
                    theme={'transparent'}
                  />
                </>
              )}
            <CommonButton
              onPress={() => props.setMode('show')}
              title={translator.showRequest}
              theme={'transparent'}
            />

            {/* {props.isAdmin && (
              <CommonButton
                title={translator.showRecords}
                theme={'transparent'}
              />
             )} */}
            {props.isAdmin && (
              <>
                <CommonButton
                  title={'ورود'}
                  onPress={async () => {
                    const res = await login(
                      props.setLoading,
                      props.token,
                      selected.student.id,
                    );
                    if (res) {
                      toggleShowOpPopUp();
                      window.location.href = '/';
                    }
                  }}
                  theme={'transparent'}
                />
                <CommonButton
                  onPress={() =>
                    closeRequest(
                      {
                        token: props.token,
                        setLoading: props.setLoading,
                      },
                      selected.id,
                      toggleShowOpPopUp,
                    )
                  }
                  title={translator.closeRecords}
                  theme={'transparent'}
                />
              </>
            )}
          </PhoneView>
        </LargePopUp>
      )}
      <CommonWebBox
        header={translator.allRequests}
        addBtn={true}
        onAddClick={() => props.setMode('create')}
        child={
          <ShrinkView>
            {props.isAdmin && (
              <Filter
                setIsInUpgradeMode={setIsInUpgradeMode}
                section={params?.section}
                status={params?.status}
                setTickets={props.setTickets}
                items={props.items}
                isAdmin={props.isAdmin}
                token={props.token}
                setLoading={props.setLoading}
              />
            )}
            {props.tickets !== undefined && (
              <CommonDataTable
                handleOp={handleOp}
                columns={props.isAdmin ? TableStructure : StudentTableStructure}
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
