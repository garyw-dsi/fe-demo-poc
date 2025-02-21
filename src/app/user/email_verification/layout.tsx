import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Symbolix | User Verification",
}

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}