import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import {View} from 'react-native';
import RemovePane from '../../components/web/RemovePane';
import {showSuccess} from '../../services/Utility';
import commonTranslator from '../../tranlates/Common';

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

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(props.data);
  const [showRemovePopUp, setShowRemovePopUp] = useState(false);

  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const onChangeSelectedRows = selectedRows => {
    setSelected(selectedRows);
  };

  const changeOpSelect = e => {
    if (selected.length === 0) return;
    if (e.target.value === 'remove') {
      toggleShowRemovePopUp();
    }
  };

  const toggleShowRemovePopUp = () => {
    setShowRemovePopUp(!showRemovePopUp);
  };

  const afterRemove = res => {
    toggleShowRemovePopUp();
    showSuccess(res.excepts);
    let newData = data.filter(elem => {
      return res.removedIds.indexOf(elem.id) === -1;
    });

    setData(newData);
    props.setData(newData);
    setSelected([]);
  };

  return (
    <View>
      {showRemovePopUp && (
        <RemovePane
          setLoading={props.setLoading}
          token={props.token}
          data={{
            items: selected.map(element => {
              return element.id;
            }),
          }}
          expected={['excepts', 'removedIds']}
          afterRemoveFunc={afterRemove}
          url={props.removeUrl}
          toggleShowPopUp={toggleShowRemovePopUp}
        />
      )}
      <select
        onChange={e => changeOpSelect(e)}
        style={{alignSelf: 'flex-end', fontFamily: 'IRANSans'}}>
        <option>{commonTranslator.op + ' (' + selected.length + ')'}</option>
        {(props.ops === undefined || props.ops.indexOf('delete') !== -1) && (
          <option value={'remove'}>
            {commonTranslator.deleteAll + ' (' + selected.length + ')'}
          </option>
        )}
      </select>
      <DataTable
        customStyles={customStyles}
        columns={props.columns}
        data={data}
        selectableRows
        highlightOnHover={true}
        persistTableHead={true}
        onSelectedRowsChange={({selectedRows}) =>
          onChangeSelectedRows(selectedRows)
        }
      />
    </View>
  );
};

export default CommonDataTable;
