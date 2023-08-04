import React, {useState} from 'react';
import {
  CommonButton,
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
import JustBottomBorderDatePicker from '../../../styles/Common/JustBottomBorderDatePicker';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import JustBottomBorderSelect from '../../../styles/Common/JustBottomBorderSelect';
import {log} from 'react-native-reanimated';

function Progress(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();

  const params = useParams();

  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([getProgressData(state.token, params.userId, start, end)]).then(
      res => {
        dispatch({loading: false});
        if (res[0] == null) {
          props.navigate('/');
          return;
        }
        setData(res[0]);
      },
    );
  }, [dispatch, props, params.userId, state.token, start, end]);

  useEffectOnce(() => {
    if (params.userId === undefined) {
      props.navigate('/');
      return;
    }
    fetchData();
  }, [fetchData]);

  const [selectedTagReport, setSelectedTagReport] = useState();
  const [tagReports, setTagReports] = useState();

  const [lessonReports, setLessonReports] = useState();
  const [selectedLessonReport, setSelectedLessonReport] = useState();

  React.useEffect(() => {
    if (data?.tagsGeneralStats === undefined) return;

    setTagReports(
      data.tagsGeneralStats.map(e => {
        return {
          id: e.tag,
          item: e.tag,
        };
      }),
    );
  }, [data?.tagsGeneralStats]);

  React.useEffect(() => {
    if (data?.stats === undefined) return;

    setLessonReports(
      data.stats.map(e => {
        return {
          id: e.lesson,
          item: e.lesson,
        };
      }),
    );
  }, [data?.stats]);

  return (
    <>
      <CommonWebBox>
        <PhoneView style={{...styles.gap10}}>
          <JustBottomBorderDatePicker
            value={start}
            setter={setStart}
            placeholder={'تاریخ آغاز فیلتر'}
            subText={'تاریخ آغاز فیلتر'}
          />
          <JustBottomBorderDatePicker
            value={end}
            setter={setEnd}
            placeholder={'تاریخ پایان فیلتر'}
            subText={'تاریخ پایان فیلتر'}
          />
        </PhoneView>
        <CommonButton
          title="فیلتر"
          theme={'dark'}
          onPress={() => fetchData()}
        />
      </CommonWebBox>
      <CommonWebBox header={'آمار کلی'}>
        {data !== undefined && (
          <EqualTwoTextInputs>
            <MyView>
              <PhoneView
                style={{
                  gap: 30,
                  padding: 7,
                  backgroundColor: vars.DARK_BLUE,
                }}>
                <SimpleText
                  style={{color: 'white', width: 150, textAlign: 'center'}}
                  text={'تاریخ'}
                />

                <SimpleText
                  style={{color: 'white', width: 150}}
                  text="زمان تعریف شده (دقیقه)"
                />
                <SimpleText
                  style={{color: 'white', width: 150}}
                  text="زمان انجام شده (دقیقه)"
                />
              </PhoneView>
              {data.generalStats.totalStats.map((e, index) => {
                return (
                  <PhoneView
                    style={{
                      gap: 30,
                      padding: 7,
                      backgroundColor:
                        index % 2 == 0 ? 'white' : 'rgb(138 168 160)',
                    }}>
                    <SimpleText
                      style={{
                        color: vars.DARK_BLUE,
                        width: 150,
                        textAlign: 'center',
                      }}
                      text={data.weeks[index]}
                    />

                    <SimpleText
                      style={{
                        color: vars.DARK_BLUE,
                        width: 150,
                        textAlign: 'center',
                      }}
                      text={e}
                    />
                    <SimpleText
                      style={{
                        color: vars.DARK_BLUE,
                        width: 150,
                        textAlign: 'center',
                      }}
                      text={data.generalStats.doneStats[index]}
                    />
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
      <CommonWebBox header={'آمار کلی بر اساس تگ ها'}>
        {tagReports !== undefined && (
          <JustBottomBorderSelect
            isHalf={true}
            values={tagReports}
            setter={setSelectedTagReport}
            value={tagReports.find(e => e.id === selectedTagReport)}
            placeholder={'تگ موردنظر'}
            subText={'تگ موردنظر'}
          />
        )}
      </CommonWebBox>

      {data !== undefined &&
        data.tagsGeneralStats !== undefined &&
        data.tagsGeneralStats.map((e, index) => {
          if (e.tag !== selectedTagReport) return;
          return <Tag weeks={data.weeks} data={e} key={index} />;
        })}

      {data !== undefined &&
        data.additionalTagsGeneralStats !== undefined &&
        data.additionalTagsGeneralStats.map((e, index) => {
          return (
            <Tag
              header={'آمار کلی تعداد تست'}
              isForTest={true}
              weeks={data.weeks}
              data={e}
              key={index}
            />
          );
        })}

      <CommonWebBox header={'آمار بر اساس دروس'}>
        {lessonReports !== undefined && (
          <JustBottomBorderSelect
            isHalf={true}
            values={lessonReports}
            setter={setSelectedLessonReport}
            value={lessonReports.find(e => e.id === selectedLessonReport)}
            placeholder={'درس موردنظر'}
            subText={'درس موردنظر'}
          />
        )}
      </CommonWebBox>

      {data !== undefined &&
        data.stats.map((elem, index) => {
          if (elem.lesson !== selectedLessonReport) return;
          return <Lesson weeks={data.weeks} key={index} data={elem} />;
        })}
    </>
  );
}

export default Progress;
