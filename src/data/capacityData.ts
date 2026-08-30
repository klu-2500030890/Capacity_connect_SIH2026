export type RoleType = "learner" | "manager" | "trainer" | "admin";

export interface JobRole {
  id: string;
  title: string;
  department: string;
  companyBenchmark: string;
  description: string;
  requiredCompetencies: { competencyId: string; requiredLevel: number }[];
}

export interface Competency {
  id: string;
  name: string;
  category: "Cloud & Infrastructure" | "Software Engineering" | "Product & Agile" | "Leadership & Collaboration" | "AI & Machine Learning" | "Enterprise Storage & Security";
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
  scorePercent?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  password?: string;
  avatar: string;
  role: RoleType;
  department: string;
  jobRoleId: string;
  jobTitle: string;
  organization: string;
  employeeId: string;
  managerId?: string;
  competencies: UserCompetency[];
  points: number;
  streakDays: number;
  completedCoursesCount: number;
  isNewUser?: boolean;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topicTag: string;
}

export interface PracticalAssignment {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  language: string;
  expectedOutput: string;
  testCases: {
    name: string;
    input: string;
    expected: string;
  }[];
}

export interface ModuleLesson {
  id: string;
  title: string;
  order: number;
  type: "video" | "text" | "pdf" | "quiz" | "lab";
  duration: string;
  contentUrl?: string;
  textMarkdown?: string;
  quiz?: AssessmentQuestion[];
  assignment?: PracticalAssignment;
}

export interface Course {
  id: string;
  title: string;
  provider: "Google Cloud" | "Microsoft Azure" | "Meta" | "AWS" | "Dell Technologies" | "NVIDIA DLI" | "Netflix Tech" | "HashiCorp";
  description: string;
  category: string;
  competencyIds: string[];
  competencyGainLevel: number;
  createdBy: string;
  authorName: string;
  authorRole: string;
  isMandatory: boolean;
  duration: string;
  rating: number;
  enrolledCount: number;
  modules: ModuleLesson[];
  coverImage: string;
  badgeEarned?: string;
  syllabusWeeks?: {
    weekNumber: number;
    weekTitle: string;
    topics: string[];
  }[];
}

export interface LearningPath {
  id: string;
  title: string;
  provider: string;
  durationDays: number;
  description: string;
  targetJobRoleId: string;
  targetRoleTitle: string;
  courseIds: string[];
  estimatedHours: number;
  badgeReward: string;
  certificateTitle: string;
  milestones: {
    dayRange: string;
    title: string;
    description: string;
    skillsUnlocked: string[];
  }[];
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
  score?: number;
  assignmentSubmission?: string;
  assignmentScore?: number;
  assignmentPassed?: boolean;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  authorDepartment: string;
  createdAt: string;
  readTime: string;
  upvotes: number;
  upvotedBy: string[];
  tags: string[];
  competencyId: string;
  body: string;
  commentsCount: number;
  verifiedExpertiseLevel: number;
}

export interface ExpertQuestion {
  id: string;
  title: string;
  description: string;
  askerId: string;
  askerName: string;
  askerAvatar: string;
  competencyId: string;
  competencyName: string;
  assignedExpertId: string;
  assignedExpertName: string;
  status: "open" | "answered" | "escalated";
  createdAt: string;
  answers: {
    id: string;
    responderId: string;
    responderName: string;
    responderAvatar: string;
    responderLevel: number;
    text: string;
    createdAt: string;
    upvotes: number;
  }[];
}

export interface CertificateItem {
  id: string;
  userId: string;
  recipientName: string;
  courseOrPathId: string;
  pathTitle: string;
  issuerOrg: string;
  issuedAt: string;
  verificationCode: string;
  score: number;
  masteredCompetencies: string[];
  credentialLedgerHash: string;
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: "competency" | "streak" | "assessment" | "contribution";
  earnedAt?: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
}

export interface CalendarSession {
  id: string;
  title: string;
  trainerName: string;
  trainerAvatar: string;
  trainerTitle: string;
  date: string;
  time: string;
  capacity: number;
  enrolled: number;
  enrolledUserIds: string[];
  type: "Virtual Workshop" | "Live Q&A" | "Hands-On Cloud Lab" | "Architecture Review";
  locationOrUrl: string;
  competencyId: string;
}

