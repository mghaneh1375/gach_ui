import {getRandomColor} from '@/services/utility';
import {CommonWebBox} from '@/styles';
import {useEffect, useState} from 'react';
import DrawPieChart from './DrawPieChart';

function AggregatedReport({data, onClose, title, titleKey = 'title'}) {
  const [aggregatedReport, setAggregatedReport] = useState();
  useEffect(() => {
    if (!data) return;

    const list = [];
    data.forEach(item => {
      const res = list.find(e => e.name === item[titleKey]);
      if (res && res !== null) res.value = res.value + 1;
      else list.push({name: item[titleKey], value: 1, color: getRandomColor()});
    });
    setAggregatedReport(list);
  }, [data, titleKey]);

  return (
    <>
      <CommonWebBox backBtn={true} onBackClick={onClose} header={title}>
        {aggregatedReport && <DrawPieChart data={aggregatedReport} />}
      </CommonWebBox>
    </>
  );
}

export default AggregatedReport;
