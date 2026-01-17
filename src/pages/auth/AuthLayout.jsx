export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      
      {/* LEFT IMAGE */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526045612212-70caf35c14df')",
        }}
      />

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-6">
          {children}
        </div>
      </div>
    </div>
  );
}
