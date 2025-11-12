export async function initMocks() {
  if (typeof window === "undefined") {
    // Server-side
    const { server } = await import("./server");
    server.listen();
  } else {
    // Client-side
    const { worker } = await import("./browser");
    await worker.start({
      onUnhandledRequest: "bypass", // Don't warn about unhandled requests
    });
  }
}