// -------------------------------------------------------------
// 1. ENTERPRISE COMPETENCIES (16 Skills across 6 Domains)
// -------------------------------------------------------------
export const SEEDED_COMPETENCIES: Competency[] = [
  {
    id: "comp-k8s",
    name: "Production Kubernetes & Container Orchestration",
    category: "Cloud & Infrastructure",
    description: "Designing, deploying, and auto-scaling resilient microservices on managed Kubernetes (GKE, EKS, AKS) with zero-downtime rolling updates.",
    levels: [
      { level: 1, title: "Novice", description: "Basic understanding of Pods, Deployments, and kubectl commands." },
      { level: 2, title: "Practitioner", description: "Configures Services, Ingress, ConfigMaps, and Secrets in staging clusters." },
      { level: 3, title: "Advanced", description: "Implements Horizontal Pod Autoscaling (HPA), NetworkPolicies, and Helm chart releases." },
      { level: 4, title: "Expert", description: "Architects multi-region service mesh (Istio), custom operators, and disaster recovery." },
      { level: 5, title: "Principal / Fellow", description: "Directs enterprise container strategy and multi-cloud orchestration governance." },
    ],
  },
  {
    id: "comp-cloud-arch",
    name: "Distributed Cloud Architecture & High Availability",
    category: "Cloud & Infrastructure",
    description: "Multi-region active-active architectures, event-driven streaming, global load balancing, and fault isolation domains.",
    levels: [
      { level: 1, title: "Novice", description: "Understands monolithic vs microservice fundamentals and cloud compute types." },
      { level: 2, title: "Practitioner", description: "Designs stateless microservices backed by managed cloud databases." },
      { level: 3, title: "Advanced", description: "Deploys asynchronous event architectures using Kafka, Pub/Sub, and AWS SQS." },
      { level: 4, title: "Expert", description: "Architects 99.999% SLA active-active multi-region systems with consensus protocols." },
      { level: 5, title: "Principal / Fellow", description: "Designs company-wide distributed infrastructure and resiliency invariants." },
    ],
  },
  {
    id: "comp-azure-infra",
    name: "Microsoft Azure Enterprise Solutions & Entra ID",
    category: "Cloud & Infrastructure",
    description: "Azure Resource Manager (ARM), Bicep IaC, Azure Kubernetes Service (AKS), Entra ID conditional access, and Cosmos DB.",
    levels: [
      { level: 1, title: "Novice", description: "Deploys Azure App Services and manages Resource Groups." },
      { level: 2, title: "Practitioner", description: "Configures Azure VNet Peering, Private Endpoints, and Entra ID RBAC." },
      { level: 3, title: "Advanced", description: "Authors Bicep IaC templates and deploys mission-critical AKS clusters." },
      { level: 4, title: "Expert", description: "Architects global multi-region Cosmos DB failovers and Azure Front Door routing." },
      { level: 5, title: "Principal / Fellow", description: "Governs enterprise cloud adoption framework (CAF) across Azure subscriptions." },
    ],
  },
  {
    id: "comp-dell-storage",
    name: "Enterprise SAN/NAS Storage & Cyber Recovery",
    category: "Enterprise Storage & Security",
    description: "Dell PowerStore storage arrays, VxRail hyperconverged infrastructure, NVMe-oF, disaster recovery snapshots, and immutable cyber vaults.",
    levels: [
      { level: 1, title: "Novice", description: "Understands block, file, and object storage fundamentals and RAID levels." },
      { level: 2, title: "Practitioner", description: "Configures iSCSI/FC LUNs, NFS/SMB exports, and storage provisioning." },
      { level: 3, title: "Advanced", description: "Implements synchronous storage replication and VxRail HCI cluster expansion." },
      { level: 4, title: "Expert", description: "Architects isolated air-gapped Cyber Recovery Vaults with automated ransomware scanning." },
      { level: 5, title: "Principal / Fellow", description: "Directs enterprise hybrid-cloud storage tiering and data protection strategy." },
    ],
  },
  {
    id: "comp-terraform",
    name: "Terraform & Infrastructure-as-Code (IaC)",
    category: "Cloud & Infrastructure",
    description: "Declarative infrastructure provisioning, modular state management, automated CI/CD policy-as-code guardrails.",
    levels: [
      { level: 1, title: "Novice", description: "Writes basic resource blocks and executes terraform plan/apply." },
      { level: 2, title: "Practitioner", description: "Builds reusable child modules with remote state in encrypted cloud storage." },
      { level: 3, title: "Advanced", description: "Integrates Terraform in automated CI/CD pipelines with automated drift detection." },
      { level: 4, title: "Expert", description: "Enforces enterprise policy-as-code (OPA/Sentinel) and automated compliance." },
      { level: 5, title: "Principal / Fellow", description: "Standardizes enterprise-wide infrastructure automation frameworks." },
    ],
  },
  {
    id: "comp-sec",
    name: "Zero Trust Security & Cloud Cryptography",
    category: "Cloud & Infrastructure",
    description: "IAM least-privilege policies, mTLS encryption in transit, envelope encryption at rest, and secret rotation.",
    levels: [
      { level: 1, title: "Novice", description: "Understands public/private keys and basic role-based access control (RBAC)." },
      { level: 2, title: "Practitioner", description: "Implements OAuth2/OIDC token flows and manages AWS IAM / GCP IAM roles." },
      { level: 3, title: "Advanced", description: "Configures HashiCorp Vault, automated certificate rotation, and KMS envelope encryption." },
      { level: 4, title: "Expert", description: "Architects Zero Trust network topologies, threat modeling, and SOC2 audit controls." },
      { level: 5, title: "Principal / Fellow", description: "Authors organizational cybersecurity charter and defensive perimeter." },
    ],
  },
  {
    id: "comp-react",
    name: "React, Next.js & Server Components Architecture",
    category: "Software Engineering",
    description: "Modern SSR/SSG rendering patterns, React Server Components (RSC), hydration optimization, and streaming UI.",
    levels: [
      { level: 1, title: "Novice", description: "Builds standard interactive client components using React hooks." },
      { level: 2, title: "Practitioner", description: "Implements Next.js App Router, nested layouts, and Server Actions." },
      { level: 3, title: "Advanced", description: "Optimizes Core Web Vitals, partial pre-rendering, and global caching layers." },
      { level: 4, title: "Expert", description: "Architects enterprise micro-frontends, design systems, and state machines." },
      { level: 5, title: "Principal / Fellow", description: "Sets global frontend engineering standards and web performance metrics." },
    ],
  },
  {
    id: "comp-ts",
    name: "TypeScript Advanced Type Systems & Metaprogramming",
    category: "Software Engineering",
    description: "Type-level programming, conditional types, template literal types, runtime schema validation (Zod), and AST transforms.",
    levels: [
      { level: 1, title: "Novice", description: "Uses basic primitive types, interfaces, and function signatures." },
      { level: 2, title: "Practitioner", description: "Applies generics, union types, and utility types (Pick, Omit, Partial)." },
      { level: 3, title: "Advanced", description: "Constructs conditional types, template literal types, and type guards." },
      { level: 4, title: "Expert", description: "Builds type-safe SDK libraries with end-to-end inference across client/server." },
      { level: 5, title: "Principal / Fellow", description: "Defines enterprise TypeScript conventions and architectural patterns." },
    ],
  },
  {
    id: "comp-api",
    name: "High-Throughput REST & GraphQL API Design",
    category: "Software Engineering",
    description: "Contract-first API design, idempotency keys, rate limiting, token buckets, and GraphQL federation.",
    levels: [
      { level: 1, title: "Novice", description: "Implements standard CRUD REST endpoints with HTTP status codes." },
      { level: 2, title: "Practitioner", description: "Implements OpenAPI specs, pagination, and JWT authentication middleware." },
      { level: 3, title: "Advanced", description: "Designs distributed rate limiting with Redis and idempotent webhook consumers." },
      { level: 4, title: "Expert", description: "Architects Federated GraphQL Subgraphs handling 100k+ requests per second." },
      { level: 5, title: "Principal / Fellow", description: "Governs enterprise API standards and public partner ecosystem architecture." },
    ],
  },
  {
    id: "comp-db",
    name: "PostgreSQL Internals, Indexing & Distributed Data",
    category: "Software Engineering",
    description: "ACID guarantees, WAL replication, MVCC internals, EXPLAIN ANALYZE optimization, and distributed sharding.",
    levels: [
      { level: 1, title: "Novice", description: "Writes basic SQL queries, joins, and relational schema migrations." },
      { level: 2, title: "Practitioner", description: "Creates B-Tree/GIN indexes, foreign keys, and views." },
      { level: 3, title: "Advanced", description: "Profiles slow queries with EXPLAIN (ANALYZE, BUFFERS) and optimizes locks." },
      { level: 4, title: "Expert", description: "Designs logical replication, table partitioning, and high-availability failover." },
      { level: 5, title: "Principal / Fellow", description: "Directs enterprise database topology, sharding, and backup architectures." },
    ],
  },
  {
    id: "comp-genai",
    name: "Generative AI, LLM Fine-Tuning & RAG Pipelines",
    category: "AI & Machine Learning",
    description: "Vector embeddings, Retrieval-Augmented Generation (RAG), prompt engineering, LoRA fine-tuning, and semantic caching.",
    levels: [
      { level: 1, title: "Novice", description: "Understands transformer basics, prompt techniques, and API integration." },
      { level: 2, title: "Practitioner", description: "Implements vector search with Pinecone/Qdrant and basic RAG workflows." },
      { level: 3, title: "Advanced", description: "Builds multi-agent evaluation frameworks and hybrid keyword/dense search." },
      { level: 4, title: "Expert", description: "Fine-tunes open-source LLMs (Llama 3, Mistral) with PEFT/LoRA on private data." },
      { level: 5, title: "Principal / Fellow", description: "Authors organizational GenAI strategy, safety guardrails, and model ops." },
    ],
  },
  {
    id: "comp-mlops",
    name: "MLOps, Model Serving & Feature Stores",
    category: "AI & Machine Learning",
    description: "End-to-end machine learning lifecycle, Kubeflow pipelines, Triton inference server, model monitoring, and drift detection.",
    levels: [
      { level: 1, title: "Novice", description: "Exports ML models to ONNX and understands model latency constraints." },
      { level: 2, title: "Practitioner", description: "Deploys real-time model inference endpoints with Docker and FastAPI." },
      { level: 3, title: "Advanced", description: "Implements automated retraining pipelines and Feast feature stores." },
      { level: 4, title: "Expert", description: "Architects low-latency GPU cluster serving with TensorRT-LLM and vLLM." },
      { level: 5, title: "Principal / Fellow", description: "Governs enterprise AI engineering infrastructure and hardware allocation." },
    ],
  },
  {
    id: "comp-discovery",
    name: "Customer Problem Discovery & Opportunity Trees",
    category: "Product & Agile",
    description: "Continuous user interviews, opportunity solution trees, hypothesis validation, and quantitative telemetry.",
    levels: [
      { level: 1, title: "Novice", description: "Conducts user interviews and summarizes qualitative insights." },
      { level: 2, title: "Practitioner", description: "Constructs Opportunity Solution Trees and defines metric-driven hypotheses." },
      { level: 3, title: "Advanced", description: "Runs rigorous A/B experiments and multivariate usability tests." },
      { level: 4, title: "Expert", description: "Discovers new 0-to-1 product opportunities driving multi-million ARR growth." },
      { level: 5, title: "Principal / Fellow", description: "Shapes company-wide product vision and customer innovation culture." },
    ],
  },
  {
    id: "comp-analytics",
    name: "Product Analytics, Retention & Funnel Modeling",
    category: "Product & Agile",
    description: "Cohort retention analysis, pirate metrics (AARRR), funnel drop-off diagnostics, and North Star alignment.",
    levels: [
      { level: 1, title: "Novice", description: "Reads dashboard reports in Mixpanel/Amplitude and tracks page views." },
      { level: 2, title: "Practitioner", description: "Builds multi-step conversion funnels and user segmentation filters." },
      { level: 3, title: "Advanced", description: "Identifies leading retention drivers and sets statistical significance thresholds." },
      { level: 4, title: "Expert", description: "Architects growth loops and virality flywheels across user lifecycle." },
      { level: 5, title: "Principal / Fellow", description: "Establishes enterprise North Star metrics and growth strategy." },
    ],
  },
  {
    id: "comp-agile",
    name: "Agile Sprint Delivery & Engineering Velocity",
    category: "Product & Agile",
    description: "Scrum/Kanban orchestration, DORA metric optimization, cycle time reduction, and dependency management.",
    levels: [
      { level: 1, title: "Novice", description: "Participates in daily standups, estimates user stories in points." },
      { level: 2, title: "Practitioner", description: "Facilitates sprint planning, retrospectives, and unblocks blockers." },
      { level: 3, title: "Advanced", description: "Optimizes DORA metrics (Deployment Frequency, Lead Time, Change Failure)." },
      { level: 4, title: "Expert", description: "Coordinates cross-team multi-quarter release trains with zero slippage." },
      { level: 5, title: "Principal / Fellow", description: "Transforms organizational delivery systems and operational excellence." },
    ],
  },
  {
    id: "comp-postmortem",
    name: "Blameless Post-Mortems & Incident Management",
    category: "Leadership & Collaboration",
    description: "Severity 1 incident commander, root cause 5-Whys analysis, systemic action items, and reliability reviews.",
    levels: [
      { level: 1, title: "Novice", description: "Participates in on-call rotation and follows runbooks." },
      { level: 2, title: "Practitioner", description: "Authors clear incident timelines and identifies immediate triggers." },
      { level: 3, title: "Advanced", description: "Leads blameless post-mortem reviews and tracks systemic prevention tickets." },
      { level: 4, title: "Expert", description: "Serves as Enterprise Incident Commander for critical outages." },
      { level: 5, title: "Principal / Fellow", description: "Shapes engineering culture of psychological safety and high reliability." },
    ],
  },
];

