import './some-component.js';

(() => {
  const comp = document.querySelector('some-component');
  comp.addEventListener('behappy', handleSomeEvent);
})();

function handleSomeEvent(ev) {
  // get the name of the function from inside the ev.detail property
  let detail = { ...ev.detail };
  if ('func' in detail && typeof eval(detail['func']) === 'function') {
    let f = eval(detail['func']);
    f();
  }
}

function action3() {
  //used in the HTML func attribute
  document.querySelector('header').style.backgroundColor = `#${Math.random().toString(16).substring(2, 8)}`;
  let component = document.querySelector('some-component');
  let newSize = Math.random() * 3 + 1;
  component.setAttribute('size', newSize);
}
