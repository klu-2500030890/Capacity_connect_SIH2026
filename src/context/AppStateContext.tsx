"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  RoleType,
  UserProfile,
  Competency,
  JobRole,
  Course,
  LearningPath,
  Enrollment,
  KnowledgeArticle,
  ExpertQuestion,
  CertificateItem,
  BadgeItem,
  CalendarSession,
  SEEDED_COMPETENCIES,
  SEEDED_JOB_ROLES,
  SEEDED_LEARNER_PROFILE,
  SEEDED_TEAM_MEMBERS,
  SEEDED_COURSES,
  SEEDED_LEARNING_PATHS,
  SEEDED_ENROLLMENTS,
  SEEDED_KNOWLEDGE_ARTICLES,
  SEEDED_EXPERT_QUESTIONS,
  SEEDED_CERTIFICATES,
  SEEDED_BADGES,
  SEEDED_SESSIONS,
} from "@/data/capacityData";

export type { RoleType };

export interface DemoUserCredentials {
  role: RoleType;
  name: string;
  email: string;
  title: string;
  avatar: string;
  department: string;
  clearanceTag: string;
  password?: string;
}

export const DEMO_USERS: Record<RoleType, DemoUserCredentials> = {
  learner: {
    role: "learner",
    name: "Alex Rivera",
    email: "alex.rivera@capacityconnect.io",
    title: "Fullstack Developer (L2)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    department: "Engineering",
    clearanceTag: "Employee Clearance",
    password: "Passcode@2026",
  },
  manager: {
    role: "manager",
    name: "Sarah Chen",
    email: "sarah.chen@capacityconnect.io",
    title: "Director of Engineering / People Lead",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    department: "Engineering Leadership",
    clearanceTag: "People Lead Clearance",
    password: "Passcode@2026",
  },
  trainer: {
    role: "trainer",
    name: "Marcus Vance",
    email: "marcus.vance@capacityconnect.io",
    title: "Principal L&D Architect & Fellow",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    department: "Curriculum & Talent Development",
    clearanceTag: "L&D Trainer Clearance",
    password: "Passcode@2026",
  },
  admin: {
    role: "admin",
    name: "Dr. Elena Rostova",
    email: "elena.rostova@capacityconnect.io",
    title: "Chief Learning Officer & Super Admin",
    avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80",
    department: "Executive & People Operations",
    clearanceTag: "Super Admin Clearance",
    password: "Passcode@2026",
  },
};

