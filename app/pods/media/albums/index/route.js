import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    if (this.store.get('meta.albums.hasLoadedAll')) {
      return this.store.peekAll('album');
      
    } else {
      return this.store
        .findAll('album', { include: 'images' })
        .then(albums => {
          this.store.set('meta.albums.hasLoadedAll', true);

          return albums;
        });
    }

  }

});
