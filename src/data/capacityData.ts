export type RoleType = "learner" | "manager" | "trainer" | "admin";

export interface JobRole {
  id: string;
  title: string;
  department: string;
  description: string;
  requiredCompetencies: { competencyId: string; requiredLevel: number }[];
}

export interface Competency {
  id: string;
  name: string;
  category: "Cloud & Infrastructure" | "Software Engineering" | "Product & Agile" | "Leadership & Collaboration";
  description: string;
  levels: {
    level: number;
    title: string;
    description: string;
  }[];
}

export interface UserCompetency {
  competencyId: string;
  currentLevel: number;
  lastAssessedAt: string;
  verifiedBy?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: RoleType;
  department: string;
  jobRoleId: string;
  jobTitle: string;
  managerId?: string;
  competencies: UserCompetency[];
  points: number;
  streakDays: number;
  completedCoursesCount: number;
}

export interface ModuleLesson {
  id: string;
  title: string;
  order: number;
  type: "video" | "text" | "pdf" | "quiz";
  duration: string;
  contentUrl?: string;
  textMarkdown?: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  competencyIds: string[];
  competencyGainLevel: number; // e.g. Level 3 on completion
  createdBy: string;
  authorName: string;
  authorRole: string;
  isMandatory: boolean;
  duration: string;
  rating: number;
  enrolledCount: number;
  modules: ModuleLesson[];
  coverImage: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  targetJobRoleId: string;
  targetRoleTitle: string;
  courseIds: string[];
  estimatedHours: number;
  badgeReward: string;
  certificateTitle: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: "in_progress" | "completed" | "nominated" | "overdue";
  progressPercent: number;
  completedModuleIds: string[];
  startedAt: string;
  completedAt?: string;
  dueDate: string;
  score?: number;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  body: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  competencyTags: string[];
  upvotes: number;
  createdAt: string;
  commentsCount: number;
  views: number;
}

export interface ExpertQuestion {
  id: string;
  title: string;
  description: string;
  askerName: string;
  askerAvatar: string;
  competencyId: string;
  competencyName: string;
  status: "open" | "answered";
  answersCount: number;
  topAnswer?: {
    authorName: string;
    authorRole: string;
    text: string;
    answeredAt: string;
  };
  createdAt: string;
}

export interface CertificateItem {
  id: string;
  userId: string;
  recipientName: string;
  pathId: string;
  pathTitle: string;
  verificationCode: string;
  issuedAt: string;
  issuerOrg: string;
  score: number;
}

export interface BadgeItem {
  id: string;
  userId: string;
  badgeType: string;
  title: string;
  description: string;
  iconName: string;
  earnedAt: string;
}

export interface CalendarSession {
  id: string;
  title: string;
  trainerName: string;
  trainerAvatar: string;
  competencyName: string;
  date: string;
  time: string;
  duration: string;
  capacity: number;
  enrolled: number;
  locationOrUrl: string;
  type: "Live Virtual" | "In-Person Workshop";
}

// -------------------------------------------------------------
// SEEDED ENTERPRISE DATA
// -------------------------------------------------------------

