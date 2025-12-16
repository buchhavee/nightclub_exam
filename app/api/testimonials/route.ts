// Route handler til GET request for testimonials

export async function GET() {
  try {
    const response = await fetch("http://localhost:4000/Testimonials");

    if (!response.ok) {
      throw new Error("Failed to fetch testimonials");
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Testimonials API error:", error);
    return Response.json({ error: "Failed to load testimonials" }, { status: 500 });
  }
}
