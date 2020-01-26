class RestApi {
  constructor(endpoints, config) {
    Object.entries(endpoints).forEach(([key, value]) => {
      this[key] = new Endpoint(value.path, config);
    });

    this.config = Object.freeze(config);
  }
}


class Endpoint {
  constructor(path, config) {
    this.path = path;
    this.config = Object.freeze(config);
  }

  create(data, config) {
    return Endpoint.request({path: this.path, method: 'POST', data, config: {...this.config, ...config}});
  }

  read(id, config) {
    return Endpoint.request({id, method: 'GET', config: {...this.config, ...config}});
  }

  update(id, data, config) {
    return Endpoint.request({id, method: 'PUT', data, config: {...this.config, ...config}});
  }

  delete(id, config) {
    return Endpoint.request({id, method: 'GET', config: {...this.config, ...config}});
  }
};

Endpoint.request = ({id, path, method, data, config}) => {
  const requestConfig = {
    method,
    headers: {...Endpoint.config.headers, ...config.headers}
  };

  if(['POST', 'PUT', 'PATCH'].indexOf(method) !== -1) {
    requestConfig.body = JSON.stringify(data);
  }

  const url = Endpoint.getUrl({id, baseUrl: config.baseUrl, path})

  return fetch(url, requestConfig)
    .then(Endpoint.handleRequest)
    .catch(Endpoint.handleError);
};

Endpoint.getUrl = ({id, path, baseUrl=''}) => {
  let url = `${baseUrl}${path}`;

  if(url.search('/:') !== -1) {
    url = url
      .replace(`/:${id}`, `/${id}`)
      .replace(/\/:.+/, '');
  }

  return url;
}

Endpoint.handleError = (error) => {
  console.error(error);
  throw error;
};

Endpoint.handleRequest = async (res)=> {
  let data;
  const status = res.status;

  if(status === 200 || res.headers['Content-Type'] === 'application/json') {
    data = await res.json();
  }

  const response = {res, data};

  if(status >= 400) {
    throw response;
  }

  return {res, data};
}

Endpoint.config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export default RestApi;
export {Endpoint};
