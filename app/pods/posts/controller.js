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
    }
  }

});
