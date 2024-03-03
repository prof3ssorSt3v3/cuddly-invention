/*
<some-component action="action3">
        <span slot="title">Component title</span>
        <span slot="btnTwo">Action Label</span>
      </some-component>
*/
const template = document.createElement('template');
template.innerHTML = `
      <style>
        :host(custom-dialog){}
        div.someComp{
          margin: 1rem;
          padding: 1rem;
          display: block;
          background-color: cornflowerblue;
        }
        .someComp h1{
          color: white;
          font-weight: 100;
        }
        .someComp button{
          padding: 0.25rem 1rem;
          background-color: #383d41;
          color: #fff;
          font-weight: 100;
        }
      </style>
      <div class="someComp">
        <h1><slot name="title">Title</slot></h1>
        <p>
          <button><slot name="btnOne">click me</slot></button>
        </p>
      </div>
    `;

class SomeComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.button = this.shadowRoot.querySelector('button');
    this.button.addEventListener('click', this.#handleClick.bind(this));
    this.button.addEventListener('click', this.#someInternalFunc.bind(this));
  }

  #handleClick(clickEv) {
    // console.log(clickEv.target); //the slot from the HTML that gets loaded into the component
    // console.log(this); //the component in the HTML
    // console.log(this.shadowRoot); //the shadowRoot
    // console.log(this.shadowRoot.querySelector('div.someComp')); //the div.someComp inside shadowRoot
    let ev = new CustomEvent('behappy', { detail: { func: this.action }, bubbles: true, composed: true });
    //composed: true - means that the event can bubble outside the shadowdom
    //dispatch the event from the div that contains the button
    this.shadowRoot.querySelector('div').dispatchEvent(ev);
  }

  #someInternalFunc() {
    console.log('a function inside the component class was called');
  }

  static observedAttributes = ['size', 'action'];

  get action() {
    return this.getAttribute('action');
  }

  set action(value) {
    return this.setAttribute('action', value);
  }

  get size() {
    return this.getAttribute('size');
  }

  set size(value) {
    return this.setAttribute('size', value);
  }

  connectedCallback() {
    //method is run when the web component is added to the web page
    this.shadowRoot.querySelector('button').style.fontSize = `${this.size}rem`;
    this.shadowRoot.querySelector('h1').style.fontSize = `${this.size * 2}rem`;
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    // console.log(attributeName, oldValue, newValue);
    //when an attribute is changed
    if (attributeName === 'size') {
      this.shadowRoot.querySelector('button').style.fontSize = `${newValue}rem`;
      this.shadowRoot.querySelector('h1').style.fontSize = `${newValue * 2}rem`;
    }
  }
}

// Define the custom element tag
customElements.define('some-component', SomeComponent);
