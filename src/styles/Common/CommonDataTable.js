import React, {useReducer, useState} from 'react';
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

  const [res, setRes] = useState();
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showRemovePopUp, setShowRemovePopUp] = useState(false);
  const [selectedOp, setSelectedOp] = useState();

  const columns = [
    {
      name: 'ردیف',
      cell: (row, index, column, id) => {
        return <p>{index + 1}</p>;
      },
    },
    props.handleOp !== undefined
      ? {
          name: commonTranslator.operation,
          style: {
            cursor: 'pointer',
          },
          cell: (row, index, column, id) => {
            return <p onClick={() => props.handleOp(index)}>...</p>;
          },
          ignoreRowClick: true,
        }
      : {},
    ...props.columns,
  ];

  const onChangeSelectedRows = selectedRows => {
    setSelected(selectedRows);
  };

  const changeOpSelect = e => {
    if (selected.length === 0 || e.target.value === 'none') {
      setSelectedOp(undefined);
      return;
    }

    setSelectedOp(
      state.ops.find(elem => {
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

  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };

  const initialState = {
    data: [],
    ops: undefined,
    shouldUpdateParent: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'set':
        return {...state, data: props.data};
      case 'remove':
        let data = state.data;
        let newData = data.filter(elem => {
          return res.doneIds.indexOf(elem.id) === -1;
        });
        return {...state, data: newData, shouldUpdateParent: true};
      case 'op':
        let ops = [];
        if (props.groupOps === undefined && props.removeUrl !== undefined) {
          ops = [
            {
              label: commonTranslator.deleteAll,
              url: props.removeUrl,
              key: 'removeAll',
              method: 'delete',
              warning: commonTranslator.sureRemove,
              afterFunc: res => {
                setRes(res);
              },
            },
          ];
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
                  afterFunc: res => {
                    setRes(res);
                  },
                };
              }
              break;
            }
          }
          ops = props.groupOps;
        }
        return {...state, ops: ops};
      case 'parentUpdated':
        return {...state, shouldUpdateParent: false};
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    if (props.data === undefined || props.data.length === 0) return;
    dispatch({type: 'set'});
  }, [props.data]);

  React.useEffect(() => {
    if (res === undefined) return;
    dispatch({type: 'remove'});
  }, [res]);

  React.useEffect(() => {
    if (!state.shouldUpdateParent || props.setData === undefined) return;

    props.setData(state.data);
    dispatch({type: 'parentUpdated'});
  }, [props, state.data, state.shouldUpdateParent]);

  React.useEffect(() => {
    dispatch({type: 'op'});
  }, [props.groupOps, props.removeUrl]);

  return (
    <View>
      {showRemovePopUp &&
        selectedOp !== undefined &&
        props.token !== undefined && (
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

        {state.ops !== undefined &&
          state.ops.map((elem, index) => {
            return (
              <option key={index} value={elem.key}>
                {elem.label + ' (' + selected.length + ')'}
              </option>
            );
          })}
      </select>
      <DataTable
        pagination
        customStyles={customStyles}
        columns={columns}
        data={state.data}
        selectableRows={true}
        highlightOnHover={true}
        persistTableHead={true}
        onSelectedRowsChange={
          props.onRowSelect === undefined
            ? ({selectedRows}) => onChangeSelectedRows(selectedRows)
            : ({selectedRows}) => props.onRowSelect(selectedRows)
        }
        clearSelectedRows={toggledClearRows}
      />
    </View>
  );
};

export default CommonDataTable;
