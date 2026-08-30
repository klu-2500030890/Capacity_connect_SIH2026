export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  rollNumber: string;
  department: string;
  semester: number;
  section: string;
  cgpa: number;
  attendancePercent: number;
  totalCredits: number;
  completedCredits: number;
  riskStatus: "Good" | "Moderate" | "At-Risk";
  academicVelocity: number; // percentile or momentum index
  email: string;
}

export interface SubjectAttendance {
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  status: "Safe" | "Warning" | "Critical";
  classesNeededFor75: number;
  classesCanMiss: number;
  trend: "up" | "down" | "stable";
}

export interface AssignmentItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  totalMarks: number;
  weightage: string;
  status: "Pending" | "Submitted" | "Graded" | "Late";
  submittedAt?: string;
  obtainedMarks?: number;
  rubric: {
    criterion: string;
    weight: number;
    maxScore: number;
    description: string;
  }[];
  aiFeedbackSummary?: string;
  aiSuggestedScore?: number;
  submissionFileName?: string;
}

export interface ExamItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  duration: string;
  syllabusUnits: string[];
  weightage: number;
}

export interface ScheduleItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  time: string;
  endTime: string;
  room: string;
  faculty: string;
  type: "Lecture" | "Lab" | "Tutorial" | "Seminar";
  status: "completed" | "active" | "upcoming";
}

export interface AIRecommendation {
  id: string;
  subject: string;
  topic: string;
  estimatedMinutes: number;
  urgency: "High" | "Medium" | "Low";
  reason: string;
  actionType: "Revise Notes" | "Practice Quiz" | "Review Mistake" | "Watch Summary";
}

export interface KnowledgeDocument {
  id: string;
  subjectCode: string;
  unit: string;
  title: string;
  fileType: "pdf" | "slides" | "notes";
  size: string;
  chunkCount: number;
  vectorIndexed: boolean;
  topics: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: "attendance" | "assignment" | "ai" | "exam" | "admin";
  timestamp: string;
  read: boolean;
  priority: "high" | "medium" | "low";
  actionUrl?: string;
}

export interface FacultyCourse {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: number;
  section: string;
  enrolledStudents: number;
  avgAttendance: number;
  avgScore: number;
  pendingEvaluations: number;
  atRiskCount: number;
  nextLecture: string;
  room: string;
}

export interface TimetableEntry {
  id: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  timeSlot: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  roomNumber: string;
  section: string;
  department: string;
  hasConflict?: boolean;
  conflictReason?: string;
}

export const MOCK_STUDENT: StudentProfile = {
  id: "std-1044",
  name: "Aarav Sharma",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  rollNumber: "21BCSE1044",
  department: "Computer Science & Engineering",
  semester: 6,
  section: "CS-A",
  cgpa: 8.84,
  attendancePercent: 87.5,
  totalCredits: 24,
  completedCredits: 22,
  riskStatus: "Good",
  academicVelocity: 92,
  email: "aarav.sharma@smartcampus.edu",
};

export const MOCK_SUBJECT_ATTENDANCE: SubjectAttendance[] = [
  {
    subjectCode: "CS301",
    subjectName: "Operating Systems & Kernels",
    facultyName: "Dr. Rajeshwari Sen",
    totalClasses: 36,
    attendedClasses: 33,
    percentage: 91.6,
    status: "Safe",
    classesNeededFor75: 0,
    classesCanMiss: 8,
    trend: "up",
  },
  {
    subjectCode: "CS402",
    subjectName: "Machine Learning & Neural Networks",
    facultyName: "Dr. Vikram Rao",
    totalClasses: 40,
    attendedClasses: 34,
    percentage: 85.0,
    status: "Safe",
    classesNeededFor75: 0,
    classesCanMiss: 5,
    trend: "stable",
  },
  {
    subjectCode: "CS303",
    subjectName: "Database Systems & Architecture",
    facultyName: "Prof. Ananya Gupta",
    totalClasses: 32,
    attendedClasses: 23,
    percentage: 71.8,
    status: "Warning",
    classesNeededFor75: 4,
    classesCanMiss: 0,
    trend: "down",
  },
  {
    subjectCode: "CS304",
    subjectName: "Advanced Computer Networks",
    facultyName: "Dr. Sandeep K.",
    totalClasses: 28,
    attendedClasses: 26,
    percentage: 92.8,
    status: "Safe",
    classesNeededFor75: 0,
    classesCanMiss: 6,
    trend: "up",
  },
  {
    subjectCode: "CS305",
    subjectName: "Distributed Cloud Systems Lab",
    facultyName: "Prof. Arvind Mehta",
    totalClasses: 18,
    attendedClasses: 17,
    percentage: 94.4,
    status: "Safe",
    classesNeededFor75: 0,
    classesCanMiss: 4,
    trend: "stable",
  },
];

