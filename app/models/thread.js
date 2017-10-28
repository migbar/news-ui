import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
  url: attr('string'),
  siteFull: attr('string'),
  site: attr('string'),
  siteSection: attr('string'),
  sectionTitle: attr('string'),
  title: attr('string'),
  titleFull: attr('string'),
  published: attr('string'),
  siteType: attr('string'),
  country: attr('string'),
  mainImage: attr('string'),
  spamScore: attr('number'),
  repliesCount: attr('number'),
  participantsCount: attr('number'),
  performanceScore: attr('number'),
  domainRank: attr('number')
});

// "site_categories": [], //list of strings
//
// "social": {
//   "facebook": {
//     "likes": 0,
//     "comments": 0,
//     "shares": 0
//   },
//   "gplus": {
//     "shares": 0
//   },
//   "pinterest": {
//     "shares": 0
//   },
//   "linkedin": {
//     "shares": 0
//   },
//   "stumbledupon": {
//     "shares": 0
//   },
//   "vk": {
//     "shares": 0
//   }
// }
