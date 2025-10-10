import {faChevronDown, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility.js';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import BestComments from '@/components/web/comment/BestComments.jsx';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
} from '@/styles/CommonComponents.jsx';
import {styles} from '@/styles/common/styles';
import vars from '@/styles/root';
import commonTranslator from '@/translator/common';
import Card from './Card.jsx';
import Filter from './Filter.jsx';
function AdvisorsBeforeLogin(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [advisorPlans, setAdvisorPlans] = useState();
  const [bestComments, setBestComments] = useState();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [minAge, setMinAge] = useState();
  const [maxAge, setMaxAge] = useState();
  const [tags, setTags] = useState();
  const [pageIndex, setPageIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState();
  const fetchData = React.useCallback(() => {
    dispatch({
      loading: true,
    });
    Promise.all([
      generalRequest(
        routes.getAllAdvisors + '?pageIndex=' + pageIndex,
        'get',
        undefined,
        'data',
        undefined,
      ),
      generalRequest(routes.getDistinctAdvisorsTags, 'get', undefined, 'data'),
      generalRequest(
        routes.getTopComments + 'advisor',
        'get',
        undefined,
        'data',
      ),
    ]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] == null || res[1] == null || res[2] == null) {
        props.navigate('/');
        return;
      }
      setTags([
        ...res[1].map(elem => ({
          id: elem,
          item: elem,
        })),
        {
          id: 'all',
          item: 'همه',
        },
      ]);
      setMax(res[0].filters.maxPrice);
      setMin(res[0].filters.minPrice);
      setMinAge(res[0].filters.minAge);
      setMaxAge(res[0].filters.maxAge);
      setBestComments(res[2]);
      setHasMore(res[0].hasMore);
      setSelectableItems(res[0].data);
      setTotalSelectableItemsSize(res[0].totalCount);
      if (totalCount === undefined) setTotalCount(res[0].totalCount);
    });
  }, [dispatch, props, pageIndex, totalCount]);
  useEffectOnce(() => {
    fetchData();
  });
  const [selectableItems, setSelectableItems] = useState();
  const [totalSelectableItemsSize, setTotalSelectableItemsSize] = useState();
  const [clearFilter, setClearFilter] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [doFilter, setDoFilter] = useState(false);
  return (
    <>
      <>
        {
          <CommonWebBox>
            <EqualTwoTextInputs>
              <PhoneView
                style={{
                  ...styles.alignSelfCenter,
                  ...styles.gap10,
                  ...styles.alignItemsCenter,
                }}>
                <SimpleText
                  style={{
                    ...styles.BlueBold,
                    ...styles.fontSize17,
                  }}
                  text={'لیست مشاوران'}
                />
                {selectableItems !== undefined && (
                  <SimpleText
                    style={{
                      ...styles.fontSize13,
                      ...styles.dark_blue_color,
                    }}
                    text={
                      'نمایش ' +
                      totalSelectableItemsSize +
                      ' مورد از ' +
                      totalCount +
                      ' مورد '
                    }
                  />
                )}
              </PhoneView>
              <PhoneView
                style={{
                  ...styles.alignSelfCenter,
                  ...styles.gap10,
                }}>
                <SimpleText
                  style={{
                    ...styles.alignSelfCenter,
                    ...styles.gap10,
                    ...styles.cursor_pointer,
                    ...styles.colorOrangeRed,
                  }}
                  onPress={() => setClearFilter(true)}
                  text={commonTranslator.clearFilters}
                />
                <CommonButton
                  iconDir={'left'}
                  textStyle={{
                    ...styles.fontSize17,
                    ...styles.bold,
                  }}
                  icon={showFilter ? faChevronDown : faChevronRight}
                  onPress={() => {
                    setShowFilter(!showFilter);
                  }}
                  title={
                    showFilter
                      ? commonTranslator.lessFilters
                      : commonTranslator.showFilters
                  }
                />
              </PhoneView>
            </EqualTwoTextInputs>
            {min && max && maxAge && minAge && (
              <Filter
                showFilter={showFilter}
                min={min}
                max={max}
                minAge={minAge}
                maxAge={maxAge}
                tags={tags}
                token={props.token}
                setLoading={new_status =>
                  dispatch({
                    loading: new_status,
                  })
                }
                setClearFilter={setClearFilter}
                clearFilter={clearFilter}
                doFilter={doFilter}
                setDoFilter={setDoFilter}
                pageIndex={pageIndex}
                close={() => setShowFilter(false)}
                setHasMore={setHasMore}
                setTotalSelectableItemsSize={setTotalSelectableItemsSize}
                setSelectableItems={items => {
                  setPageIndex(1);
                  setSelectableItems(items);
                }}
                addToSelectableItems={items => {
                  setSelectableItems([...selectableItems, ...items]);
                }}
              />
            )}
          </CommonWebBox>
        }

        <>
          <BestComments
            isInPhone={state.isInPhone}
            bestComments={bestComments}
          />
          <PhoneView
            style={{
              ...styles.gap15,
              ...styles.margin15,
            }}>
            {selectableItems !== undefined &&
              selectableItems.map((elem, index) => {
                return (
                  <Card
                    isMyAdvisor={false}
                    navigate={props.navigate}
                    hasOpenRequest={false}
                    key={index}
                    data={elem}
                    selected={false}
                  />
                );
              })}
          </PhoneView>
          {hasMore && advisorPlans === undefined && (
            <SimpleText
              onPress={() => {
                setPageIndex(pageIndex + 1);
                setDoFilter(true);
              }}
              style={{
                color: vars.ORANGE_RED,
                fontWeight: 'bold',
                fontSize: 17,
                textAlign: 'center',
                margin: '20px',
                cursor: 'pointer',
              }}
              text={'نمایش بیشتر'}
            />
          )}
        </>
      </>
    </>
  );
}
export default AdvisorsBeforeLogin;
