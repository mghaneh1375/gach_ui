import React, {useState} from 'react';
import {dispatchStateContext} from '../../../App';
import {
  editItem,
  isUserContentAccess,
  isUserEditorAccess,
} from '../../../services/Utility';
import {getGradeLessons} from '../Basic/Utility';
import Create from './components/Create/Create';
import Detail from './components/Detail/Detail';
import List from './components/List/List';
import {filter, getSubjects} from './components/Utility';
import {isUserAdmin} from '../../../services/Utility';
import {QuestionProvider} from './components/Detail/Context';
import {MyView} from '../../../styles/Common';

const Question = props => {
  const [subjects, setSubjects] = useState();
  const [mode, setMode] = useState('');
  const [grades, setGrades] = useState();
  const [selected, setSelected] = useState();

  const [organizationCodeFilter, setOrganizationCodeFilter] = useState();

  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    if (subjects !== undefined && subjects.length === 1) {
      setSelected(subjects[0]);
      setMode('detail');
    }
  }, [subjects]);

  React.useEffect(() => {
    dispatch({loading: true});

    Promise.all([getSubjects(props.token), getGradeLessons(props.token)]).then(
      res => {
        dispatch({loading: false});
        if (res[0] === null || res[1] === null) {
          navigate('/');
          return;
        }
        setSubjects(res[0]);

        setGrades(
          res[1].map(elem => {
            return {id: elem.id, item: elem.name, lessons: elem.lessons};
          }),
        );
        setMode('list');
      },
    );
  }, [dispatch, navigate, props.token]);

  React.useEffect(() => {
    if (mode === 'end') props.toggleShow();
  }, [mode, props]);

  React.useEffect(() => {
    if (mode === 'list') setOrganizationCodeFilter(undefined);
  }, [mode]);

  return (
    <MyView>
      {mode === 'list' && (
        <List
          setMode={setMode}
          token={props.token}
          data={subjects}
          setData={setSubjects}
          setSelected={setSelected}
          grades={grades}
          setOrganizationCodeFilter={setOrganizationCodeFilter}
          setLoading={setLoading}
          isAdmin={isUserContentAccess(props.user)}
        />
      )}
      <QuestionProvider>
        {mode === 'create' && (
          <Create
            isAdmin={isUserContentAccess(props.user)}
            setMode={setMode}
            token={props.token}
            setLoading={setLoading}
            isInEditMode={false}
            flushSubjectQuestionsInc={id => {
              setSubjects(
                subjects.map(elem => {
                  if (elem.subject.id !== id) return elem;
                  elem.questions = undefined;
                  elem.qNo = elem.qNo + 1;
                  return elem;
                }),
              );
              setSelected(subjects.find(elem => elem.subject.id === id));
            }}
          />
        )}
        {mode === 'edit' && (
          <Create
            isAdmin={isUserContentAccess(props.user)}
            setMode={setMode}
            token={props.token}
            setLoading={setLoading}
            isInEditMode={true}
            flushSubjectQuestionsInc={id => {
              setSubjects(
                subjects.map(elem => {
                  if (elem.subject.id !== id) return elem;
                  elem.questions = undefined;
                  elem.qNo = elem.qNo + 1;
                  return elem;
                }),
              );
              setSelected(
                subjects.find(elem => elem.subject.id === selected.subject.id),
              );
            }}
            flushSubjectQuestionsDec={id => {
              setSubjects(
                subjects.map(elem => {
                  if (elem.subject.id !== id) return elem;
                  elem.questions = undefined;
                  elem.qNo = elem.qNo - 1;
                  return elem;
                }),
              );
            }}
          />
        )}
        {mode === 'detail' && (
          <Detail
            subject={selected}
            dispatch={props.dispatch}
            preSelectedQuizId={props.quizId}
            setSubject={newItem => {
              editItem(subjects, setSubjects, newItem);
              setSelected(newItem);
            }}
            isAdmin={isUserAdmin(props.user)}
            isEditor={isUserEditorAccess(props.user)}
            isContent={isUserContentAccess(props.user)}
            quizMode={
              isUserContentAccess(props.user) || isUserEditorAccess(props.user)
                ? 'irysc'
                : 'school'
            }
            setMode={setMode}
            token={props.token}
            organizationCodeFilter={organizationCodeFilter}
            setLoading={setLoading}
            onBack={async () => {
              setLoading(true);
              let res = await filter(
                props.token,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
              );

              setLoading(false);
              if (res !== null) setSubjects(res);
              setMode('list');
            }}
          />
        )}
      </QuestionProvider>
    </MyView>
  );
};

export default Question;
