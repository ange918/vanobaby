export default function SectionMusic() {
  return (
    <section id="music" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12">Musique</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Dernier Album</h3>
            <p className="text-gray-600 italic">Coming soon on Spotify</p>
          </div>
        </div>
      </div>
    </section>
  );
}
