import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard');
  this.route('posts', function() {
    this.route('post', { path: '/:post_id' });
  });
  this.route('media', function() {
    this.route('album', { path: '/albums/:album_slug' });
  });
  this.route('comments');
});

export default Router;
