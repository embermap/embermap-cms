import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    let reload = !this.store.get('meta.albums.hasLoadedAll');

    return this.store.findAll('album', {
      include: 'images',
      reload
    }).then(albums => {
      this.store.set('meta.albums', { hasLoadedAll: true });

      return albums;
    });
  }

});
