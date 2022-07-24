import {useState} from 'react';
import {
  BigBoldBlueText,
  BlueTextInline,
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import commonTranslator from '../../../../../tranlates/Common';
import translator from '../../Translator';

import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import translate from '../../../quiz/components/Card/Translate';
import {
  styleFont14,
  styleFont16,
  styleMargin25,
  styleFlexSpaceBetween,
  styleJustifyContentEnd,
  styleYellowMarginTop7,
  YellowFont13,
  styleJustifyContentBetween,
  styleMarginRight25,
} from './style';
import {levelKeyVals, statusKeyVals, typeOfQuestionKeyVals} from '../KeyVals';
import Translate from '../../../package/Translate';
function Question(props) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <CommonWebBox>
      <PhoneView style={{...styleJustifyContentBetween}}>
        <BlueTextInline
          style={{...styleFont16}}
          text={translator.organizationCode + props.question.organizationId}
        />
        <PhoneView>
          <SimpleText
            onPress={() => toggleShowMore()}
            text={!showMore ? commonTranslator.more : commonTranslator.less}
            style={{...YellowFont13}}
          />
          <SimpleFontIcon
            kind={'small'}
            icon={!showMore ? faAngleDoubleDown : faAngleDoubleUp}
            style={{...styleYellowMarginTop7}}
          />
        </PhoneView>
      </PhoneView>
      <PhoneView
        style={{
          ...styleFlexSpaceBetween,
          ...styleMarginRight25,
        }}>
        <PhoneView>
          <BlueTextInline
            style={{...styleFont14}}
            text={translator.typeOfQuestion}
          />
          <SimpleText
            style={{...styleMarginRight25}}
            text={
              ' ' +
              typeOfQuestionKeyVals.find(
                elem => elem.id === props.question.kindQuestion,
              ).item
            }
          />
        </PhoneView>
        <PhoneView>
          <BlueTextInline style={{...styleFont14}} text={translator.longTime} />
          <SimpleText
            style={{...styleMarginRight25}}
            text={' ' + props.question.neededTime + translator.second}
          />
        </PhoneView>
        <PhoneView>
          <BlueTextInline style={{...styleFont14}} text={translator.level} />
          <SimpleText
            style={{...styleMarginRight25}}
            text={
              ' ' +
              levelKeyVals.find(elem => elem.id === props.question.level).item
            }
          />
        </PhoneView>
        <PhoneView>
          <BlueTextInline style={{...styleFont14}} text={translator.author} />
          <SimpleText
            style={{...styleMarginRight25}}
            text={' ' + props.question.author.name}
          />
        </PhoneView>
        <PhoneView>
          <BlueTextInline
            style={{...styleFont14}}
            text={translator.visibility}
          />
          <SimpleText
            style={{...styleMarginRight25}}
            text={
              ' ' +
              statusKeyVals.find(elem => elem.id === props.question.visibility)
                .item
            }
          />
        </PhoneView>
        {/* </PhoneView> */}
        {/* <PhoneView style={{...styleMargin25, ...styleJustifyContentBetween}}> */}
        {props.question.answer !== undefined && (
          <PhoneView>
            <BlueTextInline style={{...styleFont14}} text={translator.answer} />
            <SimpleText
              style={{...styleMarginRight25}}
              text={props.question.answer + '  '}
            />
          </PhoneView>
        )}
        {props.question.telorance !== undefined && (
          <PhoneView>
            <BlueTextInline
              style={{...styleFont14}}
              text={translator.telorance}
            />
            <SimpleText
              style={{...styleMarginRight25}}
              text={props.question.telorance + ' '}
            />
          </PhoneView>
        )}
        {props.question.choicesCount !== undefined && (
          <PhoneView>
            <BlueTextInline
              style={{...styleFont14}}
              text={translator.choicesCount}
            />
            <SimpleText
              style={{...styleMarginRight25}}
              text={props.question.choicesCount + ' '}
            />
          </PhoneView>
        )}
        {props.question.sentencesCount !== undefined && (
          <PhoneView>
            <BlueTextInline
              style={{...styleFont14}}
              text={translator.sentencesCount + ' '}
            />
            <SimpleText
              style={{...styleMarginRight25}}
              text={' ' + props.question.sentencesCount}
            />
          </PhoneView>
        )}
        {props.question.neededLines !== undefined && (
          <PhoneView>
            <BlueTextInline
              style={{...styleFont14}}
              text={translator.neededLines}
            />
            <SimpleText
              style={{...styleMarginRight25}}
              text={props.question.neededLines + ' '}
            />
          </PhoneView>
        )}
      </PhoneView>
      <PhoneView style={{...styleMarginRight25, ...styleJustifyContentEnd}}>
        <CommonButton title={commonTranslator.delete} />
        <CommonButton theme={'transparent'} title={commonTranslator.edit} />
        <CommonButton theme={'dark'} title={translator.addQuiz} />
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
