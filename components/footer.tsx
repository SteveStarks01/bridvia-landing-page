import Link from 'next/link'
import Image from 'next/image'

// Import icons from lucide-react
import {
    Linkedin,
    Mail,
    Globe,
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
]

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-24 border-t border-border">
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto block size-fit mb-8">
                    {/* Logo Icon and Text Stack */}
                    <div className="flex flex-col items-center">
                        {/* Logo Icon */}
                        <div className="mb-2">
                            <Image 
                                src="/logos/Logo Icon White.png" 
                                alt="Bridvia Icon" 
                                width={40} 
                                height={40}
                                className="object-contain"
                            />
                        </div>
                        {/* Logo Text */}
                        <Image 
                            src="/logos/Logo Text White.png" 
                            alt="Bridvia" 
                            width={120} 
                                height={30}
                            className="object-contain"
                        />
                    </div>
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-[#106861] block duration-200 transition-colors">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    <Link
                        href="https://www.linkedin.com/company/bridvia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-muted-foreground hover:text-[#106861] block transition-colors">
                        <Linkedin className="size-5" />
                    </Link>
                    <Link
                        href="mailto:info@bridvia.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Email"
                        className="text-muted-foreground hover:text-[#106861] block transition-colors">
                        <Mail className="size-5" />
                    </Link>
                    <Link
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Website"
                        className="text-muted-foreground hover:text-[#106861] block transition-colors">
                        <Globe className="size-5" />
                    </Link>
                </div>
                
                <div className="text-center">
                    <p className="text-muted-foreground text-xs mb-2">
                        Building infrastructure that connects talent with opportunity. Bridging the gap between education and industry.
                    </p>
                    <span className="text-muted-foreground block text-xs">
                        © {new Date().getFullYear()} Bridvia. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}