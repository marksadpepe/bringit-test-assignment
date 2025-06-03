import { createProfiguration } from '@golevelup/profiguration';

import { ConfigDto } from 'src/config/config.dto';

export const config = createProfiguration<ConfigDto>({
  database: {
    url: {
      default: '',
      env: 'DATABASE_URL',
    },
  },
});
