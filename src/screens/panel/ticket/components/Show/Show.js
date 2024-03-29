import React, {useState} from 'react';
import {CommonWebBox, PhoneView, MyView} from '../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../Translator';
import commonTranslator from '../../../../../translator/Common';
import {sectionKeyVals, priorityKeyVals} from '../KeyVals';
import {fetchDetail} from './Utility';
import Chat from './Chat';
import Add from './Add';
import {styles} from '../../../../../styles/Common/Styles';

function Show(props) {
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (!isWorking && props.ticket.chats === undefined) {
      setIsWorking(true);
      props.setLoading(true);
      Promise.all([fetchDetail(props.ticket.id, props.token)]).then(res => {
        props.setLoading(false);
        if (res[0] !== null) {
          props.updateTicket(res[0]);
          props.setSelectedTicket(res[0]);
        } else {
          props.setMode('list');
        }
        setIsWorking(false);
      });
    }
  }, [isWorking, props]);

  const [studentPic, setStudentPic] = useState();

  React.useEffect(() => {
    if (props.isAdmin) setStudentPic(props.ticket.student.pic);
    else setStudentPic(props.user.user.pic);
  }, [props.ticket, props.isAdmin, props.user]);

  return (
    <MyView>
      {props.ticket.chats !== undefined && (
        <MyView>
          <CommonWebBox
            header={props.ticket.title}
            backBtn={true}
            onBackClick={() => props.setMode('list')}
            child={
              <MyView>
                <PhoneView style={{...styles.gap10}}>
                  {props.isAdmin && (
                    <JustBottomBorderTextInput
                      value={props.ticket.student.name}
                      disable={true}
                      placeholder={commonTranslator.nameAndLast}
                      subText={commonTranslator.nameAndLast}
                    />
                  )}
                  <JustBottomBorderTextInput
                    value={
                      priorityKeyVals.find(
                        elem => elem.id === props.ticket.priority,
                      ).item
                    }
                    disable={true}
                    placeholder={translator.priority}
                    subText={translator.priority}
                  />
                  <JustBottomBorderTextInput
                    value={
                      sectionKeyVals.find(
                        elem => elem.id === props.ticket.section,
                      ).item
                    }
                    disable={true}
                    placeholder={translator.section}
                    subText={translator.section}
                  />
                  {props.ticket.ref !== undefined && (
                    <JustBottomBorderTextInput
                      value={props.ticket.ref}
                      disable={true}
                      placeholder={translator.item}
                      subText={translator.item}
                    />
                  )}
                  {props.ticket.advisor !== undefined && (
                    <JustBottomBorderTextInput
                      value={props.ticket.advisor.name}
                      disable={true}
                      placeholder={translator.advisor}
                      subText={translator.advisor}
                    />
                  )}

                  <JustBottomBorderTextInput
                    value={props.ticket.statusFa}
                    disable={true}
                    placeholder={translator.status}
                    subText={translator.status}
                  />
                </PhoneView>
              </MyView>
            }
          />

          <CommonWebBox
            child={props.ticket.chats.map((elem, key) => {
              return (
                <Chat
                  pic={elem.isForUser ? studentPic : elem.responder.pic}
                  name={elem.isForUser ? undefined : elem.responder.name}
                  {...elem}
                  key={key}
                  isHtml={props.ticket.section === 'access'}
                />
              );
            })}
          />
          {((props.isAdmin && props.ticket.status === 'pending') ||
            (!props.isAdmin && props.ticket.status === 'answer')) && (
            <Add
              updateTicket={props.updateTicket}
              token={props.token}
              setLoading={props.setLoading}
              setSelectedTicket={props.setSelectedTicket}
              ticket={props.ticket}
            />
          )}
        </MyView>
      )}
    </MyView>
  );
}

export default Show;
