import { dispatchStateContext, globalStateContext } from "@/App.jsx";
import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useNavigate, useParams } from "react-router-dom";
import BottomNavBar from "../components/web/BottomNavBar.jsx";
import Header from "../components/web/largeScreen/header/Header.jsx";
import Logo from "../components/web/largeScreen/header/Logo.jsx";
import Menu from "../components/web/largeScreen/header/Menu.jsx";
import Navbar from "../components/web/Navbar.jsx";
import {
  getToday,
  isUserAdmin,
  isUserAdvisor,
  isUserEditorAccess,
} from "../services/utility";
import {
  LargeContentConianerStyle,
  MinFullHeightView,
  MyView,
  PhoneContentConianerStyle,
  PhoneContentConianerStyle2,
} from "../styles/CommonComponents.jsx";

const Home = lazy(() => import("./general/home/Home.jsx"));
const Login = lazy(() => import("./general/login/Login.jsx"));
const WebLogin = lazy(() => import("./general/login/web/Login"));
const WebProfile = lazy(() => import("./general/profile/web/Profile"));
const Quiz = lazy(() => import("./panel/quiz/Quiz"));
const Course = lazy(() => import("./panel/consultants/Course"));
const LifeStyle = lazy(() => import("./panel/consultants/LifeStyle"));
const Question = lazy(() => import("./panel/question/Question"));
const Off = lazy(() => import("./panel/offcode/Off"));
const Users = lazy(() => import("./panel/users/Users"));
const Avatar = lazy(() => import("./panel/config/avatars/Avatar"));
const PageNotFound = lazy(() => import("./general/404/PageNotFound"));
const General = lazy(() => import("./panel/config/configuration/General"));
const CertConf = lazy(() => import("./panel/config/configuration/Certificate"));
const Ravan = lazy(() => import("./panel/config/configuration/Ravan"));
const Schools = lazy(() => import("./panel/config/schools/Schools"));
const Grade = lazy(() => import("./panel/basic/grade/Grade"));
const Lesson = lazy(() => import("./panel/basic/lesson/Lesson"));
const Package = lazy(() => import("./panel/package/Package"));
const Subject = lazy(() => import("./panel/basic/subject/Subject"));
const Certificate = lazy(() => import("./panel/certificate/Certificate"));
const Ticket = lazy(() => import("./panel/ticket/Ticket"));
const Dashboard = lazy(() => import("./studentPanel/dashboard/Dashboard"));

const AdvisorDashboard = lazy(() =>
  import("./advisorPanel/dashboard/Dashboard"),
);

const Ticketstd = lazy(() => import("./studentPanel/ticket/Ticket"));
const Author = lazy(() => import("./panel/users/author/Author"));
const SpinGift = lazy(() => import("./panel/spinGift/SpinGift"));
const Psychology = lazy(() => import("./panel/psychology/Psychology"));
const SelectGift = lazy(() =>
  import("./panel/spinGift/components/selectGift/SelectGift"),
);
const Upgrade = lazy(() => import("./studentPanel/upgrade/Upgrade"));
const ConfigGift = lazy(() =>
  import("./panel/spinGift/components/configGift/ConfigGift"),
);
const SchoolUsers = lazy(() => import("./agentPanel/schools/Schools"));
const AcceptInvite = lazy(() => import("./singlePages/AcceptInvite"));
const Teachers = lazy(() => import("./teacher/teachers/Teachers"));
const TarazLevels = lazy(() =>
  import("./panel/config/tarazLevels/TarazLevels"),
);
const Buy = lazy(() => import("./general/buy/Buy"));
const MyIRYSCQuizzes = lazy(() =>
  import("./studentPanel/myQuizzes/irysc/MyQuizzes"),
);
const MyCustomQuizzes = lazy(() =>
  import("./studentPanel/myQuizzes/custom/MyQuizzes"),
);
const MySchoolQuizzes = lazy(() => import("./schoolPanel/myQuizzes/MyQuizzes"));
const Transaction = lazy(() => import("./panel/transaction/Transaction"));
const ChargeAccount = lazy(() =>
  import("./studentPanel/chargeAccount/ChargeAccount"),
);
const RunQuiz = lazy(() => import("./studentPanel/runQuiz/RunQuiz"));
const MyOffs = lazy(() => import("./studentPanel/myOffs/MyOffs"));
const ManageStudents = lazy(() =>
  import("./schoolPanel/manageStudents/ManageStudents"),
);
const ManageTeachers = lazy(() =>
  import("./schoolPanel/manageTeachers/ManageTeachers"),
);
const Invoice = lazy(() => import("./schoolPanel/invoice/Invoice"));
const RankingList = lazy(() => import("./general/rankingList/RankingList"));
const MakeQuiz = lazy(() => import("./studentPanel/makeQuiz/MakeQuiz"));
const History = lazy(() => import("./studentPanel/history/History"));
const OpenQuiz = lazy(() => import("./panel/quiz/OpenQuiz"));
const Content = lazy(() => import("./panel/content/Content"));
const Missed = lazy(() => import("./panel/content/missed/Missed.jsx"));
const ShowRecp = lazy(() => import("./studentPanel/recp/ShowRecp"));
const Packages = lazy(() => import("./general/packages/Packages"));
const FAQ = lazy(() => import("./panel/content/faq/FAQ.jsx"));
const Video = lazy(() => import("./panel/Video"));
const CheckCert = lazy(() => import("./general/checkCert/CheckCert"));
const MyCerts = lazy(() => import("./general/checkCert/MyCerts"));
const Seo = lazy(() => import("./panel/content/seo/Seo"));
const CopySessions = lazy(() => import("./panel/content/copy/Copy"));
const ContentsTeachers = lazy(() =>
  import("./panel/content/teachers/Teachers"),
);
const Adv = lazy(() => import("./panel/content/adv/Adv"));
const Notif = lazy(() => import("./panel/notifs/Notif"));
const SingleNotif = lazy(() => import("./studentPanel/notif/Notif"));
const PackageLevel = lazy(() => import("./panel/content/level/PackageLevel"));

