export const getSessions = async () => {
  const res = await fetch("/api/sessions");
  return res.json();
};