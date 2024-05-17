// pages/api/get-ip.js
export default function handler(req, res) {
  let ip = ''

  // Try to extract the IP address from the 'x-forwarded-for' header
  const forwarded = req.headers['x-forwarded-for']
  if (forwarded) {
    const forwardedIps = forwarded.split(',')
    ip = forwardedIps[0] // Assuming the first IP is the client's IP
  } else if (req.socket && req.socket.remoteAddress) {
    // Fallback to the remote address from the socket if no proxy is involved
    ip = req.socket.remoteAddress
  }

  // Handle IPv6 formatting for localhost '::1'
  if (ip === '::1') {
    ip = '127.0.0.1'
  }

  // Send the IP address back to the client
  res.status(200).json({ ip: ip || 'IP address not found' })
}