export const SEEDED_COMPETENCIES: Competency[] = [
  // Cloud & Infrastructure
  {
    id: "comp-k8s",
    name: "Kubernetes & Container Orchestration",
    category: "Cloud & Infrastructure",
    description: "Production cluster management, Helm charts, ingress controllers, and auto-scaling.",
    levels: [
      { level: 1, title: "Foundations", description: "Runs basic Docker containers and understands Pod concepts." },
      { level: 2, title: "Practitioner", description: "Deploys multi-tier apps using Deployments, Services, and ConfigMaps." },
      { level: 3, title: "Advanced", description: "Configures HPA, Ingress, Persistent Volumes, and RBAC policies." },
      { level: 4, title: "Expert", description: "Custom CRDs, Operators, Service Mesh (Istio), and multi-cluster routing." },
      { level: 5, title: "Principal", description: "Architects enterprise zero-trust container infrastructure and kernel isolation." },
    ],
  },
  {
    id: "comp-cloud-arch",
    name: "Distributed Cloud Architecture",
    category: "Cloud & Infrastructure",
    description: "Multi-region resilience, event-driven messaging, CAP theorem tradeoffs, and caching tiers.",
    levels: [
      { level: 1, title: "Foundations", description: "Understands monolithic vs microservice principles." },
      { level: 2, title: "Practitioner", description: "Designs stateless microservices with REST/gRPC endpoints." },
      { level: 3, title: "Advanced", description: "Builds event-driven Kafka/PubSub streaming architectures." },
      { level: 4, title: "Expert", description: "Multi-region active-active databases and cross-cloud failover." },
      { level: 5, title: "Principal", description: "Enterprise high-throughput low-latency systems (>1M QPS)." },
    ],
  },
  {
    id: "comp-terraform",
    name: "Infrastructure as Code (Terraform)",
    category: "Cloud & Infrastructure",
    description: "Declarative infrastructure provisioning, state locks, reusable modules, and CI/CD pipelines.",
    levels: [
      { level: 1, title: "Foundations", description: "Writes basic single-resource Terraform blocks." },
      { level: 2, title: "Practitioner", description: "Manages remote state in S3/GCS with DynamoDB locking." },
      { level: 3, title: "Advanced", description: "Authors parameterized reusable modules with automated terratests." },
      { level: 4, title: "Expert", description: "Multi-environment workspace orchestration and drift detection." },
      { level: 5, title: "Principal", description: "Enterprise policy-as-code guardrails using OPA / Sentinel." },
    ],
  },
  {
    id: "comp-cloud-sec",
    name: "Cloud Security & Zero-Trust IAM",
    category: "Cloud & Infrastructure",
    description: "Principle of least privilege, secrets management, KMS envelope encryption, and compliance.",
    levels: [
      { level: 1, title: "Foundations", description: "Understands basic IAM roles and password policies." },
      { level: 2, title: "Practitioner", description: "Configures least-privilege IAM policies and service accounts." },
      { level: 3, title: "Advanced", description: "Implements HashiCorp Vault secrets rotation and mTLS communication." },
      { level: 4, title: "Expert", description: "SOC2 / HIPAA / ISO27001 automated compliance pipelines." },
      { level: 5, title: "Principal", description: "Enterprise threat modeling, zero-trust perimeter, and incident response." },
    ],
  },

  // Software Engineering
  {
    id: "comp-react",
    name: "React & Next.js Architecture",
    category: "Software Engineering",
    description: "Server Components, App Router, State management, Streaming SSR, and Web Vitals optimization.",
    levels: [
      { level: 1, title: "Foundations", description: "Builds functional components and handles useState/useEffect." },
      { level: 2, title: "Practitioner", description: "Manages global state, custom hooks, and client-side routing." },
      { level: 3, title: "Advanced", description: "Next.js App Router, Server Actions, and Streaming Suspense." },
      { level: 4, title: "Expert", description: "Micro-frontends, design system architecture, and 99+ Lighthouse scores." },
      { level: 5, title: "Principal", description: "Framework-level performance optimizations, compiler plugins, and AST tooling." },
    ],
  },
  {
    id: "comp-ts",
    name: "TypeScript Advanced Type Systems",
    category: "Software Engineering",
    description: "Generics, conditional types, mapped types, template literal types, and type-safe schemas.",
    levels: [
      { level: 1, title: "Foundations", description: "Uses basic types, interfaces, and function signatures." },
      { level: 2, title: "Practitioner", description: "Applies Generics, Union types, and Type Guards." },
      { level: 3, title: "Advanced", description: "Complex conditional types, infer keyword, and mapped object types." },
      { level: 4, title: "Expert", description: "Builds zero-runtime type validation libraries (Zod-like) and compiler hooks." },
      { level: 5, title: "Principal", description: "Drives organization-wide type standards and monorepo tooling." },
    ],
  },
  {
    id: "comp-api",
    name: "REST & GraphQL API Engineering",
    category: "Software Engineering",
    description: "Contract-first API design, idempotency, rate limiting, N+1 query elimination, and GraphQL federation.",
    levels: [
      { level: 1, title: "Foundations", description: "Builds CRUD endpoints with basic HTTP status codes." },
      { level: 2, title: "Practitioner", description: "Implements JWT auth, pagination, and OpenAPI documentation." },
      { level: 3, title: "Advanced", description: "GraphQL schema stitching, DataLoader batching, and webhook engines." },
      { level: 4, title: "Expert", description: "Apollo Federation, distributed tracing (OpenTelemetry), and gRPC gateways." },
      { level: 5, title: "Principal", description: "Enterprise API gateway topology and multi-tenant SLA governance." },
    ],
  },
  {
    id: "comp-db",
    name: "PostgreSQL & Database Performance",
    category: "Software Engineering",
    description: "B-Tree indexing, EXPLAIN ANALYZE tuning, WAL tuning, sharding, and connection pooling.",
    levels: [
      { level: 1, title: "Foundations", description: "Writes standard SELECT, JOIN, and INSERT queries." },
      { level: 2, title: "Practitioner", description: "Normalizes schemas and uses foreign keys, constraints, and indexes." },
      { level: 3, title: "Advanced", description: "Profiles EXPLAIN query plans, partial indexes, and CTE optimizations." },
      { level: 4, title: "Expert", description: "Table partitioning, logical replication, PgBouncer, and vacuum tuning." },
      { level: 5, title: "Principal", description: "Multi-terabyte high-availability database cluster architecture." },
    ],
  },

  // Product & Agile
  {
    id: "comp-discovery",
    name: "Product Discovery & Roadmapping",
    category: "Product & Agile",
    description: "User interviews, opportunity solution trees, PRD authoring, and value vs effort prioritization.",
    levels: [
      { level: 1, title: "Foundations", description: "Participates in user research note-taking and bug triaging." },
      { level: 2, title: "Practitioner", description: "Drafts user stories and acceptance criteria for sprint backlogs." },
      { level: 3, title: "Advanced", description: "Authors comprehensive PRDs and defines OKR metrics." },
      { level: 4, title: "Expert", description: "Runs quarterly strategic roadmapping and continuous discovery habits." },
      { level: 5, title: "Principal", description: "Sets multi-year organizational product vision and market differentiation." },
    ],
  },
  {
    id: "comp-metrics",
    name: "Data-Driven Product Analytics",
    category: "Product & Agile",
    description: "Funnel drop-off analysis, cohort retention, A/B experimentation, and statistical significance.",
    levels: [
      { level: 1, title: "Foundations", description: "Views Mixpanel / PostHog dashboards and event feeds." },
      { level: 2, title: "Practitioner", description: "Defines event tracking schemas and tracks conversion funnels." },
      { level: 3, title: "Advanced", description: "Designs and calculates statistical sample sizes for A/B tests." },
      { level: 4, title: "Expert", description: "Builds predictive churn models and multi-touch attribution analysis." },
      { level: 5, title: "Principal", description: "Institutes company-wide quantitative decision framework." },
    ],
  },
  {
    id: "comp-agile",
    name: "Agile Sprint & Delivery Execution",
    category: "Product & Agile",
    description: "Scrum & Kanban rituals, WIP limits, burndown velocity, and dependency management.",
    levels: [
      { level: 1, title: "Foundations", description: "Attends daily standups and updates Jira tickets." },
      { level: 2, title: "Practitioner", description: "Estimates story points and executes sprint commitments." },
      { level: 3, title: "Advanced", description: "Facilitates sprint retrospectives and unblocks cross-team blockers." },
      { level: 4, title: "Expert", description: "Transforms legacy workflows to high-velocity continuous delivery." },
      { level: 5, title: "Principal", description: "Coaches engineering leaders on scaled agile delivery frameworks." },
    ],
  },

  // Leadership & Collaboration
  {
    id: "comp-mentorship",
    name: "Technical Mentorship & Coaching",
    category: "Leadership & Collaboration",
    description: "1-on-1 coaching, career ladder progression, code review pedagogy, and pair programming.",
    levels: [
      { level: 1, title: "Foundations", description: "Shares knowledge in team slack channels and docs." },
      { level: 2, title: "Practitioner", description: "Provides constructive feedback in pull request reviews." },
      { level: 3, title: "Advanced", description: "Mentors junior engineers and runs onboarding cohorts." },
      { level: 4, title: "Expert", description: "Builds internal engineering guilds and apprenticeship programs." },
      { level: 5, title: "Principal", description: "Cultivates next-generation technical fellows and engineering directors." },
    ],
  },
  {
    id: "comp-postmortem",
    name: "Incident Response & Blameless Post-Mortems",
    category: "Leadership & Collaboration",
    description: "On-call triage, severity classification, root cause analysis, and systemic action items.",
    levels: [
      { level: 1, title: "Foundations", description: "Knows on-call escalation paging procedures." },
      { level: 2, title: "Practitioner", description: "Triages Sev-2 alerts and mitigates via runbooks." },
      { level: 3, title: "Advanced", description: "Leads live incident command bridge and communicates stakeholder updates." },
      { level: 4, title: "Expert", description: "Facilitates blameless post-mortems and tracks preventative reliability SLOs." },
      { level: 5, title: "Principal", description: "Architects zero-downtime engineering resilience culture." },
    ],
  },
];

