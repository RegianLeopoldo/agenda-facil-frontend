export async function api(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
}
