export default {
  key: _ACTIVE_KEY_,
  display: _ACTIVE_DISPLAY_
} 

const _ACTIVE_KEY_ = {
  currentKey: {},
  previousKey: {},
};

const _ACTIVE_DISPLAY_ = {
  msg: '',
  err: '',
  result: _instance ? _instance.value : '',
  operandA: '',
  operator: '',
  operandB: ''
}
