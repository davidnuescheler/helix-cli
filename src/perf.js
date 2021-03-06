/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

'use strict';

/* eslint no-console: off */
// TODO: remove the following line
/* eslint no-unused-vars: off */

module.exports = function perf() {
  let executor;

  return {
    set executor(value) {
      executor = value;
    },
    command: 'perf',
    desc: 'Test performance',
    builder: (yargs) => {
      yargs
        .option('calibre-auth', {
          describe: 'API token from https://calibreapp.com/',
          type: 'string',
          demandOption: true,
        })
        .option('device', {
          describe: 'Device to test from',
          type: 'string',
          default: 'MotorolaMotoG4',
          choices: ['MotorolaMotoG4',
            'iPhone5',
            'iPhone6',
            'iPhone6Plus',
            'iPhone7',
            'iPhone8',
            'Nexus5X',
            'Nexus6P',
            'GalaxyS5',
            'iPad',
            'iPadPro'],
        })
        .option('connection', {
          describe: 'Throttle connection speed to',
          default: 'regular3G',
          type: 'string',
          choices: ['regular2G',
            'good2G',
            'slow3G',
            'regular3G',
            'good3G',
            'emergingMarkets',
            'regular4G',
            'LTE',
            'dsl',
            'wifi',
            'cable'],
        })
        .option('location', {
          describe: 'Run the test from this location',
          type: 'string',
          default: 'London',
          choices: ['NorthVirginia',
            'Frankfurt',
            'Sydney',
            'Ohio',
            'California',
            'Oregon',
            'Canada',
            'Ireland',
            'Tokyo',
            'Seoul',
            'Singapore',
            'Mumbai',
            'SaoPaulo',
            'London'],
        })
        .help();
    },
    handler: async (argv) => {
      if (!executor) {
        // eslint-disable-next-line global-require
        const PerfCommand = require('./perf.cmd'); // lazy load the handler to speed up execution time
        executor = new PerfCommand();
      }

      await executor
        .withCalibreAuth(argv.calibreAuth)
        .withDevice(argv.device)
        .withConnection(argv.connection)
        .withLocation(argv.location)
        .run();
    },
  };
};
