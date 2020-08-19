// import { createElement } from 'lwc';
// import MyApp from 'my/app';
import A from './modules/custom/a/a';
import B from './modules/custom/b/b';

customElements.define('custom-a', A.CustomElementConstructor);
customElements.define('custom-b', B.CustomElementConstructor);
// const app = createElement('my-app', { is: MyApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
// document.querySelector('#main').appendChild(app);
