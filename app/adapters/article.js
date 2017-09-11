import DS from 'ember-data';
import ENV from "news-ui/config/environment";

export default DS.JSONAPIAdapter.extend({
  host: ENV.APP.Host,
  namespace: 'api/v1'
});
