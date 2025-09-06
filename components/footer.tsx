import Link from 'next/link'

// Import icons from lucide-react
import {
    Github,
    Twitter,
    Linkedin,
    Mail,
    Globe,
    BookOpen,
} from 'lucide-react'

const links = [
    {
        title: 'How It Works',
        href: '#how-it-works',
    },
    {
        title: 'Benefits',
        href: '#benefits',
    },
    {
        title: 'About',
        href: '#about',
    },
    {
        title: 'Careers',
        href: '#',
    },
    {
        title: 'Contact',
        href: '#',
    },
    {
        title: 'Support',
        href: '#',
    },
]

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-24 border-t border-border">
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto block size-fit mb-8">
                    <div className="text-foreground text-xl font-medium tracking-tight">Bridvia</div>
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-foreground block duration-200 transition-colors">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-muted-foreground hover:text-foreground block transition-colors">
                        <Linkedin className="size-5" />
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        className="text-muted-foreground hover:text-foreground block transition-colors">
                        <Twitter className="size-5" />
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-muted-foreground hover:text-foreground block transition-colors">
                        <Github className="size-5" />
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Email"
                        className="text-muted-foreground hover:text-foreground block transition-colors">
                        <Mail className="size-5" />
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Website"
                        className="text-muted-foreground hover:text-foreground block transition-colors">
                        <Globe className="size-5" />
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Blog"
                        className="text-muted-foreground hover:text-foreground block transition-colors">
                        <BookOpen className="size-5" />
                    </Link>
                </div>
                
                <div className="text-center">
                    <p className="text-muted-foreground text-xs mb-2">
                        Bridging the gap between talent and opportunity. Shaping Africa's future workforce.
                    </p>
                    <span className="text-muted-foreground block text-xs">
                        © {new Date().getFullYear()} Bridvia. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}