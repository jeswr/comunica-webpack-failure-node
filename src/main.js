// const QueryEngine = require('@comunica/query-sparql').QueryEngine;

// const engine = new QueryEngine();

var QueryEngineBase = require('@comunica/actor-init-query').QueryEngineBase;
var engine = new QueryEngineBase(require('@comunica/query-sparql/engine-default'))

engine.queryBindings(`SELECT DISTINCT ?s WHERE { ?s ?p ?o FILTER(isIRI(?s)) }`, {
  sources: [
    'https://www.rubensworks.net/'
  ]
}).then(results => results.map(r => r.get('s')?.value).toArray())
  .then(results => { console.log(results) })
  .catch(err => { console.error(err) });
