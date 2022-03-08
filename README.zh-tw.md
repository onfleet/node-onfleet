# Onfleet Node.js Wrapper

![Build](https://img.shields.io/travis/onfleet/node-onfleet.svg?style=popout-square)
[![License](https://img.shields.io/github/license/onfleet/node-onfleet.svg?style=popout-square)](https://github.com/onfleet/node-onfleet/blob/master/LICENSE)
[![Latest version](https://img.shields.io/npm/v/@onfleet/node-onfleet.svg?style=popout-square)](https://www.npmjs.com/package/@onfleet/node-onfleet)
![Top language](https://img.shields.io/github/languages/top/onfleet/node-onfleet.svg?style=popout-square)
![Dependencies](https://img.shields.io/david/onfleet/node-onfleet.svg?style=popout-square)
[![Downloads](https://img.shields.io/npm/dt/@onfleet/node-onfleet.svg?style=popout-square)](https://www.npmjs.com/package/@onfleet/node-onfleet)

> *其他語言版本*:  
> [English](https://github.com/onfleet/node-onfleet/blob/master/README.md)  
> [Français](https://github.com/onfleet/node-onfleet/blob/master/README.fr.md)  
> [Español](https://github.com/onfleet/node-onfleet/blob/master/README.es.md)  

欲了解本開源專案的背景，請參閱[我們的部落格](https://onfleet.com/blog/api-wrappers-explained/)，如果對於Onfleet應用程式介面或是我們產品有任何的問題，歡迎[在此留言](https://github.com/onfleet/pyonfleet/issues)或直接聯繫 support@onfleet.com。

### 目錄
+ [目錄](#目錄)
* [概要](#概要)
* [安裝](#安裝)
* [使用守則](#使用守則)
    - [金鑰認證](#金鑰認證)
    - [單元測試](#單元測試)
    - [使用Docker進行單元測試](#使用Docker進行單元測試)
    - [API速限](#api速限)
    - [請求回應](#請求回應)
    - [支援的CRUD操作](#支援的CRUD操作)
        * [GET 請求](#GET-請求)
            - [使用`get`展示所有資源的範例](#使用get展示所有資源的範例)
            - [使用`get`展示指定資源的範例](#使用get展示指定資源的範例)
            - [展示指定地理位置的`getByLocation`資源範例](#展示指定地理位置的getbylocation資源範例)
        * [POST 請求](#POST-請求)
            - [使用`create`提交指定資源的範例](#使用create提交指定資源的範例)
        * [PUT 請求](#PUT-請求)
            - [使用`update`取代指定資源的範例](#使用update取代指定資源的範例)
            - [使用`insertTask`取代指定資源的範例](#使用inserttask取代指定資源的範例)
        * [DELETE 請求](#DELETE-請求)
            - [使用`deleteOne`刪除指定資源的範例](#使用deleteone刪除指定資源的範例)
    - [利用CRUD操作的範例](#利用CRUD操作的範例)
    - [錯誤的示範](#錯誤的示範)


## 概要
`node-onfleet` 提供一個快速又便捷的方式，以獲取Onfleet應用程式介面內的資料。 

## 安裝
```
npm install @onfleet/node-onfleet
```
若是使用`TypeScript`，則需另外安裝[typed definition](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/onfleet__node-onfleet)：
```
npm install @types/onfleet__node-onfleet
```
> 感謝 @marcobeltempo 的開源贊助

我們選用了`node-fetch`當作我們HTTP請求的工具，它使用了原生的Fetch API，支援promise，跟其他工具組相比依賴性上也較低。

## 使用守則
在使用Onfleet應用程式介面之前，請先索取應用程式介面金鑰。創建應用程式介面金鑰的詳情，請洽[Onfleet官方網站](http://onfleet.com)。

將您的金鑰取代下面的api_key參數即可開始使用：
```js
const onfleetApi = new Onfleet("<your_api_key>");
```

由於某些應用的執行逾時參數較低（例如Heroku的三十秒設定），您可以在創立物件時，提供一個低於70000ms、客製化的逾時參數：
```js
const onfleetApi = new Onfleet("<your_api_key>", 30000);
```

作為可選字段，您可以引入一個用於 Bottleneck 的選項對象 [Bottleneck](https://www.npmjs.com/package/bottleneck).
```js
const onfleetApi = new Onfleet("<your_api_key>", 30000, {
  LIMITER_RESERVOIR: 10,               // Default: 20
  LIMITER_WAIT_UPON_DEPLETION: 20000,  // Default: 10000
  LIMITER_MAX_CONCURRENT: 5,           // Default: 1
  LIMITER_MIN_TIME: 50,                // Default: 50
});
```

### 金鑰認證
當Onfleet物件成功被創建，表示您的應用程式介面金鑰是符合預期的。您可以嘗試使用verifyKey函式來測試您的金鑰是否合法，authentication這個endpoint會認證您的金鑰，回應為一布林值：
```js
onfleetApi.verifyKey();  // Returns a boolean
```

當Onfleet物件成功被創建，而金鑰又是合法的，您會獲得訪問以下各endpoint資源的函式。欲獲得各endpoint資源的定義，請洽[Onfleet官方應用程式介面文件](http://docs.onfleet.com/)：

### 單元測試
`npm test`

### 使用Docker進行單元測試

`docker-compose up --build`

### API速限
原則上API的速限為每秒鐘20次請求，詳情請參考[官方文件](https://docs.onfleet.com/reference#throttling)。在此模組內我們也提供了限速，以避免您無意間超過了API請求的速限而導致帳號被禁的狀況。

### 請求回應
所有請求的回應皆為一[Response物件](https://developer.mozilla.org/en-US/docs/Web/API/Response)的內容主體。

### 支援的CRUD操作 
下面為各endpoint所支援的函式列表：

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

#### GET 請求
展示所有資源的指令如下，回應的主體為包含一陣列的[`Promise`物件](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise):
```js
get();
```

##### 使用`get`展示所有資源的範例
```js
onfleetApi.workers.get().then((results) => { /* ... */ });
onfleetApi.workers.get({ queryParams }).then((results) => { /* ... */ });
```

部分的endpoint有支援*queryParam（查詢參數）*，詳情請參考[Onfleet官方文件](http://docs.onfleet.com)：
```js
onfleetApi.workers.get({ phones: "<phone_number>" }).then((results) => { /* ... */ });

onfleetApi.tasks.get({ from: "<from_time>", to: "<to_time>" }).then((results) => { /* ... */ });
```

> 查詢參數唯一的要求就是為一個JSON物件，舉例來說，`{ 'analytics': 'true' }`以及`{ analytics: true }`都會被接受


展示指定資源的指令如下，指定的參數預設為24碼的物件ID，如果提供額外的*paramName（參數名稱）*以及*queryParam（查詢參數）*，則會根據參數做展示：
```js
get(<parameter>, <paramName> (optional), <queryParam> (optional));
```

*paramName*可以是:
- `id`
- `name`
- `phone`
- `shortId`

##### 使用`get`展示指定資源的範例
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

欲使用地理位置來搜尋線上的worker，請使用`getByLocation`：
```js
getByLocation({ queryParams });
```

##### 展示指定地理位置的`getByLocation`資源範例
```js
const locationParams = {
  longitude: -122.404,
  latitude: 37.789,
  radius: 10000,
};

onfleetApi.workers.getByLocation(locationParams).then((results) => { /* ... */ });
```

#### POST 請求
提交某單一指定資源的指令如下:
```js
create(<object>);
```

##### 使用`create`提交指定資源的範例
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

其他延伸的POST請求包含了*Tasks*節點上的`clone`, `forceComplete`, `batchCreate`, `autoAssign`，*Workers*節點上的`setSchedule`，*Teams*節點上的`autoDispatch`，以及所有支持節點上的`matchMetadata`：

```js
onfleetApi.tasks.clone('<24_digit_ID>');
onfleetApi.tasks.forceComplete('<24_digit_ID>', { data });
onfleetApi.tasks.batchCreate({ data });
onfleetApi.tasks.autoAssign({ data });

onfleetApi.workers.setSchedule('<24_digit_ID>', { data });

onfleetApi.teams.autoDispatch('<24_digit_ID>', { data });

onfleetApi.<entity_name_pluralized>.matchMetadata({ data });
```

參考資料：[`clone`](https://docs.onfleet.com/reference#clone-task), [`forceComplete`](https://docs.onfleet.com/reference#complete-task), [`batchCreate`](https://docs.onfleet.com/reference#create-tasks-in-batch), [`autoAssign`](https://docs.onfleet.com/reference#automatically-assign-list-of-tasks), [`setSchedule`](https://docs.onfleet.com/reference#set-workers-schedule), [`matchMetadata`](https://docs.onfleet.com/reference#querying-by-metadata), 以及[`autoDispatch`](https://docs.onfleet.com/reference#team-auto-dispatch)。

#### PUT 請求
取代（更新）某單一指定資源的指令如下:
```js
update("<24_digit_ID>", { data });
```

##### 使用`update`取代指定資源的範例
```js
const newData = {
  name: "Jack Driver",
};

onfleetApi.workers.update("<24_digit_ID>", newData);
```

##### 使用`insertTask`取代指定資源的範例
```js
onfleetApi.workers.insertTask("<24_digit_ID>", { data }).then((result) => { /* ... */ });
```

#### DELETE 請求
刪除某單一指定資源的指令如下:
```js
deleteOne("<24_digit_ID>");
```

##### 使用`deleteOne`刪除指定資源的範例
```js
onfleet.workers.deleteOne('<24_digit_ID>');
```

### 利用CRUD操作的範例

- 展示所有存在的recipients:
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

- `async`/`await` 函數的使用方式:
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

### 錯誤的示範

- 效率不佳的請求模型（請求中的請求），建議使用metadata：
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

*返回[頂端](#onfleet-nodejs-wrapper)*。
