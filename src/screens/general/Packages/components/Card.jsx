import {Image} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '@/styles';
import React, {useState} from 'react';
import vars from '@/styles/root';
import {styles} from '@/styles/common/styles';
import {faCheck, faRemove} from '@fortawesome/free-solid-svg-icons';
import {formatPrice} from '@/services/utility';
import commonTranslator from '@/translator/common';
import {Translator} from '../translator';
import {Rating} from 'react-native-ratings';
import {SimpleFontIcon} from '@/styles/common/FontIcon.jsx';
import {useMediaQuery} from '@material-ui/core';
import {useNavigate} from 'react-router';
import {useTheme} from 'styled-components';

function Card({tutorial, isInPhone, isInMyMode, isDarkMode}) {
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const theme = useTheme();

  React.useEffect(() => {
    setImg(tutorial.img);
  }, [tutorial.img]);
  const size600 = useMediaQuery('(max-width:600px)');
  const isInApp =
    window.navigator.userAgent.toLowerCase().indexOf('android') !== -1;

  return (
    <CommonWebBox
      style={{backgroundColor: theme.colors.background.card}}
      width={size600 ? '100%' : isInPhone ? 320 : 350}>
      <Image
        style={{
          width: '100%',
          height: 200,
        }}
        resizeMode="contain"
        source={img}
      />
      <MyView
        style={{
          ...styles.gap10,
          ...{
            minHeight: 230,
          },
        }}>
        <PhoneView
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: -35,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            backgroundColor: vars.SOLID_CREAM,
          }}>
          <SimpleText
            style={styles.BlueBold(isDarkMode)}
            text={tutorial.title}
          />
        </PhoneView>
        <EqualTwoTextInputs>
          <SimpleText
            style={{
              ...styles.BlueBold(isDarkMode),
              ...styles.margin15,
            }}
            text={tutorial.sessionsCount + ' جلسه'}
          />
          <MyView>
            {tutorial.buyersCount && (
              <SimpleText
                style={{
                  ...styles.BlueBold(isDarkMode),
                  ...styles.margin15,
                }}
                text={`${Translator.buyersCount}: ${tutorial.buyersCount}`}
              />
            )}
            {tutorial.lastWeekBuyersCount && (
              <SimpleText
                style={{
                  ...styles.BlueBold(isDarkMode),
                  ...styles.margin15,
                }}
                text={`${Translator.lastWeekBuyersCount}: ${tutorial.lastWeekBuyersCount}`}
              />
            )}
          </MyView>
          {tutorial.hasCert !== undefined && (
            <PhoneView>
              <SimpleText
                style={{
                  ...styles.BlueBold(isDarkMode),
                  ...styles.margin15,
                }}
                text={Translator.cert + ' '}
              />
              <SimpleFontIcon
                style={{
                  color: tutorial.hasCert ? vars.GREEN : vars.YELLOW,
                }}
                kind={'normal'}
                icon={tutorial.hasCert ? faCheck : faRemove}
              />
            </PhoneView>
          )}
        </EqualTwoTextInputs>
        {tutorial.teacher && (
          <SimpleText
            style={styles.BlueBold(isDarkMode)}
            text={Translator.teacher + commonTranslator.col + tutorial.teacher}
          />
        )}
        {tutorial.teachers && (
          <PhoneView style={{gap: 10}}>
            {tutorial.teachers.map((teacher, index) => (
              <SimpleText
                key={index}
                style={styles.BlueBold(isDarkMode)}
                text={Translator.teacher + commonTranslator.col + teacher}
              />
            ))}
          </PhoneView>
        )}

        {tutorial.rate !== undefined && (
          <PhoneView
            style={{
              width: '100%',
              direction: 'ltr',
            }}>
            <Rating
              type="star"
              readonly={true}
              ratingCount={5}
              imageSize={30}
              fractions={2}
              style={{
                direction: 'ltr',
              }}
              startingValue={tutorial.rate}
            />
          </PhoneView>
        )}

        <EqualTwoTextInputs
          style={{
            ...styles.flexNoWrap,
          }}>
          {!isInMyMode && (
            <PhoneView
              style={{
                ...styles.alignSelfCenter,
              }}>
              <SimpleText
                style={{
                  ...styles.BlueBold(isDarkMode),
                }}
                text={commonTranslator.price + ' '}
              />
              <SimpleText
                style={
                  tutorial.afterOff !== undefined &&
                  tutorial.price !== tutorial.afterOff
                    ? {
                        ...styles.textDecorRed,
                        ...styles.BlueBold(isDarkMode),
                      }
                    : {
                        ...styles.BlueBold(isDarkMode),
                      }
                }
                text={
                  tutorial.price === 0
                    ? commonTranslator.free
                    : formatPrice(tutorial.price) +
                      ' ' +
                      commonTranslator.priceUnit
                }
              />
              {tutorial.afterOff !== undefined &&
                tutorial.price !== tutorial.afterOff && (
                  <SimpleText
                    style={{
                      ...styles.BlueBold(isDarkMode),
                      ...styles.red,
                      ...styles.marginRight15,
                    }}
                    text={
                      formatPrice(tutorial.afterOff) +
                      ' ' +
                      commonTranslator.priceUnit
                    }
                  />
                )}
            </PhoneView>
          )}
          {isInMyMode && <SimpleText />}
          <CommonButton
            onPress={() =>
              isInApp
                ? navigate('/packages/' + tutorial.slug)
                : window.open('/packages/' + tutorial.slug)
            }
            title={Translator.select}
          />
        </EqualTwoTextInputs>

        <PhoneView style={styles.gap10}>
          {tutorial.tags !== undefined &&
            tutorial.tags.map((elem, index) => {
              return <SimpleText key={index} text={'#' + elem} />;
            })}
        </PhoneView>
        {tutorial.level && <SimpleText text={'سطح دوره ' + tutorial.level} />}
      </MyView>
    </CommonWebBox>
  );
}
export default Card;