import { routes } from "../api/apiRoutes";
import { generalRequest } from "../api/utility.js";
import AdminWebStructue from "./AdminWebStructure.jsx";

const ShowScheduleByUrlForStudent = lazy(() =>
  import("./advisorPanel/schedule/components/ShowScheduleByUrlForStudent.jsx"),
);
const ShowScheduleByUrlForAdvisor = lazy(() =>
  import("./advisorPanel/schedule/components/ShowScheduleByUrlForAdvisor.jsx"),
);
const MyAdvisorHistory = lazy(() =>
  import("./studentPanel/advisor/myAdvisor/MyAdvisorHistory"),
);

const TeachSchedules = lazy(() => import("./panel/teach/schedules/Schedules"));
const TeacherProfile = lazy(() =>
  import("./advisorPanel/profile/TeacherProfile"),
);
const StudentProfile = lazy(() =>
  import("./studentPanel/profile/StudentProfile"),
);
const MyTeachSchedule = lazy(() =>
  import("./advisorPanel/teach/schedule/MyTeachSchedule"),
);
const MyTeachTransactions = lazy(() =>
  import("./advisorPanel/teach/transaction/MyTeachTransactions"),
);
const MyTeachRequests = lazy(() =>
  import("./advisorPanel/teach/requests/MyTeachRequests"),
);
const MyScheduleRequests = lazy(() =>
  import("./studentPanel/teach/myScheduleRequests/MyScheduleRequests"),
);
const MyTeachClasses = lazy(() =>
  import("./studentPanel/teach/myClasses/MyClasses"),
);
const Report = lazy(() => import("./panel/spinGift/components/report/Report"));
const AllComments = lazy(() => import("./panel/comment/Comment"));
const SessionDetail = lazy(() =>
  import("./general/packages/components/detail/SessionDetail"),
);
const ContentQuiz = lazy(() => import("./panel/quiz/ContentQuiz"));
const AnswerSheet = lazy(() => import("./general/corrector/AnswerSheet"));
const MyTasks = lazy(() => import("./correctorPanel/myTasks/MyTasks"));
const QuestionReport = lazy(() =>
  import("./panel/questionReport/QuestionReport"),
);

