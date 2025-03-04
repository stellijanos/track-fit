const app = require('../../app');

const listRoutes = () => {
    console.log('\nList of Routes:');
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            const methods = Object.keys(middleware.route.methods)
                .map((m) => m.toUpperCase())
                .join(', ');
            console.log(`${methods} ${middleware.route.path}`);
        }
    });
    console.log('\n');
};

listRoutes();