// -------------------------------------------------------------
// 2. ENTERPRISE JOB ROLES & MNC BENCHMARKS (6 Roles)
// -------------------------------------------------------------
export const SEEDED_JOB_ROLES: JobRole[] = [
  {
    id: "role-jr-dev",
    title: "Junior Software Engineer",
    department: "Engineering",
    companyBenchmark: "Google L3 / Meta E3 Standard Benchmark",
    description: "Focuses on writing clean, tested code, resolving bug tickets, and participating in peer code reviews.",
    requiredCompetencies: [
      { competencyId: "comp-react", requiredLevel: 2 },
      { competencyId: "comp-ts", requiredLevel: 2 },
      { competencyId: "comp-api", requiredLevel: 2 },
      { competencyId: "comp-db", requiredLevel: 1 },
      { competencyId: "comp-agile", requiredLevel: 1 },
    ],
  },
  {
    id: "role-fullstack-l2",
    title: "Fullstack Developer (L2)",
    department: "Engineering",
    companyBenchmark: "AWS SDE II / Microsoft L61 Benchmark",
    description: "Delivers end-to-end fullstack features, designs database schemas, builds REST/GraphQL endpoints, and containerizes services.",
    requiredCompetencies: [
      { competencyId: "comp-react", requiredLevel: 3 },
      { competencyId: "comp-ts", requiredLevel: 3 },
      { competencyId: "comp-api", requiredLevel: 3 },
      { competencyId: "comp-db", requiredLevel: 3 },
      { competencyId: "comp-k8s", requiredLevel: 2 },
      { competencyId: "comp-cloud-arch", requiredLevel: 2 },
    ],
  },
  {
    id: "role-sr-cloud-arch",
    title: "Senior Cloud Solutions Architect (L4)",
    department: "Engineering & Infrastructure",
    companyBenchmark: "Google Cloud L5 / AWS Senior SA Benchmark",
    description: "Owns technical architecture for multi-region cloud workloads, sets containerization and security standards, and mentors staff.",
    requiredCompetencies: [
      { competencyId: "comp-cloud-arch", requiredLevel: 4 },
      { competencyId: "comp-k8s", requiredLevel: 4 },
      { competencyId: "comp-terraform", requiredLevel: 4 },
      { competencyId: "comp-sec", requiredLevel: 4 },
      { competencyId: "comp-api", requiredLevel: 4 },
      { competencyId: "comp-db", requiredLevel: 3 },
      { competencyId: "comp-postmortem", requiredLevel: 4 },
    ],
  },
  {
    id: "role-azure-dell-architect",
    title: "Enterprise Hybrid Cloud & Storage Architect (L4)",
    department: "Enterprise Systems",
    companyBenchmark: "Microsoft Principal Architect / Dell Fellow Benchmark",
    description: "Architects hybrid cloud networks linking Dell PowerStore enterprise arrays with Microsoft Azure ExpressRoute and AKS.",
    requiredCompetencies: [
      { competencyId: "comp-azure-infra", requiredLevel: 4 },
      { competencyId: "comp-dell-storage", requiredLevel: 4 },
      { competencyId: "comp-cloud-arch", requiredLevel: 4 },
      { competencyId: "comp-sec", requiredLevel: 4 },
      { competencyId: "comp-k8s", requiredLevel: 3 },
    ],
  },
  {
    id: "role-ai-engineer",
    title: "Senior Generative AI & MLOps Engineer (L4)",
    department: "AI & Platform Innovation",
    companyBenchmark: "Meta AI / NVIDIA Deep Learning Lead Benchmark",
    description: "Architects scalable vector RAG pipelines, fine-tunes open-source LLMs, and manages high-throughput GPU inference clusters.",
    requiredCompetencies: [
      { competencyId: "comp-genai", requiredLevel: 4 },
      { competencyId: "comp-mlops", requiredLevel: 4 },
      { competencyId: "comp-cloud-arch", requiredLevel: 3 },
      { competencyId: "comp-k8s", requiredLevel: 3 },
      { competencyId: "comp-ts", requiredLevel: 3 },
    ],
  },
  {
    id: "role-tpm",
    title: "Staff Technical Product Manager (L5)",
    department: "Product & Strategy",
    companyBenchmark: "Google Staff TPM / Meta Lead PM Benchmark",
    description: "Defines product strategy, prioritizes technical roadmaps, calculates business ROI, and leads agile engineering delivery.",
    requiredCompetencies: [
      { competencyId: "comp-discovery", requiredLevel: 4 },
      { competencyId: "comp-analytics", requiredLevel: 4 },
      { competencyId: "comp-agile", requiredLevel: 4 },
      { competencyId: "comp-api", requiredLevel: 3 },
    ],
  },
];

