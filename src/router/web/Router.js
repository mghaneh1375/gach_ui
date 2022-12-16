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
          <Route path="buy" element={<WebStructue page="buy" />} />
          <Route path="packages" element={<WebStructue page="packages" />} />
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
            path="mySchoolQuizzes"
            element={<WebStructue page="mySchoolQuizzes" />}
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
            exact
            path="/users/:level"
            element={<WebStructue page="users" />}
          />
          <Route
            exact
            path="/basic/:mode"
            element={<WebStructue page="basic" />}
          />
          <Route path="/avatars" element={<WebStructue page="avatars" />} />
          <Route path="/schools" element={<WebStructue page="schools" />} />
          <Route
            path="/showAllSchools"
            element={<WebStructue page="allSchools" />}
          />

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
          <Route path="/quiz/:mode" element={<WebStructue page="quiz" />} />
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
            path="/acceptInvite/:reqId"
            element={<WebStructue page="acceptInvite" />}
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
