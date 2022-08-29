import React from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
  MyView,
} from '../../../../../styles/Common';
import Translate from '../../Translate';
import {
  styleFontSize11,
  styleFontSize13,
  styleFontSize17,
  styleItem,
  styleItemsGrandParent,
  styleItemsParent,
} from './../../card/Style';
import commonTranslator from '../../../../../translator/Common';
import {dispatchQuizzesContext} from './Utility';
import {styles} from '../../../../../styles/Common/Styles';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import {icon} from '@fortawesome/fontawesome-svg-core';
import {faQuestion} from '@fortawesome/free-solid-svg-icons';

function Info(props) {
  const useGlobalState = () => [React.useContext(dispatchQuizzesContext)];
  const [dispatch] = useGlobalState();

  return (
    <CommonWebBox
      header={props.package.title}
      onBackClick={() => props.setMode('list')}
      backBtn={true}>
      <MyView style={{marginTop: 20}}>
        <SimpleText
          style={{...styleFontSize13, ...styles.BlueBold}}
          text={commonTranslator.grade + ' : ' + props.package.grade.name}
        />
        <SimpleText
          style={{...styleFontSize13, ...styles.BlueBold}}
          text={commonTranslator.lesson + ' : ' + props.package.lesson.name}
        />
        <MyView style={{...styleItemsGrandParent}}>
          <PhoneView style={{...styleItemsParent}}>
            <PhoneView style={{...styleItem}}>
              <FontIcon
                kind={'small'}
                icon={faQuestion}
                parentStyle={{marginLeft: 5}}
              />
              <MyView>
                <SimpleText
                  style={{...styleFontSize11, ...styles.BlueBold}}
                  text={Translate.quizCount}
                />
                <SimpleText
                  style={{
                    ...styleFontSize17,
                    ...styles.alignSelfCenter,
                    ...styles.BlueBold,
                  }}
                  text={props.package.quizzes}
                />
              </MyView>
            </PhoneView>

            <PhoneView style={{...styleItem}}>
              <FontIcon
                kind={'small'}
                icon={faQuestion}
                parentStyle={{marginLeft: 5}}
              />
              <MyView>
                <SimpleText
                  style={{...styleFontSize11, ...styles.BlueBold}}
                  text={Translate.minSelect}
                />
                <SimpleText
                  style={{
                    ...styleFontSize17,
                    ...styles.alignSelfCenter,
                    ...styles.BlueBold,
                  }}
                  text={props.package.minSelect}
                />
              </MyView>
            </PhoneView>

            <PhoneView style={{...styleItem}}>
              <FontIcon
                kind={'small'}
                icon={faQuestion}
                parentStyle={{marginLeft: 5}}
              />
              <MyView>
                <SimpleText
                  style={{...styleFontSize11, ...styles.BlueBold}}
                  text={Translate.mizanTakhfif}
                />
                <SimpleText
                  style={{
                    ...styleFontSize17,
                    ...styles.alignSelfCenter,
                    ...styles.BlueBold,
                  }}
                  text={props.package.offPercent + ' درصد '}
                />
              </MyView>
            </PhoneView>

            {props.isAdmin && (
              <PhoneView style={{...styleItem}}>
                <FontIcon
                  kind={'small'}
                  icon={faQuestion}
                  parentStyle={{marginLeft: 5}}
                />
                <MyView>
                  <SimpleText
                    style={{...styleFontSize11, ...styles.BlueBold}}
                    text={Translate.buyersCount}
                  />
                  <SimpleText
                    style={{
                      ...styleFontSize17,
                      ...styles.alignSelfCenter,
                      ...styles.BlueBold,
                    }}
                    text={props.package.buyers}
                  />
                </MyView>
              </PhoneView>
            )}
          </PhoneView>
        </MyView>

        {props.isAdmin && (
          <CommonButton
            title={Translate.addQuiz}
            theme={'dark'}
            onPress={() => dispatch({selectingQuiz: true})}
          />
        )}
      </MyView>
    </CommonWebBox>
  );
}

export default Info;