export const SEEDED_JOB_ROLES: JobRole[] = [
  {
    id: "role-jr-dev",
    title: "Junior Software Engineer",
    department: "Engineering",
    description: "Contributes clean features, writes unit tests, and participates in code reviews.",
    requiredCompetencies: [
      { competencyId: "comp-react", requiredLevel: 2 },
      { competencyId: "comp-ts", requiredLevel: 2 },
      { competencyId: "comp-api", requiredLevel: 2 },
      { competencyId: "comp-db", requiredLevel: 1 },
      { competencyId: "comp-agile", requiredLevel: 2 },
    ],
  },
  {
    id: "role-fullstack",
    title: "Fullstack Developer (L2)",
    department: "Engineering",
    description: "Builds end-to-end fullstack features, owns database schemas, and maintains CI/CD quality.",
    requiredCompetencies: [
      { competencyId: "comp-react", requiredLevel: 3 },
      { competencyId: "comp-ts", requiredLevel: 3 },
      { competencyId: "comp-api", requiredLevel: 3 },
      { competencyId: "comp-db", requiredLevel: 3 },
      { competencyId: "comp-k8s", requiredLevel: 2 },
      { competencyId: "comp-agile", requiredLevel: 3 },
    ],
  },
  {
    id: "role-sr-cloud-arch",
    title: "Senior Cloud Solutions Architect (L4)",
    department: "Engineering",
    description: "Designs fault-tolerant cloud platforms, container orchestration, and zero-trust security.",
    requiredCompetencies: [
      { competencyId: "comp-k8s", requiredLevel: 4 },
      { competencyId: "comp-cloud-arch", requiredLevel: 4 },
      { competencyId: "comp-terraform", requiredLevel: 4 },
      { competencyId: "comp-cloud-sec", requiredLevel: 4 },
      { competencyId: "comp-postmortem", requiredLevel: 4 },
      { competencyId: "comp-mentorship", requiredLevel: 3 },
    ],
  },
  {
    id: "role-product-mgr",
    title: "Technical Product Manager (L3)",
    department: "Product & Design",
    description: "Leads discovery, data analytics, stakeholder roadmaps, and agile sprint delivery.",
    requiredCompetencies: [
      { competencyId: "comp-discovery", requiredLevel: 4 },
      { competencyId: "comp-metrics", requiredLevel: 4 },
      { competencyId: "comp-agile", requiredLevel: 4 },
      { competencyId: "comp-api", requiredLevel: 2 },
      { competencyId: "comp-mentorship", requiredLevel: 3 },
    ],
  },
  {
    id: "role-devops-lead",
    title: "DevOps & SRE Lead (L4)",
    department: "Operations & Security",
    description: "Governs platform reliability, Terraform IaC, observability SLOs, and on-call response.",
    requiredCompetencies: [
      { competencyId: "comp-k8s", requiredLevel: 4 },
      { competencyId: "comp-terraform", requiredLevel: 4 },
      { competencyId: "comp-cloud-sec", requiredLevel: 4 },
      { competencyId: "comp-postmortem", requiredLevel: 5 },
      { competencyId: "comp-mentorship", requiredLevel: 4 },
    ],
  },
];

