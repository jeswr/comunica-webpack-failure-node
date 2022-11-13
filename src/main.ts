import { QueryEngine } from '@comunica/query-sparql/lib/index-browser';

const engine = new QueryEngine();

engine.queryBindings(`SELECT DISTINCT ?s WHERE { ?s ?p ?o FILTER(isIRI(?s)) }`, {
  sources: [
    'https://www.rubensworks.net/'
  ]
}).then(results => results.map(r => r.get('s')?.value).toArray())
  .then(results => { console.log(results) })
  .catch(err => { console.error(err) });