export const MOCK_TODAY_SCHEDULE: ScheduleItem[] = [
  {
    id: "sch-1",
    subjectCode: "CS301",
    subjectName: "Operating Systems",
    time: "09:00 AM",
    endTime: "10:00 AM",
    room: "LT-402",
    faculty: "Dr. Rajeshwari Sen",
    type: "Lecture",
    status: "completed",
  },
  {
    id: "sch-2",
    subjectCode: "CS402",
    subjectName: "Machine Learning & Neural Networks",
    time: "10:15 AM",
    endTime: "11:15 AM",
    room: "Auditorium-2",
    faculty: "Dr. Vikram Rao",
    type: "Lecture",
    status: "active",
  },
  {
    id: "sch-3",
    subjectCode: "CS303",
    subjectName: "Database Systems Architecture",
    time: "11:30 AM",
    endTime: "12:30 PM",
    room: "LT-204",
    faculty: "Prof. Ananya Gupta",
    type: "Lecture",
    status: "upcoming",
  },
  {
    id: "sch-4",
    subjectCode: "CS305",
    subjectName: "Cloud Systems & Containers Lab",
    time: "02:00 PM",
    endTime: "04:00 PM",
    room: "High-Perf Lab 3",
    faculty: "Prof. Arvind Mehta",
    type: "Lab",
    status: "upcoming",
  },
];

export const MOCK_AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: "rec-1",
    subject: "Operating Systems",
    topic: "Deadlock Detection & Banker's Algorithm",
    estimatedMinutes: 35,
    urgency: "High",
    reason: "Midterm scheduled in 4 days · Low confidence in Quiz #2 (58%)",
    actionType: "Revise Notes",
  },
  {
    id: "rec-2",
    subject: "Machine Learning",
    topic: "Backpropagation & Loss Optimization",
    estimatedMinutes: 20,
    urgency: "Medium",
    reason: "New lecture materials uploaded today by Dr. Vikram Rao",
    actionType: "Practice Quiz",
  },
  {
    id: "rec-3",
    subject: "Database Systems",
    topic: "B+ Tree Node Splitting & Merging",
    estimatedMinutes: 25,
    urgency: "High",
    reason: "Upcoming assignment deadline tomorrow at 11:59 PM",
    actionType: "Review Mistake",
  },
];

