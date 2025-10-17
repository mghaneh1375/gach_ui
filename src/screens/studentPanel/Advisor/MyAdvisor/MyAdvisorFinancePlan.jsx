import {routes} from '@/api/apiRoutes.js';
import {generalRequest} from '@/api/utility.js';
import translator from '@/screens/advisorPanel/myFinancePlans/components/translator';
import {showError, showSuccess} from '@/services/utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  FontIcon,
  MyView,
  PhoneView,
  SimpleText,
} from '@/styles';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {styles} from '@/styles/common/styles';
import vars from '@/styles/root';
import commonTranslator from '@/translator/common.js';
import {
  faCheck,
  faClockRotateLeft,
  faClose,
  faNewspaper,
  faPaperPlane,
  faQuestion,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import React, {useCallback, useEffect, useState} from 'react';
import {Image} from 'react-native';
import {Rating} from 'react-native-ratings';
import Circle from '../../../../components/web/Circle.jsx';
import QuizItemCard from '../../../../components/web/QuizItemCard.jsx';

function MyAdvisorFinancePlan(props) {
  const [pic, setPic] = useState();
  const [comment, setComment] = useState();
  const [writeComment, setWriteComment] = useState(false);
  const [showReportPane, setShowReportPane] = useState(false);
  const [reportTags, setReportTags] = useState();
  const [showReportDesc, setShowReportDesc] = useState(false);
  const [reportDesc, setReportDesc] = useState();

  React.useEffect(() => {
    setPic(props.data.pic);
  }, [props.data.pic]);

  const fetchReportTags = useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getAdviceAllReportTags,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        setReportTags([
          ...res[0].map(e => ({...e, selected: false})),
          {id: -1, label: 'سایر', selected: false},
        ]);
        setShowReportPane(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.token]);

  useEffect(() => {
    if (showReportPane && !reportTags) fetchReportTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showReportPane]);

  return (
    <CommonWebBox width={'100%'}>
      <MyView
        style={{
          paddingRight: 10,
          ...styles.gap15,
          ...styles.marginTop10,
        }}>
        {!showReportPane && (
          <>
            <EqualTwoTextInputs
              style={{
                ...styles.alignItemsCenter,
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
                }}
                text={props.plan?.title}
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
                  text={props.data.rate === 0 ? '-' : props.data.rate}
                  color={vars.WHITE}
                  backgroundColor={vars.ORANGE_RED}
                />
              </PhoneView>
            </EqualTwoTextInputs>

            <EqualTwoTextInputs>
              <PhoneView
                style={{
                  ...styles.gap30,
                }}>
                <MyView
                  style={{
                    ...styles.marginTop20,
                    ...{
                      border: '4px solid',
                      borderColor: vars.ORANGE,
                      borderRadius: 7,
                      padding: 3,
                    },
                  }}>
                  <Image
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    source={pic}
                  />
                </MyView>

                <MyView
                  style={{
                    ...styles.gap10,
                    ...styles.marginTop20,
                    ...styles.width100,
                  }}>
                  <SimpleText
                    style={{
                      ...styles.BlueBold,
                      ...styles.fontSize15,
                    }}
                    text={props.data.name}
                  />

                  {props.plan && (
                    <>
                      <PhoneView
                        style={{
                          ...styles.gap15,
                        }}>
                        <QuizItemCard
                          text={translator.maxKarbarg}
                          val={
                            props.plan.maxKarbarg === -1
                              ? 'نامحدود'
                              : props.plan.maxKarbarg
                          }
                          icon={faNewspaper}
                          background={false}
                          iconFontSize={'normal'}
                          color={vars.YELLOW}
                          textFontSize={14}
                          valFontSize={14}
                          isBold={false}
                        />
                        <QuizItemCard
                          text={translator.maxVideoCalls}
                          val={props.plan.videoCalls}
                          icon={faVideo}
                          background={false}
                          iconFontSize={'normal'}
                          color={vars.YELLOW}
                          textFontSize={14}
                          valFontSize={14}
                          isBold={false}
                        />

                        <QuizItemCard
                          text={translator.maxChat}
                          val={
                            props.plan.maxChat === -1
                              ? 'نامحدود'
                              : props.plan.maxChat
                          }
                          icon={faPaperPlane}
                          background={false}
                          iconFontSize={'normal'}
                          color={vars.YELLOW}
                          textFontSize={14}
                          valFontSize={14}
                          isBold={false}
                        />

                        <QuizItemCard
                          text={translator.maxExam}
                          val={
                            props.plan.maxChat === -1
                              ? 'نامحدود'
                              : props.plan.maxChat
                          }
                          icon={faQuestion}
                          background={false}
                          iconFontSize={'normal'}
                          color={vars.YELLOW}
                          textFontSize={14}
                          valFontSize={14}
                          isBold={false}
                        />
                      </PhoneView>
                      <QuizItemCard
                        text={translator.startEnd}
                        val={
                          props.plan.createdAt.split('-')[0] +
                          ' تا ' +
                          props.plan.finishAt.split('-')[0]
                        }
                        icon={faClockRotateLeft}
                        background={false}
                        iconFontSize={'normal'}
                        color={vars.YELLOW}
                        textFontSize={14}
                        valFontSize={14}
                        isBold={false}
                      />
                    </>
                  )}
                </MyView>
              </PhoneView>

              {props.setRate && (
                <MyView
                  style={
                    props.isInPhone
                      ? {
                          ...styles.marginTop10,
                        }
                      : {
                          ...styles.justifyContentSpaceBetween,
                        }
                  }>
                  <PhoneView
                    style={{
                      ...styles.alignSelfEnd,
                      ...styles.alignItemsCenter,
                      ...styles.gap10,
                      ...styles.marginLeft15,
                    }}>
                    <SimpleText
                      style={{
                        ...styles.dark_blue_color,
                      }}
                      text={'امتیاز شما به مشاور'}
                    />
                    <Rating
                      type="star"
                      ratingCount={5}
                      imageSize={30}
                      fractions={0}
                      onFinishRating={rating => props.setRate(rating)}
                      style={{
                        direction: 'ltr',
                        cursor: 'pointer',
                      }}
                      startingValue={props.rate}
                    />
                  </PhoneView>

                  <MyView
                    style={{
                      ...styles.alignSelfEnd,
                    }}>
                    <PhoneView>
                      {props.onRemove && (
                        <CommonButton
                          theme={'orangeRed'}
                          onPress={() => props.onRemove()}
                          title={'حذف مشاور'}
                          style={{width: '150px'}}
                        />
                      )}
                      <CommonButton
                        onPress={() =>
                          window.open(
                            '/ticket?section=advisor&userId=' + props.data.id,
                          )
                        }
                        theme={'green'}
                        title={'صحبت با مشاور'}
                        style={{width: '150px'}}
                      />
                    </PhoneView>
                    <PhoneView>
                      <CommonButton
                        theme={'dark'}
                        onPress={() => setWriteComment(true)}
                        title={'نوشتن نظر'}
                        style={{width: '150px'}}
                      />
                      <CommonButton
                        theme={'yellow'}
                        onPress={() => setShowReportPane(true)}
                        title={'گزارش مشکل'}
                        style={{width: '150px'}}
                      />
                    </PhoneView>
                  </MyView>
                </MyView>
              )}
            </EqualTwoTextInputs>
          </>
        )}

        {showReportPane && (
          <>
            <SimpleText
              style={styles.BlueBold}
              text={'چه مشکلی رو میخوای گزارش کنی؟'}
            />
            {reportTags && (
              <PhoneView>
                {reportTags.map((e, index) => {
                  return (
                    <CommonButton
                      theme={e.selected ? 'dark' : 'transparent'}
                      key={index}
                      title={e.label}
                      onPress={() => {
                        if (e.id === -1 && !e.selected) {
                          setShowReportDesc(true);
                          setReportTags(
                            reportTags.map(ee => {
                              return {...ee, selected: ee.id === -1};
                            }),
                          );
                        } else {
                          setShowReportDesc(false);
                          setReportDesc(undefined);
                          setReportTags(
                            reportTags.map(ee => {
                              if (ee.id === e.id)
                                return {...ee, selected: !ee.selected};
                              if (ee.id === -1) return {...ee, selected: false};
                              return ee;
                            }),
                          );
                        }
                      }}
                    />
                  );
                })}
              </PhoneView>
            )}
            {showReportDesc && (
              <JustBottomBorderTextInput
                multiline={true}
                value={reportDesc}
                style={{maxWidth: 'unset'}}
                onChangeText={e => setReportDesc(e)}
                placeholder={commonTranslator.desc}
                subText={commonTranslator.optional}
              />
            )}
            <PhoneView
              style={{
                justifyContent: 'end',
                gap: '10px',
              }}>
              <FontIcon
                theme="rect"
                kind={'normal'}
                icon={faClose}
                back={'orange'}
                onPress={() => {
                  setReportTags(reportTags.map(e => ({...e, selected: false})));
                  setReportDesc(undefined);
                  setShowReportPane(false);
                }}
              />
              <FontIcon
                theme="rect"
                kind={'normal'}
                icon={faCheck}
                back={'green'}
                onPress={async () => {
                  console.log(
                    reportTags.filter(e => e.id !== -1 && e.selected),
                  );

                  if (
                    reportTags.filter(e => e.id !== -1 && e.selected).length ===
                      0 &&
                    (!reportDesc || reportDesc.length === 0)
                  ) {
                    showError('لطفا گزارش را وارد نمایید');
                    return;
                  }
                  const data = {};
                  if (
                    reportTags.filter(e => e.id !== -1 && e.selected).length > 0
                  )
                    data.tagIds = reportTags
                      .filter(e => e.id !== -1 && e.selected)
                      .map(e => e.id);

                  if (reportDesc && reportDesc.length > 0)
                    data.desc = reportDesc;

                  props.setLoading(true);
                  const res = await generalRequest(
                    routes.setAdviceScheduleReportProblemsByStudent +
                      props.data.id,
                    'put',
                    data,
                    undefined,
                    props.token,
                  );
                  props.setLoading(false);
                  if (res && res !== null) {
                    showSuccess();
                    setReportTags(
                      reportTags.map(e => ({...e, selected: false})),
                    );
                    setReportDesc(undefined);
                    setShowReportPane(false);
                  }
                }}
              />
            </PhoneView>
          </>
        )}

        {writeComment && (
          <>
            <JustBottomBorderTextInput
              placeholder={'نظر خود را بنویسید'}
              subText={'نظر خود را بنویسید'}
              multiline={true}
              value={comment}
              onChangeText={e => setComment(e)}
              style={{maxWidth: 'unset'}}
            />
            <PhoneView
              style={{
                gap: '10px',
              }}>
              <CommonButton
                title={'انصراف'}
                onPress={() => {
                  setComment(undefined);
                  setWriteComment(false);
                }}
              />
              <CommonButton
                theme={'dark'}
                onPress={() => {
                  if (comment.length < 5) {
                    showError('لطفا نظر خود را بنویسید (حداقل 5 کاراکتر)');
                    return;
                  }
                  props.onWriteComment(comment);
                  setComment(undefined);
                  setWriteComment(false);
                }}
                title={'ثبت'}
              />
            </PhoneView>
          </>
        )}

        {props.plan?.description !== undefined &&
          props.plan?.description.length > 0 && (
            <SimpleText
              style={{
                ...styles.dark_blue_color,
              }}
              text={'توضیحات: ' + props.plan.description}
            />
          )}
      </MyView>
    </CommonWebBox>
  );
}
export default MyAdvisorFinancePlan;
