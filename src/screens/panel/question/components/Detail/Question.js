import {useState} from 'react';
import {
  BigBoldBlueText,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import vars from '../../../../../styles/root';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';

function Question(props) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <CommonWebBox>
      <PhoneView style={{alignSelf: 'flex-end'}}>
        <SimpleText
          onPress={() => toggleShowMore()}
          text={!showMore ? commonTranslator.more : commonTranslator.less}
          style={{color: vars.YELLOW, fontSize: 11, cursor: 'pointer'}}
        />
        <SimpleFontIcon
          kind={'small'}
          icon={!showMore ? faAngleDoubleDown : faAngleDoubleUp}
          style={{color: vars.YELLOW}}
        />
      </PhoneView>
      <PhoneView>
        <SimpleText
          text={translator.organizationCode + props.question.organizationId}
        />
      </PhoneView>
      {showMore && (
        <View>
          <BigBoldBlueText text={translator.questionFile} />
          <img style={{maxHeight: 300}} src={props.question.questionFile} />
          {props.question.answerFile !== null &&
            props.question.answerFile !== undefined && (
              <View>
                <BigBoldBlueText text={translator.answerFile} />
                <img style={{maxHeight: 300}} src={props.question.answerFile} />
              </View>
            )}
        </View>
      )}
    </CommonWebBox>
  );
}

export default Question;
