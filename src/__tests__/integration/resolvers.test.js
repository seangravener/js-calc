import { DataService } from '../../calculator/data/service.js';
import { keypadResolvers } from '../../calculator/components/keypad/resolvers.js';
import { Key } from '../../calculator/components/base/Key.js';

const api = DataService.load();
const resolvers = keypadResolvers;

describe('Given a resolver', () => {
  beforeEach(() => {
    api.memory.clear();
  });

  describe('receives input pattern [xyz]', () => {
    let inputPattern = [];
    let keys = [];

    beforeEach(() => {
      inputPattern = ['1', '+', '1'];
      keys = inputPattern.map((symbol) => new Key({ key: symbol }));
    });

    it('should expect [xyz] resolvers to have been called', () => {

    });
  });
});
