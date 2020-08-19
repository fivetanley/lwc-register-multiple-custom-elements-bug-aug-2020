# lwc-register-multiple-custom-elements-bug-aug-2020

This is an app that shows a bug in Lightning Web Components.

For some context: we are trying to see if we can ship some lightning web
components of an app we are building so they could potentially be used
standalone by other apps that don't use LWC yet.

The bug is that you can't register custom elements that an already registered
custom element depends on when using `customElements.define(tagName, LightningWebComponentSubclass.CustomElementConstructor)`.

The scenario:

-   Two components: CustomA and CustomB
-   CustomA renders CustomB in its template: `<custom-b></custom-b>`
-   Defining CustomA as a native web component via `CustomElementConstructor` works without error: `customElements.define('custom-a', CustomA.CustomElementConstructor)`
-   Defining CustomB as a native web component immediately after with the same method raises the `NotSupportedError` below: `customElements.define('custom-b', CustomB.CustomElementConstructor)`

When started with `npm run watch`, and loading in the browser, we get the following runtime error:

```
NotSupportedError: Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree.
```

To reproduce (you can also look at the files in this project), create the following files:

Code where error gets triggered when defining LWC as regular web components using `customElements.define`:

```javascript
// src/index.js

import A from './modules/custom/a/a';
import B from './modules/custom/b/b';

// no error when registering A which depends on B
customElements.define('custom-a', A.CustomElementConstructor);
// error when trying to register B: NotSupporteErorr: Failed to execute 'attachShadow' on 'Element'...
customElements.define('custom-b', B.CustomElementConstructor);
```

Component A:

```javascript
// src/modules/custom/a/a.js
import { LightningElement } from 'lwc';

export default class extends LightningElement {}
```

```html
<!-- src/modules/custom/a/a.html -->
<template>
    This is the A Component
    <custom-b></custom-b>
</template>
```

Component B:

```javascript
// src/modules/custom/b/b.js
import { LightningElement } from 'lwc';

export default class extends LightningElement {}
```

```html
<!-- src/modules/custom/a/a.html -->
<template>
    This is the B component
</template>
```

## How to start?

Start simple by running `yarn watch` (or `npm run watch`, if you set up the project with `npm`). This will start the project with a local development server.

The source files are located in the [`src`](./src) folder. All web components are within the [`src/modules`](./src/modules) folder. The folder hierarchy also represents the naming structure of the web components.

Find more information on the main repo on [GitHub](https://github.com/muenzpraeger/create-lwc-app).