// -------------------------------------------------------------
// 3. REAL MNC COURSES WITH MULTI-WEEK SYLLABUS, LABS & EXAM BANKS
// -------------------------------------------------------------
export const SEEDED_COURSES: Course[] = [
  {
    id: "crs-gcp-pca",
    title: "Google Cloud: Professional Cloud Architect (PCA) Certification",
    provider: "Google Cloud",
    category: "Cloud & Infrastructure",
    competencyIds: ["comp-cloud-arch", "comp-k8s"],
    competencyGainLevel: 3,
    createdBy: "usr-marcus-trainer",
    authorName: "Marcus Vance",
    authorRole: "Principal Cloud Architect (ex-Google Cloud Lead)",
    isMandatory: true,
    duration: "30-Day Certification Track",
    rating: 4.98,
    enrolledCount: 312,
    badgeEarned: "Google Cloud Certified PCA",
    coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80",
    description: "Official 30-day curriculum covering Google Cloud global VPC design, Google Kubernetes Engine (GKE) Autopilot, Cloud Spanner multi-region consistency, and IAM workload identity federation.",
    syllabusWeeks: [
      { weekNumber: 1, weekTitle: "Global Networking, VPC Peering & Interconnect", topics: ["Cloud Interconnect vs VPN", "Shared VPC", "Private Service Connect"] },
      { weekNumber: 2, weekTitle: "GKE Autopilot, Workload Identity & Cloud Run", topics: ["Multi-cluster Ingress", "Pod Security Admission", "HPA & VPA"] },
      { weekNumber: 3, weekTitle: "Cloud Spanner, BigQuery & Storage Tiering", topics: ["TrueTime Synchronized Clocks", "Partitioned Tables", "Storage Transfer"] },
      { weekNumber: 4, weekTitle: "Disaster Recovery, Chaos & Practice Exam", topics: ["RTO/RPO Calculations", "Dual-Region Failover", "Certification Exam"] },
    ],
    modules: [
      {
        id: "mod-gcp-1",
        title: "1. Google Global Infrastructure & Cloud Spanner Invariants",
        order: 1,
        type: "text",
        duration: "45 min",
        textMarkdown: `### Google Cloud Spanner & Global VPC Invariants

Google Cloud's global fiber backbone allows single VPC networks to span all continents with sub-millisecond inter-region latency.

\`\`\`
[Global Client Traffic] ---> [Google Cloud Global External HTTPS Load Balancer]
                                    |
            +-----------------------+-----------------------+
            | (Anycast VIP)                                 |
            v                                               v
    [Region us-central1]                            [Region europe-west1]
      GKE Autopilot Cluster                           GKE Autopilot Cluster
            |                                               |
            +-----------> [Cloud Spanner Multi-Region] <-----+
                         (External Consistency with TrueTime)
\`\`\`

#### Key Architectural Invariants:
1. **Cloud Spanner TrueTime API**: Utilizes atomic GPS and atomic clocks inside Google datacenters to provide **External Consistency (Serializable ACID)** globally without locking bottlenecks.
2. **Workload Identity Federation**: Completely eliminates long-lived service account key files by mapping Kubernetes ServiceAccounts directly to Google IAM roles.`,
      },
      {
        id: "mod-gcp-2",
        title: "2. Practical Lab: Author Google Cloud Spanner Schema & IAM Manifest",
        order: 2,
        type: "lab",
        duration: "45 min",
        assignment: {
          id: "assign-gcp-1",
          title: "Cloud Spanner Interleaved Table Schema & Workload Identity",
          language: "yaml",
          instructions: "Define an interleaved child table schema in Cloud Spanner ensuring co-location of customer orders with parent customer rows for zero-network-hop joins.",
          starterCode: `CREATE TABLE Customers (
  CustomerId STRING(36) NOT NULL,
  Name STRING(100) NOT NULL,
  Tier STRING(20) NOT NULL
) PRIMARY KEY (CustomerId);

CREATE TABLE Orders (
  CustomerId STRING(36) NOT NULL,
  OrderId STRING(36) NOT NULL,
  OrderTotal NUMERIC NOT NULL,
  CreatedAt TIMESTAMP NOT NULL
) PRIMARY KEY (CustomerId, OrderId),
  INTERLEAVE IN PARENT Customers ON DELETE CASCADE;`,
          expectedOutput: "Cloud Spanner schema validated. Interleaved hierarchy co-located across global splits.",
          testCases: [
            { name: "Verify Primary Key includes CustomerId and OrderId", input: "PRIMARY KEY (CustomerId, OrderId)", expected: "Valid" },
            { name: "Verify INTERLEAVE IN PARENT Customers clause", input: "INTERLEAVE IN PARENT Customers", expected: "Valid" },
          ],
        },
      },
      {
        id: "mod-gcp-3",
        title: "3. Official Google PCA Certification Exam Bank (4 Questions)",
        order: 3,
        type: "quiz",
        duration: "30 min",
        quiz: [
          {
            id: "q-gcp-1",
            question: "Your enterprise requires a globally distributed database that supports relational SQL schemas, automatic horizontal sharding, and strictly serialized ACID transactions with five-nines (99.999%) availability. Which Google Cloud service should be architected?",
            options: [
              "Cloud SQL with cross-region read replicas",
              "Cloud Spanner configured with a multi-region instance configuration",
              "BigQuery with scheduled queries",
              "Firestore in Datastore mode",
            ],
            correctIndex: 1,
            explanation: "Cloud Spanner is Google's globally distributed, synchronously replicated database that delivers high-availability (up to 99.999% SLA) with strong consistency using TrueTime.",
            topicTag: "Google Databases",
          },
          {
            id: "q-gcp-2",
            question: "How should a microservice deployed on Google Kubernetes Engine (GKE) authenticate to Google Cloud Storage without storing service account JSON private keys in the container image or Kubernetes Secrets?",
            options: [
              "Embed the private key in the container Dockerfile environment variables",
              "Enable GKE Workload Identity and bind the Kubernetes ServiceAccount to the IAM Google Service Account with `roles/storage.objectViewer`",
              "Make the Cloud Storage bucket publicly readable to all internet traffic",
              "Pass the corporate admin username and password via HTTP headers",
            ],
            correctIndex: 1,
            explanation: "Workload Identity allows Kubernetes workloads to impersonate Google IAM service accounts dynamically via metadata tokens, eliminating the security risk of static JSON key files.",
            topicTag: "GCP IAM & Security",
          },
          {
            id: "q-gcp-3",
            question: "A gaming company requires private connectivity between two VPCs in different Google Cloud projects without exposing traffic to the public internet, and without overlapping IP CIDR range restrictions. Which solution is best?",
            options: [
              "Deploying public internet gateways in both VPCs",
              "Configuring Private Service Connect (PSC) or VPC Network Peering",
              "Routing traffic through an open FTP server",
              "Using unencrypted HTTP webhooks",
            ],
            correctIndex: 1,
            explanation: "Private Service Connect and VPC Network Peering enable secure, private, line-rate communication between VPCs over Google's software-defined SDN backbone.",
            topicTag: "GCP Networking",
          },
          {
            id: "q-gcp-4",
            question: "Which compute option is recommended for running stateless HTTP container workloads that scale from 0 to 10,000 concurrent instances with zero cluster management overhead?",
            options: [
              "Compute Engine managed instance group with custom scripts",
              "Cloud Run (Fully Managed Serverless Container Platform)",
              "Bare Metal Cloud servers",
              "Google Cloud VMware Engine",
            ],
            correctIndex: 1,
            explanation: "Cloud Run runs stateless containers on top of Knative and Borg, automatically scaling up on traffic bursts and scaling down to zero when idle.",
            topicTag: "Serverless Compute",
          },
        ],
      },
    ],
  },

  {
    id: "crs-azure-az305",
    title: "Microsoft Azure: Solutions Architect Expert (AZ-305)",
    provider: "Microsoft Azure",
    category: "Cloud & Infrastructure",
    competencyIds: ["comp-azure-infra", "comp-sec"],
    competencyGainLevel: 3,
    createdBy: "usr-marcus-trainer",
    authorName: "Sarah Chen",
    authorRole: "Director of Systems Engineering",
    isMandatory: false,
    duration: "30-Day Certification Track",
    rating: 4.97,
    enrolledCount: 284,
    badgeEarned: "Azure Solutions Architect Expert",
    coverImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80",
    description: "Prepare for the official Microsoft AZ-305 exam covering Azure Landing Zones, Bicep IaC, Azure Kubernetes Service (AKS), Cosmos DB multi-region writes, and Entra ID governance.",
    syllabusWeeks: [
      { weekNumber: 1, weekTitle: "Identity, Governance & Entra ID", topics: ["Conditional Access", "Privileged Identity Management (PIM)", "Management Groups"] },
      { weekNumber: 2, weekTitle: "Data Storage & Cosmos DB Architecture", topics: ["Cosmos DB Consistency Models", "Azure SQL Managed Instance", "Blob Tiering"] },
      { weekNumber: 3, weekTitle: "Infrastructure, Bicep & AKS", topics: ["Bicep Modules", "Azure Kubernetes Service", "App Gateway WAF"] },
      { weekNumber: 4, weekTitle: "Business Continuity & AZ-305 Practice Exam", topics: ["Azure Site Recovery", "Zone Redundancy", "Certification Exam"] },
    ],
    modules: [
      {
        id: "mod-az-1",
        title: "1. Azure Entra ID Privileged Identity Management (PIM) & Bicep IaC",
        order: 1,
        type: "text",
        duration: "40 min",
        textMarkdown: `### Azure Enterprise Governance: Entra ID & Bicep

Enterprise security on Microsoft Azure requires Just-In-Time (JIT) role activation and declarative Bicep infrastructure.

\`\`\`bicep
// Azure Bicep Infrastructure-as-Code Module
param location string = resourceGroup().location
param aksClusterName string = 'aks-enterprise-prod'

resource aksCluster 'Microsoft.ContainerService/managedClusters@2023-05-01' = {
  name: aksClusterName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    dnsPrefix: 'prod-k8s'
    enableRBAC: true
    networkProfile: {
      networkPlugin: 'azure'
      networkPolicy: 'calico'
    }
  }
}
\`\`\`

#### Key Invariants:
1. **Entra ID PIM (Privileged Identity Management)**: Enforces time-bound, approval-based elevation for administrative roles (e.g. Contributor, Global Admin) with multi-factor authentication (MFA).
2. **Cosmos DB 5 Consistency Levels**: Strong, Bounded Staleness, Session, Consistent Prefix, and Eventual.`,
      },
      {
        id: "mod-az-2",
        title: "2. Practical Lab: Bicep Multi-Region Storage Account with Immutable Lock",
        order: 2,
        type: "lab",
        duration: "40 min",
        assignment: {
          id: "assign-az-1",
          title: "Bicep Azure Storage with GRS Replication & Immobility Lock",
          language: "bicep",
          instructions: "Author a Bicep resource block declaring an Azure Storage Account with Geo-Redundant Storage (Standard_GRS) and TLS 1.3 enforcement.",
          starterCode: `resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: 'stenterpriseauditlogs'
  location: 'eastus'
  sku: {
    name: 'Standard_GRS'
  }
  kind: 'StorageV2'
  properties: {
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
    accessTier: 'Hot'
  }
}`,
          expectedOutput: "Azure Bicep validation succeeded. GRS replication and encryption in transit validated.",
          testCases: [
            { name: "Verify SKU is Standard_GRS", input: "sku.name", expected: "Standard_GRS" },
            { name: "Verify HTTPS traffic only", input: "supportsHttpsTrafficOnly", expected: "true" },
          ],
        },
      },
      {
        id: "mod-az-3",
        title: "3. Official Microsoft AZ-305 Certification Exam Bank (4 Questions)",
        order: 3,
        type: "quiz",
        duration: "30 min",
        quiz: [
          {
            id: "q-az-1",
            question: "An organization needs to ensure administrators only receive access to production Azure resources after manager approval, for a maximum of 4 hours, requiring MFA. Which service satisfies this requirement?",
            options: [
              "Azure Entra ID Privileged Identity Management (PIM)",
              "Azure Bastion Host",
              "Azure Monitor Action Groups",
              "Network Security Groups (NSG)",
            ],
            correctIndex: 0,
            explanation: "Azure Entra ID PIM provides just-in-time, time-bound, and approval-based role activation with full audit logging and MFA enforcement.",
            topicTag: "Azure Security & Identity",
          },
          {
            id: "q-az-2",
            question: "Which Cosmos DB consistency level provides the highest write throughput and lowest latency while guaranteeing that clients will never see out-of-order writes within a single user session?",
            options: [
              "Strong Consistency",
              "Session Consistency",
              "Bounded Staleness Consistency",
              "Eventual Consistency without ordering",
            ],
            correctIndex: 1,
            explanation: "Session Consistency (the default in Cosmos DB) ensures monotonic reads, monotonic writes, and read-your-writes guarantees scoped to an individual client session token.",
            topicTag: "Cosmos DB",
          },
          {
            id: "q-az-3",
            question: "A company requires an automated Disaster Recovery solution that continuously replicates virtual machines from Azure Region East US to West US, with 1-click test failovers that do not disrupt production. Which service should be used?",
            options: [
              "Azure Site Recovery (ASR)",
              "Azure Logic Apps with FTP",
              "Azure Blob Copy via azcopy cron job",
              "Azure ExpressRoute Gateway",
            ],
            correctIndex: 0,
            explanation: "Azure Site Recovery (ASR) automates VM replication between Azure regions, meeting low RTO/RPO targets and enabling non-disruptive disaster recovery testing.",
            topicTag: "Azure Business Continuity",
          },
          {
            id: "q-az-4",
            question: "What is the primary benefit of deploying Azure Bicep instead of raw ARM JSON templates?",
            options: [
              "Bicep offers concise syntax, modular code reuse, first-class type safety, and automatic dependency management with zero JSON boilerplate",
              "Bicep compiles directly into Java byte code",
              "Bicep only works on Linux machines",
              "Bicep requires paying extra Microsoft licensing fees",
            ],
            correctIndex: 0,
            explanation: "Bicep is a domain-specific language (DSL) that drastically simplifies Azure infrastructure deployment with clean syntax, modularity, and compile-time validation.",
            topicTag: "Infrastructure-as-Code",
          },
        ],
      },
    ],
  },

  {
    id: "crs-dell-storage",
    title: "Dell Technologies: Enterprise PowerStore SAN/NAS & Cyber Recovery Architect",
    provider: "Dell Technologies",
    category: "Enterprise Storage & Security",
    competencyIds: ["comp-dell-storage", "comp-sec"],
    competencyGainLevel: 3,
    createdBy: "usr-marcus-trainer",
    authorName: "Dr. Elena Rostova",
    authorRole: "Enterprise Systems Fellow & Chief Learning Officer",
    isMandatory: false,
    duration: "25-Day Certification Track",
    rating: 4.96,
    enrolledCount: 198,
    badgeEarned: "Dell PowerStore Master Specialist",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    description: "Master enterprise SAN/NAS topologies, Dell PowerStore NVMe-over-Fabrics (NVMe-oF), asynchronous/synchronous storage replication, and air-gapped Cyber Recovery vaults for ransomware defense.",
    syllabusWeeks: [
      { weekNumber: 1, weekTitle: "PowerStore Architecture & NVMe-oF", topics: ["Active-Active Storage Nodes", "NVMe/TCP vs FC", "Inline Deduplication"] },
      { weekNumber: 2, weekTitle: "VxRail Hyperconverged & VMware vSAN", topics: ["vSAN Storage Policies", "VxRail Manager", "Cluster Stretched Nodes"] },
      { weekNumber: 3, weekTitle: "Air-Gapped Cyber Recovery & Immutable Vaults", topics: ["CyberSense Analytics", "Air-Gap Isolation", "Ransomware Remediation"] },
      { weekNumber: 4, weekTitle: "Enterprise DR Failover & Specialist Exam", topics: ["Metro Node Sync", "Snapshot Schedules", "Certification Exam"] },
    ],
    modules: [
      {
        id: "mod-dell-1",
        title: "1. Dell PowerStore All-NVMe Architecture & Cyber Recovery Isolation",
        order: 1,
        type: "text",
        duration: "40 min",
        textMarkdown: `### Enterprise Dell PowerStore & Cyber Recovery Vault Architecture

Modern enterprise storage demands line-rate NVMe performance paired with air-gapped ransomware protection.

\`\`\`
[Production Datacenter]                       [Isolated Cyber Recovery Vault]
 Dell PowerStore Array                            Dell PowerProtect DD Series
        |                                                    |
        +----[Air-Gapped Replication Link (Physically Cut)]--+
                         (Opened only during automated sync window)
                                                             |
                                                  [CyberSense AI Engine]
                                           (Scans for corrupted/encrypted data)
\`\`\`

#### Key Invariants:
1. **Dynamic Resiliency Engine (DRE)**: Protects against dual-drive failures with up to 98% capacity utilization without traditional dedicated hot spares.
2. **Automated Air-Gap**: The physical and logical link between production and the Cyber Vault remains offline 99% of the time, preventing lateral ransomware traversal.`,
      },
      {
        id: "mod-dell-2",
        title: "2. Practical Lab: Configure Dell PowerStore Volume Snapshot Policy",
        order: 2,
        type: "lab",
        duration: "35 min",
        assignment: {
          id: "assign-dell-1",
          title: "PowerStore Protection Policy with Immutable Retention",
          language: "yaml",
          instructions: "Define a Protection Policy specifying 15-minute RPO snapshots, 30-day retention, and cryptographic secure snapshot locks.",
          starterCode: `protection_policy:
  name: "gold_production_rpo15"
  type: "snapshot_and_replication"
  schedules:
    - interval: "15_minutes"
      retention_days: 30
      secure_lock: true
  replication:
    mode: "synchronous"
    destination_cluster: "powerstore-dr-vault"`,
          expectedOutput: "PowerStore protection policy validated. Immutable snapshot schedule active.",
          testCases: [
            { name: "Verify Snapshot Interval is 15 minutes", input: "schedules.interval", expected: "15_minutes" },
            { name: "Verify secure_lock is enabled", input: "schedules.secure_lock", expected: "true" },
          ],
        },
      },
      {
        id: "mod-dell-3",
        title: "3. Dell Storage & Cyber Recovery Exam Bank (4 Questions)",
        order: 3,
        type: "quiz",
        duration: "25 min",
        quiz: [
          {
            id: "q-dell-1",
            question: "How does a Dell Cyber Recovery Vault ensure that ransomware that compromises production active directory and backup servers cannot infect the cyber vault?",
            options: [
              "By using a different desktop wallpaper in the vault",
              "By keeping the network link between production and the vault completely air-gapped (disabled) and using an isolated management plane with multi-person authorization",
              "By connecting the vault directly to public WiFi",
              "By deleting all backups every night",
            ],
            correctIndex: 1,
            explanation: "The Cyber Recovery Vault uses an automated, scheduled physical air-gap that isolates data from production networks, preventing compromised credentials from reaching the vault.",
            topicTag: "Cyber Recovery & Ransomware",
          },
          {
            id: "q-dell-2",
            question: "What is the primary performance benefit of NVMe-over-Fabrics (NVMe-oF) using NVMe/TCP or NVMe/FC compared to legacy iSCSI?",
            options: [
              "NVMe-oF provides massive multi-queue parallelism (up to 64k queues with 64k commands per queue) and reduces host CPU overhead with microsecond latencies",
              "NVMe-oF compresses all videos into MP4 format",
              "NVMe-oF converts hard drives into floppy disks",
              "NVMe-oF eliminates the need for ethernet cables",
            ],
            correctIndex: 0,
            explanation: "NVMe-oF extends the high-concurrency, low-latency benefits of NVMe protocol across enterprise networks with thousands of parallel queues, eliminating SCSI bottlenecking.",
            topicTag: "Storage Protocols",
          },
          {
            id: "q-dell-3",
            question: "In Dell PowerStore, what is the guaranteed inline data reduction ratio for typical enterprise application workloads?",
            options: [
              "1:1 (No reduction)",
              "4:1 (Deduplication + Compression with no performance penalty)",
              "100:1 (Guaranteed for all files)",
              "2:1 only for images",
            ],
            correctIndex: 1,
            explanation: "Dell provides a 4:1 Data Reduction Guarantee across PowerStore arrays, utilizing hardware-accelerated inline deduplication and compression.",
            topicTag: "Data Reduction",
          },
          {
            id: "q-dell-4",
            question: "Which component of Dell Cyber Recovery analyzes backup datasets using machine learning to detect corruption, unauthorized encryption, or injected ransomware signatures?",
            options: [
              "CyberSense Analytics Engine",
              "Windows Media Player",
              "Apache Web Server",
              "Telnet Console",
            ],
            correctIndex: 0,
            explanation: "CyberSense analyzes file structures and entropy with 99.5% accuracy to identify ransomware encryption and establish clean point-in-time recovery copies.",
            topicTag: "AI Threat Detection",
          },
        ],
      },
    ],
  },
];

