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
import {getDevice, isUserAdmin} from '../services/Utility';
import {Device} from '../models/Device';

import 'react-notifications-component/dist/theme.css';
import {ReactNotifications} from 'react-notifications-component';

import {globalStateContext, dispatchStateContext} from '../App';
import Logo from '../components/web/LargeScreen/Header/Logo';
import Header from '../components/web/LargeScreen/Header/Header';
import Menu from '../components/web/LargeScreen/Header/Menu';
import Navbar from '../components/web/Navbar';
import BottomNavBar from '../components/web/BottomNavBar';
import Quiz from './panel/quiz/Quiz';
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
import MySchoolQuizzes from './studentPanel/MyQuizzes/school/MyQuizzes';
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

const WebStructue = props => {
  const navigate = useNavigate();

  const device = getDevice();
  const isInLargeMode = device.indexOf(Device.Large) !== -1;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [allowRenderPage, setAllowRenderPage] = useState(false);
  const [newAlerts, setNewAlerts] = useState();
  const includeFilterMenu = ['buy', 'quiz'];
  const excludeBottomNav = ['buy'];

  React.useEffect(() => {
    setAllowRenderPage(state.user !== undefined);
  }, [state.user]);

  // if (
  //   newAlerts === undefined &&
  //   token !== null &&
  //   token !== undefined &&
  //   userTmp !== null &&
  //   userTmp !== undefined &&
  //   (userTmp.accesses.indexOf('admin') !== -1 ||
  //     userTmp.accesses.indexOf('superadmin') !== -1)
  // ) {
  //   let res = await generalRequest(
  //     routes.fetchNewAlerts,
  //     'get',
  //     undefined,
  //     'data',
  //     token,
  //   );
  //   if (res !== null) setNewAlerts(res);
  //   else setNewAlerts([]);
  // }

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
  //, backgroundColor: vars.DARK_WHITE
  return (
    <MyView style={{flex: 1, height: '100%'}}>
      {allowRenderPage && (
        <MinFullHeightView>
          <MyView style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {state.isInPhone && (
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
              device.indexOf(Device.Large) !== -1 && (
                <Navbar user={state.user} />
              )}

            {/* {device.indexOf(Device.WebPort) !== -1 && state.user === null && (
              <TopNavBar />
            )} */}

            {!state.isInPhone &&
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
                  // setUser={setUser}
                  newAlerts={newAlerts}
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
                (isInLargeMode && state.isRightMenuVisible) ||
                (isInLargeMode && state.isFilterMenuVisible)
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
              {props.page === 'profile' && isInLargeMode && (
                <WebProfile
                  // setUser={setUser}
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
              {props.page === 'invoice' && (
                <Invoice
                  user={state.user}
                  token={state.token}
                  navigate={navigate}
                />
              )}

              {props.page === 'checkCert' && params.certId !== undefined && (
                <CheckCert navigate={navigate} />
              )}

              {props.page === 'buy' && (
                <Buy
                  user={state.user}
                  token={state.token}
                  navigate={navigate}
                />
              )}

              {props.page === 'video_test' && <Video />}
              {props.page === 'packages' && (
                <Packages isInMyMode={false} navigate={navigate} />
              )}
              {props.page === 'myPackages' && (
                <Packages isInMyMode={true} navigate={navigate} />
              )}
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
                <MySchoolQuizzes
                  user={state.user}
                  token={state.token}
                  navigate={navigate}
                />
              )}

              {props.page === 'startQuiz' && (
                <RunQuiz
                  isInReviewMode={false}
                  token={state.token}
                  user={state.user}
                  navigate={navigate}
                />
              )}

              {props.page === 'rankingList' && (
                <RankingList navigate={navigate} />
              )}

              {props.page === 'reviewQuiz' && (
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
              {props.page === 'upgrade' && (
                <Upgrade
                  token={state.token}
                  user={state.user}
                  navigate={navigate}
                />
              )}
              {props.page === 'profile' && !isInLargeMode && (
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
              {props.page === 'seop-contents' && (
                <Content token={state.token} navigate={navigate} />
              )}
              {props.page === 'advs-contents' && (
                <Content token={state.token} navigate={navigate} />
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
                params.mode === 'open' && (
                  <OpenQuiz token={state.token} navigate={navigate} />
                )}
              {props.page === 'ranking' && params !== undefined && (
                <Quiz
                  mode={'ranking'}
                  token={state.token}
                  user={state.user}
                  navigate={navigate}
                />
              )}
              {props.page === 'karname' && params !== undefined && (
                <Quiz
                  mode={'karname'}
                  token={state.token}
                  user={state.user}
                  navigate={navigate}
                />
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

          {props.page === 'login' && isInLargeMode && (
            <WebLogin navigate={navigate} />
          )}
          {props.page === 'login' && !isInLargeMode && (
            <Login navigate={navigate} />
          )}

          {device.indexOf(Device.WebPort) !== -1 &&
            state.user === null &&
            excludeBottomNav.indexOf(props.page) === -1 && <BottomNavBar />}

          <ReactNotifications />
        </MinFullHeightView>
      )}
    </MyView>
  );
};

export default WebStructue;
