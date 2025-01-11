import { type NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}`
    );
    if (!query) {
      return new Response("query paramter is required", {
        status: 500,
      });
    }
    if (!res.ok) {
      throw new Error("Failed to fetch data from TMDb");
    }

    const data = await res.json();

    return Response.json({ status: true, data: data.results });
  } catch (error) {
    console.error("error while searching for movies:", error);
    return new Response("error while searching for movies!", {
      status: 500,
    });
  }
}
