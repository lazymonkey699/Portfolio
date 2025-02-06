import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link
            href="https://github.com/lazymonkey699"
            className="text-muted-foreground hover:text-primary"
          >
            <GithubIcon className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="http://www.linkedin.com/in/abhishek-bam-423273257"
            className="text-muted-foreground hover:text-primary"
          >
            <LinkedinIcon className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="mailto:abhishek.bam10@gmail.com"
            className="text-muted-foreground hover:text-primary"
          >
            <MailIcon className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </Link>
          <Link
            href="tel:9862479806"
            className="text-muted-foreground hover:text-primary"
          >
            <PhoneIcon className="h-6 w-6" />
            <span className="sr-only">Phone</span>
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} Abhishek Bam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

