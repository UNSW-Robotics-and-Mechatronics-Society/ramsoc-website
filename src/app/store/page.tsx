export default function Store() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-24 bg-primary-950"></div>
      <div className="flex w-full flex-1 items-center justify-center">
        <iframe
          src="https://unsw-mtrnsoc-merch.square.site"
          name="storefront"
          style={{
            width: "100%",
            height: "100vh",
            maxWidth: "100vw",
            border: "none",
          }}
          scrolling="no"
        />
      </div>
    </div>
  );
}