// -------------------------------------------------------------
// 4. REAL 30-DAY LEARNING PATHS FROM GLOBAL MNCS
// -------------------------------------------------------------
export const SEEDED_LEARNING_PATHS: LearningPath[] = [
  {
    id: "path-gcp-pca-30",
    title: "Google Cloud Professional Cloud Architect (30-Day Track)",
    provider: "Google Cloud",
    durationDays: 30,
    targetJobRoleId: "role-sr-cloud-arch",
    targetRoleTitle: "Senior Cloud Solutions Architect (L4)",
    estimatedHours: 32,
    badgeReward: "Google Cloud Certified Fellow",
    certificateTitle: "Google Cloud Certified Professional Cloud Architect",
    description: "Structured 4-week certification pathway covering GCP IAM, VPC Peering, GKE Autopilot, Cloud Spanner, and multi-region disaster recovery.",
    courseIds: ["crs-gcp-pca"],
    milestones: [
      { dayRange: "Day 1 – 7", title: "Global Networking & IAM", description: "VPC Peering, Interconnect, and Workload Identity.", skillsUnlocked: ["Cloud Architecture L3", "Zero Trust L2"] },
      { dayRange: "Day 8 – 15", title: "Container Orchestration", description: "GKE Autopilot, HPA, and Service Mesh routing.", skillsUnlocked: ["Kubernetes L3"] },
      { dayRange: "Day 16 – 23", title: "Enterprise Data & Storage", description: "Cloud Spanner TrueTime, BigQuery partitioning.", skillsUnlocked: ["Distributed Data L3"] },
      { dayRange: "Day 24 – 30", title: "DR Invariants & Exam", description: "Passing the official PCA scenario assessment.", skillsUnlocked: ["Cloud Architecture L4"] },
    ],
  },
  {
    id: "path-azure-dell-30",
    title: "Microsoft & Dell Hybrid Cloud Architect (30-Day Track)",
    provider: "Microsoft Azure & Dell Technologies",
    durationDays: 30,
    targetJobRoleId: "role-azure-dell-architect",
    targetRoleTitle: "Enterprise Hybrid Cloud & Storage Architect (L4)",
    estimatedHours: 35,
    badgeReward: "Microsoft & Dell Hybrid Fellow",
    certificateTitle: "Certified Enterprise Hybrid Cloud & Storage Architect",
    description: "Master Microsoft Azure enterprise governance (AZ-305) connected with Dell PowerStore SAN/NAS and Cyber Recovery Vaults.",
    courseIds: ["crs-azure-az305", "crs-dell-storage"],
    milestones: [
      { dayRange: "Day 1 – 8", title: "Azure Entra ID & Landing Zones", description: "PIM, Conditional Access, and Bicep modules.", skillsUnlocked: ["Azure Infra L3"] },
      { dayRange: "Day 9 – 16", title: "PowerStore SAN & NVMe-oF", description: "All-Flash storage arrays, LUN provisioning.", skillsUnlocked: ["Dell Storage L3"] },
      { dayRange: "Day 17 – 24", title: "Ransomware Cyber Vaults", description: "Air-gapped Cyber Recovery and CyberSense AI.", skillsUnlocked: ["Zero Trust L3"] },
      { dayRange: "Day 25 – 30", title: "Capstone Assessment", description: "Full hybrid cloud architecture certification.", skillsUnlocked: ["Hybrid Cloud L4"] },
    ],
  },
];

