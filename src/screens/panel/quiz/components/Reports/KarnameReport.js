import React, {useState} from 'react';
import {CommonWebBox} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {quizContext, dispatchQuizContext} from '../Context';

function KarnameReport() {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [columns, setColumns] = useState();

  React.useEffect(() => {
    const tmp = [];
    tmp.push({
      name: 'نام ',
      selector: row => row.name,
      grow: 2,
      fontSize: 10,
    });
    tmp.push({
      name: 'شهر',
      selector: row => row.city,
      grow: 1,
      size: 10,
    });
    tmp.push({
      name: 'استان',
      selector: row => row.state,
      grow: 1,
      fontSize: 10,
    });
    tmp.push({
      name: 'مدرسه',
      selector: row => row.school,
      grow: 1,
      fontSize: 10,
    });
    if (state.selectedQuiz.karnameReport.length > 0) {
      state.selectedQuiz.karnameReport[0].lessonsStats.forEach(
        (elem, index) => {
          tmp.push({
            name: elem.name,
            selector: row => row.lessonsStats[index].percent,
            grow: 1,
            fontSize: 10,
          });
        },
      );
    }
    tmp.push({
      name: 'تراز کل',
      selector: row => row.taraz,
      minWidth: '70px',
      maxWidth: '70px',
      center: true,
    });
    tmp.push({
      name: 'رتبه در شهر',
      selector: row => row.cityRank,
      minWidth: '70px',
      maxWidth: '70px',
      center: true,
    });
    tmp.push({
      name: 'رتبه در استان',
      selector: row => row.stateRank,
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
  }, [state.selectedQuiz.karnameReport]);

  return (
    <CommonWebBox>
      {columns !== undefined && (
        <CommonDataTable
          columns={columns}
          show_row_no={false}
          pagination={false}
          groupOps={[]}
          data={state.selectedQuiz.karnameReport}
        />
      )}
    </CommonWebBox>
  );
}

export default KarnameReport;
