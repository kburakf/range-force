<div align="center">
<img src="https://miro.medium.com/max/4610/1*Ce0gUe0LbnhL7ebnDGTp5w.png" width="300" height="90"/>
<img src="https://www.redspark.io/wp-content/uploads/2020/04/imagem_swagger.png" width="300" height="90"/>
<img src="https://www.fastify.io/images/fastify-logo-menu.d13f8da7a965c800.png" width="300" height="90"/>
</div>

<h4 align="center"> Welcome buddy! This template ready to your project's backend!</h1>

### Quick Start <img src="https://lh3.googleusercontent.com/proxy/RW5IcSMvk-nTOhjm6sHblakneB8PQYJVxPtkE5Y3VHmuuTrP262XLLGiXpqt_sqW9ggjoeRVjFeIqNqkxZhkHK691GxzV3CxFRjmWkSASsDwEWU2zzoORmspCZxe7u4" widht="20" height="25"/>

```
mkdir my-template
cd my-template
```

### Install dependencies <img src="https://pngimg.com/uploads/box/box_PNG49.png" width="25" height="25"/>

```
npm install
```

### Start the app <img src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/full/nodejslogo.png" width="25" height="25"/>

```
npm start || nodemon start
```

### Docker start <img src ="https://www.docker.com/sites/default/files/d8/styles/role_icon/public/2019-07/Moby-logo.png?itok=sYH_JEaJ" width="30" height="25"/>

```
docker-compose up --build
```

### Contents <img src="https://img.pngio.com/contents-png-3-png-image-contents-png-500_500.png" width="30" height="25"/>
```
ESlint
Dependency Injection
Logger
Custom Error
Example CRUD operations written
```

### Examples <img src="https://www.freepnglogos.com/uploads/pencil-png/pencil-png-transparent-png-pictures-icons-and-png-2.png" width="20" height="25"/>

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

### Swagger <img src="https://miro.medium.com/max/300/1*2DKX6fd0wlVbbjff_noWHg.png" width="25" height="25"/>

Local swagger link

<a href="http://localhost:3000/documentation#/">http://localhost:3000/documentation#/</a>

<img src="https://i.ibb.co/f96BKbn/ss.png" widht="auto" height="500"/>

### License <img src="https://img.icons8.com/ios/452/licence.png" width="25" height="25"/>

```
ISC
```
