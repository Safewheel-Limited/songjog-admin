// import from external
import { Inter } from "next/font/google";

// import from internal
import { generateMetadata } from "@/common/lib";
import { ApolloWrapper } from "@/providers";

// import styles
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = generateMetadata({ title: 'Profile' }, { withSuffix: true });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ApolloWrapper>
                    {children}
                </ApolloWrapper>
            </body>
        </html>
    );
}
