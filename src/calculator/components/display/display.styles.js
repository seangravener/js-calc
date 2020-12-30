import { useBorderBox } from '../../lib/styles.js'

let styles = `
  :host {
    display: block;
    background: var(--grey-1);
    width: 100%;
    height: 150px;
    padding: 20px;
  }

  .calc-operation {
    text-align: right;
    color: var(--grey-3);
    font-size: 21px;
    padding-bottom: 10px;
    border-bottom: dotted 1px;
  }

  .calc-typed {
    margin-top: 20px;
    font-size: 45px;
    text-align: right;
    color: var(--text-color);
  }
`

styles = useBorderBox(styles)
export { styles }
