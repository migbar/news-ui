import Object from '@ember/object';

const AuthorState = Object.extend();

AuthorState.reopenClass({
  initialState(instance) {
    return {
      name: instance.get('name')
    };
  }
});

export default AuthorState;
