import {SimpleText} from '@/styles';
import commonTranslator from '@/translator/common';

function RecentReport({report}) {
  return (
    <>
      {report.tags && <SimpleText text={report.tags.join(' - ')} />}
      {report.desc && <SimpleText text={report.desc} />}
      <SimpleText text={`${commonTranslator.createdAt}: ${report.createdAt}`} />
    </>
  );
}

export default RecentReport;
