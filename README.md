<div align="center">
<img src="https://miro.medium.com/max/4610/1*Ce0gUe0LbnhL7ebnDGTp5w.png" width="300" height="90"/>
<img src="https://www.redspark.io/wp-content/uploads/2020/04/imagem_swagger.png" width="300" height="90"/>
<img src="https://fastify.io/img/logos/fastify-black.png" width="300" height="90"/>
<img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Redis_Logo.svg/800px-Redis_Logo.svg.png" width="300" height="90"/>
<img src="https://spin.atomicobject.com/wp-content/uploads/jest.png" width="260" height="120"/>
</div>

<h6 align="center">This template is written by Kürşat Burak Farız</h6>

### Quick Start
```
mkdir my-template
cd my-template
```

### Install dependencies

```
npm install
```

### Start the app

```
npm start || nodemon start
```

### Docker start

```
docker-compose up -d
```

### Jest test

```
npm test
```

### Contents
```
ESlint
Dependency Injection
Logger
Custom Error
Example CRUD operations written
```

### Backend Example Code Structure

Route

```
const ExampleSchema = require('../../schemas/example');

const routes = [
  {
    method: 'GET',
    url: '/api/example/:id',
    schema: ExampleSchema.getExampleSchema,
    handler: 'ExampleController.getExampleById',
  },
]
```

Controller

```
module.exports = class ExampleController {
  constructor({ ExampleService }) {
    this.ExampleService = ExampleService;
  }

  async getExampleById(request) {
    const { ExampleService } = this;
    const exampleId = request.params.id;
    return ExampleService.getExampleById({ exampleId });
  }
}
```

Service

```
const logger = require('loglevel');
const { ExampleNotFound } = require('../errors/types');

module.exports = class ExampleService {
  constructor({ ExampleDatabase }) {
    this.ExampleDatabase = ExampleDatabase;
  }

  async getExampleById({ exampleId }) {
    const { ExampleDatabase } = this;
    logger.debug('[ExampleService] getExampleById', { exampleId });
    const example = await ExampleDatabase.getExampleById({ exampleId });

    if (!example) {
      throw new ExampleNotFound();
    }

    return example;
  }
}
```

Database

```
module.exports = class ExampleDatabase {
  constructor({ ExampleModel }) {
    this.ExampleModel = ExampleModel;
  }

  async getExampleById({ exampleId }) {
    const { ExampleModel } = this;
    return ExampleModel.findById({ _id: exampleId })
      .lean()
      .exec();
  }
}
```

Model

```
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExampleSchema = new Schema({
  text: { type: String },
});

const ExampleModel = () => mongoose.model('Example', ExampleSchema);

module.exports = ExampleModel;
```

### Usage

Example usage video

- https://youtu.be/4qxdWJSZd0M

Here is the admin token to create-update-delete module and course:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTcyZjZhMzI2YTliOTNlOWNiNzFlYyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY4ODY3ODI3NCwiZXhwIjoxNjkxMjcwMjc0fQ.OPWbkynikhGRBuIFP6IVtP_R0Mla16UqmyyoUvrEqXA
```
For those processes above, the token should be provided in the header.

## Some rule cases

- Module name is unique in model, so there can't be duplicate module.
- Course name is unique in model, so there can't be duplicate course.
- Course and module can be added-updated-deleted only by admin
- Every user can see TOP 10 modules (token required in header)
- User cannot use the same password or e-mail address to update password or e-mail

## Security

- OAuth added
- Roles added to manage courses and modules **(Role can be ADMIN or USER)**
- [Salt and Pepper](https://medium.com/@berto168/salt-pepper-spice-up-your-hash-b48328caa2af) hash method added for password againts to hacker attacks

### Swagger

Local swagger link

<a href="http://localhost:3000/documentation#/">http://localhost:3000/documentation#/</a>

![image](https://github.com/kburakf/range-force/assets/45143556/78bff176-c011-47e0-bcad-0c959b2512d5)

### Redis

<img width="958" alt="image" src="https://github.com/kburakf/range-force/assets/45143556/8a14c62c-df4d-4383-b3e8-7c525609d61a">

### MongoDB

![image](https://github.com/kburakf/range-force/assets/45143556/82649143-50a0-428e-aed3-9976c2d36b23)

### Test results

<img width="368" alt="image" src="https://github.com/kburakf/range-force/assets/45143556/c1461b22-45b7-4c3d-ae1a-aa4d2cf6bf79">

### License <img src="https://img.icons8.com/ios/452/licence.png" width="25" height="25"/>

```
ISC
```
