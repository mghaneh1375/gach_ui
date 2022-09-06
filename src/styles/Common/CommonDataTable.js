import React, {useReducer, useState} from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import ConfirmationBatchOpPane from '../../components/web/ConfirmationBatchOpPane';
import {showSuccess} from '../../services/Utility';
import commonTranslator from '../../translator/Common';
import {MyView} from '../Common';

const CommonDataTable = props => {
  const customStyles = {
    rows: {
      style: {
        fontFamily: 'IRANSans',
        zIndex: 'unset',
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
    data: undefined,
    ops: undefined,
    shouldUpdateParent: false,
    handleOpRender: false,
    currentPage: 1,
    perPage: 10,
    columns: [],
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'set':
        if (
          action.data === undefined ||
          (action.data.length === 0 &&
            (state.data === undefined || state.data.length === 0))
        )
          return {...state, data: []};

        return {...state, data: [], handleOpRender: true, tmpData: action.data};

      case 'updateData':
        return {...state, data: state.tmpData};

      case 'renderCols':
        let columns = [];

        if (props.show_row_no === undefined || props.show_row_no) {
          columns[0] = {
            name: 'ردیف',
            cell: (row, index, column, id) => {
              return (
                <p>{(state.currentPage - 1) * state.perPage + index + 1}</p>
              );
            },
            minWidth: '40px',
            maxWidth: '40px',
            center: true,
          };
        }

        if (props.handleOp !== undefined)
          columns[columns.length === 0 ? 0 : columns.length] = {
            name: commonTranslator.operation,
            style: {
              cursor: 'pointer',
            },
            cell: (row, index, column, id) => {
              return (
                <p
                  className="opCol"
                  onClick={() =>
                    props.handleOp(
                      (state.currentPage - 1) * state.perPage + index,
                    )
                  }>
                  ...
                </p>
              );
            },
            minWidth: '70px',
            maxWidth: '70px',
            center: true,
            ignoreRowClick: true,
          };

        columns = [...columns, ...props.columns];

        columns.map(elem => {
          elem.wrap = true;
          return elem;
        });
        return {...state, columns: columns};

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
                  url: props.groupOps[i].url,
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
      case 'changeCurrPage':
        return {...state, currentPage: action.page};
      case 'changePerPage':
        return {...state, perPage: action.perPage, currentPage: action.page};
      case 'parentUpdated':
        return {...state, shouldUpdateParent: false};
      default:
        return {...state};
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    if (props.data === undefined) return;
    dispatch({type: 'set', data: props.data});
  }, [props.data]);

  React.useEffect(() => {
    if (state.tmpData === undefined) return;
    dispatch({type: 'updateData'});
  }, [state.tmpData]);

  React.useEffect(() => {
    if (state.handleOpRender === undefined || state.handleOpRender) return;
    dispatch({type: 'op'});
  }, [state.handleOpRender]);

  React.useEffect(() => {
    dispatch({type: 'renderCols'});
  }, [state.currentPage, state.perPage]);

  React.useEffect(() => {
    if (res === undefined) return;
    dispatch({type: 'remove'});
  }, [res]);

  React.useEffect(() => {
    if (!state.shouldUpdateParent || props.setData === undefined) return;

    props.setData(state.data);
    dispatch({type: 'parentUpdated'});
  }, [props, state.data, state.shouldUpdateParent]);

  // React.useEffect(() => {
  //   dispatch({type: 'op'});
  // }, [props.groupOps, props.removeUrl]);

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    rowsPerPageText: 'نمایش در هر صفحه',
    selectAllRowsItemText: 'همه',
  };

  return (
    <MyView>
      {showRemovePopUp &&
        state.ops !== undefined &&
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
      {state.ops !== undefined && state.ops.length > 0 && (
        <select
          value={selectedOp === undefined ? 'none' : selectedOp.key}
          onChange={e => changeOpSelect(e)}
          style={{
            alignSelf: 'flex-end',
            marginBottom: 10,
            color: '#202020',
            fontFamily: 'IRANSans',
          }}>
          <option value="none">
            {commonTranslator.op + ' (' + selected.length + ')'}
          </option>

          {state.ops.map((elem, index) => {
            return (
              <option key={index} value={elem.key}>
                {elem.label + ' (' + selected.length + ')'}
              </option>
            );
          })}
        </select>
      )}
      {state.data !== undefined && (
        // <DataTableExtensions
        //   filter={false}
        //   exportHeaders={true}
        //   print={false}
        //   export={true}>
        <DataTable
          columns={state.columns}
          data={state.data}
          pagination={
            props.pagination === undefined || props.pagination ? true : false
          }
          paginationComponentOptions={paginationComponentOptions}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          customStyles={customStyles}
          selectableRows={
            (state.ops !== undefined && state.ops.length > 0) ||
            props.onRowSelect !== undefined
          }
          persistTableHead={true}
          onSelectedRowsChange={
            props.onRowSelect === undefined
              ? ({selectedRows}) => onChangeSelectedRows(selectedRows)
              : ({selectedRows}) => props.onRowSelect(selectedRows)
          }
          clearSelectedRows={toggledClearRows}
          conditionalRowStyles={props.conditionalRowStyles}
          onChangePage={page => {
            dispatch({type: 'changeCurrPage', page: page});
          }}
          onChangeRowsPerPage={(perPage, page) => {
            dispatch({type: 'changePerPage', perPage: perPage, page: page});
          }}
        />
        // </DataTableExtensions>
      )}
    </MyView>
  );
};

export default CommonDataTable;
