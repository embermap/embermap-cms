import Route from '@ember/routing/route';

export default Route.extend({

  serialize(model) {
    return { album_slug: model.get('slug') };
  }

});
