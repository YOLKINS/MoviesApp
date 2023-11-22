export default class Session {
  async getSessionID(api_key) {
    const option = {
      method: 'GET',
    };
    const res = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${api_key}`, option);
    if (!res.ok) {
      console.log(`Не удается получить сессию. Код ошибки: ${res.status}`);
    }
    console.log(`Статус получения сессии: ${res.status}`);
    const result = await res.json();
    return result.guest_session_id;
  }

  async rateMovie(rating, moveiId, guestSessionId) {
    const apiKey = '8c732bd60777d18cfd9d587aaaf66062';
    const option = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `{"value":${rating}}`,
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${moveiId}/rating?&api_key=${apiKey}&guest_session_id=${guestSessionId}`,
      option
    );

    if (!res.ok) {
      console.log(`Не удается поставить оценку. Код ошибки: ${res.status}`);
    }
    console.log(`Что такое res: ${res.status}`);
    const result = await res.json();
    return result;
  }

  async getRatedMovies(api_key, guest_session_id, page) {
    console.log(`Получение guest_session_id в getRatedMovies() ${guest_session_id}`);

    const option = {
      method: 'GET',
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guest_session_id}/rated/movies?api_key=${api_key}&language=en-US&sort_by=created_at.asc&page=${page}`,
      option
    );

    if (!res.ok) {
      console.log(`Не удается поставить оценку. Код ошибки: ${res.status}`);
    }
    console.log(`Статус поиска Rated Movies: ${res.status}`);
    const result = await res.json();
    console.log('результат getRatedMovies()', result);
    return { results: result.results, totalPages: result.total_pages };
  }
}