export const MOCK_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: "asg-1",
    subjectCode: "CS301",
    subjectName: "Operating Systems",
    title: "Multithreaded Kernel Scheduling & Semaphore Sync",
    description: "Implement a POSIX pthread-based producer-consumer barrier with mutex locks and deadlock avoidance guarantees.",
    dueDate: "Tomorrow",
    dueTime: "11:59 PM",
    totalMarks: 50,
    weightage: "10% of Final Grade",
    status: "Pending",
    rubric: [
      { criterion: "Thread Synchronization & Deadlock Freedom", weight: 40, maxScore: 20, description: "Correct implementation of pthread_mutex and condition variables without race conditions." },
      { criterion: "Throughput & Latency Benchmarks", weight: 30, maxScore: 15, description: "Comprehensive test suite with varying thread workloads (1, 4, 16, 64)." },
      { criterion: "Code Modularity & Memory Safety", weight: 30, maxScore: 15, description: "Zero memory leaks verified via Valgrind, clean encapsulation." },
    ],
  },
  {
    id: "asg-2",
    subjectCode: "CS402",
    subjectName: "Machine Learning",
    title: "Deep Vision Classifier with PyTorch & WandB",
    description: "Train a modified ResNet architecture on CIFAR-100 with data augmentation, learning rate scheduling, and Grad-CAM interpretability visualizations.",
    dueDate: "Sep 04, 2026",
    dueTime: "05:00 PM",
    totalMarks: 100,
    weightage: "15% of Final Grade",
    status: "Submitted",
    submittedAt: "Aug 28, 2026 at 03:42 PM",
    submissionFileName: "Aarav_Sharma_ResNet100_Final.ipynb",
    rubric: [
      { criterion: "Model Architecture & Accuracy (>82%)", weight: 40, maxScore: 40, description: "Target accuracy achieved on held-out validation set." },
      { criterion: "Hyperparameter Ablation Study", weight: 30, maxScore: 30, description: "Structured experiments comparing SGD vs AdamW with cosine annealing." },
      { criterion: "Grad-CAM Explainability", weight: 30, maxScore: 30, description: "Visual saliency heatmaps for top 5 predicted classes." },
    ],
    aiSuggestedScore: 92,
    aiFeedbackSummary: "Outstanding architectural implementation. Validation accuracy reached 84.6%. Clean Grad-CAM heatmaps; minor recommendation to add mixup regularization for further robustness.",
  },
  {
    id: "asg-3",
    subjectCode: "CS303",
    subjectName: "Database Systems",
    title: "ACID Transaction Recovery Manager & WAL Protocol",
    description: "Build an ARIES-style write-ahead logging (WAL) recovery engine with checkpointing and undo/redo passes.",
    dueDate: "Sep 12, 2026",
    dueTime: "11:59 PM",
    totalMarks: 50,
    weightage: "10% of Final Grade",
    status: "Pending",
    rubric: [
      { criterion: "Log Sequence Number (LSN) Tracking", weight: 35, maxScore: 17.5, description: "Correct pageLSN, flushedLSN, and prevLSN chain maintenance." },
      { criterion: "Crash Recovery Simulation", weight: 40, maxScore: 20, description: "Successful recovery during dirty page table replay and uncommitted transaction undo." },
      { criterion: "Benchmark Throughput", weight: 25, maxScore: 12.5, description: "Sustains 5,000 tx/sec with group commit enabled." },
    ],
  },
];

export const MOCK_UPCOMING_EXAMS: ExamItem[] = [
  {
    id: "ex-1",
    subjectCode: "CS301",
    subjectName: "Operating Systems",
    title: "Mid-Term Examination",
    date: "Sep 02, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "Main Examination Hall A",
    duration: "2 Hours",
    syllabusUnits: ["Unit 1: Process Management", "Unit 2: Concurrency & Semaphores", "Unit 3: Deadlock Prevention"],
    weightage: 25,
  },
  {
    id: "ex-2",
    subjectCode: "CS402",
    subjectName: "Machine Learning",
    title: "Continuous Assessment Test 2",
    date: "Sep 08, 2026",
    time: "02:00 PM - 03:30 PM",
    venue: "CSE Seminar Block 3",
    duration: "1.5 Hours",
    syllabusUnits: ["Unit 3: Deep Neural Networks", "Unit 4: Convolutional Models & Transformers"],
    weightage: 20,
  },
];

