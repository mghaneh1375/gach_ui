import React from 'react';
import {CommonButton, PhoneView} from '@/styles';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
function Ops(props) {
  return (
    <LargePopUp
      title={props.selectedQuiz.title}
      toggleShowPopUp={() => props.toggleShowPopUp()}>
      <PhoneView>
        <CommonButton
          onPress={() => props.changeMode('questionList')}
          dir={'rtl'}
          theme={'transparent'}
          title={'سوالات تخصیص یافته'}
        />
        <CommonButton
          onPress={() => props.changeMode('studentList')}
          dir={'rtl'}
          theme={'transparent'}
          title={'دانش آموزان تخصیص یافته'}
        />
      </PhoneView>
    </LargePopUp>
  );
}
export default Ops;
