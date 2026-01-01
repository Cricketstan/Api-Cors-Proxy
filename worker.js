export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing url parameter", { status: 400 });
    }

    // 🔒 optional safety
    if (
      target.includes("localhost") ||
      target.includes("127.0.0.1")
    ) {
      return new Response("Blocked", { status: 403 });
    }

    try {
      const res = await fetch(target, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "*/*"
        }
      });

      return new Response(res.body, {
        status: res.status,
        headers: {
          "Content-Type": res.headers.get("content-type") || "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch {
      return new Response("Fetch failed", { status: 500 });
    }
  }
};
