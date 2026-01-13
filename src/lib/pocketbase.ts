/**
 * PocketBase Client
 *
 * Provides a configured PocketBase client instance for use throughout the app.
 */

import PocketBase from 'pocketbase'

const POCKETBASE_URL =
  import.meta.env.POCKETBASE_URL ||
  import.meta.env.SERVICE_URL_POCKETBASE ||
  'http://localhost:8090'

/**
 * Create a new PocketBase client instance
 */
export function createPocketBase(): PocketBase {
  return new PocketBase(POCKETBASE_URL)
}

/**
 * Singleton client for server-side usage
 */
let _pb: PocketBase | null = null

export function getPocketBase(): PocketBase {
  if (!_pb) {
    _pb = createPocketBase()
  }
  return _pb
}
