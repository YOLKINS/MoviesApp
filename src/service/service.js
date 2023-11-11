import TMDBService from './tmdb-service';

export default class Movies extends TMDBService {
  async getMoviesName(name, page) {
    const res = await this.getResource(`search/movie?query=${name}&page=${page}`);
    return res.results;
  }

  async getMoviesImage(movie_id) {
    const res = await this.getResource(`movie/${movie_id}/images`);
    if (res && res.posters && res.posters.length > 0 && res.posters[0].file_path) {
      return res.posters[0].file_path;
    }
    return '';
  }
}
