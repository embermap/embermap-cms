import Ember from 'ember';

export default Ember.Controller.extend({

  activeSortBy: 'date',
  postsSorting: Ember.computed('activeSortBy', function() {
    return [ this.get('activeSortBy') ];
  }),

  sortedPosts: Ember.computed.sort('model', 'postsSorting'),
  posts: Ember.computed('sortedPosts.[]', 'selectedAuthor', 'selectedCategory', 'selectedTitle', function() {
    let selectedAuthor = this.get('selectedAuthor');
    let selectedCategory = this.get('selectedCategory');
    let selectedTitle = this.get('selectedTitle');

    return this.get('sortedPosts')
      .filter(post => selectedAuthor ? (post.get('author') === selectedAuthor) : true)
      .filter(post => selectedCategory ? (post.get('category') === selectedCategory) : true)
      .filter(post => selectedTitle ? (post.get('title') === selectedTitle) : true);
  }),

  actions: {
    sort(field) {
      if (field === this.get('activeSortBy')) {
        this.set('activeSortBy', `${field}:desc`);
      } else {
        this.set('activeSortBy', field);
      }
    }
  }

});
