import Link from "next/link"

export default ({ children, href, className, target, ...props }) => (
  <Link href={href} target={target}>
    <a {...props} className={"text-blue-dark " + className}>
      {children}
    </a>
  </Link>
)
