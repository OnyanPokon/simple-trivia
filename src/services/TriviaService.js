/* eslint-disable no-unused-vars */
import { HttpStatusCode } from '@/constants';
import api from '@/utils/api';

export default class TriviaService {
  /**
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  data?: Trivia[];
   * }>}
   * */
  static async getQuiz({ ...filters }) {
    const params = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== ''));
    const response = await api.get('/api/api.php', { params });

    const { response_code, results } = response;

    return {
      code: HttpStatusCode.OK,
      status: response_code === 0,
      message: response_code === 0 ? 'Berhasil mengambil data' : 'Gagal mengambil data',
      data: results
    };
  }

  /**
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  data?: Trivia[];
   * }>}
   * */
  static async getAllCategories() {
    const response = await api.get('/api/api_category.php');
    return {
      data: response.trivia_categories
    };
  }

  /**
   * @param {Trivia} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }}
   */
  // static async store(data, token) {
  //   return await api.post('/trivia', { body: Trivia.toApiData(data), token });
  // }

  /**
   * @param {number} id
   * @param {Trivia} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }>}
   */
  // static async update(id, data, token) {
  //   return await api.patch(`/trivia/edit/${id}`, { body: Trivia.toApiData(data), token });
  // }

  /**
   * @param {number} id
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   * }>}
   */
  static async delete(id, token) {
    return await api.delete(`/trivia/delete/${id}`, { token });
  }

  /**
   * @param {number[]} ids
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   * }>}
   */
  static async deleteBatch(ids, token) {
    return await api.delete(`/trivia/multi-delete/?id=${ids.join(',')}`, { token });
  }
}
