import {CommonButton, PhoneView} from '@/styles';
import {LargePopUp} from '../../../../../styles/common/PopUp.jsx';
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
