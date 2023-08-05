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
import commonTranslator from '../../../../translator/Common';
import Card from '../../../general/Advisors/Card';
import {styles} from '../../../../styles/Common/Styles';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {showSuccess} from '../../../../services/Utility';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import {Image} from 'react-native';
import vars from '../../../../styles/root';
import translator from '../../../../screens/advisorPanel/MyFinancePlans/components/Translator';
import QuizItemCard from '../../../../components/web/QuizItemCard';
import {
  faClockRotateLeft,
  faNewspaper,
  faPaperPlane,
  faQuestion,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import DashboardCard from '../../../studentPanel/dashboard/DashboardCard/DashboardCard';

function Panel(props) {
  const useGlobalState = () => [
    React.useContext(advicePanelContext),
    React.useContext(dispatchAdvicePanelContext),
  ];

  const [data, setData] = useState();
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [url, setUrl] = useState();
  const [src, setSrc] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);

  React.useEffect(() => {
    setSrc(data?.pic);
  }, [data?.pic]);

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
    <>
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
      <CommonWebBox
        header={'پنل مشاوره '}
        onBackClick={() => props.setMode('list')}
        backBtn={true}
      />
      <CommonWebBox>
        <EqualTwoTextInputs>
          {data !== undefined && (
            <PhoneView style={{...styles.gap10}}>
              <MyView>
                <SimpleText
                  style={{...styles.BlueBold, ...styles.textCenter}}
                  text={data.name}
                />
                {src !== undefined && (
                  <Image
                    style={{
                      width: 100,
                      height: 140,
                      borderColor: vars.ORANGE_RED,
                      borderRadius: 2,
                      borderWidth: 4,
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    source={src}
                  />
                )}
              </MyView>

              <MyView style={{...styles.justifyContentCenter}}>
                <SimpleText
                  style={{...styles.dark_blue_color}}
                  text={'رشته: ' + data.branches}
                />
                <SimpleText
                  style={{...styles.dark_blue_color}}
                  text={'پایه تحصیلی: ' + data.grade}
                />
                <SimpleText
                  style={{...styles.dark_blue_color}}
                  text={'نام مدرسه: ' + data.school}
                />
                <SimpleText
                  style={{...styles.dark_blue_color}}
                  text={'نام شهر: ' + data.city}
                />
              </MyView>
            </PhoneView>
          )}

          <MyView
            style={
              props.isInPhone ? {width: '100%', alignItems: 'center'} : {}
            }>
            <CommonButton
              style={
                props.isInPhone
                  ? {minWidth: 290, justifyContent: 'center'}
                  : {minWidth: 260}
              }
              parentStyle={
                props.isInPhone ? {alignSelf: 'center !important'} : {}
              }
              onPress={() =>
                window.open('/studentLifeStyle/' + props.wantedUserId)
              }
              title={'مشاهده برنامه روزانه دانش آموز'}
            />
            <PhoneView>
              <CommonButton
                padding={props.isInPhone ? '5px' : '5px 15px'}
                style={
                  props.isInPhone
                    ? {minWidth: 140, marginRight: 3, marginLeft: 3}
                    : {minWidth: 120}
                }
                onPress={() =>
                  window.open('/studentSchedules/' + props.wantedUserId)
                }
                theme={'orangeRed'}
                title={'رویت کاربرگ ها'}
              />
              <CommonButton
                padding={props.isInPhone ? '5px' : '5px 15px'}
                style={
                  props.isInPhone
                    ? {minWidth: 140, marginRight: 3, marginLeft: 3}
                    : {minWidth: 120}
                }
                onPress={() =>
                  window.open('/studentProgress/' + props.wantedUserId)
                }
                theme={'dark'}
                title={'نمودار پیشرفت'}
              />
            </PhoneView>

            <PhoneView>
              <CommonButton
                padding={props.isInPhone ? '5px' : '5px 15px'}
                style={
                  props.isInPhone
                    ? {minWidth: 140, marginRight: 3, marginLeft: 3}
                    : {minWidth: 120}
                }
                onPress={() =>
                  window.open(
                    '/ticket?section=advisor&userId=' + props.wantedUserId,
                  )
                }
                title={'رفتن به چت روم'}
              />

              {url === undefined && (
                <CommonButton
                  padding={props.isInPhone ? '5px' : '5px 15px'}
                  style={
                    props.isInPhone
                      ? {minWidth: 140, marginRight: 3, marginLeft: 3}
                      : {minWidth: 120}
                  }
                  onPress={() => setShowConfirmation(true)}
                  title={'ایجاد اتاق جلسه'}
                />
              )}

              {url !== undefined && (
                <CommonButton
                  padding={props.isInPhone ? '5px' : '5px 15px'}
                  style={
                    props.isInPhone
                      ? {minWidth: 140, marginRight: 3, marginLeft: 3}
                      : {minWidth: 120}
                  }
                  onPress={() => window.open(url)}
                  title={'رفتن به جلسه'}
                  theme={'dark'}
                />
              )}
            </PhoneView>
          </MyView>
        </EqualTwoTextInputs>
      </CommonWebBox>
      <CommonWebBox header={'تعهدات'}>
        {data !== undefined && data.maxKarbarg !== undefined && (
          <SimpleText text={data.planTitle} style={{...styles.BlueBold}} />
        )}
        <PhoneView style={{...styles.gap15}}>
          {data !== undefined && data.maxKarbarg !== undefined && (
            <>
              <QuizItemCard
                text={translator.maxKarbarg}
                val={data.maxKarbarg === -1 ? 'نامحدود' : data.maxKarbarg}
                icon={faNewspaper}
                background={false}
                iconFontSize={'normal'}
                color={vars.YELLOW}
                textFontSize={14}
                valFontSize={14}
                isBold={false}
              />

              <QuizItemCard
                text={translator.maxVideoCalls}
                val={data.maxVideoCalls}
                icon={faVideo}
                background={false}
                iconFontSize={'normal'}
                color={vars.YELLOW}
                textFontSize={14}
                valFontSize={14}
                isBold={false}
              />

              <QuizItemCard
                text={translator.maxChat}
                val={data.maxChats === -1 ? 'نامحدود' : data.maxChats}
                icon={faPaperPlane}
                background={false}
                iconFontSize={'normal'}
                color={vars.YELLOW}
                textFontSize={14}
                valFontSize={14}
                isBold={false}
              />

              <QuizItemCard
                text={translator.maxExam}
                val={data.maxExam === -1 ? 'نامحدود' : data.maxExam}
                icon={faQuestion}
                background={false}
                iconFontSize={'normal'}
                color={vars.YELLOW}
                textFontSize={14}
                valFontSize={14}
                isBold={false}
              />

              <QuizItemCard
                text={translator.startEnd}
                val={data.createdAt + ' تا ' + data.finishAt}
                icon={faClockRotateLeft}
                background={false}
                iconFontSize={'normal'}
                color={vars.YELLOW}
                textFontSize={14}
                valFontSize={14}
                isBold={false}
              />
            </>
          )}
        </PhoneView>
      </CommonWebBox>
      <CommonWebBox header={'آمار کلی'}>
        {data !== undefined && (
          <PhoneView>
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={'تعداد کاربرگ ها در ماه جاری'}
              fontSize={16}
              theme={vars.ORANGE_RED}
              subtext={data.schedulesInCurrMonth}
              borderRight={true}
              borderRightWidth={18}
              multiline={true}
            />

            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={'تعداد کاربرگ ها در ماه قبل'}
              fontSize={17}
              theme={vars.ORANGE_RED}
              subtext={data.schedulesInCurrMonth}
              borderRight={true}
              borderRightWidth={18}
              multiline={true}
            />

            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={'تعداد آزمون ها در ماه جاری'}
              fontSize={17}
              theme={vars.DARK_BLUE}
              subtext={data.quizzesInMonth}
              borderRight={true}
              borderRightWidth={18}
              multiline={true}
            />

            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={'تعداد آزمون ها در ماه قبلی'}
              fontSize={17}
              theme={vars.DARK_BLUE}
              subtext={data.quizzesInLastMonth}
              borderRight={true}
              borderRightWidth={18}
              multiline={true}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={'تعداد جلسات آنلاین در ماه جاری'}
              fontSize={17}
              theme={vars.YELLOW}
              subtext={data.advisorMeetingsInMonth}
              borderRight={true}
              borderRightWidth={18}
              multiline={true}
            />

            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={'تعداد جلسات آنلاین در ماه قبلی'}
              fontSize={17}
              theme={vars.YELLOW}
              subtext={data.advisorMeetingsInLastMonth}
              borderRight={true}
              borderRightWidth={18}
              multiline={true}
            />
          </PhoneView>
        )}
      </CommonWebBox>
      <CommonWebBox header={'اطلاعات مشاوران'}>
        {data !== undefined && data.advisors !== undefined && (
          <PhoneView>
            {data.advisors.map((e, index) => {
              return (
                <Card
                  digest={true}
                  hasOpenRequest={true}
                  data={e}
                  key={index}
                />
              );
            })}
          </PhoneView>
        )}
      </CommonWebBox>
    </>
  );
}

export default Panel;
