export default class TMDBService {
  constructor() {
    this._apiBase = 'https://api.themoviedb.org/3/';
    this._options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzczMmJkNjA3NzdkMThjZmQ5ZDU4N2FhYWY2NjA2MiIsInN1YiI6IjY1NDhjOTY4NDFhNTYxMzM2Yjc4Yzk0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OnBkeAyYwOQzyFM5gIxfFoiq_cJx9uKK3CXSaLRk1Yw',
      },
    };
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`, this._options);

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url}, received ${res.status}`);
    }
    const result = await res.json();
    return result;
  }
}
