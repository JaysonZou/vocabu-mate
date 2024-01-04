export const siteConfig = {
  name: "Taxonomy",
  description:
    "An open source application built using the new router, server components and everything new in Next.js 13.",
  url: "https://tx.shadcn.com",
  ogImage: "https://tx.shadcn.com/og.jpg",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/taxonomy",
  },
};

export const dashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Words",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Posts",
      href: "/dashboard/posts",
      icon: "billing",
    },
    {
      title: "Review",
      href: "/dashboard/review",
      icon: "settings",
    },
  ],
};