// Seeded active learner profile (Alex Rivera)
export const SEEDED_LEARNER_PROFILE: UserProfile = {
  id: "usr-alex-101",
  name: "Alex Rivera",
  email: "alex.rivera@capacityconnect.io",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "learner",
  department: "Engineering",
  jobRoleId: "role-fullstack",
  jobTitle: "Fullstack Developer (L2)",
  managerId: "usr-sarah-201",
  points: 1840,
  streakDays: 14,
  completedCoursesCount: 6,
  competencies: [
    { competencyId: "comp-react", currentLevel: 3, lastAssessedAt: "2026-08-15", verifiedBy: "Marcus Vance" },
    { competencyId: "comp-ts", currentLevel: 3, lastAssessedAt: "2026-08-10", verifiedBy: "Marcus Vance" },
    { competencyId: "comp-api", currentLevel: 3, lastAssessedAt: "2026-07-28", verifiedBy: "Marcus Vance" },
    { competencyId: "comp-db", currentLevel: 2, lastAssessedAt: "2026-06-12" }, // Gap for Senior
    { competencyId: "comp-k8s", currentLevel: 1, lastAssessedAt: "2026-05-19" }, // Gap for Senior Cloud Architect
    { competencyId: "comp-cloud-arch", currentLevel: 1, lastAssessedAt: "2026-04-11" },
    { competencyId: "comp-terraform", currentLevel: 1, lastAssessedAt: "2026-03-01" },
    { competencyId: "comp-cloud-sec", currentLevel: 1, lastAssessedAt: "2026-02-18" },
    { competencyId: "comp-agile", currentLevel: 3, lastAssessedAt: "2026-08-01" },
    { competencyId: "comp-mentorship", currentLevel: 1, lastAssessedAt: "2026-04-01" },
    { competencyId: "comp-postmortem", currentLevel: 1, lastAssessedAt: "2026-05-10" },
  ],
};

export const SEEDED_TEAM_MEMBERS: UserProfile[] = [
  SEEDED_LEARNER_PROFILE,
  {
    id: "usr-priya-102",
    name: "Priya Sharma",
    email: "priya.sharma@capacityconnect.io",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    role: "learner",
    department: "Engineering",
    jobRoleId: "role-fullstack",
    jobTitle: "Fullstack Developer (L2)",
    managerId: "usr-sarah-201",
    points: 2420,
    streakDays: 22,
    completedCoursesCount: 8,
    competencies: [
      { competencyId: "comp-react", currentLevel: 4, lastAssessedAt: "2026-08-20" },
      { competencyId: "comp-ts", currentLevel: 4, lastAssessedAt: "2026-08-18" },
      { competencyId: "comp-api", currentLevel: 3, lastAssessedAt: "2026-07-30" },
      { competencyId: "comp-db", currentLevel: 3, lastAssessedAt: "2026-08-02" },
      { competencyId: "comp-k8s", currentLevel: 2, lastAssessedAt: "2026-06-11" },
      { competencyId: "comp-agile", currentLevel: 4, lastAssessedAt: "2026-08-01" },
    ],
  },
  {
    id: "usr-marcus-103",
    name: "Devon Reed",
    email: "devon.reed@capacityconnect.io",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    role: "learner",
    department: "Engineering",
    jobRoleId: "role-jr-dev",
    jobTitle: "Junior Software Engineer",
    managerId: "usr-sarah-201",
    points: 620,
    streakDays: 3,
    completedCoursesCount: 2,
    competencies: [
      { competencyId: "comp-react", currentLevel: 2, lastAssessedAt: "2026-08-01" },
      { competencyId: "comp-ts", currentLevel: 1, lastAssessedAt: "2026-07-15" },
      { competencyId: "comp-api", currentLevel: 1, lastAssessedAt: "2026-07-20" },
      { competencyId: "comp-db", currentLevel: 1, lastAssessedAt: "2026-07-05" },
      { competencyId: "comp-agile", currentLevel: 2, lastAssessedAt: "2026-08-10" },
    ],
  },
  {
    id: "usr-ananya-104",
    name: "Ananya Iyer",
    email: "ananya.iyer@capacityconnect.io",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    role: "learner",
    department: "Engineering",
    jobRoleId: "role-sr-cloud-arch",
    jobTitle: "Senior Cloud Solutions Architect (L4)",
    managerId: "usr-sarah-201",
    points: 3890,
    streakDays: 45,
    completedCoursesCount: 14,
    competencies: [
      { competencyId: "comp-k8s", currentLevel: 4, lastAssessedAt: "2026-08-22" },
      { competencyId: "comp-cloud-arch", currentLevel: 5, lastAssessedAt: "2026-08-20" },
      { competencyId: "comp-terraform", currentLevel: 4, lastAssessedAt: "2026-08-15" },
      { competencyId: "comp-cloud-sec", currentLevel: 4, lastAssessedAt: "2026-07-30" },
      { competencyId: "comp-postmortem", currentLevel: 4, lastAssessedAt: "2026-08-05" },
      { competencyId: "comp-mentorship", currentLevel: 4, lastAssessedAt: "2026-08-10" },
    ],
  },
];

