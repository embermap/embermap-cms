import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    let reload = this.get('hasLoadedAll') === undefined;

    return this.store.findAll('album', {
      include: 'images',
      reload
    }).then(albums => {
      this.set('hasLoadedAll', true);
      
      return albums;
    });
  }

});
