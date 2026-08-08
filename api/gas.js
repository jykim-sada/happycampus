export default async function handler(req, res) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbz0s5AYlaMBxJt3m87fx6QQfJp5Fn2SAYlvftAAqI6rVendCFNwG2KDBSo0WZoypgAX/exec";
  try {
    const payload = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});
    const upstream = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: payload,
    });
    const text = await upstream.text();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(200).send(text);
  } catch (e) {
    return res.status(500).json({ success: false, error: String((e && e.message) || e) });
  }
}
