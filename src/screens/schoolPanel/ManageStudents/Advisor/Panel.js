import React, {useState} from 'react';
import {
  advicePanelContext,
  dispatchAdvicePanelContext,
} from './components/Context';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import MiniCard from '../../../panel/quiz/components/CV/MiniCard';
import commonTranslator from '../../../../translator/Common';
import Card from '../../../general/Advisors/Card';
import {styles} from '../../../../styles/Common/Styles';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {showSuccess} from '../../../../services/Utility';
import {LargePopUp} from '../../../../styles/Common/PopUp';

function Panel(props) {
  const useGlobalState = () => [
    React.useContext(advicePanelContext),
    React.useContext(dispatchAdvicePanelContext),
  ];

  const [data, setData] = useState();
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [url, setUrl] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      generalRequest(
        routes.getMyCurrentRoomForAdvisorForSpecificStudent +
          props.wantedUserId,
        'get',
        undefined,
        'url',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null || res[1] == null) {
        props.setMode('list');
        return;
      }

      state.fetchedInfos.push({userId: props.wantedUserId, data: res[0]});
      dispatch({fetchedInfos: state.fetchedInfos});
      setData(res[0]);
      setUrl(res[1] === '' ? undefined : res[1]);
      setIsWorking(false);
    });
  }, [dispatch, state, props, isWorking, data]);

  React.useEffect(() => {
    fetchData();
  }, [props.wantedUserId, fetchData]);

  return (
    <CommonWebBox
      header={'پنل مشاوره '}
      onBackClick={() => props.setMode('list')}
      backBtn={true}>
      {showConfirmation && (
        <LargePopUp
          toggleShowPopUp={() => setShowConfirmation(false)}
          title={'ایجاد اتاق جلسه'}
          btns={
            <CommonButton
              theme={'dark'}
              title={commonTranslator.confirm}
              onPress={async () => {
                props.setLoading(true);
                let res = await generalRequest(
                  routes.requestMeeting + props.wantedUserId,
                  'post',
                  undefined,
                  'url',
                  props.token,
                );
                props.setLoading(false);
                if (res != null) {
                  showSuccess();
                  setUrl(res);
                }
              }}
            />
          }>
          <SimpleText
            text={
              'آیا از ساخت اتاق جلسه اطمینان دارید؟ (پس از ساخت اتاق دیگر امکان حذف آن وجود ندارد)'
            }
          />
        </LargePopUp>
      )}
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
            <SimpleText
              onPress={() =>
                window.open('/studentSchedules/' + props.wantedUserId)
              }
              style={{...styles.red, ...styles.cursor_pointer}}
              text={'مشاهده کاربرگ ها'}
            />
            <SimpleText
              onPress={() =>
                window.open('/studentProgress/' + props.wantedUserId)
              }
              style={{...styles.red, ...styles.cursor_pointer}}
              text={'مشاهده پیشرفت'}
            />
            <SimpleText
              style={{...styles.red, ...styles.cursor_pointer}}
              onPress={() =>
                window.open(
                  '/ticket?section=advisor&userId=' + props.wantedUserId,
                )
              }
              text={'رفتن به چت روم'}
            />

            {url === undefined && (
              <SimpleText
                style={{...styles.red, ...styles.cursor_pointer}}
                onPress={() => setShowConfirmation(true)}
                text={'ایجاد اتاق جلسه'}
              />
            )}

            {url !== undefined && (
              <CommonButton
                onPress={() => window.open(url)}
                title={'رفتن به جلسه'}
                theme={'dark'}
              />
            )}
          </MyView>
        )}

        {data !== undefined && data.advisors !== undefined && (
          <MyView>
            <SimpleText
              text={commonTranslator.advisors}
              style={{...styles.BlueBold}}
            />
            <PhoneView>
              {data.advisors.map((e, index) => {
                return <Card hasOpenRequest={true} data={e} key={index} />;
              })}
            </PhoneView>
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