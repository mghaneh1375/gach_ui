import React, {useEffect, useState} from 'react';
import {CommonWebBox, PhoneView} from '../../../../../styles/Common';
import {styles} from '../../../../../styles/Common/Styles';
import vars from '../../../../../styles/root';
import ProgressCard from '../../../‌MyOffs/ProgressCard/ProgressCard';
import {Translator} from '../../Translate';
import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import Card from './Card';
import {showSuccess} from '../../../../../services/Utility';
import {myTeachClassesContext, dispatchMyTeachClassesContext} from './Context';

function List(props) {
  const useGlobalState = () => [
    React.useContext(myTeachClassesContext),
    React.useContext(dispatchMyTeachClassesContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [mode, setMode] = useState('active');
  const [schedules, setSchedules] = useState();

  const fetchClasses = React.useCallback(() => {
    props.setLoading(true);
    const params = new URLSearchParams();
    if (mode !== 'all') params.append('activeMode', mode);
    Promise.all([
      generalRequest(
        routes.getMyTeachSchedules + '?' + params.toString(),
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setSchedules(res[0]);
      let myClassesTmp = state.myClasses;
      myClassesTmp[mode] = schedules;
      dispatch({myClasses: myClassesTmp});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    if (state.myClasses?.mode === undefined) fetchClasses();
    else setSchedules(state.myClasses.mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.myClasses, mode]);

  return (
    <CommonWebBox header={Translator.myClasses}>
      <PhoneView style={{...styles.alignSelfCenter, ...styles.marginTop20}}>
        <ProgressCard
          header={Translator.oldClassess}
          theme={vars.ORANGE}
          color={mode === 'expired' ? vars.WHITE : vars.DARK_BLUE}
          width={250}
          percent={mode === 'expired' ? '90%' : '10%'}
          onPress={() => {
            if (mode === 'expired') return;
            setMode('expired');
          }}
          style={{...styles.cursor_pointer}}
        />
        <ProgressCard
          header={Translator.notStartClasses}
          theme={vars.ORANGE_RED}
          color={mode === 'not_start' ? vars.WHITE : vars.DARK_BLUE}
          width={250}
          percent={mode === 'not_start' ? '90%' : '10%'}
          onPress={() => {
            if (mode === 'not_start') return;
            setMode('not_start');
          }}
          style={{...styles.cursor_pointer}}
        />
        <ProgressCard
          header={Translator.activeClasses}
          theme={vars.GREEN}
          color={mode === 'active' ? vars.WHITE : vars.DARK_BLUE}
          width={250}
          percent={mode === 'active' ? '90%' : '10%'}
          onPress={() => {
            if (mode === 'active') return;
            setMode('active');
          }}
          style={{...styles.cursor_pointer}}
        />
        <ProgressCard
          header={Translator.allClasses}
          theme={vars.DARK_BLUE}
          color={mode === 'all' ? vars.WHITE : vars.DARK_BLUE}
          width={250}
          percent={mode === 'all' ? '90%' : '10%'}
          onPress={() => {
            if (mode === 'all') return;
            setMode('all');
          }}
          style={{...styles.cursor_pointer}}
        />
      </PhoneView>
      <PhoneView style={{gap: '10px'}}>
        {schedules &&
          schedules.map((schedule, index) => {
            return (
              <Card
                onWriteComment={async desc => {
                  props.setLoading(true);
                  const res = await generalRequest(
                    routes.writeComments + schedule.teacher.id + '/teach',
                    'post',
                    {comment: desc},
                    undefined,
                    props.token,
                  );
                  props.setLoading(false);
                  if (res !== null)
                    showSuccess(
                      'نظر شما با موفقیت ثبت گردید و بعد از تایید ادمین نمایش داده خواهد شد',
                    );
                }}
                onReportClick={() => {
                  dispatch({selectedScheduleId: schedule.id});
                  props.setMode('report');
                }}
                onChangeRate={async rate => {
                  props.setLoading(true);
                  const res = await generalRequest(
                    routes.rateToTeachSchedules + schedule.id + '?rate=' + rate,
                    'put',
                    undefined,
                    undefined,
                    props.token,
                  );
                  props.setLoading(false);
                  if (res != null) {
                    showSuccess();
                    setSchedules(
                      schedules.map(e => {
                        if (e.id !== schedule.id) return e;
                        e.rate = rate;
                        return e;
                      }),
                    );
                  }
                }}
                plan={schedule}
                key={index}
              />
            );
          })}
      </PhoneView>
    </CommonWebBox>
  );
}

export default List;
