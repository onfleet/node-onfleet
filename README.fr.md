# Onfleet Node.js Wrapper

![Build](https://img.shields.io/travis/onfleet/node-onfleet.svg?style=popout-square)
[![License](https://img.shields.io/github/license/onfleet/node-onfleet.svg?style=popout-square)](https://github.com/onfleet/node-onfleet/blob/master/LICENSE)
[![Latest version](https://img.shields.io/npm/v/@onfleet/node-onfleet.svg?style=popout-square)](https://www.npmjs.com/package/@onfleet/node-onfleet)
![Top language](https://img.shields.io/github/languages/top/onfleet/node-onfleet.svg?style=popout-square)
![Dependencies](https://img.shields.io/david/onfleet/node-onfleet.svg?style=popout-square)
[![Downloads](https://img.shields.io/npm/dt/@onfleet/node-onfleet.svg?style=popout-square)](https://www.npmjs.com/package/@onfleet/node-onfleet)

> *Lisez ce document dans une autre langue*:  
> [English](https://github.com/onfleet/node-onfleet/blob/master/README.md)  
> [正體中文](https://github.com/onfleet/node-onfleet/blob/master/README.zh-tw.md)  
> [Español](https://github.com/onfleet/node-onfleet/blob/master/README.es.md)  


Visitez notre article de blog sur le [projet de wrapper API](https://onfleet.com/blog/api-wrappers-explained/) pour en savoir plus sur nos initiatives.  
Si vous avez des questions, veuillez contacter Onfleet en soumettant un problème [ici](https://github.com/onfleet/node-onfleet/issues) ou contactez support@onfleet.com.

### Table des matières
* [Table des matières](#table-des-matières)
* [Synopsis](#synopsis)
* [Installation](#installation)
* [Utilisation](#utilisation)
* [Authentification](#authentification)
* [Tests unitaires](#tests-unitaires)
* [Tests unitaires à l'aide de Docker](#tests-unitaires-à-l'aide-de-docker)
* [Étranglement](#étranglement)
* [Réponses](#Réponses)
* [Opérations CRUD prises en charge](#opérations-crud-prises-en-charge)
    - [Demandes GET](#demandes-get)
        * [Exemples de `get()`](#exemples-de-get)
        * [Exemples de `get(param)`](#exemples-de-getparam)
        * [Exemples de `getByLocation`](#exemples-de-getbylocation)
    - [Demandes POST](#demandes-post)
        * [Exemples de `create()`](#exemples-de-create)
    - [Demandes PUT](#demandes-put)
        * [Exemples de `update()`](#exemples-de-update)
       * [Exemples de `insertTask()`](#exemples-de-inserttask)
    - [Demandes DELETE](#demandes-delete)
        * [Exemples de `deleteOne()`](#exemples-de-deleteone)
* [Exemples d'utilisation de vos opérations CRUD](#exemples-dutilisation-de-vos-opérations-crud)
* [Choses à ne pas faire](#choses-à-ne-pas-faire)

## Synopsis
La bibliothèque Onfleet Node.js offre un accès pratique à l'API Onfleet.

## Installation
```
npm install @onfleet/node-onfleet
```
Pour TypeScript, installez la [typed definition](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/onfleet__node-onfleet):
```
npm install @types/onfleet__node-onfleet
```
> Bravo à @marcobeltempo pour la contribution!

## Utilisation
Avant d'utiliser le wrapper de l'API, vous devez vous procurer une clé API auprès de votre administrateur d'organisation. 

La création et l'intégration des clés API sont effectuées via le [tableau de bord Onfleet](https://onfleet.com/dashboard#/manage).

Pour commencer à utiliser l'API Onfleet, il vous suffit de créer un objet `Onfleet` avec votre clé API:
```js
const onfleetApi = new Onfleet("<your_api_key>");
```

En tant que champ facultatif, vous pouvez introduire un délai d'expiration personnalisé inférieur à la valeur par défaut de 70000 ms (délai d'expiration de l'API Onfleet par défaut) en fournissant un 2ème paramètre:
```js
const onfleetApi = new Onfleet("<your_api_key>", 30000);
```

En tant que champ facultatif, vous pouvez introduire un objet d'options pour [Bottleneck](https://www.npmjs.com/package/bottleneck).
```js
const onfleetApi = new Onfleet("<your_api_key>", 30000, {
  LIMITER_RESERVOIR: 10,               // Default: 20
  LIMITER_WAIT_UPON_DEPLETION: 20000,  // Default: 10000
  LIMITER_MAX_CONCURRENT: 5,           // Default: 1
  LIMITER_MIN_TIME: 50,                // Default: 50
});
```

### Authentification
Une fois que l'objet `Onfleet` est créé, vous pouvez tester le noeud final d'authentification:
```js
onfleet.verifyKey();  // Returns a boolean
```

Une fois que l'objet Onfleet est créé, vous aurez accès à tous les points de terminaison de l'API, comme indiqué dans la [Documentation de l'API Onfleet](http://docs.onfleet.com/). Voici quelques cas d'utilisation:

### Tests unitaires
`npm test`

### Tests unitaires à l'aide de Docker

`docker-compose up --build`

### Étranglement
La limitation de débit est appliquée par l'API avec un seuil de 20 demandes par seconde pour toutes les clés d'API de votre organisation. Pour en savoir plus, [cliquez ici](https://docs.onfleet.com/reference#throttling). 

Nous avons mis en place un limiteur sur le wrapper lui-même pour vous éviter de dépasser involontairement vos limitations de taux et éventuellement être banni.

### Réponses
La bibliothèque renvoie le _body_ d'un objet [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response).

### Opérations CRUD prises en charge
Voici les opérations CRUD prises en charge pour chaque ordinateur d'extrémité:

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

#### Demandes GET
Pour obtenir tous les documents d'un noeud final, cela renvoie une `Promise` contenant un tableau de résultats:
```js
get();
```

##### Exemples de `get()`
```js
onfleetApi.workers.get().then((results) => { /* ... */ });
onfleetApi.workers.get({ queryParams }).then((results) => { /* ... */ });
```

Option permettant d'utiliser des paramètres de requête pour certains points de terminaison, reportez-vous aux [documents de l'API](https://docs.onfleet.com/) pour les points de terminaison prenant en charge les paramètres de requête.
```js
onfleetApi.workers.get({ phones: "<phone_number>" }).then((results) => { /* ... */ });

onfleetApi.tasks.get({ from: "<from_time>", to: "<to_time>" }).then((results) => { /* ... */ });
```

> Les paramètres de requête peuvent figurer dans n’importe quel formulaire, à condition qu’il s’agisse d’un objet JSON, par exemple: `{ analytics: true }` et `{ 'analytics': 'true' }` sont identiques

Pour obtenir l'un des documents dans un noeud final, si _paramName_ facultatif n'est pas fourni, l'encapsuleur effectuera une recherche par ID. Si _paramName_ est fourni, il recherchera par _paramName_:
```js
get(<parameter>, <paramName> (optional), <queryParam> (optional));
```

Options pour _paramName_:
- `id`
- `name`
- `phone`
- `shortId`

##### Exemples de `get(param)`
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

Pour obtenir un pilote par emplacement, utilisez la fonction `getByLocation`:
```js
getByLocation({ queryParams });
```

##### Exemples de `getByLocation`
```js
const locationParams = {
  longitude: -122.404,
  latitude: 37.789,
  radius: 10000,
};

onfleetApi.workers.getByLocation(locationParams).then((results) => { /* ... */ });
```

#### Demandes POST
Pour créer un document dans un noeud final:
```js
create({ data });
```

##### Exemples de `create()`
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

Les requêtes POST étendues incluent `clone`,` forceComplete`, `batchCreate`,` autoAssign`, `setSchedule`, `autoDispatch`:

```js
onfleetApi.tasks.clone('<24_digit_ID>');
onfleetApi.tasks.forceComplete('<24_digit_ID>', { data });
onfleetApi.tasks.batchCreate({ data });
onfleetApi.tasks.autoAssign({ data });

onfleetApi.workers.setSchedule('<24_digit_ID>', { data });

onfleetApi.teams.autoDispatch('<24_digit_ID>', { data });

onfleetApi.<entity_name_pluralized>.matchMetadata({ data });
```

Pour plus de détails, consultez notre documentation sur [`clone`](https://docs.onfleet.com/reference#clone-task), [`forceComplete`](https://docs.onfleet.com/reference#complete-task), [`batchCreate`](https://docs.onfleet.com/reference#create-tasks-in-batch), [`autoAssign`](https://docs.onfleet.com/reference#automatically-assign-list-of-tasks), [`setSchedule`](https://docs.onfleet.com/reference#set-workers-schedule), [`matchMetadata`](https://docs.onfleet.com/reference#querying-by-metadata), et [`autoDispatch`](https://docs.onfleet.com/reference#team-auto-dispatch).

#### Demandes PUT
Pour mettre à jour un document dans un noeud final:
```js
update("<24_digit_ID>", { data });
```

##### Exemples de `update()`
```js
const newData = {
  name: "Jack Driver",
};

onfleetApi.workers.update("<24_digit_ID>", newData);
```

##### Exemples de `insertTask()`
```js
onfleetApi.workers.insertTask("<24_digit_ID>", { data }).then((result) => { /* ... */ });
```

#### Demandes DELETE
Pour supprimer un document dans un noeud final:
```js
deleteOne("<24_digit_ID>");
```

##### Exemples de `deleteOne()`
```js
onfleetApi.workers.deleteOne("<24_digit_ID>");
```

### Exemples d'utilisation de vos opérations CRUD

- Obtenez tous les destinataires:
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

- `async`/`await` peut également être utilisé dans les cas suivants:
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

### Choses à ne pas faire

- Modèle inefficace, utilisez plutôt des métadonnées:
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

*Haut de [page](#onfleet-nodejs-wrapper)*.
