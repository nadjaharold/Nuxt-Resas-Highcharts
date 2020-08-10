import { cacheAdapterEnhancer } from 'axios-extensions'

export default function ({ $axios }, inject) {
  // axios-extensionsを用いてデータキャッシュを実装。
  $axios.defaults.adapter = cacheAdapterEnhancer($axios.defaults.adapter)
  // Create a custom axios instance
  const api = $axios.create({
    baseURL: process.env.API_URL,
    headers: {
      common: {
        'X-API-KEY': process.env.RESAS_KEY,
      },
    },
  })
  // Inject to context as $api
  inject('api', api)
}
