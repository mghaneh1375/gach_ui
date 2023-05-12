import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Loader} from '../../styles/Common/Loader';
import {globalStateContext} from './../../App';
import WebStructue from '../../screens/WebStructure';
import {MyView} from '../../styles/Common';

export default function WebRouter() {
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  return (
    <MyView style={{flex: 1, height: '100%'}}>
      {state.loading && <Loader text={state.loadingText} />}

      <Router>
        <Routes>
          <Route exact path="/" element={<WebStructue page="home" />} />
          <Route path="dashboard" element={<WebStructue page="dashboard" />} />
          <Route
            path="buy/package/:packageId"
            element={<WebStructue page="buy" />}
          />
          <Route path="buy" element={<WebStructue page="buy" />} />
          <Route path="buy/:quizId" element={<WebStructue page="buy" />} />
          <Route
            exact
            path="packages"
            element={<WebStructue page="packages" />}
          />
          <Route
            exact
            path="myPackages"
            element={<WebStructue page="myPackages" />}
          />
          <Route
            path="packages/:slug"
            element={<WebStructue page="packages" />}
          />
          <Route
            path="packages/:slug/:sessionId"
            element={<WebStructue page="packages" />}
          />

          <Route path="myNotifs" element={<WebStructue page="notif" />} />
          <Route path="notif/:id" element={<WebStructue page="notif" />} />
          <Route path="barcodes" element={<WebStructue page="barcodes" />} />
          <Route
            path="video_test/test"
            element={<WebStructue page="video_test" />}
          />
          <Route path="makeQuiz" element={<WebStructue page="makeQuiz" />} />
          <Route
            path="financeHistory"
            element={<WebStructue page="financeHistory" />}
          />
          <Route
            path="recp/:transactionId"
            element={<WebStructue page="recp" />}
          />

          <Route
            path="myIRYSCQuizzes/:mode"
            element={<WebStructue page="myIRYSCQuizzes" />}
          />

          <Route
            path="myIRYSCQuizzes"
            element={<WebStructue page="myIRYSCQuizzes" />}
          />

          <Route
            path="myCustomQuizzes"
            element={<WebStructue page="myCustomQuizzes" />}
          />

          <Route
            path="mySchool/quiz"
            element={<WebStructue page="schoolQuiz" />}
          />

          <Route
            path="myAdvisor/quiz"
            element={<WebStructue page="advisorQuiz" />}
          />

          <Route
            path="studentEducationalHistory/:userId"
            element={<WebStructue page="studentEducationalHistory" />}
          />

          <Route path="advisors" element={<WebStructue page="advisors" />} />

          <Route path="myAdvisor" element={<WebStructue page="myAdvisor" />} />

          <Route
            path="requestLogsForAdvisors"
            element={<WebStructue page="requestLogsForAdvisors" />}
          />

          <Route
            path="myStudentRequests"
            element={<WebStructue page="myStudentRequests" />}
          />

          <Route path="mySchool/hw" element={<WebStructue page="schoolHW" />} />

          <Route
            path="mySchoolQuizzes"
            element={<WebStructue page="mySchoolQuizzes" />}
          />

          <Route
            path="mySchoolHWs"
            element={<WebStructue page="mySchoolHWs" />}
          />

          <Route path="/upgrade" element={<WebStructue page="upgrade" />} />
          <Route
            path="/upgrade/:userId"
            element={<WebStructue page="upgrade" />}
          />
          <Route path="/login" element={<WebStructue page="login" />} />
          <Route
            path="/profile/:userId"
            element={<WebStructue page="profile" />}
          />
          <Route path="/profile" element={<WebStructue page="profile" />} />
          <Route path="/cert" element={<WebStructue page="cert" />} />
          <Route path="/question" element={<WebStructue page="question" />} />
          <Route path="/offs" element={<WebStructue page="offs" />} />
          <Route path="/ticket" element={<WebStructue page="ticket" />} />
          <Route
            path="/ticket/:section/:name/:id"
            element={<WebStructue page="ticket" />}
          />
          <Route
            exact
            path="/users/:level"
            element={<WebStructue page="users" />}
          />
          <Route
            exact
            path="/basic/:mode"
            element={<WebStructue page="basic" />}
          />
          {/* <Route
            path="/basic/questionReport"
            element={<WebStructue page="questionReport" />}
          /> */}
          <Route path="/avatars" element={<WebStructue page="avatars" />} />
          <Route path="/schools" element={<WebStructue page="schools" />} />
          <Route
            path="/showAllSchools"
            element={<WebStructue page="allSchools" />}
          />
          <Route
            path="/showAnswerSheet/:generalQuizMode/:quizId/:mode/:id"
            element={<WebStructue page="showAnswerSheet" />}
          />

          <Route path="/myTasks" element={<WebStructue page="myTasks" />} />

          <Route
            path="/invoice/:refId"
            element={<WebStructue page="invoice" />}
          />

          <Route
            path="/finantialReport"
            element={<WebStructue page="finantialReport" />}
          />
          <Route
            path="/generalConfiguration"
            element={<WebStructue page="generalConfiguration" />}
          />

          <Route
            path="/validateCertification/:certId"
            element={<WebStructue page="validateCert" />}
          />

          <Route path="/myCerts" element={<WebStructue page="myCerts" />} />

          <Route
            path="/certificateConfiguration"
            element={<WebStructue page="certificateConfiguration" />}
          />
          <Route
            path="/ravanConfiguration"
            element={<WebStructue page="ravanConfiguration" />}
          />
          <Route
            path="/tarazLevels"
            element={<WebStructue page="tarazLevels" />}
          />
          <Route path="/contents" element={<WebStructue page="contents" />} />
          <Route
            path="/faq-contents"
            element={<WebStructue page="faq-contents" />}
          />
          <Route
            path="/adv-contents"
            element={<WebStructue page="adv-contents" />}
          />
          <Route
            path="/seo-contents"
            element={<WebStructue page="seo-contents" />}
          />
          <Route path="/notifs/:mode" element={<WebStructue page="notifs" />} />
          <Route path="/quiz/:mode" element={<WebStructue page="quiz" />} />
          <Route
            path="/consultants/:mode"
            element={<WebStructue page="consultants" />}
          />
          <Route
            path="/ranking/:mode/:quizId/:quizName"
            element={<WebStructue page="ranking" />}
          />
          <Route
            path="/result/:mode/:quizId/:studentId"
            element={<WebStructue page="karname" />}
          />
          <Route path="/users/author" element={<WebStructue page="author" />} />
          <Route
            exact
            path="/gift/:mode"
            element={<WebStructue page="gift" />}
          />
          <Route
            path="/schoolUsers"
            element={<WebStructue page="schoolUsers" />}
          />
          <Route
            path="/manageStudent"
            element={<WebStructue page="manageStudent" />}
          />
          <Route
            path="/manageTeacher"
            element={<WebStructue page="manageTeacher" />}
          />
          <Route path="/teachers" element={<WebStructue page="teachers" />} />
          <Route path="/charge" element={<WebStructue page="charge" />} />

          <Route path="/myOffs" element={<WebStructue page="myOffs" />} />

          <Route
            path="/startQuiz/:quizMode/:quizId"
            element={<WebStructue page="startQuiz" />}
          />

          <Route
            path="/reviewQuiz/:quizMode/:quizId"
            element={<WebStructue page="reviewQuiz" />}
          />

          <Route
            path="/checkCert/:certId/:NID"
            element={<WebStructue page="checkCert" />}
          />

          <Route
            path="/acceptInvite/:reqId"
            element={<WebStructue page="acceptInvite" />}
          />
          <Route path="/spinner/:id" element={<WebStructue page="spinner" />} />
          <Route
            path="/psychology"
            element={<WebStructue page="psychology" />}
          />
          <Route
            path="/rankingList"
            element={<WebStructue page="rankingList" />}
          />
          <Route path="*" element={<WebStructue page="404" />} />
        </Routes>
      </Router>
    </MyView>
  );
}
