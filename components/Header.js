import Link from "next/link"
import styles from "../styles/Header.module.css"

export default function Header(props) {
    const isInfoPage = typeof window !== "undefined" && window.location.pathname === "/info"

    return (
        <header className={styles.header}>
            <nav
                className={styles.nav}
                role="navigation"
                aria-label="main navigation"
            >
                <Link href="/">
                    <h1>{props.siteTitle}</h1>
                </Link>
                <div>
                    <Link href={isInfoPage ? "/" : "/info"}>
                        <h1>{isInfoPage ? "close" : "info"}</h1>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

