export const LOGIN_STATUS = {
    PENDING: "pending",
    NOT_LOGGED_IN: "notLoggedIn",
    IS_LOGGED_IN: "loggedIn",
  };

  export const SERVER_STATUS = {
    AUTH_MISSING: "auth-missing",
    AUTH_INSUFFICIENT: "auth-insufficient",
    REQUIRED_USERNAME: "required-username",
    REQUIRED_MESSAGE: "require-message",
  };
  export const CLIENT_STATUS = {
    NETWORK_ERROR: "networkError",
    NO_SESSION: "noSession",
  };
  export const ISSUES = {
    [CLIENT_STATUS.NETWORK_ERROR]:
      "Not able to connect to the network",
    [SERVER_STATUS.AUTH_INSUFFICIENT]:
      "You are a disallowed user",
    [SERVER_STATUS.REQUIRED_USERNAME]:
      "Enter Valid username",
    default: "Something went wrong.",
  };

  export const MESSAGE_STATUS = {
    PENDING: "pending",
    IS_AVAILABLE: "available",
  };