export type ApplicationStatus =
  | "pending"
  | "shortlisted"
  | "rejected"
  | "interviewed";

export interface JobApplication {
  id: string;
  company: string;
  location: string;
  jobTitle: string;
  salaryRange: string;
  status: ApplicationStatus;
  dateApplied: string;
  notes: string;
}

export interface Resume {
  id: string;
  name: string;
  uploadDate: string;
  fileSize: string;
  matchScore: number;
}

export interface DashboardStats {
  totalApplications: number;
  pending: number;
  shortlisted: number;
  rejected: number;
  interviews: number;
}

export const mockApplications: JobApplication[] = [
  {
    id: "1",
    company: "Apple",
    location: "London, UK",
    jobTitle: "Central Paradigm Engineer",
    salaryRange: "$2500-$3200",
    status: "pending",
    dateApplied: "16 Mar 2025",
    notes: "Applied via LinkedIn",
  },
  {
    id: "2",
    company: "Google",
    location: "London, UK",
    jobTitle: "Dynamic Directives Representative",
    salaryRange: "$2500-$3200",
    status: "pending",
    dateApplied: "15 Mar 2025",
    notes: "Referral from John",
  },
  {
    id: "3",
    company: "Amazon",
    location: "London, UK",
    jobTitle: "Future Integration Consultant",
    salaryRange: "$2500-$3200",
    status: "shortlisted",
    dateApplied: "14 Mar 2025",
    notes: "Phone screen scheduled",
  },
  {
    id: "4",
    company: "Shopify",
    location: "London, UK",
    jobTitle: "Chief Interactions Officer",
    salaryRange: "$2500-$3200",
    status: "rejected",
    dateApplied: "12 Mar 2025",
    notes: "Position filled",
  },
  {
    id: "5",
    company: "McDonald's",
    location: "London, UK",
    jobTitle: "Legacy Research Engineer",
    salaryRange: "$2500-$3200",
    status: "pending",
    dateApplied: "10 Mar 2025",
    notes: "Waiting for response",
  },
  {
    id: "6",
    company: "Nike",
    location: "London, UK",
    jobTitle: "Legacy Division Manager",
    salaryRange: "$2500-$3200",
    status: "shortlisted",
    dateApplied: "8 Mar 2025",
    notes: "Technical interview next week",
  },
  {
    id: "7",
    company: "Microsoft",
    location: "London, UK",
    jobTitle: "Dynamic Mobility Consultant",
    salaryRange: "$2500-$3200",
    status: "rejected",
    dateApplied: "5 Mar 2025",
    notes: "Not enough experience",
  },
  {
    id: "8",
    company: "Meta",
    location: "San Francisco, US",
    jobTitle: "Senior Frontend Engineer",
    salaryRange: "$3500-$4500",
    status: "interviewed",
    dateApplied: "1 Mar 2025",
    notes: "Final round completed",
  },
  {
    id: "9",
    company: "Netflix",
    location: "Los Angeles, US",
    jobTitle: "Full Stack Developer",
    salaryRange: "$3000-$4000",
    status: "pending",
    dateApplied: "28 Feb 2025",
    notes: "Applied through careers page",
  },
  {
    id: "10",
    company: "Spotify",
    location: "Stockholm, Sweden",
    jobTitle: "Backend Engineer",
    salaryRange: "$2800-$3600",
    status: "shortlisted",
    dateApplied: "25 Feb 2025",
    notes: "Coding challenge sent",
  },
];

export const mockResumes: Resume[] = [
  {
    id: "1",
    name: "Software_Engineer_Resume.pdf",
    uploadDate: "10 Mar 2025",
    fileSize: "245 KB",
    matchScore: 92,
  },
  {
    id: "2",
    name: "Frontend_Developer_CV.pdf",
    uploadDate: "8 Mar 2025",
    fileSize: "312 KB",
    matchScore: 85,
  },
  {
    id: "3",
    name: "Product_Manager_Resume.pdf",
    uploadDate: "5 Mar 2025",
    fileSize: "198 KB",
    matchScore: 78,
  },
];

export const mockDashboardStats: DashboardStats = {
  totalApplications: 26,
  pending: 12,
  shortlisted: 8,
  rejected: 4,
  interviews: 6,
};

export const mockUser = {
  name: "John Doe",
  email: "johndoe@gmail.com",
  avatar: "/avatars/user.jpg",
};

export interface AIRecommendation {
  id: string;
  company: string;
  companyLogo: string;
  jobTitle: string;
  location: string;
  salaryRange: string;
  matchScore: number;
  skills: string[];
  postedDate: string;
}

export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: "1",
    company: "Stripe",
    companyLogo: "/logos/stripe.svg",
    jobTitle: "Senior Software Engineer",
    location: "San Francisco, US",
    salaryRange: "$180,000-$220,000",
    matchScore: 95,
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    postedDate: "2 days ago",
  },
  {
    id: "2",
    company: "Vercel",
    companyLogo: "/logos/vercel.svg",
    jobTitle: "Full Stack Developer",
    location: "Remote",
    salaryRange: "$150,000-$190,000",
    matchScore: 92,
    skills: ["Next.js", "React", "TypeScript", "Tailwind"],
    postedDate: "3 days ago",
  },
  {
    id: "3",
    company: "Figma",
    companyLogo: "/logos/figma.svg",
    jobTitle: "Frontend Engineer",
    location: "New York, US",
    salaryRange: "$160,000-$200,000",
    matchScore: 88,
    skills: ["React", "Canvas API", "WebGL", "TypeScript"],
    postedDate: "1 week ago",
  },
  {
    id: "4",
    company: "Linear",
    companyLogo: "/logos/linear.svg",
    jobTitle: "Product Engineer",
    location: "Remote",
    salaryRange: "$140,000-$180,000",
    matchScore: 85,
    skills: ["React", "GraphQL", "Node.js", "PostgreSQL"],
    postedDate: "5 days ago",
  },
];
