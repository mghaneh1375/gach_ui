import Titr from '@/screens/panel/quiz/components/Titr';
import {SimpleFontIcon} from '@/styles';
import CommonDataTable from '@/styles/common/CommonDataTable';
import commonTranslator from '@/translator/common';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {useMemo} from 'react';
import {Translate} from './translate';

function UnSeenTickets({tickets, dashboardMode = 'advisor'}) {
  const columns = useMemo(
    () =>
      dashboardMode === 'advisor'
        ? [
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
                  .substr(0, Math.min(20, row.description.length)),
              grow: 1,
            },
          ]
        : [
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
              name: commonTranslator.answerAt,
              selector: row => row.answerAt,
              grow: 1,
            },
            {
              name: commonTranslator.digestMsg,
              selector: row =>
                row.description
                  ?.toString()
                  .substr(0, Math.min(20, row.description.length)),
              grow: 1,
            },
          ],
    [dashboardMode],
  );

  return (
    <>
      <Titr title={Translate.lastUnSeenTickets} />
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
