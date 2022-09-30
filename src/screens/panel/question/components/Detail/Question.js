import React, {useState} from 'react';
import {
  BigBoldBlueText,
  BigBoldBlueTextInline,
  BlueTextInline,
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import commonTranslator from '../../../../../translator/Common';
import translator from '../../Translator';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
import translate from '../../../quiz/components/Card/Translate';
import {
  styleFont14,
  styleFont16,
  styleFlexSpaceBetween,
  styleJustifyContentEnd,
  styleYellowMarginTop7,
  YellowFont13,
  styleMarginRight25,
  styleMaxHeight300,
} from './style';
import {levelKeyVals, statusKeyVals, typeOfQuestionKeyVals} from '../KeyVals';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import {dispatchQuizContext} from '../../../quiz/components/Context';
import vars from '../../../../../styles/root';
import {styles} from '../../../../../styles/Common/Styles';

function Question(props) {
  const [showMore, setShowMore] = useState(false);

  const useGlobalState = () => [React.useContext(dispatchQuizContext)];
  const [dispatch] = useGlobalState();

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const [keyVals, setKeyVals] = useState();

  const [questionNo, setQuestionNo] = useState();

  React.useEffect(() => {
    if (props.totalQuestions === undefined) return;
    let tmp = [];
    for (let i = 1; i <= props.totalQuestions; i++)
      tmp.push({id: i, item: i + ''});

    setKeyVals(tmp);
  }, [props.totalQuestions]);

  const changeQNo = id => {
    dispatch({
      needSorting: true,
      selectedQuestionId: props.question.id,
      newWantedNo: id,
    });
  };

  React.useEffect(() => {
    setQuestionNo(props.question.no);
  }, [props.question.no]);

  return (
    <CommonWebBox>
      {props.question.organizationId !== undefined && (
        <EqualTwoTextInputs>
          <BigBoldBlueTextInline
            style={{...styleFont16}}
            text={translator.organizationCode + props.question.organizationId}
          />
          <PhoneView>
            <PhoneView
              style={{
                top: -10,
                right: -15,
                backgroundColor: vars.ORANGE,
              }}>
              {keyVals !== undefined && (
                <JustBottomBorderSelect
                  values={keyVals}
                  value={keyVals.find(elem => elem.id === questionNo)}
                  setter={id => {
                    changeQNo(id);
                  }}
                  placeholder={props.counter}
                  style={{color: 'white'}}
                  parentStyle={{
                    backgroundColor: vars.ORANGE,
                    paddingTop: 0,
                  }}
                  paddingLeft={5}
                  onHover={true}
                />
              )}
            </PhoneView>
            <SimpleText
              onPress={() => toggleShowMore()}
              text={!showMore ? commonTranslator.more : commonTranslator.less}
              style={{...YellowFont13, width: 65}}
            />
            <SimpleFontIcon
              onPress={() => toggleShowMore()}
              kind={'normal'}
              icon={!showMore ? faAngleDoubleDown : faAngleDoubleUp}
              style={{...styleYellowMarginTop7}}
            />
          </PhoneView>
        </EqualTwoTextInputs>
      )}
      {props.question.organizationId === undefined && (
        <PhoneView style={{...styles.flexEnd}}>
          <SimpleText
            onPress={() => toggleShowMore()}
            text={!showMore ? commonTranslator.more : commonTranslator.less}
            style={{...YellowFont13, width: 65}}
          />
          <SimpleFontIcon
            onPress={() => toggleShowMore()}
            kind={'normal'}
            icon={!showMore ? faAngleDoubleDown : faAngleDoubleUp}
            style={{...styleYellowMarginTop7}}
          />
        </PhoneView>
      )}

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
        {props.question.neededTime !== undefined && (
          <PhoneView>
            <BlueTextInline
              style={{...styleFont14}}
              text={translator.neededTime}
            />
            <SimpleText
              style={{...styleMarginRight25}}
              text={' ' + props.question.neededTime + translator.second}
            />
          </PhoneView>
        )}

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
            text={' ' + props.question.author}
          />
        </PhoneView>
        {props.question.visibility !== undefined && (
          <PhoneView>
            <BlueTextInline
              style={{...styleFont14}}
              text={translator.visibility}
            />
            <SimpleText
              style={{...styleMarginRight25}}
              text={
                ' ' +
                statusKeyVals.find(
                  elem => elem.id === props.question.visibility,
                ).item
              }
            />
          </PhoneView>
        )}

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
        {props.question.subject !== undefined && (
          <PhoneView>
            <BlueTextInline
              style={{...styleFont14}}
              text={commonTranslator.subject + ' : '}
            />
            <SimpleText
              style={{...styleMarginRight25}}
              text={' ' + props.question.subject.name}
            />
          </PhoneView>
        )}
        {props.question.mark !== undefined && (
          <PhoneView>
            <BlueTextInline
              style={{...styleFont14}}
              text={translate.mark + ' : '}
            />
            <SimpleText
              style={{...styleMarginRight25}}
              text={' ' + props.question.mark}
            />
          </PhoneView>
        )}
        {props.question.used !== undefined && (
          <PhoneView>
            <BlueTextInline
              style={{...styleFont14}}
              text={translate.used + ' : '}
            />
            <SimpleText
              style={{...styleMarginRight25}}
              text={' ' + props.question.used}
            />
          </PhoneView>
        )}
        {props.question.oldWhite !== undefined && (
          <PhoneView>
            <BlueTextInline
              style={{...styleFont14}}
              text={translate.oldWhite}
            />
            <SimpleText
              style={{...styleMarginRight25}}
              text={' ' + props.question.oldWhite}
            />
          </PhoneView>
        )}
        {props.question.oldCorrect !== undefined && (
          <PhoneView>
            <BlueTextInline
              style={{...styleFont14}}
              text={translate.oldCorrect}
            />
            <SimpleText
              style={{...styleMarginRight25}}
              text={' ' + props.question.oldCorrect}
            />
          </PhoneView>
        )}
        {props.question.oldIncorrect !== undefined && (
          <PhoneView>
            <BlueTextInline
              style={{...styleFont14}}
              text={translate.oldIncorrect}
            />
            <SimpleText
              style={{...styleMarginRight25}}
              text={' ' + props.question.oldIncorrect}
            />
          </PhoneView>
        )}
      </PhoneView>
      {props.btns !== undefined && (
        <PhoneView style={{...styleMarginRight25, ...styleJustifyContentEnd}}>
          {props.btns.map((elem, index) => {
            return (
              <CommonButton
                title={elem.title}
                key={index}
                theme={elem.theme}
                onPress={() => elem.onPress(props.question)}
              />
            );
          })}
        </PhoneView>
      )}
      {showMore && (
        <MyView>
          <BigBoldBlueText text={translator.questionFile} />
          <img
            style={{...styleMaxHeight300}}
            src={props.question.questionFile}
          />
          {props.question.answerFile !== null &&
            props.question.answerFile !== undefined && (
              <MyView>
                <BigBoldBlueText text={translator.answerFile} />
                <img
                  style={{...styleMaxHeight300}}
                  src={props.question.answerFile}
                />
              </MyView>
            )}
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default Question;
