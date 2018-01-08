import Object from '@ember/object';

const BookState = Object.extend({});

BookState.reopenClass({
  initialState(instance) {
    return {
      isEditing: true,
      title: instance.get('book.title'),
      description: instance.get('book.description')
    };
  }
});

export default BookState;
