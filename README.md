# Onfleet Node.js Wrapper

![Travis (.org)](https://img.shields.io/travis/onfleet/node-onfleet.svg?style=popout-square)
[![GitHub](https://img.shields.io/github/license/onfleet/node-onfleet.svg?style=popout-square)](https://github.com/onfleet/node-onfleet/blob/master/LICENSE)
![David](https://img.shields.io/david/onfleet/node-onfleet.svg?style=popout-square)
[![npm (scoped)](https://img.shields.io/npm/v/@onfleet/node-onfleet.svg?style=popout-square)](https://www.npmjs.com/package/@onfleet/node-onfleet)
![GitHub top language](https://img.shields.io/github/languages/top/onfleet/node-onfleet.svg?style=popout-square)
[![npm](https://img.shields.io/npm/dt/@onfleet/node-onfleet.svg?style=popout-square)](https://www.npmjs.com/package/@onfleet/node-onfleet)

*Read this document in another language: [English](https://github.com/onfleet/node-onfleet/blob/master/README.md), [French](https://github.com/onfleet/node-onfleet/blob/master/README.fr.md), [正體中文](https://github.com/onfleet/node-onfleet/blob/master/README.zh-tw.md)*

Visit our [blog post on the API wrapper project](https://onfleet.com/blog/api-wrappers-explained/) to learn more about our initiatives. If you have any questions, please reach out to Onfleet by submitting an issue [here](https://github.com/onfleet/node-onfleet/issues) or contact support@onfleet.com

### Table of Contents
- [Onfleet Node.js Wrapper](#onfleet-nodejs-wrapper)
    + [Table of Contents](#table-of-contents)
  * [Synopsis](#synopsis)
  * [Installation](#installation)
  * [Usage](#usage)
    + [Authentication](#authentication)
    + [Unit Testing](#unit-testing)
    + [Throttling](#throttling)
    + [Responses](#responses)
    + [Supported CRUD Operations](#supported-crud-operations)
      - [GET Requests](#get-requests)
        * [Examples of get()](#examples-of-get)
        * [Examples of get(param)](#examples-of-get-param)
        * [Examples of getByLocation](#examples-of-getbylocation)
      - [POST Requests](#post-requests)
        * [Examples of create()](#examples-of-create)
      - [PUT Requests](#put-requests)
        * [Examples of update()](#examples-of-update)
        * [Examples of insertTask()](#examples-of-inserttask)
      - [DELETE Requests](#delete-requests)
        * [Examples of deleteOne()](#examples-of-deleteone)
    + [Examples of utilizing your CRUD operations](#examples-of-utilizing-your-crud-operations)
    + [Things NOT to do](#things-not-to-do)

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

(Kudos to @marcobeltempo for the contribution!)

## Usage
Before using the API wrapper, you will need to obtain an API key from your organization admin. Creation and integration of API keys are performed through the [Onfleet dashboard](https://onfleet.com/dashboard#/manage).

To start utilizing the Onfleet API, you simply need to create an Onfleet object with your API key:
```js
const onfleet = new Onfleet('<api_key>');
```

As an optional field, you can introduce a customized timeout that is less than the default 70000ms (default Onfleet API timeout) by providing a 2nd parameter:
```js
const onfleet = new Onfleet('<api_key>', 30000) // This will set your wrappers to timeout at 30000ms instead of 70000ms
```

### Authentication
Once the Onfleet object is created, you can use a utility function to test on the authentication endpoint, this function returns a boolean:
```js
onfleet.verifyKey();
```

Once the Onfleet object is created, you will get access to all the API endpoints as documented in the [Onfleet API documentation](https://docs.onfleet.com/). Here are some usage case:

### Unit Testing
Run `npm test`

### Throttling
Rate limiting is enforced by the API with a threshold of 20 requests per second across all your organization's API keys, learn more about it [here](https://docs.onfleet.com/reference#throttling). We have implemented a limiter on the wrapper itself to avoid you from unintentionally exceeding your rate limitations and eventually be banned for.

### Responses
The `node-onfleet` API wrapper returns the body of a [Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response).


### Supported CRUD Operations 
The base URL for the Onfleet API is `https://onfleet.com/api/v2`, here are the supported CRUD operations for each endpoint:

| `<endpoint>` | GET | POST | PUT | DELETE |
|:------------:|:---------------------------------------------------:|:----------------------------------------------------------------------:|:------------------------------------:|:-------------:|
| [Admins/Administrators](https://docs.onfleet.com/reference#administrators) | get() | create(obj) | update(id, obj) | deleteOne(id) |
| [Containers](https://docs.onfleet.com/reference#containers) | get(id, 'workers'), get(id, 'teams'), get(id, 'organizations') | x | update(id, obj) | x |
| [Destinations](https://docs.onfleet.com/reference#destinations) | get(id) | create(obj) | x | x |
| [Hubs](https://docs.onfleet.com/reference#hubs) | get() | x | x | x |
| [Organization](https://docs.onfleet.com/reference#organizations) | get(), get(id) | x | insertTask(id, obj) | x |
| [Recipients](https://docs.onfleet.com/reference#recipients) | get(id), get(name, 'name'), get(phone, 'phone') | create(obj) | update(id, obj) | x |
| [Tasks](https://docs.onfleet.com/reference#tasks) | get(query), get(id), get(shortId, 'shortId') | create(obj), clone(id), forceComplete(id), batch(obj), autoAssign(obj) | update(id, obj) | deleteOne(id) |
| [Teams](https://docs.onfleet.com/reference#teams) | get(), get(id) | create(obj) | update(id, obj), insertTask(id, obj) | deleteOne(id) |
| [Webhooks](https://docs.onfleet.com/reference#webhooks) | get() | create(obj) | x | deleteOne(id) |
| [Workers](https://docs.onfleet.com/reference#workers) | get(), get(query), get(id), getByLocation(obj), getSchedule(id) | create(obj), setSchedule(id, obj) | update(id, obj), insertTask(id, obj) | deleteOne(id) |

#### GET Requests
To get all the documents within an endpoint, this returns a Promise containing an array of results:
```js
get();
get(<queryParam> (optional));
```
##### Examples of get()
```js
onfleet.workers.get().then((resultArray) => {
    // do something with the array containing all workers
});
```
Option to use query parameters for some certain endpoints, refer back to API documents for endpoints that support query parameters:
```js
onfleet.workers.get({phones: '<phone_number>'}).then((res) => {
  // do something with the one result found
});
onfleet.tasks.get({from: '<from_time>', to: '<to_time>'}).then((result) => {
  // do something with the results found
});
```
> **Note:** Query parameters can be in any forms as long as it is a JSON object, for example: `{ 'analytics': 'true' }` works, so as `{ analytics: true }`

To get one of the document within an endpoint, if optional *paramName* is not provided, wrapper will search by ID. If *paramName* is provided, it will search by *paramName*:

```js
get(<parameter>, <paramName> (optional), <queryParam> (optional));
```
Options for *paramName*: id, name, phone, shortId (see table above).

##### Examples of get(param)
```js
/**
 * GET for Workers
 */
onfleet.workers.get('<24_digit_id>').then((result) => {
  // do something with the one result found
});
onfleet.workers.get('<24_digit_id>', { analytics: true }).then((result) => {
  // do something with the one result found
});

/**
 * GET for Tasks
 */
onfleet.tasks.get('<shortId>', 'shortId').then((result) => {
  // do something with the one result found
});

/**
 * GET for Recipients
 */
onfleet.recipients.get('<phone_number>', 'phone').then((result) => {
  // do something with the one result found
});
onfleet.recipients.get('<recipient_name>', 'name').then((result) => {
  // do something with the one result found
});
onfleet.recipients.get('<recipient_name>', 'name', { skipPhoneNumberValidation: true}).then((result) => {
  // do something with the one result found
});

/**
 * GET for Containers
 */
onfleet.containers.get('<24_digit_id>', 'workers').then((result) => {
  // do something with the one result found
});
onfleet.containers.get('<24_digit_id>', 'teams').then((result) => {
  // do something with the one result found
});
onfleet.containers.get('<24_digit_id>', 'organizations').then((result) => {
  // do something with the one result found
});

```

To get a driver by location, use the `getByLocation` function:
```js
getByLocation(<queryParam>);
```
##### Examples of getByLocation
```js
const location = {
  longitude: -122.404,
  latitude: 37.789,
  radius: 10000
}

onfleet.workers.getByLocation(location).then((result) => {
  // shows the on-duty workers at the specific location
});
```

#### POST Requests
To create a document within an endpoint:
```js
create(<object>);
```
##### Examples of create()
```js
const driver = {
  name: 'A Swartz',
  phone: '617-342-8853',
  teams: ['W*8bF5jY11Rk05E0bXBHiGg2'],
  vehicle: {
    type: 'CAR',
    description: 'Tesla Model 3',
    licensePlate: 'FKNS9A',
    color: 'purple',
  },
};
onfleet.workers.create(driver);
```
Extended POST requests include `clone`, `forceComplete`, `batchCreate`, `autoAssign` on the tasks endpoint and `setSchedule` on the workers endpoint:
```js
onfleet.tasks.clone('<24_digit_id>');
onfleet.tasks.forceComplete('<24_digit_id>', '<completion_details>');
onfleet.tasks.batchCreate('<task_object_array>');
onfleet.tasks.autoAssign('<auto_assign_object>');

onfleet.workers.setSchedule('<24_digit_id>', newSchedule);
```
For more details, check our documentation on [clone](https://docs.onfleet.com/reference#clone-task), [forceComplete](https://docs.onfleet.com/reference#complete-task), [batchCreate](https://docs.onfleet.com/reference#create-tasks-in-batch), [autoAssign](https://docs.onfleet.com/reference#automatically-assign-list-of-tasks), and [setSchedule](https://docs.onfleet.com/reference#set-workers-schedule)

#### PUT Requests
To update a document within an endpoint:
```js
update(<id>, <object>);
```
##### Examples of update()
```js
const updateBody = {
    name: 'New Driver Name',
};
onfleet.workers.update('<24_digit_id>', updateBody);
```
##### Examples of insertTask()
```js
onfleet.workers.insertTask('kAQ*G5hnqlOq4jVvwtGNuacl', insertedTask).then(result => {
  // do something
});
```

#### DELETE Requests
To delete a document within an endpoint:
```js
deleteOne(<id>);
```
##### Examples of deleteOne()
```js
onfleet.workers.deleteOne('<24_digit_id>');
```

### Examples of utilizing your CRUD operations
Get all the recipients (if it exist):
```js
onfleet.tasks.get({from: '1557936000000', to: '1558022400000'}).then((res) => {
  for (let element of res) {
    if (element.recipients[0] !== undefined) {
        // do something with the recipients
    }
  }
}).catch((err) => {
  // do something with the error
});
```
Async/await can also be used in this following case:
```js
async function findAllWorkers() {
  try {
    let response = await onfleet.workers.get();
    // do something with the response
  } catch(err) {
    throw new Error(err);
  }
};

findAllWorkers();
```

### Things NOT to do
Inefficient pattern, use metadata instead:
```js
onfleet.workers.get().then((res) => {
  for (let element of res) {
    if (element.name == 'some_name') {
      onfleet.teams.get(element.teams[0]).then((result) => {
        // do something with the team
      })
    }
  }
}).catch((err) => {
  // do something with the error
});
```