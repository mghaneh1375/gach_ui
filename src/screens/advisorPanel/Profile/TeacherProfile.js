import {
  faAngleDown,
  faAngleUp,
  faBook,
  faCalendarAlt,
  faRankingStar,
  faSchool,
  faUsers,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {useParams} from 'react-router';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../App';
import QuizItemCard from '../../../components/web/QuizItemCard';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {SimpleFontIcon} from '../../../styles/Common/FontIcon';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import ContentCard from '../../general/Packages/components/Card';
import CommentCard from '../../../components/web/Comment/Card';
import FinancePlan from '../../general/Advisors/FinancePlan';
import Schedule from '../../general/Teachers/Schedule';

function TeacherProfile(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const teacherId = useParams().teacherId;
  const [state, dispatch] = useGlobalState();
  const [teacherPackages, setTeacherPackages] = useState();
  const [adviceOffers, setAdviceOffers] = useState();
  const [comments, setComments] = useState();
  const [teachSchedules, setTeachSchedules] = useState();
  const [info, setInfo] = useState();
  const [pic, setPic] = useState();
  const [showContents, setShowContents] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAdviceOffers, setShowAdviceOffers] = useState(false);
  const [showTeachSchedules, setShowTeachSchedules] = useState(false);

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.getTeacherProfile + teacherId,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) props.navigate('/');
      setInfo(res[0]);
      setPic(res[0].pic);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId]);

  useEffect(() => {
    if (teacherId === undefined) props.navigate('/');
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId]);

  return (
    <>
      <CommonWebBox
        width={
          state.isInPhone || props.digest === undefined || !props.digest
            ? '100%'
            : 400
        }>
        {info && (
          <>
            <EqualTwoTextInputs
              style={{
                ...styles.justifyContentCenter,
                ...styles.paddingRight15,
                backgroundColor: vars.YELLOW_WHITE,
                borderRadius: 5,
                height: 40,
                marginRight: 0,
              }}>
              <SimpleText
                style={{
                  ...styles.BlueBold,
                  ...styles.fontSize15,
                  ...styles.alignSelfCenter,
                }}
                text={info.name}
              />
            </EqualTwoTextInputs>

            <PhoneView
              style={state.isInPhone ? {...styles.gap15} : {...styles.gap100}}>
              <PhoneView
                style={{
                  maxWidth: state.isInPhone ? '100%' : '520px',
                  minWidth: state.isInPhone ? '100%' : '520px',
                  flexDirection: state.isInPhone ? 'column' : 'row',
                }}>
                <MyView
                  style={{
                    border: state.isInPhone ? 'unset' : '4px solid',
                    borderColor: vars.ORANGE,
                    borderRadius: 7,
                    width: state.isInPhone ? 100 : 148,
                    height: state.isInPhone ? 100 : 148,
                    marginTop: state.isInPhone ? 0 : 20,
                  }}>
                  <Image
                    style={{
                      width: state.isInPhone ? 90 : 140,
                      height: state.isInPhone ? 90 : 140,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    source={pic}
                  />
                </MyView>

                <MyView
                  style={{
                    paddingRight: 20,
                    ...styles.gap15,
                    ...styles.marginTop20,
                  }}>
                  <MyView style={{marginTop: -10, ...styles.gap5}}>
                    {info.age !== undefined && (
                      <QuizItemCard
                        maxWidth={350}
                        text={'سن'}
                        val={info.age + ' سال'}
                        icon={faCalendarAlt}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={true}
                        isBoldValue={false}
                      />
                    )}
                    {info.form !== undefined && (
                      <>
                        <QuizItemCard
                          maxWidth={350}
                          text={'مدارس همکار'}
                          val={info.form.workSchools}
                          icon={faSchool}
                          background={false}
                          iconFontSize={'normal'}
                          color={vars.YELLOW}
                          textFontSize={14}
                          valFontSize={14}
                          isBold={true}
                          isBoldValue={false}
                        />
                      </>
                    )}
                    {info.branches && (
                      <QuizItemCard
                        maxWidth={350}
                        text={'رشته‌های تخصصی'}
                        val={info.branches}
                        icon={faBook}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={true}
                        isBoldValue={false}
                      />
                    )}
                    {info.grades && (
                      <QuizItemCard
                        maxWidth={350}
                        text={'مقاطع تخصصی'}
                        val={info.grades.map(e => e + ' ')}
                        icon={faBook}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={true}
                        isBoldValue={false}
                      />
                    )}
                    {info.lessons && (
                      <QuizItemCard
                        maxWidth={350}
                        text={'دروس تخصصی'}
                        val={info.lessons.map(e => e + ' ')}
                        icon={faBook}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={true}
                        isBoldValue={false}
                      />
                    )}
                    {info.teaches > 0 && (
                      <QuizItemCard
                        maxWidth={350}
                        text={'تعداد تدریس\u200Cهای انجام شده در سایت'}
                        val={info.teaches}
                        icon={faBook}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={true}
                        isBoldValue={false}
                      />
                    )}
                    {info.totalTeachStudents > 0 && (
                      <QuizItemCard
                        maxWidth={350}
                        text={'تعداد دانش آموزان در تدریس\u200cها'}
                        val={info.totalTeachStudents}
                        icon={faBook}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={true}
                        isBoldValue={false}
                      />
                    )}
                    {info.teachRate !== undefined && info.teachRate > 0 && (
                      <QuizItemCard
                        maxWidth={350}
                        text={'امتیاز تدریس'}
                        val={info.teachRate}
                        icon={faRankingStar}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={true}
                        isBoldValue={false}
                      />
                    )}
                    {info.totalCurrentAdviceStudents > 0 && (
                      <QuizItemCard
                        maxWidth={350}
                        text={'تعداد دانش آموزان جاری برای مشاوره'}
                        val={info.totalCurrentAdviceStudents}
                        icon={faUsers}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={true}
                        isBoldValue={false}
                      />
                    )}
                    {info.totalAdviceStudents > 0 && (
                      <QuizItemCard
                        maxWidth={350}
                        text={'تعداد کل دانش آموزان برای مشاوره'}
                        val={info.totalAdviceStudents}
                        icon={faUsers}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={true}
                        isBoldValue={false}
                      />
                    )}
                    {info.quizCount > 0 && (
                      <QuizItemCard
                        maxWidth={350}
                        text={'تعداد آزمون\u200cهای تعریف شده'}
                        val={info.quizCount}
                        icon={faUsers}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={true}
                        isBoldValue={false}
                      />
                    )}
                    {info.adviceRate !== undefined && info.adviceRate > 0 && (
                      <QuizItemCard
                        maxWidth={350}
                        text={'امتیاز مشاوره'}
                        val={info.adviceRate}
                        icon={faRankingStar}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={true}
                        isBoldValue={false}
                      />
                    )}
                    {info.totalContents > 0 && (
                      <QuizItemCard
                        maxWidth={350}
                        text={'تعداد بسته\u200cهای آموزشی دبیر'}
                        val={info.totalContents}
                        icon={faVideo}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={true}
                        isBoldValue={false}
                      />
                    )}
                    {info.totalContentUsers > 0 && (
                      <QuizItemCard
                        maxWidth={350}
                        text={'تعداد خریداران بسته\u200cهای آموزشی دبیر'}
                        val={info.totalContentUsers}
                        icon={faUsers}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={true}
                        isBoldValue={false}
                      />
                    )}
                  </MyView>
                </MyView>
              </PhoneView>

              {(props.digest === undefined || !props.digest) && (
                <MyView
                  style={{
                    ...{
                      minHeight: 100,
                      maxHeight: 220,
                      justifyContent: 'space-between',
                      maxWidth: state.isInPhone
                        ? 'calc(100% - 30px)'
                        : 'calc(100% - 630px)',
                    },
                  }}>
                  <MyView>
                    <SimpleText
                      style={{
                        ...styles.BlueBold,
                      }}
                      text={'درباره دبیر'}
                    />
                    {info.bio !== undefined && (
                      <SimpleText
                        style={{
                          ...styles.colorDarkBlue,
                          ...styles.marginTop10,
                        }}
                        text={info.bio}
                      />
                    )}
                  </MyView>
                  {info.teachVideoLink !== undefined &&
                    info.teachVideoLink !== '' && (
                      <MyView>
                        <a
                          style={{fontFamily: 'IRANSans'}}
                          target="_blank"
                          href={info.teachVideoLink}>
                          معرفی ویدیویی برای تدریس
                        </a>
                      </MyView>
                    )}
                  {info.adviceVideoLink !== undefined &&
                    info.adviceVideoLink !== '' && (
                      <MyView>
                        <a
                          style={{fontFamily: 'IRANSans'}}
                          target="_blank"
                          href={info.adviceVideoLink}>
                          معرفی ویدیویی برای مشاور
                        </a>
                      </MyView>
                    )}
                </MyView>
              )}
            </PhoneView>

            {info.tags && info.tags.length > 0 && (
              <>
                <SimpleText
                  style={{...styles.dark_blue_color, ...styles.marginTop10}}
                  text={'تگ\u200cها'}
                />
                <PhoneView style={{...styles.gap10, ...{marginTop: -10}}}>
                  {info.tags.map((e, index) => {
                    return (
                      <SimpleText
                        key={index}
                        style={{...styles.colorDarkBlue}}
                        text={'#' + e}
                      />
                    );
                  })}
                </PhoneView>
              </>
            )}
          </>
        )}
      </CommonWebBox>
      {info && info.totalContents > 0 && (
        <CommonWebBox
          btn={
            <SimpleFontIcon
              onPress={async () => {
                if (showContents) {
                  setShowContents(false);
                  return;
                }
                if (teacherPackages === undefined) {
                  dispatch({loading: true});
                  const res = await generalRequest(
                    routes.getTeacherContents + teacherId,
                    'get',
                    undefined,
                    'data',
                    state.token,
                  );
                  dispatch({loading: false});
                  if (res !== null) setTeacherPackages(res);
                }
                setShowContents(true);
              }}
              kind={'normal'}
              icon={showContents ? faAngleDown : faAngleUp}
            />
          }
          header={'معرفی بسته\u200cهای آموزشی'}>
          {showContents && (
            <PhoneView style={{...styles.gap10}}>
              {teacherPackages &&
                teacherPackages.map((elem, index) => {
                  return (
                    <ContentCard
                      isInMyMode={false}
                      isInPhone={state.isInPhone}
                      key={index}
                      package={elem}
                      navigate={props.navigate}
                    />
                  );
                })}
            </PhoneView>
          )}
        </CommonWebBox>
      )}
      {info && info.totalComments > 0 && (
        <CommonWebBox
          btn={
            <SimpleFontIcon
              onPress={async () => {
                if (showComments) {
                  setShowComments(false);
                  return;
                }
                if (comments === undefined) {
                  dispatch({loading: true});
                  const res = await generalRequest(
                    routes.getTeacherMarkedComments + teacherId,
                    'get',
                    undefined,
                    'data',
                    state.token,
                  );
                  dispatch({loading: false});
                  if (res === null) return;
                  setComments(res);
                }
                setShowComments(true);
              }}
              kind={'normal'}
              icon={showComments ? faAngleDown : faAngleUp}
            />
          }
          header={'نظرات منتخب'}>
          {showComments && (
            <PhoneView style={{...styles.gap10}}>
              {comments &&
                comments.map((elem, index) => {
                  return (
                    <MyView
                      style={{...styles.alignItemsCenter, ...styles.gap10}}>
                      <SimpleText
                        style={{...styles.BlueBold}}
                        text={elem.ref}
                      />
                      <CommentCard comment={elem} key={index} />
                    </MyView>
                  );
                })}
            </PhoneView>
          )}
        </CommonWebBox>
      )}
      {info && info.quizCount !== undefined && (
        <CommonWebBox
          btn={
            <SimpleFontIcon
              onPress={async () => {
                if (showAdviceOffers) {
                  setShowAdviceOffers(false);
                  return;
                }
                if (adviceOffers === undefined) {
                  dispatch({loading: true});
                  const res = await generalRequest(
                    routes.getMyFinancePlans + teacherId,
                    'get',
                    undefined,
                    'data',
                    state.token,
                  );
                  dispatch({loading: false});
                  if (res === null) return;
                  setAdviceOffers(res.data);
                }
                setShowAdviceOffers(true);
              }}
              kind={'normal'}
              icon={showAdviceOffers ? faAngleDown : faAngleUp}
            />
          }
          header={'برنامه\u200cهای مشاوره'}>
          {showAdviceOffers && (
            <PhoneView style={{...styles.gap10}}>
              {adviceOffers &&
                adviceOffers.map((elem, index) => {
                  return (
                    <FinancePlan
                      isInPhone={state.isInPhone}
                      key={index}
                      plan={elem}
                    />
                  );
                })}
            </PhoneView>
          )}
        </CommonWebBox>
      )}
      {info?.hasAvailableTeachSchedule && (
        <CommonWebBox
          btn={
            <SimpleFontIcon
              onPress={async () => {
                if (showTeachSchedules) {
                  setShowTeachSchedules(false);
                  return;
                }
                if (teachSchedules === undefined) {
                  dispatch({loading: true});
                  const res = await generalRequest(
                    routes.getTeacherSchedules + teacherId,
                    'get',
                    undefined,
                    'data',
                    state.token,
                  );
                  dispatch({loading: false});
                  if (res === null) return;
                  setTeachSchedules(res);
                }
                setShowTeachSchedules(true);
              }}
              kind={'normal'}
              icon={showTeachSchedules ? faAngleDown : faAngleUp}
            />
          }
          header={'برنامه\u200cهای تدریس'}>
          {showTeachSchedules && (
            <PhoneView style={{...styles.gap10}}>
              {teachSchedules &&
                teachSchedules.map((elem, index) => {
                  return (
                    <Schedule
                      isInPhone={state.isInPhone}
                      key={index}
                      plan={elem}
                    />
                  );
                })}
            </PhoneView>
          )}
        </CommonWebBox>
      )}
    </>
  );
}

export default TeacherProfile;