export const MOCK_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  {
    id: "doc-1",
    subjectCode: "CS301",
    unit: "Unit 3: Synchronization & Deadlocks",
    title: "OS_Lecture_Unit3_Deadlocks_and_Bankers_Algo.pdf",
    fileType: "pdf",
    size: "4.8 MB",
    chunkCount: 64,
    vectorIndexed: true,
    topics: ["Deadlock Characterization", "Resource Allocation Graph", "Banker's Safety Algorithm", "Recovery Methods"],
  },
  {
    id: "doc-2",
    subjectCode: "CS402",
    unit: "Unit 2: Optimization & Gradient Descent",
    title: "ML_Optimization_Backprop_and_Adam.pdf",
    fileType: "slides",
    size: "8.2 MB",
    chunkCount: 112,
    vectorIndexed: true,
    topics: ["Loss Surfaces", "Stochastic Gradient Descent", "Momentum & Adam", "Vanishing Gradients"],
  },
  {
    id: "doc-3",
    subjectCode: "CS303",
    unit: "Unit 4: Query Optimization & Indexing",
    title: "DBMS_Indexing_BPlusTrees_and_CostModel.pdf",
    fileType: "notes",
    size: "3.5 MB",
    chunkCount: 48,
    vectorIndexed: true,
    topics: ["B+ Tree Insertion/Deletion", "Hash Indexing", "Join Algorithms", "EXPLAIN Query Plans"],
  },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Attendance Warning Alert",
    description: "Your DBMS (CS303) attendance dropped to 71.8%. Attend the next 4 consecutive classes to regain exam eligibility.",
    category: "attendance",
    timestamp: "10 mins ago",
    read: false,
    priority: "high",
    actionUrl: "/student/attendance",
  },
  {
    id: "notif-2",
    title: "AI Study Tutor Insight",
    description: "Dr. Rajeshwari Sen just uploaded Unit 3 Notes. AI Tutor prepared 6 customized flashcards for your Deadlock revision.",
    category: "ai",
    timestamp: "1 hour ago",
    read: false,
    priority: "medium",
    actionUrl: "/student/ai-tutor",
  },
  {
    id: "notif-3",
    title: "New Assignment Published",
    description: "CS301: 'Multithreaded Kernel Scheduling' is due tomorrow at 11:59 PM.",
    category: "assignment",
    timestamp: "3 hours ago",
    read: true,
    priority: "high",
    actionUrl: "/student/assignments",
  },
  {
    id: "notif-4",
    title: "Admin Announcement: Mid-Semester Hall Tickets",
    description: "Hall tickets for September 2026 Mid-Terms are now generated and verified.",
    category: "admin",
    timestamp: "Yesterday",
    read: true,
    priority: "low",
  },
];

export const MOCK_FACULTY_COURSES: FacultyCourse[] = [
  {
    id: "fc-1",
    code: "CS301",
    name: "Operating Systems & Kernels",
    department: "Computer Science",
    semester: 6,
    section: "CS-A",
    enrolledStudents: 68,
    avgAttendance: 89.2,
    avgScore: 78.4,
    pendingEvaluations: 14,
    atRiskCount: 4,
    nextLecture: "Today at 02:00 PM",
    room: "LT-402",
  },
  {
    id: "fc-2",
    code: "CS502",
    name: "Advanced Distributed Operating Systems",
    department: "Computer Science",
    semester: 8,
    section: "CS-MTech",
    enrolledStudents: 34,
    avgAttendance: 94.0,
    avgScore: 84.2,
    pendingEvaluations: 3,
    atRiskCount: 0,
    nextLecture: "Tomorrow at 10:00 AM",
    room: "Lab-301",
  },
  {
    id: "fc-3",
    code: "CS306",
    name: "Systems Programming Lab",
    department: "Computer Science",
    semester: 6,
    section: "CS-B",
    enrolledStudents: 64,
    avgAttendance: 86.5,
    avgScore: 74.0,
    pendingEvaluations: 28,
    atRiskCount: 7,
    nextLecture: "Thursday at 09:00 AM",
    room: "Systems Lab 2",
  },
];

