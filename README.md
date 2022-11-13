When using the `webpack.config.js` without a target set we get the error:

```bash
TypeError: Cannot destructure property 'AbortController' of '(intermediate value)(intermediate value)(intermediate value)' as it is undefined.
    at Object.28599 (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:1503772)
    at r (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:3023574)
    at Object.56327 (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:1649743)
    at r (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:3023574)
    at Object.68954 (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:1649604)
    at r (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:3023574)
    at Object.3385 (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:1095538)
    at r (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:3023574)
    at Object.42744 (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:1094836)
    at r (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:3023574)
```

When using the `webpack.config.js` with the target set to `node` we get the error:

```bash
node:internal/fs/utils:347
    throw err;
    ^

Error: ENOENT: no such file or directory, open '/home/jesse/Documents/github/webpack-testing/test2/build/../../components/context.jsonld'
    at Object.openSync (node:fs:594:3)
    at Object.readFileSync (node:fs:462:35)
    at Object.37541 (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:1686337)
    at r (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:3642168)
    at Object.16674 (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:1686823)
    at r (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:3642168)
    at Object.48557 (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:1635110)
    at r (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:3642168)
    at Object.63722 (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:1620998)
    at r (/home/jesse/Documents/github/webpack-testing/test2/build/main.min.js:2:3642168) {
  errno: -2,
  syscall: 'open',
  code: 'ENOENT',
  path: '/home/jesse/Documents/github/webpack-testing/test2/build/../../components/context.jsonld'
}
```

The above results are observed with `main.js` as

```js
import { QueryEngine } from '@comunica/query-sparql';

const engine = new QueryEngine();

engine.queryBindings(`SELECT DISTINCT ?s WHERE { ?s ?p ?o FILTER(isIRI(?s)) }`, {
  sources: [
    'https://www.rubensworks.net/'
  ]
}).then(results => results.map(r => r.get('s')?.value).toArray())
  .then(results => { console.log(results) })
  .catch(err => { console.error(err) });
```

and with `main.js` as


```js
var QueryEngineBase = require('@comunica/actor-init-query').QueryEngineBase;
var engine = new QueryEngineBase(require('@comunica/query-sparql/engine-default'))
```



