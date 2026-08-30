export type RoleType = "learner" | "manager" | "trainer" | "admin";

export interface JobRole {
  id: string;
  title: string;
  department: string;
  companyBenchmark?: string;
  description: string;
  requiredCompetencies: { competencyId: string; requiredLevel: number }[];
}

export interface Competency {
  id: string;
  name: string;
  category: "Cloud & Infrastructure" | "Software Engineering" | "Product & Agile" | "Leadership & Collaboration" | "AI & Machine Learning";
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
  provider: "Google Cloud" | "AWS" | "Meta" | "Microsoft Azure" | "NVIDIA DLI" | "Netflix Tech" | "HashiCorp" | "Uber Engineering";
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
  badgeEarned?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  provider: string;
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
// 1. ENTERPRISE COMPETENCIES (15 Skills across 5 Domains)
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
    id: "comp-mentor",
    name: "Engineering Mentorship & Technical Coaching",
    category: "Leadership & Collaboration",
    description: "Career ladder progression, 1-on-1 coaching frameworks, pair programming, and talent sponsorship.",
    levels: [
      { level: 1, title: "Novice", description: "Onboards new team members and conducts thorough code reviews." },
      { level: 2, title: "Practitioner", description: "Mentors junior engineers and helps them complete technical projects." },
      { level: 3, title: "Advanced", description: "Coaches mid-level engineers to Senior promotions with growth roadmaps." },
      { level: 4, title: "Expert", description: "Builds engineering career ladders, internship pipelines, and coaching rings." },
      { level: 5, title: "Principal / Fellow", description: "Develops future technical executives and organizational leadership." },
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
    companyBenchmark: "Google L3 / Meta E3 Benchmark",
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
    id: "role-devops-lead",
    title: "DevOps & Site Reliability Lead (L4)",
    department: "Operations & Security",
    companyBenchmark: "Netflix SRE / Stripe Infrastructure Lead Benchmark",
    description: "Directs CI/CD automation, chaos engineering experiments, SLO/SLA monitoring, and enterprise incident response.",
    requiredCompetencies: [
      { competencyId: "comp-k8s", requiredLevel: 4 },
      { competencyId: "comp-terraform", requiredLevel: 4 },
      { competencyId: "comp-sec", requiredLevel: 4 },
      { competencyId: "comp-cloud-arch", requiredLevel: 3 },
      { competencyId: "comp-postmortem", requiredLevel: 4 },
    ],
  },
  {
    id: "role-tpm",
    title: "Staff Technical Product Manager (L5)",
    department: "Product & Strategy",
    companyBenchmark: "Google Staff TPM / Microsoft Principal PM Benchmark",
    description: "Defines product strategy, prioritizes technical roadmaps, calculates business ROI, and leads agile engineering delivery.",
    requiredCompetencies: [
      { competencyId: "comp-discovery", requiredLevel: 4 },
      { competencyId: "comp-analytics", requiredLevel: 4 },
      { competencyId: "comp-agile", requiredLevel: 4 },
      { competencyId: "comp-mentor", requiredLevel: 4 },
      { competencyId: "comp-api", requiredLevel: 3 },
    ],
  },
];

