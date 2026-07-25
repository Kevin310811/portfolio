import { LucideIcon } from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  url: string;
  accent: 'primary' | 'secondary';
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const projects: Project[] = [
  {
    id: 'lumen',
    title: 'Lumen Finance',
    category: 'Fintech Platform',
    year: '2025',
    description:
      'A real-time wealth dashboard with predictive analytics, glassmorphic data viz, and sub-second portfolio rebalancing for private wealth clients.',
    tags: ['React', 'WebGL', 'D3', 'Design System'],
    url: 'lumen.finance',
    accent: 'primary',
  },
  {
    id: 'atlas',
    title: 'Atlas Studio',
    category: 'Creative Agency',
    year: '2024',
    description:
      'An award-winning agency site with scroll-driven storytelling, a custom 3D scene viewer, and an editorial case-study engine.',
    tags: ['Next.js', 'GSAP', 'Three.js', 'Lenis'],
    url: 'atlas.studio',
    accent: 'secondary',
  },
  {
    id: 'nova',
    title: 'Nova Commerce',
    category: 'Headless E-commerce',
    year: '2024',
    description:
      'A headless storefront with cinematic product reveals, instant search, and a bespoke checkout that lifted conversion by 38%.',
    tags: ['Remix', 'Stripe', 'Sanity', 'Framer Motion'],
    url: 'nova.shop',
    accent: 'primary',
  },
  {
    id: 'echo',
    title: 'Echo OS',
    category: 'Productivity Suite',
    year: '2023',
    description:
      'A spatial workspace OS with floating panes, command palette, and a real-time collaboration layer for distributed design teams.',
    tags: ['TypeScript', 'CRDT', 'WebRTC', 'Tauri'],
    url: 'echo.os',
    accent: 'secondary',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Motion & 3D',
    items: ['GSAP', 'Lenis', 'Three.js', 'WebGL', 'Lottie', 'Spline'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Supabase', 'PostgreSQL', 'Edge Functions', 'tRPC', 'Redis'],
  },
  {
    label: 'Craft',
    items: ['Design Systems', 'Figma', 'Accessibility', 'Performance', 'SEO', 'DX'],
  },
];

export const stats: Stat[] = [
  { id: 'years', value: '8+', label: 'Years crafting' },
  { id: 'projects', value: '120+', label: 'Projects shipped' },
  { id: 'awards', value: '14', label: 'Design awards' },
  { id: 'clients', value: '40+', label: 'Global clients' },
];

export const experience: ExperienceItem[] = [
  {
    id: 'exp1',
    role: 'Principal Creative Developer',
    company: 'Aurora Labs',
    period: '2023 — Present',
    location: 'Remote',
    description:
      'Leading the interactive engineering practice for a studio serving luxury and tech brands.',
    highlights: [
      'Built a reusable WebGL scene framework adopted across 9 product teams',
      'Drove a 40% lift in engagement with scroll-driven editorial experiences',
      'Mentored 6 developers on motion design and performance budgets',
    ],
  },
  {
    id: 'exp2',
    role: 'Senior Frontend Engineer',
    company: 'Meridian Studio',
    period: '2020 — 2023',
    location: 'Berlin',
    description:
      'Owned the design-engineering bridge for award-winning marketing sites and product UIs.',
    highlights: [
      'Shipped 30+ marketing experiences, 4 recognised by Awwwards',
      'Created the studio design system used across all client work',
      'Cut average load time by 55% with edge rendering and asset pipelines',
    ],
  },
  {
    id: 'exp3',
    role: 'Product Designer & Developer',
    company: 'Independent',
    period: '2017 — 2020',
    location: 'Lisbon',
    description:
      'Partnered with early-stage startups to design and build their first product surfaces.',
    highlights: [
      'Took 12 products from zero to launch as a solo design+code practitioner',
      'Established brand systems, UI kits, and front-end foundations',
    ],
  },
];