export const SEEDED_COURSES: Course[] = [
  {
    id: "crs-k8s-prod",
    title: "Production Kubernetes & Service Mesh Masterclass",
    description: "Master multi-cluster deployment, Istio service mesh, zero-downtime rolling upgrades, and HPA autoscaling policies.",
    category: "Cloud & Infrastructure",
    competencyIds: ["comp-k8s", "comp-cloud-arch"],
    competencyGainLevel: 3,
    createdBy: "usr-marcus-trainer",
    authorName: "Marcus Vance",
    authorRole: "Principal Infrastructure Lead",
    isMandatory: true,
    duration: "4.5 Hours",
    rating: 4.9,
    enrolledCount: 68,
    coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80",
    modules: [
      {
        id: "mod-1",
        title: "1. Core Pod Invariants & Control Plane Architecture",
        order: 1,
        type: "text",
        duration: "25 min",
        textMarkdown: `### Kubernetes Control Plane Mechanics\n\nThe Kubernetes control plane manages cluster state via **etcd**, **kube-apiserver**, **kube-scheduler**, and **kube-controller-manager**.\n\n#### Key Architectural Invariants:\n1. **Declarative Reconciliation**: The controller continuously reconciles \`observed state\` with \`desired state\`.\n2. **Kubelet Heartbeats**: Worker nodes send periodic leases to signal node health.\n3. **Pod Disruption Budgets (PDB)**: Ensure minimum quorum during cluster draining or rolling node upgrades.`,
      },
      {
        id: "mod-2",
        title: "2. Hands-on Lab: Ingress Controllers & Cert-Manager mTLS",
        order: 2,
        type: "video",
        duration: "45 min",
        textMarkdown: `### Ingress & mTLS Configuration\n\nIn this module, we configure an NGINX Ingress Controller with automated Let's Encrypt certificates generated via cert-manager. Follow the steps below in your cluster CLI:\n\n\`\`\`bash\nhelm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx\nhelm install ingress-nginx ingress-nginx/ingress-nginx\n\`\`\``,
      },
      {
        id: "mod-3",
        title: "3. Knowledge Verification Assessment",
        order: 3,
        type: "quiz",
        duration: "15 min",
        quiz: [
          {
            question: "Which component is responsible for assigning unassigned pods to specific nodes based on resource constraints and affinity rules?",
            options: ["kube-apiserver", "kube-scheduler", "kube-controller-manager", "kubelet"],
            correctIndex: 1,
            explanation: "kube-scheduler filters and scores available nodes to place pending pods.",
          },
          {
            question: "What happens if a node fails and the node-lifecycle-controller detects missing heartbeats after the grace period?",
            options: [
              "Pods remain on the node indefinitely.",
              "Pods are automatically deleted and rescheduled to healthy nodes by replica controllers.",
              "The entire cluster shuts down for maintenance.",
              "etcd resets to previous snapshot.",
            ],
            correctIndex: 1,
            explanation: "Controller evicts pods on the unhealthy node and provisions replacements on healthy nodes.",
          },
          {
            question: "In Kubernetes Horizontal Pod Autoscaler (HPA), what algorithm computes the desired replica count?",
            options: [
              "DesiredReplicas = ceil[CurrentReplicas * (CurrentMetricValue / TargetMetricValue)]",
              "DesiredReplicas = CurrentReplicas + 2",
              "DesiredReplicas = TotalMemory / PodMemory",
              "DesiredReplicas = NodeCount * 10",
            ],
            correctIndex: 0,
            explanation: "Standard HPA formula scales proportionally based on metric ratio.",
          },
        ],
      },
    ],
  },
  {
    id: "crs-dist-db",
    title: "High-Throughput PostgreSQL & Query Optimization",
    description: "Deep dive into B-Tree index internals, WAL logging, EXPLAIN ANALYZE execution trees, and partition pruning.",
    category: "Software Engineering",
    competencyIds: ["comp-db", "comp-api"],
    competencyGainLevel: 3,
    createdBy: "usr-marcus-trainer",
    authorName: "Elena Rostova",
    authorRole: "Staff Database Architect",
    isMandatory: false,
    duration: "3.5 Hours",
    rating: 4.85,
    enrolledCount: 54,
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80",
    modules: [
      {
        id: "mod-db-1",
        title: "1. Understanding EXPLAIN ANALYZE Execution Plans",
        order: 1,
        type: "text",
        duration: "30 min",
        textMarkdown: `### Reading PostgreSQL Query Plans\n\nWhen optimizing SQL queries, **EXPLAIN (ANALYZE, BUFFERS)** provides actual execution runtime and buffer hits.\n\n\`\`\`sql\nEXPLAIN (ANALYZE, BUFFERS)\nSELECT * FROM orders WHERE customer_id = 84920 AND status = 'COMPLETED';\n\`\`\`\n\nLook out for **Seq Scan** on large tables without index coverage!`,
      },
      {
        id: "mod-db-2",
        title: "2. Assessment: Index Design & Locking Invariants",
        order: 2,
        type: "quiz",
        duration: "15 min",
        quiz: [
          {
            question: "What is the primary advantage of a Partial Index in PostgreSQL?",
            options: [
              "It indexes only rows satisfying a WHERE condition, saving space and write overhead.",
              "It stores values partially encrypted.",
              "It works only on VARCHAR columns.",
              "It replaces foreign key constraints.",
            ],
            correctIndex: 0,
            explanation: "Partial indexes reduce index size and maintenance cost by indexing only relevant subsets.",
          },
          {
            question: "Which lock level is acquired by a standard SELECT query in PostgreSQL?",
            options: ["AccessExclusiveLock", "AccessShareLock", "RowExclusiveLock", "No lock is acquired"],
            correctIndex: 1,
            explanation: "SELECT acquires AccessShareLock, which conflicts only with AccessExclusiveLock (e.g. DROP/ALTER).",
          },
        ],
      },
    ],
  },
  {
    id: "crs-nextjs-arch",
    title: "Next.js 14 Enterprise Architecture & Design Systems",
    description: "Architecting scalable enterprise frontends with App Router, Streaming SSR, Zod validation, and micro-frontend patterns.",
    category: "Software Engineering",
    competencyIds: ["comp-react", "comp-ts"],
    competencyGainLevel: 3,
    createdBy: "usr-marcus-trainer",
    authorName: "Marcus Vance",
    authorRole: "Principal Frontend Architect",
    isMandatory: false,
    duration: "5.0 Hours",
    rating: 4.95,
    enrolledCount: 92,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    modules: [
      {
        id: "mod-next-1",
        title: "1. Server Components vs Client Boundary Architecture",
        order: 1,
        type: "text",
        duration: "30 min",
        textMarkdown: `### React Server Components (RSC) Paradigm\n\nRSCs execute strictly on the server and render into a streaming JSON wire format with zero client-side JavaScript bundle overhead.`,
      },
    ],
  },
  {
    id: "crs-incident-resp",
    title: "Blameless Post-Mortems & SRE Incident Command",
    description: "Leading high-pressure incident bridges, Sev-1 root cause analysis, SLO error budget management, and reliability culture.",
    category: "Leadership & Collaboration",
    competencyIds: ["comp-postmortem", "comp-mentorship"],
    competencyGainLevel: 4,
    createdBy: "usr-elena-admin",
    authorName: "Sarah Chen",
    authorRole: "Director of Engineering",
    isMandatory: true,
    duration: "2.5 Hours",
    rating: 4.9,
    enrolledCount: 41,
    coverImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80",
    modules: [
      {
        id: "mod-inc-1",
        title: "1. The Anatomy of a Blameless Post-Mortem",
        order: 1,
        type: "text",
        duration: "20 min",
        textMarkdown: `### Human Error is a Symptom, Not the Cause\n\nA blameless post-mortem assumes that engineers act in good faith with the information available. Focus on **systemic guardrails**, not individual reprimand.`,
      },
    ],
  },
];

