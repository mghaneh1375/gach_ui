import {CommonWebBox, PhoneView} from '@/styles';
import {useCallback, useEffect, useState} from 'react';
import commonTranslate from '@/translator/common';
import {generalRequest} from '@/api/utility';
import {routes} from '@/api/apiRoutes';
import {styles} from '@/styles/common/styles';
import Card from '@/screens/panel/content/seo/components/Card';
import {showError, showSuccess} from '@/services/utility';

function Seo({token, setMode, setLoading, item}) {
  const [tags, setTags] = useState();
  const [subMode, setSubMode] = useState('list');

  const fetchTags = useCallback(async () => {
    setLoading(true);
    const res = await generalRequest(
      routes.fetchCourseIntroductionSeoTags + item.id,
      'get',
      undefined,
      'data',
      token,
    );
    setLoading(false);
    if (res === null) {
      setMode('list');
      return;
    }
    setTags(res);
  }, [token, setLoading, item, setMode]);

  useEffect(() => {
    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  return (
    <>
      {subMode === 'list' && (
        <CommonWebBox
          backBtn={true}
          onBackClick={() => setMode('list')}
          header={commonTranslate.manageSeo}
          addBtn={true}
          onAddClick={() => setSubMode('create')}>
          <PhoneView style={styles.gap10}>
            {tags &&
              tags.map((elem, index) => {
                return (
                  <Card
                    onDelete={() => {
                      const tmp = tags.filter(itr => {
                        return itr.keyword !== elem.keyword;
                      });
                      setTags(tmp);
                    }}
                    id={elem.id}
                    token={token}
                    setLoading={setLoading}
                    elem={{
                      key: elem.keyword,
                      value: elem.value,
                    }}
                    key={index}
                    removeFunc={async key => {
                      const res = await generalRequest(
                        routes.addCourseIntroductionSeoTag + item.id,
                        'delete',
                        {
                          key: key,
                        },
                        undefined,
                        token,
                      );
                      if (res !== null) showSuccess();
                      return res;
                    }}
                  />
                );
              })}
          </PhoneView>
        </CommonWebBox>
      )}
      {subMode === 'create' && (
        <CommonWebBox
          header={'افزودن تگ'}
          backBtn={true}
          onBackClick={() => setSubMode('list')}>
          <Card
            token={token}
            setLoading={setLoading}
            onAdd={data => {
              setTags([
                ...tags,
                {
                  keyword: data.key,
                  value: data.value,
                },
              ]);
              setSubMode('list');
            }}
            id={item.id}
            elem={undefined}
            storeFunc={async data => {
              try {
                const res = await generalRequest(
                  routes.addCourseIntroductionSeoTag + item.id,
                  'put',
                  data,
                  'status',
                  token,
                  ['key', 'value'],
                );

                if (res !== null && res !== undefined) showSuccess();
                return res;
              } catch (e) {
                showError(commonTranslate.pleaseFillAllFields);
                return null;
              }
            }}
          />
        </CommonWebBox>
      )}
    </>
  );
}

export default Seo;
