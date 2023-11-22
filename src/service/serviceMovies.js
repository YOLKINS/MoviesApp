import TMDBService from './tmdb-service';

export default class Movies extends TMDBService {
  async getMoviesName(name, page) {
    const res = await this.getResource(`search/movie?query=${name}&page=${page}`);
    console.log(res);
    return { results: res.results, totalPages: res.total_pages };
  }

  async getMoviesImage(movie_id) {
    const res = await this.getResource(`movie/${movie_id}/images`);
    if (res && res.posters && res.posters.length > 0 && res.posters[0].file_path) {
      return res.posters[0].file_path;
    }
    return '';
  }

  async getGenreOfMovie(genre_ids) {
    const res = await this.getResource('genre/movie/list');
    const matchingGenres = res.genres.filter((genre) => genre_ids.includes(genre.id));
    const genreNames = matchingGenres.map((genre) => genre.name);
    return genreNames;
  }
}
