import React, {useEffect, useState} from 'react';
import {CommonWebBox, PhoneView} from '../../../../../styles/Common';
import {styles} from '../../../../../styles/Common/Styles';
import vars from '../../../../../styles/root';
import ProgressCard from '../../../‌MyOffs/ProgressCard/ProgressCard';
import {Translator} from '../../Translate';
import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import QuizItemCard from '../../../../../components/web/QuizItemCard';
import Card from './Card';

function List(props) {
  const [mode, setMode] = useState('future');
  const [schedules, setSchedules] = useState();

  const fetchClasses = React.useCallback(() => {
    props.setLoading(true);
    const params = new URLSearchParams();
    if (mode !== 'all')
      params.append('activeMode', mode === 'future' ? 'active' : 'expired');
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <CommonWebBox header={Translator.myClasses}>
      <PhoneView style={{...styles.alignSelfCenter, ...styles.marginTop20}}>
        <ProgressCard
          header={Translator.oldClassess}
          theme={vars.ORANGE}
          color={mode === 'old' ? vars.WHITE : vars.DARK_BLUE}
          width={250}
          percent={mode === 'old' ? '90%' : '10%'}
          onPress={() => {
            if (mode === 'old') return;
            setMode('old');
          }}
          style={{...styles.cursor_pointer}}
        />
        <ProgressCard
          header={Translator.futureClasses}
          theme={vars.ORANGE_RED}
          color={mode === 'future' ? vars.WHITE : vars.DARK_BLUE}
          width={250}
          percent={mode === 'future' ? '90%' : '10%'}
          onPress={() => {
            if (mode === 'future') return;
            setMode('future');
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
            return <Card plan={schedule} key={index} />;
          })}
      </PhoneView>
    </CommonWebBox>
  );
}

export default List;
