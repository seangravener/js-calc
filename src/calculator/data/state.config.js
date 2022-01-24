// import eventbus (here or in actions?)

import {
  START,
  FIRST_ARG,
  FIRST_ARG_FLOAT,
  OP,
  EQUAL,
  SEC_ARG,
  SEC_ARG_DOT,
  SEC_ARG_FLOAT,
} from '../components/keypad/transitions/index.js';

export const calcMachineDefinition = {
  machineId: 'calcMachineDefinition',
  initialState: 'START',
  START,
  FIRST_ARG,
  FIRST_ARG_FLOAT,
  OP,
  EQUAL,
  SEC_ARG,
  SEC_ARG_DOT,
  SEC_ARG_FLOAT,
};
