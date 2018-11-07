import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import RouterScroll from 'ember-router-scroll';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');

  this.route('dashboard', { path: '/' });
  this.route('posts', function() {
    this.route('post', { path: '/:post_id' }, function() {
      this.route('edit');
    });
  });
  this.route('tags', function() {
    this.route('tag', { path: '/:tag_slug' });
  });

  this.route('users');
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

  this.route('forms');

  this.route('designs', function() {
    this.route('blog-post-edit-form');
  });

  this.route('styleguide', function() {
    this.route('components', function() {
      this.route('component', { path: '/:component_name' });
    });
  });
});

export default Router;
