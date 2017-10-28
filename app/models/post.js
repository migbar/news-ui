import DS from 'ember-data';
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  url: attr('string'),
  ordInThread: attr('number'),
  author: attr('string'),
  published: attr('string'),
  title: attr('string'),
  text: attr('string'),
  highlightText: attr('string'),
  highlightTitle: attr('string'),
  language: attr('string'),
  externalLinks: attr('string'),
  rating: attr('string'),
  crawled: attr('string'),
  thread: belongsTo('thread', {async: false})
});

// "entities": {
//   "persons": [
//     {
//       "name": "reynolds",
//       "sentiment": "none"
//     },
//     {
//       "name": "deadpool",
//       "sentiment": "none"
//     },
//     {
//       "name": "peter wade mar",
//       "sentiment": "none"
//     },
//     {
//       "name": "ryan reynolds",
//       "sentiment": "none"
//     },
//     {
//       "name": "stan lee",
//       "sentiment": "none"
//     },
//     {
//       "name": "nathan summers",
//       "sentiment": "none"
//     }
//   ],
//   "organizations": [
//     {
//       "name": "deadpool",
//       "sentiment": "positive"
//     }
//   ],
//   "locations": [
//     {
//       "name": "logan",
//       "sentiment": "none"
//     }
//   ]
// }
