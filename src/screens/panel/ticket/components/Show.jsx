import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../Translator';
import commonTranslator from '../../../../tranlates/Common';
import {sectionKeyVals, statusKeyVals, priorityKeyVals} from './KeyVals';
import {set} from 'react-native-reanimated';

function Show(props) {
  const [isWorking, setIsWorking] = useState(false);
  const [first, setFirst] = useState(true);

  React.useEffect(() => {
    if (first && !isWorking && props.ticket.chats === undefined) {
      setFirst(false);
      setIsWorking(true);
      props.setLoading(true);
      Promise.all([
        generalRequest(
          routes.fetchTicket + props.ticket.id,
          'get',
          undefined,
          'data',
          props.token,
        ),
      ]).then(res => {
        props.setLoading(false);
        if (res[0] !== null) {
          props.ticket = res[0];
          props.updateTicket(props.ticket);
        }
        setIsWorking(false);
      });
    }
  }, [isWorking, props, first]);

  return (
    <View>
      {props.ticket.chats !== undefined && (
        <PhoneView>
          <JustBottomBorderTextInput
            value={props.ticket.student.name}
            disable={true}
            placeholder={commonTranslator.nameAndLast}
          />
          <JustBottomBorderTextInput
            value={
              priorityKeyVals.find(elem => {
                elem.id === props.ticket.priority;
              }).item
            }
            disable={true}
            placeholder={translator.priority}
          />
        </PhoneView>
      )}
    </View>
  );
}

export default Show;
