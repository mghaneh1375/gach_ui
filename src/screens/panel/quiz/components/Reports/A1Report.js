import {CommonWebBox} from '../../../../../styles/Common';
import React, {useState} from 'react';
import Card from '../Questions/Card';
import {quizContext, dispatchQuizContext} from '../Context';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';

function A1Report(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const columns = [
    {
      name: 'نوع سوال',
      selector: row =>
        row.kindQuestion === 'test' ? 'تستی' : row.kindQuestion,
      grow: 2,
      fontSize: 10,
    },
    {
      name: 'درجه سختی',
      selector: row => row.levelFa,
      grow: 2,
      fontSize: 10,
    },
    {
      name: 'مولف',
      selector: row => row.author,
      grow: 2,
      fontSize: 10,
    },
    {
      name: 'حیطه',
      selector: row => row.subject.name,
      grow: 2,
      fontSize: 10,
    },
    {
      name: 'نمره',
      selector: row => row.mark,
      grow: 2,
      fontSize: 10,
    },
    {
      name: 'نزده',
      selector: row => row.oldWhite,
      grow: 2,
      fontSize: 10,
    },
    {
      name: 'صحیح',
      selector: row => row.oldCorrect,
      grow: 2,
      fontSize: 10,
    },
    {
      name: 'غلط',
      selector: row => row.oldIncorrect,
      grow: 2,
      fontSize: 10,
    },
    {
      name: 'تعداد گزینه',
      selector: row => row.choicesCount,
      grow: 2,
      fontSize: 10,
    },
    {
      name: 'جواب صحیح',
      selector: row => row.answer,
      grow: 2,
      fontSize: 10,
    },
  ];

  const [state, dispatch] = useGlobalState();
  const [showType, setShowType] = useState('card');

  return (
    <CommonWebBox>
      <JustBottomBorderSelect
        isHalf={true}
        values={[
          {id: 'card', item: 'کارتی'},
          {id: 'table', item: 'جدولی'},
        ]}
        value={[
          {id: 'card', item: 'کارتی'},
          {id: 'table', item: 'جدولی'},
        ].find(elem => elem.id === showType)}
        setter={id => {
          setShowType(id);
        }}
        placeholder={'نحوه نمایش'}
        subText={'نحوه نمایش'}
      />
      {state.selectedQuiz.A1Report !== undefined &&
        showType === 'card' &&
        state.selectedQuiz.A1Report.map((element, index) => {
          return (
            <Card
              key={index}
              idx={index}
              setLoading={props.setLoading}
              token={props.token}
              question={element}
              needUpdate={false}
            />
          );
        })}
      {state.selectedQuiz.A1Report !== undefined && showType === 'table' && (
        <CommonDataTable data={state.selectedQuiz.A1Report} columns={columns} />
      )}
    </CommonWebBox>
  );
}

export default A1Report;
