const API_URL = import.meta.env.VITE_API_URL

export const sendContactMessage = async (data) => {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error("Failed to send message")

  return res.json()
}
