export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(
          {
            status: 200,
            message: 'Welcome to the Powerful API'
          }
      )
      break
    default:
      res.status(405).json(
          {
            status: 405,
            message: 'Method Not Allowed'
          }
      )
  }
}