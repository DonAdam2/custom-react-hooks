//services
import { apiMockService } from './HttpService';

class MoviesService {
	static fetchMovies() {
		return apiMockService({
			method: 'GET',
			url: '/5ccfe7d13200006f0000f8c7',
		});
	}
}

export default MoviesService;
