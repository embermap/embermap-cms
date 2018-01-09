export default function(resourceName, attrs) {
  return (schema, request) => {
    let filters = attrs.reduce((hash, attr) => {
      let val = request.queryParams[`filter[${attr}]`];
      if (val) {
        hash[attr] = val;
      }

      return hash;
    }, {});

    return schema[resourceName].where(filters);
  }
}