const GeneralStats = lazy(() => import("./panel/stat/GeneralStats"));
const MyQuizzes = lazy(() =>
  import("./studentPanel/myQuizzes/school/MyQuizzes"),
);
const MyComments = lazy(() => import("./studentPanel/comment/MyComments"));
const CommentsAboutMe = lazy(() =>
  import("./studentPanel/comment/CommentsAboutMe"),
);
const Advisors = lazy(() => import("./general/advisors/Advisors"));
const AdvisorsBeforeLogin = lazy(() =>
  import("./general/advisors/AdvisorsBeforeLogin"),
);
const AllTeachers = lazy(() => import("./general/teachers/Teachers"));
const RequestLogsForAdvisors = lazy(() =>
  import("./studentPanel/requestLogsForAdvisors/RequestLogsForAdvisors"),
);
const MyRequests = lazy(() => import("./advisorPanel/myRequests/MyRequests"));
const MyAdvisor = lazy(() =>
  import("./studentPanel/advisor/myAdvisor/MyAdvisor"),
);
const StudentEducationalHistory = lazy(() =>
  import("./panel/studentEducationalHistory/StudentEducationalHistory"),
);
const MyHWs = lazy(() => import("./schoolPanel/myHWs/MyHWs"));
const StudentHWs = lazy(() => import("./studentPanel/myQuizzes/hw/MyHWs"));
const DoHW = lazy(() => import("./studentPanel/myQuizzes/doHW/DoHW"));
const OnlineStanding = lazy(() => import("./panel/quiz/OnlineStanding"));
const BuyOnlineStanding = lazy(() => import("./general/buy/BuyOnlineStanding"));
const EscapeQuiz = lazy(() => import("./panel/quiz/EscapeQuiz"));
const SpecQuestion = lazy(() => import("./panel/specQuestions/SpecQuestion"));
const AllTeachTransactions = lazy(() =>
  import("./panel/teach/transactions/Transactions"),
);
const RunOnlineStandingQuiz = lazy(() =>
  import("./studentPanel/runOnlineStandingQuiz/RunOnlineStandingQuiz"),
);
const ExamTags = lazy(() => import("./panel/consultants/ExamTags"));
const MyLifeStyle = lazy(() =>
  import("./studentPanel/myLifeStyle/MyLifeStyle.jsx"),
);
const RunEscapeQuiz = lazy(() =>
  import("./studentPanel/runEscapeQuiz/RunEscapeQuiz"),
);
const Ranking = lazy(() => import("./general/onlineStanding/Ranking"));
const Exchanges = lazy(() => import("./panel/exchange/Exchange"));
const Badges = lazy(() => import("./panel/badge/Badge"));
const PublicBadges = lazy(() => import("./general/badge/Badge"));
const Points = lazy(() => import("./panel/point/Point"));
const Levels = lazy(() => import("./panel/level/Level"));
const DailyAdv = lazy(() => import("./panel/dailyAdv/DailyAdv"));
const MyFinancePlans = lazy(() =>
  import("./advisorPanel/myFinancePlans/MyFinancePlans"),
);
const ChatRoom = lazy(() => import("./studentPanel/chat/ChatRoom"));
const ProfileConfig = lazy(() =>
  import("./studentPanel/profileConfig/ProfileConfig"),
);
const Schedule = lazy(() => import("./advisorPanel/schedule/Schedule"));
const Progress = lazy(() => import("./advisorPanel/progress/Progress"));
const Shop = lazy(() => import("./panel/config/configuration/Shop"));
const SettlementRequests = lazy(() =>
  import("./panel/settlements/SettlementRequests"),
);
const RunPDFQuiz = lazy(() => import("./studentPanel/runPDFQuiz/RunPDFQuiz"));

