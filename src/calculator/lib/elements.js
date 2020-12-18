const newEl = (name, markup) => {
  const tag = document.createElement(name);
  tag.innerHTML = markup;
  return tag;
};

export { newEl };
