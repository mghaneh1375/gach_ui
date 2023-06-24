import React, {useState} from 'react';
import {
  advicePanelContext,
  dispatchAdvicePanelContext,
} from './components/Context';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  SimpleText,
} from '../../../../styles/Common';
import MiniCard from '../../../panel/quiz/components/CV/MiniCard';
import commonTranslator from '../../../../translator/Common';
import Card from '../../../general/Advisors/Card';
import {styles} from '../../../../styles/Common/Styles';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';

function Panel(props) {
  const useGlobalState = () => [
    React.useContext(advicePanelContext),
    React.useContext(dispatchAdvicePanelContext),
  ];

  const [data, setData] = useState();
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);

  const fetchData = React.useCallback(() => {
    if (data !== undefined || isWorking) return;

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      generalRequest(
        routes.getStudentDigestForAdvisor + props.wantedUserId,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) {
        props.setMode('list');
        return;
      }

      state.fetchedInfos.push({userId: props.wantedUserId, data: res[0]});
      dispatch({fetchedInfos: state.fetchedInfos});
      setData(res[0]);
      setIsWorking(false);
    });
  }, [dispatch, state, props, isWorking, data]);

  React.useEffect(() => {
    fetchData();
  }, [props.wantedUserId, fetchData]);

  return (
    <CommonWebBox>
      <EqualTwoTextInputs>
        {data !== undefined && (
          <MyView>
            <MiniCard
              styleCard100Percent={false}
              subTexts={[
                {label: 'نام مدرسه: ', value: data.school},
                {label: 'نام شهر: ', value: data.city},
                {label: 'پایه تحصیلی: ', value: data.grade},
                {label: 'رشته: ', value: data.branches},
              ]}
              header={data.name}
              ops={false}
              src={data.pic}
            />
            <SimpleText
              onPress={() =>
                window.open('/studentLifeStyle/' + props.wantedUserId)
              }
              style={{...styles.red, ...styles.cursor_pointer}}
              text={'مشاهده برنامه روزانه دانش آموز'}
            />
            <SimpleText text={'رفتن به چت روم'} />
          </MyView>
        )}

        {data !== undefined && data.advisor !== undefined && (
          <MyView>
            <SimpleText
              text={commonTranslator.advisor}
              style={{...styles.BlueBold}}
            />
            <Card hasOpenRequest={true} data={data.advisor} />
          </MyView>
        )}
      </EqualTwoTextInputs>
      {data !== undefined && (
        <>
          <SimpleText text={'آمار کلی'} />
          <SimpleText
            text={
              'تعداد کاربرگ های تعریف شده در ماه جاری: ' +
              data.schedulesInCurrMonth
            }
          />
          <SimpleText
            text={
              'تعداد کاربرگ های تعریف شده در ماه قبلی: ' +
              data.schedulesInLastMonth
            }
          />

          <SimpleText
            text={
              'تعداد آزمون های تعریف شده در ماه جاری: ' + data.quizzesInMonth
            }
          />

          <SimpleText
            text={
              'تعداد آزمون های تعریف شده در ماه قبلی: ' +
              data.quizzesInLastMonth
            }
          />

          <SimpleText
            text={
              'تعداد جلسات آنلاین در ماه جاری: ' + data.advisorMeetingsInMonth
            }
          />

          <SimpleText
            text={
              'تعداد جلسات آنلاین در ماه قبلی: ' +
              data.advisorMeetingsInLastMonth
            }
          />
        </>
      )}
      {data !== undefined && data.maxKarbarg !== undefined && (
        <>
          <SimpleText text={'تعهدات'} />
          <SimpleText text={'عنوان پلن مالی: ' + data.planTitle} />
          <SimpleText text={'تعداد کاربرگ ' + data.maxKarbarg} />
          <SimpleText text={'تعداد آزمون ' + data.maxExam} />
          <SimpleText text={'تعداد چت ' + data.maxChats} />
          <SimpleText text={'تعداد جلسات آنلاین ' + data.maxVideoCalls} />
        </>
      )}
    </CommonWebBox>
  );
}

export default Panel;
