import { MESSAGES } from './constants';

export function render( { state, add } = {} ) {
  const html = Object.values(state.messages).map( message => {
    return `
      <li class="todo">
      <div class="message">
        <div class="sender-info">
          <span>${message.username}</span>
        </div>
        <p class="message-text"> ${message.message} </p> 
      </div>
      </li>
      `;
  }).join('') || `<p>No messages yet, start a new chat!</p>`;
  const chatEl = document.querySelector('.todos');
  chatEl.innerHTML = html;
  const userHtml = Object.values(state.users).map( user => {
    return `
      <li class="todo"><label>${user}</label> </li>`
  }).join('') || `<p>No User online now!</p>`;
  const userEl = document.querySelector('.users');
  userEl.innerHTML = `<h2>Active Users</h2>` + userHtml;

}

export function renderStatus(message) {
  const statusEl = document.querySelector('.status');
  if( !message ) {
    statusEl.innerText = '';
    return;
  }
  const key = message?.error ? message.error : 'default';
  statusEl.innerText = MESSAGES[key] || MESSAGES.default;
}

