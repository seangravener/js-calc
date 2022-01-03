import { StateService } from './state.service.js';

const service = StateService.load();

describe('Given the State Machine', () => {
  beforeEach(() => {});

  it('is created', () => expect(service).toBeInstanceOf(StateService));

  describe('state machine', () => {});
});
