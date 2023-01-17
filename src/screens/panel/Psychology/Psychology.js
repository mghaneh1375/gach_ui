import React, {useState} from 'react';
import {CommonWebBox, MyView, SimpleText} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import Card from './components/Card';
import Description from './components/description';

function Psychology(props) {
  const navigate = props.navigate;

  const [description, setDescription] = useState([
    {
      name: ' نام تست ',
      description:
        ' یکی از مشهورترین تست هایی که در دنیا برای سنجش روانی مورد استفاده قرار می گیرد آزمون آنلاین NEO است. این تست کاربردهای مختلفی در زمینه ازدواج، استخدام و تشخیص اختلالات روانشناسی دارد. فرم استاندارد مدل شخصیت شناسی NEO پنج عامل اصلی شخصیت بزرگسالان را بررسی می‌کند که همان BIGE FIVE است و علاوه بر ۵ صفت اصلی در هرکدام، شش خصوصیت را نیز برمی‌شمرد. ',
      number: '  24 سوال ',
      audience: ' 18 سال به بالا ',
      price: ' 300.000 ',
    },
    {
      name: ' نام تست ',
      description:
        ' یکی از مشهورترین تست هایی که در دنیا برای سنجش روانی مورد استفاده قرار می گیرد آزمون آنلاین NEO است. این تست کاربردهای مختلفی در زمینه ازدواج، استخدام و تشخیص اختلالات روانشناسی دارد. فرم استاندارد مدل شخصیت شناسی NEO پنج عامل اصلی شخصیت بزرگسالان را بررسی می‌کند که همان BIGE FIVE است و علاوه بر ۵ صفت اصلی در هرکدام، شش خصوصیت را نیز برمی‌شمرد. ',
      number: '24',
      answered: '20',
      notAnswered: '5',
    },
  ]);
  const [text, setText] = useState([
    {
      descriptionText:
        ' برنامه‌نویسی یک مهارت اساسی است که در دنیای امروز بسیار پرکاربرد است. ممکن است تصور کنید که برنامه‌نویسی تنها مختص مهندسان کامپیوتر است، در حالی که چنین نیست. نیاز به این تخصص امروزه در تمام رشته‌ها از جمله پزشکی، اقتصاد، علوم انسانی، مدیریت، حمل و نقل و غیره احساس می‌شود ',
    },
  ]);

  return (
    <>
      <MyView>
        {/* {description.map((elem,index)=>{
            return ( */}
        <Card
          description={description[0].description}
          name={description[0].name}
          numberQuestion={description[0].number}
          audience={description[0].audience}
          price={description[0].price}
          answered={description[1].answered}
          notAnswered={description[1].notAnswered}
        />
        {/* )
        })} */}

        <Description descriptionText={text[0].descriptionText} />
        <CommonWebBox style={{...styles.width80}}>
          <SimpleText style={{...styles.BlueBold}} text={' تگ ها '} />
          <SimpleText
            text={
              ' برنامه‌نویسی یک مهارت اساسی است که در دنیای امروز بسیار پرکاربرد است. ممکن است تصور کنید که برنامه‌نویسی تنها مختص مهندسان کامپیوتر است، در حالی که چنین نیست. نیاز به این تخصص امروزه در تمام رشته‌ها از جمله پزشکی، اقتصاد، علوم انسانی، مدیریت، حمل و نقل و غیره احساس می‌شود  '
            }
          />
        </CommonWebBox>
      </MyView>
    </>
  );
}

export default Psychology;
