import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {CommonWebBox} from '../../../../styles/Common';
import {TextIcon} from '../../../../styles/Common/TextIcon';
import translator from '../Translator';
import {convertTimestamp} from '../../../../services/Utility';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {useState} from 'react';
import Ops from './Ops';
import {routes} from '../../../../API/APIRoutes';

const List = props => {
  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const changeMode = newMode => {
    props.setMode(newMode);
  };

  const columns = [
    {
      name: 'نام آزمون',
      selector: row => row.title,
      grow: 1,
    },
    {
      name: 'قیمت',
      selector: row => row.price,
      grow: 1,
    },
    {
      name: 'زمان اجرا',
      selector: row =>
        convertTimestamp(row.start) + ' تا ' + convertTimestamp(row.end),
      grow: 4,
      wrap: true,
      style: {
        minWidth: '200px !important',
      },
      sortable: true,
      sortFunction: (a, b) => {
        return a.start - b.start;
      },
    },
    {
      name: 'بازه ثبت نام',
      selector: row =>
        convertTimestamp(row.startRegistry) +
        ' تا ' +
        convertTimestamp(row.endRegistry),
      grow: 4,
      wrap: true,
      style: {
        minWidth: '200px !important',
      },
    },
    {
      name: 'تعداد سوال',
      selector: row => row.questionsCount,
      grow: 1,
    },
    {
      name: 'تعداد دانش آموزان',
      selector: row => row.studentsCount,
      grow: 1,
    },
  ];

  const handleOp = idx => {
    props.setSelectedQuiz(props.quizzes[idx]);
    toggleShowOpPopUp();
  };

  return (
    <View>
      {showOpPopUp && (
        <Ops
          quiz={props.selectedQuiz}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          removeQuiz={props.removeQuiz}
          updateQuiz={props.updateQuiz}
          setMode={props.setMode}
        />
      )}
      <CommonWebBox
        child={
          <View>
            <TextIcon
              onPress={() => changeMode('create')}
              theme={'rect'}
              text={translator.quizzes}
              icon={faPlus}
            />
            <CommonDataTable
              columns={columns}
              data={props.quizzes}
              setData={props.setQuizzes}
              handleOp={handleOp}
              token={props.token}
              setLoading={props.setLoading}
              removeUrl={routes.removeIRYSCQuiz}
            />
          </View>
        }
      />
    </View>
  );
};

export default List;
