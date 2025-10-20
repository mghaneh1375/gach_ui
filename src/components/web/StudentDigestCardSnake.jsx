import {PhoneView, SimpleText} from '@/styles';
import {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';

function StudentDigestCardSnake({student, isInPhone, children}) {
  const [pic, setPic] = useState();
  useEffect(() => {
    setPic(student.pic);
  }, [student.pic]);

  return (
    <>
      <PhoneView style={{gap: 20, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => window.open('/manageStudent/' + student.id, '_blank')}
          style={{gap: 5, alignItems: 'center'}}>
          {pic && (
            <Image
              style={{
                width: isInPhone ? 90 : 140,
                height: isInPhone ? 90 : 140,
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              source={pic}
            />
          )}

          <SimpleText
            style={{fontSize: 11}}
            text={student.first_name + ' ' + student.last_name}
          />

          {children}
        </TouchableOpacity>
      </PhoneView>
    </>
  );
}

export default StudentDigestCardSnake;