// -------------------------------------------------------------
// 5. SEEDED ENTERPRISE USERS WITH REAL CONTACTS & PASSWORDS
// -------------------------------------------------------------
export const SEEDED_LEARNER_PROFILE: UserProfile = {
  id: "usr-alex-learner",
  name: "Alex Rivera",
  email: "alex.rivera@capacityconnect.io",
  contactNumber: "+1 (555) 349-8291",
  password: "Passcode@2026",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "learner",
  department: "Engineering",
  jobRoleId: "role-fullstack-l2",
  jobTitle: "Fullstack Developer (L2)",
  organization: "Capacity Connect Enterprise",
  employeeId: "EMP-ENG-8492",
  managerId: "usr-sarah-manager",
  points: 1450,
  streakDays: 14,
  completedCoursesCount: 2,
  competencies: [
    { competencyId: "comp-react", currentLevel: 3, lastAssessedAt: "2 days ago", verifiedBy: "Meta Core Assessment", scorePercent: 95 },
    { competencyId: "comp-ts", currentLevel: 3, lastAssessedAt: "3 days ago", verifiedBy: "TypeScript Spec Assessment", scorePercent: 92 },
    { competencyId: "comp-api", currentLevel: 3, lastAssessedAt: "1 week ago", verifiedBy: "API Benchmark Exam", scorePercent: 88 },
    { competencyId: "comp-db", currentLevel: 2, lastAssessedAt: "2 weeks ago", verifiedBy: "PostgreSQL Lab", scorePercent: 78 },
    { competencyId: "comp-k8s", currentLevel: 2, lastAssessedAt: "3 weeks ago", verifiedBy: "Kubernetes Foundation", scorePercent: 80 },
    { competencyId: "comp-cloud-arch", currentLevel: 2, lastAssessedAt: "1 month ago", verifiedBy: "AWS Cloud Lab", scorePercent: 75 },
    { competencyId: "comp-sec", currentLevel: 2, lastAssessedAt: "1 month ago", verifiedBy: "Zero Trust Module", scorePercent: 82 },
    { competencyId: "comp-terraform", currentLevel: 1, lastAssessedAt: "2 months ago", verifiedBy: "Initial Onboarding", scorePercent: 65 },
    { competencyId: "comp-genai", currentLevel: 2, lastAssessedAt: "1 week ago", verifiedBy: "NVIDIA RAG Lab", scorePercent: 85 },
    { competencyId: "comp-agile", currentLevel: 3, lastAssessedAt: "2 weeks ago", verifiedBy: "Agile Leadership Review", scorePercent: 90 },
    { competencyId: "comp-postmortem", currentLevel: 2, lastAssessedAt: "1 month ago", verifiedBy: "Incident Response Drill", scorePercent: 80 },
  ],
};

