import React, {useState} from 'react';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {getProgressData} from './components/Utility';
import {
  VictoryLine,
  VictoryTheme,
  VictoryChart,
  VictoryAxis,
} from 'victory-native';
import Lesson from './components/Lesson';
import Tag from './components/Tag';

function Progress(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();

  const params = useParams();

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([getProgressData(state.token, params.userId)]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) {
        props.navigate('/');
        return;
      }
      setData(res[0]);
      console.log(res[0]);
    });
  }, [dispatch, props, params.userId, state.token]);

  useEffectOnce(() => {
    if (params.userId === undefined) {
      props.navigate('/');
      return;
    }
    fetchData();
  }, [fetchData]);

  return (
    <>
      <CommonWebBox header={'آمار کلی'}>
        {data !== undefined && (
          <EqualTwoTextInputs>
            <MyView>
              {data.generalStats.totalStats.map((e, index) => {
                return (
                  <PhoneView style={{gap: 30}}>
                    <SimpleText text={data.weeks[index]} />
                    <SimpleText
                      text={
                        'زمان انجام شده: ' +
                        data.generalStats.doneStats[index] +
                        ' دقیقه'
                      }
                    />
                    <SimpleText text={'زمان تعریف شده: ' + e + ' دقیقه'} />
                  </PhoneView>
                );
              })}
            </MyView>
            <MyView style={{width: 500}}>
              <VictoryChart
                height={300}
                width={350}
                theme={VictoryTheme.material}>
                <VictoryLine
                  categories={{
                    x: data.weeks,
                  }}
                  style={{
                    data: {
                      stroke: '#c43a31',
                      strokeWidth: ({data}) => 1,
                    },
                  }}
                  domain={{
                    y: [
                      Math.min(
                        Math.min.apply(Math, data.generalStats.totalStats),
                        Math.min.apply(Math, data.generalStats.doneStats),
                      ) - 10,
                      Math.max(
                        Math.max.apply(Math, data.generalStats.totalStats),
                        Math.max.apply(Math, data.generalStats.doneStats),
                      ) + 100,
                    ],
                  }}
                  data={[0, ...data.generalStats.totalStats]}
                />
                <VictoryLine
                  categories={{
                    x: data.weeks,
                  }}
                  style={{
                    data: {
                      stroke: '#777777',
                      strokeWidth: ({data}) => 1,
                    },
                  }}
                  data={[0, ...data.generalStats.doneStats]}
                />
                <VictoryAxis
                  style={{
                    tickLabels: {
                      fontFamily: 'IRANSans',
                      fontSize: 8,
                    },
                    axisLabel: {
                      fontFamily: 'IRANSans',
                      fontSize: 8,
                    },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  tickFormat={x => x}
                  style={{
                    tickLabels: {
                      fontFamily: 'IRANSans',
                      fontSize: 10,
                      dx: -10,
                    },
                    axisLabel: {
                      fontFamily: 'IRANSans',
                      fontSize: 10,
                      dx: -10,
                    },
                  }}
                />
              </VictoryChart>
            </MyView>
          </EqualTwoTextInputs>
        )}
      </CommonWebBox>
      <CommonWebBox header={'آمار روزانه'}>
        {data !== undefined && (
          <VictoryChart height={200} width={350} theme={VictoryTheme.material}>
            <VictoryLine
              categories={{
                x: data.daily.labels,
              }}
              style={{
                data: {
                  stroke: '#c43a31',
                  strokeWidth: ({data}) => 1,
                },
              }}
              domain={{
                y: [
                  Math.min(
                    Math.min.apply(Math, data.daily.total),
                    Math.min.apply(Math, data.daily.done),
                  ) - 10,
                  Math.max(
                    Math.max.apply(Math, data.daily.total),
                    Math.max.apply(Math, data.daily.done),
                  ) + 100,
                ],
              }}
              data={[0, ...data.daily.total]}
            />
            <VictoryLine
              categories={{
                x: data.daily.labels,
              }}
              style={{
                data: {
                  stroke: '#777777',
                  strokeWidth: ({data}) => 1,
                },
              }}
              data={[0, ...data.daily.done]}
            />
            <VictoryAxis
              style={{
                tickLabels: {
                  fontFamily: 'IRANSans',
                  fontSize: 4,
                },
                axisLabel: {
                  fontFamily: 'IRANSans',
                  fontSize: 4,
                },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={x => x}
              style={{
                tickLabels: {
                  fontFamily: 'IRANSans',
                  fontSize: 4,
                  dx: -10,
                },
                axisLabel: {
                  fontFamily: 'IRANSans',
                  fontSize: 4,
                  dx: -10,
                },
              }}
            />
          </VictoryChart>
        )}
      </CommonWebBox>
      <CommonWebBox header={'آمار کلی بر اساس تگ مطالعه'}>
        {data !== undefined && (
          <PhoneView style={{gap: 20}}>
            {data.tagsGeneralStats !== undefined &&
              data.tagsGeneralStats.map((e, index) => {
                return <Tag weeks={data.weeks} data={e} key={index} />;
              })}
          </PhoneView>
        )}
      </CommonWebBox>

      <CommonWebBox header={'آمار کلی تعداد تست'}>
        {data !== undefined && (
          <PhoneView style={{gap: 20}}>
            {data.additionalTagsGeneralStats !== undefined &&
              data.additionalTagsGeneralStats.map((e, index) => {
                return (
                  <Tag
                    isForTest={true}
                    weeks={data.weeks}
                    data={e}
                    key={index}
                  />
                );
              })}
          </PhoneView>
        )}
      </CommonWebBox>

      {data !== undefined &&
        data.stats.map((elem, index) => {
          return <Lesson weeks={data.weeks} key={index} data={elem} />;
        })}
    </>
  );
}

export default Progress;
