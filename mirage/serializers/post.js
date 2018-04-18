import ApplicationSerializer from './application';

let includes = [ 'activities' ];

export default ApplicationSerializer.extend({

  include: includes

});
