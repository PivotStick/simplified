# EASY API

## Overview

This library will make your life easy.

**users.controller.js** exemple of a full controller file

```js
// no imports, no exports needed

// get endpoints
this.get = {
    /**
     * @description get all users
     */
    "/": async () => {
        /** ... */
    }

    /**
     * @description get one user using the "params.id"
     */
    "/:id": async ({ params }) => {
        /** ... */
    }
}

this.post = {
    /**
     * @description create a new user
     */
    "/": async ({ body }) => {
        /** ... */
    }
}

this.delete = {
    /**
     * This one is using a middleware named "checkAuth",
     * by using this syntax before the route path, it will
     * automatically search for the "checkAuth.js" file in the
     * declared middlewares path folder (read the quickstart to see how)
     *
     * @description delete a user using the "params.id"
     */
    "@checkAuth /:id": async ({ params }) => {
        /** ... */
    }
}
```

## Quick start

This will automatically generate the directories and demo files in them

```js
const App = require("easy-api");

new App({
    architecture: {
        [__dirname]: {
            // This pattern defines how you should name your controllers
            // users.controller.js ✔ "users" will be the prefix for his endpoints
            // books.controller.js ✔ "books" will be the prefix for his endpoints
            // thing.controllers.js ⨯ this file will be ignored
            controllers: /^(?<prefix>\w+)\.controller\.js$/,
            middlewares: /^\w+\.js$/, // this pattern is recommanded
        },
    },
});
```

This will open an express server on the port **3500** by default.
This can be changed with the _"port"_ property.

```js
const App = require("easy-api");

new App({
    port: 4000,
    architecture: {
        [__dirname]: {
            controllers: /^(?<prefix>\w+)\.controller\.js$/,
            middlewares: /^\w+\.js$/,
        },
    },
});
```

This will listen at the port **4000**.

You can change the controllers name folder.
The middlewares folder can also be changed.

```js
const App = require("easy-api");

new App({
    port: 4000,
    endpoints: {
        controllers: "resolvers",
        middlewares: "functions",
    },
    architecture: {
        [__dirname]: {
            resolvers: /^(?<prefix>\w+)\.controller\.js$/,
            functions: /^\w+\.js$/,
        },
    },
});
```

# have fun!
