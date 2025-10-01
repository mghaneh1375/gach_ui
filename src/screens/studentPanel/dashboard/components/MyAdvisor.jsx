import Circle from '@/components/web/Circle';
import QuizItemCard from '@/components/web/QuizItemCard';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '@/styles';
import {styles} from '@/styles/common/styles';
import vars from '@/styles/root';
import {faCalendarAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import {Image, Pressable} from 'react-native';

function MyAdvisor({advisor, startAt, endAt, rate, stdCount, age, isInPhone}) {
  const [pic, setPic] = useState();
  useEffect(() => {
    setPic(advisor.pic);
  }, [advisor.pic]);
  return (
    <>
      <CommonWebBox width={300}>
        <EqualTwoTextInputs
          style={{
            ...styles.justifyContentCenter,
            ...styles.paddingRight15,
            backgroundColor: vars.YELLOW_WHITE,
            borderRadius: 5,
            height: 40,
            marginRight: 0,
          }}>
          <SimpleText
            style={{
              ...styles.BlueBold,
              ...styles.fontSize15,
              ...styles.alignSelfCenter,
            }}
            text={advisor.firstname + ' ' + advisor.lastname}
          />
          <PhoneView
            style={{
              ...styles.positionAbsolute,
              top: -5,
              left: 15,
              ...styles.gap15,
            }}>
            <SimpleText
              style={{
                ...styles.colorDarkBlue,
                ...styles.alignSelfCenter,
              }}
              text={'امتیاز'}
            />
            <Circle
              diameter={50}
              text={rate === null ? '-' : rate}
              color={vars.WHITE}
              backgroundColor={vars.ORANGE_RED}
            />
          </PhoneView>
        </EqualTwoTextInputs>

        <PhoneView
          style={
            isInPhone
              ? {
                  ...styles.gap15,
                }
              : {
                  ...styles.gap100,
                }
          }>
          <PhoneView
            style={{
              maxWidth: isInPhone ? '100%' : '520px',
              minWidth: isInPhone ? '100%' : '520px',
              flexDirection: isInPhone ? 'column' : 'row',
            }}>
            <Pressable
              onPress={() =>
                window.open('/teacher-public-profile/' + advisor.id, '_blank')
              }
              style={{
                border: isInPhone ? 'unset' : '4px solid',
                borderColor: vars.ORANGE,
                borderRadius: 7,
                width: isInPhone ? 100 : 148,
                height: isInPhone ? 100 : 148,
                marginTop: isInPhone ? 0 : 20,
              }}>
              <Image
                style={{
                  width: isInPhone ? 90 : 140,
                  height: isInPhone ? 90 : 140,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                source={pic}
              />
            </Pressable>

            <MyView
              style={{
                paddingRight: 20,
                maxWidth: '350px',
                minWidth: '350px',
                ...styles.gap15,
                ...styles.marginTop20,
              }}>
              <MyView
                style={{
                  marginTop: -10,
                  ...styles.gap5,
                }}>
                <QuizItemCard
                  text={'تعداد دانش آموزان'}
                  val={stdCount + ' نفر'}
                  icon={faUser}
                  background={false}
                  iconFontSize={'normal'}
                  color={vars.YELLOW}
                  textFontSize={14}
                  valFontSize={14}
                  isBold={true}
                  isBoldValue={false}
                  maxWidth={350}
                />
                <QuizItemCard
                  text={'سن'}
                  val={age + ' سال'}
                  icon={faCalendarAlt}
                  background={false}
                  iconFontSize={'normal'}
                  color={vars.YELLOW}
                  textFontSize={14}
                  valFontSize={14}
                  isBold={true}
                  isBoldValue={false}
                  maxWidth={350}
                />
              </MyView>
            </MyView>
          </PhoneView>
        </PhoneView>

        <PhoneView
          style={{
            justifyContent: 'end',
          }}>
          <SimpleText
            style={{
              ...styles.marginLeft15,
              ...styles.alignSelfCenter,
              ...styles.BlueBold,
              ...styles.cursor_pointer,
              ...styles.fontSize15,
              ...styles.red,
            }}
            onPress={() => window.open('/myAdvisor')}
            text={'رفتن به پنل مشاوره'}
          />
        </PhoneView>
      </CommonWebBox>
    </>
  );
}

export default MyAdvisor;
