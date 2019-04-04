@light/conf

## 如何获取 conf

```javascript
var a = conf.get('host');
var b = conf.get('port');
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
conf.default(() => {
    // logic here
    return {
        ...
    } 
})
```

## 如何从环境变量中获取值

```javascript
conf.setEnvPrefix('light_backend'); //auto uppercase
conf.env(key, value);
conf.env({
    key1: value1,
    key2: value2,
})
```