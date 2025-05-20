import { Trivia } from '@/models';
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
  static async getAll(token) {
    const response = await api.get('/trivia', { token });
    if (!response.data) return response;
    return { ...response, data: Trivia.fromApiData(response.data) };
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
  static async store(data, token) {
    return await api.post('/trivia', { body: Trivia.toApiData(data), token });
  }

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
  static async update(id, data, token) {
    return await api.patch(`/trivia/edit/${id}`, { body: Trivia.toApiData(data), token });
  }

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
