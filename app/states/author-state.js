import Ember from 'ember';

const AuthorState = Ember.Object.extend();

AuthorState.reopenClass({
  initialState(instance) {
    return {
      name: instance.get('name')
    };
  }
});

export default AuthorState;