export const SEEDED_LEARNING_PATHS: LearningPath[] = [
  {
    id: "path-cloud-lead",
    title: "Enterprise Cloud Architect Fast-Track",
    description: "Complete career pathway bridging Fullstack development into Senior Cloud Solutions Architecture.",
    targetJobRoleId: "role-sr-cloud-arch",
    targetRoleTitle: "Senior Cloud Solutions Architect (L4)",
    courseIds: ["crs-k8s-prod", "crs-dist-db", "crs-incident-resp"],
    estimatedHours: 12,
    badgeReward: "Cloud Titan Certification",
    certificateTitle: "Certified Senior Cloud Solutions Architect",
  },
  {
    id: "path-fullstack-mastery",
    title: "Fullstack Engineering Excellence",
    description: "Core curriculum for modern Next.js, PostgreSQL optimization, and resilient API contracts.",
    targetJobRoleId: "role-fullstack",
    targetRoleTitle: "Fullstack Developer (L2)",
    courseIds: ["crs-nextjs-arch", "crs-dist-db"],
    estimatedHours: 8,
    badgeReward: "Fullstack Specialist",
    certificateTitle: "Professional Fullstack Engineering Certified",
  },
];

export const SEEDED_ENROLLMENTS: Enrollment[] = [
  {
    id: "enr-1",
    userId: "usr-alex-101",
    courseId: "crs-k8s-prod",
    status: "in_progress",
    progressPercent: 66,
    completedModuleIds: ["mod-1", "mod-2"],
    startedAt: "2026-08-20",
    dueDate: "Sep 05, 2026",
  },
  {
    id: "enr-2",
    userId: "usr-alex-101",
    courseId: "crs-dist-db",
    status: "in_progress",
    progressPercent: 50,
    completedModuleIds: ["mod-db-1"],
    startedAt: "2026-08-22",
    dueDate: "Sep 12, 2026",
  },
  {
    id: "enr-3",
    userId: "usr-alex-101",
    courseId: "crs-nextjs-arch",
    status: "completed",
    progressPercent: 100,
    completedModuleIds: ["mod-next-1"],
    startedAt: "2026-08-01",
    completedAt: "2026-08-15",
    dueDate: "Aug 15, 2026",
    score: 95,
  },
  {
    id: "enr-4",
    userId: "usr-marcus-103", // Devon Reed (overdue / at-risk for manager view)
    courseId: "crs-nextjs-arch",
    status: "overdue",
    progressPercent: 20,
    completedModuleIds: [],
    startedAt: "2026-07-20",
    dueDate: "Aug 10, 2026",
  },
  {
    id: "enr-5",
    userId: "usr-priya-102",
    courseId: "crs-k8s-prod",
    status: "completed",
    progressPercent: 100,
    completedModuleIds: ["mod-1", "mod-2", "mod-3"],
    startedAt: "2026-08-10",
    completedAt: "2026-08-25",
    dueDate: "Aug 30, 2026",
    score: 98,
  },
];

