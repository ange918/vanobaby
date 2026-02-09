export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: 'url("/hero-owl.jpg")' }}
      ></div>
      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter">VANOBABY</h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light">Artiste Musical & Créateur</p>
      </div>
    </section>
  );
}
