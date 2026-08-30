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
  SEEDED_NOTIFICATIONS,
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
}

export const DEMO_USERS: Record<RoleType, DemoUserCredentials> = {
  learner: {
    role: "learner",
    name: "Alex Rivera",
    email: "alex.rivera@capacityconnect.io",
    title: "Fullstack Developer (L2)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    department: "Engineering",
    clearanceTag: "Employee Learner",
  },
  manager: {
    role: "manager",
    name: "Sarah Chen",
    email: "sarah.chen@capacityconnect.io",
    title: "Director of Engineering (People Lead)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    department: "Engineering & Platform",
    clearanceTag: "People Lead / Manager",
  },
  trainer: {
    role: "trainer",
    name: "Marcus Vance",
    email: "marcus.vance@capacityconnect.io",
    title: "Principal L&D Architect & Trainer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    department: "Talent Development",
    clearanceTag: "L&D Manager / Trainer",
  },
  admin: {
    role: "admin",
    name: "Dr. Elena Rostova",
    email: "elena.rostova@capacityconnect.io",
    title: "Super Admin & Chief Learning Officer",
    avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80",
    department: "Executive & People Operations",
    clearanceTag: "Super Admin",
  },
};

interface AppStateContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
  currentUser: DemoUserCredentials;
  isAuthenticated: boolean;
  login: (role: RoleType) => void;
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

  // Domain Actions
  passQuizAndLevelUp: (courseId: string, score: number) => void;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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
  const [notifications, setNotifications] = useState<any[]>(SEEDED_NOTIFICATIONS);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [demoToast, setDemoToast] = useState<{ message: string; type: "info" | "success" | "warning" } | null>(null);

  const setRole = (newRole: RoleType) => {
    setRoleState(newRole);
    setCurrentUser(DEMO_USERS[newRole]);
  };

  const login = (targetRole: RoleType) => {
    setIsAuthenticated(true);
    setRole(targetRole);
    setDemoToast({
      message: `Authenticated as ${DEMO_USERS[targetRole].name} (${DEMO_USERS[targetRole].clearanceTag})`,
      type: "success",
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setDemoToast({
      message: "Session terminated. Returned to Capacity Connect Gatekeeper.",
      type: "info",
    });
  };

  // Sync theme with document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Global Ctrl+K / Cmd+K handler
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

  // CORE PILLAR 1 & 2: Assessment Pass -> Auto-Update Competency Level in Skill Matrix
  const passQuizAndLevelUp = (courseId: string, score: number) => {
    const targetCourse = courses.find((c) => c.id === courseId);
    if (!targetCourse) return;

    // 1. Update Enrollment to completed
    setEnrollments((prev) =>
      prev.map((e) =>
        e.courseId === courseId
          ? {
              ...e,
              status: "completed",
              progressPercent: 100,
              completedAt: "Just now",
              score,
            }
          : e
      )
    );

    // 2. Update Learner Competencies to course gain level (e.g. comp-k8s becomes Level 3)
    setLearner((prev) => {
      const updatedComps = prev.competencies.map((comp) => {
        if (targetCourse.competencyIds.includes(comp.competencyId)) {
          return {
            ...comp,
            currentLevel: Math.max(comp.currentLevel, targetCourse.competencyGainLevel),
            lastAssessedAt: "Just now",
            verifiedBy: "AI Assessment Engine",
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

    // 3. Update in team members list too
    setTeamMembers((prev) =>
      prev.map((m) =>
        m.id === learner.id
          ? {
              ...m,
              points: m.points + 250,
              completedCoursesCount: m.completedCoursesCount + 1,
              competencies: m.competencies.map((comp) =>
                targetCourse.competencyIds.includes(comp.competencyId)
                  ? {
                      ...comp,
                      currentLevel: Math.max(comp.currentLevel, targetCourse.competencyGainLevel),
                      lastAssessedAt: "Just now",
                    }
                  : comp
              ),
            }
          : m
      )
    );

    // 4. Issue certificate if completing capstone
    if (courseId === "crs-k8s-prod") {
      const newCert: CertificateItem = {
        id: `cert-${Date.now()}`,
        userId: learner.id,
        recipientName: learner.name,
        pathId: "path-cloud-lead",
        pathTitle: "Enterprise Cloud Architect Fast-Track",
        verificationCode: "CERT-CC-84920",
        issuedAt: "Today",
        issuerOrg: "Capacity Connect Enterprise Academy",
        score,
      };
      setCertificates((prev) => [newCert, ...prev]);
    }

    setDemoToast({
      message: `🎉 Assessment Passed (${score}%)! Competency upgraded to Level ${targetCourse.competencyGainLevel} in your Skill Radar!`,
      type: "success",
    });
  };

  // DIFFERENTIATOR: Manager Nudge System
  const nudgeTeamMember = (memberId: string, memberName: string, courseTitle: string) => {
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Manager Nudge from Sarah Chen`,
        description: `Sarah sent an encouraging reminder to finish "${courseTitle}".`,
        category: "nudge",
        timestamp: "Just now",
        read: false,
        priority: "high",
        actionUrl: "/learner",
      },
      ...prev,
    ]);

    setDemoToast({
      message: `⚡ Manager Nudge dispatched to ${memberName} for "${courseTitle}"!`,
      type: "success",
    });
  };

  // Manager Nomination
  const nominateMember = (memberId: string, courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    const member = teamMembers.find((m) => m.id === memberId);
    if (!course || !member) return;

    const newEnrollment: Enrollment = {
      id: `enr-${Date.now()}`,
      userId: memberId,
      courseId,
      status: "nominated",
      progressPercent: 0,
      completedModuleIds: [],
      startedAt: "Pending acceptance",
      dueDate: "Oct 15, 2026",
    };

    setEnrollments((prev) => [newEnrollment, ...prev]);
    setDemoToast({
      message: `Nominated ${member.name} for mandatory training "${course.title}".`,
      type: "info",
    });
  };

  // PILLAR 3: Knowledge Hub Upvotes
  const upvoteArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === articleId ? { ...a, upvotes: a.upvotes + 1 } : a
      )
    );
    setDemoToast({
      message: "Knowledge Article upvoted! Author awarded +10 Community Reputation points.",
      type: "success",
    });
  };

  // PILLAR 3: Ask an Expert
  const askExpertQuestion = (title: string, description: string, competencyId: string) => {
    const comp = competencies.find((c) => c.id === competencyId);
    const newQuestion: ExpertQuestion = {
      id: `q-exp-${Date.now()}`,
      title,
      description,
      askerName: learner.name,
      askerAvatar: learner.avatar,
      competencyId,
      competencyName: comp ? comp.name : "Technical Engineering",
      status: "open",
      answersCount: 0,
      createdAt: "Just now",
    };

    setQuestions((prev) => [newQuestion, ...prev]);
    setDemoToast({
      message: `Question routed to verified Level 4+ experts in "${comp?.name}"!`,
      type: "info",
    });
  };

  // Live Calendar Booking
  const bookCalendarSession = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, enrolled: Math.min(s.capacity, s.enrolled + 1) } : s
      )
    );
    setDemoToast({
      message: "Virtual Lab Seat Reserved! Calendar invite & terminal access key sent.",
      type: "success",
    });
  };

  // Trainer Course Builder
  const addNewCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
    setDemoToast({
      message: `Course "${newCourse.title}" published & indexed into competency catalog!`,
      type: "success",
    });
  };

  // Knowledge Hub Post
  const addNewArticle = (title: string, body: string, tags: string[]) => {
    const newArt: KnowledgeArticle = {
      id: `art-${Date.now()}`,
      title,
      body,
      authorId: learner.id,
      authorName: learner.name,
      authorRole: learner.jobTitle,
      authorAvatar: learner.avatar,
      competencyTags: tags,
      upvotes: 1,
      createdAt: "Just now",
      commentsCount: 0,
      views: 1,
    };
    setArticles((prev) => [newArt, ...prev]);
    setDemoToast({
      message: `Knowledge article published! Peer-to-peer knowledge base updated.`,
      type: "success",
    });
  };

  // Scenario Simulator for Judges
  const simulateScenario = (scenarioName: string) => {
    switch (scenarioName) {
      case "auto_level_up":
        passQuizAndLevelUp("crs-k8s-prod", 96);
        break;
      case "manager_nudge":
        nudgeTeamMember("usr-marcus-103", "Devon Reed", "Next.js 14 Enterprise Architecture");
        break;
      case "ai_advisor_eval":
        setDemoToast({
          message: "AI Skill Gap Advisor: Generated 3-Step accelerated path to Senior Cloud Solutions Architect!",
          type: "info",
        });
        break;
      default:
        break;
    }
  };

  return (
    <AppStateContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        isAuthenticated,
        login,
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
