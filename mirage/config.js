import { faker } from 'ember-cli-mirage';
import filterable from './utils/filterable';
import moment from 'moment';

// Lock randomly generated data from faker
faker.seed(123);

export default function() {
  this.timing = 20;

  this.resource('tags');
  this.resource('posts');

  this.patch('/posts/:id', function(schema, request) {
    let post = schema.posts.find(request.params.id);
    let attrs = this.normalizedRequestAttrs();
    let activityText;
    let currentTags = post.tags;
    let newTags = schema.tags.find(attrs.tagIds);

    if (newTags.length > currentTags.length) {
      let addedTag = newTags.filter(tag => !currentTags.includes(tag)).models[0];
      activityText = `The ${addedTag.name} tag was added`;

    } else if (currentTags.length > newTags.length) {
      let removedTag = currentTags.filter(tag => !newTags.includes(tag)).models[0];
      activityText = `The ${removedTag.name} tag was removed`;
    }

    let activity = schema.activities.create({
      text: activityText,
      createdAt: moment().toISOString()
    });

    post.update(attrs);
    post.activities.add(activity);
    post.save();

    return post;
  });

  this.get('albums', filterable('albums', [ 'slug' ]));
  this.get('images', filterable('images', [ 'slug', 'style' ]));
  this.get('tags', filterable('tags', [ 'slug' ]));
}
