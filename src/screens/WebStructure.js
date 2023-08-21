import React, {useState} from 'react';

import {
  MinFullHeightView,
  LargeContentConianerStyle,
  PhoneContentConianerStyle,
  MyView,
  PhoneContentConianerStyle2,
} from '../styles/Common';
import {useNavigate, useParams} from 'react-router-dom';
import Home from './general/home/Home';
import Login from './general/login/Login';
import WebLogin from './general/login/web/Login';
import WebProfile from './general/profile/web/Profile';
import {isUserAdmin} from '../services/Utility';

import 'react-notifications-component/dist/theme.css';
import {ReactNotifications} from 'react-notifications-component';

import {globalStateContext, dispatchStateContext} from '../App';
import Logo from '../components/web/LargeScreen/Header/Logo';
import Header from '../components/web/LargeScreen/Header/Header';
import Menu from '../components/web/LargeScreen/Header/Menu';
import Navbar from '../components/web/Navbar';
import BottomNavBar from '../components/web/BottomNavBar';
import Quiz from './panel/quiz/Quiz';
import Course from './panel/consultants/Course';
import LifeStyle from './panel/consultants/LifeStyle';
import Question from './panel/question/Question';
import Off from './panel/offcode/Off';
import Users from './panel/users/Users';
import Avatar from './panel/Config/Avatars/Avatar';
import PageNotFound from './general/404/PageNotFound';
import General from './panel/Config/Configuration/General';
import CertConf from './panel/Config/Configuration/Certificate';
import Ravan from './panel/Config/Configuration/Ravan';
import Schools from './panel/Config/Schools/Schools';
import Grade from './panel/Basic/grade/Grade';
import Lesson from './panel/Basic/lesson/Lesson';
import Package from './panel/package/Package';
import Subject from './panel/Basic/subject/Subject';
import Certificate from './panel/certificate/Certificate';
import Ticket from './panel/ticket/Ticket';
import Dashboard from './studentPanel/dashboard/Dashboard';
import Ticketstd from './studentPanel/Ticket/Ticket';
import Author from './panel/users/Author/Author';
import SpinGift from './panel/spinGift/SpinGift';
import Psychology from './panel/Psychology/Psychology';
import SelectGift from './panel/spinGift/components/SelectGift/SelectGift';
import Upgrade from './studentPanel/Upgrade/Upgrade';
import ConfigGift from './panel/spinGift/components/configGift/configGift';
import SchoolUsers from './agentPanel/schools/schools';
import AcceptInvite from './SinglePages/AcceptInvite';
import Teachers from './teacher/teachers/Teachers';
import TarazLevels from './panel/Config/TarazLevels/TarazLevels';
import Buy from './general/buy/Buy';
import MyIRYSCQuizzes from './studentPanel/MyQuizzes/irysc/MyQuizzes';
import MyCustomQuizzes from './studentPanel/MyQuizzes/custom/MyQuizzes';
import MySchoolQuizzes from './schoolPanel/MyQuizzes/MyQuizzes';
import Transaction from './panel/transaction/Transaction';
import ChargeAccount from './studentPanel/ChargeAccount/ChargeAccount';
import RunQuiz from './studentPanel/RunQuiz/RunQuiz';
import MyOffs from './studentPanel/‌MyOffs/MyOffs';
import ManageStudents from './schoolPanel/ManageStudents/ManageStudents';
import ManageTeachers from './schoolPanel/ManageTeachers/ManageTeachers';
import Invoice from './schoolPanel/Invoice/Invoice';
import RankingList from './general/RankingList/RankingList';
import MakeQuiz from './studentPanel/MakeQuiz/MakeQuiz';
import History from './studentPanel/History/History';
import OpenQuiz from './panel/quiz/OpenQuiz';
import Content from './panel/Content/Content';
import ShowRecp from './studentPanel/Recp/ShowRecp';
import Packages from './general/Packages/Packages';
import FAQ from './panel/Content/FAQ/FAQ';
import Video from './panel/Video';
import CheckCert from './general/CheckCert/CheckCert';
import MyCerts from './general/CheckCert/MyCerts';
import Seo from './panel/Content/Seo/Seo';
import ContentsTeachers from './panel/Content/Teachers/Teachers';
import Adv from './panel/Content/Adv/Adv';
import Notif from './panel/notifs/Notif';
import SingleNotif from './studentPanel/Notif/Notif';
import Barcode from './panel/Barcode/Barcode';
import {routes} from '../API/APIRoutes';
import {generalRequest} from '../API/Utility';
import Report from './panel/spinGift/components/Report/Report';
import SessionDetail from './general/Packages/components/Detail/SessionDetail';
import ContentQuiz from './panel/quiz/ContentQuiz';
import AnswerSheet from './general/Corrector/AnswerSheet';
import MyTasks from './correctorPanel/myTasks/MyTasks';
import QuestionReport from './panel/questionReport/QuestionReport';
import MyQuizzes from './studentPanel/MyQuizzes/school/MyQuizzes';
import Advisors from './general/Advisors/Advisors';
import RequestLogsForAdvisors from './studentPanel/RequestLogsForAdvisors/RequestLogsForAdvisors';
import MyRequests from './advisorPanel/MyRequests/MyRequests';
import MyAdvisor from './studentPanel/Advisor/MyAdvisor/MyAdvisor';
import StudentEducationalHistory from './panel/StudentEducationalHistory/StudentEducationalHistory';
import MyHWs from './schoolPanel/MyHWs/MyHWs';
import StudentHWs from './studentPanel/MyQuizzes/hw/MyHWs';
import DoHW from './studentPanel/MyQuizzes/doHW/doHW';
import OnlineStanding from './panel/quiz/OnlineStanding';
import BuyOnlineStanding from './general/buy/BuyOnlineStanding';
import EscapeQuiz from './panel/quiz/EscapeQuiz';
import SpecQuestion from './panel/specQuestions/SpecQuestion';
import RunOnlineStandingQuiz from './studentPanel/RunOnlineStandingQuiz/RunOnlineStandingQuiz';
import ExamTags from './panel/consultants/ExamTags';
import MyLifeStyle from './studentPanel/MyLifeStyle.js/MyLifeStyle';
import RunEscapeQuiz from './studentPanel/RunEscapeQuiz/RunEscapeQuiz';
import Ranking from './general/OnlineStanding/Ranking';
import MyFinancePlans from './advisorPanel/MyFinancePlans/MyFinancePlans';
import ChatRoom from './studentPanel/Chat/ChatRoom';
import Schedule from './advisorPanel/Schedule/Schedule';
import Progress from './advisorPanel/Progress/Progress';
import Shop from './panel/Config/Configuration/Shop';

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
                    state.user.user.firstName + ' ' + state.user.user.lastName
                  }
                  token={state.token}
                  isRightMenuVisible={state.isRightMenuVisible}
                  setLoading={setLoading}
                  navigate={navigate}
                  newAlerts={myAlerts}
                />
              )}

            <Menu
              isFilterAvailable={includeFilterMenu.indexOf(props.page) !== -1}
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
              {props.page === 'notif' && <SingleNotif navigate={navigate} />}
              {props.page === 'invoice' && (
                <Invoice
                  user={state.user}
                  token={state.token}
                  navigate={navigate}
                />
              )}
              {props.page === 'myCerts' && <MyCerts navigate={navigate} />}
              {props.page === 'validateCert' && params.certId !== undefined && (
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
              {props.page === 'schoolQuiz' && <MyQuizzes navigate={navigate} />}
              {props.page === 'schoolHW' && <StudentHWs navigate={navigate} />}
              {props.page === 'advisorQuiz' && (
                <MyQuizzes advisor={true} navigate={navigate} />
              )}
              {props.page === 'video_test' && <Video />}
              {props.page === 'packages' && params.sessionId !== undefined && (
                <SessionDetail navigate={navigate} />
              )}
              {props.page === 'chatRoom' && <ChatRoom navigate={navigate} />}
              {props.page === 'packages' && params.sessionId === undefined && (
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
              {props.page === 'allSchools' && <Schools navigate={navigate} />}
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
              {props.page === 'mySchoolHWs' && <MyHWs navigate={navigate} />}
              {props.page === 'startHW' && <DoHW navigate={navigate} />}
              {props.page === 'startQuiz' &&
                params.quizMode === 'onlineStanding' && (
                  <RunOnlineStandingQuiz
                    isInReviewMode={false}
                    navigate={navigate}
                  />
                )}
              {props.page === 'startQuiz' && params.quizMode === 'escape' && (
                <RunEscapeQuiz isInReviewMode={false} navigate={navigate} />
              )}
              {props.page === 'startQuiz' &&
                params.quizMode !== 'escape' &&
                params.quizMode !== 'onlineStanding' && (
                  <RunQuiz
                    isInReviewMode={false}
                    token={state.token}
                    user={state.user}
                    navigate={navigate}
                  />
                )}
              {props.page === 'checkCert' && <CheckCert navigate={navigate} />}
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
              {props.page === 'advisors' && <Advisors navigate={navigate} />}
              {props.page === 'myAdvisor' && <MyAdvisor navigate={navigate} />}
              {props.page === 'myLifeStyle' && (
                <MyLifeStyle navigate={navigate} />
              )}
              {props.page === 'studentLifeStyle' && (
                <MyLifeStyle navigate={navigate} />
              )}

              {props.page === 'studentProgress' && (
                <Progress navigate={navigate} />
              )}
              {props.page === 'mySchedules' && <Schedule navigate={navigate} />}
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
                params.mode === 'escape' && <EscapeQuiz navigate={navigate} />}
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
              {props.page === 'ticket' && isUserAdmin(state.user) && (
                <Ticket
                  token={state.token}
                  user={state.user}
                  navigate={navigate}
                />
              )}
              {props.page === 'ticket' && !isUserAdmin(state.user) && (
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
                params.mode === 'lessons' && (
                  <Lesson
                    token={state.token}
                    user={state.user}
                    navigate={navigate}
                  />
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
  );
};

export default WebStructue;
