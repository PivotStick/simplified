/**
 * No imports required
 * No exports, only route declarations
 */

this.get = {
    /**
     * @description get all users
     */
    "/": async () => {
        // Get all users

        return {
            status: 200,
            json: {
                users: [
                    /** ... */
                ],
            },
        };
    },

    /**
     * @description get one user
     */
    "/:id": async ({ params }) => {
        // Get one user

        return {
            status: 200,
            json: {
                user: {
                    id: params.id,
                    username: "😎",
                },
            },
        };
    },
};

this.post = {
    /** ... */
};

this.patch = {
    /** ... */
};

this.put = {
    /** ... */
};

this.delete = {
    /** ... */

    /**
     * The "@checkAuth" is a syntax that will automatically search in the
     * middlewares directory that you specified in the architecture property
     *
     * @description will delete one user using the id
     */
    "@checkAuth /:id": async ({ params }) => {
        // delete one user
    },

    /**
     * You can add multiple middleware in the order you want!
     *
     * @description this is just an example
     */
    "@checkAuth @demo @middleware /weird-endpoint": async () => {
        // weird logic
    },
};
