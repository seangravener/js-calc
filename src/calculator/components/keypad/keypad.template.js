const templateFn = ({ title }) => `
<b>Title:</b>
<h1>${title}</h1>
<div class="calc-button-row">
      <div class="button c">C</div>
      <div class="button l">≠</div>
      <div class="button l">%</div>
      <div class="button l">/</div>
    </div>
    <div class="calc-button-row">
      <div class="button">7</div>
      <div class="button">8</div>
      <div class="button">9</div>
      <div class="button l">x</div>
    </div>
    <div class="calc-button-row">
      <div class="button">4</div>
      <div class="button">5</div>
      <div class="button">6</div>
      <div class="button l">−</div>
    </div>
    <div class="calc-button-row">
      <div class="button">1</div>
      <div class="button">2</div>
      <div class="button">3</div>
      <div class="button l">+</div>
    </div>
    <div class="calc-button-row">
      <div class="button">.</div>
      <div class="button">0</div>
      <div class="button"><</div>
      <div class="button l">=</div>
    </div>
  </div>`;

export { templateFn };
