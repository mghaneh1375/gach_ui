import MyLineChart from '@/components/web/chart/MyLineChart';
import {
  convertJalaliDateToTimestamp,
  convertTimestampToJustDate,
  getWidthHeight,
} from '@/services/utility';
import {PhoneView} from '@/styles';
import JustBottomBorderDatePicker from '@/styles/common/JustBottomBorderDatePicker';
import vars from '@/styles/root';
import {useEffect, useState} from 'react';

const MAX_BUCKET_COUNT = 10;

function BuyChart({data}) {
  const [stats, setStats] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [availableData, setAvailableData] = useState();

  useEffect(() => {
    if (!data) return;
    setAvailableData(data);
  }, [data]);

  useEffect(() => {
    if (!availableData) return;

    const timestamps = [
      ...new Set(
        availableData.map(item =>
          convertJalaliDateToTimestamp(item.registerAt.split('-')[0].trim()),
        ),
      ),
    ].sort((a, b) => a - b);

    const minTime = timestamps[0];
    const maxTime = timestamps[timestamps.length - 1];
    const range = maxTime - minTime;

    const bucketCount = Math.min(MAX_BUCKET_COUNT, timestamps.length);
    const bucketSize = range / bucketCount;
    const buckets = Array.from({length: bucketCount}, (_, i) => ({
      start: new Date(minTime + i * bucketSize),
      end: new Date(minTime + (i + 1) * bucketSize),
      count: 0,
    }));

    availableData.forEach(item => {
      const tmp = item.registerAt.split('-')[0].trim();
      const time = convertJalaliDateToTimestamp(tmp);

      const index =
        bucketSize === 0
          ? 0
          : Math.min(
              Math.floor((time - minTime) / bucketSize),
              bucketCount - 1,
            );

      buckets[index].count += 1;
    });

    setStats(buckets);
  }, [availableData]);

  useEffect(() => {
    setAvailableData(
      data.filter(e => {
        const time = convertJalaliDateToTimestamp(
          e.registerAt.split('-')[0].trim(),
        );
        if ((from && from > time) || (to && to < time)) return false;
        return true;
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  return (
    <>
      <PhoneView style={{gap: 10}}>
        <JustBottomBorderDatePicker
          value={from}
          setter={e => setFrom(e)}
          placeholder={'از'}
          subText={'از'}
        />
        <JustBottomBorderDatePicker
          value={to}
          setter={e => setTo(e)}
          placeholder={'تا'}
          subText={'تا'}
        />
      </PhoneView>
      {stats && (
        <MyLineChart
          labels={stats.map(
            e =>
              convertTimestampToJustDate(e.start) +
              ' - ' +
              convertTimestampToJustDate(e.end),
          )}
          data={stats.map(e => e.count)}
          width={getWidthHeight()[0] - vars.RIGHT_MENU_WIDTH - 50}
          height={800}
        />
      )}
    </>
  );
}

export default BuyChart;
