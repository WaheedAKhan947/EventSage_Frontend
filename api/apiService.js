import request from './axios';
import {ENDPOINTS} from './apiRoutes';

function get(url, isTokenNeeded = true) {
  return request(
    {
      url,
      method: 'GET',
      crossDomain: true,
    },
    isTokenNeeded,
  );
}

function post(url, body, isTokenNeeded = true) {
  return request(
    {
      url,
      method: 'POST',
      data: body,
      crossDomain: true,
    },
    isTokenNeeded,
  );
}


function put(url, body, isTokenNeeded = true) {
  return request(
    {
      url,
      method: 'PUT',
      data: body,
    },
    isTokenNeeded,
  );
}

function deleteResource(url, isTokenNeeded = true) {
  return request(
    {
      url,
      method: 'DELETE',
      crossDomain: true,
    },
    isTokenNeeded,
  );
}

function patch(url, body, isTokenNeeded = true) {
  return request(
    {
      url,
      method: 'PATCH',
      data: body,
      crossDomain: true,
    },
    isTokenNeeded,
  );
}

const API = {
  get,
  post,
  put,
  patch,
  deleteResource
};

export {API as default, ENDPOINTS};
