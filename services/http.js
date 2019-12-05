module.exports = async function Http(url, method) {
  const headers = { 'Content-type': 'application/json; charset=UTF-8' }
  const requestOptions = { method, headers }
  const response = await fetch(url, requestOptions)
  const json = await response.json()
  if (response && response.status >= 200 && response.status < 300) {
    return json
  }
  throw Error(response.status)
}
