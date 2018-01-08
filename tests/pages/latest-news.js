import {
  attribute,
  create,
  visitable,
  count,
  text,
  collection
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/latest'),
  articleCount: count('article'),
  articles: collection({
    itemScope: 'article',
    item: {
      title: text('.t-title'),
      truncatedText: text('.t-truncated-text'),
      imageUrl: attribute('src', 'img')
    }
  })

});
