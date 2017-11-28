import Route from '@ember/routing/route';

export default Route.extend({

  // GET /images?filter[slug]=my-image?include=album
  model(params) {
    let slug = params.image_slug;

    return this.store
      .query('image', {
        filter: { slug },
        include: 'album'
      })
      .then(images => images.get('firstObject'));
  },

  serialize(model) {
    return { image_slug: model.get('slug') };
  }


});
