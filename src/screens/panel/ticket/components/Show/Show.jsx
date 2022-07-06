import React, {useState} from 'react';
import {View} from 'react-native';
import {CommonWebBox, PhoneView} from '../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import {sectionKeyVals, statusKeyVals, priorityKeyVals} from '../KeyVals';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {changeMode, fetchDetail} from './Utility';
import Chat from './Chat';
import Add from './Add';

function Show(props) {
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (!isWorking && props.ticket.chats === undefined) {
      setIsWorking(true);
      Promise.all([fetchDetail(props)]).then(res => {
        setIsWorking(false);
      });
    }
  }, [isWorking, props]);

  const addChat = newChat => {
    props.ticket.chats.push(newChat);
    props.updateTicket(props.ticket);
  };

  return (
    <View>
      {props.ticket.chats !== undefined && (
        <View>
          <CommonWebBox
            header={translator.title}
            btn={
              <FontIcon
                onPress={() => changeMode(props.setMode, 'list')}
                theme="rect"
                kind="normal"
                icon={faArrowLeft}
              />
            }
            child={
              <View>
                <PhoneView>
                  <JustBottomBorderTextInput
                    value={props.ticket.student.name}
                    disable={true}
                    placeholder={commonTranslator.nameAndLast}
                    subText={commonTranslator.nameAndLast}
                  />
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
                </PhoneView>
                <PhoneView>
                  <JustBottomBorderTextInput
                    value={
                      statusKeyVals.find(
                        elem => elem.id === props.ticket.status,
                      ).item
                    }
                    disable={true}
                    placeholder={translator.status}
                    subText={translator.status}
                  />
                </PhoneView>
              </View>
            }
          />

          <CommonWebBox
            child={props.ticket.chats.map((elem, key) => {
              return <Chat {...elem} key={key} />;
            })}
          />
          <Add
            toket={props.token}
            setLoading={props.setLoading}
            ticketId={props.ticket.id}
            addChat={addChat}
          />
        </View>
      )}
    </View>
  );
}

export default Show;
