import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {CommonWebBox} from '../../../../styles/Common';
import {TextIcon} from '../../../../styles/Common/TextIcon';
import translator from '../Translator';
import DataTable from 'react-data-table-component';
import {convertTimestamp} from '../../../../services/Utility';

const List = props => {
  const changeMode = newMode => {
    props.setMode(newMode);
  };

  const columns = [
    {
      name: 'ردیف',
      grow: 1,
    },
    {
      name: 'عملیات',
      style: {
        cursor: 'pointer',
      },
      cell: (row, index, column, id) => {
        return <p onClick={() => handleOp(index)}>...</p>;
      },
      ignoreRowClick: true,
      grow: 1,
    },
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
        minWidth: 200,
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
        minWidth: 200,
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
  const customStyles = {
    rows: {
      style: {
        fontFamily: 'IRANSans',
      },
    },
    headCells: {
      style: {
        fontFamily: 'IRANSans',
      },
    },
    cells: {
      style: {
        fontFamily: 'IRANSans',
      },
    },
  };

  const handleOp = idx => {
    props.setSelectedQuiz(props.quizes[idx]);
    props.toggleShowOpPopUp();
  };

  return (
    <CommonWebBox
      child={
        <View>
          <TextIcon
            onPress={() => changeMode('create')}
            theme={'rect'}
            text={translator.quizes}
            icon={faPlus}
          />
          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={props.quizes}
            selectableRows
          />
        </View>
      }
    />
  );
};

export default List;
