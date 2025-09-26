import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import {
  formatPrice,
  getPast,
  getRandomColor,
  getToday,
} from '@/services/utility';
import {SimpleText} from '@/styles';
import vars from '@/styles/root';
import commonTranslator from '@/translator/common';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import AggregatedReport from './components/AggregatedReport';
import DrawPieChart from './components/DrawPieChart';
import Filter from './components/Filter';
import Stat from './components/Stat';
import {Translate} from './components/translate';

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
  const [regularQuizBuyers, setRegularQuizBuyers] = useState([]);
  const [customQuizBuyers, setCustomQuizBuyers] = useState([]);
  const [stats, setStats] = useState();

  const navigate = useNavigate();
  const {search} = useLocation();
  const [filters, setFilters] = useState();

  useEffect(() => {
    const params = queryString.parse(search);
    setFilters({
      section:
        params !== null && params.section
          ? params.section.toUpperCase()
          : 'ALL',
      from: params !== null && params.from ? params.from : getPast(30, false),
      to: getToday(false),
    });
  }, [search]);

  const fetchData = useCallback(async () => {
    dispatch({loading: true});
    setContentBuyers(null);
    setOpenQuizBuyers(null);
    setCustomQuizBuyers(null);
    setAdviceBuyers(null);
    setRegularQuizBuyers(null);
    setStats(undefined);
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
      setCustomQuizBuyers(res.customQuizBuyersInfoDto);
      setAdviceBuyers(res.adviceBuyersInfoDto);
      setRegularQuizBuyers(res.regularQuizBuyersInfoDto);
      setStats(res.stats);
    } else navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, state.token]);

  useEffect(() => {
    if (filters) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const advisorColumns = useMemo(
    () => [
      {
        name: commonTranslator.title,
        selector: row => row.title,
        grow: 1,
      },
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
        name: Translate.advisorName,
        selector: row => row.advisor.firstname + ' ' + row.advisor.lastname,
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

  const [showContentAggregatedReport, setShowContentAggregatedReport] =
    useState(false);

  const [showOpenQuizAggregatedReport, setShowOpenQuizAggregatedReport] =
    useState(false);

  const [showRegularQuizAggregatedReport, setShowRegularQuizAggregatedReport] =
    useState(false);

  const [showAdviceAggregatedReport, setShowAdviceAggregatedReport] =
    useState(false);

  return (
    <>
      <SimpleText
        style={{
          padding: 20,
          fontSize: 16,
          fontWeight: 'bold',
          color: vars.DARK_BLUE,
        }}
        text={commonTranslator.sellReport}
      />
      {!showContentAggregatedReport &&
        !showOpenQuizAggregatedReport &&
        !showAdviceAggregatedReport &&
        !showRegularQuizAggregatedReport && (
          <>
            {filters && <Filter filter={filters} setFilter={setFilters} />}

            {stats && (
              <DrawPieChart
                data={Object.keys(stats).map(e => ({
                  name: e,
                  value: stats[e],
                  color: getRandomColor(),
                }))}
              />
            )}
            <Stat
              setShowDetailReport={setShowContentAggregatedReport}
              title={Translate.contentBuyers}
              data={contentBuyers}
            />
            <Stat
              setShowDetailReport={setShowAdviceAggregatedReport}
              title={Translate.adviceBuyers}
              data={adviceBuyers}
              customColumns={advisorColumns}
            />
            <Stat
              setShowDetailReport={setShowOpenQuizAggregatedReport}
              title={Translate.openQuizBuyers}
              data={openQuizBuyers}
            />
            <Stat title={Translate.customQuizBuyers} data={customQuizBuyers} />
            <Stat
              setShowDetailReport={setShowRegularQuizAggregatedReport}
              title={Translate.regularQuizBuyers}
              data={regularQuizBuyers}
            />
          </>
        )}

      {showContentAggregatedReport && (
        <AggregatedReport
          title={Translate.contentAggregateReport}
          data={contentBuyers}
          onClose={() => setShowContentAggregatedReport(false)}
        />
      )}

      {showOpenQuizAggregatedReport && (
        <AggregatedReport
          title={Translate.openQuizAggregateReport}
          data={openQuizBuyers}
          onClose={() => setShowOpenQuizAggregatedReport(false)}
        />
      )}

      {showRegularQuizAggregatedReport && (
        <AggregatedReport
          title={Translate.regularQuizAggregateReport}
          data={regularQuizBuyers}
          onClose={() => setShowRegularQuizAggregatedReport(false)}
        />
      )}

      {showAdviceAggregatedReport && (
        <AggregatedReport
          title={Translate.adviceAggregateReport}
          data={adviceBuyers}
          onClose={() => setShowAdviceAggregatedReport(false)}
          titleKey="advisorName"
        />
      )}
    </>
  );
}

export default BuyReport;
