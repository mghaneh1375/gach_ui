import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import {View} from 'react-native';
import ConfirmationBatchOpPane from '../../components/web/ConfirmationBatchOpPane';
import {showSuccess} from '../../services/Utility';
import commonTranslator from '../../tranlates/Common';

const CommonDataTable = props => {
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
  const [selectedOp, setSelectedOp] = useState();

  const columns = [
    {
      name: 'ردیف',
      cell: (row, index, column, id) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      name: commonTranslator.operation,
      style: {
        cursor: 'pointer',
      },
      cell: (row, index, column, id) => {
        return <p onClick={() => props.handleOp(index)}>...</p>;
      },
      ignoreRowClick: true,
    },
    ...props.columns,
  ];

  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const onChangeSelectedRows = selectedRows => {
    setSelected(selectedRows);
  };

  const changeOpSelect = e => {
    if (selected.length === 0 || e.target.value === 'none') {
      setSelectedOp(undefined);
      return;
    }

    setSelectedOp(
      ops.find(elem => {
        return elem.key === e.target.value;
      }),
    );
    setShowRemovePopUp(true);
  };

  const toggleShowRemovePopUp = () => {
    if (showRemovePopUp) setSelectedOp(undefined);
    setShowRemovePopUp(!showRemovePopUp);
  };

  const localAfterFunc = res => {
    toggleShowRemovePopUp();
    showSuccess(res.excepts);
    selectedOp.afterFunc(res);
    setSelected([]);
    setSelectedOp(undefined);
    handleClearRows();
  };

  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  const [ops, setOps] = React.useState();

  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };

  React.useEffect(() => {
    if (ops !== undefined) return;

    const afterRemove = res => {
      let newData = data.filter(elem => {
        return res.doneIds.indexOf(elem.id) === -1;
      });

      setData(newData);
      props.setData(newData);
    };

    if (props.groupOps === undefined && props.removeUrl !== undefined) {
      setOps([
        {
          label: commonTranslator.deleteAll,
          url: props.removeUrl,
          key: 'removeAll',
          method: 'delete',
          warning: commonTranslator.sureRemove,
          afterFunc: afterRemove,
        },
      ]);
    } else if (props.groupOps !== undefined) {
      for (let i = 0; i < props.groupOps.length; i++) {
        if (props.groupOps[i].key === 'removeAll') {
          if (props.groupOps[i].afterFunc === undefined) {
            props.groupOps[i] = {
              label: commonTranslator.deleteAll,
              url: props.groupOps[i],
              key: 'removeAll',
              method: 'delete',
              warning: commonTranslator.sureRemove,
              afterFunc: afterRemove,
            };
          }
          break;
        }
      }
      setOps(props.groupOps);
    }
  }, [props, data, ops]);

  return (
    <View>
      {showRemovePopUp && selectedOp !== undefined && (
        <ConfirmationBatchOpPane
          setLoading={props.setLoading}
          token={props.token}
          data={{
            items: selected.map(element => {
              return element.id;
            }),
          }}
          expected={['excepts', 'doneIds']}
          afterFunc={localAfterFunc}
          url={selectedOp.url}
          method={selectedOp.method}
          warning={selectedOp.warning}
          toggleShowPopUp={toggleShowRemovePopUp}
        />
      )}
      <select
        value={selectedOp === undefined ? 'none' : selectedOp.key}
        onChange={e => changeOpSelect(e)}
        style={{alignSelf: 'flex-end', fontFamily: 'IRANSans'}}>
        <option value="none">
          {commonTranslator.op + ' (' + selected.length + ')'}
        </option>

        {ops !== undefined &&
          ops.map((elem, index) => {
            return (
              <option key={index} value={elem.key}>
                {elem.label + ' (' + selected.length + ')'}
              </option>
            );
          })}
      </select>
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={data}
        selectableRows
        highlightOnHover={true}
        persistTableHead={true}
        onSelectedRowsChange={({selectedRows}) =>
          onChangeSelectedRows(selectedRows)
        }
        clearSelectedRows={toggledClearRows}
      />
    </View>
  );
};

export default CommonDataTable;
