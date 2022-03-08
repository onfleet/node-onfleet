# Onfleet Node.js Wrapper

![Build](https://img.shields.io/travis/onfleet/node-onfleet.svg?style=popout-square)
[![License](https://img.shields.io/github/license/onfleet/node-onfleet.svg?style=popout-square)](https://github.com/onfleet/node-onfleet/blob/master/LICENSE)
[![Latest version](https://img.shields.io/npm/v/@onfleet/node-onfleet.svg?style=popout-square)](https://www.npmjs.com/package/@onfleet/node-onfleet)
![Top language](https://img.shields.io/github/languages/top/onfleet/node-onfleet.svg?style=popout-square)
![Dependencies](https://img.shields.io/david/onfleet/node-onfleet.svg?style=popout-square)
[![Downloads](https://img.shields.io/npm/dt/@onfleet/node-onfleet.svg?style=popout-square)](https://www.npmjs.com/package/@onfleet/node-onfleet)

> *Consulta este documento en otro idioma*:  
> [English](https://github.com/onfleet/node-onfleet/blob/master/README.md)  
> [Français](https://github.com/onfleet/node-onfleet/blob/master/README.fr.md)  
> [正體中文](https://github.com/onfleet/node-onfleet/blob/master/README.zh-tw.md)  

Los invitamos a visitar nuestra publicación sobre el [proyecto de librerías para la API](https://onfleet.com/blog/api-wrappers-explained/) para conocer más sobre nuestras iniciativas.  
En caso de preguntas, pueden contactarnos a través de un issue [aquí](https://github.com/onfleet/pyonfleet/issues) o escribirnos a support@onfleet.com.

## Tabla de contenidos
* [Tabla de contenidos](#tabla-de-contenidos)
* [Sinopsis](#sinopsis)
* [Instalación](#instalación)
* [Uso](#uso)
    - [Autenticación](#autenticación)
    - [Pruebas unitarias](#pruebas-unitarias)
    - [Pruebas unitarias usando docker](#pruebas-unitarias-usando-docker)
    - [Límites](#límites)
    - [Respuestas](#respuestas)
    - [Operaciones CRUD soportadas](#operaciones-crud-soportadas)
        * [Peticiones GET](#peticiones-get)
            - [Ejemplos de `get()`](#ejemplos-de-get)
            - [Ejemplos de `get(parametro)`](#ejemplos-de-getparametro)
            - [Ejemplos de `getByLocation`](#ejemplos-de-getbylocation)
        * [Peticiones POST](#peticiones-post)
            - [Ejemplos de `create()`](#ejemplos-de-create)
        * [Peticiones PUT](#peticiones-put)
            - [Ejemplos de `update()`](#ejemplos-de-update)
            - [Ejemplos de `insertTask()`](#ejemplos-de-inserttask)
        * [Peticiones DELETE](#peticiones-delete)
            - [Ejemplos de `deleteOne()`](#ejemplos-de-deleteone)
    - [Ejemplos de cómo utilizar las operaciones CRUD](#ejemplos-de-como-utilizar-las-operaciones-crud)
    - [Qué NO hacer](#que-no-hacer)

## Sinopsis
La librería en Node.js de Onfleet nos permite un acceso fácil y cómodo a la API de Onfleet.

## Instalación
```
npm install @onfleet/node-onfleet
```
Para TypeScript, debemos instalar la [definición tipada](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/onfleet__node-onfleet):
```
npm install @types/onfleet__node-onfleet
```
> ¡Agradecimientos especiales a @marcobeltempo por la contribución!

## Uso
Antes de usar la librería, es indispensable obtener una llave para la API a través de alguno de los administradores de la organización a la que pertenecemos.

La creación e integración de llaves se realiza a través del [panel principal de Onfleet](https://onfleet.com/dashboard#/manage).

Para utilizar la librería sólo tenemos que crear uns instancia de `Onfleet` usando la llave:
```js
const onfleetApi = new Onfleet("<your_api_key>");
```

Opcionalmente, se puede personalizar el _timeout_ para hacerlo menor que el valor por defecto de la API de Onfleet (70,000 ms) suministrando un 2do parámetro:
```js
const onfleetApi = new Onfleet("<your_api_key>", 30000);
```

También de manera opcional, podemos personalizar las opciones de [Bottleneck](https://www.npmjs.com/package/bottleneck) utilizando un 3er parámetro:
```js
const onfleetApi = new Onfleet("<your_api_key>", 30000, {
  LIMITER_RESERVOIR: 10,               // Default: 20
  LIMITER_WAIT_UPON_DEPLETION: 20000,  // Default: 10000
  LIMITER_MAX_CONCURRENT: 5,           // Default: 1
  LIMITER_MIN_TIME: 50,                // Default: 50
});
```

### Autenticación
Una vez tenemos la instancia de `Onfleet` podemos probar el endpoint de autenticación:
```js
onfleetApi.verifyKey();  // Returns a boolean
```

### Pruebas unitarias
`npm test`

### Pruebas unitarias usando Docker

`docker-compose up --build`

### Límites
La API impone un límite de 20 peticiones por segundo entre todas las peticiones de todas las llaves de la organización. Más detalles [aquí](https://docs.onfleet.com/reference#throttling).

La librería también implementa un limitador para prevenir excesos accidentales de los límites y, eventualmente, posibles sanciones.

### Respuestas
Las respuestas de esta librería son instancias de [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response).

### Operaciones CRUD soportadas
Estas son las operaciones disponibles para cada endpoint:

| Entity | GET | POST | PUT | DELETE |
| :-: | :-: | :-: | :-: | :-: |
| [Admins/Administrators](https://docs.onfleet.com/reference#administrators) | get() | create(obj), matchMetadata(obj) | update(id, obj) | deleteOne(id) |
| [Containers](https://docs.onfleet.com/reference#containers) | get(id, 'workers'), get(id, 'teams'), get(id, 'organizations') | x | insertTask(id, obj) | x |
| [Destinations](https://docs.onfleet.com/reference#destinations) | get(id) | create(obj), matchMetadata(obj) | x | x |
| [Hubs](https://docs.onfleet.com/reference#hubs) | get() | create(obj) | update(id, obj) | x |
| [Organization](https://docs.onfleet.com/reference#organizations) | get(), get(id) | x | x | x |
| [Recipients](https://docs.onfleet.com/reference#recipients) | get(id), get(name, 'name'), get(phone, 'phone') | create(obj), matchMetadata(obj) | update(id, obj) | x |
| [Tasks](https://docs.onfleet.com/reference#tasks) | get(query), get(id), get(shortId, 'shortId') | create(obj), clone(id), clone(id, obj), forceComplete(id, obj), batchCreate(obj), autoAssign(obj), matchMetadata(obj) | update(id, obj) | deleteOne(id) |
| [Teams](https://docs.onfleet.com/reference#teams) | get(), get(id), getWorkerEta(id, obj) | create(obj), autoDispatch(id, obj) | update(id, obj) | deleteOne(id) |
| [Webhooks](https://docs.onfleet.com/reference#webhooks) | get() | create(obj) | x | deleteOne(id) |
| [Workers](https://docs.onfleet.com/reference#workers) | get(), get(query), get(id), getByLocation(obj), getSchedule(id) | create(obj), setSchedule(id, obj), matchMetadata(obj) | update(id, obj), insertTask(id, obj) | deleteOne(id) |

#### Peticiones GET
Para obtener todos los elementos disponibles en un recurso, éstas llamadas retornan un `Promise` con el arreglo de los resultados:
```js
get();
```

##### Ejemplos de `get()`
```js
onfleetApi.workers.get().then((results) => { /* ... */ });
onfleetApi.workers.get({ queryParams }).then((results) => { /* ... */ });
```

Opcionalmente, podemos utilizar un objeto JSON con parámetros de búsqueda en los recursos que lo soportan.  
En la [documentación de la API](https://docs.onfleet.com/) se describe qué recursos lo permiten.
```js
onfleetApi.workers.get({ phones: "<phone_number>" }).then((results) => { /* ... */ });

onfleetApi.tasks.get({ from: "<from_time>", to: "<to_time>" }).then((results) => { /* ... */ });
```

> Tanto `{ 'analytics': 'true' }` como `{ analytics: true }` funcionan parámetros de búsqueda porque ambos representan un objeto JSON válido

Para obtener uno de los elementos de un endpoint, si el parámetreo opcional _paramName_ no es suministrado, la libraría buscará por ID. Si _paramName_ es suministrado, se utilizará _paramName_:
```js
get(<parameter>, <paramName> (optional), <queryParam> (optional));
```

Posibles valores de _paramName_:
- `id`
- `name`
- `phone`
- `shortId`

##### Ejemplos de `get(param)`
```js
onfleetApi.workers.get("<24_digit_ID>").then((result) => { /* ... */ });
onfleetApi.workers.get("<24_digit_ID>", { analytics: true }).then((result) => { /* ... */ });

onfleetApi.tasks.get("<shortId>", "shortId").then((result) => { /* ... */ });

onfleetApi.recipients.get("<phone_number>", "phone").then((result) => { /* ... */ });
onfleetApi.recipients.get("<recipient_name>", "name").then((result) => { /* ... */ });
onfleetApi.recipients
  .get("<recipient_name>", "name", { skipPhoneNumberValidation: true })
  .then((result) => { /* ... */ });

onfleetApi.containers.get("<24_digit_ID>", "workers").then((result) => { /* ... */ });
onfleetApi.containers.get("<24_digit_ID>", "teams").then((result) => {{ /* ... */ });
onfleetApi.containers.get("<24_digit_ID>", "organizations").then((result) => { /* ... */ });
```

Para obtener un driver según su ubicación, podemos utilizar la función `getByLocation`:
```js
getByLocation({ queryParams });
```

##### Ejemplos de `getByLocation`
```js
const locationParams = {
  longitude: -122.404,
  latitude: 37.789,
  radius: 10000,
};

onfleetApi.workers.getByLocation(locationParams).then((results) => { /* ... */ });
```

#### Peticiones POST
Para crear un elemento de un recurso:
```js
create({ data });
```

##### Ejemplos de `create()`
```js
const data = {
  name: "John Driver",
  phone: "+16173428853",
  teams: ["<team_ID>", "<team_ID> (optional)", ...],
  vehicle: {
    type: "CAR",
    description: "Tesla Model 3",
    licensePlate: "FKNS9A",
    color: "purple",
  },
};

onfleetApi.workers.create(data);
```

Otras peticiones POST incluyen `clone`, `forceComplete`, `batchCreate`, `autoAssign` en el recurso *Tasks*; `setSchedule` en el recurso *Workers*; `autoDispatch` en el recurso *Teams*; y `matchMetadata` en todos los recursos que lo soportan. Por ejemplo:

```js
onfleetApi.tasks.clone('<24_digit_ID>');
onfleetApi.tasks.forceComplete('<24_digit_ID>', { data });
onfleetApi.tasks.batchCreate({ data });
onfleetApi.tasks.autoAssign({ data });

onfleetApi.workers.setSchedule('<24_digit_ID>', { data });

onfleetApi.teams.autoDispatch('<24_digit_ID>', { data });

onfleetApi.<entity_name_pluralized>.matchMetadata({ data });
```

Para más información, podemos consultar la documentación sobre [`clone`](https://docs.onfleet.com/reference#clone-task), [`forceComplete`](https://docs.onfleet.com/reference#complete-task), [`batchCreate`](https://docs.onfleet.com/reference#create-tasks-in-batch), [`autoAssign`](https://docs.onfleet.com/reference#automatically-assign-list-of-tasks), [`setSchedule`](https://docs.onfleet.com/reference#set-workers-schedule). [`matchMetadata`](https://docs.onfleet.com/reference#querying-by-metadata) y [`autoDispatch`](https://docs.onfleet.com/reference#team-auto-dispatch).

#### Peticiones PUT
Para modificar un elemento de un recurso:
```js
update("<24_digit_ID>", { data });
```

##### Ejemplos de `update()`
```js
const newData = {
  name: "Jack Driver",
};

onfleetApi.workers.update("<24_digit_ID>", newData);
```

##### Ejemplos de `insertTask()`
```js
onfleetApi.workers.insertTask("<24_digit_ID>", { data }).then((result) => { /* ... */ });
```

#### Peticiones DELETE
Para eliminar un elemento de un recurso:
```js
deleteOne("<24_digit_ID>");
```

##### Ejemplos de `deleteOne()`
```js
onfleetApi.workers.deleteOne("<24_digit_ID>");
```

### Ejemplos de cómo utilizar las operaciones CRUD

- Obetener todos los recipients:
  ```js
  onfleetApi.tasks
    .get({ from: "1557936000000", to: "1558022400000" })
    .then((tasks) => {
      for (let task of tasks) {
        if (task.recipients[0] !== undefined) {
          // Do something with the recipients
        }
      }
    })
    .catch((err) => { /* ... */ });
  ```

- Podemos usar `async`/`await` así:
  ```js
  async function findAllWorkers() {
    try {
      let response = await onfleetApi.workers.get();
      // Do something with the response
    }
    catch (err) { /* ... */ }
  }

  findAllWorkers();
  ```

### Qué NO hacer

- Patrón ineficiente, debemos usar metadata:
  ```js
  // DONT
  onfleetApi.workers
    .get()
    .then((workers) => {
      for (let worker of workers) {
        for (let metadataEntry of worker.metadata) {
          if (metadataEntry.name === "hasFreezer" && metadataEntry.value) {
            // Do something
          }
        }
      }
    })
    .catch((err) => { /* ... */ });

  // DO
  onfleetApi.workers
    .matchMetadata([{"name": "hasFreezer", "type": "boolean", "value": true}])
    .then((workers) => {
      for (let worker of workers) {
        // Do something
      }
    })
    .catch((err) => { /* ... */ });
  ```

*Ir al [inicio](#onfleet-nodejs-wrapper)*.
