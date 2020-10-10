const componentExists = require('../utils/componentExists');


module.exports = {
  description: 'Generate Go Crud Api',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'task',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'input',
      name: 'name_repository',
      message: 'What should it be repository nmae?',
      default: 'github.com/juanfer2/api-rest-go',
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../go-app/repositories/{{snakeCase name}}_repository.go',
        templateFile: './go-crud-api/defaults/repository.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path:
          '../go-app/services/{{snakeCase name}}s_service.go',
        templateFile: './go-crud-api/defaults/service.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path:
          '../go-app/controllers/{{snakeCase name}}s_controller.go',
        templateFile: './go-crud-api/defaults/controller.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path:
          '../go-app/controllers/{{snakeCase name}}s_routes.go',
        templateFile: './go-crud-api/defaults/route.js.hbs',
        abortOnFail: true,
      },
    ];

    /*
    actions.push({
      type: 'prettify',
      path: '/components/',
    });
    */

    return actions;
  },
};
