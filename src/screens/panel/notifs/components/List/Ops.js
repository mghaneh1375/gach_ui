import {CommonButton, PhoneView} from '../../../../../styles/Common';
import {LargePopUp} from '../../../../../styles/Common/PopUp';

function Ops(props) {
  return (
    <LargePopUp title={'عملیات'} toggleShowPopUp={props.toggleShowPopUp}>
      <PhoneView>
        <CommonButton
          onPress={() => props.setMode('info')}
          dir={'rtl'}
          theme={'transparent'}
          title={'مشاهده'}
        />
        <CommonButton
          dir={'rtl'}
          theme={'transparent'}
          onPress={() => props.setMode('students')}
          title={'لیست نفرات دریافت کننده'}
        />
      </PhoneView>
    </LargePopUp>
  );
}

export default Ops;
