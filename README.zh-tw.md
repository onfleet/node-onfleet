# Onfleet Node.js Wrapper

![Travis (.org)](https://img.shields.io/travis/onfleet/node-onfleet.svg?style=popout-square)
[![GitHub](https://img.shields.io/github/license/onfleet/node-onfleet.svg?style=popout-square)](https://github.com/onfleet/node-onfleet/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dt/@onfleet/node-onfleet.svg?style=popout-square)](https://www.npmjs.com/package/@onfleet/node-onfleet)
![David](https://img.shields.io/david/onfleet/node-onfleet.svg?style=popout-square)
![GitHub top language](https://img.shields.io/github/languages/top/onfleet/node-onfleet.svg?style=popout-square)

*其他語言版本: [English](https://github.com/onfleet/node-onfleet/blob/master/README.md), [French](https://github.com/onfleet/node-onfleet/blob/master/README.fr.md), [正體中文](https://github.com/onfleet/node-onfleet/blob/master/README.zh-tw.md)*

如果對於Onfleet應用程式介面或是我們產品有任何的問題，[歡迎在此留言](https://github.com/onfleet/node-onfleet/issues) 或直接聯繫 support@onfleet.com。

### 目錄
- [Onfleet Node.js Wrapper](#onfleet-nodejs-wrapper)
    + [目錄](#目錄)
  * [概要](#概要)
  * [安裝](#安裝)
  * [使用守則](#使用守則)
    + [金鑰認證](#金鑰認證)
    + [單元測試](#單元測試)
    + [API速限](#api速限)
    + [請求回應](#請求回應)
    + [支援的CRUD操作](#支援的CRUD操作)
      - [GET 請求](#GET-請求)
        * [使用get展示所有資源的範例](#使用get展示所有資源的範例)
        * [使用get展示指定資源的範例](#使用get展示指定資源的範例)
        * [展示指定地理位置的worker資源範例](#展示指定地理位置的worker資源範例)
      - [POST 請求](#POST-請求)
        * [使用create提交指定資源的範例](#使用create提交指定資源的範例)
      - [PUT 請求](#PUT-請求)
        * [使用update取代指定資源的範例](#使用update取代指定資源的範例)
        * [使用insertTask取代指定資源的範例](#使用insertTask取代指定資源的範例)
      - [DELETE 請求](#DELETE-請求)
        * [使用deleteOne刪除指定資源的範例](#使用deleteOne刪除指定資源的範例)
    + [利用CRUD操作的範例](#利用CRUD操作的範例)
    + [錯誤的示範](#錯誤的示範)


## 概要

`node-onfleet` 提供一個快速又便捷的方式，以獲取Onfleet應用程式介面內的資料。 

## 安裝

```
npm install @onfleet/node-onfleet
```
我們選用了`node-fetch`當作我們HTTP請求的工具，它使用了原生的Fetch API，支援promise，跟其他工具組相比依賴性上也較低。

## 使用守則
在使用Onfleet應用程式介面之前，請先索取應用程式介面金鑰。創建應用程式介面金鑰的詳情，請洽[Onfleet官方網站](http://onfleet.com)。

將您的金鑰取代下面的api_key參數即可開始使用：
```js
const onfleet = new Onfleet('<api_key>');
```
### 金鑰認證
當Onfleet物件成功被創建，表示您的應用程式介面金鑰是符合預期的。您可以嘗試使用verifyKey函式來測試您的金鑰是否合法，authentication這個endpoint會認證您的金鑰，回應為一布林值：
```js
onfleet.verifyKey();
```

當Onfleet物件成功被創建，而金鑰又是合法的，您會獲得訪問以下各endpoint資源的函式。欲獲得各endpoint資源的定義，請洽[Onfleet官方應用程式介面文件](http://docs.onfleet.com/)：

### 單元測試
執行 `npm test`

### API速限
原則上API的速限為每秒鐘20次請求，詳情請參考[官方文件](http://docs.onfleet.com/docs/throttling)

### 請求回應
所有請求的回應皆為一[Response物件](https://developer.mozilla.org/en-US/docs/Web/API/Response)的內容主體。

### 支援的CRUD操作 
Onfleet應用程式介面的基本URL為 `https://onfleet.com/api/v2`，下面為各endpoint所支援的函式列表：

| `<endpoint>` | GET | POST | PUT | DELETE |
|:------------:|:---------------------------------------------------:|:----------------------------------------------------------------------:|:------------------------------------:|:-------------:|
| [Admins](http://docs.onfleet.com/docs/administrators) | get() | create(obj) | update(id, obj) | deleteOne(id) |
| [Containers](http://docs.onfleet.com/docs/containers) | get(id, 'workers'), get(id, 'teams'), get(id, 'organizations') | x | update(id, obj) | x |
| [Destinations](http://docs.onfleet.com/docs/destinations) | get(id) | create(obj) | x | x |
| [Hubs](http://docs.onfleet.com/docs/hubs) | get() | x | x | x |
| [Organization](http://docs.onfleet.com/docs/organizations) | get(), get(id) | x | insertTask(id, obj) | x |
| [Recipients](http://docs.onfleet.com/docs/recipients) | get(id), get(name, 'name'), get(phone, 'phone') | create(obj) | update(id, obj) | x |
| [Tasks](http://docs.onfleet.com/docs/tasks) | get(query), get(id), get(shortId, 'shortId') | create(obj), clone(id), forceComplete(id), batch(obj), autoAssign(obj) | update(id, obj) | deleteOne(id) |
| [Teams](http://docs.onfleet.com/docs/teams) | get(), get(id) | create(obj) | update(id, obj), insertTask(id, obj) | deleteOne(id) |
| [Webhooks](http://docs.onfleet.com/docs/webhooks) | get() | create(obj) | x | deleteOne(id) |
| [Workers](http://docs.onfleet.com/docs/workers) | get(), get(query), get(id), getByLocation(obj), getSchedule(id) | create(obj), setSchedule(id, obj) | update(id, obj), insertTask(id, obj) | deleteOne(id) |

#### GET 請求
展示所有資源的指令如下，回應的主體為包含一陣列的[`Promise`物件](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise):
```js
get();
get(<queryParam>);
```
##### 使用get展示所有資源的範例
```js
onfleet.workers.get().then((resultArray) => {
    // 回應為一陣列
});
```
部分的endpoint有支援*queryParam（查詢參數）*，詳情請參考[Onfleet官方文件](http://docs.onfleet.com)：
```js
 onfleet.workers.get({phones: '<電話號碼>'}).then((res) => {
  // 回應為一worker物件
 });
 onfleet.tasks.get({from: '<from_time>', to: '<to_time>'}).then((result) => {
  // 回應為ㄧ包含task物件的陣列
});
```

> **備註:** 查詢參數唯一的要求就是為一個JSON物件，舉例來說，`{ 'analytics': 'true' }`以及`{ analytics: true }`都會被接受。


展示指定資源的指令如下，指定的參數預設為24碼的物件ID，如果提供額外的*paramName（參數名稱）*以及*queryParam（查詢參數）*，則會根據參數做展示：
```js
get(<parameter>, <paramName>（非必要）, <queryParam>（非必要）);
```
*paramName*可以是: id, name, phone, shortId。
##### 使用get展示指定資源的範例
```js
/**
 * Workers節點的GET請求
 */
onfleet.workers.get('<24_digit_id>').then((result) => {
  // 回應為一worker物件
});
onfleet.workers.get('<24_digit_id>', { analytics: true }).then((result) => {
  // 回應為一worker物件
});

/**
 * Tasks節點的GET請求
 */
onfleet.tasks.get('<shortId>', 'shortId').then((result) => {
  // 回應為一task物件
});

/**
 * Recipients節點的GET請求
 */
onfleet.recipients.get('<phone_number>', 'phone').then((result) => {
  // 回應為一recipient物件
});
onfleet.recipients.get('<recipient_name>', 'name').then((result) => {
  // 回應為一recipient物件
});
onfleet.recipients.get('<recipient_name>', 'name', {skipPhoneNumberValidation:true}).then((result) => {
  // 回應為一recipient物件
});

/**
 * Containers節點的GET請求
 */
onfleet.containers.get('<24_digit_id>', 'workers').then((result) => {
  // 回應為一container物件
});
onfleet.containers.get('<24_digit_id>', 'teams').then((result) => {
  // 回應為一container物件
});
onfleet.containers.get('<24_digit_id>', 'organizations').then((result) => {
  // 回應為一container物件
});
```
欲使用地理位置來搜尋線上的worker，請使用`getByLocation`：
```js
getByLocation(<queryParam>);
```
##### 展示指定地理位置的worker資源範例
```js
const location = {
  longitude: -122.404,
  latitude: 37.789,
  radius: 10000
}

onfleet.workers.getByLocation(location).then((result) => {
  // 顯示在線上，又符合地理位置的worker物件
});
```


#### POST 請求
提交某單一指定資源的指令如下:
```js
create(<object>);
```
##### 使用create提交指定資源的範例
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
其他延伸的POST請求包含了tasks節點上的`clone`, `forceComplete`, `batchCreate`, `autoAssign`以及workers節點上的`setSchedule`：
```js
onfleet.tasks.clone('<24_digit_id>');
onfleet.tasks.forceComplete('<24_digit_id>', '<completion_details>');
onfleet.tasks.batchCreate('<task_object_array>');
onfleet.tasks.autoAssign('<auto_assign_object>');

onfleet.workers.setSchedule('<24_digit_id>', newSchedule);
```
參考資料：[clone](http://docs.onfleet.com/docs/tasks#clone-task), [forceComplete](http://docs.onfleet.com/docs/tasks#complete-task), [batchCreate](http://docs.onfleet.com/docs/tasks#create-tasks-in-batch), [autoAssign](http://docs.onfleet.com/docs/tasks#automatically-assign-list-of-tasks), 以及[setSchedule](http://docs.onfleet.com/docs/workers#update-workers-schedule)。

#### PUT 請求
取代（更新）某單一指定資源的指令如下:
```js
update(<id>, <object>);
```
##### 使用update取代指定資源的範例
```js
const updateBody = {
    name: 'New Driver Name',
};
onfleet.workers.update('<24_digit_id>', updateBody);
```
##### 使用insertTask取代指定資源的範例
```js
onfleet.workers.insertTask('kAQ*G5hnqlOq4jVvwtGNuacl', insertedTask).then(result => {
  // 回應為worker類別的container物件
});
```

#### DELETE 請求
刪除某單一指定資源的指令如下:
```js
deleteOne(<id>);
```
##### 使用deleteOne刪除指定資源的範例
```js
onfleet.workers.deleteOne('<24_digit_id>');
```

### 利用CRUD操作的範例
展示所有存在的recipients:
```js
onfleet.tasks.get({from:'<timestamp>', to:'<timestamp>'}).then((res) => {
  for (let element of res) {
    if (element.recipients[0] !== undefined) {
        // do something with the recipients
    }
  }
}).catch((err) => {
  // 錯誤回應
});
```
Async/await 函數的使用方式:
```js
async function findAllWorkers() {
  try {
    let response = await onfleet.workers.get();
    // 對回應的陣列做出應用
  } catch(err) {
    throw new Error(err);
  }
};

findAllWorkers();
```
### 錯誤的示範
效率不佳的請求模型（請求中的請求），建議使用metadata：
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
  // 錯誤回應
});
```
