import React, {useMemo, useState} from 'react';
import commonTranslator from '../../../translator/Common';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import JustBottomBorderSelect from '../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderDatePicker from '../../../styles/Common/JustBottomBorderDatePicker';
import CommonDataTable from '../../../styles/Common/CommonDataTable';
import {aboutMeColumns} from './TableStructure';
import {LargePopUp} from '../../../styles/Common/PopUp';
import {useEffectOnce} from 'usehooks-ts';
import {showSuccess} from '../../../services/Utility';

function CommentsAboutMe(props) {
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
  });

  const [sectionValues] = useMemo(
    () => [
      [
        {id: 'all', item: commonTranslator.all},
        {id: 'teach', item: commonTranslator.teach},
        {id: 'content', item: commonTranslator.contents},
        {id: 'advice', item: commonTranslator.advisor},
      ],
    ],
    [],
  );
  const handleOp = (idx, row) => {
    setShowOp(true);
    setSelectedRow(row);
  };

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    const query = new URLSearchParams();
    if (filter.section !== 'all') query.append('section', filter.section);
    if (filter.from) query.append('from', filter.from);
    if (filter.to) query.append('to', filter.to);

    Promise.all([
      generalRequest(
        routes.getCommentsAboutMe + '?' + query.toString(),
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});

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
      <PhoneView style={{gap: '10px'}}>
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
          handleOp={handleOp}
          paginate={false}
          data={comments}
          columns={aboutMeColumns}
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
          <PhoneView style={{gap: '10px'}}>
            <CommonButton
              theme={'transparent'}
              title={
                selectedRow.marked
                  ? 'عدم انتخاب به عنوان منتخب'
                  : 'انتخاب به عنوان نظر منتخب'
              }
              onPress={async () => {
                dispatch({loading: true});
                const res = await generalRequest(
                  routes.toggleCommentMarkedStatus + selectedRow.id,
                  'put',
                  undefined,
                  undefined,
                  state.token,
                );
                dispatch({loading: false});
                if (res != null) {
                  setComments(
                    comments.map(e => {
                      if (e.id === selectedRow.id)
                        e.marked = !selectedRow.marked;
                      return e;
                    }),
                  );
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

export default CommentsAboutMe;
