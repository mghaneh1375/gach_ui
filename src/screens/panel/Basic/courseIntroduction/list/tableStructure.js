import {BASE_SITE_NAME} from '@/api/utility';
import commonTranslator from '@/translator/common';
const columns = [
  {
    name: commonTranslator.title,
    selector: row => row.title,
    center: true,
    grow: 1,
    maxWidth: '200px',
    minWidth: '200px',
  },
  {
    name: commonTranslator.link,
    selector: row => `${BASE_SITE_NAME}packages/course/${row.title}`,
    center: true,
    grow: 1,
    maxWidth: '200px',
    minWidth: '200px',
  },
];
export default columns;
