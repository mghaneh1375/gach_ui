import {getDevice} from '@/services/utility.js';
import {MyView, PhoneView, SimpleText} from '@/styles';
import vars from '@/styles/root';
import {useMemo} from 'react';
import ItemCard from './ItemCard.jsx';
function RSS({news}) {
  const isInPhone = useMemo(() => {
    return getDevice().indexOf('WebPort') !== -1;
  }, []);

  if (isInPhone)
    return (
      <MyView
        style={{
          gap: 10,
          paddingRight: 10,
          paddingLeft: 10,
        }}>
        <SimpleText
          text={'آخرین اخبار'}
          style={{
            color: vars.DARK_BLUE,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            margin: 20,
          }}
        />
        <MyView>
          {news &&
            news.slice(0, Math.min(news.length, 5)).map((currNews, index) => {
              return <ItemCard news={currNews} key={index} />;
            })}
        </MyView>
        <MyView>
          {news &&
            news.slice(5, Math.min(news.length, 10)).map((currNews, index) => {
              return <ItemCard news={currNews} key={index} />;
            })}
        </MyView>
        {/* <MyView>
          {selectedNews && (
            <>
              <MyView
                style={{
                  background:
                    'url("' +
                    selectedNews.mainImage +
                    '") center center / contain no-repeat',
                  backgroundSize: 'contain',
                  height: 300,
                  width: imgWidth,
                  justifyContent: 'end',
                  paddingBottom: 10,
                }}></MyView>
              <MyView
                style={{
                  gap: 10,
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                }}>
                <MyView>
                  <SimpleText
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: vars.DARK_BLUE,
                    }}
                    text={selectedNews.title}
                  />
                  {selectedNews.description?.length > 0 && (
                    <RenderHTML
                      contentWidth={'100%'}
                      source={{
                        html: selectedNews.description,
                      }}
                      tagsStyles={tagsStyles}
                      systemFonts={systemFonts}
                    />
                  )}
                </MyView>
                <MyView>
                  {selectedNews.categories.length > 0 && (
                    <PhoneView style={{gap: '10px'}}>
                      {selectedNews.categories
                        .slice(0, Math.min(7, selectedNews.categories.length))
                        .map((category, key) => {
                          return (
                            <SimpleText
                              style={{fontSize: 11}}
                              text={'#' + category}
                            />
                          );
                        })}
                    </PhoneView>
                  )}
                  <SimpleText
                    style={{
                      textAlign: 'left',
                      margin: 10,
                      color: vars.DARK_BLUE,
                    }}
                    text={'تاریخ ایجاد: ' + selectedNews.date}
                  />
                </MyView>
              </MyView>
            </>
          )}
         </MyView> */}
      </MyView>
    );
  return (
    <PhoneView
      style={{
        gap: 10,
        paddingRight: 10,
        paddingLeft: 10,
      }}>
      <MyView>
        {news &&
          news.slice(0, Math.min(news.length, 5)).map((currNews, index) => {
            return <ItemCard news={currNews} key={index} />;
          })}
      </MyView>
      <MyView>
        {news &&
          news.slice(5, Math.min(news.length, 10)).map((currNews, index) => {
            return <ItemCard news={currNews} key={index} />;
          })}
      </MyView>
      {/* <PhoneView style={{width: 'calc(100% - 320px)'}}>
        {selectedNews && (
          <>
            <MyView
              style={{
                gap: 10,
                width: 'calc(100% - ' + imgWidth + 'px)',
                justifyContent: 'space-between',
                paddingBottom: '10px',
              }}>
              <MyView>
                <SimpleText
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: vars.DARK_BLUE,
                  }}
                  text={selectedNews.title}
                />
                {selectedNews.description?.length > 0 && (
                  <RenderHTML
                    contentWidth={'100%'}
                    source={{
                      html: selectedNews.description,
                    }}
                    tagsStyles={tagsStyles}
                    systemFonts={systemFonts}
                  />
                )}
              </MyView>
              <MyView>
                {selectedNews.categories.length > 0 && (
                  <PhoneView style={{gap: '10px'}}>
                    {selectedNews.categories
                      .slice(0, Math.min(7, selectedNews.categories.length))
                      .map((category, key) => {
                        return (
                          <SimpleText
                            style={{fontSize: 11}}
                            text={'#' + category}
                          />
                        );
                      })}
                  </PhoneView>
                )}
                <SimpleText
                  style={{textAlign: 'left', margin: 10, color: vars.DARK_BLUE}}
                  text={'تاریخ ایجاد: ' + selectedNews.date}
                />
              </MyView>
            </MyView>
            <MyView
              style={{
                background:
                  'url("' +
                  selectedNews.mainImage +
                  '") center center / contain no-repeat',
                backgroundSize: 'contain',
                height: 300,
                width: imgWidth,
                justifyContent: 'end',
                paddingBottom: 10,
              }}></MyView>
          </>
        )}
       </PhoneView> */}
    </PhoneView>
  );
}
export default RSS;