// -------------------------------------------------------------
// 3. ENTERPRISE MNC COURSES WITH COMPLETE MULTI-QUESTION ASSESSMENTS & PRACTICAL LABS
// -------------------------------------------------------------
export const SEEDED_COURSES: Course[] = [
  {
    id: "crs-k8s-prod",
    title: "Production Kubernetes: Multi-Region Microservices & Istio Mesh",
    provider: "Google Cloud",
    category: "Cloud & Infrastructure",
    competencyIds: ["comp-k8s", "comp-cloud-arch"],
    competencyGainLevel: 3,
    createdBy: "usr-marcus-trainer",
    authorName: "Marcus Vance",
    authorRole: "Principal Cloud Architect (ex-Google)",
    isMandatory: true,
    duration: "4.5 Hours",
    rating: 4.96,
    enrolledCount: 142,
    badgeEarned: "Kubernetes Cluster Commander",
    coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80",
    description: "Master enterprise container orchestration, Horizontal Pod Autoscaling (HPA), zero-downtime rolling deployments, and mTLS service mesh routing on GKE/EKS.",
    modules: [
      {
        id: "mod-k8s-1",
        title: "1. Core Pod Invariants, ReplicaSets & Rolling Deployments",
        order: 1,
        type: "text",
        duration: "35 min",
        textMarkdown: `### Architectural Overview: Kubernetes Deployments

In production Kubernetes clusters, a **Deployment** orchestrates declarative updates for Pods and ReplicaSets. 

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-gateway
  namespace: production
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: payment-gateway
    spec:
      containers:
      - name: gateway
        image: gcr.io/enterprise-corp/payment-service:v2.4.1
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "200m"
            memory: "256Mi"
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
\`\`\`

#### Key Invariants:
1. **Zero-Downtime Guarantee**: By setting \`maxUnavailable: 0\`, Kubernetes ensures at least 100% of desired pods are serving traffic before terminating old replicas.
2. **Readiness vs Liveness**: Readiness determines when a pod receives traffic from the Service endpoint controller; Liveness triggers a container restart upon deadlock.`,
      },
      {
        id: "mod-k8s-2",
        title: "2. Practical Lab Assignment: Write Production Deployment Manifest",
        order: 2,
        type: "lab",
        duration: "45 min",
        assignment: {
          id: "assign-k8s-1",
          title: "Zero-Downtime Rolling Deployment with Resource Limits",
          language: "yaml",
          instructions: "Complete the Kubernetes YAML manifest below. Ensure `maxUnavailable: 0`, `replicas: 4`, container port `8080`, and configure a valid `readinessProbe` checking `/healthz`.",
          starterCode: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-service
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: auth-service
  template:
    metadata:
      labels:
        app: auth-service
    spec:
      containers:
      - name: auth
        image: registry.enterprise.io/auth:v3.2.0
        ports:
        - containerPort: 8080
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080`,
          expectedOutput: "Deployment validation passed. 4/4 Pods successfully scheduled with zero-downtime rolling strategy.",
          testCases: [
            { name: "Verify Strategy maxUnavailable is 0", input: "strategy.rollingUpdate.maxUnavailable", expected: "0" },
            { name: "Verify Replicas count is 4", input: "spec.replicas", expected: "4" },
            { name: "Verify Readiness Probe path is /healthz", input: "readinessProbe.httpGet.path", expected: "/healthz" },
          ],
        },
      },
      {
        id: "mod-k8s-3",
        title: "3. Certification-Grade Assessment: Kubernetes Invariants",
        order: 3,
        type: "quiz",
        duration: "30 min",
        quiz: [
          {
            id: "q-k8s-1",
            question: "When performing a rolling update with `maxSurge: 25%` and `maxUnavailable: 0` on an 8-replica deployment, what is the maximum number of pods that can exist simultaneously during the rollout?",
            options: [
              "8 pods (no extra pods are allowed)",
              "10 pods (8 + 25% surge of 2 pods)",
              "12 pods (8 + 4 unavailable pods)",
              "16 pods (double the original count)",
            ],
            correctIndex: 1,
            explanation: "`maxSurge: 25%` on 8 replicas equals 2 additional pods (8 * 0.25 = 2). Therefore, Kubernetes can create up to 10 pods total during the rollout process.",
            topicTag: "Deployment Strategies",
          },
          {
            id: "q-k8s-2",
            question: "An application container becomes deadlocked and stops processing requests, but the TCP port remains open. Which Kubernetes probe will restart the container?",
            options: [
              "ReadinessProbe with HTTP check",
              "StartupProbe with exec command",
              "LivenessProbe configured to test internal application health",
              "Node Controller Eviction Protocol",
            ],
            correctIndex: 2,
            explanation: "The LivenessProbe is specifically designed to restart deadlocked containers. The ReadinessProbe only removes the pod from receiving traffic without restarting it.",
            topicTag: "Probes & Reliability",
          },
          {
            id: "q-k8s-3",
            question: "What is the primary function of a Kubernetes Ingress Controller (e.g. NGINX or Traefik)?",
            options: [
              "To assign physical IP addresses to cluster worker nodes",
              "To route external Layer 7 (HTTP/HTTPS) traffic to internal ClusterIP Services based on hostnames and paths",
              "To encrypt container file system volumes at rest",
              "To compile container source code into binary images",
            ],
            correctIndex: 1,
            explanation: "An Ingress Controller is a Layer 7 reverse proxy that translates Ingress resource rules into routing configurations that forward inbound HTTP/HTTPS traffic to internal Kubernetes Services.",
            topicTag: "Networking",
          },
          {
            id: "q-k8s-4",
            question: "Which resource object prevents Pods in namespace 'finance' from receiving unauthenticated network traffic from Pods in namespace 'marketing'?",
            options: [
              "HorizontalPodAutoscaler",
              "ConfigMap with TLS certs",
              "NetworkPolicy with ingress ingress namespaceSelector rules",
              "PodDisruptionBudget",
            ],
            correctIndex: 2,
            explanation: "NetworkPolicy resources define firewall rules at the pod level within the cluster, allowing fine-grained isolation between namespaces via label and namespace selectors.",
            topicTag: "Security & Isolation",
          },
        ],
      },
    ],
  },

  {
    id: "crs-aws-arch",
    title: "AWS Certified Solutions Architect: Enterprise Multi-Region Systems",
    provider: "AWS",
    category: "Cloud & Infrastructure",
    competencyIds: ["comp-cloud-arch", "comp-sec"],
    competencyGainLevel: 3,
    createdBy: "usr-marcus-trainer",
    authorName: "Sarah Chen",
    authorRole: "Director of Systems (ex-AWS Principal)",
    isMandatory: false,
    duration: "5.0 Hours",
    rating: 4.98,
    enrolledCount: 189,
    badgeEarned: "AWS Cloud Master Architect",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    description: "Design fault-tolerant architectures utilizing Amazon Route 53 latency routing, DynamoDB Global Tables, cross-region S3 replication, and AWS KMS envelope encryption.",
    modules: [
      {
        id: "mod-aws-1",
        title: "1. Global Multi-Region Active-Active Topology",
        order: 1,
        type: "text",
        duration: "40 min",
        textMarkdown: `### Enterprise AWS Architecture: Active-Active Multi-Region

Designing for 99.999% availability requires multi-region data replication and global DNS routing.

\`\`\`
[Global Clients] ---> [Amazon Route 53 (Latency / Geolocation Routing)]
                             |
             +---------------+---------------+
             |                               |
             v                               v
    [Region us-east-1]              [Region eu-west-1]
   Application Load Balancer       Application Load Balancer
             |                               |
      [ECS Fargate Tasks]             [ECS Fargate Tasks]
             |                               |
             +------[DynamoDB Global Tables]-+
                    (Active-Active Multi-Master)
\`\`\`

#### Resiliency Invariants:
1. **DynamoDB Global Tables**: Provides multi-master bi-directional replication across selected AWS regions in sub-second latency.
2. **KMS Envelope Encryption**: Data is encrypted using local Data Encryption Keys (DEKs), while DEKs are encrypted using Customer Managed Keys (CMKs) stored in hardware security modules (HSM).`,
      },
      {
        id: "mod-aws-2",
        title: "2. Practical Lab: Configure Multi-Region Failover Architecture",
        order: 2,
        type: "lab",
        duration: "40 min",
        assignment: {
          id: "assign-aws-1",
          title: "Terraform Multi-Region Route 53 Failover Routing",
          language: "hcl",
          instructions: "Define a Route 53 Health Check and Failover Record routing primary traffic to `us-east-1` and disaster recovery to `us-west-2` upon health check failure.",
          starterCode: `resource "aws_route53_health_check" "primary" {
  fqdn              = "api.enterprise.io"
  port              = 443
  type              = "HTTPS"
  resource_path     = "/health"
  failure_threshold = "3"
  request_interval  = "10"
}

resource "aws_route53_record" "primary" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "api.enterprise.io"
  type    = "A"

  failover_routing_policy {
    type = "PRIMARY"
  }

  set_identifier = "primary-us-east-1"
  health_check_id = aws_route53_health_check.primary.id
}`,
          expectedOutput: "Route 53 DNS Failover topology validated. Automated DR failover active.",
          testCases: [
            { name: "Verify Health Check Type is HTTPS", input: "aws_route53_health_check.primary.type", expected: "HTTPS" },
            { name: "Verify Failover Policy is PRIMARY", input: "failover_routing_policy.type", expected: "PRIMARY" },
          ],
        },
      },
      {
        id: "mod-aws-3",
        title: "3. Certification Assessment: AWS Architecture Scenarios",
        order: 3,
        type: "quiz",
        duration: "30 min",
        quiz: [
          {
            id: "q-aws-1",
            question: "An e-commerce company requires sub-second global database write access in both North America and Europe with conflict resolution based on last-writer-wins. Which database service meets this requirement?",
            options: [
              "Amazon RDS PostgreSQL with a read replica in Europe",
              "Amazon DynamoDB Global Tables with multi-region replication",
              "Amazon Redshift Serverless Cluster",
              "Amazon S3 Glacier Deep Archive",
            ],
            correctIndex: 1,
            explanation: "DynamoDB Global Tables allows multi-region active-active read and write operations across regions with automated conflict resolution using last-writer-wins timestamping.",
            topicTag: "Database & Storage",
          },
          {
            id: "q-aws-2",
            question: "How does AWS KMS Envelope Encryption protect large files (e.g. 50GB dataset) stored in Amazon S3?",
            options: [
              "It uploads the 50GB file directly into the KMS hardware module for encryption",
              "KMS generates a plaintext Data Key to encrypt the file locally, then encrypts the Data Key with a KMS CMK and stores the encrypted key alongside the ciphertext",
              "It compresses the file using gzip before applying SSL/TLS in transit",
              "It stores the encryption password in plaintext inside the S3 bucket metadata",
            ],
            correctIndex: 1,
            explanation: "KMS cannot encrypt payloads larger than 4KB directly. Envelope encryption uses KMS to generate and protect a Data Encryption Key (DEK), which is used locally to encrypt large datasets.",
            topicTag: "Security & Cryptography",
          },
          {
            id: "q-aws-3",
            question: "Which AWS Route 53 routing policy routes users to the AWS endpoint that provides the lowest network round-trip time?",
            options: [
              "Weighted Routing Policy",
              "Latency-Based Routing Policy",
              "Multi-Value Answer Policy",
              "Simple Routing Policy",
            ],
            correctIndex: 1,
            explanation: "Latency-based routing directs user DNS requests to the AWS region that delivers the lowest network latency based on periodic worldwide measurements.",
            topicTag: "Networking & DNS",
          },
          {
            id: "q-aws-4",
            question: "A financial service requires asynchronous transaction processing where messages MUST be processed strictly in the exact order they are received, with zero duplicates. Which queue should be used?",
            options: [
              "Amazon SQS Standard Queue",
              "Amazon SQS FIFO (First-In-First-Out) Queue with Message Deduplication ID",
              "Amazon SNS Standard Topic",
              "Amazon Simple Email Service (SES)",
            ],
            correctIndex: 1,
            explanation: "SQS FIFO queues guarantee exact-order delivery (FIFO) and exactly-once processing when message deduplication IDs or content-based deduplication is enabled.",
            topicTag: "Event Architecture",
          },
        ],
      },
    ],
  },

  {
    id: "crs-meta-react",
    title: "Meta Front-End Architecture: React 18, Next.js App Router & Server Components",
    provider: "Meta",
    category: "Software Engineering",
    competencyIds: ["comp-react", "comp-ts"],
    competencyGainLevel: 3,
    createdBy: "usr-marcus-trainer",
    authorName: "Alex Rivera",
    authorRole: "Staff Software Engineer (ex-Meta)",
    isMandatory: false,
    duration: "4.0 Hours",
    rating: 4.95,
    enrolledCount: 164,
    badgeEarned: "React & Next.js Core Architect",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80",
    description: "Deep dive into React Server Components (RSC), hydration boundaries, streaming SSR with Suspense, and full-stack type safety with TypeScript.",
    modules: [
      {
        id: "mod-react-1",
        title: "1. Mental Model: React Server Components vs Client Components",
        order: 1,
        type: "text",
        duration: "30 min",
        textMarkdown: `### React Server Components (RSC) Architecture

In modern Next.js (App Router), components are **Server Components** by default.

\`\`\`tsx
// app/dashboard/page.tsx (Server Component - Zero Client JS)
import { db } from "@/lib/db";
import { UserSkillRadar } from "@/components/UserSkillRadar"; // 'use client' component

export default async function DashboardPage({ params }: { params: { userId: string } }) {
  // Direct DB access on the server without client API leaks!
  const user = await db.user.findUnique({ where: { id: params.userId } });

  return (
    <div className="p-8">
      <h1>Welcome {user.name}</h1>
      {/* Interactive boundary passed as client leaf */}
      <UserSkillRadar initialData={user.competencies} />
    </div>
  );
}
\`\`\`

#### Core Invariants:
1. **Zero Bundle Impact**: Code imported inside a Server Component is NEVER sent to the client browser.
2. **Streaming with Suspense**: Instant First Contentful Paint (FCP) while slow asynchronous data chunks stream over HTTP chunked transfer encoding.`,
      },
      {
        id: "mod-react-2",
        title: "2. Practical Lab: Implement Server Action with Zod Validation",
        order: 2,
        type: "lab",
        duration: "35 min",
        assignment: {
          id: "assign-react-1",
          title: "Next.js Server Action with Runtime Schema Validation",
          language: "typescript",
          instructions: "Implement a type-safe Server Action that validates input payload using Zod and updates the competency rating.",
          starterCode: `"use server";

import { z } from "zod";

const UpdateCompetencySchema = z.object({
  userId: z.string().min(3),
  competencyId: z.string().startsWith("comp-"),
  newLevel: z.number().min(1).max(5),
});

export async function updateCompetencyLevel(formData: unknown) {
  const parsed = UpdateCompetencySchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  // Simulated DB transaction
  return { success: true, data: parsed.data };
}`,
          expectedOutput: "Server Action successfully compiled and verified with strict type guards.",
          testCases: [
            { name: "Reject Level > 5", input: "{ userId: 'usr-1', competencyId: 'comp-react', newLevel: 6 }", expected: "Validation Failure" },
            { name: "Accept Valid L3", input: "{ userId: 'usr-1', competencyId: 'comp-react', newLevel: 3 }", expected: "Success" },
          ],
        },
      },
      {
        id: "mod-react-3",
        title: "3. Certification Assessment: React 18 & Next.js Performance",
        order: 3,
        type: "quiz",
        duration: "25 min",
        quiz: [
          {
            id: "q-react-1",
            question: "Why does importing a heavy library (e.g. `marked` or `shiki`) inside a React Server Component NOT increase the client JavaScript bundle size?",
            options: [
              "Because the browser automatically strips unused JavaScript at runtime",
              "Because Server Components execute exclusively on the server and transmit rendered HTML/RSC payload, not the library's JavaScript code",
              "Because React converts the library into a WebAssembly binary",
              "Because Next.js caches the library in the user's localStorage",
            ],
            correctIndex: 1,
            explanation: "Server Components run only during build or on the Node.js server. Their source code and dependencies are never packaged into client-side JS bundles.",
            topicTag: "RSC & Bundle Optimization",
          },
          {
            id: "q-react-2",
            question: "What directive must be placed at the very top of a file to declare that its exports can be used for interactive DOM events (e.g. `onClick`, `useState`, `useEffect`) in Next.js App Router?",
            options: [
              "`'use server'`",
              "`'use client'`",
              "`'use interactive'`",
              "`'use react'`",
            ],
            correctIndex: 1,
            explanation: "`'use client'` marks the boundary between server and client component trees, allowing the use of state hooks and browser event listeners.",
            topicTag: "Client Boundaries",
          },
          {
            id: "q-react-3",
            question: "What is the primary benefit of wrapping an asynchronous slow-loading component in `<Suspense fallback={<Skeleton />}>` in Next.js?",
            options: [
              "It converts the database query to run on client Web Workers",
              "It enables streaming SSR, allowing the rest of the page to render instantly while the slow component streams in once resolved",
              "It disables all CSS rendering until data arrives",
              "It prevents network errors by retrying the request 100 times",
            ],
            correctIndex: 1,
            explanation: "Streaming SSR with Suspense unblocks the page shell, sending initial HTML immediately and streaming slow dynamic components as soon as their promises resolve.",
            topicTag: "Streaming SSR",
          },
          {
            id: "q-react-4",
            question: "How does React 18's automatic batching differ from React 17?",
            options: [
              "React 18 batches state updates only inside setTimeout",
              "React 18 automatically batches multiple state updates across promises, timeouts, and native event handlers into a single re-render",
              "React 18 removes re-rendering completely",
              "React 18 batches network requests instead of state",
            ],
            correctIndex: 1,
            explanation: "In React 18, all state updates (including those inside async callbacks, promises, and timeouts) are automatically batched together for optimal rendering performance.",
            topicTag: "React 18 Concurrency",
          },
        ],
      },
    ],
  },

  {
    id: "crs-genai-rag",
    title: "NVIDIA Generative AI: Advanced RAG, Vector Embeddings & LLM Fine-Tuning",
    provider: "NVIDIA DLI",
    category: "AI & Machine Learning",
    competencyIds: ["comp-genai", "comp-mlops"],
    competencyGainLevel: 3,
    createdBy: "usr-marcus-trainer",
    authorName: "Dr. Elena Rostova",
    authorRole: "Chief AI Architect & Fellow",
    isMandatory: false,
    duration: "5.5 Hours",
    rating: 4.99,
    enrolledCount: 215,
    badgeEarned: "NVIDIA Certified GenAI Engineer",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80",
    description: "Construct production RAG architectures using dense vector retrieval (Qdrant/Pinecone), semantic caching, hybrid BM25 search, and LoRA fine-tuning with NVIDIA TensorRT-LLM.",
    modules: [
      {
        id: "mod-genai-1",
        title: "1. Advanced RAG Architecture: Dense Retrieval & Semantic Chunking",
        order: 1,
        type: "text",
        duration: "45 min",
        textMarkdown: `### Enterprise Retrieval-Augmented Generation (RAG)

Standard fixed-size text chunking loses semantic coherence. Production systems use **Recursive Character Splitting** with contextual document embeddings.

\`\`\`
[Query] ---> [Embedding Model (text-embedding-3-large)]
                    |
                    v (Dense Vector 3072d)
           [Hybrid Search: Dense Vector + Sparse BM25]
                    |
                    v (Top 20 Documents)
             [Cross-Encoder Reranker]
                    |
                    v (Top 3 Precision Contexts)
        [LLM Synthesis with Structured Guardrails]
\`\`\`

#### Key Invariants:
1. **Hybrid Search (Dense + Sparse)**: Combines dense semantic vector cosine similarity with exact BM25 keyword matching to prevent hallucination on technical acronyms.
2. **Cross-Encoder Reranking**: Re-scores top retrieved candidates to maximize signal-to-noise ratio in context window.`,
      },
      {
        id: "mod-genai-2",
        title: "2. Practical Lab: Implement Cosine Similarity RAG Matcher",
        order: 2,
        type: "lab",
        duration: "40 min",
        assignment: {
          id: "assign-genai-1",
          title: "Vector Cosine Similarity Calculation & Ranking",
          language: "typescript",
          instructions: "Implement the mathematical cosine similarity function between a query vector and candidate document embeddings.",
          starterCode: `export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) throw new Error("Vector dimension mismatch");

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}`,
          expectedOutput: "Cosine similarity algorithm verified with Unit Vector and Orthogonal Vector test matrices.",
          testCases: [
            { name: "Orthogonal Vectors return 0.0", input: "[1, 0] and [0, 1]", expected: "0.0" },
            { name: "Identical Vectors return 1.0", input: "[0.5, 0.5] and [0.5, 0.5]", expected: "1.0" },
          ],
        },
      },
      {
        id: "mod-genai-3",
        title: "3. Certification Assessment: GenAI & RAG Invariants",
        order: 3,
        type: "quiz",
        duration: "30 min",
        quiz: [
          {
            id: "q-genai-1",
            question: "Why is Hybrid Search (combining Dense Vector search + Sparse BM25 keyword search) critical when retrieving technical codebases or medical terminology?",
            options: [
              "Because dense vector embeddings always compress files to 10% of their size",
              "Because dense embeddings can miss exact matching technical IDs (e.g. error code `ERR_502_BAD_GATEWAY`), while BM25 guarantees keyword precision",
              "Because BM25 runs only on GPU tensor cores",
              "Because dense embeddings cannot store strings with vowels",
            ],
            correctIndex: 1,
            explanation: "Dense vectors capture broad semantic meaning but often fail on exact alphanumeric identifiers or code symbols. Hybrid search combines semantic recall with exact keyword precision.",
            topicTag: "RAG & Search Retrieval",
          },
          {
            id: "q-genai-2",
            question: "What is the primary architectural purpose of a Cross-Encoder Reranker in a two-stage RAG pipeline?",
            options: [
              "To translate English prompts into French before querying the vector store",
              "To evaluate query and retrieved documents simultaneously, re-scoring top candidates with higher precision than bi-encoder embeddings",
              "To delete duplicate documents from the SSD hard drive",
              "To encrypt the LLM weights in memory",
            ],
            correctIndex: 1,
            explanation: "Bi-encoders create fast embeddings independently, but Cross-Encoders pass query and document together through attention layers to produce higher-quality relevance rankings for the final LLM context.",
            topicTag: "Reranking & Precision",
          },
          {
            id: "q-genai-3",
            question: "What is Parameter-Efficient Fine-Tuning (PEFT) with LoRA (Low-Rank Adaptation)?",
            options: [
              "Training all 70 billion parameters from scratch using random initialization",
              "Freezing base model weights and training small low-rank adapter matrices in attention layers, reducing VRAM usage by over 70%",
              "Converting floating point weights to ASCII text files",
              "Replacing the neural network with a decision tree",
            ],
            correctIndex: 1,
            explanation: "LoRA freezes the pre-trained weights and injects trainable rank decomposition matrices into transformer layers, enabling fine-tuning on consumer/single GPUs with minimal compute cost.",
            topicTag: "Fine-Tuning & Model Ops",
          },
          {
            id: "q-genai-4",
            question: "How does Semantic Caching improve enterprise LLM cost and latency?",
            options: [
              "By caching responses based on vector similarity thresholds (e.g. cosine distance > 0.95), serving identical or semantically equivalent questions instantly without querying the LLM",
              "By storing all prompts in a browser cookie",
              "By increasing GPU clock speeds to 10GHz",
              "By turning off the LLM server during night hours",
            ],
            correctIndex: 0,
            explanation: "Semantic caching embeds incoming prompts and queries a vector store for previous responses with high cosine similarity, cutting latency to <10ms and saving API token costs.",
            topicTag: "LLMOps & Cost Optimization",
          },
        ],
      },
    ],
  },

  {
    id: "crs-netflix-distributed",
    title: "Netflix Distributed Systems: High-Throughput Microservices & Chaos Engineering",
    provider: "Netflix Tech",
    category: "Cloud & Infrastructure",
    competencyIds: ["comp-cloud-arch", "comp-postmortem"],
    competencyGainLevel: 3,
    createdBy: "usr-marcus-trainer",
    authorName: "Sarah Chen",
    authorRole: "Director of Reliability Engineering",
    isMandatory: false,
    duration: "4.0 Hours",
    rating: 4.97,
    enrolledCount: 138,
    badgeEarned: "Chaos & Reliability Champion",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    description: "Learn how Netflix engineers survive entire AWS zone outages with Chaos Monkey, circuit breakers (Resilience4j), rate limiters, and bulkhead patterns.",
    modules: [
      {
        id: "mod-netflix-1",
        title: "1. Circuit Breakers, Bulkheads & Graceful Degradation",
        order: 1,
        type: "text",
        duration: "30 min",
        textMarkdown: `### Distributed Resiliency Patterns

When a downstream dependency experiences high latency, upstream thread pools become exhausted, causing cascading cluster-wide failures.

#### Resiliency Invariants:
1. **Circuit Breaker State Machine**:
   - **CLOSED**: Requests flow normally. Failures increment an error counter.
   - **OPEN**: Error rate exceeds threshold (e.g. 50%). All calls fail immediately with fallback responses.
   - **HALF-OPEN**: Periodic trial requests test if downstream service has recovered.
2. **Bulkhead Pattern**: Isolates thread pools and memory allocations per dependency so a failure in recommendations never impacts video streaming playback.`,
      },
      {
        id: "mod-netflix-2",
        title: "2. Practical Lab: Build Resilient Circuit Breaker State Machine",
        order: 2,
        type: "lab",
        duration: "45 min",
        assignment: {
          id: "assign-netflix-1",
          title: "TypeScript Circuit Breaker Implementation",
          language: "typescript",
          instructions: "Implement the `execute` method with failure counting, tripping state from CLOSED to OPEN after 3 consecutive failures.",
          starterCode: `export class CircuitBreaker {
  private state: "CLOSED" | "OPEN" | "HALF_OPEN" = "CLOSED";
  private failureCount = 0;
  private readonly threshold = 3;

  async execute<T>(fn: () => Promise<T>, fallback: () => T): Promise<T> {
    if (this.state === "OPEN") {
      return fallback();
    }
    try {
      const result = await fn();
      this.failureCount = 0;
      this.state = "CLOSED";
      return result;
    } catch (err) {
      this.failureCount++;
      if (this.failureCount >= this.threshold) {
        this.state = "OPEN";
      }
      return fallback();
    }
  }
}`,
          expectedOutput: "Circuit breaker passes all 3 threshold tests and successfully returns fallback responses when OPEN.",
          testCases: [
            { name: "3 Failures trip state to OPEN", input: "3 consecutive throws", expected: "OPEN" },
            { name: "Fallback executed when OPEN", input: "call when OPEN", expected: "Fallback Returned" },
          ],
        },
      },
      {
        id: "mod-netflix-3",
        title: "3. Certification Assessment: Distributed Systems Failure Modes",
        order: 3,
        type: "quiz",
        duration: "25 min",
        quiz: [
          {
            id: "q-netflix-1",
            question: "What is the 'Thundering Herd' problem in distributed caching, and how does Cache Stampede protection prevent it?",
            options: [
              "When thousands of concurrent requests miss a cold or expired cache key simultaneously and all hit the database, causing database crash. Mitigated by mutex locking or probabilistic early recomputation (XFetch)",
              "When an AWS datacenter runs out of electricity",
              "When hard drives run out of physical sector tracks",
              "When network packets arrive out of order",
            ],
            correctIndex: 0,
            explanation: "When a popular cache key expires, high concurrency can overwhelm the primary database. Mutex locks or probabilistic early background refreshes ensure only one process regenerates the key.",
            topicTag: "Distributed Caching",
          },
          {
            id: "q-netflix-2",
            question: "In the Bulkhead architectural pattern, what is being isolated?",
            options: [
              "Source code repositories into separate git branches",
              "Compute resources (such as thread pools, memory, and connection pools) so that failure in one dependency cannot consume all system resources and starve others",
              "Physical servers into waterproof containers",
              "User passwords into MD5 hashes",
            ],
            correctIndex: 1,
            explanation: "Named after watertight compartments in ships, bulkheads isolate resources per downstream service, ensuring a slow third-party service cannot exhaust all available server threads.",
            topicTag: "Resiliency Patterns",
          },
          {
            id: "q-netflix-3",
            question: "What is the primary philosophy behind Chaos Engineering (e.g. Chaos Monkey / Simian Army)?",
            options: [
              "To randomly delete production databases without backups",
              "To proactively inject controlled failures in production to discover architectural weaknesses before they cause customer-facing outages",
              "To write messy code without unit tests",
              "To turn off server cooling systems",
            ],
            correctIndex: 1,
            explanation: "Chaos engineering tests system invariants and automatic failover mechanisms by intentionally terminating instances and introducing network latency during business hours when engineers are available.",
            topicTag: "Chaos Engineering",
          },
        ],
      },
    ],
  },
];

// -------------------------------------------------------------
// 4. ROLE-BASED LEARNING PATHS (MNC Career Sequences)
// -------------------------------------------------------------
export const SEEDED_LEARNING_PATHS: LearningPath[] = [
  {
    id: "path-sr-cloud-arch",
    title: "Senior Cloud Solutions Architect Track",
    provider: "Google Cloud & AWS Enterprise",
    targetJobRoleId: "role-sr-cloud-arch",
    targetRoleTitle: "Senior Cloud Solutions Architect (L4)",
    estimatedHours: 24,
    badgeReward: "Principal Cloud Master",
    certificateTitle: "Certified Senior Cloud Solutions Architect",
    description: "End-to-end curriculum spanning multi-region Kubernetes orchestration, distributed active-active databases, Terraform IaC, and Zero Trust security.",
    courseIds: ["crs-k8s-prod", "crs-aws-arch", "crs-netflix-distributed"],
  },
  {
    id: "path-genai-lead",
    title: "Generative AI & MLOps Engineering Track",
    provider: "NVIDIA DLI & Meta AI",
    targetJobRoleId: "role-ai-engineer",
    targetRoleTitle: "Senior Generative AI & MLOps Engineer (L4)",
    estimatedHours: 28,
    badgeReward: "NVIDIA GenAI Pioneer",
    certificateTitle: "Certified Enterprise Generative AI Architect",
    description: "Master vector RAG pipelines, dense embeddings, semantic caching, fine-tuning open-source LLMs, and low-latency inference cluster serving.",
    courseIds: ["crs-genai-rag", "crs-k8s-prod", "crs-meta-react"],
  },
  {
    id: "path-frontend-lead",
    title: "Modern Front-End & Fullstack Architect Track",
    provider: "Meta & Vercel Enterprise",
    targetJobRoleId: "role-fullstack-l2",
    targetRoleTitle: "Fullstack Developer (L2)",
    estimatedHours: 18,
    badgeReward: "Fullstack Master Architect",
    certificateTitle: "Certified Fullstack & Next.js Systems Architect",
    description: "Master React Server Components (RSC), TypeScript type systems, streaming SSR, and microservice REST/GraphQL APIs.",
    courseIds: ["crs-meta-react", "crs-k8s-prod"],
  },
];

// -------------------------------------------------------------
// 5. SEEDED ENTERPRISE USERS WITH REAL PASSWORDS & CREDENTIALS
// -------------------------------------------------------------
export const SEEDED_LEARNER_PROFILE: UserProfile = {
  id: "usr-alex-learner",
  name: "Alex Rivera",
  email: "alex.rivera@capacityconnect.io",
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
  completedCoursesCount: 4,
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
    completedCoursesCount: 2,
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
    password: "Passcode@2026",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    role: "learner",
    department: "Engineering",
    jobRoleId: "role-sr-cloud-arch",
    jobTitle: "Senior DevOps Engineer (L4)",
    organization: "Capacity Connect Enterprise",
    employeeId: "EMP-ENG-8494",
    managerId: "usr-sarah-manager",
    points: 2650,
    streakDays: 28,
    completedCoursesCount: 8,
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
    id: "usr-kai",
    name: "Kai Tanaka",
    email: "kai.tanaka@capacityconnect.io",
    password: "Passcode@2026",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    role: "learner",
    department: "Engineering",
    jobRoleId: "role-ai-engineer",
    jobTitle: "AI Platform Engineer (L3)",
    organization: "Capacity Connect Enterprise",
    employeeId: "EMP-ENG-8495",
    managerId: "usr-sarah-manager",
    points: 1980,
    streakDays: 19,
    completedCoursesCount: 5,
    competencies: [
      { competencyId: "comp-genai", currentLevel: 4, lastAssessedAt: "2 days ago" },
      { competencyId: "comp-mlops", currentLevel: 3, lastAssessedAt: "1 week ago" },
      { competencyId: "comp-ts", currentLevel: 3, lastAssessedAt: "2 weeks ago" },
      { competencyId: "comp-cloud-arch", currentLevel: 3, lastAssessedAt: "3 weeks ago" },
      { competencyId: "comp-k8s", currentLevel: 3, lastAssessedAt: "1 month ago" },
    ],
  },
];

