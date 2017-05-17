import Ember from 'ember';

const groupBy = function(array, property) {
  return Ember.computed(`${array}.[]`, function() {
    return this.get(array)
      .map(post => {
        return {
          label: post.get(property),
          count: 1
        };
      })
      .reduce((memo, { label, count }) => {
        let found = memo.find(obj => obj.label === label);

        if (found) {
          found.count++
        } else {
          memo.push({ label, count });
        }

        return memo;
      }, []);
  });
}

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

  selectedAuthor: 'Kathryne Raynor',
  authorData: groupBy('model', 'author'),

  categoryData: groupBy('model', 'category'),
  commentsData: Ember.computed('model.[]', function() {
    return this.get('model')
      .map((m) => {
        return {
          label: m.get('title'),
          count: m.get('commentCount')
        };
      })
  }),

  actions: {
    sort(field) {
      if (field === this.get('activeSortBy')) {
        this.set('activeSortBy', `${field}:desc`);
      } else {
        this.set('activeSortBy', field);
      }
    },

    toggleBar(bar, label) {
      this.set(bar, (this.get(bar) === label) ? null : label)
    }
  }

});
