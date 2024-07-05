import {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import Translate from '../../Translate';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {showSuccess} from '../../../../../services/Utility';

function GroupEdit(props) {
  const [easyPrice, setEasyPrice] = useState();
  const [midPrice, setMidPrice] = useState();
  const [hardPrice, setHarPrice] = useState();
  const [schoolEasyPrice, setSchoolEasyPrice] = useState();
  const [schoolMidPrice, setSchoolMidPrice] = useState();
  const [schoolHardPrice, setSchoolHarPrice] = useState();
  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={'ویرایش دسته جمعی'}>
      <PhoneView>
        <JustBottomBorderTextInput
          value={easyPrice}
          subText={Translate.easyPrice}
          onChangeText={e => setEasyPrice(e)}
          justNum={true}
          placeholder={Translate.easyPrice}
        />
        <JustBottomBorderTextInput
          value={midPrice}
          subText={Translate.midPrice}
          onChangeText={e => setMidPrice(e)}
          justNum={true}
          placeholder={Translate.midPrice}
        />
        <JustBottomBorderTextInput
          value={hardPrice}
          subText={Translate.hardPrice}
          onChangeText={e => setHarPrice(e)}
          justNum={true}
          placeholder={Translate.hardPrice}
        />
        <JustBottomBorderTextInput
          value={schoolEasyPrice}
          subText={Translate.schoolEasyPrice}
          onChangeText={e => setSchoolEasyPrice(e)}
          justNum={true}
          placeholder={Translate.schoolEasyPrice}
        />
        <JustBottomBorderTextInput
          value={schoolMidPrice}
          subText={Translate.schoolMidPrice}
          onChangeText={e => setSchoolMidPrice(e)}
          justNum={true}
          placeholder={Translate.schoolMidPrice}
        />
        <JustBottomBorderTextInput
          value={schoolHardPrice}
          subText={Translate.schoolHardPrice}
          onChangeText={e => setSchoolHarPrice(e)}
          justNum={true}
          placeholder={Translate.schoolHardPrice}
        />
      </PhoneView>
      <CommonButton
        onPress={async () => {
          props.setLoading(true);
          let res = await generalRequest(
            routes.updateBatchSubjects,
            'put',
            {
              midPrice: midPrice,
              hardPrice: hardPrice,
              easyPrice: easyPrice,
              schoolMidPrice: schoolMidPrice,
              schoolEasyPrice: schoolEasyPrice,
              schoolHardPrice: schoolHardPrice,
            },
            undefined,
            props.token,
          );
          props.setLoading(false);
          if (res !== null) showSuccess();
        }}
        theme={'dark'}
        title={'ویرایش'}
      />
    </CommonWebBox>
  );
}

export default GroupEdit;
