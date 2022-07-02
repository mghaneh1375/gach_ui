import DataTable from 'react-data-table-component';

const CommonDataTable = props => {
  props.columns.splice(0, 0, {
    name: 'ردیف',
    // grow: 1,
  });

  props.columns.splice(1, 0, {
    name: 'عملیات',
    style: {
      cursor: 'pointer',
    },
    cell: (row, index, column, id) => {
      return <p onClick={() => props.handleOp(index)}>...</p>;
    },
    ignoreRowClick: true,
    // grow: 1,
  });

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
  return (
    <DataTable
      customStyles={customStyles}
      columns={props.columns}
      data={props.data}
      selectableRows
    />
  );
};

export default CommonDataTable;
