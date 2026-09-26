export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, job: "weekly-digest", ranAt: new Date().toISOString() }),
  };
}
