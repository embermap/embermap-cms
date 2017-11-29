import Route from '@ember/routing/route';

export default Route.extend({

  // GET /albums?filter[slug]=my-album
  model() {
    let slug = this.paramsFor('media.albums.album').album_slug;
    let hasLoadedAllAlbums = this.store.get(`meta.albums.hasLoadedAll`)
    let hasLoadedAlbum = this.store.get(`meta.album.${slug}`)

    if (hasLoadedAllAlbums || hasLoadedAlbum) {
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
          this.store.set(`meta.album.${slug}`, true);

          return albums.get('firstObject')
        });
    }
  }


});
