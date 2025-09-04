import React from 'react';
import {
  BigBoldBlueText,
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
  MyView,
} from '@/styles';
import {TinyTextIcon} from '../../../../../styles/common/TextIcon';
import {Translate} from '../../translate';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import commonTranslator from '@/translator/common';
import {styleFontSize15, styleFontSize11} from '../list/style';
import {FontIcon} from '../../../../../styles/common/FontIcon';
import {callRemoveTicket} from '../utility';
import {showSuccess} from '@/services/utility';
import {closeRequest} from '../../../../panel/ticket/components/list/utility';
import {styles} from '@/styles/common/styles';
function Digest({
  isAdmin,
  ticket,
  setSelectedTicket,
  setMode,
  removeTicket,
  updateTicket,
  token,
  setLoading,
}) {
  return (
    <CommonWebBox
      header={
        isAdmin ? ticket.title + ' - ' + ticket.student.name : ticket.title
      }>
      <PhoneView
        style={{
          ...styles.justifyContentSpaceAround,
          ...styles.margin25,
          ...styles.gap50,
        }}>
        {ticket.advisor !== undefined && (
          <PhoneView>
            <TinyTextIcon />
            <MyView>
              <SimpleText
                style={{
                  ...styleFontSize11,
                }}
                text={Translate.advisor}
              />
              <SimpleText
                style={{
                  ...styleFontSize15,
                }}
                text={ticket.advisor.name}
              />
            </MyView>
          </PhoneView>
        )}

        <PhoneView>
          <TinyTextIcon />
          <MyView>
            <SimpleText
              style={{
                ...styleFontSize11,
              }}
              text={Translate.sendDate}
            />
            <SimpleText
              style={{
                ...styleFontSize15,
              }}
              text={ticket.sendDate}
            />
          </MyView>
        </PhoneView>
        <PhoneView>
          <TinyTextIcon />
          <MyView>
            <SimpleText
              style={{
                ...styleFontSize11,
              }}
              text={commonTranslator.unit}
            />
            <SimpleText
              style={{
                ...styleFontSize15,
              }}
              text={ticket.sectionFa}
            />
          </MyView>
        </PhoneView>
        <PhoneView>
          <TinyTextIcon />
          <MyView>
            <SimpleText
              style={{
                ...styleFontSize11,
              }}
              text={commonTranslator.nes}
            />
            <SimpleText
              style={{
                ...styleFontSize15,
              }}
              text={ticket.priorityFa}
            />
          </MyView>
        </PhoneView>
      </PhoneView>
      <EqualTwoTextInputs>
        <PhoneView>
          <BigBoldBlueText text={ticket.statusFa} />
        </PhoneView>
        <PhoneView
          style={{
            alignItems: 'center',
          }}>
          {ticket.status !== 'finish' && (
            <FontIcon
              kind={'normal'}
              theme={'rect'}
              icon={faTrash}
              onPress={async () => {
                setLoading(true);
                const res = await callRemoveTicket(token, ticket.id);
                setLoading(false);
                if (res !== null) {
                  showSuccess(res.excepts);
                  removeTicket(res.doneIds);
                }
              }}
            />
          )}
          {ticket.status !== 'finish' && isAdmin && (
            <CommonButton
              theme={'dark'}
              title={Translate.closeAll}
              onPress={async () => {
                setLoading(true);
                const res = await closeRequest(
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
