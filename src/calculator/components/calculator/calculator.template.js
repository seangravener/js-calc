const templateFn = (locals) => `
  <div class="display"><slot name="display"></slot></div>
  <div class="buttons"><slot name="buttons"></slot></div>
`

export { templateFn }