const WebStructue = props => {
  const navigate = useNavigate();
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [allowRenderPage, setAllowRenderPage] = useState(false);
  const includeFilterMenu = ["buy", "quiz"];
  const excludeBottomNav = ["buy"];
  const [isWorking, setIsWorking] = useState(false);
  const [canRequestForAdv, setCanRequestForAdv] = useState(
    window.localStorage.getItem("can_request_for_adv"),
  );
  useEffect(() => {
    setCanRequestForAdv(window.localStorage.getItem("can_request_for_adv"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.localStorage]);
  const [lastFetchDailyAdv, today] = useMemo(
    () => [window.localStorage.getItem("last_fetch_daily_adv"), getToday()],
    [],
  );
  const fetchCanReq = React.useCallback(() => {
    window.localStorage.setItem("can_request_for_adv", undefined);
    Promise.all([
      generalRequest(
        routes.canReqForAdv,
        "get",
        undefined,
        "data",
        state.token,
      ),
    ]).then(res => {
      if (res[0] != null) {
        window.localStorage.setItem("last_fetch_daily_adv", today);
        window.localStorage.setItem("can_request_for_adv", res[0]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.token]);
  useEffect(() => {
    if (state.token && today !== lastFetchDailyAdv) fetchCanReq();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastFetchDailyAdv, state.token]);
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
          "get",
          undefined,
          "data",
          state.token,
        ),
      ]).then(res => {
        if (res[0] && res[0] !== null)
          dispatch({
            newAlerts: res[0],
          });
        else
          dispatch({
            newAlerts: [],
          });
        setIsWorking(false);
      });
    }
  }, [state.token, state.newAlerts, dispatch, state.user, isWorking]);
  React.useEffect(() => {
    setCurrPage(props.page);
  }, [props.page, setCurrPage]);
  const setCurrPage = React.useCallback(
    param => {
      dispatch({
        page: param,
      });
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
      <Suspense fallback={<div />}>
        <MyView
          style={{
            flex: 1,
            height: "100%",
          }}>
          {allowRenderPage && (
            <MinFullHeightView>
              <MyView
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
                {state.isInPhone && state.showTopNav && (
                  <Logo
                    isLogin={state.user !== null}
                    toggleRightMenuVisibility={toggleRightMenuVisibility}
                  />
                )}
                {!state.isInPhone &&
                  props.page !== "home" &&
                  props.page !== "allSchools" &&
                  props.page !== "rankingList" && (
                    <Logo
                      isLogin={state.user !== null}
                      toggleRightMenuVisibility={toggleRightMenuVisibility}
                    />
                  )}
                {(props.page === "home" ||
                    props.page === "allSchools" ||
                    props.page === "rankingList" ||
                    state.user === null) &&
                  !state.isInPhone && <Navbar user={state.user} />}

                {!state.isInPhone &&
                  myAlerts !== undefined &&
                  state.user !== null &&
                  props.page !== "home" &&
                  props.page !== "allSchools" &&
                  props.page !== "rankingList" && (
                    <Header
                      canRequestForAdv={canRequestForAdv}
                      pic={state.user.user.pic}
                      name={
                        state.user.user.firstName +
                        " " +
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

                <LargeContentConianer
                  // style={
                  //   (!state.isInPhone && state.isRightMenuVisible) ||
                  //   (!state.isInPhone && state.isFilterMenuVisible)
                  //     ? LargeContentConianerStyle
                  //     : state.isInPhone && state.isRightMenuVisible
                  //     ? PhoneContentConianerStyle2
                  //     : PhoneContentConianerStyle
                  // }
                >
                  {props.page === "home" && (
                    <Home
                      isRightMenuVisible={state.isRightMenuVisible}
                      navigate={navigate}
                    />
                  )}
                  {/* {props.page === 'home' && <Gift navigate={navigate} />} */}
                  {props.page === "profile" && !state.isInPhone && (
                    <WebProfile
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "dashboard" &&
                    !isUserAdmin(state.user) &&
                    !isUserAdvisor(state.user) && (
                      <Dashboard
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  <AdminWebStructue
                    page={props.page}
                    isUserAdmin={isUserAdmin(state.user)}
                  />

                  {props.page === "dashboard" && isUserAdvisor(state.user) && (
                    <AdvisorDashboard />
                  )}

                  {props.page === "generalStats" && (
                    <GeneralStats navigate={navigate} />
                  )}
                  {props.page === "exchanges" && (
                    <Exchanges navigate={navigate} />
                  )}
                  {props.page === "publicBadges" && (
                    <PublicBadges navigate={navigate} />
                  )}
                  {props.page === "badges" && <Badges navigate={navigate} />}
                  {props.page === "points" && <Points navigate={navigate} />}
                  {props.page === "levels" && <Levels navigate={navigate} />}
                  {props.page === "dailyAdv" && (
                    <DailyAdv navigate={navigate} />
                  )}
                  {props.page === "settlementRequests" && (
                    <SettlementRequests navigate={navigate} />
                  )}
                  {props.page === "allComments" && (
                    <AllComments navigate={navigate} />
                  )}
                  {props.page === "historyOfMyAdvisor" && (
                    <MyAdvisorHistory navigate={navigate} />
                  )}
                  {props.page === "myComments" && (
                    <MyComments navigate={navigate} />
                  )}
                  {props.page === "commentsAboutMe" && (
                    <CommentsAboutMe navigate={navigate} />
                  )}
                  {props.page === "allTeachTransactions" && (
                    <AllTeachTransactions navigate={navigate} />
                  )}
                  {props.page === "teacherProfile" && (
                    <TeacherProfile navigate={navigate} />
                  )}
                  {props.page === "studentProfile" && (
                    <StudentProfile navigate={navigate} />
                  )}
                  {props.page === "notif" && (
                    <SingleNotif navigate={navigate} />
                  )}
                  {props.page === "showSchedule" && (
                    <ShowScheduleByUrlForStudent />
                  )}
                  {props.page === "showScheduleForAdvisor" && (
                    <ShowScheduleByUrlForAdvisor />
                  )}
                  {props.page === "invoice" && (
                    <Invoice
                      user={state.user}
                      token={state.token}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "myCerts" && <MyCerts navigate={navigate} />}
                  {props.page === "validateCert" &&
                    params.certId !== undefined && (
                      <CheckCert navigate={navigate} />
                    )}
                  {props.page === "buy" && (
                    <Buy
                      user={state.user}
                      token={state.token}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "onlineStandingQuizRegistration" && (
                    <BuyOnlineStanding navigate={navigate} />
                  )}
                  {props.page === "schoolQuiz" && (
                    <MyQuizzes navigate={navigate} />
                  )}
                  {props.page === "schoolHW" && (
                    <StudentHWs navigate={navigate} />
                  )}
                  {props.page === "advisorQuiz" && (
                    <MyQuizzes advisor={true} navigate={navigate} />
                  )}
                  {props.page === "video_test" && <Video />}
                  {props.page === "packages" &&
                    params.sessionId !== undefined && (
                      <SessionDetail navigate={navigate} />
                    )}
                  {props.page === "chatRoom" && (
                    <ChatRoom navigate={navigate} />
                  )}
                  {props.page === "packages" &&
                    params.sessionId === undefined && (
                      <Packages isInMyMode={false} navigate={navigate} />
                    )}
                  {props.page === "myPackages" && (
                    <Packages isInMyMode={true} navigate={navigate} />
                  )}
                  {props.page === "profileConfig" && (
                    <ProfileConfig navigate={navigate} />
                  )}
                  {props.page === "contentFinalExam" && (
                    <RunQuiz
                      isInReviewMode={false}
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "showAnswerSheet" && (
                    <AnswerSheet navigate={navigate} />
                  )}
                  {props.page === "myTasks" && <MyTasks navigate={navigate} />}
                  {props.page === "financeHistory" && (
                    <History navigate={navigate} />
                  )}
                  {props.page === "recp" && (
                    <ShowRecp token={state.token} navigate={navigate} />
                  )}
                  {props.page === "allSchools" && (
                    <Schools navigate={navigate} />
                  )}
                  {props.page === "makeQuiz" && (
                    <MakeQuiz
                      user={state.user}
                      token={state.token}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "myCustomQuizzes" && (
                    <MyCustomQuizzes
                      user={state.user}
                      token={state.token}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "myIRYSCQuizzes" && (
                    <MyIRYSCQuizzes
                      user={state.user}
                      token={state.token}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "mySchoolQuizzes" && (
                    <MySchoolQuizzes navigate={navigate} />
                  )}
                  {props.page === "mySchoolHWs" && (
                    <MyHWs navigate={navigate} />
                  )}
                  {props.page === "startHW" && <DoHW navigate={navigate} />}
                  {props.page === "startQuiz" &&
                    params.quizMode === "onlineStanding" && (
                      <RunOnlineStandingQuiz
                        isInReviewMode={false}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "startQuiz" &&
                    params.quizMode === "escape" && (
                      <RunEscapeQuiz
                        isInReviewMode={false}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "startQuiz" &&
                    params.quizMode.indexOf("pdf") !== -1 && (
                      <RunPDFQuiz isInReviewMode={false} navigate={navigate} />
                    )}
                  {props.page === "startQuiz" &&
                    params.quizMode !== "escape" &&
                    params.quizMode.indexOf("pdf") === -1 &&
                    params.quizMode !== "onlineStanding" && (
                      <RunQuiz
                        isInReviewMode={false}
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "checkCert" && (
                    <CheckCert navigate={navigate} />
                  )}
                  {props.page === "rankingList" && (
                    <RankingList navigate={navigate} />
                  )}
                  {props.page === "reviewQuiz" &&
                    params.quizMode === "onlineStanding" && (
                      <RunOnlineStandingQuiz
                        isInReviewMode={true}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "reviewQuiz" &&
                    params.quizMode.indexOf("pdf") !== -1 && (
                      <RunPDFQuiz isInReviewMode={true} navigate={navigate} />
                    )}
                  {props.page === "reviewQuiz" &&
                    params.quizMode.indexOf("pdf") === -1 &&
                    params.quizMode !== "onlineStanding" && (
                      <RunQuiz
                        isInReviewMode={true}
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "acceptInvite" && (
                    <AcceptInvite token={state.token} navigate={navigate} />
                  )}
                  {props.page === "studentEducationalHistory" && (
                    <StudentEducationalHistory navigate={navigate} />
                  )}
                  {props.page === "upgrade" && (
                    <Upgrade
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "profile" && state.isInPhone && (
                    <WebProfile
                      // setUser={setUser}
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "cert" && (
                    <Certificate
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "spinner" && <SpinGift navigate={navigate} />}
                  {props.page === "psychology" && (
                    <Psychology navigate={navigate} />
                  )}

                  {props.page === "allTeaches" && (
                    <TeachSchedules navigate={navigate} />
                  )}
                  {props.page === "showAllTeachers" && (
                    <AllTeachers navigate={navigate} />
                  )}
                  {props.page === "myTeachSchedules" && (
                    <MyTeachSchedule navigate={navigate} />
                  )}
                  {props.page === "myTeachTransactions" && (
                    <MyTeachTransactions navigate={navigate} />
                  )}
                  {props.page === "myTeachRequests" && (
                    <MyTeachRequests navigate={navigate} />
                  )}
                  {props.page === "myTeachClasses" && (
                    <MyTeachClasses navigate={navigate} />
                  )}
                  {props.page === "myScheduleRequests" && (
                    <MyScheduleRequests navigate={navigate} />
                  )}
                  {props.page === "advisors" &&
                    state.user !== undefined &&
                    state.user !== null && <Advisors navigate={navigate} />}
                  {props.page === "advisors" &&
                    (state.user === undefined || state.user === null) && (
                      <AdvisorsBeforeLogin navigate={navigate} />
                    )}
                  {props.page === "myAdvisor" && (
                    <MyAdvisor navigate={navigate} />
                  )}
                  {props.page === "myLifeStyle" && (
                    <MyLifeStyle navigate={navigate} />
                  )}
                  {props.page === "studentLifeStyle" && (
                    <MyLifeStyle navigate={navigate} />
                  )}
                  {props.page === "studentProgress" && (
                    <Progress navigate={navigate} />
                  )}
                  {props.page === "mySchedules" && (
                    <Schedule navigate={navigate} />
                  )}
                  {props.page === "studentSchedules" && (
                    <Schedule navigate={navigate} />
                  )}
                  {props.page === "myFinancePlans" && (
                    <MyFinancePlans navigate={navigate} />
                  )}
                  {props.page === "myStudentRequests" && (
                    <MyRequests navigate={navigate} />
                  )}
                  {props.page === "requestLogsForAdvisors" && (
                    <RequestLogsForAdvisors navigate={navigate} />
                  )}
                  {props.page === "seo-contents" && (
                    <Seo token={state.token} navigate={navigate} />
                  )}
                  {props.page === "copy-sessions" && (
                    <CopySessions navigate={navigate} />
                  )}
                  {props.page === "contents-teacher" && (
                    <ContentsTeachers navigate={navigate} />
                  )}
                  {props.page === "adv-contents" && (
                    <Adv token={state.token} navigate={navigate} />
                  )}
                  {props.page === "package-levels" && (
                    <PackageLevel token={state.token} navigate={navigate} />
                  )}
                  {props.page === "faq-contents" && <FAQ navigate={navigate} />}
                  {props.page === "contents" && (
                    <Content
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "findMissedInContent" && <Missed />}
                  {props.page === "quiz" &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode !== "onlineStanding" &&
                    params.mode !== "escape" &&
                    params.mode === "list" && (
                      <Quiz
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "quiz" &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === "onlineStanding" && (
                      <OnlineStanding navigate={navigate} />
                    )}
                  {props.page === "quiz" &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === "escape" && (
                      <EscapeQuiz navigate={navigate} />
                    )}
                  {props.page === "quiz" &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === "open" && (
                      <OpenQuiz token={state.token} navigate={navigate} />
                    )}
                  {props.page === "quiz" &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === "content" && (
                      <ContentQuiz navigate={navigate} />
                    )}
                  {props.page === "ranking" &&
                    params !== undefined &&
                    params.mode !== "onlineStanding" && (
                      <Quiz
                        mode={"ranking"}
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "ranking" &&
                    params !== undefined &&
                    params.mode === "onlineStanding" && (
                      <Ranking navigate={navigate} />
                    )}
                  {props.page === "karname" && params !== undefined && (
                    <Quiz
                      mode={"karname"}
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "consultants" &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === "course" && (
                      <Course
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "consultants" &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === "lifestyle" && (
                      <LifeStyle token={state.token} navigate={navigate} />
                    )}
                  {props.page === "consultants" &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === "examTags" && (
                      <ExamTags token={state.token} navigate={navigate} />
                    )}
                  {props.page === "questionReport" && (
                    <QuestionReport token={state.token} navigate={navigate} />
                  )}
                  {props.page === "quiz" &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === "package" && (
                      <Package
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "question" && (
                    <Question
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "spec-question" && (
                    <SpecQuestion navigate={navigate} />
                  )}
                  {props.page === "offs" && (
                    <Off
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "ticket" &&
                    isUserEditorAccess(state.user) && (
                      <Ticket navigate={navigate} />
                    )}
                  {props.page === "ticket" &&
                    !isUserEditorAccess(state.user) && (
                      <Ticketstd
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "basic" &&
                    params &&
                    params.mode &&
                    params.mode === "grades" && (
                      <Grade
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "basic" &&
                    params &&
                    params.mode &&
                    params.mode === "lessons" &&
                    params.subMode && <Lesson navigate={navigate} />}
                  {props.page === "basic" &&
                    params &&
                    params.mode &&
                    params.mode === "subjects" && (
                      <Subject
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "basic" &&
                    params &&
                    params.mode &&
                    params.mode === "questionReports" && (
                      <QuestionReport navigate={navigate} />
                    )}

                  {props.page === "avatars" && (
                    <Avatar
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "tarazLevels" && (
                    <TarazLevels
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "generalConfiguration" && (
                    <General
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "shopConfiguration" && (
                    <Shop navigate={navigate} />
                  )}
                  {props.page === "certificateConfiguration" && (
                    <CertConf
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "ravanConfiguration" && (
                    <Ravan
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "schools" && <Schools navigate={navigate} />}
                  {props.page === "finantialReport" && (
                    <Transaction token={state.token} navigate={navigate} />
                  )}
                  {props.page === "users" &&
                    params.level &&
                    params.level !== "school" && (
                      <Users
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "users" &&
                    params.level &&
                    params.level === "school" && (
                      <SchoolUsers
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "author" && (
                    <Author
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "charge" && (
                    <ChargeAccount
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "notifs" && (
                    <Notif sendVia={params.mode} navigate={navigate} />
                  )}
                  {/* {props.page === 'gift' && (
                   <SpinGift token={state.token} user={state.user} navigate={navigate} />
                   )} */}
                  {props.page === "gift" &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === "selectGift" && (
                      <SelectGift
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "gift" &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === "configuration" && (
                      <ConfigGift
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "gift" &&
                    params !== undefined &&
                    params.mode !== undefined &&
                    params.mode === "report" && (
                      <Report
                        token={state.token}
                        user={state.user}
                        navigate={navigate}
                      />
                    )}
                  {props.page === "schoolUsers" && (
                    <SchoolUsers
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "manageStudent" && <ManageStudents />}
                  {props.page === "manageTeacher" && (
                    <ManageTeachers
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "teachers" && (
                    <Teachers
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "myOffs" && (
                    <MyOffs
                      token={state.token}
                      user={state.user}
                      navigate={navigate}
                    />
                  )}
                  {props.page === "404" && <PageNotFound navigate={navigate} />}
                </LargeContentConianer>
              </MyView>

              {props.page === "login" && !state.isInPhone && (
                <WebLogin navigate={navigate} />
              )}
              {props.page === "login" && state.isInPhone && (
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
