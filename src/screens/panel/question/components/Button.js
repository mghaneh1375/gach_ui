import {useState} from 'react';
import {CommonButton, PhoneView, MyView} from '../../../../styles/Common';
import commonTranslator from '../../../../translator/Common';
import {filter} from './Utility';

function Button(props) {
  const [criticalThresh, setCriticalThresh] = useState();
  const [grade, setGrade] = useState();
  const [lesson, setLesson] = useState();
  const [lessons, setLessons] = useState();
  const [organizationCode, setOrganizationCode] = useState();
  const [justCriticals, setJustCriticals] = useState(false);

  return (
    <PhoneView>
      <CommonButton
        dir={'rtl'}
        onPress={async () => {
          //   props.setLoading(true);
          let res = await filter(
            props.token,
            grade,
            lesson,
            undefined,
            organizationCode,
            criticalThresh,
            justCriticals,
          );
          console.log(props.token);
          //   props.setLoading(false);
          if (res !== null) props.setData(res);
          props.setMode('detail');
        }}
        theme={'transparent'}
        title={commonTranslator.seeInfo}
      />
    </PhoneView>
  );
}

export default Button;
