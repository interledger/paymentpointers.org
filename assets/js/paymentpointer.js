function resolveUrl(pointer) {
  if(typeof pointer !== 'string') {
    throw new Error('Payment Pointer must be a string')
  }
  if(pointer.charAt(0) !== '$') {
    throw new Error('Payment Pointer must start with "$"')
  }
  const url = new URL('https://' + pointer.slice(1))
  if(url.port) {
    throw new Error('Payment Pointers cannot be defined with a port')
  }
  if(url.username || url.password) {
    throw new Error('Payment Pointers cannot be defined with userinfo')
  }
  if(url.search) {
    throw new Error('Payment Pointers cannot be defined with query parameters')
  }
  if(url.hash) {
    throw new Error('Payment Pointers cannot be defined with a fragment')
  }
  if(url.pathname === '' || url.pathname === '/') {
    url.pathname = '/.well-known/pay'
  }
  return url.href
}

function createPaymentPointer(url) {
  const u = (typeof url === 'string') ? new URL(url) : url
  if(u instanceof URL) {
    if(u.protocol !== 'https:') {
      throw new Error('Payment Pointers can only point to URLs with a protocol of "https"')
    }
    if(u.port) {
      throw new Error('Payment Pointers cannot point to URLs with a custom port')
    }
    if(u.username || u.password) {
      throw new Error('Payment Pointers cannot point to URLs containing `userinfo`')
    }
    if(u.search) {
      throw new Error('Payment Pointers cannot point to URLs with query parameters')
    }
    if(u.hash) {
      throw new Error('Payment Pointers cannot point to URLs with a fragment')
    }
    const path = u.pathname.endsWith('/') ? u.pathname.slice(0,-1) : u.pathname
    if(path === '') {
      throw new Error('Payment Pointers cannot point to URLs with an empty path')
    }
    return '$' + u.hostname + ((path === '/.well-known/pay') ? '' : path)
  }
  throw new Error('url must be a valid URL string or URL object')
}
