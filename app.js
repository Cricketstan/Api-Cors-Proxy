export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing url parameter", { status: 400 });
    }

    try {
      // OPTIONAL: domain restriction (recommended)
      // if (!target.includes("cricbuzz.com")) {
      //   return new Response("Domain not allowed", { status: 403 });
      // }

      const res = await fetch(target, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "*/*"
        }
      });

      return new Response(res.body, {
        status: res.status,
        headers: {
          "Content-Type": res.headers.get("content-type") || "text/plain",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (e) {
      return new Response("Fetch failed", { status: 500 });
    }
  }
};
