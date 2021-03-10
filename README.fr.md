# Onfleet Node.js Wrapper

![Travis (.org)](https://img.shields.io/travis/onfleet/node-onfleet.svg?style=popout-square)
[![GitHub](https://img.shields.io/github/license/onfleet/node-onfleet.svg?style=popout-square)](https://github.com/onfleet/node-onfleet/blob/master/LICENSE)
![David](https://img.shields.io/david/onfleet/node-onfleet.svg?style=popout-square)
[![npm (scoped)](https://img.shields.io/npm/v/@onfleet/node-onfleet.svg?style=popout-square)](https://www.npmjs.com/package/@onfleet/node-onfleet)
![GitHub top language](https://img.shields.io/github/languages/top/onfleet/node-onfleet.svg?style=popout-square)
[![npm](https://img.shields.io/npm/dt/@onfleet/node-onfleet.svg?style=popout-square)](https://www.npmjs.com/package/@onfleet/node-onfleet)

*Lisez ce document dans une autre langue: [English](https://github.com/onfleet/node-onfleet/blob/master/README.md), [French](https://github.com/onfleet/node-onfleet/blob/master/README.fr.md), [中文](https://github.com/onfleet/node-onfleet/blob/master/README.zh-tw.md)*


Visitez notre [article de blog sur le projet de wrapper API](https://onfleet.com/blog/api-wrappers-explained/) pour en savoir plus sur nos initiatives. Si vous avez des questions, veuillez contacter Onfleet en soumettant un problème [ici](https://github.com/onfleet/node-onfleet/issues) ou contactez support@onfleet.com.

### Table des matières
- [Onfleet Node.js Wrapper](#onfleet-nodejs-wrapper)
    + [Table des matières](#table-des-matières)
  * [Synopsis](#synopsis)
  * [Installation](#installation)
  * [Utilisation](#utilisation)
    + [Authentification](#authentification)
    + [Tests unitaires](#tests-unitaires)
    + [étranglement](#étranglement)
    + [Réponses](#réponses)
    + [Opérations CRUD prises en charge](#opérations-crud-prises-en-charge)
      - [Requêtes GET](#requêtes-get)
        * [Exemples de get()](#exemples-de-get)
        * [Exemples de get(param)](#exemples-de-get-param)
        * [Exemples de getByLocation](#exemples-de-getbylocation)
      - [Requêtes POST](#requêtes-post)
        * [Exemples de create()](#exemples-de-create)
      - [Demandes PUT](#demandes-put)
        * [Exemples de update()](#exemples-de-update)
        * [Exemples de insertTask()](#exemples-de-inserttask)
      - [DELETE Demandes](#delete-demandes)
        * [Exemples de deleteOne()](#exemples-de-deleteone)
    + [Exemples d'utilisation de vos opérations CRUD](#exemples-d-utilisation-de-vos-opérations-crud)
    + [Choses à ne pas faire](#choses-à-ne-pas-faire)
    
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

(Bravo à @marcobeltempo pour la contribution!)

## Utilisation
Avant d'utiliser le wrapper de l'API, vous devez vous procurer une clé API auprès de votre administrateur d'organisation. La création et l'intégration des clés API sont effectuées via le [tableau de bord Onfleet](https://onfleet.com/dashboard#/manage).

Pour commencer à utiliser l'API Onfleet, il vous suffit de créer un objet Onfleet avec votre clé API:
```js
const onfleet = new Onfleet('<clé_api>');
```
En tant que champ facultatif, vous pouvez introduire un délai d'expiration personnalisé inférieur à la valeur par défaut de 70000 ms (délai d'expiration de l'API Onfleet par défaut) en fournissant un 2ème paramètre:
```js
const onfleet = new Onfleet('<clé_api>', 30000) // Cela mettra vos wrappers à expiration à 30000ms au lieu de 70000ms
```

### Authentification
Une fois que l'objet Onfleet est créé, vous pouvez utiliser une fonction utilitaire pour tester le noeud final d'authentification. Cette fonction renvoie un booléen:
```js
onfleet.verifyKey();
```

Une fois que l'objet Onfleet est créé, vous aurez accès à tous les points de terminaison de l'API, comme indiqué dans la [Documentation de l'API Onfleet](http://docs.onfleet.com/). Voici quelques cas d'utilisation:

### Tests unitaires
Exécuter `npm test`

### étranglement
La limitation de débit est appliquée par l'API avec un seuil de 20 demandes par seconde pour toutes les clés d'API de votre organisation. Pour en savoir plus, [cliquez ici](https://docs.onfleet.com/reference#throttling). Nous avons mis en place un limiteur sur le wrapper lui-même pour vous éviter de dépasser involontairement vos limitations de taux et éventuellement être banni.

### Réponses
Le wrapper de l'API `node-onfleet` renvoie le `body` d'un [objet Response](https://developer.mozilla.org/en-US/docs/Web/API/Response).

### Opérations CRUD prises en charge
L'URL de base de l'API Onfleet est `https://onfleet.com/api/v2`, voici les opérations CRUD prises en charge pour chaque ordinateur d'extrémité:

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

#### Requêtes GET
Pour obtenir tous les documents d'un noeud final, cela renvoie une promesse contenant un tableau de résultats:
```js
get();
get(<queryParam> (facultatif));
```
##### Exemples de get()
```js
onfleet.workers.get().then((resultArray) => {
    // faire quelque chose avec le tableau contenant tous les ouvriers
});
```
Option permettant d'utiliser des paramètres de requête pour certains points de terminaison, reportez-vous aux documents de l'API pour les points de terminaison prenant en charge les paramètres de requête:
```js
onfleet.workers.get({phones: '<phone_number>'}).then((res) => {
  // faire quelque chose avec le résultat trouvé
});
onfleet.tasks.get({from: '<from_time>', to: '<to_time>'}).then((result) => {
  // faire quelque chose avec le résultat trouvé
});
```
> **Remarque:** Les paramètres de requête peuvent figurer dans n’importe quel formulaire, à condition qu’il s’agisse d’un objet JSON, par exemple: `{ analytics: true }` et `{ 'analytics': 'true' }` sont identiques.

Pour obtenir l'un des documents dans un noeud final, si *paramName* facultatif n'est pas fourni, l'encapsuleur effectuera une recherche par ID. Si *paramName* est fourni, il recherchera par * paramName *:
```js
get(<paramètre>, <nomParam>(facultatif), <queryParam>(facultatif));
```
Options pour *paramName*: delegateeId, name, phone, shortId et coordinates (voir tableau ci-dessus).
##### Exemples de get(param)
```js
/**
 * Workers
 */ 
onfleet.workers.get('<24_digit_id>').then((result)) => {
  // faire quelque chose avec le résultat trouvé
});
onfleet.workers.get('<24_digit_id>', { analytics: true }).then((result) => {
  // faire quelque chose avec le résultat trouvé
});

/**
 * Tasks
 */ 
onfleet.tasks.get('<shortId>', 'shortId').then((result)) => {
  // faire quelque chose avec le résultat trouvé
});

/**
 * Recipients
 */ 
onfleet.recipients.get('<numéro_phone>', 'phone').then((result)) => {
  // faire quelque chose avec le résultat trouvé
});
onfleet.recipients.get('<destinataire_nom>', 'name').then((result)) => {
  // faire quelque chose avec le résultat trouvé
});
onfleet.recipients.get('<<destinataire_nom>', 'name', {skipPhoneNumberValidation: true}).then((result)) => {
  // faire quelque chose avec le résultat trouvé
});

/**
 * Containers
 */ 
onfleet.containers.get('<24_digit_id>', 'workers').then((result) => {
  // faire quelque chose avec le résultat trouvé
});
onfleet.containers.get('<24_digit_id>', 'teams').then((result) => {
  // faire quelque chose avec le résultat trouvé
});
onfleet.containers.get('<24_digit_id>', 'organizations').then((result) => {
  // faire quelque chose avec le résultat trouvé
});
```
Pour obtenir un pilote par emplacement, utilisez la fonction `getByLocation`:
```js
getByLocation(<queryParam>);
```
##### Exemples de getByLocation
```js
const location = {
  longitude: -122.404,
  latitude: 37,789,
  radius: 10000
}

onfleet.workers.getByLocation(location).then((result)) => {
  // montre le travailleur en service à l'emplacement spécifique
});
```

#### Requêtes POST
Pour créer un document dans un noeud final:
```js
create(<object>);
```
##### Exemples de create()
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
Les requêtes POST étendues incluent `clone`,` forceComplete`, `batchCreate`,` autoAssign`, `setSchedule`:
```js
onfleet.tasks.clone('<24_digit_id>');
onfleet.tasks.forceComplete('<24_digit_id>', '<completion_details>');
onfleet.tasks.batchCreate('<task_object_array>');
onfleet.tasks.autoAssign('<auto_assign_object>');

onfleet.workers.setSchedule('<24_digit_id>', newSchedule);
```

Pour plus de détails, consultez notre documentation sur [clone](https://docs.onfleet.com/reference#clone-task), [forceComplete](https://docs.onfleet.com/reference#complete-task), [batchCreate](https://docs.onfleet.com/reference#create-tasks-in-batch), [autoAssign](https://docs.onfleet.com/reference#automatically-assign-list-of-tasks), and [setSchedule](https://docs.onfleet.com/reference#set-workers-schedule)

#### Demandes PUT
Pour mettre à jour un document dans un noeud final:
```js
update(<id>, <objet>);
```
##### Exemples de update()
```js
const updateBody = {
    name: 'New Driver Name',
};
onfleet.workers.update('<24_digit_id>', updateBody);
```
##### Exemples de insertTask()
```js
onfleet.workers.insertTask('kAQ*G5hnqlOq4jVvwtGNuacl', insertedTask).then(result => {
  // faire quelque chose avec le résultat trouvé
});
```

#### DELETE Demandes
Pour supprimer un document dans un noeud final:
```js
deleteOne(<id>);
```
##### Exemples de deleteOne()
```js
onfleet.workers.deleteOne('<24_digit_id>');
```

### Exemples d'utilisation de vos opérations CRUD
Obtenez tous les destinataires (s'il existe):
```js
onfleet.tasks.get({from:'1557936000000', to:'1558022400000'}).then((res) => {
  for (let element of res) {
    if (element.recipients[0] !== undefined) {
        // do something with the recipients
    }
  }
}).catch((err) => {
  // do something with the error
});
```
Async / wait peut également être utilisé dans les cas suivants:
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

### Choses à ne pas faire
Modèle inefficace, utilisez plutôt des métadonnées:
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