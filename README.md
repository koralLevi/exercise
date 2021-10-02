project structure:

├── index.js
├── _controllers
│   └── example
|       |── controllerName.js
|       └── controllerName.spec.js
├── _services
│   ├── serviceName.js
│   └── serviceName.test.js
├── configuration
│   ├── middleware.js
│   ├── routes.js
│   └── constants.js
└── package.json


HOW TO RUN THE SERVICE:

*   SERVER 243:
    docker-compose up -d
    docker-compose -f docker-compose-node.yml up -d

*   SERVER 3:
    docker-compose -f docker-compose-node.yml up -d


NOTES:
*   npm audit --json passed successfully