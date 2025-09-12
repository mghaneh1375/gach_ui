import {faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView, SimpleText} from '@/styles';
import {FontIcon} from '@/styles/common/FontIcon.jsx';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {styles} from '@/styles/common/styles';
import {dispatchNotifContext, notifContext} from '../Context.jsx';
import {
  fetchContentDigests,
  fetchGrades,
  fetchQuizDigests,
  fetchSchools,
  fetchStates,
  getNotif,
  simpleStore,
  store,
} from '../utility';
import BuiltFilter from './BuiltFilter.jsx';
import Filter from './Filter.jsx';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from '@/services/myUploadAdapter';
import RadioButtonYesOrNo from '@/components/web/RadioButtonYesOrNo.jsx';
import RenderHTML from 'react-native-render-html';
import {CKEditorToolbar} from '@/services/utility';
import Attach from './Attach.jsx';
import Excel from './Excel.jsx';
function Create(props) {
  const [isWorking, setIsWorking] = useState(false);
  const useGlobalState = () => [
    React.useContext(notifContext),
    React.useContext(dispatchNotifContext),
  ];
  const removeUploadedAttach = async filename => {
    // props.setLoading(true);
    // let res = await removeFile(props.token, filename, state.selectedQuiz.id);
    // props.setLoading(false);
    // if (res === null) return;
    // let tmp = [];
    // attaches.forEach(element => {
    //   if (element !== filename) tmp.push(element);
    // });
    // setAttaches(tmp);
    // state.selectedQuiz.attaches = tmp;
    // dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
  };
  const [state, dispatch] = useGlobalState();
  const [attaches, setAttaches] = useState();
  const [sendSMS, setSendSMS] = useState('no');
  const [sendMail, setSendMail] = useState('no');
  const [showFilter, setShowFilter] = useState();
  const [filters, setFilters] = useState([]);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [attachesFilesContent, setAttachesFilesContent] = useState();
  const [excelsFilesContent, setExcelsFilesContent] = useState();
  const fetchNotif = React.useCallback(() => {
    if (
      !props.isInReviewMode ||
      isWorking ||
      state.selectedNotif === undefined ||
      state.selectedNotif.desc !== undefined
    )
      return;
    setIsWorking(true);
    props.setLoading(true);
    Promise.all([getNotif(props.token, state.selectedNotif.id)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      state.selectedNotif = res[0];
      dispatch({
        selectedNotif: state.selectedNotif,
        needUpdate: true,
      });
      setDesc(res[0].desc);
      setTitle(res[0].title);
      setIsWorking(false);
    });
  }, [props, dispatch, isWorking, state]);
  const fetchPreReq = React.useCallback(() => {
    if (props.isInReviewMode || isWorking || state.states !== undefined) return;
    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      fetchQuizDigests(props.token),
      fetchStates(props.token),
      fetchGrades(props.token),
      fetchSchools(props.token),
      fetchContentDigests(props.token),
    ]).then(res => {
      props.setLoading(false);
      if (
        res[0] === null ||
        res[1] === null ||
        res[2] === null ||
        res[3] === null ||
        res[4] === null
      ) {
        props.navigate('/');
        return;
      }
      const cities = [];
      res[1].forEach(elem => {
        elem.cities.forEach(e => {
          cities.push(e);
        });
      });
      dispatch({
        quizzes: res[0],
        cities: cities,
        states: res[1].map(elem => {
          return {
            id: elem.id,
            name: elem.name,
          };
        }),
        grades: res[2].filter(elem => {
          return elem.isOlympiad;
        }),
        branches: res[2].filter(elem => {
          return !elem.isOlympiad;
        }),
        schools: res[3],
        packages: res[4].map(elem => {
          return {
            id: elem.id,
            name: elem.title,
          };
        }),
      });
      setIsWorking(false);
    });
  }, [props, state.states, dispatch, isWorking]);
  React.useEffect(() => {
    if (state.states === undefined) fetchPreReq();
  }, [state.states, fetchPreReq]);
  React.useEffect(() => {
    fetchNotif();
  }, [state.selectedNotif, fetchNotif]);
  return (
    <>
      {showFilter && state.states !== undefined && !props.isInReviewMode && (
        <Filter
          setFilter={filter => filters.push(filter)}
          toggleShowPopUp={() => setShowFilter(false)}
        />
      )}

      <CommonWebBox
        header={'افزودن پیام گروهی'}
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        {!props.isInReviewMode && (
          <PhoneView
            style={{
              ...styles.gap10,
            }}>
            <FontIcon
              theme={'rect'}
              back={'yellow'}
              icon={faPlus}
              kind={'normal'}
              onPress={() => setShowFilter(true)}
            />
            <SimpleText
              style={{
                ...styles.BlueBold,
                ...styles.alignSelfCenter,
              }}
              text={'افزودن فیلتر'}
            />
          </PhoneView>
        )}

        <PhoneView
          style={{
            ...styles.gap10,
          }}>
          {filters.map((elem, index) => {
            return (
              <BuiltFilter
                key={index}
                remove={() => {
                  setFilters(filters.filter(e => e.id !== elem.id));
                }}
                elem={elem}
              />
            );
          })}
        </PhoneView>
        <JustBottomBorderTextInput
          placeholder={'عنوان پیام'}
          subText={'عنوان پیام'}
          value={title}
          disable={props.isInReviewMode}
          onChangeText={e => (props.isInReviewMode ? {} : setTitle(e))}
        />
        {props.isInReviewMode && (
          <RenderHTML
            source={{
              html: desc,
            }}
          />
        )}
        {!props.isInReviewMode && (
          <CKEditor
            editor={ClassicEditor}
            config={{
              title: false,
              customValues: {
                token: props.token,
              },
              extraPlugins: [MyCustomUploadAdapterPlugin],
              placeholder: 'متن پیام',
              ...CKEditorToolbar,
            }}
            data={desc}
            onChange={(_, editor) => {
              setDesc(editor.getData());
            }}
          />
        )}

        <Attach attaches={attaches} setFilesContent={setAttachesFilesContent} />
        <Excel setFilesContent={setExcelsFilesContent} />

        {props.sendVia !== 'mail' && props.sendVia !== 'sms' && (
          <RadioButtonYesOrNo
            label={'آیا از طریق پیامک اطلاع داده شود؟'}
            selected={sendSMS}
            setSelected={
              props.isInReviewMode || props.sendVia === 'sms' ? {} : setSendSMS
            }
          />
        )}
        {props.sendVia !== 'mail' && (
          <RadioButtonYesOrNo
            label={'آیا از طریق ایمیل اطلاع داده شود؟'}
            selected={sendMail}
            setSelected={
              props.isInReviewMode || props.sendVia === 'mail'
                ? {}
                : setSendMail
            }
          />
        )}

        {!props.isInReviewMode && (
          <CommonButton
            onPress={async () => {
              props.setLoading(true);
              const data = {
                via: props.sendVia,
                title: title,
                text: desc,
                sendMail: sendMail === 'yes',
                sendSMS: sendSMS === 'yes',
              };
              filters.map(elem => {
                data[elem.key] = elem.value;
              });
              const res =
                attachesFilesContent?.length > 0 ||
                excelsFilesContent?.length > 0
                  ? await store(
                      props.token,
                      data,
                      attachesFilesContent.length > 0
                        ? attachesFilesContent[0]
                        : null,
                      excelsFilesContent.length > 0
                        ? excelsFilesContent[0]
                        : null,
                    )
                  : await simpleStore(props.token, data);
              props.setLoading(false);
              if (res !== null) {
                state.notifs.push({
                  id: res.id,
                  usersCount: res.usersCount,
                  title: title,
                  createdAt: res.createdAt,
                });
                dispatch({
                  notifs: state.notifs,
                });
                props.setMode('list');
              }
            }}
            theme={'dark'}
            title={'ارسال'}
          />
        )}
      </CommonWebBox>
    </>
  );
}
export default Create;
