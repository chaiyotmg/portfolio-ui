export async function GET() {
    const resumeUrl: string | undefined = process.env.RESUME_URL;

    if (!resumeUrl) {
        return new Response("Resume URL not configured", { status: 500 });
    }

    try {
        const response = await fetch(resumeUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch resume: ${response.statusText}`);
        }

        const blob = await response.blob();
        const headers = new Headers();
        headers.set("Content-Type", response.headers.get("Content-Type") || "application/pdf");
        headers.set("Content-Disposition", 'attachment; filename="cv_chaiyot_mali-ngam.pdf"');

        return new Response(blob, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error("Proxy Download Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
