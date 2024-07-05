import React, {useState, lazy, Suspense} from 'react';

import {
  MinFullHeightView,
  LargeContentConianerStyle,
  PhoneContentConianerStyle,
  MyView,
  PhoneContentConianerStyle2,
} from '../styles/Common';
import {useNavigate, useParams} from 'react-router-dom';
import Home from './general/home/Home';
const Login = lazy(() => import('./general/login/Login'));
const WebLogin = lazy(() => import('./general/login/web/Login'));
const WebProfile = lazy(() => import('./general/profile/web/Profile'));
import {isUserEditorAccess} from '../services/Utility';

import 'react-notifications-component/dist/theme.css';
import {ReactNotifications} from 'react-notifications-component';

import {globalStateContext, dispatchStateContext} from '../App';
import Logo from '../components/web/LargeScreen/Header/Logo';
import Header from '../components/web/LargeScreen/Header/Header';
import Menu from '../components/web/LargeScreen/Header/Menu';
import Navbar from '../components/web/Navbar';
import BottomNavBar from '../components/web/BottomNavBar';
const Quiz = lazy(() => import('./panel/quiz/Quiz'));
const Course = lazy(() => import('./panel/consultants/Course'));
const LifeStyle = lazy(() => import('./panel/consultants/LifeStyle'));
const Question = lazy(() => import('./panel/question/Question'));
const Off = lazy(() => import('./panel/offcode/Off'));
const Users = lazy(() => import('./panel/users/Users'));
const Avatar = lazy(() => import('./panel/Config/Avatars/Avatar'));
const PageNotFound = lazy(() => import('./general/404/PageNotFound'));
const General = lazy(() => import('./panel/Config/Configuration/General'));
const CertConf = lazy(() => import('./panel/Config/Configuration/Certificate'));
const Ravan = lazy(() => import('./panel/Config/Configuration/Ravan'));
const Schools = lazy(() => import('./panel/Config/Schools/Schools'));
const Grade = lazy(() => import('./panel/Basic/grade/Grade'));
const Lesson = lazy(() => import('./panel/Basic/lesson/Lesson'));
const Package = lazy(() => import('./panel/package/Package'));
const Subject = lazy(() => import('./panel/Basic/subject/Subject'));
const Certificate = lazy(() => import('./panel/certificate/Certificate'));
const Ticket = lazy(() => import('./panel/ticket/Ticket'));
const Dashboard = lazy(() => import('./studentPanel/dashboard/Dashboard'));
const Ticketstd = lazy(() => import('./studentPanel/Ticket/Ticket'));
const Author = lazy(() => import('./panel/users/Author/Author'));
const SpinGift = lazy(() => import('./panel/spinGift/SpinGift'));
const Psychology = lazy(() => import('./panel/Psychology/Psychology'));
const SelectGift = lazy(() =>
  import('./panel/spinGift/components/SelectGift/SelectGift'),
);
const Upgrade = lazy(() => import('./studentPanel/Upgrade/Upgrade'));
const ConfigGift = lazy(() =>
  import('./panel/spinGift/components/configGift/configGift'),
);
const SchoolUsers = lazy(() => import('./agentPanel/schools/schools'));
const AcceptInvite = lazy(() => import('./SinglePages/AcceptInvite'));
const Teachers = lazy(() => import('./teacher/teachers/Teachers'));
const TarazLevels = lazy(() =>
  import('./panel/Config/TarazLevels/TarazLevels'),
);
const Buy = lazy(() => import('./general/buy/Buy'));
const MyIRYSCQuizzes = lazy(() =>
  import('./studentPanel/MyQuizzes/irysc/MyQuizzes'),
);
const MyCustomQuizzes = lazy(() =>
  import('./studentPanel/MyQuizzes/custom/MyQuizzes'),
);
const MySchoolQuizzes = lazy(() => import('./schoolPanel/MyQuizzes/MyQuizzes'));
const Transaction = lazy(() => import('./panel/transaction/Transaction'));
const ChargeAccount = lazy(() =>
  import('./studentPanel/ChargeAccount/ChargeAccount'),
);
const RunQuiz = lazy(() => import('./studentPanel/RunQuiz/RunQuiz'));
const MyOffs = lazy(() => import('./studentPanel/‌MyOffs/MyOffs'));
const ManageStudents = lazy(() =>
  import('./schoolPanel/ManageStudents/ManageStudents'),
);
const ManageTeachers = lazy(() =>
  import('./schoolPanel/ManageTeachers/ManageTeachers'),
);
const Invoice = lazy(() => import('./schoolPanel/Invoice/Invoice'));
const RankingList = lazy(() => import('./general/RankingList/RankingList'));
const MakeQuiz = lazy(() => import('./studentPanel/MakeQuiz/MakeQuiz'));
const History = lazy(() => import('./studentPanel/History/History'));
const OpenQuiz = lazy(() => import('./panel/quiz/OpenQuiz'));
const Content = lazy(() => import('./panel/Content/Content'));
const ShowRecp = lazy(() => import('./studentPanel/Recp/ShowRecp'));
const Packages = lazy(() => import('./general/Packages/Packages'));
const FAQ = lazy(() => import('./panel/Content/FAQ/FAQ'));
const Video = lazy(() => import('./panel/Video'));
const CheckCert = lazy(() => import('./general/CheckCert/CheckCert'));
const MyCerts = lazy(() => import('./general/CheckCert/MyCerts'));
const Seo = lazy(() => import('./panel/Content/Seo/Seo'));
const CopySessions = lazy(() => import('./panel/Content/Copy/Copy'));
const ContentsTeachers = lazy(() =>
  import('./panel/Content/Teachers/Teachers'),
);
const Adv = lazy(() => import('./panel/Content/Adv/Adv'));
const Notif = lazy(() => import('./panel/notifs/Notif'));
const SingleNotif = lazy(() => import('./studentPanel/Notif/Notif'));
const Barcode = lazy(() => import('./panel/Barcode/Barcode'));
import {routes} from '../API/APIRoutes';
import {generalRequest} from '../API/Utility';
const Report = lazy(() => import('./panel/spinGift/components/Report/Report'));
const SessionDetail = lazy(() =>
  import('./general/Packages/components/Detail/SessionDetail'),
);
const ContentQuiz = lazy(() => import('./panel/quiz/ContentQuiz'));
const AnswerSheet = lazy(() => import('./general/Corrector/AnswerSheet'));
const MyTasks = lazy(() => import('./correctorPanel/myTasks/MyTasks'));
const QuestionReport = lazy(() =>
  import('./panel/questionReport/QuestionReport'),
);
const MyQuizzes = lazy(() =>
  import('./studentPanel/MyQuizzes/school/MyQuizzes'),
);
const Advisors = lazy(() => import('./general/Advisors/Advisors'));
const RequestLogsForAdvisors = lazy(() =>
  import('./studentPanel/RequestLogsForAdvisors/RequestLogsForAdvisors'),
);
const MyRequests = lazy(() => import('./advisorPanel/MyRequests/MyRequests'));
const MyAdvisor = lazy(() =>
  import('./studentPanel/Advisor/MyAdvisor/MyAdvisor'),
);
const StudentEducationalHistory = lazy(() =>
  import('./panel/StudentEducationalHistory/StudentEducationalHistory'),
);
const MyHWs = lazy(() => import('./schoolPanel/MyHWs/MyHWs'));
const StudentHWs = lazy(() => import('./studentPanel/MyQuizzes/hw/MyHWs'));
const DoHW = lazy(() => import('./studentPanel/MyQuizzes/doHW/doHW'));
const OnlineStanding = lazy(() => import('./panel/quiz/OnlineStanding'));
const BuyOnlineStanding = lazy(() => import('./general/buy/BuyOnlineStanding'));
const EscapeQuiz = lazy(() => import('./panel/quiz/EscapeQuiz'));
const SpecQuestion = lazy(() => import('./panel/specQuestions/SpecQuestion'));
const RunOnlineStandingQuiz = lazy(() =>
  import('./studentPanel/RunOnlineStandingQuiz/RunOnlineStandingQuiz'),
);
const ExamTags = lazy(() => import('./panel/consultants/ExamTags'));
const MyLifeStyle = lazy(() =>
  import('./studentPanel/MyLifeStyle.js/MyLifeStyle'),
);
const RunEscapeQuiz = lazy(() =>
  import('./studentPanel/RunEscapeQuiz/RunEscapeQuiz'),
);
const Ranking = lazy(() => import('./general/OnlineStanding/Ranking'));
const MyFinancePlans = lazy(() =>
  import('./advisorPanel/MyFinancePlans/MyFinancePlans'),
);
const ChatRoom = lazy(() => import('./studentPanel/Chat/ChatRoom'));
const Schedule = lazy(() => import('./advisorPanel/Schedule/Schedule'));
const Progress = lazy(() => import('./advisorPanel/Progress/Progress'));
const Shop = lazy(() => import('./panel/Config/Configuration/Shop'));
const RunPDFQuiz = lazy(() => import('./studentPanel/RunPDFQuiz/RunPDFQuiz'));