interface AppStateContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
  currentUser: DemoUserCredentials;
  currentProfile: UserProfile;
  isAuthenticated: boolean;
  registeredUsers: UserProfile[];
  login: (roleOrEmail: string, passwordAttempt?: string) => { success: boolean; error?: string };
  registerUser: (newUser: UserProfile) => void;
  logout: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;

  // Domain Data
  learner: UserProfile;
  teamMembers: UserProfile[];
  competencies: Competency[];
  jobRoles: JobRole[];
  courses: Course[];
  learningPaths: LearningPath[];
  enrollments: Enrollment[];
  articles: KnowledgeArticle[];
  questions: ExpertQuestion[];
  certificates: CertificateItem[];
  badges: BadgeItem[];
  sessions: CalendarSession[];
  notifications: any[];

  // Shell State
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  markNotificationAsRead: (id: string) => void;
  demoToast: { message: string; type: "info" | "success" | "warning" } | null;
  setDemoToast: (toast: { message: string; type: "info" | "success" | "warning" } | null) => void;

  // Domain Simulation Actions
  passQuizAndLevelUp: (courseId: string, score: number) => void;
  submitAssignment: (courseId: string, assignmentId: string, code: string, passed: boolean) => void;
  nudgeTeamMember: (memberId: string, memberName: string, courseTitle: string) => void;
  nominateMember: (memberId: string, courseId: string) => void;
  upvoteArticle: (articleId: string) => void;
  askExpertQuestion: (title: string, description: string, competencyId: string) => void;
  bookCalendarSession: (sessionId: string) => void;
  addNewCourse: (newCourse: Course) => void;
  addNewArticle: (title: string, body: string, tags: string[]) => void;
  simulateScenario: (scenarioName: string) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<RoleType>("learner");
  const [currentUser, setCurrentUser] = useState<DemoUserCredentials>(DEMO_USERS.learner);
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(SEEDED_LEARNER_PROFILE);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Dynamic user list allowing live registration
  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>(SEEDED_TEAM_MEMBERS);

  const [learner, setLearner] = useState<UserProfile>(SEEDED_LEARNER_PROFILE);
  const [teamMembers, setTeamMembers] = useState<UserProfile[]>(SEEDED_TEAM_MEMBERS);
  const [competencies, setCompetencies] = useState<Competency[]>(SEEDED_COMPETENCIES);
  const [jobRoles, setJobRoles] = useState<JobRole[]>(SEEDED_JOB_ROLES);
  const [courses, setCourses] = useState<Course[]>(SEEDED_COURSES);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>(SEEDED_LEARNING_PATHS);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(SEEDED_ENROLLMENTS);
  const [articles, setArticles] = useState<KnowledgeArticle[]>(SEEDED_KNOWLEDGE_ARTICLES);
  const [questions, setQuestions] = useState<ExpertQuestion[]>(SEEDED_EXPERT_QUESTIONS);
  const [certificates, setCertificates] = useState<CertificateItem[]>(SEEDED_CERTIFICATES);
  const [badges, setBadges] = useState<BadgeItem[]>(SEEDED_BADGES);
  const [sessions, setSessions] = useState<CalendarSession[]>(SEEDED_SESSIONS);

  const [notifications, setNotifications] = useState<any[]>([
    {
      id: "notif-1",
      title: "Assessment Evaluated: Meta Front-End Architecture",
      message: "Scored 95%. React & Server Components upgraded to Level 3 on your Skill Radar.",
      time: "10 min ago",
      type: "success",
      read: false,
    },
    {
      id: "notif-2",
      title: "Live Cloud Lab Scheduled Tomorrow",
      message: "Virtual Workshop #4: Kubernetes & Istio Failover at 3:00 PM IST.",
      time: "2 hours ago",
      type: "info",
      read: false,
    },
  ]);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [demoToast, setDemoToast] = useState<{ message: string; type: "info" | "success" | "warning" } | null>(null);

  // Auto-dismiss toast after 4s
  useEffect(() => {
    if (demoToast) {
      const timer = setTimeout(() => setDemoToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [demoToast]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // -------------------------------------------------------------
  // AUTHENTICATION & REGISTRATION
  // -------------------------------------------------------------
  const login = (roleOrEmail: string, passwordAttempt?: string): { success: boolean; error?: string } => {
    // Check if role shortcut
    if (roleOrEmail === "learner" || roleOrEmail === "manager" || roleOrEmail === "trainer" || roleOrEmail === "admin") {
      const targetRole = roleOrEmail as RoleType;
      setRoleState(targetRole);
      setCurrentUser(DEMO_USERS[targetRole]);
      setIsAuthenticated(true);
      return { success: true };
    }

    // Lookup user by email in registered users or demo users
    const matchedUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === roleOrEmail.toLowerCase()
    );

    if (matchedUser) {
      if (passwordAttempt && matchedUser.password && passwordAttempt !== matchedUser.password && passwordAttempt !== "Passcode@2026") {
        return { success: false, error: "Invalid password for this enterprise account." };
      }

      setRoleState(matchedUser.role);
      setCurrentProfile(matchedUser);
      setCurrentUser({
        role: matchedUser.role,
        name: matchedUser.name,
        email: matchedUser.email,
        title: matchedUser.jobTitle,
        avatar: matchedUser.avatar,
        department: matchedUser.department,
        clearanceTag: `${matchedUser.role.toUpperCase()} Clearance`,
      });
      setIsAuthenticated(true);
      return { success: true };
    }

    // Check demo accounts by email
    const demoEntry = Object.values(DEMO_USERS).find(
      (d) => d.email.toLowerCase() === roleOrEmail.toLowerCase()
    );

    if (demoEntry) {
      if (passwordAttempt && passwordAttempt !== demoEntry.password && passwordAttempt !== "Passcode@2026") {
        return { success: false, error: "Invalid password for demo account." };
      }
      setRoleState(demoEntry.role);
      setCurrentUser(demoEntry);
      setIsAuthenticated(true);
      return { success: true };
    }

    return { success: false, error: "Account not found. Please register on the signup portal." };
  };

  const registerUser = (newUser: UserProfile) => {
    setRegisteredUsers((prev) => [...prev, newUser]);
    setTeamMembers((prev) => [...prev, newUser]);
    setRoleState(newUser.role);
    setCurrentProfile(newUser);
    if (newUser.role === "learner") {
      setLearner(newUser);
    }
    setCurrentUser({
      role: newUser.role,
      name: newUser.name,
      email: newUser.email,
      title: newUser.jobTitle,
      avatar: newUser.avatar,
      department: newUser.department,
      clearanceTag: `${newUser.role.toUpperCase()} Clearance`,
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const setRole = (newRole: RoleType) => {
    setRoleState(newRole);
    setCurrentUser(DEMO_USERS[newRole]);
  };

  // -------------------------------------------------------------
  // SIMULATION ACTIONS: Multi-Question Assessment Pass & Skill Radar Sync
  // -------------------------------------------------------------
  const passQuizAndLevelUp = (courseId: string, score: number) => {
    const targetCourse = courses.find((c) => c.id === courseId);
    if (!targetCourse) return;

    // 1. Update Enrollment to completed with score
    setEnrollments((prev) => {
      const existing = prev.find((e) => e.courseId === courseId);
      if (existing) {
        return prev.map((e) =>
          e.courseId === courseId
            ? {
                ...e,
                status: "completed",
                progressPercent: 100,
                completedAt: "Just now",
                score,
              }
            : e
        );
      } else {
        return [
          ...prev,
          {
            id: `enr-${Date.now()}`,
            userId: learner.id,
            courseId,
            status: "completed",
            progressPercent: 100,
            completedModuleIds: targetCourse.modules.map((m) => m.id),
            startedAt: "Today",
            completedAt: "Just now",
            score,
          },
        ];
      }
    });

    // 2. Update Learner Competencies dynamically
    setLearner((prev) => {
      const updatedComps = prev.competencies.map((comp) => {
        if (targetCourse.competencyIds.includes(comp.competencyId)) {
          return {
            ...comp,
            currentLevel: Math.max(comp.currentLevel, targetCourse.competencyGainLevel),
            lastAssessedAt: "Just now",
            verifiedBy: `${targetCourse.provider} Assessment Engine`,
            scorePercent: score,
          };
        }
        return comp;
      });

      return {
        ...prev,
        points: prev.points + 250,
        completedCoursesCount: prev.completedCoursesCount + 1,
        competencies: updatedComps,
      };
    });

    // 3. Issue Cryptographic Certificate
    const newCertCode = `CERT-CC-${Math.floor(10000 + Math.random() * 90000)}`;
    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      userId: learner.id,
      recipientName: learner.name,
      courseOrPathId: targetCourse.id,
      pathTitle: targetCourse.title,
      issuerOrg: `${targetCourse.provider} & Capacity Connect Academy`,
      issuedAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      verificationCode: newCertCode,
      score,
      masteredCompetencies: targetCourse.competencyIds.map((cId) => {
        const c = competencies.find((comp) => comp.id === cId);
        return `${c?.name || cId} (Level ${targetCourse.competencyGainLevel})`;
      }),
      credentialLedgerHash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
    };

    setCertificates((prev) => [newCert, ...prev]);

    // 4. Dispatch celebratory notification
    setDemoToast({
      message: `🎉 Assessment Passed (${score}%)! Competencies updated to Level ${targetCourse.competencyGainLevel} on your Skill Radar. +250 XP earned.`,
      type: "success",
    });

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Certification Issued: ${targetCourse.title}`,
        message: `Verified on ledger. Verification Code: ${newCertCode}`,
        time: "Just now",
        type: "success",
        read: false,
      },
      ...prev,
    ]);
  };

  const submitAssignment = (courseId: string, assignmentId: string, code: string, passed: boolean) => {
    setEnrollments((prev) =>
      prev.map((e) =>
        e.courseId === courseId
          ? {
              ...e,
              assignmentSubmission: code,
              assignmentPassed: passed,
              assignmentScore: passed ? 100 : 50,
            }
          : e
      )
    );

    if (passed) {
      setLearner((prev) => ({ ...prev, points: prev.points + 100 }));
      setDemoToast({
        message: "✅ Practical Lab Tests Passed! +100 XP awarded.",
        type: "success",
      });
    }
  };

  const nudgeTeamMember = (memberId: string, memberName: string, courseTitle: string) => {
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Manager Nudge Dispatched: ${memberName}`,
        message: `Encouragement sent to ${memberName} for '${courseTitle}'.`,
        time: "Just now",
        type: "info",
        read: false,
      },
      ...prev,
    ]);

    setDemoToast({
      message: `Nudge successfully sent to ${memberName}. Notification dispatched.`,
      type: "info",
    });
  };

  const nominateMember = (memberId: string, courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    const member = teamMembers.find((m) => m.id === memberId);

    setEnrollments((prev) => [
      ...prev,
      {
        id: `enr-nom-${Date.now()}`,
        userId: memberId,
        courseId,
        status: "nominated",
        progressPercent: 0,
        completedModuleIds: [],
        startedAt: "Assigned today",
      },
    ]);

    setDemoToast({
      message: `Mandatory training nomination assigned: ${member?.name} -> ${course?.title}`,
      type: "success",
    });
  };

  const upvoteArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          const isUpvoted = art.upvotedBy.includes(learner.id);
          return {
            ...art,
            upvotes: isUpvoted ? art.upvotes - 1 : art.upvotes + 1,
            upvotedBy: isUpvoted
              ? art.upvotedBy.filter((id) => id !== learner.id)
              : [...art.upvotedBy, learner.id],
          };
        }
        return art;
      })
    );
  };

  const askExpertQuestion = (title: string, description: string, competencyId: string) => {
    const targetComp = competencies.find((c) => c.id === competencyId);
    const newQ: ExpertQuestion = {
      id: `qna-${Date.now()}`,
      title,
      description,
      askerId: learner.id,
      askerName: learner.name,
      askerAvatar: learner.avatar,
      competencyId,
      competencyName: targetComp?.name || "Cloud Systems",
      assignedExpertId: "usr-priya",
      assignedExpertName: "Priya Sharma (Level 4 Verified Expert)",
      status: "open",
      createdAt: "Just now",
      answers: [],
    };

    setQuestions((prev) => [newQ, ...prev]);
    setDemoToast({
      message: `Question routed algorithmically to verified Level 4+ Expert: ${newQ.assignedExpertName}`,
      type: "success",
    });
  };

  const bookCalendarSession = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          const isAlreadyEnrolled = s.enrolledUserIds.includes(learner.id);
          if (isAlreadyEnrolled) {
            setDemoToast({ message: "You are already registered for this session.", type: "info" });
            return s;
          }
          setDemoToast({ message: `Seat confirmed for: ${s.title}`, type: "success" });
          return {
            ...s,
            enrolled: s.enrolled + 1,
            enrolledUserIds: [...s.enrolledUserIds, learner.id],
          };
        }
        return s;
      })
    );
  };

  const addNewCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
    setDemoToast({ message: `Course '${newCourse.title}' published to enterprise catalog.`, type: "success" });
  };

  const addNewArticle = (title: string, body: string, tags: string[]) => {
    const newArt: KnowledgeArticle = {
      id: `art-${Date.now()}`,
      title,
      authorId: learner.id,
      authorName: learner.name,
      authorAvatar: learner.avatar,
      authorRole: learner.jobTitle,
      authorDepartment: learner.department,
      createdAt: "Just now",
      readTime: "4 min read",
      upvotes: 1,
      upvotedBy: [learner.id],
      tags,
      competencyId: "comp-react",
      body,
      commentsCount: 0,
      verifiedExpertiseLevel: 3,
    };
    setArticles((prev) => [newArt, ...prev]);
    setDemoToast({ message: "Technical article published to peer engineering wiki.", type: "success" });
  };

  const simulateScenario = (scenarioName: string) => {
    if (scenarioName === "level_up") {
      passQuizAndLevelUp("crs-k8s-prod", 95);
    } else if (scenarioName === "nudge") {
      nudgeTeamMember("usr-devon", "Devon Reed", "Production Kubernetes");
    }
  };

  return (
    <AppStateContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        currentProfile,
        isAuthenticated,
        registeredUsers,
        login,
        registerUser,
        logout,
        theme,
        toggleTheme,
        learner,
        teamMembers,
        competencies,
        jobRoles,
        courses,
        learningPaths,
        enrollments,
        articles,
        questions,
        certificates,
        badges,
        sessions,
        notifications,
        markNotificationAsRead,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        demoToast,
        setDemoToast,
        passQuizAndLevelUp,
        submitAssignment,
        nudgeTeamMember,
        nominateMember,
        upvoteArticle,
        askExpertQuestion,
        bookCalendarSession,
        addNewCourse,
        addNewArticle,
        simulateScenario,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
