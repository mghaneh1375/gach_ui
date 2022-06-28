import React, {useState} from 'react';
import {View} from 'react-native';
import CreateQuiz from './components/CreateQuiz';
import List from './components/List';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import {LargePopUp} from '../../../styles/Common/PopUp';
import {CommonButton, PhoneView} from '../../../styles/Common';
import translator from './Translator';
import commonTranslator from '../../../tranlates/Common';

const Quiz = props => {
  const [mode, setMode] = useState('list');
  const [quizes, setQuizes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(undefined);
  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.fetchAllQuiz,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setQuizes(res[0]);
      dispatch({loading: false});
    });
  }, [navigate, props.token, dispatch]);

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  return (
    <View>
      {showOpPopUp && (
        <LargePopUp
          title={selectedQuiz.title}
          toggleShowPopUp={toggleShowOpPopUp}>
          <PhoneView style={{flexWrap: 'wrap'}}>
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              title={translator.seeInfo}
            />
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              title={translator.editQuestions}
            />
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              title={translator.forceRegistry}
            />
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              title={commonTranslator.hide}
            />
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              title={translator.studentsList}
            />
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              title={translator.createTaraz}
            />
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              title={translator.gift}
            />
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              title={translator.transferToOpenQuiz}
            />
          </PhoneView>
        </LargePopUp>
      )}
      {mode === 'list' && (
        <List
          quizes={quizes}
          setQuizes={setQuizes}
          setMode={setMode}
          setSelectedQuiz={setSelectedQuiz}
          toggleShowOpPopUp={toggleShowOpPopUp}
          token={props.token}
        />
      )}
      {mode === 'create' && (
        <CreateQuiz
          setLoading={setLoading}
          setMode={setMode}
          token={props.token}
        />
      )}
    </View>
  );
};

export default Quiz;
