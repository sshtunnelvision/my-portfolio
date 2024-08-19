import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const runtime = "edge";

export async function POST(request: Request) {
  const body = await request.json();
  const { action, threadId, message } = body;

  console.log("Received request:", { action, threadId, message }); // Add this line

  try {
    let response;

    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ thread_id: threadId, message }),
    };

    switch (action) {
      case "create_thread":
        response = await fetch(
          `${API_URL}/api/v1/portfolio-assistant/create_thread`,
          fetchOptions
        );
        if (!response.ok) {
          const errorData = await response.json();
          return NextResponse.json(
            { error: errorData.error || "An error occurred" },
            { status: response.status }
          );
        }
        return NextResponse.json(await response.json());

      case "send_message":
        if (!threadId || !message) {
          return NextResponse.json(
            { error: "Missing threadId or message" },
            { status: 400 }
          );
        }
        console.log("Sending message to backend:", { threadId, message }); // Add this line
        response = await fetch(
          `${API_URL}/api/v1/portfolio-assistant/send_message`,
          fetchOptions
        );
        console.log("Backend response status:", response.status); // Add this line
        if (!response.ok) {
          const errorData = await response.json();
          return NextResponse.json(
            { error: errorData.error || "An error occurred" },
            { status: response.status }
          );
        }

        // Stream the response
        const reader = response.body?.getReader();
        const encoder = new TextEncoder();

        return new Response(
          new ReadableStream({
            async start(controller) {
              while (true) {
                const { done, value } = await reader!.read();
                if (done) break;
                console.log(
                  "Streaming chunk:",
                  new TextDecoder().decode(value)
                ); // Add this line
                controller.enqueue(value);
              }
              controller.close();
            },
          }),
          {
            headers: {
              "Content-Type": "application/x-ndjson",
              "Transfer-Encoding": "chunked",
            },
          }
        );

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error in portfolio assistant API:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
