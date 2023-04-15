import React, {useState} from 'react';
import {CommonWebBox} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {quizContext} from '../Context';

function KarnameReport(props) {
  const useGlobalState = () => [React.useContext(quizContext)];

  const [state] = useGlobalState();
  const [columns, setColumns] = useState();

  React.useEffect(() => {
    const tmp = [];
    tmp.push({
      name: 'نام ',
      selector: row => row.name,
      grow: 2,
      fontSize: 10,
    });
    if (
      state.selectedQuiz !== undefined &&
      state.selectedQuiz.karnameReport.length > 0
    ) {
      state.selectedQuiz.karnameReport[0].lessonsStats.forEach(
        (elem, index) => {
          tmp.push({
            name: elem.name,
            selector: row => row.lessonsStats[index].percent,
            grow: 1,
            fontSize: 10,
            cell: d => (
              <span style={{direction: 'ltr'}}>
                {d.lessonsStats[index].percent}
              </span>
            ),
          });
        },
      );
    }
    if (props.quiz !== undefined && props.quiz.karnameReport.length > 0) {
      props.quiz.karnameReport[0].lessonsStats.forEach((elem, index) => {
        tmp.push({
          name: elem.name,
          selector: row => row.lessonsStats[index].percent,
          grow: 1,
          fontSize: 10,
          cell: d => (
            <span style={{direction: 'ltr'}}>
              {d.lessonsStats[index].percent}
            </span>
          ),
        });
      });
    }
    tmp.push({
      name: 'تراز کل',
      selector: row => row.taraz,
      minWidth: '70px',
      maxWidth: '70px',
      center: true,
    });
    tmp.push({
      name: 'رتبه در کشور',
      selector: row => row.rank,
      minWidth: '70px',
      maxWidth: '70px',
      center: true,
    });
    setColumns(tmp);
  }, [state.selectedQuiz, props.quiz]);

  return (
    <CommonWebBox>
      {columns !== undefined && (
        <CommonDataTable
          columns={columns}
          show_row_no={false}
          pagination={false}
          groupOps={[]}
          data={
            props.quiz !== undefined
              ? props.quiz.karnameReport
              : state.selectedQuiz.karnameReport
          }
        />
      )}
    </CommonWebBox>
  );
}

export default KarnameReport;
