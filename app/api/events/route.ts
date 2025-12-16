export async function GET() {
  try {
    const response = await fetch("http://localhost:4000/events");

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Events API error:", error);
    return Response.json({ error: "Failed to load events" }, { status: 500 });
  }
}
