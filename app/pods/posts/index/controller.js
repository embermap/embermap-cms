import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Controller.extend({

  queryParams: ['selectedAuthor', 'selectedCategory', 'selectedPost'],
  selectedAuthor: null,
  selectedCategory: null,
  selectedPost: null,

  activeSortBy: 'date',
  postsSorting: Ember.computed('activeSortBy', function() {
    return [ this.get('activeSortBy') ];
  }),
  sortedPosts: Ember.computed.sort('model', 'postsSorting'),

  posts: Ember.computed('sortedPosts.[]', 'selectedAuthor', 'selectedCategory', 'selectedPost', function() {
    let selectedAuthor = this.get('selectedAuthor');
    let selectedCategory = this.get('selectedCategory');
    let selectedPost = this.get('selectedPost');

    return this.get('sortedPosts')
      .filter(post => selectedAuthor ? post.get('author') === selectedAuthor : true)
      .filter(post => selectedCategory ? post.get('category') === selectedCategory : true)
      .filter(post => selectedPost ? post.get('title') === selectedPost : true);
  }),

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
      count: post.get('comments.length')
    };
  }),

  actions: {
    sort(field) {
      if (field === this.get('activeSortBy')) {
        this.set('activeSortBy', `${field}:desc`);
      } else {
        this.set('activeSortBy', field);
      }
    },

    toggleBar(property, label) {
      let newValue = this.get(property) === label ? null : label;

      this.set(property, newValue);
    }
  }

});
