import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility.js';
import translator from '@/screens/advisorPanel/myFinancePlans/components/translator';
import {showSuccess} from '@/services/utility.js';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '@/styles';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import {styles} from '@/styles/common/styles';
import vars from '@/styles/root';
import commonTranslator from '@/translator/common.js';
import {
  faClockRotateLeft,
  faNewspaper,
  faPaperPlane,
  faQuestion,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {Image} from 'react-native';
import QuizItemCard from '../../../../components/web/QuizItemCard.jsx';
import Card from '../../../general/advisors/Card.jsx';
import DashboardCard from '../../../studentPanel/dashboard/dashboardCard/DashboardCard.jsx';
import {
  advicePanelContext,
  dispatchAdvicePanelContext,
} from './components/Context.jsx';
import Report from './components/Report.jsx';
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
  const [showReportPane, setShowReportPane] = useState(false);

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
      state.fetchedInfos.push({
        userId: props.wantedUserId,
        data: res[0],
      });
      dispatch({
        fetchedInfos: state.fetchedInfos,
      });
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
                const res = await generalRequest(
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
                  setShowConfirmation(false);
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
            <PhoneView
              style={{
                ...styles.gap10,
              }}>
              <MyView>
                <SimpleText
                  style={{
                    ...styles.BlueBold,
                    ...styles.textCenter,
                  }}
                  text={data.name}
                />
                {src !== undefined && (
                  <Image
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    source={src}
                  />
                )}
              </MyView>

              <MyView
                style={{
                  ...styles.justifyContentCenter,
                }}>
                <SimpleText
                  style={{
                    ...styles.colorDarkBlue,
                  }}
                  text={'رشته: ' + data.branches}
                />
                <SimpleText
                  style={{
                    ...styles.colorDarkBlue,
                  }}
                  text={'پایه تحصیلی: ' + data.grade}
                />
                <SimpleText
                  style={{
                    ...styles.colorDarkBlue,
                  }}
                  text={'نام مدرسه: ' + data.school}
                />
                <SimpleText
                  style={{
                    ...styles.colorDarkBlue,
                  }}
                  text={'نام شهر: ' + data.city}
                />
              </MyView>
            </PhoneView>
          )}

          <MyView
            style={
              props.isInPhone
                ? {
                    width: '100%',
                    alignItems: 'center',
                  }
                : {}
            }>
            <PhoneView>
              <CommonButton
                padding={props.isInPhone ? '5px' : '5px 15px'}
                style={
                  props.isInPhone
                    ? {
                        minWidth: 140,
                        marginRight: 3,
                        marginLeft: 3,
                      }
                    : {
                        minWidth: 120,
                      }
                }
                onPress={() =>
                  window.open('/studentSchedules/' + props.wantedUserId)
                }
                theme={'cream'}
                title={'رویت کاربرگ\u200cها'}
              />
              <CommonButton
                padding={props.isInPhone ? '5px' : '5px 15px'}
                onPress={() =>
                  window.open('/studentLifeStyle/' + props.wantedUserId)
                }
                title={'مشاهده برنامه روزانه دانش آموز'}
              />
            </PhoneView>

            <PhoneView>
              <CommonButton
                padding={props.isInPhone ? '5px' : '5px 15px'}
                style={
                  props.isInPhone
                    ? {
                        minWidth: 140,
                        marginRight: 3,
                        marginLeft: 3,
                      }
                    : {
                        minWidth: 120,
                      }
                }
                onPress={() =>
                  window.open('/studentProgress/' + props.wantedUserId)
                }
                theme={'dark'}
                title={'نمودار پیشرفت'}
              />
              <CommonButton
                padding={props.isInPhone ? '5px' : '5px 15px'}
                theme={'green'}
                style={
                  props.isInPhone
                    ? {
                        minWidth: 210,
                        marginRight: 3,
                        marginLeft: 3,
                      }
                    : {
                        minWidth: 210,
                      }
                }
                onPress={() =>
                  window.open(
                    '/ticket?section=advisor&userId=' + props.wantedUserId,
                  )
                }
                title={'رفتن به چت روم'}
              />
            </PhoneView>

            <PhoneView>
              {url === undefined && (
                <CommonButton
                  padding={props.isInPhone ? '5px' : '5px 15px'}
                  style={
                    props.isInPhone
                      ? {
                          minWidth: 140,
                          marginRight: 3,
                          marginLeft: 3,
                        }
                      : {
                          minWidth: 120,
                        }
                  }
                  onPress={() => setShowConfirmation(true)}
                  title={'ایجاد اتاق جلسه'}
                />
              )}

              <CommonButton
                padding={props.isInPhone ? '5px' : '5px 15px'}
                theme={'orangeRed'}
                style={
                  props.isInPhone
                    ? {
                        minWidth: 210,
                        marginRight: 3,
                        marginLeft: 3,
                      }
                    : {
                        minWidth: 210,
                      }
                }
                onPress={() => setShowReportPane(true)}
                title={'گزارش مشکل'}
              />

              {url && (
                <CommonButton
                  padding={props.isInPhone ? '5px' : '5px 15px'}
                  style={
                    props.isInPhone
                      ? {
                          minWidth: 140,
                          marginRight: 3,
                          marginLeft: 3,
                        }
                      : {
                          minWidth: 120,
                        }
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
      {showReportPane && (
        <Report
          showReportPane={showReportPane}
          onClose={() => setShowReportPane(false)}
          token={props.token}
          setLoading={props.setLoading}
          studentId={props.wantedUserId}
        />
      )}
      <CommonWebBox header={'تعهدات'}>
        {data !== undefined && data.maxKarbarg !== undefined && (
          <SimpleText
            text={data.planTitle}
            style={{
              ...styles.BlueBold,
            }}
          />
        )}
        <PhoneView
          style={{
            ...styles.gap15,
          }}>
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
              text={'تعداد کاربرگ\u200cها در ماه جاری'}
              fontSize={16}
              theme={vars.ORANGE_RED}
              subtext={data.schedulesInCurrMonth}
              borderRight={true}
              borderRightWidth={18}
              multiline={true}
            />

            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={'تعداد کاربرگ\u200cها در ماه قبل'}
              fontSize={17}
              theme={vars.ORANGE_RED}
              subtext={data.schedulesInLastMonth}
              borderRight={true}
              borderRightWidth={18}
              multiline={true}
            />

            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={'تعداد آزمون‌ها در ماه جاری'}
              fontSize={17}
              theme={vars.DARK_BLUE}
              subtext={data.quizzesInMonth}
              borderRight={true}
              borderRightWidth={18}
              multiline={true}
            />

            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={'تعداد آزمون‌ها در ماه قبلی'}
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
