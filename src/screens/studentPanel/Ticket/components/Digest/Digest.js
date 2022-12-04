import React from 'react';
import {
  BigBoldBlueText,
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
  MyView,
} from '../../../../../styles/Common';
import {TinyTextIcon} from '../../../../../styles/Common/TextIcon';
import {Translate} from '../../Translate';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import commonTranslator from '../../../../../translator/Common';
import {styleFontSize15, styleFontSize11} from '../List/style';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import {callRemoveTicket} from '../Utility';
import {showSuccess} from '../../../../../services/Utility';
import {closeRequest} from '../../../../panel/ticket/components/List/Utility';
import {styles} from '../../../../../styles/Common/Styles';

function Digest({
  ticket,
  setSelectedTicket,
  setMode,
  removeTicket,
  updateTicket,
  token,
  setLoading,
}) {
  return (
    <CommonWebBox header={ticket.title}>
      <PhoneView
        style={{
          ...styles.justifyContentSpaceAround,
          ...styles.margin25,
          ...styles.gap50,
        }}>
        <PhoneView>
          <TinyTextIcon />
          <MyView>
            <SimpleText
              style={{...styleFontSize11}}
              text={Translate.sendDate}
            />
            <SimpleText style={{...styleFontSize15}} text={ticket.sendDate} />
          </MyView>
        </PhoneView>
        <PhoneView>
          <TinyTextIcon />
          <MyView>
            <SimpleText
              style={{...styleFontSize11}}
              text={commonTranslator.unit}
            />
            <SimpleText style={{...styleFontSize15}} text={ticket.sectionFa} />
          </MyView>
        </PhoneView>
        <PhoneView>
          <TinyTextIcon />
          <MyView>
            <SimpleText
              style={{...styleFontSize11}}
              text={commonTranslator.nes}
            />
            <SimpleText style={{...styleFontSize15}} text={ticket.priorityFa} />
          </MyView>
        </PhoneView>
      </PhoneView>
      <EqualTwoTextInputs>
        <PhoneView>
          <BigBoldBlueText text={ticket.statusFa} />
        </PhoneView>
        <PhoneView style={{alignItems: 'center'}}>
          {ticket.status !== 'finish' && (
            <FontIcon
              kind={'normal'}
              theme={'rect'}
              icon={faTrash}
              onPress={async () => {
                setLoading(true);
                let res = await callRemoveTicket(token, ticket.id);
                setLoading(false);
                if (res !== null) {
                  showSuccess(res.excepts);
                  removeTicket(res.doneIds);
                }
              }}
            />
          )}
          {ticket.status !== 'finish' && (
            <CommonButton
              theme={'dark'}
              title={Translate.closeAll}
              onPress={async () => {
                setLoading(true);
                let res = await closeRequest(
                  {
                    token: token,
                    setLoading: setLoading,
                  },
                  ticket.id,
                  undefined,
                );
                setLoading(false);
                if (res !== null) {
                  ticket.status = 'finish';
                  ticket.statusFa = commonTranslator.finished;
                  updateTicket(ticket);
                }
              }}
            />
          )}
          <CommonButton
            onPress={() => {
              setSelectedTicket(ticket);
              setMode('show');
            }}
            title={commonTranslator.view}
          />
        </PhoneView>
      </EqualTwoTextInputs>
    </CommonWebBox>
  );
}

export default Digest;