const WebStructue = props => {
  const navigate = useNavigate();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [allowRenderPage, setAllowRenderPage] = useState(false);
  const includeFilterMenu = ['buy', 'quiz'];
  const excludeBottomNav = ['buy'];
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    setAllowRenderPage(state.user !== undefined);
  }, [state.user]);

  React.useEffect(() => {
    fetchAlerts();
  }, [state.user, fetchAlerts]);

  const [myAlerts, setMyAlerts] = useState();

  React.useEffect(() => {
    setMyAlerts(state.newAlerts);
  }, [state.newAlerts]);

  const fetchAlerts = React.useCallback(() => {
    if (
      !isWorking &&
      state.newAlerts === undefined &&
      state.token !== null &&
      state.token !== undefined &&
      state.user !== null &&
      state.user !== undefined
      // (userTmp.accesses.indexOf('admin') !== -1 ||
      //   userTmp.accesses.indexOf('superadmin') !== -1)
    ) {
      setIsWorking(true);
      Promise.all([
        generalRequest(
          routes.getMyAlerts,
          'get',
          undefined,
          'data',
          state.token,
        ),
      ]).then(res => {
        if (res[0] !== null) dispatch({newAlerts: res[0]});
        else dispatch({newAlerts: []});
        setIsWorking(false);
      });
    }
  }, [state.token, state.newAlerts, dispatch, state.user, isWorking]);

  React.useEffect(() => {
    setCurrPage(props.page);
  }, [props.page, setCurrPage]);

  const setCurrPage = React.useCallback(
    param => {
      dispatch({page: param});
    },
    [dispatch],
  );

  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };

  const toggleRightMenuVisibility = () => {
    dispatch({
      isRightMenuVisible:
        state.user === null ? false : !state.isRightMenuVisible,
    });
  };

  const params = useParams();

  return (
    <>
      <Suspense fallback={<div></div>}>
        <MyView style={{flex: 1, height: '100%'}}>
          {allowRenderPage && (
            <MinFullHeightView>
              <MyView style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {state.isInPhone && state.showTopNav && (
                  <Logo
                    isLogin={state.user !== null}
                    toggleRightMenuVisibility={toggleRightMenuVisibility}
                  />
                )}
                {!state.isInPhone &&
                  props.page !== 'home' &&
                  props.page !== 'allSchools' &&
                  props.page !== 'rankingList' && (
                    <Logo
                      isLogin={state.user !== null}
                      toggleRightMenuVisibility={toggleRightMenuVisibility}
                    />
                  )}
                {(props.page === 'home' ||
                  props.page === 'allSchools' ||
                  props.page === 'rankingList' ||
                  state.user === null) &&
                  !state.isInPhone && <Navbar user={state.user} />}

                {/* {device.indexOf(Device.WebPort) !== -1 && state.user === null && (
              <TopNavBar />
            )} */}

                {!state.isInPhone &&
                  myAlerts !== undefined &&
                  state.user !== null &&
                  props.page !== 'home' &&
                  props.page !== 'allSchools' &&
                  props.page !== 'rankingList' && (
                    <Header
                      pic={state.user.user.pic}
                      name={
                        state.user.user.firstName +
                        ' ' +
                        state.user.user.lastName
                      }
                      token={state.token}
                      isRightMenuVisible={state.isRightMenuVisible}
                      setLoading={setLoading}
                      navigate={navigate}
                      newAlerts={myAlerts}
                    />
                  )}

                <Menu
                  isFilterAvailable={
                    includeFilterMenu.indexOf(props.page) !== -1
                  }
                  toggleRightMenuVisibility={toggleRightMenuVisibility}
                  navigate={navigate}
                  selected={props.page}
                  accesses={
                    state.user !== undefined &&
                    state.user !== null &&
                    state.user.accesses !== undefined
                      ? state.user.accesses
                      : null
                  }
                />

                <MyView
                  style={
                    (!state.isInPhone && state.isRightMenuVisible) ||
                    (!state.isInPhone && state.isFilterMenuVisible)
                      ? LargeContentConianerStyle
                      : state.isInPhone && state.isRightMenuVisible
                      ? PhoneContentConianerStyle2
                      : PhoneContentConianerStyle
                  }>
                  {props.page === 'home' && (
                    <Home
                      isRightMenuVisible={state.isRightMenuVisible}
                      navigate={navigate}
                    />
                  )}
                  {/* {props.page === 'home' && <Gift navigate={navigate} />} */}
                  {props.page === 'profile' && !state.isInPhone && (
                    <WebProfile
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'dashboard' && (
                    <Dashboard
                      // setUser={setUser}
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'notif' && (
                    <SingleNotif navigate={navigate} />
                  )}
                  {props.page === 'invoice' && (
                    <Invoice
                      user={state.user}
                      token={state.token}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'myCerts' && <MyCerts navigate={navigate} />}
                  {props.page === 'validateCert' &&
                    params.certId !== undefined && (
                      <CheckCert navigate={navigate} />
                    )}
                  {props.page === 'buy' && (
                    <Buy
                      user={state.user}
                      token={state.token}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'onlineStandingQuizRegistration' && (
                    <BuyOnlineStanding navigate={navigate} />
                  )}
                  {props.page === 'schoolQuiz' && (
                    <MyQuizzes navigate={navigate} />
                  )}
                  {props.page === 'schoolHW' && (
                    <StudentHWs navigate={navigate} />
                  )}
                  {props.page === 'advisorQuiz' && (
                    <MyQuizzes advisor={true} navigate={navigate} />
                  )}
                  {props.page === 'video_test' && <Video />}
                  {props.page === 'packages' &&
                    params.sessionId !== undefined && (
                      <SessionDetail navigate={navigate} />
                    )}
                  {props.page === 'chatRoom' && (
                    <ChatRoom navigate={navigate} />
                  )}
                  {props.page === 'packages' &&
                    params.sessionId === undefined && (
                      <Packages isInMyMode={false} navigate={navigate} />
                    )}
                  {props.page === 'myPackages' && (
                    <Packages isInMyMode={true} navigate={navigate} />
                  )}
                  {props.page === 'contentFinalExam' && (
                    <RunQuiz
                      isInReviewMode={false}
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'showAnswerSheet' && (
                    <AnswerSheet navigate={navigate} />
                  )}
                  {props.page === 'myTasks' && <MyTasks navigate={navigate} />}
                  {props.page === 'financeHistory' && (
                    <History navigate={navigate} />
                  )}
                  {props.page === 'recp' && (
                    <ShowRecp token={state.token} navigate={navigate} />
                  )}
                  {props.page === 'allSchools' && (
                    <Schools navigate={navigate} />
                  )}
                  {props.page === 'makeQuiz' && (
                    <MakeQuiz
                      user={state.user}
                      token={state.token}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'myCustomQuizzes' && (
                    <MyCustomQuizzes
                      user={state.user}
                      token={state.token}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'myIRYSCQuizzes' && (
                    <MyIRYSCQuizzes
                      user={state.user}
                      token={state.token}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'mySchoolQuizzes' && (
                    <MySchoolQuizzes navigate={navigate} />
                  )}
                  {props.page === 'mySchoolHWs' && (
                    <MyHWs navigate={navigate} />
                  )}
                  {props.page === 'startHW' && <DoHW navigate={navigate} />}
                  {props.page === 'startQuiz' &&
                    params.quizMode === 'onlineStanding' && (
                      <RunOnlineStandingQuiz
                        isInReviewMode={false}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'startQuiz' &&
                    params.quizMode === 'escape' && (
                      <RunEscapeQuiz
                        isInReviewMode={false}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'startQuiz' &&
                    params.quizMode.indexOf('pdf') !== -1 && (
                      <RunPDFQuiz isInReviewMode={false} navigate={navigate} />
                    )}
                  {props.page === 'startQuiz' &&
                    params.quizMode !== 'escape' &&
                    params.quizMode.indexOf('pdf') === -1 &&
                    params.quizMode !== 'onlineStanding' && (
                      <RunQuiz
                        isInReviewMode={false}
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'checkCert' && (
                    <CheckCert navigate={navigate} />
                  )}
                  {props.page === 'rankingList' && (
                    <RankingList navigate={navigate} />
                  )}
                  {props.page === 'reviewQuiz' &&
                    params.quizMode === 'onlineStanding' && (
                      <RunOnlineStandingQuiz
                        isInReviewMode={true}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'reviewQuiz' &&
                    params.quizMode.indexOf('pdf') !== -1 && (
                      <RunPDFQuiz isInReviewMode={true} navigate={navigate} />
                    )}
                  {props.page === 'reviewQuiz' &&
                    params.quizMode.indexOf('pdf') === -1 &&
                    params.quizMode !== 'onlineStanding' && (
                      <RunQuiz
                        isInReviewMode={true}
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'acceptInvite' && (
                    <AcceptInvite token={state.token} navigate={navigate} />
                  )}
                  {props.page === 'studentEducationalHistory' && (
                    <StudentEducationalHistory navigate={navigate} />
                  )}
                  {props.page === 'upgrade' && (
                    <Upgrade
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'profile' && state.isInPhone && (
                    <WebProfile
                      // setUser={setUser}
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'cert' && (
                    <Certificate
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'barcodes' && <Barcode navigate={navigate} />}
                  {props.page === 'spinner' && <SpinGift navigate={navigate} />}
                  {props.page === 'psychology' && (
                    <Psychology navigate={navigate} />
                  )}
                  {props.page === 'advisors' && (
                    <Advisors navigate={navigate} />
                  )}
                  {props.page === 'myAdvisor' && (
                    <MyAdvisor navigate={navigate} />
                  )}
                  {props.page === 'myLifeStyle' && (
                    <MyLifeStyle navigate={navigate} />
                  )}
                  {props.page === 'studentLifeStyle' && (
                    <MyLifeStyle navigate={navigate} />
                  )}

                  {props.page === 'studentProgress' && (
                    <Progress navigate={navigate} />
                  )}
                  {props.page === 'mySchedules' && (
                    <Schedule navigate={navigate} />
                  )}
                  {props.page === 'studentSchedules' && (
                    <Schedule navigate={navigate} />
                  )}
                  {props.page === 'myFinancePlans' && (
                    <MyFinancePlans navigate={navigate} />
                  )}
                  {props.page === 'myStudentRequests' && (
                    <MyRequests navigate={navigate} />
                  )}
                  {props.page === 'requestLogsForAdvisors' && (
                    <RequestLogsForAdvisors navigate={navigate} />
                  )}
                  {props.page === 'seo-contents' && (
                    <Seo token={state.token} navigate={navigate} />
                  )}
                  {props.page === 'copy-sessions' && (
                    <CopySessions navigate={navigate} />
                  )}
                  {props.page === 'contents-teacher' && (
                    <ContentsTeachers navigate={navigate} />
                  )}
                  {props.page === 'adv-contents' && (
                    <Adv token={state.token} navigate={navigate} />
                  )}
                  {props.page === 'faq-contents' && <FAQ navigate={navigate} />}
                  {props.page === 'contents' && (
                    <Content
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'quiz' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode !== 'onlineStanding' &&
                    params.mode !== 'escape' &&
                    params.mode === 'list' && (
                      <Quiz
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'quiz' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'onlineStanding' && (
                      <OnlineStanding navigate={navigate} />
                    )}
                  {props.page === 'quiz' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'escape' && (
                      <EscapeQuiz navigate={navigate} />
                    )}
                  {props.page === 'quiz' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'open' && (
                      <OpenQuiz token={state.token} navigate={navigate} />
                    )}
                  {props.page === 'quiz' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'content' && (
                      <ContentQuiz navigate={navigate} />
                    )}
                  {props.page === 'ranking' &&
                    params !== undefined &&
                    params.mode !== 'onlineStanding' && (
                      <Quiz
                        mode={'ranking'}
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'ranking' &&
                    params !== undefined &&
                    params.mode === 'onlineStanding' && (
                      <Ranking navigate={navigate} />
                    )}
                  {props.page === 'karname' && params !== undefined && (
                    <Quiz
                      mode={'karname'}
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'consultants' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'course' && (
                      <Course
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'consultants' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'lifestyle' && (
                      <LifeStyle token={state.token} navigate={navigate} />
                    )}
                  {props.page === 'consultants' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'examTags' && (
                      <ExamTags token={state.token} navigate={navigate} />
                    )}
                  {props.page === 'questionReport' && (
                    <QuestionReport token={state.token} navigate={navigate} />
                  )}
                  {props.page === 'quiz' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'package' && (
                      <Package
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'question' && (
                    <Question
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'spec-question' && (
                    <SpecQuestion navigate={navigate} />
                  )}
                  {props.page === 'offs' && (
                    <Off
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'ticket' &&
                    isUserEditorAccess(state.user) && (
                      <Ticket navigate={navigate} />
                    )}
                  {props.page === 'ticket' &&
                    !isUserEditorAccess(state.user) && (
                      <Ticketstd
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'basic' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'grades' && (
                      <Grade
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'basic' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'lessons' &&
                    params.subMode !== undefined && (
                      <Lesson navigate={navigate} />
                    )}
                  {props.page === 'basic' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'subjects' && (
                      <Subject
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'basic' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'questionReports' && (
                      <QuestionReport navigate={navigate} />
                    )}
                  {props.page === 'avatars' && (
                    <Avatar
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'tarazLevels' && (
                    <TarazLevels
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'generalConfiguration' && (
                    <General
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'shopConfiguration' && (
                    <Shop navigate={navigate} />
                  )}
                  {props.page === 'certificateConfiguration' && (
                    <CertConf
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'ravanConfiguration' && (
                    <Ravan
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'schools' && <Schools navigate={navigate} />}
                  {props.page === 'finantialReport' && (
                    <Transaction token={state.token} navigate={navigate} />
                  )}
                  {props.page === 'users' &&
                    params.level !== undefined &&
                    params.level !== 'school' && (
                      <Users
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'users' &&
                    params.level !== undefined &&
                    params.level === 'school' && (
                      <SchoolUsers
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'author' && (
                    <Author
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'charge' && (
                    <ChargeAccount
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'notifs' && (
                    <Notif sendVia={params.mode} navigate={navigate} />
                  )}
                  {/* {props.page === 'gift' && (
                <SpinGift token={state.token} user={state.user} navigate={navigate} />
              )} */}
                  {props.page === 'gift' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'selectGift' && (
                      <SelectGift
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'gift' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'configuration' && (
                      <ConfigGift
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'gift' &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === 'report' && (
                      <Report
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === 'schoolUsers' && (
                    <SchoolUsers
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'manageStudent' && (
                    <ManageStudents
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'manageTeacher' && (
                    <ManageTeachers
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'teachers' && (
                    <Teachers
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === 'myOffs' && (
                    <MyOffs
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === '404' && <PageNotFound navigate={navigate} />}
                </MyView>
              </MyView>

              {props.page === 'login' && !state.isInPhone && (
                <WebLogin navigate={navigate} />
              )}
              {props.page === 'login' && state.isInPhone && (
                <Login navigate={navigate} />
              )}

              {state.isInPhone &&
                state.user === null &&
                excludeBottomNav.indexOf(props.page) === -1 && <BottomNavBar />}

              <ReactNotifications />
            </MinFullHeightView>
          )}
        </MyView>
      </Suspense>
    </>
  );
};

export default WebStructue;
