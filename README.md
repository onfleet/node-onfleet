# Onfleet Node.js Wrapper

![Build](https://img.shields.io/travis/onfleet/node-onfleet.svg?style=popout-square)
[![License](https://img.shields.io/github/license/onfleet/node-onfleet.svg?style=popout-square)](https://github.com/onfleet/node-onfleet/blob/master/LICENSE)
[![Latest version](https://img.shields.io/npm/v/@onfleet/node-onfleet.svg?style=popout-square)](https://www.npmjs.com/package/@onfleet/node-onfleet)
![Top language](https://img.shields.io/github/languages/top/onfleet/node-onfleet.svg?style=popout-square)
![Dependencies](https://img.shields.io/david/onfleet/node-onfleet.svg?style=popout-square)
[![Downloads](https://img.shields.io/npm/dt/@onfleet/node-onfleet.svg?style=popout-square)](https://www.npmjs.com/package/@onfleet/node-onfleet)

> *Read this document in another language*:  
> [Français](https://github.com/onfleet/node-onfleet/blob/master/README.fr.md)  
> [正體中文](https://github.com/onfleet/node-onfleet/blob/master/README.zh-tw.md)  
> [Español](https://github.com/onfleet/node-onfleet/blob/master/README.es.md)  

Visit our blog post on the [API wrapper project](https://onfleet.com/blog/api-wrappers-explained/) to learn more about our initiatives.  
If you have any questions, please reach us by submitting an issue [here](https://github.com/onfleet/node-onfleet/issues) or contact support@onfleet.com.

### Table of contents
* [Table of contents](#table-of-contents)
* [Synopsis](#synopsis)
* [Installation](#installation)
* [Usage](#usage)
    - [Authentication](#authentication)
    - [Unit testing](#unit-testing)
    - [Unit testing using Docker](#unit-testing-using-docker)
    - [Throttling](#throttling)
    - [Responses](#responses)
    - [Supported CRUD operations](#supported-crud-operations)
        * [GET Requests](#get-requests)
            - [Examples of `get()`](#examples-of-get)
            - [Examples of `get(param)`](#examples-of-getparam)
            - [Examples of `getByLocation`](#examples-of-getbylocation)
        * [POST Requests](#post-requests)
            - [Examples of `create()`](#examples-of-create)
        * [PUT Requests](#put-requests)
            - [Examples of `update()`](#examples-of-update)
            - [Examples of `insertTask()`](#examples-of-inserttask)
        * [DELETE Requests](#delete-requests)
            - [Examples of `deleteOne()`](#examples-of-deleteone)
    - [Examples of utilizing your CRUD operations](#examples-of-utilizing-your-crud-operations)
    - [Things NOT to do](#things-not-to-do)

## Synopsis
The Onfleet Node.js library provides convenient access to the Onfleet API.

## Installation
```
npm install @onfleet/node-onfleet
```
For TypeScript, install the [typed definition](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/onfleet__node-onfleet):
```
npm install @types/onfleet__node-onfleet
```
> Kudos to @marcobeltempo for the contribution!

## Usage
Before using the API wrapper, you will need to obtain an API key from one of your organization's admins.

Creation and integration of API keys are performed through the [Onfleet dashboard](https://onfleet.com/dashboard#/manage).

To start utilizing the library, you simply need to create an `Onfleet` object with your API key:
```js
const onfleetApi = new Onfleet("<your_api_key>");
```

Optionally, you can introduce a customized timeout that is less than the default Onfleet API timeout (70,000 ms) by providing a 2nd parameter:
```js
const onfleetApi = new Onfleet("<your_api_key>", 30000);
```

Optionally again, you can introduce an options object for [Bottleneck](https://www.npmjs.com/package/bottleneck) as a 3rd parameter:
```js
const onfleetApi = new Onfleet("<your_api_key>", 30000, {
  LIMITER_RESERVOIR: 10,               // Default: 20
  LIMITER_WAIT_UPON_DEPLETION: 20000,  // Default: 10000
  LIMITER_MAX_CONCURRENT: 5,           // Default: 1
  LIMITER_MIN_TIME: 50,                // Default: 50
});
```

### Authentication
Once the `Onfleet` object is created, you can test on the authentication endpoint:
```js
onfleetApi.verifyKey();  // Returns a boolean
```

### Unit Testing
`npm test`

### Unit testing using Docker

`docker-compose up --build`

### Throttling
Rate limiting is enforced by the API with a threshold of 20 requests per second across all your organization's API keys. Learn more about it [here](https://docs.onfleet.com/reference#throttling).

We have also implemented a limiter on this library to avoid you from unintentionally exceeding your rate limitations and eventually be banned for.

### Responses
Responses of this library are instances of [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response).

### Supported CRUD Operations
Here are the operations available for each entity:

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

#### GET Requests
To get all the documents within an endpoint, this returns a `Promise` containing an array of results:
```js
get();
```

##### Examples of `get()`
```js
onfleetApi.workers.get().then((results) => { /* ... */ });
onfleetApi.workers.get({ queryParams }).then((results) => { /* ... */ });
```

Optionally you can send a JSON object of query params for some certain endpoints.  
Refer back to [API documentation](https://docs.onfleet.com/) for endpoints that support query parameters.
```js
onfleetApi.workers.get({ phones: "<phone_number>" }).then((results) => { /* ... */ });

onfleetApi.tasks.get({ from: "<from_time>", to: "<to_time>" }).then((results) => { /* ... */ });
```

> Both `{ 'analytics': 'true' }` and `{ analytics: true }` work as query params since they represent a valid JSON object

To get one of the documents within an endpoint, if the optional _paramName_ is not provided, the library will search by ID. If _paramName_ is provided, it will search by _paramName_:
```js
get(<parameter>, <paramName> (optional), <queryParam> (optional));
```

_paramName_ can be any of:
- `id`
- `name`
- `phone`
- `shortId`

##### Examples of `get(param)`
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

To get a driver by location, use the `getByLocation` function:
```js
getByLocation({ queryParams });
```

##### Examples of `getByLocation`
```js
const locationParams = {
  longitude: -122.404,
  latitude: 37.789,
  radius: 10000,
};

onfleetApi.workers.getByLocation(locationParams).then((results) => { /* ... */ });
```

#### POST Requests
To create a document within an endpoint:
```js
create({ data });
```

##### Examples of `create()`
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

Extended POST requests include `clone`, `forceComplete`, `batchCreate`, `autoAssign` on the *Tasks* endpoint; `setSchedule` on the *Workers* endpoint; `autoDispatch` on the *Teams* endpoint; and `matchMetadata` on all supported entities. For instance:

```js
onfleetApi.tasks.clone('<24_digit_ID>');
onfleetApi.tasks.forceComplete('<24_digit_ID>', { data });
onfleetApi.tasks.batchCreate({ data });
onfleetApi.tasks.autoAssign({ data });

onfleetApi.workers.setSchedule('<24_digit_ID>', { data });

onfleetApi.teams.autoDispatch('<24_digit_ID>', { data });

onfleetApi.<entity_name_pluralized>.matchMetadata({ data });
```

For more details, check our documentation on [`clone`](https://docs.onfleet.com/reference#clone-task), [`forceComplete`](https://docs.onfleet.com/reference#complete-task), [`batchCreate`](https://docs.onfleet.com/reference#create-tasks-in-batch), [`autoAssign`](https://docs.onfleet.com/reference#automatically-assign-list-of-tasks), [`setSchedule`](https://docs.onfleet.com/reference#set-workers-schedule), [`matchMetadata`](https://docs.onfleet.com/reference#querying-by-metadata), and [`autoDispatch`](https://docs.onfleet.com/reference#team-auto-dispatch).

#### PUT Requests
To update a document within an endpoint:
```js
update("<24_digit_ID>", { data });
```

##### Examples of `update()`
```js
const newData = {
  name: "Jack Driver",
};

onfleetApi.workers.update("<24_digit_ID>", newData);
```

##### Examples of `insertTask()`
```js
onfleetApi.workers.insertTask("<24_digit_ID>", { data }).then((result) => { /* ... */ });
```

#### DELETE Requests
To delete a document within an endpoint:
```js
deleteOne("<24_digit_ID>");
```

##### Examples of `deleteOne()`
```js
onfleetApi.workers.deleteOne("<24_digit_ID>");
```

### Examples of utilizing your CRUD operations

- Get all the recipients:
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

- `async`/`await` can also be used like this:
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

### Things NOT to do

- Inefficient pattern, use metadata instead:
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

*Go to [top](#onfleet-nodejs-wrapper)*.
