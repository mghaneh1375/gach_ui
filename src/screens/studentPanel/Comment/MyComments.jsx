import React, {useMemo, useState} from 'react';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import commonTranslator from '@/translator/common';
import {generalRequest} from '@/api/utility';
import {routes} from '@/api/apiRoutes';
import {useEffectOnce} from 'usehooks-ts';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '@/styles/CommonComponents.jsx';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect.jsx';
import JustBottomBorderDatePicker from '@/styles/common/JustBottomBorderDatePicker.jsx';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import columns from './tableStructure';
import {showSuccess} from '@/services/utility';
function MyComments(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [comments, setComments] = useState();
  const [showOp, setShowOp] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [filter, setFilter] = useState({
    section: 'all',
    status: 'all',
  });
  const [sectionValues, statusValues] = useMemo(
    () => [
      [
        {
          id: 'all',
          item: commonTranslator.all,
        },
        {
          id: 'teach',
          item: commonTranslator.teach,
        },
        {
          id: 'content',
          item: commonTranslator.contents,
        },
        {
          id: 'advice',
          item: commonTranslator.advisor,
        },
      ],
      [
        {
          id: 'all',
          item: commonTranslator.all,
        },
        {
          id: 'pending',
          item: commonTranslator.pending,
        },
        {
          id: 'accept',
          item: commonTranslator.accepted,
        },
        {
          id: 'reject',
          item: commonTranslator.rejected,
        },
      ],
    ],
    [],
  );
  const handleOp = (idx, row) => {
    setShowOp(true);
    setSelectedRow(row);
  };
  const fetchData = React.useCallback(() => {
    dispatch({
      loading: true,
    });
    const query = new URLSearchParams();
    if (filter.section !== 'all') query.append('section', filter.section);
    if (filter.status !== 'all') query.append('status', filter.status);
    if (filter.from) query.append('from', filter.from);
    if (filter.to) query.append('to', filter.to);
    Promise.all([
      generalRequest(
        routes.getMyComments + '?' + query.toString(),
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setComments(res[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  useEffectOnce(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CommonWebBox>
      <PhoneView
        style={{
          gap: '10px',
        }}>
        <JustBottomBorderSelect
          values={statusValues}
          setter={val =>
            setFilter(prevValues => ({
              ...prevValues,
              status: val,
            }))
          }
          value={
            filter.status
              ? statusValues.find(elem => elem.id === filter.status)
              : undefined
          }
          placeholder={commonTranslator.status}
          subText={commonTranslator.status}
        />
        <JustBottomBorderSelect
          values={sectionValues}
          setter={val =>
            setFilter(prevValues => ({
              ...prevValues,
              section: val,
            }))
          }
          value={
            filter.section
              ? sectionValues.find(elem => elem.id === filter.section)
              : undefined
          }
          placeholder={'بخش'}
          subText={'بخش'}
        />
        <JustBottomBorderDatePicker
          value={filter.from}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              from: e,
            }))
          }
          placeholder={commonTranslator.from}
          subText={commonTranslator.from}
        />
        <JustBottomBorderDatePicker
          value={filter.to}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              to: e,
            }))
          }
          placeholder={commonTranslator.to}
          subText={commonTranslator.to}
        />
      </PhoneView>
      <CommonButton
        theme={'dark'}
        title={commonTranslator.confirm}
        onPress={() => fetchData()}
      />

      {comments && (
        <CommonDataTable
          excel={false}
          handleOp={handleOp}
          paginate={false}
          data={comments}
          columns={columns}
        />
      )}

      {showOp && selectedRow && (
        <LargePopUp
          title={commonTranslator.detail}
          toggleShowPopUp={() => {
            setShowOp(false);
            setSelectedRow(undefined);
          }}>
          <SimpleText text={selectedRow.comment} />
          <PhoneView
            style={{
              gap: '10px',
            }}>
            <CommonButton
              theme={'transparent'}
              title={commonTranslator.delete}
              onPress={async () => {
                dispatch({
                  loading: true,
                });
                const res = await generalRequest(
                  routes.removeMyComment + selectedRow.id,
                  'delete',
                  undefined,
                  undefined,
                  state.token,
                );
                dispatch({
                  loading: false,
                });
                if (res != null) {
                  setComments(comments.filter(e => e.id !== selectedRow.id));
                  setSelectedRow(undefined);
                  setShowOp(false);
                  showSuccess();
                }
              }}
            />
          </PhoneView>
        </LargePopUp>
      )}
    </CommonWebBox>
  );
}
export default MyComments;
