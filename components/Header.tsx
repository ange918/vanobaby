export default function Header() {
  return (
    <header className="fixed w-full z-50 bg-black/50 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">VanoBaby</div>
        <ul className="flex space-x-8 text-white/80">
          <li><a href="#music" className="hover:text-white">Musique</a></li>
          <li><a href="#events" className="hover:text-white">Événements</a></li>
          <li><a href="#bio" className="hover:text-white">Bio</a></li>
        </ul>
      </nav>
    </header>
  );
}
