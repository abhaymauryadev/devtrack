export const startSession = async () => {
  const res = await fetch("/api/v1/tracker", {
    method: "POST",
  });
  return res.json();
};

export const stopSession = async (id: string) => {
  const res = await fetch("/api/v1/tracker", {
    method: "PUT",
    body: JSON.stringify({ id }),
  });
  return res.json();
};