export const SEEDED_KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "art-1",
    title: "How We Scaled Our Next.js App Router Monorepo to 40+ Packages",
    body: `### Key Lessons from Monorepo Architecture\n\n1. **Turborepo Caching**: Remote caching cut our CI build time from 18 minutes to 90 seconds.\n2. **Shared UI Package**: All atomic components live in \`@capacity/ui\` with strict TypeScript path aliases.\n3. **Strict ESLint Boundaries**: Disallowed cross-package circular imports using ESLint import bounds.`,
    authorId: "usr-alex-101",
    authorName: "Alex Rivera",
    authorRole: "Fullstack Developer",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    competencyTags: ["React & Next.js Architecture", "TypeScript Advanced Type Systems"],
    upvotes: 38,
    createdAt: "3 days ago",
    commentsCount: 9,
    views: 312,
  },
  {
    id: "art-2",
    title: "Debugging Kubernetes OOMKilled Errors: Buffer Allocation vs Limits",
    body: `### Why Pods Get OOMKilled Even with Free Memory\n\nWhen setting \`resources.limits.memory\`, the Linux kernel cgroup terminates the process when anonymous memory pages exceed the threshold. Always configure **JVM / Node max-old-space-size** to 75% of container limit to leave headroom for thread stacks!`,
    authorId: "usr-ananya-104",
    authorName: "Ananya Iyer",
    authorRole: "Senior Cloud Architect",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    competencyTags: ["Kubernetes & Container Orchestration", "Cloud Security & Zero-Trust IAM"],
    upvotes: 64,
    createdAt: "1 week ago",
    commentsCount: 14,
    views: 580,
  },
  {
    id: "art-3",
    title: "Zero-Downtime PostgreSQL Schema Migrations with Foreign Key Locks",
    body: `### Safe Schema Changes in High-Traffic Systems\n\nNever add a column with a DEFAULT value without NULL constraint on pre-v11 versions. Use **CREATE INDEX CONCURRENTLY** to avoid exclusive table locks!`,
    authorId: "usr-elena-admin",
    authorName: "Dr. Elena Rostova",
    authorRole: "Staff Database Architect",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    competencyTags: ["PostgreSQL & Database Performance", "REST & GraphQL API Engineering"],
    upvotes: 52,
    createdAt: "5 days ago",
    commentsCount: 8,
    views: 420,
  },
];

