import {
  faBook,
  faBookBookmark,
  faBookmark,
  faQuestion,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {MyView} from 'react-native-multi-selectbox';
import QuizItemCard from '../../../../components/web/QuizItemCard';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import Translate from '../Translate';
import QuestionNumber from './QuestionNumber/QuestionNumber';

function QuestionNo(props) {
  const [bookMark, setBookMark] = useState(false);
  const toggleBookMark = () => {
    setBookMark(!bookMark);
  };
  return (
    <CommonWebBox width={vars.RIGHT_MENU_WIDTH}>
      <PhoneView style={{gap: 5}}>
        <QuestionNumber number={1} theme={'transparent'} bookmark={1} />
        <QuestionNumber number={2} bookmark={0} />
        <QuestionNumber number={3} theme={'transparent'} bookmark={-1} />
        <QuestionNumber number={4} bookmark={0} />
      </PhoneView>
    </CommonWebBox>
  );
}

export default QuestionNo;
