# light conf

简单灵活的管理 Node.js 服务配置，目前支持默认配置，绑定「环境变量」以及读取特定格式的配置文件（json和yaml）。

light conf 有默认的配置优先级，目前的优先级如下：
```
环境变量（env） > 配置文件（file）> 默认配置（default）
``` 

## 如何设置默认值 default

```javascript
conf.default(key, value)
conf.default('a.b.c', value)
conf.default({
    key1: value1,
    key2: value2,
    ...
})
```

## 如何绑定环境变量

```javascript
// 假设环境变量如下
process.env = {
    'MY_APPLICATION_ID': 'apptest',
    'MY_APPLICATION_SECRET': 'asdf',
    'MONGO_URI': 'mongodb://10.0.0.1:27017',
    'MONGO_USERNAME': 'admin',
    'MONGO_PASSWORD': '123456',
    'FOO': 'bar'
    // ...
};

// 如果要绑定所有的环境变量
conf.env();
conf.get('my_application_id'); // 不用关心大小写问题

// 如果只需要绑定部分环境变量
conf.env(['my_application_id', 'my_application_secret']); // 只取一个子集
conf.get('my_application_id');
conf.get('my_application_secret');
// conf.get('foo') // 因为子集中没有 FOO， 所以这里会返回 undefined

// 如果要绑定某个环境变量到某个特定的object path
conf.env('appId', 'my_application_id'); 
conf.get('appId');
// conf.get('my_application_id'); // 注意因为my_application_id已经绑定到了appId，所以这里会返回undefined


// 你也可以指定一个环境变量前缀
conf.setEnvPrefix('my_application');
conf.env();
conf.get('id') 
conf.get('secret')
```

## 如何读取配置文件
目前只支持 json 以及 yaml 两种文件格式

```javascript
const path = require('path');
conf.file(path.resolve(__dirname, 'conf.json'));
conf.file(path.resolve(__dirname, 'conf.yaml'));
```