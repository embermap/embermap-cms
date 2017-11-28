import Route from '@ember/routing/route';

export default Route.extend({

  cache: {},

  // GET /albums?filter[slug]=my-album
  model() {
    let slug = this.paramsFor('media.album').album_slug;

    if (this.get(`cache.${slug}`)) {
      return this.store
        .peekAll('album')
        .filterBy('slug', slug)[0];

    } else {
      return this.store
        .query('album', {
          filter: { slug },
          include: 'images'
        })
        .then(albums => {
          this.set(`cache.${slug}`, true);

          return albums.get('firstObject')
        });
    }
  }


});