export const SEEDED_TEAM_MEMBERS: UserProfile[] = [
  SEEDED_LEARNER_PROFILE,
  {
    id: "usr-devon",
    name: "Devon Reed",
    email: "devon.reed@capacityconnect.io",
    contactNumber: "+1 (555) 892-1204",
    password: "Passcode@2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "learner",
    department: "Engineering",
    jobRoleId: "role-fullstack-l2",
    jobTitle: "Software Engineer (L2)",
    organization: "Capacity Connect Enterprise",
    employeeId: "EMP-ENG-8493",
    managerId: "usr-sarah-manager",
    points: 820,
    streakDays: 4,
    completedCoursesCount: 1,
    competencies: [
      { competencyId: "comp-react", currentLevel: 2, lastAssessedAt: "1 month ago" },
      { competencyId: "comp-ts", currentLevel: 2, lastAssessedAt: "1 month ago" },
      { competencyId: "comp-api", currentLevel: 2, lastAssessedAt: "2 months ago" },
      { competencyId: "comp-db", currentLevel: 1, lastAssessedAt: "3 months ago" },
      { competencyId: "comp-k8s", currentLevel: 1, lastAssessedAt: "3 months ago" },
      { competencyId: "comp-cloud-arch", currentLevel: 1, lastAssessedAt: "3 months ago" },
    ],
  },
  {
    id: "usr-priya",
    name: "Priya Sharma",
    email: "priya.sharma@capacityconnect.io",
    contactNumber: "+91 98451 23098",
    password: "Passcode@2026",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    role: "learner",
    department: "Engineering",
    jobRoleId: "role-sr-cloud-arch",
    jobTitle: "Senior Cloud & DevOps Lead (L4)",
    organization: "Capacity Connect Enterprise",
    employeeId: "EMP-ENG-8494",
    managerId: "usr-sarah-manager",
    points: 2650,
    streakDays: 28,
    completedCoursesCount: 6,
    competencies: [
      { competencyId: "comp-k8s", currentLevel: 4, lastAssessedAt: "Yesterday" },
      { competencyId: "comp-cloud-arch", currentLevel: 4, lastAssessedAt: "3 days ago" },
      { competencyId: "comp-terraform", currentLevel: 4, lastAssessedAt: "1 week ago" },
      { competencyId: "comp-sec", currentLevel: 4, lastAssessedAt: "2 weeks ago" },
      { competencyId: "comp-postmortem", currentLevel: 4, lastAssessedAt: "1 month ago" },
      { competencyId: "comp-api", currentLevel: 3, lastAssessedAt: "1 month ago" },
    ],
  },
  {
    id: "usr-sarah-manager",
    name: "Sarah Chen",
    email: "sarah.chen@capacityconnect.io",
    contactNumber: "+1 (555) 782-9012",
    password: "Passcode@2026",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    role: "manager",
    department: "Engineering Leadership",
    jobRoleId: "role-sr-cloud-arch",
    jobTitle: "Director of Engineering / People Lead",
    organization: "Capacity Connect Enterprise",
    employeeId: "EMP-MGR-1002",
    points: 3400,
    streakDays: 45,
    completedCoursesCount: 10,
    competencies: [
      { competencyId: "comp-cloud-arch", currentLevel: 5, lastAssessedAt: "1 week ago" },
      { competencyId: "comp-sec", currentLevel: 4, lastAssessedAt: "2 weeks ago" },
      { competencyId: "comp-agile", currentLevel: 5, lastAssessedAt: "3 days ago" },
    ],
  },
  {
    id: "usr-marcus-trainer",
    name: "Marcus Vance",
    email: "marcus.vance@capacityconnect.io",
    contactNumber: "+1 (555) 438-1928",
    password: "Passcode@2026",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    role: "trainer",
    department: "Curriculum & Talent Development",
    jobRoleId: "role-sr-cloud-arch",
    jobTitle: "Principal L&D Architect & Fellow",
    organization: "Capacity Connect Enterprise",
    employeeId: "EMP-TRN-2001",
    points: 4100,
    streakDays: 60,
    completedCoursesCount: 12,
    competencies: [
      { competencyId: "comp-cloud-arch", currentLevel: 5, lastAssessedAt: "1 day ago" },
      { competencyId: "comp-k8s", currentLevel: 5, lastAssessedAt: "1 day ago" },
    ],
  },
  {
    id: "usr-elena-admin",
    name: "Dr. Elena Rostova",
    email: "elena.rostova@capacityconnect.io",
    contactNumber: "+1 (555) 901-8374",
    password: "Passcode@2026",
    avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80",
    role: "admin",
    department: "Executive & People Operations",
    jobRoleId: "role-sr-cloud-arch",
    jobTitle: "Chief Learning Officer & Super Admin",
    organization: "Capacity Connect Enterprise",
    employeeId: "EMP-ADM-0001",
    points: 5200,
    streakDays: 90,
    completedCoursesCount: 15,
    competencies: [
      { competencyId: "comp-cloud-arch", currentLevel: 5, lastAssessedAt: "1 day ago" },
      { competencyId: "comp-genai", currentLevel: 5, lastAssessedAt: "1 day ago" },
    ],
  },
];

