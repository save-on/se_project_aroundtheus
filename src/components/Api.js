export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    this._contentType = headers["content-type"];
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "content-type": this._contentType,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  editUserInfo({ name, occupation }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "content-type": this._contentType,
      },
      body: JSON.stringify({
        name,
        about: occupation,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
