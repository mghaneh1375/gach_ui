import React, {useState} from 'react';
import {
  BigBoldBlueTextInline,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  CommonButton,
  SimpleText,
  PhoneView,
} from '../../../../styles/Common';

import ChangePass from '../components/ChangePass';
import ChangeUsername from '../components/ChangeUsername';
import UpdateInfo from '../components/UpdateInfo';
import UpdatePic from '../components/UpdatePic';
import UpdateUsername from '../components/UpdateUsername';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {
  getDevice,
  isUserAdvisor,
  showError,
  showSuccess,
  trueFalseValues,
} from '../../../../services/Utility';
import {Device} from '../../../../models/Device';
import translator from '../translate';
import commonTranslator from '../../../../translator/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {Col, Row} from 'react-grid-system';
import {useParams} from 'react-router';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {getPreRequirements, updateUserPic} from '../components/Utility';
import UpdateForm from '../components/UpdateForm';
import {fetchUser, setCacheItem} from '../../../../API/User';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import RadioButtonYesOrNo from '../../../../components/web/RadioButtonYesOrNo';
import commonTranslate from '../../../../translator/Common';
import {styles} from '../../../../styles/Common/Styles';

const Profile = props => {
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdvisor, setIsAdvisor] = useState(false);
  const [aboutMe, setAboutMe] = useState();
  const navigate = props.navigate;
  const params = useParams();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [isWorking, setIsWorking] = useState(false);
  const [fetchedStates, setFetchedStates] = useState(false);
  const [states, setStates] = useState();
  const [grades, setGrades] = useState();
  const [branches, setBranches] = useState();
  const [schools, setSchools] = useState();
  const [wantToTeach, setWantToTeach] = useState(false);
  const [wantToAdvice, setWantToAdvice] = useState(false);

  const [showChangeUsernameModal, setShowChangeUsernameModal] = useState(false);
  const [usernameModalMode, setUsernameModalMode] = useState(false);
  const [showEditInfo, setShowEditInfo] = useState(true);
  const [showEditUsername, setShowEditUsername] = useState(true);
  const [showEditPassword, setShowEditPassword] = useState(true);
  const [showEditPic, setShowEditPic] = useState(true);
  const [showEditForm, setShowEditForm] = useState(true);
  const [acceptStd, setAcceptStd] = useState();
  const [teachVideoLink, setTeachVideoLink] = useState();
  const [defaultTeachPrice, setDefaultTeachPrice] = useState();
  const [adviceVideoLink, setAdviceVideoLink] = useState();
  const [teachLessons, setTeachLessons] = useState();
  const [teachGrades, setTeachGrades] = useState();
  const [teachAboutMe, setTeachAboutMe] = useState();
  const [adviceAboutMe, setAdviceAboutMe] = useState();
  const [teachBranches, setTeachBranches] = useState();
  const [selectableLessons, setSelectableLessons] = useState([]);
  const [iryscTeachPercent, setIryscTeachPercent] = useState();
  const [iryscAdvicePercent, setIryscAdvicePercent] = useState();
  const [userLevel, setUserLevel] = useState();

  React.useEffect(() => {
    if (user !== undefined || isWorking) return;
    const isApp = getDevice().indexOf(Device.App) !== -1;

    if (props.user === null) {
      navigate(isApp ? 'Home' : '/');
      return;
    }

    if (params.userId !== undefined) {
      setIsWorking(true);
      dispatch({loading: true});
      Promise.all([
        generalRequest(
          routes.fetchUser + params.userId,
          'get',
          undefined,
          'user',
          props.token,
        ),
      ]).then(res => {
        dispatch({loading: false});
        if (res[0] === null) {
          props.navigate('/');
          return;
        }
        setUser(res[0].user);
        setIsAdmin(true);
        setIsWorking(false);
      });
    } else {
      setUser(props.user.user);
      const isAdvisor = isUserAdvisor(props.user);
      if (isAdvisor) {
        setTeachAboutMe(props.user.user.teachBio);
        setAdviceAboutMe(props.user.user.adviceBio);
        setAdviceVideoLink(props.user.user.adviceVideoLink);
        setTeachVideoLink(props.user.user.teachVideoLink);
        setDefaultTeachPrice(props.user.user.defaultTeachPrice);
        setAcceptStd(props.user.user.acceptStd);
        setWantToTeach(props.user.user.wantToTeach);
        setWantToAdvice(props.user.user.wantToAdvice);
      }
      setIsAdvisor(isAdvisor);
      Promise.all([
        generalRequest(
          routes.getMyCurrLevel,
          'get',
          undefined,
          'data',
          props.token,
        ),
      ]).then(res => {
        if (res[0] !== null) setUserLevel(res[0]);
      });
    }
  }, [props, isWorking, user, dispatch, navigate, params]);

  React.useEffect(() => {
    if (fetchedStates) return;
    setFetchedStates(true);
    dispatch({loading: true});
    Promise.all([getPreRequirements()]).then(res => {
      res = res[0];
      dispatch({loading: false});
      if (res[0] !== null) setStates(res[0]);
      if (res[1] !== null) setGrades(res[1]);
      if (res[2] !== null) setBranches(res[2]);
      if (res[3] !== null) setSchools(res[3]);
      const isAdvisor = isUserAdvisor(props.user);
      if (isAdvisor) {
        Promise.all([
          generalRequest(
            routes.getMyFields,
            'get',
            undefined,
            'data',
            props.token,
          ),
        ]).then(r => {
          if (r[0] !== null) {
            let tmp = [];
            res[2]
              .filter(grade => r[0].grades.indexOf(grade.id) !== -1)
              .forEach(e => {
                e.lessons.forEach(ee => {
                  tmp.push(ee);
                });
              });

            setSelectableLessons(tmp);
            setTeachLessons(
              tmp.filter(lesson => {
                return r[0].lessons.indexOf(lesson.id) !== -1;
              }),
            );

            setTeachGrades(
              res[2].filter(grade => {
                return r[0].grades.indexOf(grade.id) !== -1;
              }),
            );

            setTeachBranches(
              res[1].filter(branch => {
                return r[0].branches.indexOf(branch.id) !== -1;
              }),
            );

            setIryscAdvicePercent(r[0].iryscAdvicePercent);
            setIryscTeachPercent(r[0].iryscTeachPercent);
          }
        });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedStates, dispatch]);

  const toggleChangeUsernameModal = () => {
    setShowChangeUsernameModal(!showChangeUsernameModal);
  };

  return (
    <MyView>
      {showChangeUsernameModal && (
        <ChangeUsername
          mode={usernameModalMode}
          token={props.token}
          setLoading={setLoading}
          userId={isAdmin ? user.id : undefined}
          NID={user.NID}
          updateUser={(key, val) => {
            let u = user;
            u[key] = val;
            setUser(u);
          }}
          navigate={navigate}
          toggleModal={toggleChangeUsernameModal}
        />
      )}

      <Row>
        <Col lg={8}>
          {user !== undefined &&
            states !== undefined &&
            schools !== undefined &&
            grades !== undefined &&
            branches !== undefined && (
              <MyView>
                <CommonWebBox>
                  <EqualTwoTextInputs>
                    <BigBoldBlueTextInline
                      style={{alignSelf: 'center'}}
                      text={translator.yourInfo}
                    />

                    <SimpleFontIcon
                      onPress={() => setShowEditInfo(!showEditInfo)}
                      kind={'normal'}
                      icon={showEditInfo ? faAngleUp : faAngleDown}
                    />
                  </EqualTwoTextInputs>
                  {showEditInfo && (
                    <UpdateInfo
                      isInPhone={state.isInPhone}
                      token={props.token}
                      userId={isAdmin ? user.id : undefined}
                      user={user}
                      setLoading={setLoading}
                      states={states}
                      grades={branches}
                      branches={grades}
                      schools={schools}
                      accesses={props.user.accesses}
                    />
                  )}
                </CommonWebBox>
                <CommonWebBox>
                  <EqualTwoTextInputs>
                    <BigBoldBlueTextInline
                      style={{alignSelf: 'center'}}
                      text={translator.usernameInfo}
                    />
                    <SimpleFontIcon
                      onPress={() => setShowEditUsername(!showEditUsername)}
                      kind={'normal'}
                      icon={showEditUsername ? faAngleUp : faAngleDown}
                    />
                  </EqualTwoTextInputs>
                  {showEditUsername && (
                    <UpdateUsername
                      isInPhone={state.isInPhone}
                      phone={user.phone}
                      mail={user.mail}
                      setMode={setUsernameModalMode}
                      toggleModal={toggleChangeUsernameModal}
                    />
                  )}
                </CommonWebBox>
                <CommonWebBox>
                  <EqualTwoTextInputs>
                    <BigBoldBlueTextInline
                      style={{alignSelf: 'center'}}
                      text={translator.changePass}
                    />
                    <SimpleFontIcon
                      onPress={() => setShowEditPassword(!showEditPassword)}
                      kind={'normal'}
                      icon={showEditPassword ? faAngleUp : faAngleDown}
                    />
                  </EqualTwoTextInputs>
                  {showEditPassword && (
                    <ChangePass
                      isInPhone={state.isInPhone}
                      userId={isAdmin ? user.id : undefined}
                      setLoading={setLoading}
                      token={props.token}
                    />
                  )}
                </CommonWebBox>

                {isAdvisor && (
                  <MyView>
                    <CommonWebBox header={'من به عنوان معلم'}>
                      <RadioButtonYesOrNo
                        label={'آیا تمایل به تدریس دارید؟'}
                        selected={wantToTeach ? 'yes' : 'no'}
                        setSelected={e => setWantToTeach(e === 'yes')}
                      />
                      {wantToTeach && (
                        <>
                          <JustBottomBorderTextInput
                            multiline={true}
                            value={teachAboutMe}
                            onChangeText={e => setTeachAboutMe(e)}
                            placeholder={'متن درباره من'}
                            subText={'متن درباره من (حداکثر ۱۵۰ کاراکتر)'}
                          />
                          <JustBottomBorderTextInput
                            placeholder={'لینک ویدیو معرفی من'}
                            subText={'لینک ویدیو معرفی من - اختیاری'}
                            value={teachVideoLink}
                            onChangeText={e => setTeachVideoLink(e)}
                          />
                          <JustBottomBorderTextInput
                            placeholder={'مبلغ پیش فرض برای تدریس در هر جلسه'}
                            subText={'مبلغ پیش فرض برای تدریس در هر جلسه'}
                            value={defaultTeachPrice}
                            onChangeText={e => setDefaultTeachPrice(e)}
                            justNum={true}
                          />
                          <SimpleText
                            style={styles.colorOrangeRed}
                            text={
                              'سهم آیریسک از هر تدریس برای شما ' +
                              iryscTeachPercent +
                              '% می باشد'
                            }
                          />
                        </>
                      )}

                      <SimpleText
                        style={{...styles.BlueBold, ...styles.marginTop20}}
                        text={'من به عنوان مشاور'}
                      />
                      <RadioButtonYesOrNo
                        label={'آیا تمایل به مشاوره دارید؟'}
                        selected={wantToAdvice ? 'yes' : 'no'}
                        setSelected={e => setWantToAdvice(e === 'yes')}
                      />
                      {wantToAdvice && (
                        <>
                          <JustBottomBorderTextInput
                            multiline={true}
                            value={adviceAboutMe}
                            onChangeText={e => setAdviceAboutMe(e)}
                            placeholder={'متن درباره من'}
                            subText={'متن درباره من (حداکثر ۱۵۰ کاراکتر)'}
                          />
                          <JustBottomBorderTextInput
                            placeholder={'لینک ویدیو معرفی من'}
                            subText={'لینک ویدیو معرفی من - اختیاری'}
                            value={adviceVideoLink}
                            onChangeText={e => setAdviceVideoLink(e)}
                          />

                          <JustBottomBorderSelect
                            placeholder={'پذیرش دانش آموز'}
                            subText={'پذیرش دانش آموز'}
                            values={trueFalseValues}
                            value={
                              acceptStd === undefined
                                ? undefined
                                : trueFalseValues.find(
                                    elem => elem.id === acceptStd,
                                  )
                            }
                            setter={async selected => {
                              if (selected === acceptStd) return;

                              setLoading(true);
                              let res = await generalRequest(
                                routes.toggleStdAcceptance,
                                'post',
                                undefined,
                                undefined,
                                props.token,
                              );

                              setLoading(false);

                              if (res !== null) {
                                await setCacheItem('user', undefined);
                                await fetchUser(props.token, user => {});
                                showSuccess();
                              }

                              setAcceptStd(selected);
                            }}
                          />
                          <SimpleText
                            style={styles.colorOrangeRed}
                            text={
                              'سهم آیریسک از هر مشاوره برای شما ' +
                              iryscAdvicePercent +
                              '% می باشد'
                            }
                          />
                        </>
                      )}
                      <CommonButton
                        title={commonTranslator.confirm}
                        onPress={async () => {
                          if (
                            (wantToTeach && teachAboutMe.length === 0) ||
                            (wantToAdvice && adviceAboutMe.length === 0)
                          ) {
                            showError(commonTranslator.pleaseFillAllFields);
                            return;
                          }
                          setLoading(true);

                          let data = {
                            wantToAdvice: wantToAdvice,
                            wantToTeach: wantToTeach,
                          };

                          if (wantToAdvice) {
                            data.adviceAboutMe = adviceAboutMe;

                            if (
                              adviceVideoLink !== undefined &&
                              adviceVideoLink !== ''
                            )
                              data.adviceVideoLink = adviceVideoLink;
                          }

                          if (wantToTeach) {
                            data.teachAboutMe = teachAboutMe;
                            data.defaultTeachPrice = defaultTeachPrice;

                            if (
                              teachVideoLink !== undefined &&
                              teachVideoLink !== ''
                            )
                              data.teachVideoLink = teachVideoLink;
                          }

                          let res = await generalRequest(
                            routes.setAboutMe,
                            'put',
                            data,
                            undefined,
                            props.token,
                          );

                          setLoading(false);

                          if (res !== null) {
                            await setCacheItem('user', undefined);
                            await fetchUser(props.token, user => {});
                            showSuccess();
                          }
                        }}
                      />
                    </CommonWebBox>
                    {wantToTeach && (
                      <CommonWebBox
                        header={'تخصص\u200Cهای من برای تدریس (اختیاری)'}>
                        <PhoneView
                          className={'mySpecialties'}
                          style={{gap: '10px'}}>
                          {branches && (
                            <JustBottomBorderTextInput
                              style={{marginTop: 10}}
                              isHalf={state.isInPhone ? undefined : true}
                              resultPane={true}
                              placeholder={commonTranslator.grade}
                              subText={
                                'نام مقطع تحصیلی خود را به شکل فارسی سرچ کنید مثلا: دوازدهم'
                              }
                              setSelectedItem={items => {
                                setTeachGrades(items);
                                const teachGradesId = items.map(e => e.id);

                                let tmp = [];
                                branches
                                  .filter(
                                    grade =>
                                      teachGradesId.indexOf(grade.id) !== -1,
                                  )
                                  .forEach(e => {
                                    e.lessons.forEach(ee => {
                                      tmp.push(ee);
                                    });
                                  });
                                setSelectableLessons(tmp);
                              }}
                              reset={false}
                              values={branches}
                              value={teachGrades}
                              multi={true}
                            />
                          )}

                          <JustBottomBorderTextInput
                            style={{marginTop: 10, maxWidth: '100%'}}
                            isHalf={state.isInPhone ? undefined : true}
                            resultPane={true}
                            placeholder={commonTranslator.lesson}
                            subText={
                              'نام درس را سرچ کنید (ابتدا باید مقطع/مقاطع تحصیلی خود را انتخاب کرده باشید)'
                            }
                            setSelectedItem={setTeachLessons}
                            reset={false}
                            values={selectableLessons}
                            value={teachLessons}
                            multi={true}
                          />
                        </PhoneView>

                        {grades && (
                          <JustBottomBorderTextInput
                            style={{marginTop: 10}}
                            isHalf={state.isInPhone ? undefined : true}
                            resultPane={true}
                            placeholder={commonTranslator.branch}
                            subText={
                              'نام رشته المپیادی خود را به شکل فارسی سرچ کنید مثلا: شیمی'
                            }
                            setSelectedItem={setTeachBranches}
                            reset={false}
                            values={grades}
                            value={teachBranches}
                            multi={true}
                          />
                        )}
                        <CommonButton
                          onPress={async () => {
                            setLoading(true);
                            let res = await generalRequest(
                              routes.setMyFields,
                              'put',
                              {
                                lessons:
                                  teachLessons === undefined
                                    ? []
                                    : teachLessons.map(e => e.id),
                                grades:
                                  teachGrades === undefined
                                    ? []
                                    : teachGrades.map(e => e.id),
                                branches:
                                  teachBranches === undefined
                                    ? []
                                    : teachBranches.map(e => e.id),
                              },
                              undefined,
                              props.token,
                            );
                            setLoading(false);
                            if (res !== null) showSuccess();
                          }}
                          title={commonTranslate.confirm}
                        />
                      </CommonWebBox>
                    )}
                  </MyView>
                )}
                {user.forms !== undefined && (
                  <CommonWebBox>
                    <EqualTwoTextInputs>
                      <BigBoldBlueTextInline
                        style={{alignSelf: 'center'}}
                        text={translator.formInfo}
                      />
                      <SimpleFontIcon
                        onPress={() => setShowEditForm(!showEditForm)}
                        kind={'normal'}
                        icon={showEditForm ? faAngleUp : faAngleDown}
                      />
                    </EqualTwoTextInputs>
                    {showEditForm && (
                      <UpdateForm
                        userId={isAdmin ? user.id : undefined}
                        forms={user.forms}
                        setLoading={setLoading}
                        token={props.token}
                      />
                    )}
                  </CommonWebBox>
                )}
                {isAdmin && (
                  <CommonButton
                    onPress={() => window.open('/upgrade/' + user.id, '_blank')}
                    style={{alignSelf: 'center'}}
                    theme={'dark'}
                    title="وارد کردن اطلاعات فرم\u200cها"
                  />
                )}
              </MyView>
            )}
        </Col>
        <Col lg={4}>
          {user !== undefined && (
            <CommonWebBox>
              <EqualTwoTextInputs>
                <BigBoldBlueTextInline
                  style={{alignSelf: 'center'}}
                  text={translator.yourPic}
                />
                <SimpleFontIcon
                  onPress={() => setShowEditPic(!showEditPic)}
                  kind={'normal'}
                  icon={showEditPic ? faAngleUp : faAngleDown}
                />
              </EqualTwoTextInputs>
              {showEditPic && (
                <UpdatePic
                  accesses={props.user.accesses}
                  token={props.token}
                  user={user}
                  userLevel={userLevel}
                  isAdmin={isAdmin}
                  navigate={navigate}
                  setLoading={setLoading}
                  updateUserPic={newFilePath =>
                    updateUserPic(newFilePath, isAdmin, user, props.user, u => {
                      dispatch({user: u});
                    })
                  }
                />
              )}
            </CommonWebBox>
          )}
          {user !== undefined && (
            <CommonWebBox>
              <SimpleText
                text={
                  user.blockNotif === undefined
                    ? 'وضعیت ارسال هشدار\u200cها: فعال'
                    : 'وضعیت ارسال هشدار\u200cها: غیرفعال'
                }
              />
              <CommonButton
                onPress={async () => {
                  setLoading(true);
                  let res = await generalRequest(
                    isAdmin ? routes.blockNotif + user.id : routes.blockNotif,
                    'put',
                    undefined,
                    undefined,
                    props.token,
                  );
                  setLoading(false);
                  if (res != null) {
                    showSuccess();
                    if (!isAdmin) {
                      let u = user;
                      u.blockNotif =
                        user.blockNotif === undefined ? true : undefined;
                      let newUserModel = props.user;
                      newUserModel.user = u;
                      await setCacheItem('user', JSON.stringify(newUserModel));
                      dispatch({user: newUserModel});
                    } else {
                      location.reload();
                    }
                  }
                }}
                theme="dark"
                title={
                  user.blockNotif !== undefined ? 'فعال کردن' : 'غیر فعال کردن'
                }
              />
            </CommonWebBox>
          )}
        </Col>
      </Row>
    </MyView>
  );
};

export default Profile;
