import Ember from 'ember';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    thread: { embedded: 'always' }
  }
});
