import * as path from 'path';
import { BrowserCheck } from 'checkly/constructs';
import { emailChannel } from './resources/alert-channels';

const alertChannels = [emailChannel];

new BrowserCheck('checkly-migration-check', {
  name: 'Browser Checkly Migration Check Security',
  alertChannels,
  frequency: 1440,
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/checkly-migration.spec.ts'),
  },
  runParallel: false,
});
