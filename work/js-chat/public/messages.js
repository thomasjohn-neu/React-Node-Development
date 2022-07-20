import state from './stateMessages';
import { fetchAddMessage, fetchMessages, fetchSession, fetchLogout, fetchLogin } from './services';
import { render, renderStatus } from './render';

checkForSession();
addAbilityToLogin();
addAbilityToLogout();
addAbilityToRefresh();
addAbilityToAddMessage();

/////////////////////////////////
function setLoggedIn(isLoggedIn) {
  // Notice how more complicated this is because we're not basing this off of state data
  // Not just here, but in the places we have to change our login status
  // This complexity is why I recommend rendering based on state
  // instead of hiding/showing elements
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
}

function checkForSession() {
  fetchSession().then(populateMessages).catch(() => setLoggedIn(false));
}

// In below "addAbility*" functions I'm demonstrating attaching events to
// different spots in the HTML, not to one top level element
// However, notice that all of these elements are NOT replaced in render()
// so this still works
//
// See how the two styles differ and what is easier/harder with each
function addAbilityToLogin() {
  const buttonEl = document.querySelector('.login button');
  const usernameEl = document.querySelector('.login__username');

  // Below and elsewhere I attach to "click" and not "submit" on a form
  // As a result, I can't hit "enter" in the single input to make it progress
  // How would you write these using "submit"?
  buttonEl.addEventListener('click', e => {
    const username = usernameEl.value;
    fetchLogin(username).then(renderOnLogin).catch(error => renderStatus(error));
  });
}

function addAbilityToLogout() {
  const buttonEl = document.querySelector('.logout');
  buttonEl.addEventListener('click', e => {
    state.messages = {};
    fetchLogout().then(() => setLoggedIn(false)).catch(error => renderStatus(error));
  });
}

function populateMessages() {
  fetchMessages().then(rawMessages => {
    state.messages = rawMessages;
    setLoggedIn(true);
    render({ state });
    renderStatus('');
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