// -------------------------------------------------------------
// 6. SEEDED ENROLLMENTS & KNOWLEDGE SHARING
// -------------------------------------------------------------
export const SEEDED_ENROLLMENTS: Enrollment[] = [
  {
    id: "enr-alex-k8s",
    userId: "usr-alex-learner",
    courseId: "crs-k8s-prod",
    status: "in_progress",
    progressPercent: 66,
    completedModuleIds: ["mod-k8s-1", "mod-k8s-2"],
    startedAt: "2026-08-10",
  },
  {
    id: "enr-alex-react",
    userId: "usr-alex-learner",
    courseId: "crs-meta-react",
    status: "completed",
    progressPercent: 100,
    completedModuleIds: ["mod-react-1", "mod-react-2", "mod-react-3"],
    startedAt: "2026-08-01",
    completedAt: "2026-08-08",
    score: 95,
    assignmentPassed: true,
  },
  {
    id: "enr-alex-genai",
    userId: "usr-alex-learner",
    courseId: "crs-genai-rag",
    status: "in_progress",
    progressPercent: 33,
    completedModuleIds: ["mod-genai-1"],
    startedAt: "2026-08-15",
  },
  {
    id: "enr-alex-aws",
    userId: "usr-alex-learner",
    courseId: "crs-aws-arch",
    status: "in_progress",
    progressPercent: 33,
    completedModuleIds: ["mod-aws-1"],
    startedAt: "2026-08-20",
  },
  {
    id: "enr-devon-k8s",
    userId: "usr-devon",
    courseId: "crs-k8s-prod",
    status: "overdue",
    progressPercent: 20,
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
    authorRole: "Senior DevOps Engineer (L4)",
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
  {
    id: "art-2",
    title: "Zero-Downtime Next.js Streaming SSR & React Server Component Caching Patterns",
    authorId: "usr-alex-learner",
    authorName: "Alex Rivera",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    authorRole: "Fullstack Developer (L2)",
    authorDepartment: "Engineering",
    createdAt: "4 days ago",
    readTime: "5 min read",
    upvotes: 36,
    upvotedBy: [],
    tags: ["Next.js", "React 18", "Server Components", "Performance"],
    competencyId: "comp-react",
    body: `React Server Components (RSC) allow us to execute DB queries and cryptographic validations directly inside components without shipping a single byte of library JS to the client.

### Key Takeaway:
Always place \`'use client'\` as far down the component tree as possible (at the leaf interactive button level) to keep parent pages pure Server Components.`,
    commentsCount: 9,
    verifiedExpertiseLevel: 3,
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
    courseOrPathId: "crs-meta-react",
    pathTitle: "Meta Front-End Architecture: React 18 & Server Components",
    issuerOrg: "Capacity Connect Enterprise Academy",
    issuedAt: "August 8, 2026",
    verificationCode: "CERT-CC-84920",
    score: 95,
    masteredCompetencies: ["React & Server Components (L3)", "TypeScript Type Systems (L3)"],
    credentialLedgerHash: "8f92a17cb041d8e624fbb4e2098d6ac47385a498b31a297e682d3e91a0c4f821",
  },
  {
    id: "cert-2",
    userId: "usr-priya",
    recipientName: "Priya Sharma",
    courseOrPathId: "crs-k8s-prod",
    pathTitle: "Production Kubernetes: Multi-Region Microservices & Istio Mesh",
    issuerOrg: "Capacity Connect Enterprise Academy",
    issuedAt: "August 24, 2026",
    verificationCode: "CERT-CC-91823",
    score: 98,
    masteredCompetencies: ["Production Kubernetes (L4)", "Distributed Cloud Architecture (L4)"],
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
  {
    id: "bdg-2",
    title: "React & Next.js Core Architect",
    description: "Passed Meta Front-End Architecture with honors score >= 90%.",
    iconName: "Award",
    category: "competency",
    earnedAt: "August 8, 2026",
    rarity: "Rare",
  },
  {
    id: "bdg-3",
    title: "Knowledge Contributor",
    description: "Authored technical articles with over 30 peer engineering upvotes.",
    iconName: "Share2",
    category: "contribution",
    earnedAt: "August 20, 2026",
    rarity: "Rare",
  },
];

export const SEEDED_SESSIONS: CalendarSession[] = [
  {
    id: "sess-1",
    title: "Live Hands-On Lab: Multi-Region Kubernetes & Istio Service Mesh Failover",
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
  {
    id: "sess-2",
    title: "Deep Dive Architecture Review: Generative AI RAG Hybrid Search Pipelines",
    trainerName: "Dr. Elena Rostova",
    trainerAvatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80",
    trainerTitle: "Chief Learning Officer & AI Fellow",
    date: "Sep 2, 2026",
    time: "5:00 PM – 6:30 PM IST",
    capacity: 30,
    enrolled: 18,
    enrolledUserIds: [],
    type: "Architecture Review",
    locationOrUrl: "Virtual Auditorium Alpha",
    competencyId: "comp-genai",
  },
];
