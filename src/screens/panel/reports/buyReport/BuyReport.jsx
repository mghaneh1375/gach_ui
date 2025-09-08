import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import sectionValues from '@/constants/sectionValues';
import {CommonButton, CommonWebBox, PhoneView, SimpleFontIcon} from '@/styles';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect';
import commonTranslator from '@/translator/common';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';

const queryString = require('query-string');
function BuyReport() {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [contentBuyers, setContentBuyers] = useState([]);
  const [openQuizBuyers, setOpenQuizBuyers] = useState([]);
  const [adviceBuyers, setAdviceBuyers] = useState([]);
  const [showContentBuyers, setShowContentBuyers] = useState(true);
  const [showOpenQuizBuyers, setShowOpenQuizBuyers] = useState(true);
  const navigate = useNavigate();
  const {search} = useLocation();
  const [filters, setFilters] = useState();

  const columns = useMemo(
    () => [
      {
        name: commonTranslator.firstname,
        selector: row => row.firstname,
        grow: 1,
      },
      {
        name: commonTranslator.lastname,
        selector: row => row.lastname,
        grow: 1,
      },
      {
        name: commonTranslator.NID,
        selector: row => row.nid,
        grow: 1,
      },
      {
        name: commonTranslator.phone,
        selector: row => row.phone,
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
    ],
    [],
  );

  useEffect(() => {
    const params = queryString.parse(search);
    setFilters({
      section:
        params !== null && params.section
          ? params.section.toUpperCase()
          : 'ALL',
      from: undefined,
      to: undefined,
    });
  }, [search]);

  const fetchData = useCallback(async () => {
    dispatch({loading: true});
    const res = await generalRequest(
      routes.buyReport,
      'post',
      filters,
      'data',
      state.token,
    );

    dispatch({loading: false});
    if (res !== null) {
      setContentBuyers(res.contentBuyersInfoDto);
      setOpenQuizBuyers(res.openQuizBuyersInfoDto);
    } else navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, state.token]);

  useEffect(() => {
    if (filters) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <>
      <CommonWebBox header={commonTranslator.filter}>
        <PhoneView>
          <JustBottomBorderSelect
            setter={newVal =>
              setFilters(prevValues => ({
                ...prevValues,
                section: newVal,
              }))
            }
            value={sectionValues.find(e => e.id === filters?.section)}
            values={sectionValues}
            placeholder={commonTranslator.section_}
            subText={commonTranslator.section_}
          />
        </PhoneView>
        <CommonButton title={commonTranslator.search} />
      </CommonWebBox>
      {contentBuyers !== null && (
        <CommonWebBox
          btn={
            <SimpleFontIcon
              kind={'large'}
              onPress={() => setShowContentBuyers(!showContentBuyers)}
              icon={showContentBuyers ? faAngleDown : faAngleUp}
            />
          }
          header={'خریداران دوره‌های آموزشی در 30 روز اخیر'}>
          {showContentBuyers && (
            <CommonDataTable data={contentBuyers} columns={columns} />
          )}
        </CommonWebBox>
      )}
      {openQuizBuyers !== null && (
        <CommonWebBox
          btn={
            <SimpleFontIcon
              kind={'large'}
              onPress={() => setShowOpenQuizBuyers(!showOpenQuizBuyers)}
              icon={showOpenQuizBuyers ? faAngleDown : faAngleUp}
            />
          }
          header={'خریداران آزمون‌های باز در 30 روز اخیر'}>
          {showOpenQuizBuyers && (
            <CommonDataTable data={openQuizBuyers} columns={columns} />
          )}
        </CommonWebBox>
      )}
    </>
  );
}

export default BuyReport;
