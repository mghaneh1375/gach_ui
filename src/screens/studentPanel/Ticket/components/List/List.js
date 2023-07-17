import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
import {Translate} from '../../Translate';
import Digest from '../Digest/Digest';
import Filter from '../../../../panel/ticket/components/ProSearch/Filter';
import {editItem} from '../../../../../services/Utility';

import {useSearchParams} from 'react-router-dom';
import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import Create from '../../../../panel/ticket/components/Create';

function List(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isWorking, setIsWorking] = useState();
  const [myAdvisors, setMyAdvisors] = useState();
  const [myStudents, setMyStudents] = useState();
  const [section, setSection] = useState();
  const [refId, setRefId] = useState();

  const fetchMyAdvisors = React.useCallback(() => {
    if (isWorking || myAdvisors !== undefined) return;

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      generalRequest(
        routes.getMyAdvisors,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] == null) {
        return;
      }
      setMyAdvisors(
        res[0].map(e => {
          return {id: e.id, item: e.name};
        }),
      );
      setIsWorking(false);
    });
  }, [props, isWorking, myAdvisors]);

  const fetchMyStudents = React.useCallback(() => {
    if (isWorking || myStudents !== undefined) return;

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      generalRequest(
        routes.getStudentsDigest,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] == null) {
        return;
      }
      setMyStudents(
        res[0].map(e => {
          return {id: e.id, item: e.name};
        }),
      );
      setIsWorking(false);
    });
  }, [props, isWorking, myStudents]);

  React.useEffect(() => {
    if (section !== 'advisor' || myAdvisors !== undefined) return;
    if (props.isAdmin) fetchMyStudents();
    else fetchMyAdvisors();
  }, [section, myAdvisors, fetchMyAdvisors, fetchMyStudents, props.isAdmin]);

  React.useEffect(() => {
    setSection(searchParams.get('section'));
    setRefId(searchParams.get('userId'));
  }, [searchParams]);

  const [isInCreateMode, setIsInCreateMode] = useState(false);

  return (
    <>
      {isInCreateMode && (
        <Create
          setLoading={props.setLoading}
          token={props.token}
          setMode={mode => setIsInCreateMode(false)}
          section={'advisor'}
          id={refId}
          isAdmin={false}
          isAdvisor={props.isAdmin}
          user={props.user}
          addTicket={props.addTicket}
        />
      )}
      {!isInCreateMode && (
        <MyView>
          <CommonWebBox
            header={Translate.sendRequest}
            addBtn={true}
            onAddClick={() => props.setMode('create')}></CommonWebBox>
          <CommonWebBox style={{marginTop: -5}}>
            <MyView style={{padding: 5}}>
              <Filter
                items={props.isAdmin ? myStudents : myAdvisors}
                setSection={setSection}
                section={section}
                userId={searchParams.get('userId')}
                setTickets={props.setTickets}
                isAdvisor={props.isAdmin}
                isAdmin={false}
                token={props.token}
                setLoading={props.setLoading}
                setIsInCreateMode={setIsInCreateMode}
                setRefId={setRefId}
              />
            </MyView>
          </CommonWebBox>
          {props.tickets !== undefined &&
            props.tickets.map((elem, index) => {
              return (
                <Digest
                  isAdmin={props.isAdmin}
                  ticket={elem}
                  setSelectedTicket={props.setSelectedTicket}
                  setMode={props.setMode}
                  key={index}
                  removeTicket={props.removeTicket}
                  updateTicket={newItem =>
                    editItem(props.tickets, props.setTickets, newItem)
                  }
                  token={props.token}
                  setLoading={props.setLoading}
                />
              );
            })}
        </MyView>
      )}
    </>
  );
}

export default List;
