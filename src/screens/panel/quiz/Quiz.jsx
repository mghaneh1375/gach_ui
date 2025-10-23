import React, {useState} from 'react';
import CreateQuiz from './components/CreateQuiz.jsx';
import List from './components/List.jsx';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import Students from './components/students/Students.jsx';
import Questions from './components/questions/Questions.jsx';
import CV from './components/cv/CV.jsx';
import {
  dispatchQuizContext,
  quizContext,
  QuizProvider,
} from './components/Context.jsx';
import Key from './components/key/Key.jsx';
import Ranking from './components/reports/ranking/Ranking.jsx';
import Karname from './components/reports/karname/Karname.jsx';
import ReportList from './components/reports/list/List.jsx';
import {useParams} from 'react-router';
import {MyView} from '@/styles';
import ContentQuizKarname from './components/reports/karname/ContentQuizKarname.jsx';
import Correctors from './components/correctors/Correctors.jsx';
import PDF from './components/pdfQuestion/Questions.jsx';
import PDFQuizKey from './components/key/PDFQuizKey.jsx';
import {
  isUserAdmin,
  isUserContentAccess,
  isUserEditorAccess,
} from '@/services/utility.js';
import Copy from './components/copy/Copy.jsx';
const Quiz = props => {
  const [mode, setMode] = useState('karname');
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };
  const params = useParams();
  React.useEffect(() => {
    if (props.mode !== undefined) {
      setMode(props.mode);
    } else setMode('list');
  }, [props.mode]);
  return (
    <MyView>
      <QuizProvider>
        {mode === 'list' && (
          <List
            setMode={setMode}
            navigate={navigate}
            setLoading={setLoading}
            token={props.token}
            isAdmin={isUserAdmin(state.user)}
            isContent={isUserContentAccess(state.user)}
            isEditor={isUserEditorAccess(state.user)}
          />
        )}
        {mode === 'create' && (
          <CreateQuiz
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
            editMode={false}
            quizGeneralMode={'irysc'}
            canEdit={isUserContentAccess(state.user)}
          />
        )}
        {mode === 'correctors' && (
          <Correctors
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
            editMode={false}
            quizGeneralMode={'irysc'}
          />
        )}
        {mode === 'update' && (
          <CreateQuiz
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
            editMode={true}
            quizGeneralMode={'irysc'}
            canEdit={isUserContentAccess(state.user)}
          />
        )}
        {mode === 'key' && (
          <Key
            stateContext={quizContext}
            dispatchStateContext={dispatchQuizContext}
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
          />
        )}
        {mode === 'student' && (
          <Students
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
            isAdmin={isUserAdmin(state.user)}
          />
        )}
        {mode === 'copy' && (
          <Copy setLoading={setLoading} setMode={setMode} token={props.token} />
        )}
        {mode === 'question' && (
          <Questions
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
          />
        )}
        {mode === 'pdfQuestion' && (
          <PDF setLoading={setLoading} setMode={setMode} token={props.token} />
        )}

        {mode === 'pdfKey' && (
          <PDFQuizKey
            stateContext={quizContext}
            dispatchStateContext={dispatchQuizContext}
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
          />
        )}
        {mode === 'CV' && (
          <CV setLoading={setLoading} setMode={setMode} token={props.token} />
        )}
        {mode === 'ranking' && (
          <Ranking
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
            quizMode={params.mode}
            quizId={params.quizId}
            quizName={params.quizName}
          />
        )}
        {mode === 'karname' && params.mode !== 'content' && (
          <Karname
            setLoading={setLoading}
            user={props.user}
            setMode={setMode}
            token={props.token}
            quizMode={params.mode}
            quizId={params.quizId}
            studentId={params.studentId}
          />
        )}
        {mode === 'karname' && params.mode === 'content' && (
          <ContentQuizKarname
            setLoading={setLoading}
            user={props.user}
            setMode={setMode}
            token={props.token}
            quizMode={params.mode}
            quizId={params.quizId}
            studentId={params.studentId}
            navigate={navigate}
          />
        )}
        {mode === 'report' && (
          <ReportList
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
          />
        )}
      </QuizProvider>
    </MyView>
  );
};
export default Quiz;
