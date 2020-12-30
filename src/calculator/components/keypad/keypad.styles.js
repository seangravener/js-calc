import { useBorderBox } from '../../lib/styles.js'

let styles = `
.calc-button-row {
  width: 100%;
  background: var(--grey-4);
}

.button {
  width: 25%;
  background: var(--grey-2);
  color: var(--text-color);
  padding: 20px;
  display: inline-block;
  font-size: 25px;
  text-align: center;
  vertical-align: middle;
  border-right: solid 2px var(--grey-4);
  border-bottom: solid 2px var(--grey-4);
  transition: all 0.2s ease-in-out;
}

.button.l {
  color: var(--button-l-color);
  background: var(--button-l-bg);
}

.button.c {
  color: var(--button-c-color);
  background: var(--button-c-bg);
}

.button:hover {
  background: var(--highlight);
  /* transform: rotate(5deg); */
}

.button.c:hover,
.button.l:hover {
  background: var(--highlight);
  color: var(--text--hover);
}`

styles = useBorderBox(styles)
export { styles }
