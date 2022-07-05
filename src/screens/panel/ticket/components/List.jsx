import {View} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import translator from '../Translator';
import commonTranslator from '../../../../tranlates/Common';
import {TextIcon} from '../../../../styles/Common/TextIcon';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import {Col} from 'react-grid-system';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {useState} from 'react';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';

function List(props) {
  const [status, setStatus] = useState();
  const statusKeyVals = [
    {name: translator.pending, id: 'pending'},
    {name: translator.finished, id: 'finished'},
  ];

  const selectStatus = (item_key, item_idx) => {
    setStatus(statusKeyVals[item_idx].id);
  };

  const handleOp = index => {
    console.log('====================================');
    console.log(index);
    console.log('====================================');
  };

  const columns = [
    {
      name: ' نام و نام خانوادگی',
      selector: row => row.student.name,
      grow: 1,
    },
    {
      name: 'واحد',
      selector: row => row.student.unit,
      grow: 1,
    },
    {
      name: 'ضرورت',
      selector: row => row.statusFa,
      grow: 1,
    },
    {
      name: 'زمان ایجاد',
      selector: row => row.answeredDate,
      grow: 4,
      wrap: true,
      style: {
        minWidth: '200px !important',
      },
      sortable: true,
      sortFunction: (a, b) => {
        return a.expireAt - b.expireAt;
      },
    },
    {
      name: 'تاریخ ایجاد آخرین وضعیت',
      selector: row => row.sendDate,
      grow: 4,
      wrap: true,
      style: {
        minWidth: '200px !important',
      },
      sortable: true,
      sortFunction: (a, b) => {
        return a.expireAt - b.expireAt;
      },
    },
    {
      name: 'وضعیت',
      selector: row => row.status,
      grow: 1,
    },
    {
      name: 'بررسی کننده',
      selector: row => row.status,
      grow: 1,
    },
  ];

  return (
    <View>
      <CommonWebBox
        child={
          <View>
            <TextIcon
              onPress={() => props.setMode('create')}
              theme={'rect'}
              text={translator.allRequests}
              icon={faPlus}
            />
            <PhoneView>
              <Col lg={6}>
                <PhoneView>
                  <JustBottomBorderSelect
                    isHalf={true}
                    onSelect={selectStatus}
                    values={statusKeyVals}
                    value={
                      status === undefined
                        ? ''
                        : status === 'pending'
                        ? translator.pending
                        : translator.finished
                    }
                    placeholder={translator.status}
                  />
                  <JustBottomBorderSelect
                    isHalf={true}
                    onSelect={selectStatus}
                    values={statusKeyVals}
                    value={
                      status === undefined
                        ? ''
                        : status === 'pending'
                        ? translator.pending
                        : translator.finished
                    }
                    placeholder={translator.status}
                  />
                </PhoneView>
              </Col>
              <Col lg={6}>
                <PhoneView>
                  <JustBottomBorderSelect
                    isHalf={true}
                    onSelect={selectStatus}
                    values={statusKeyVals}
                    value={
                      status === undefined
                        ? ''
                        : status === 'pending'
                        ? translator.pending
                        : translator.finished
                    }
                    placeholder={translator.status}
                  />
                  <CommonButton isHalf={true} title={commonTranslator.show} />
                </PhoneView>
              </Col>
            </PhoneView>
            <CommonDataTable
              handleOp={handleOp}
              columns={columns}
              removeUrl={routes.removeOffs}
              data={props.tickets}
            />
          </View>
        }
      />
    </View>
  );
}

export default List;
