import { faker } from 'ember-cli-mirage';
import filterable from './utils/filterable';
import moment from 'moment';

// Lock randomly generated data from faker
faker.seed(123);

export default function() {
  this.timing = 20;

  this.resource('posts');
  this.resource('activities');
  this.patch('posts/:id', function(schema, request) {
    let post = schema.posts.find(request.params.id);
    let attrs = this.normalizedRequestAttrs();
    let originalTags = post.tags;
    let newTags = schema.tags.find(attrs.tagIds);
    let activity = schema.activities.create({
      createdAt: moment().toISOString()
    });

    if (newTags.length > originalTags.length) {
      let addedTag = newTags.filter(tag => !originalTags.includes(tag)).models[0];
      activity.update({ text: `The ${addedTag.name} tag was added` });

    } else if (originalTags.length > newTags.length) {
      let removedTag = originalTags.filter(tag => !newTags.includes(tag)).models[0];
      activity.update({ text: `The ${removedTag.name} tag was removed` });
    }

    post.update(attrs);
    post.activities.add(activity);
    post.save();

    return post;
  });
  this.resource('tags');

  this.get('albums', filterable('albums', [ 'slug' ]));
  this.get('images', filterable('images', [ 'slug', 'style' ]));
  this.get('tags', filterable('tags', [ 'slug' ]));
}
