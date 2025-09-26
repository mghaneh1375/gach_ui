import {SimpleFontIcon, SimpleText} from '@/styles';
import vars from '@/styles/root';
import commonTranslator from '@/translator/common';
import {useMemo} from 'react';
import {Translate} from './translate';
import CommonDataTable from '@/styles/common/CommonDataTable';
import {faEye} from '@fortawesome/free-solid-svg-icons';

function UnSeenTickets({tickets}) {
  const columns = useMemo(
    () => [
      {
        name: commonTranslator.sender,
        selector: row => row.sender.firstname + ' ' + row.sender.lastname,
        grow: 1,
      },
      {
        name: commonTranslator.operation,
        cell: (row, index) => (
          <SimpleFontIcon
            kind={'med'}
            key={index}
            onPress={() => window.open('/ticket/' + row.id)}
            icon={faEye}
          />
        ),
        grow: 1,
      },
      {
        name: commonTranslator.title,
        selector: row => row.title,
        grow: 1,
      },
      {
        name: commonTranslator.sendDate,
        selector: row => row.sendAt,
        grow: 1,
      },
      {
        name: commonTranslator.digestMsg,
        selector: row =>
          row.description
            ?.toString()
            .substr(0, Math.min(50, row.description.length)),
        grow: 1,
      },
    ],
    [],
  );

  return (
    <>
      <SimpleText
        style={{
          color: vars.DARK_BLUE,
          fontWeight: 'bold',
          fontSize: '18px',
          borderBottom: `2px solid ${vars.DARK_BLUE}`,
          paddingBottom: '8px',
        }}
        text={Translate.lastUnSeenTickets}
      />
      {tickets && (
        <CommonDataTable
          excel={false}
          pagination={false}
          columns={columns}
          data={tickets}
        />
      )}
    </>
  );
}

export default UnSeenTickets;
