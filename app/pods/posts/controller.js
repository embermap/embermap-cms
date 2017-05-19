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

  selectedCategory: 'Economics',
  // selectedAuthor: 'Kathryne Raynor',
  // filteredData: Ember.computed('model.[]', 'selectedCategory', function() {
  //   let data = this.get('model');
  //
  //   if (this.get('selectedCategory')) {
  //     data = data.filterBy('category', this.get('selectedCategory'));
  //   }
  //
  //   return data;
  // }),
  //

  authorData: groupBy('posts', 'author'),

  categoryData: groupBy('posts', 'category'),

  commentsData: Ember.computed('posts.[]', function() {
    return this.get('posts')
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
