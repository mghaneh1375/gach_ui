import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import {CommonWebBox} from '@/styles';
import CommonDataTable from '@/styles/common/CommonDataTable';
import {useCallback, useContext, useMemo, useState} from 'react';
import {useNavigate} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';

function Missed() {
  const navigate = useNavigate();
  const useGlobalState = () => [
    useContext(globalStateContext),
    useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();

  const fetchData = useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(routes.findMissed, 'get', undefined, 'data', state.token),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] !== null) setData(res[0]);
      else navigate('/');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.token]);

  useEffectOnce(() => {
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        name: 'نام دوره',
        selector: row => row.contentTitle,
        grow: 1,
      },
      {
        name: 'نام فصل',
        selector: row => row.sessionTitle,
        grow: 1,
      },
      {
        name: 'فایلهای پیوست جامانده',
        selector: row =>
          row.missedAttaches && row.missedAttaches != null
            ? row.missedAttaches.join(' - ')
            : '',
        grow: 1,
      },
      {
        name: 'آیا ویدیو چانک شده است',
        selector: row => (row.isChunked ? 'بله' : 'خیر'),
        grow: 1,
      },
      {
        name: 'آیا ویدیو جامانده است',
        selector: row => (row.isVideoMissed ? 'بله' : 'خیر'),
        grow: 1,
      },
    ],
    [],
  );

  return (
    <>
      <CommonWebBox header={'گزارش خرابی‌های محتواهای آموزشی'}>
        {data && (
          <CommonDataTable
            data={data}
            columns={columns}
            pagination={false}
            excel={false}
          />
        )}
      </CommonWebBox>
    </>
  );
}

export default Missed;
