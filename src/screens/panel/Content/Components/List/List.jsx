import React, {useEffect, useMemo, useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {generalRequest, VIDEO_BASE_URL} from '@/api/utility';
import {CommonButton, CommonWebBox, MyView, PhoneView} from '@/styles';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import Translator from '../../translate';
import {contentContext, dispatchContentContext} from '../Context.jsx';
import {fetchContents} from '../utility';
import Ops from './Ops.jsx';
import columns from './tableStruncture';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {justifyContentEnd} from '@/styles/common/button';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect.jsx';
function List(props) {
  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];
  const visibilityOptions = useMemo(
    () => [
      {
        id: 'all',
        item: 'همه',
      },
      {
        id: 'true',
        item: 'نمایش',
      },
      {
        id: 'false',
        item: 'عدم نمایش',
      },
    ],
    [],
  );
  const [filter, setFilter] = useState({
    name: undefined,
    teacher: 'all',
    visibility: 'all',
    tag: 'all',
    level: 'all',
  });
  const [teachers, setTeachers] = useState();
  const [tags, setTags] = useState();
  const [state, dispatch] = useGlobalState();
  const [showOp, setShowOp] = useState(false);
  const [levels, setLevels] = useState();
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
        generalRequest(
          routes.getListOfPackageLevels,
          'get',
          undefined,
          'data',
          props.token,
        ),
      ]).then(res => {
        props.setLoading(false);
        if (res[0] !== null) {
          setTeachers([
            {
              id: 'all',
              item: 'همه',
            },
            ...res[0].map(e => ({
              id: e.teacher,
              item: e.teacher,
            })),
          ]);
        }
        if (res[1] !== null) {
          setTags([
            {
              id: 'all',
              item: 'همه',
            },
            ...res[1].map(e => ({
              id: e,
              item: e,
            })),
          ]);
        }
        if (res[2] !== null) {
          setLevels([
            {
              id: 'all',
              item: 'همه',
            },
            ...res[2].map(e => ({
              id: e.id,
              item: e.title,
            })),
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
      dispatch({
        contents: res[0],
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  const handleOp = (idx, row) => {
    dispatch({
      selectedContent: state.contents[idx],
    });
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
          <PhoneView
            style={{
              gap: 20,
            }}>
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
            {levels && (
              <JustBottomBorderSelect
                values={levels}
                setter={t =>
                  setFilter(prevValues => ({
                    ...prevValues,
                    level: t,
                  }))
                }
                value={levels.find(e => e.id === filter.level)}
                placeholder={'سطح موردنظر'}
                subText={'سطح موردنظر'}
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
              dispatch({
                contents: newData,
              });
            }}
          />
        )}
      </CommonWebBox>
    </MyView>
  );
}
export default List;
