import React, {useState} from 'react';
import {
  BigBoldBlueTextInline,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  CommonButton,
} from '../../../../styles/Common';

import ChangePass from '../components/ChangePass';
import ChangeUsername from '../components/ChangeUsername';
import UpdateInfo from '../components/UpdateInfo';
import UpdatePic from '../components/UpdatePic';
import UpdateUsername from '../components/UpdateUsername';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import {getDevice} from '../../../../services/Utility';
import {Device} from '../../../../models/Device';
import translator from '../translate';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {Col, Row} from 'react-grid-system';
import {useParams} from 'react-router';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {getPreRequirements, updateUserPic} from '../components/Utility';
import UpdateForm from '../components/UpdateForm';

const Profile = props => {
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
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

  const [showChangeUsernameModal, setShowChangeUsernameModal] = useState(false);
  const [usernameModalMode, setUsernameModalMode] = useState(false);
  const [showEditInfo, setShowEditInfo] = useState(true);
  const [showEditUsername, setShowEditUsername] = useState(true);
  const [showEditPassword, setShowEditPassword] = useState(true);
  const [showEditPic, setShowEditPic] = useState(true);
  const [showEditForm, setShowEditForm] = useState(true);

  React.useEffect(() => {
    if (user !== undefined || isWorking) return;
    const isApp = getDevice().indexOf(Device.App) !== -1;

    if (props.user === undefined) {
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
    } else setUser(props.user.user);
  }, [props, isWorking, user, dispatch, navigate, params]);

  React.useEffect(() => {
    if (fetchedStates) return;
    setFetchedStates(true);
    getPreRequirements(
      status => dispatch({loading: status}),
      setStates,
      setGrades,
      setBranches,
      setSchools,
    );
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
                      kind={'small'}
                      icon={showEditInfo ? faAngleUp : faAngleDown}
                    />
                  </EqualTwoTextInputs>
                  {showEditInfo && (
                    <UpdateInfo
                      token={props.token}
                      userId={isAdmin ? user.id : undefined}
                      user={user}
                      setLoading={setLoading}
                      states={states}
                      grades={grades}
                      branches={branches}
                      schools={schools}
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
                      kind={'small'}
                      icon={showEditUsername ? faAngleUp : faAngleDown}
                    />
                  </EqualTwoTextInputs>
                  {showEditUsername && (
                    <UpdateUsername
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
                      kind={'small'}
                      icon={showEditPassword ? faAngleUp : faAngleDown}
                    />
                  </EqualTwoTextInputs>
                  {showEditPassword && (
                    <ChangePass
                      userId={isAdmin ? user.id : undefined}
                      setLoading={setLoading}
                      token={props.token}
                    />
                  )}
                </CommonWebBox>

                {user.forms !== undefined && (
                  <CommonWebBox>
                    <EqualTwoTextInputs>
                      <BigBoldBlueTextInline
                        style={{alignSelf: 'center'}}
                        text={translator.formInfo}
                      />
                      <SimpleFontIcon
                        onPress={() => setShowEditForm(!showEditForm)}
                        kind={'small'}
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
                    title="وارد کردن اطلاعات فرم ها"
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
                  kind={'small'}
                  icon={showEditPic ? faAngleUp : faAngleDown}
                />
              </EqualTwoTextInputs>
              {showEditPic && (
                <UpdatePic
                  accesses={props.user.accesses}
                  token={props.token}
                  user={user}
                  isAdmin={isAdmin}
                  setLoading={setLoading}
                  updateUserPic={newFilePath =>
                    updateUserPic(
                      newFilePath,
                      isAdmin,
                      user,
                      props.user,
                      props.setUser,
                    )
                  }
                />
              )}
            </CommonWebBox>
          )}
        </Col>
      </Row>
    </MyView>
  );
};

export default Profile;
