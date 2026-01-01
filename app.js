export default {
  async fetch(request) {
    const url = new URL(request.url);

    // allow only / or /raw
    if (url.pathname !== "/" && url.pathname !== "/raw") {
      return new Response("Not Found", { status: 404 });
    }

    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing url parameter", { status: 400 });
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

    } catch (e) {
      return new Response("Fetch failed", { status: 500 });
    }
  }
};
