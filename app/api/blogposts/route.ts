export async function GET() {
  try {
    const response = await fetch("http://localhost:4000/blogposts", {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogposts");
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching blogposts:", error);
    return Response.json({ error: "Failed to fetch blogposts" }, { status: 500 });
  }
}
