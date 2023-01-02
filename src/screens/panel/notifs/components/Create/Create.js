import {faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';

import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../../styles/Common/Styles';
import {dispatchNotifContext, notifContext} from '../Context';
import {
  fetchContentDigests,
  fetchGrades,
  fetchQuizDigests,
  fetchSchools,
  fetchStates,
  store,
} from '../Utility';
import BuiltFilter from './BuiltFilter';
import Filter from './Filter';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from '../../../../../services/MyUploadAdapter';

function Create(props) {
  let ckEditor = null;

  const [isWorking, setIsWorking] = useState();
  const useGlobalState = () => [
    React.useContext(notifContext),
    React.useContext(dispatchNotifContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [showFilter, setShowFilter] = useState();
  const [filters, setFilters] = useState([]);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  const fetchPreReq = React.useCallback(() => {
    if (isWorking || state.states !== undefined) return;

    Promise.all([
      fetchQuizDigests(props.token),
      fetchStates(props.token),
      fetchGrades(props.token),
      fetchSchools(props.token),
      fetchContentDigests(props.token),
    ]).then(res => {
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

      let cities = [];
      res[1].forEach(elem => {
        elem.cities.forEach(e => {
          cities.push(e);
        });
      });

      dispatch({
        quizzes: res[0],
        cities: cities,
        states: res[1].map(elem => {
          return {id: elem.id, name: elem.name};
        }),
        grades: res[2].filter(elem => {
          return !elem.isOlympiad;
        }),
        branches: res[2].filter(elem => {
          return elem.isOlympiad;
        }),
        schools: res[3],
        packages: res[4].map(elem => {
          return {id: elem.id, name: elem.title};
        }),
      });
    });
  }, [props, state.states, dispatch, isWorking]);

  React.useEffect(() => {
    if (state.states === undefined) fetchPreReq();
  }, [state.states, fetchPreReq]);

  return (
    <>
      {showFilter && state.states !== undefined && (
        <Filter
          setFilter={filter => filters.push(filter)}
          toggleShowPopUp={() => setShowFilter(false)}
        />
      )}

      <CommonWebBox
        header={'افزودن پیام گروهی'}
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        <PhoneView style={{...styles.gap10}}>
          <FontIcon
            theme={'rect'}
            back={'yellow'}
            icon={faPlus}
            kind={'normal'}
            onPress={() => setShowFilter(true)}
          />
          <SimpleText
            style={{...styles.BlueBold, ...styles.alignSelfCenter}}
            text={'افزودن فیلتر'}
          />
        </PhoneView>
        <PhoneView style={{...styles.gap10}}>
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
          onChangeText={e => setTitle(e)}
        />

        <CKEditor
          editor={ClassicEditor}
          config={{
            customValues: {token: props.token},
            extraPlugins: [MyCustomUploadAdapterPlugin],
            placeholder: 'متن پیام',
          }}
          data={desc}
          onReady={editor => {
            ckEditor = editor;
          }}
          onChange={(event, editor) => {
            setDesc(editor.getData());
          }}
        />
        <CommonButton
          onPress={async () => {
            props.setLoading(true);

            let data = {via: 'site', title: title, text: desc};
            filters.map(elem => {
              data[elem.key] = elem.value;
            });

            let res = await store(props.token, data);
            props.setLoading(false);
          }}
          theme={'dark'}
          title={'ارسال'}
        />
      </CommonWebBox>
    </>
  );
}

export default Create;
