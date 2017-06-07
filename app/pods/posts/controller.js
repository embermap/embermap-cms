import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Controller.extend({

  activeSortBy: 'date',
  postsSorting: Ember.computed('activeSortBy', function() {
    return [ this.get('activeSortBy') ];
  }),
  posts: Ember.computed.sort('model', 'postsSorting'),

  postsByAuthor: groupBy('posts', 'author'),
  authorData: Ember.computed.map('postsByAuthor', function(group) {
    return {
      label: group.value,
      count: group.items.length
    };
  }),

  postsByCategory: groupBy('posts', 'category'),
  categoryData: Ember.computed.map('postsByCategory', function(group) {
    return {
      label: group.value,
      count: group.items.length
    };
  }),

  commentsData: Ember.computed.map('posts', function(post) {
    return {
      label: post.get('title'),
      count: post.get('commentCount')
    };
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
