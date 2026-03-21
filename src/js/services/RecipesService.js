//services
import { apiMockService } from './HttpService';

class RecipesService {
  static fetchRecipes() {
    return apiMockService({
      method: 'GET',
      url: '/recipes?limit=6&select=name,image,cuisine',
    });
  }
}

export default RecipesService;
