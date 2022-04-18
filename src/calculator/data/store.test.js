import { Store } from './store.js';

const actions = {};
const mutations = {};
const state = { message1: 'hello', message2: 'everyone' };

describe('Given the Store', () => {
  const store = new Store({ actions, mutations, state });

  it('is created', () => expect(store).toBeInstanceOf(Store));
  it('and the initial state is ', async () => {
    // expect(store.machine.value).toBe('{}');
  });

  describe('and given input', () => {
    beforeEach(() => {});

    it('should reset to default state', async () => {});
  });
});
