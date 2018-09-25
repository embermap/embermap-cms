import { sort, map } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import groupBy from 'ember-group-by';

export default Controller.extend({

  queryParams: ['selectedAuthor', 'selectedCategory', 'selectedPost'],
  selectedAuthor: null,
  selectedCategory: null,
  selectedPost: null,

  activeSortBy: 'date:desc',
  postsSorting: computed('activeSortBy', function() {
    return [ this.activeSortBy ];
  }),
  sortedPosts: sort('model', 'postsSorting'),

  posts: computed('sortedPosts.[]', 'selectedAuthor', 'selectedCategory', 'selectedPost', function() {
    let selectedAuthor = this.selectedAuthor;
    let selectedCategory = this.selectedCategory;
    let selectedPost = this.selectedPost;

    return this.sortedPosts
      .filter(post => selectedAuthor ? post.get('author') === selectedAuthor : true)
      .filter(post => selectedCategory ? post.get('category') === selectedCategory : true)
      .filter(post => selectedPost ? post.get('title') === selectedPost : true);
  }),

  postsByAuthor: groupBy('posts', 'author'),
  authorData: map('postsByAuthor', function(group) {
    return {
      label: group.value,
      count: group.items.length
    };
  }),

  postsByCategory: groupBy('posts', 'category'),
  categoryData: map('postsByCategory', function(group) {
    return {
      label: group.value,
      count: group.items.length
    };
  }),

  commentsData: map('posts', function(post) {
    return {
      label: post.get('title'),
      count: post.get('commentsCount')
    };
  }),

  actions: {
    openPost(post) {
      if (post) {
        this.transitionToRoute('posts.post', post);
      }
    },

    sort(field) {
      if (field === this.activeSortBy) {
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
