export function fetchAddMessage(task) {
  return fetch('/api/todos', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ task })
  }).catch(() => Promise.reject({ error: 'networkError' })).then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json().catch(error => Promise.reject({ error })).then(err => Promise.reject(err));
  });
}

export function fetchMessages() {
  return fetch('/api/todos').catch(() => Promise.reject({ error: 'networkError' })).then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json().catch(error => Promise.reject({ error })).then(err => Promise.reject(err));
  });
}

export function fetchSession() {
  return fetch('/api/session', {
    method: 'GET'
  }).catch(() => Promise.reject({ error: 'networkError' })).then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json().catch(error => Promise.reject({ error })).then(err => Promise.reject(err));
  });
}

export function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  }).catch(() => Promise.reject({ error: 'networkError' })).then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json().catch(error => Promise.reject({ error })).then(err => Promise.reject(err));
  });
}

export function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ username })
  }).catch(() => Promise.reject({ error: 'networkError' })).then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json().catch(error => Promise.reject({ error })).then(err => Promise.reject(err));
  });
}