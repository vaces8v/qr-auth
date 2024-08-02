export async function getData() {
  const res = await fetch('http://localhost:3500/api/messages/test')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}