// -------------------------------------------------------------
// 6. SEEDED HISTORICAL ENROLLMENTS
// -------------------------------------------------------------
export const SEEDED_ENROLLMENTS: Enrollment[] = [
  {
    id: "enr-alex-gcp",
    userId: "usr-alex-learner",
    courseId: "crs-gcp-pca",
    status: "in_progress",
    progressPercent: 33,
    completedModuleIds: ["mod-gcp-1"],
    startedAt: "2026-08-15",
  },
  {
    id: "enr-alex-azure",
    userId: "usr-alex-learner",
    courseId: "crs-azure-az305",
    status: "in_progress",
    progressPercent: 33,
    completedModuleIds: ["mod-az-1"],
    startedAt: "2026-08-20",
  },
  {
    id: "enr-devon-gcp",
    userId: "usr-devon",
    courseId: "crs-gcp-pca",
    status: "overdue",
    progressPercent: 15,
    completedModuleIds: [],
    startedAt: "2026-07-20",
  },
];

export const SEEDED_KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "art-1",
    title: "Scaling PostgreSQL to 50k QPS: B-Tree Indexing, Partial Indexes & MVCC Internals",
    authorId: "usr-priya",
    authorName: "Priya Sharma",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    authorRole: "Senior Cloud & DevOps Lead (L4)",
    authorDepartment: "Engineering",
    createdAt: "2 days ago",
    readTime: "6 min read",
    upvotes: 48,
    upvotedBy: ["usr-alex-learner"],
    tags: ["PostgreSQL", "Database Optimization", "Performance"],
    competencyId: "comp-db",
    body: `When running high-throughput relational workloads, sequential table scans destroy IOPS. 

### 1. Partial Indexes
If you frequently query active records (e.g. \`status = 'active'\`), avoid indexing the entire 100M row table.

\`\`\`sql
CREATE INDEX idx_orders_active_unpaid 
ON orders (user_id, created_at) 
WHERE status = 'pending_payment';
\`\`\`

This reduces index disk size from 4.2GB to 85MB, fitting entirely in RAM buffer cache!`,
    commentsCount: 14,
    verifiedExpertiseLevel: 4,
  },
];

export const SEEDED_EXPERT_QUESTIONS: ExpertQuestion[] = [
  {
    id: "qna-1",
    title: "How to resolve Istio mTLS 503 Service Unavailable during GKE cluster upgrades?",
    description: "We are running Istio 1.20 on GKE 1.28. During control plane rolling upgrades, client pods intermittently receive 503 UC (upstream connection termination) for ~45 seconds.",
    askerId: "usr-alex-learner",
    askerName: "Alex Rivera",
    askerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    competencyId: "comp-k8s",
    competencyName: "Production Kubernetes",
    assignedExpertId: "usr-priya",
    assignedExpertName: "Priya Sharma (Level 4 Verified Expert)",
    status: "answered",
    createdAt: "Yesterday",
    answers: [
      {
        id: "ans-1",
        responderId: "usr-priya",
        responderName: "Priya Sharma",
        responderAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        responderLevel: 4,
        text: "This occurs because the Envoy sidecar proxy is terminated before the application container closes open connections. Add `preStop` sleep hook to the Istio sidecar injection template:\n\n```yaml\nlifecycle:\n  preStop:\n    exec:\n      command: ['/bin/sh', '-c', 'sleep 15']\n```\nThis allows Envoy to finish draining in-flight TCP connections gracefully.",
        createdAt: "18 hours ago",
        upvotes: 12,
      },
    ],
  },
];

export const SEEDED_CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-1",
    userId: "usr-alex-learner",
    recipientName: "Alex Rivera",
    courseOrPathId: "crs-gcp-pca",
    pathTitle: "Google Cloud: Professional Cloud Architect (PCA) Certification",
    issuerOrg: "Google Cloud & Capacity Connect Academy",
    issuedAt: "August 8, 2026",
    verificationCode: "CERT-CC-84920",
    score: 95,
    masteredCompetencies: ["Cloud Architecture (L3)", "Kubernetes (L3)"],
    credentialLedgerHash: "8f92a17cb041d8e624fbb4e2098d6ac47385a498b31a297e682d3e91a0c4f821",
  },
  {
    id: "cert-2",
    userId: "usr-priya",
    recipientName: "Priya Sharma",
    courseOrPathId: "crs-azure-az305",
    pathTitle: "Microsoft Azure: Solutions Architect Expert (AZ-305)",
    issuerOrg: "Microsoft & Capacity Connect Academy",
    issuedAt: "August 24, 2026",
    verificationCode: "CERT-CC-91823",
    score: 98,
    masteredCompetencies: ["Azure Solutions (L4)", "Zero Trust Security (L4)"],
    credentialLedgerHash: "7b41e98da012f45c92ebd810237e1ba58492d194c208f71a938c5b02f837e190",
  },
];

export const SEEDED_BADGES: BadgeItem[] = [
  {
    id: "bdg-1",
    title: "14-Day Streak Master",
    description: "Completed active learning sessions for 14 consecutive calendar days.",
    iconName: "Flame",
    category: "streak",
    earnedAt: "August 28, 2026",
    rarity: "Epic",
  },
];

export const SEEDED_SESSIONS: CalendarSession[] = [
  {
    id: "sess-1",
    title: "Google Cloud & Microsoft Azure Multi-Cloud Hybrid Architecture Workshop",
    trainerName: "Marcus Vance",
    trainerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    trainerTitle: "Principal L&D Architect & Google Cloud Fellow",
    date: "Tomorrow (Aug 31)",
    time: "3:00 PM – 4:30 PM IST",
    capacity: 25,
    enrolled: 21,
    enrolledUserIds: ["usr-alex-learner"],
    type: "Hands-On Cloud Lab",
    locationOrUrl: "Google Cloud Sandbox Terminal #4",
    competencyId: "comp-k8s",
  },
];
