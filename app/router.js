import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard', { path: '/' });
  
  this.route('posts', function() {
    this.route('post', { path: '/:post_id' });
  });

  this.route('tags', function() {
    this.route('tag', { path: '/:tag_slug' });
  });

  this.route('media', function() {
    this.route('styles', function() {
      this.route('style', { path: '/:style' });
    });

    this.route('albums', function() {
      this.route('album', { path: '/:album_slug' }, function() {
        this.route('image', { path: '/:image_slug' });
      });
    });
  });

  this.route('comments');

  this.route('d3-playground');
});

export default Router;
