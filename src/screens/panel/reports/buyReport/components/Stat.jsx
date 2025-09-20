import {formatPrice} from '@/services/utility';
import {CommonWebBox, PhoneView, SimpleFontIcon} from '@/styles';
import CommonDataTable from '@/styles/common/CommonDataTable';
import commonTranslator from '@/translator/common';
import {
  faAngleDown,
  faAngleUp,
  faDashboard,
} from '@fortawesome/free-solid-svg-icons';
import {useMemo, useState} from 'react';

function Stat({
  title,
  data,
  customColumns = undefined,
  setShowDetailReport = undefined,
}) {
  const [showPane, setShowPane] = useState(true);

  const columns = useMemo(
    () => [
      {
        name: commonTranslator.firstname,
        selector: row => row.user.firstname,
        grow: 1,
      },
      {
        name: commonTranslator.lastname,
        selector: row => row.user.lastname,
        grow: 1,
      },
      {
        name: commonTranslator.NID,
        selector: row => row.user.nid,
        grow: 1,
      },
      {
        name: commonTranslator.phone,
        selector: row => row.user.phone,
        grow: 1,
      },
      {
        name: commonTranslator.mail,
        selector: row => row.user.mail,
        grow: 1,
      },
      {
        name: commonTranslator.title,
        selector: row => row.title,
        grow: 1,
      },
      {
        name: commonTranslator.registeredAt,
        selector: row => row.registeredAt,
        grow: 1,
      },
      {
        name: commonTranslator.paid,
        selector: row => formatPrice(row.paid),
        grow: 1,
      },
    ],
    [],
  );

  return (
    <>
      {data !== null && (
        <CommonWebBox
          btn={
            <>
              <PhoneView>
                <SimpleFontIcon
                  kind={'large'}
                  onPress={() => setShowPane(!showPane)}
                  icon={showPane ? faAngleDown : faAngleUp}
                />
                {setShowDetailReport && (
                  <SimpleFontIcon
                    kind={'large'}
                    onPress={() => setShowDetailReport(true)}
                    icon={faDashboard}
                  />
                )}
              </PhoneView>
            </>
          }
          header={title}>
          {showPane && (
            <CommonDataTable
              data={data}
              columns={customColumns ? customColumns : columns}
            />
          )}
        </CommonWebBox>
      )}
    </>
  );
}

export default Stat;