export const MOCK_ADMIN_OVERVIEW = {
  totalStudents: 4821,
  totalFaculty: 312,
  activeCourses: 148,
  averageAttendance: 87.4,
  averageCGPA: 7.84,
  atRiskStudentsCount: 127,
  pendingFeeDues: 214,
  placementEligibilityPercent: 88.6,
  campusEnergyEfficiency: "94.2%",
  activeLabUtilization: "82.5%",
  recentAuditsPassed: "100%",
  departmentStats: [
    { name: "Computer Science & Engg", students: 1240, avgCgpa: 8.12, attendance: 89.4, atRisk: 18 },
    { name: "Electronics & Comm Engg", students: 980, avgCgpa: 7.78, attendance: 86.8, atRisk: 29 },
    { name: "Mechanical Engineering", students: 860, avgCgpa: 7.54, attendance: 85.2, atRisk: 34 },
    { name: "Information Technology", students: 740, avgCgpa: 8.01, attendance: 88.1, atRisk: 21 },
    { name: "Civil & Infrastructure", students: 620, avgCgpa: 7.62, attendance: 86.0, atRisk: 25 },
    { name: "Chemical & Materials", students: 381, avgCgpa: 7.91, attendance: 89.0, atRisk: 0 },
  ],
};

export const MOCK_TIMETABLE_MATRIX: TimetableEntry[] = [
  { id: "tt-1", day: "Monday", timeSlot: "09:00 - 10:00", subjectCode: "CS301", subjectName: "Operating Systems", facultyName: "Dr. Rajeshwari Sen", roomNumber: "LT-402", section: "CS-A", department: "CSE" },
  { id: "tt-2", day: "Monday", timeSlot: "10:00 - 11:00", subjectCode: "CS402", subjectName: "Machine Learning", facultyName: "Dr. Vikram Rao", roomNumber: "LT-402", section: "CS-A", department: "CSE" },
  { id: "tt-3", day: "Monday", timeSlot: "11:15 - 12:15", subjectCode: "CS303", subjectName: "Database Systems", facultyName: "Prof. Ananya Gupta", roomNumber: "LT-204", section: "CS-A", department: "CSE" },
  { id: "tt-4", day: "Monday", timeSlot: "02:00 - 04:00", subjectCode: "CS305", subjectName: "Distributed Cloud Lab", facultyName: "Prof. Arvind Mehta", roomNumber: "Lab-3", section: "CS-A", department: "CSE" },
  { id: "tt-5", day: "Tuesday", timeSlot: "09:00 - 10:00", subjectCode: "CS304", subjectName: "Computer Networks", facultyName: "Dr. Sandeep K.", roomNumber: "LT-402", section: "CS-A", department: "CSE" },
  { id: "tt-6", day: "Tuesday", timeSlot: "10:00 - 11:00", subjectCode: "CS301", subjectName: "Operating Systems", facultyName: "Dr. Rajeshwari Sen", roomNumber: "LT-402", section: "CS-A", department: "CSE" },
  // Simulating an active conflict in room allocation for admin demo
  { id: "tt-7", day: "Tuesday", timeSlot: "11:15 - 12:15", subjectCode: "ME302", subjectName: "Thermodynamics II", facultyName: "Dr. P. Joshi", roomNumber: "LT-402", section: "ME-B", department: "Mechanical", hasConflict: true, conflictReason: "Room LT-402 double-booked with CS402 Tutorial" },
  { id: "tt-8", day: "Wednesday", timeSlot: "09:00 - 11:00", subjectCode: "CS306", subjectName: "Systems Programming Lab", facultyName: "Dr. Rajeshwari Sen", roomNumber: "SysLab-2", section: "CS-A", department: "CSE" },
  { id: "tt-9", day: "Thursday", timeSlot: "10:00 - 11:00", subjectCode: "CS402", subjectName: "Machine Learning", facultyName: "Dr. Vikram Rao", roomNumber: "Auditorium-2", section: "CS-A", department: "CSE" },
  { id: "tt-10", day: "Friday", timeSlot: "02:00 - 04:00", subjectCode: "CS308", subjectName: "Capstone Project Review", facultyName: "Prof. Anita Desai", roomNumber: "Seminar-1", section: "CS-A", department: "CSE" },
];
