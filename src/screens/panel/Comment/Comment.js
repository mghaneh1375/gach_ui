import React, {useCallback, useMemo, useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {LargePopUp} from '../../../styles/Common/PopUp';
import {useEffectOnce} from 'usehooks-ts';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import JustBottomBorderSelect from '../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../translator/Common';
import {showSuccess} from '../../../services/Utility';
import CommonDataTable from '../../../styles/Common/CommonDataTable';
import columns from './TableStructure';
import JustBottomBorderDatePicker from '../../../styles/Common/JustBottomBorderDatePicker';
import vars from '../../../styles/root';

function Comment(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [pageIndex, setPageIndex] = useState(1);
  const [comments, setComments] = useState();
  const [showOp, setShowOp] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [contents, setContents] = useState();
  const [teachers, setTeachers] = useState();
  const [totalCount, setTotalCount] = useState();
  const [perPage, setPerPage] = useState();
  const [firstFetch, setFirstFetch] = useState(true);
  const [filter, setFilter] = useState({
    section: 'all',
    status: 'pending',
    justTop: false,
    refId: 'all',
  });

  const [sectionValues, statusValues, justTopValues] = useMemo(
    () => [
      [
        {id: 'all', item: commonTranslator.all},
        {id: 'teach', item: commonTranslator.teach},
        {id: 'content', item: commonTranslator.contents},
        {id: 'advisor', item: commonTranslator.advisor},
      ],
      [
        {id: 'all', item: commonTranslator.all},
        {id: 'pending', item: commonTranslator.pending},
        {id: 'accept', item: commonTranslator.accepted},
        {id: 'reject', item: commonTranslator.rejected},
      ],
      [
        {id: false, item: commonTranslator.all},
        {id: true, item: 'تنها برترین\u200cها'},
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
    if (filter.status !== 'all') query.append('status', filter.status);
    if (filter.from) query.append('from', filter.from);
    if (filter.to) query.append('to', filter.to);
    if (filter.refId && filter.refId !== 'all')
      query.append('refId', filter.refId);
    if (filter.justTop) query.append('justTop', true);
    query.append('pageIndex', pageIndex);

    Promise.all(
      contents === undefined
        ? [
            generalRequest(
              routes.getAllComments + '?' + query.toString(),
              'get',
              undefined,
              'data',
              state.token,
            ),
            generalRequest(
              routes.getCommentsCount + '?' + query.toString(),
              'get',
              undefined,
              'data',
              state.token,
            ),
            generalRequest(
              routes.getAllTeachersDigest,
              'get',
              undefined,
              'data',
              state.token,
            ),
            generalRequest(
              routes.fetchContentDigests,
              'get',
              undefined,
              'data',
              state.token,
            ),
          ]
        : [
            generalRequest(
              routes.getAllComments + '?' + query.toString(),
              'get',
              undefined,
              'data',
              state.token,
            ),
            generalRequest(
              routes.getCommentsCount + '?' + query.toString(),
              'get',
              undefined,
              'data',
              state.token,
            ),
          ],
    ).then(res => {
      dispatch({loading: false});

      if (res[0] == null || res[1] === null) {
        navigate('/');
        return;
      }

      setComments(res[0].comments);
      setTotalCount(res[1].count);
      setPerPage(res[1].perPage);
      if (res.length > 2 && res[2] !== null) {
        setTeachers([
          {id: 'all', item: commonTranslator.all},
          ...res[2].map(e => ({id: e.id, item: e.name})),
        ]);
        setContents([
          {id: 'all', item: commonTranslator.all},
          ...res[3].map(e => ({id: e.id, item: e.title})),
        ]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchWantedPage = React.useCallback(() => {
    dispatch({loading: true});
    const query = new URLSearchParams();
    if (filter.section !== 'all') query.append('section', filter.section);
    if (filter.status !== 'all') query.append('status', filter.status);
    if (filter.from) query.append('from', filter.from);
    if (filter.to) query.append('to', filter.to);
    if (filter.refId && filter.refId !== 'all')
      query.append('refId', filter.refId);
    if (filter.justTop) query.append('justTop', true);
    query.append('pageIndex', pageIndex);

    Promise.all([
      generalRequest(
        routes.getAllComments + '?' + query.toString(),
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

      setComments(res[0].comments);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, pageIndex]);

  useEffectOnce(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (pageIndex === undefined) return;
    if (firstFetch) {
      setFirstFetch(false);
      return;
    }
    fetchWantedPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  const setStatus = useCallback(
    newStatus => {
      dispatch({loading: true});
      Promise.all([
        generalRequest(
          routes.setCommentStatus +
            selectedRow.id +
            '?status=' +
            (newStatus === 'accept'),
          'put',
          undefined,
          undefined,
          state.token,
        ),
      ]).then(res => {
        dispatch({loading: false});
        if (res[0] != null) {
          showSuccess();
          if (
            (filter.status === 'accept' && newStatus === 'reject') ||
            (filter.status === 'reject' && newStatus === 'accept')
          )
            setComments(comments.filter(e => e.id !== selectedRow.id));
          else
            setComments(
              comments.map(e => {
                if (e.id === selectedRow.id) e.status = newStatus;
                return e;
              }),
            );
          setSelectedRow(undefined);
          setShowOp(false);
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedRow],
  );

  const toggleIsTop = useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.toggleTopStatus + selectedRow.id,
        'put',
        undefined,
        undefined,
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] != null) {
        setComments(
          comments.map(e => {
            if (e.id === selectedRow.id) e.isTop = !selectedRow.isTop;
            return e;
          }),
        );
        showSuccess();
        setSelectedRow(undefined);
        setShowOp(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRow]);

  const drawPaginate = () => {
    const tmp = Math.ceil(totalCount / perPage);
    const elems = [];
    for (let i = 1; i <= tmp; i++)
      elems.push(
        <SimpleText
          key={i}
          onPress={() => {
            setPageIndex(i);
          }}
          text={i}
          style={{
            color: i == pageIndex ? 'red' : vars.DARK_BLUE,
            cursor: 'pointer',
            fontSize: '16px',
          }}
        />,
      );

    return elems;
  };

  return (
    <>
      <CommonWebBox>
        <PhoneView style={{gap: '10px'}}>
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
          <JustBottomBorderSelect
            values={justTopValues}
            setter={val =>
              setFilter(prevValues => ({
                ...prevValues,
                justTop: val,
              }))
            }
            value={justTopValues.find(elem => elem.id === filter.justTop)}
            placeholder={'وضعیت برترین'}
            subText={'وضعیت برترین'}
          />
          {(filter.section === 'teach' || filter.section === 'advisor') && (
            <JustBottomBorderSelect
              values={teachers}
              setter={val =>
                setFilter(prevValues => ({
                  ...prevValues,
                  refId: val,
                }))
              }
              value={
                filter.refId
                  ? teachers.find(elem => elem.id === filter.refId)
                  : undefined
              }
              placeholder={'دبیر مدنظر'}
              subText={'دبیر مدنظر'}
            />
          )}
          {filter.section === 'content' && (
            <JustBottomBorderSelect
              values={contents}
              setter={val =>
                setFilter(prevValues => ({
                  ...prevValues,
                  refId: val,
                }))
              }
              value={
                filter.refId
                  ? contents.find(elem => elem.id === filter.refId)
                  : undefined
              }
              placeholder={'دوره آموزشی مدنظر'}
              subText={'دوره آموزشی مدنظر'}
            />
          )}
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
        {totalCount !== undefined && (
          <SimpleText
            style={{fontSize: '18px', textAlign: 'center'}}
            text={'تعداد کل: ' + totalCount}
          />
        )}
        {comments && (
          <>
            <CommonDataTable
              handleOp={handleOp}
              pagination={false}
              data={comments}
              columns={columns}
            />
            <PhoneView
              style={{gap: '10px', direction: 'ltr', justifyContent: 'center'}}>
              {drawPaginate()}
            </PhoneView>
          </>
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
              {selectedRow.status !== 'accept' && (
                <CommonButton
                  theme={'transparent'}
                  title={commonTranslator.accept}
                  onPress={() => setStatus('accept')}
                />
              )}
              {selectedRow.status !== 'reject' && (
                <CommonButton
                  theme={'transparent'}
                  title={commonTranslator.reject}
                  onPress={() => setStatus('reject')}
                />
              )}
              {selectedRow.status !== 'pending' && (
                <CommonButton
                  theme={'transparent'}
                  title={
                    selectedRow.isTop
                      ? 'حذف از برترین\u200cها'
                      : 'افزودن به برترین\u200cها'
                  }
                  onPress={() => toggleIsTop()}
                />
              )}
            </PhoneView>
          </LargePopUp>
        )}
      </CommonWebBox>
    </>
  );
}

export default Comment;
