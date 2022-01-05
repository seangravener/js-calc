// import eventbus (here or in actions?)

import {
  START,
  FIRST_ARG,
  FIRST_ARG_FLOAT,
  OP
} from './fsmachine/actions/index.js';

export const calcMachineDefinition = {
  machineId: 'calcMachineDefinition',
  initialState: 'START',
  START,
  FIRST_ARG,
  FIRST_ARG_FLOAT,
  OP,
};
