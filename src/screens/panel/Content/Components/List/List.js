import React, {useEffect, useMemo, useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import {generalRequest, VIDEO_BASE_URL} from '../../../../../API/Utility';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import Translator from '../../Translate';
import {contentContext, dispatchContentContext} from '../Context';
import {fetchContents} from '../Utility';
import Ops from './Ops';
import columns from './TableStruncture';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {justifyContentEnd} from '../../../../../styles/Common/Button';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';

function List(props) {
  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];

  const visibilityOptions = useMemo(
    () => [
      {id: 'all', item: 'همه'},
      {id: 'true', item: 'نمایش'},
      {id: 'false', item: 'عدم نمایش'},
    ],
    [],
  );
  const [filter, setFilter] = useState({
    name: undefined,
    teacher: 'all',
    visibility: 'all',
    tag: 'all',
  });
  const [teachers, setTeachers] = useState();
  const [tags, setTags] = useState();
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [showOp, setShowOp] = useState(false);

  useEffect(() => {
    const fetchTeachers = () => {
      props.setLoading(true);
      Promise.all([
        generalRequest(
          routes.distinctTeachersContentsForAdmin,
          'get',
          undefined,
          'data',
          props.token,
        ),
        generalRequest(
          routes.distinctTagsContents,
          'get',
          undefined,
          'data',
          props.token,
        ),
      ]).then(res => {
        props.setLoading(false);
        if (res[0] !== null) {
          setTeachers([
            {id: 'all', item: 'همه'},
            ...res[0].map(e => ({id: e.teacher, item: e.teacher})),
          ]);
        }
        if (res[1] !== null) {
          setTags([
            {id: 'all', item: 'همه'},
            ...res[1].map(e => ({id: e, item: e})),
          ]);
        }
      });
    };
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([fetchContents(props.token, filter)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) return props.navigate('/');
      dispatch({contents: res[0]});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleOp = (idx, row) => {
    dispatch({selectedContent: state.contents[idx]});
    setShowOp(true);
  };

  return (
    <MyView>
      {showOp && (
        <Ops
          setSelectedContentId={props.setSelectedContentId}
          setLoading={props.setLoading}
          token={props.token}
          setMode={props.setMode}
          toggleShowPopUp={() => setShowOp(!showOp)}
          isEditor={props.isEditor}
          isAdmin={props.isAdmin}
        />
      )}
      <CommonWebBox
        header={Translator.list}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <MyView>
          <PhoneView style={{gap: 20}}>
            <JustBottomBorderTextInput
              onChangeText={e =>
                setFilter(prevValues => ({
                  ...prevValues,
                  name: e,
                }))
              }
              placeholder={'نام دوره'}
              subText={'نام دوره'}
              value={filter.name}
            />
            {teachers && (
              <JustBottomBorderSelect
                values={teachers}
                setter={t =>
                  setFilter(prevValues => ({
                    ...prevValues,
                    teacher: t,
                  }))
                }
                value={teachers.find(e => e.id === filter.teacher)}
                placeholder={'دبیر موردنظر'}
                subText={'دبیر موردنظر'}
              />
            )}
            {tags && (
              <JustBottomBorderSelect
                values={tags}
                setter={t =>
                  setFilter(prevValues => ({
                    ...prevValues,
                    tag: t,
                  }))
                }
                value={tags.find(e => e.id === filter.tag)}
                placeholder={'تگ موردنظر'}
                subText={'تگ موردنظر'}
              />
            )}
            <JustBottomBorderSelect
              values={visibilityOptions}
              setter={t =>
                setFilter(prevValues => ({
                  ...prevValues,
                  visibility: t,
                }))
              }
              value={visibilityOptions.find(e => e.id === filter.visibility)}
              placeholder={'وضعیت نمایش'}
              subText={'وضعیت نمایش'}
            />
          </PhoneView>
          <PhoneView style={justifyContentEnd}>
            <CommonButton
              theme={'dark'}
              onPress={() => fetchData()}
              title={'اعمال فیلتر'}
            />
          </PhoneView>
        </MyView>
        {state.contents !== undefined && (
          <CommonDataTable
            removeUrl={VIDEO_BASE_URL + routes.removeContent}
            handleOp={handleOp}
            setLoading={props.setLoading}
            columns={columns}
            data={state.contents}
            token={props.token}
            setData={newData => {
              dispatch({contents: newData});
            }}
          />
        )}
      </CommonWebBox>
    </MyView>
  );
}

export default List;
