import state from './stateMessages';
import { fetchAddMessage, fetchMessages, fetchSession, fetchLogout, fetchLogin, fetchUsers } from './services';
import { render, renderStatus } from './render';

checkForSession();
addAbilityToLogin();
addAbilityToLogout();
addAbilityToRefresh();
addAbilityToAddMessage();

function setLoggedIn(isLoggedIn) {
  const loginEl = document.querySelector('main');
  if (isLoggedIn) {
    loginEl.classList.remove('not-logged-in');
    loginEl.classList.add('logged-in');
  } else {
    loginEl.classList.add('not-logged-in');
    loginEl.classList.remove('logged-in');
  }
  render({ state });
  renderStatus('');
}

function renderOnLogin(messages) {
  state.messages = messages;
  setLoggedIn(true);
  enableAutoRefresh();
}

function enableAutoRefresh(){
    let refreshData = setInterval(function() {
    populateMessages();
    populateActiveUsers();
  }, 5000);
}

function checkForSession() {
  fetchSession().then(populateMessages).catch(() => setLoggedIn(false));
}

function addAbilityToLogin() {
  const buttonEl = document.querySelector('.login button');
  const usernameEl = document.querySelector('.login__username');
  buttonEl.addEventListener('click', e => {
    const username = usernameEl.value;
    fetchLogin(username).then(renderOnLogin).then(populateActiveUsers).catch(error => renderStatus(error));
  });
}

function addAbilityToLogout() {
  const buttonEl = document.querySelector('.logout');
  buttonEl.addEventListener('click', e => {
    state.messages = {};
    state.users = {};
    fetchLogout().then(() => setLoggedIn(false)).catch(error => renderStatus(error));
  });
}

function populateMessages() {
  fetchMessages().then(rawMessages => {
    state.messages = rawMessages;
    setLoggedIn(true);
    renderStatus('');
  }).catch(error => {
    renderStatus(error);
  });
}

function populateActiveUsers() {
  fetchUsers().then(rawUsers => {
    state.users = rawUsers;
    render({ state });
  }).catch(error => {
    renderStatus(error);
  });
}


function addAbilityToAddMessage() {
  const buttonEl = document.querySelector('.add');
  const inputEl = document.querySelector('.to-add');
  buttonEl.addEventListener('click', e => {
    e.preventDefault();
    const messageInput = inputEl.value;
    fetchAddMessage(messageInput).then(messages => {
      inputEl.value = '';
      state.messages = messages;
      render({ state });
      renderStatus('');
    }).catch(err => {
      renderStatus(err || 'error');
    });
  });
}

function addAbilityToRefresh() {
  const buttonEl = document.querySelector('.refresh');
  buttonEl.addEventListener('click', () => {
    populateMessages();
  });
}