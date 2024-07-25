import React, {useMemo, useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import {Translator} from './Translator';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {useEffectOnce} from 'usehooks-ts';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import columns from './columns';
import {showSuccess} from '../../../../services/Utility';
import Filter from './Filter';
import StudentCard from '../../../../components/web/StudentCard';

function MyTeachRequests(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [selectedRequest, setSelectedRequest] = useState();
  const [data, setData] = useState();
  const [showOp, setShowOp] = useState(false);
  const [requests, setRequests] = useState();
  const initFilter = useMemo(() => {
    return {
      expireMode: 'active',
      statusMode: 'pending',
    };
  }, []);

  const fetchData = React.useCallback(() => {
    const params = new URLSearchParams();
    params.append('statusMode', initFilter.statusMode);
    params.append('expireMode', initFilter.expireMode);
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.getTeachRequests + '?' + params.toString(),
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setData(res[0]);
      const tmp = [];
      res[0].forEach(element => {
        element.requests.forEach(itr => {
          tmp.push({
            id: element.id,
            start: element.start,
            teachMode: element.teachMode,
            requestCounts: element.requestCounts,
            minCap: element.minCap,
            maxCap: element.maxCap,
            title: element.title,
            request: itr,
          });
        });
      });
      setRequests(tmp);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectOnce(() => {
    fetchData();
  });

  const handleOp = React.useCallback((idx, row) => {
    setSelectedRequest(row);
    setShowOp(true);
  }, []);

  const resetData = React.useCallback(
    newStatus => {
      showSuccess();
      setShowOp(false);
      const tmp = [];
      data.forEach(element => {
        element.requests.forEach(itr => {
          if (
            element.id !== selectedRequest.id ||
            itr.student.id !== selectedRequest.request.student.id
          ) {
            tmp.push({
              id: element.id,
              start: element.start,
              teachMode: element.teachMode,
              requestCounts: element.requestCounts,
              minCap: element.minCap,
              maxCap: element.maxCap,
              title: element.title,
              request: itr,
            });
          } else {
            tmp.push({
              id: element.id,
              start: element.start,
              teachMode: element.teachMode,
              requestCounts: element.requestCounts,
              minCap: element.minCap,
              maxCap: element.maxCap,
              title: element.title,
              request: {
                status: newStatus,
                student: itr.student,
                createdAt: itr.createdAt,
                answerAt: itr.answerAt,
                expireAt: itr.expireAt,
              },
            });
          }
        });
      });
      setRequests(tmp);
      setSelectedRequest(undefined);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [data, selectedRequest],
  );

  return (
    <>
      {!showOp && (
        <CommonWebBox header={Translator.requests}>
          <Filter
            setLoading={newStatus => dispatch({loading: newStatus})}
            token={state.token}
            initFilter={initFilter}
            setData={setData}
            setRequests={setRequests}
          />
          {requests && (
            <CommonDataTable
              handleOp={handleOp}
              columns={columns}
              data={requests}
            />
          )}
        </CommonWebBox>
      )}
      {showOp && (
        <CommonWebBox
          backBtn={true}
          onBackClick={() => {
            setShowOp(false);
            setSelectedRequest(undefined);
          }}
          header={Translator.detail}>
          <StudentCard width={200} std={selectedRequest.request} />
          <PhoneView style={{gap: '10px'}}>
            {selectedRequest.request.status === 'pending' &&
              selectedRequest.request.canChangeStatue && (
                <>
                  <CommonButton
                    onPress={async () => {
                      dispatch({loading: true});
                      const res = await generalRequest(
                        routes.setRequestStatus +
                          selectedRequest.id +
                          '/' +
                          selectedRequest.request.student.id +
                          '?status=true',
                        'put',
                        undefined,
                        undefined,
                        state.token,
                      );
                      dispatch({loading: false});
                      if (res !== null) resetData('accept');
                    }}
                    theme={'transparent'}
                    title={Translator.accept}
                  />
                  <CommonButton
                    onPress={async () => {
                      dispatch({loading: true});
                      const res = await generalRequest(
                        routes.setRequestStatus +
                          selectedRequest.id +
                          '/' +
                          selectedRequest.request.student.id +
                          '?status=false',
                        'put',
                        undefined,
                        undefined,
                        state.token,
                      );
                      dispatch({loading: false});
                      if (res !== null) resetData('reject');
                    }}
                    theme={'transparent'}
                    title={Translator.reject}
                  />
                  <CommonButton
                    onPress={() =>
                      window.open(
                        'studentEducationalHistory/' +
                          selectedRequest.request.student.id,
                      )
                    }
                    theme={'transparent'}
                    title={'مشاهده سوابق تحصیلی دانش آموز'}
                  />
                </>
              )}
          </PhoneView>
        </CommonWebBox>
      )}
    </>
  );
}

export default MyTeachRequests;