export const SEEDED_EXPERT_QUESTIONS: ExpertQuestion[] = [
  {
    id: "q-exp-1",
    title: "How to configure Istio mTLS STRICT mode without dropping ingress health probes?",
    description: "We are enabling mutual TLS across all microservice namespaces, but Kubernetes liveness probes from kubelet fail because kubelet doesn't speak mTLS. What is the standard bypass convention?",
    askerName: "Alex Rivera",
    askerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    competencyId: "comp-k8s",
    competencyName: "Kubernetes & Container Orchestration",
    status: "answered",
    answersCount: 2,
    topAnswer: {
      authorName: "Ananya Iyer",
      authorRole: "Senior Cloud Architect (Level 5 Expert)",
      text: "Enable Istio probe rewrite in your sidecar injection spec: `sidecar.istio.io/rewriteAppHTTPProbers: 'true'`. Istio sidecar proxies will intercept and translate the plain kubelet probe into internal mTLS!",
      answeredAt: "2 days ago",
    },
    createdAt: "3 days ago",
  },
  {
    id: "q-exp-2",
    title: "Optimizing PostgreSQL CTE queries in Version 14 vs Version 12?",
    description: "In PG12+, WITH queries are inlined by default unless MATERIALIZED is specified. When is forced materialization still beneficial?",
    askerName: "Devon Reed",
    askerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    competencyId: "comp-db",
    competencyName: "PostgreSQL & Database Performance",
    status: "open",
    answersCount: 0,
    createdAt: "Yesterday",
  },
];

export const SEEDED_CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-1",
    userId: "usr-alex-101",
    recipientName: "Alex Rivera",
    pathId: "path-fullstack-mastery",
    pathTitle: "Fullstack Engineering Excellence",
    verificationCode: "CERT-CC-84920",
    issuedAt: "August 15, 2026",
    issuerOrg: "Capacity Connect Enterprise Academy",
    score: 95,
  },
  {
    id: "cert-2",
    userId: "usr-priya-102",
    recipientName: "Priya Sharma",
    pathId: "path-cloud-lead",
    pathTitle: "Enterprise Cloud Architect Fast-Track",
    verificationCode: "CERT-CC-91823",
    issuedAt: "August 25, 2026",
    issuerOrg: "Capacity Connect Enterprise Academy",
    score: 98,
  },
];

export const SEEDED_BADGES: BadgeItem[] = [
  {
    id: "b-1",
    userId: "usr-alex-101",
    badgeType: "streak_14",
    title: "14-Day Continuous Learner",
    description: "Maintained daily micro-learning streak for 2 consecutive weeks.",
    iconName: "Flame",
    earnedAt: "Aug 28, 2026",
  },
  {
    id: "b-2",
    userId: "usr-alex-101",
    badgeType: "top_contributor",
    title: "Knowledge Base Champion",
    description: "Authored technical articles with >30 peer upvotes.",
    iconName: "Award",
    earnedAt: "Aug 26, 2026",
  },
  {
    id: "b-3",
    userId: "usr-alex-101",
    badgeType: "assessment_ace",
    title: "95%+ Assessment Mastery",
    description: "Scored above 95% on primary competency certification assessments.",
    iconName: "Zap",
    earnedAt: "Aug 15, 2026",
  },
];

export const SEEDED_SESSIONS: CalendarSession[] = [
  {
    id: "sess-1",
    title: "Live Hands-on Lab: Zero-Trust IAM & Vault Secrets",
    trainerName: "Marcus Vance",
    trainerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    competencyName: "Cloud Security & Zero-Trust IAM",
    date: "Sep 02, 2026",
    time: "02:00 PM - 03:30 PM EST",
    duration: "90 min",
    capacity: 25,
    enrolled: 19,
    locationOrUrl: "Virtual Lab Pod 3 (Zoom + Cloud Terminal)",
    type: "Live Virtual",
  },
  {
    id: "sess-2",
    title: "Executive Workshop: High-Velocity Agile & Continuous Discovery",
    trainerName: "Sarah Chen",
    trainerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    competencyName: "Product Discovery & Roadmapping",
    date: "Sep 08, 2026",
    time: "10:00 AM - 12:00 PM EST",
    duration: "2 Hours",
    capacity: 30,
    enrolled: 28,
    locationOrUrl: "Executive Training Center B / Hybrid",
    type: "In-Person Workshop",
  },
];

export const SEEDED_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Skill Gap Alert: 2 Gaps for Senior Cloud Architect",
    description: "Complete 'Production Kubernetes' to level up Kubernetes from Level 1 to Level 3.",
    category: "competency",
    timestamp: "10 min ago",
    read: false,
    priority: "high",
    actionUrl: "/learner",
  },
  {
    id: "notif-2",
    title: "Manager Nudge from Sarah Chen",
    description: "Sarah nudged your progress on 'PostgreSQL Query Optimization' (due in 5 days).",
    category: "nudge",
    timestamp: "1 hour ago",
    read: false,
    priority: "high",
    actionUrl: "/learner",
  },
  {
    id: "notif-3",
    title: "New Knowledge Base Reply",
    description: "Ananya Iyer answered your question on Istio mTLS ingress health probes.",
    category: "knowledge",
    timestamp: "3 hours ago",
    read: true,
    priority: "medium",
    actionUrl: "/learner",
  },
];
