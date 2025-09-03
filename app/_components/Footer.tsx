// components/Footer.tsx
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-4   text-gray-500 flex justify-center bor items-center gap-2 bo border-gray-300">
      <span className="text-sm opacity-80">Developer :</span>
      <a
        href="https://github.com/empsloc"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-purple-400 transition-colors duration-200"
      >
        <Github size={18} strokeWidth={2} />
        <span className="font-medium">empsloc</span>
      </a>
    </footer>
  );
}
