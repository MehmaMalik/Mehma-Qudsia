import { useState, useRef, useId } from "react";
import { Link } from "wouter";
import {
  Globe,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Save,
  RotateCcw,
  Download,
  Upload,
  Search,
  Filter,
  CheckCircle2,
  ArrowLeft,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  Link2,
  FolderOpen,
  Database,
  Sliders,
  Check,
  X,
  AlertCircle,
  FileText,
  Lock,
  LogIn,
  LogOut,
  Key,
  Shield,
  User,
  Mail,
  UserPlus,
} from "lucide-react";
import {
  PortfolioItem,
  usePortfolioDb,
  getStoredMediaItems,
  addMediaItem,
  deleteMediaItem,
  MediaItem,
} from "@/lib/portfolioDb";

const ACCOUNTS_KEY = "brandit_cms_accounts_v2";
const AUTH_KEY = "brandit_cms_auth_credentials_v1";
const SESSION_KEY = "brandit_cms_auth_session_v1";

export interface AdminAccount {
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

// Stored accounts helper (secure email-based account store)
function getStoredAccounts(): AdminAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
    return [];
  } catch {
    return [];
  }
}

function getStoredSessionUser(): AdminAccount | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    if (raw === "true") {
      // Legacy flag without user object
      const accounts = getStoredAccounts();
      return accounts[0] || null;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getStoredSession(): boolean {
  return getStoredSessionUser() !== null;
}

export default function AdminDashboard() {
  const { items, addItem, updateItem, deleteItem, resetDb, exportJson, importJson } = usePortfolioDb();
  const [activeTab, setActiveTab] = useState<"dashboard" | "all" | "new" | "media" | "backup">("all");
  
  // Authentication State
  const [currentUser, setCurrentUser] = useState<AdminAccount | null>(() => getStoredSessionUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getStoredSession());
  
  // Auth Form State: Login vs Create Account
  const [authMode, setAuthMode] = useState<"login" | "register">(() => {
    // If no accounts exist yet, prompt them directly to register their secure admin account
    if (typeof window !== "undefined") {
      const accs = getStoredAccounts();
      return accs.length === 0 ? "register" : "login";
    }
    return "login";
  });
  
  // Login form fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Register form fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  
  const [loginError, setLoginError] = useState("");
  const [loginSuccessNotice, setLoginSuccessNotice] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Credentials edit state inside Backup/Security tab
  const [securityName, setSecurityName] = useState(currentUser?.name || "");
  const [securityEmail, setSecurityEmail] = useState(currentUser?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [securitySuccess, setSecuritySuccess] = useState("");
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [sectionFilter, setSectionFilter] = useState<"all" | "web" | "funnel">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "archived" | "draft">("all");

  // Editing state
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [quickEditId, setQuickEditId] = useState<string | null>(null);
  const [quickUrl, setQuickUrl] = useState("");
  const [quickScreenshot, setQuickScreenshot] = useState("");

  // Notification Banner
  const [notice, setNotice] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  // New Website Form State
  const initialFormState: Omit<PortfolioItem, "id" | "createdAt" | "updatedAt"> = {
    name: "",
    desc: "",
    section: "web",
    type: "Full Stack Web App",
    category: "Real Estate",
    platform: "WordPress + Elementor",
    brand: "",
    url: "",
    domain: "",
    screenshotUrl: "",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: false,
    status: "published",
    highlights: [],
  };
  const [formData, setFormData] = useState(initialFormState);
  const [tagInput, setTagInput] = useState("");

  // Media library state
  const [mediaList, setMediaList] = useState<MediaItem[]>(() => getStoredMediaItems());
  const [selectedScreenshotPreview, setSelectedScreenshotPreview] = useState<string | null>(null);

  // File upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaUploadRef = useRef<HTMLInputElement>(null);
  const jsonImportRef = useRef<HTMLInputElement>(null);

  const showNotification = (message: string, type: "success" | "error" | "info" = "success") => {
    setNotice({ message, type });
    setTimeout(() => setNotice(null), 4000);
  };

  // Authentication Handlers
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError("");
    setLoginSuccessNotice("");
    setIsLoggingIn(true);

    setTimeout(() => {
      const trimmedEmail = loginEmail.trim().toLowerCase();
      const trimmedPass = loginPassword.trim();
      const accounts = getStoredAccounts();

      if (accounts.length === 0) {
        setLoginError("No admin accounts exist yet. Please register your email account below.");
        setAuthMode("register");
        setIsLoggingIn(false);
        return;
      }

      // Find user by email or username
      const matched = accounts.find(
        (acc) => acc.email.toLowerCase() === trimmedEmail || acc.name.toLowerCase() === trimmedEmail
      );

      if (matched && matched.password === trimmedPass) {
        setCurrentUser(matched);
        setIsAuthenticated(true);
        const sessionPayload = JSON.stringify(matched);
        if (rememberMe) {
          localStorage.setItem(SESSION_KEY, sessionPayload);
        } else {
          sessionStorage.setItem(SESSION_KEY, sessionPayload);
        }
        showNotification(`Welcome back, ${matched.name || matched.email}! Logged in to CMS.`);
      } else {
        setLoginError("Invalid email or password. Please check your credentials.");
      }
      setIsLoggingIn(false);
    }, 350);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccessNotice("");

    const name = regName.trim();
    const email = regEmail.trim().toLowerCase();
    const password = regPassword.trim();
    const confirmPassword = regConfirmPassword.trim();

    if (!name) {
      setLoginError("Please enter your name or admin handle.");
      return;
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      setLoginError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setLoginError("Password must be at least 6 characters long for security.");
      return;
    }

    if (password !== confirmPassword) {
      setLoginError("Passwords do not match. Please re-enter.");
      return;
    }

    const accounts = getStoredAccounts();
    const alreadyExists = accounts.some((acc) => acc.email.toLowerCase() === email);

    if (alreadyExists) {
      setLoginError("An account with this email already exists. Please log in.");
      setAuthMode("login");
      setLoginEmail(email);
      return;
    }

    const newAccount: AdminAccount = {
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    const updatedAccounts = [...accounts, newAccount];
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));

    // Auto-login new account
    setCurrentUser(newAccount);
    setIsAuthenticated(true);
    const sessionPayload = JSON.stringify(newAccount);
    if (rememberMe) {
      localStorage.setItem(SESSION_KEY, sessionPayload);
    } else {
      sessionStorage.setItem(SESSION_KEY, sessionPayload);
    }

    setRegName("");
    setRegEmail("");
    setRegPassword("");
    setRegConfirmPassword("");
    showNotification(`Account created successfully! Welcome to CMS, ${name}.`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    setLoginEmail("");
    setLoginPassword("");
    showNotification("You have been logged out of the CMS.", "info");
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!securityEmail.trim() || !securityEmail.includes("@")) {
      showNotification("A valid email address is required.", "error");
      return;
    }
    if (newPassword.trim().length > 0 && newPassword.trim().length < 6) {
      showNotification("Password must be at least 6 characters long.", "error");
      return;
    }
    if (newPassword.trim().length > 0 && newPassword.trim() !== confirmNewPassword.trim()) {
      showNotification("New password and confirmation do not match.", "error");
      return;
    }

    const accounts = getStoredAccounts();
    const updatedAccounts = accounts.map((acc) => {
      if (acc.email === currentUser?.email) {
        return {
          ...acc,
          name: securityName.trim() || acc.name,
          email: securityEmail.trim().toLowerCase(),
          password: newPassword.trim() || acc.password,
        };
      }
      return acc;
    });

    const updatedUser: AdminAccount = {
      name: securityName.trim() || currentUser?.name || "Admin",
      email: securityEmail.trim().toLowerCase(),
      password: newPassword.trim() || currentUser?.password || "",
      createdAt: currentUser?.createdAt || new Date().toISOString(),
    };

    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
    setCurrentUser(updatedUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));

    setNewPassword("");
    setConfirmNewPassword("");
    setSecuritySuccess("Security credentials updated successfully!");
    showNotification("Account credentials updated successfully!");
    setTimeout(() => setSecuritySuccess(""), 4000);
  };

  const handleRemoveCurrentUser = () => {
    if (!currentUser) return;
    if (
      window.confirm(
        `Are you sure you want to remove the current user account (${currentUser.email}) from the CMS? You will be signed out.`
      )
    ) {
      const remaining = getStoredAccounts().filter(
        (acc) => acc.email.toLowerCase() !== currentUser.email.toLowerCase()
      );
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(remaining));
      localStorage.removeItem(AUTH_KEY);
      handleLogout();
      showNotification("Current user account has been removed from the CMS.", "info");
    }
  };

  // Handle URL change with auto domain extraction
  const handleUrlChange = (val: string, isEditing: boolean = false) => {
    let cleanDomain = "";
    try {
      if (val.trim()) {
        const parsed = new URL(val.startsWith("http") ? val : `https://${val}`);
        cleanDomain = parsed.hostname.replace(/^www\./, "");
      }
    } catch {
      cleanDomain = val.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
    }

    if (isEditing && editingItem) {
      setEditingItem({
        ...editingItem,
        url: val,
        domain: cleanDomain || editingItem.domain,
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        url: val,
        domain: cleanDomain || prev.domain,
      }));
    }
  };

  // Image upload handler (File to base64 data URL)
  const handleImageUpload = (file: File, isEditing: boolean = false) => {
    if (!file.type.startsWith("image/")) {
      showNotification("Please select an image file (PNG, JPG, WebP)", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      if (isEditing && editingItem) {
        setEditingItem({ ...editingItem, screenshotUrl: dataUri });
      } else {
        setFormData((prev) => ({ ...prev, screenshotUrl: dataUri }));
      }

      // Also add to media library
      const newMedia = addMediaItem({
        name: file.name,
        url: dataUri,
        size: `${Math.round(file.size / 1024)} KB`,
        websiteAssociated: isEditing ? editingItem?.name : formData.name || "Untitled",
      });
      setMediaList((prev) => [newMedia, ...prev]);
      showNotification(`Screenshot "${file.name}" uploaded successfully!`);
    };
    reader.readAsDataURL(file);
  };

  // Save new website
  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showNotification("Website Title is required.", "error");
      return;
    }

    addItem({
      ...formData,
      domain: formData.domain || (formData.url ? formData.url.replace(/^https?:\/\//, "").split("/")[0] : ""),
    });

    showNotification(`Website "${formData.name}" added to database!`);
    setFormData(initialFormState);
    setActiveTab("all");
  };

  // Save edited website
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    updateItem(editingItem.id, editingItem);
    showNotification(`Changes to "${editingItem.name}" saved successfully!`);
    setEditingItem(null);
  };

  // Save Quick Edit
  const handleSaveQuickEdit = (item: PortfolioItem) => {
    updateItem(item.id, {
      url: quickUrl,
      domain: quickUrl ? quickUrl.replace(/^https?:\/\//, "").split("/")[0] : item.domain,
      screenshotUrl: quickScreenshot,
      isArchived: !quickUrl && !!item.behanceUrl,
    });
    setQuickEditId(null);
    showNotification(`Quick updated "${item.name}"!`);
  };

  // Filtered items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.domain && item.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSection = sectionFilter === "all" || item.section === sectionFilter;
    const matchesStatus = statusFilter === "all" || (item.status || "published") === statusFilter;

    return matchesSearch && matchesSection && matchesStatus;
  });

  // Calculate quick stats
  const totalCount = items.length;
  const liveCount = items.filter((i) => i.url && !i.isArchived).length;
  const withScreenshots = items.filter((i) => i.screenshotUrl).length;
  const funnelCount = items.filter((i) => i.section === "funnel").length;
  const webCount = items.filter((i) => i.section === "web").length;

  // --- RENDER WORDPRESS LOGIN SCREEN IF NOT AUTHENTICATED ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0f14] text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsla(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsla(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200">
          {/* WordPress / BrandIt Logo */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1d2327] to-[#2c3338] border border-[#3b444b] text-primary flex items-center justify-center mx-auto shadow-2xl mb-3">
              <span className="font-serif font-black text-3xl tracking-tight">W</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              BrandIt CMS Database
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Portfolio Database · URLs & Media Screenshot Manager
            </p>
          </div>

          {/* Auth Card: Sign In or Create Account */}
          <div className="bg-[#161922] border border-[#262c3a] rounded-xl p-6 sm:p-8 shadow-2xl space-y-5">
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 bg-[#0d0f14] border border-[#262c3a] rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setLoginError("");
                  setLoginSuccessNotice("");
                }}
                className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMode === "login"
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("register");
                  setLoginError("");
                  setLoginSuccessNotice("");
                }}
                className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMode === "register"
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account</span>
              </button>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-950/70 border border-rose-600/50 rounded-lg text-rose-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Error: </span>
                  {loginError}
                </div>
              </div>
            )}

            {loginSuccessNotice && (
              <div className="p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-lg text-emerald-200 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>{loginSuccessNotice}</div>
              </div>
            )}

            {authMode === "login" ? (
              /* LOGIN FORM */
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="admin@yourdomain.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#0d0f14] border border-[#262c3a] rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 bg-[#0d0f14] border border-[#262c3a] rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-primary focus:ring-primary"
                    />
                    <span>Remember Session</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("register");
                      setLoginError("");
                    }}
                    className="text-xs font-mono text-primary hover:underline"
                  >
                    Need an account? Sign up
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider shadow transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isLoggingIn ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Log In to CMS</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* REGISTRATION FORM */
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Full Name / Handle
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="John"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#0d0f14] border border-[#262c3a] rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="admin@yourdomain.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#0d0f14] border border-[#262c3a] rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Password (min. 6 characters)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 bg-[#0d0f14] border border-[#262c3a] rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 bg-[#0d0f14] border border-[#262c3a] rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-primary focus:ring-primary"
                    />
                    <span>Remember Session</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setLoginError("");
                    }}
                    className="text-xs font-mono text-primary hover:underline"
                  >
                    Already have an account? Sign in
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider shadow transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register & Access CMS</span>
                </button>
              </form>
            )}

            {/* Security Notice */}
            <div className="pt-3 border-t border-[#262c3a] text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected Private Endpoint · Authorized Users Only</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-1.5 font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Mehma Qudsia&apos;s Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-slate-100 flex flex-col font-sans">
      {/* --- WORDPRESS ADMIN BAR --- */}
      <header className="h-12 bg-[#1d2327] border-b border-[#2c3338] px-4 flex items-center justify-between text-xs select-none sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white font-bold tracking-wider">
            <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-sm">
              W
            </span>
            <span className="hidden sm:inline">Portfolio CMS Database</span>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white px-2.5 py-1 rounded hover:bg-[#2c3338] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-primary" />
            <span>Visit Live Portfolio</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              setEditingItem(null);
              setActiveTab("new");
            }}
            className="flex items-center gap-1 text-slate-300 hover:text-white px-2.5 py-1 rounded hover:bg-[#2c3338] transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Add Website</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Database Synced</span>
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1 px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono transition-colors cursor-pointer"
            title="Log Out of CMS"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* --- NOTICE TOAST --- */}
      {notice && (
        <div
          className={`fixed top-14 right-6 z-50 px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 text-sm font-medium border animate-in slide-in-from-top-2 duration-200 ${
            notice.type === "success"
              ? "bg-emerald-950/90 text-emerald-200 border-emerald-600/50"
              : notice.type === "error"
              ? "bg-rose-950/90 text-rose-200 border-rose-600/50"
              : "bg-blue-950/90 text-blue-200 border-blue-600/50"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{notice.message}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="ml-2 hover:opacity-75"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* --- WORDPRESS ADMIN SIDEBAR --- */}
        <aside className="w-56 bg-[#1d2327] border-r border-[#2c3338] flex flex-col shrink-0 text-slate-300">
          <div className="p-4 border-b border-[#2c3338]/60">
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Content Engine
            </p>
            <p className="text-sm font-bold text-white mt-0.5">Website Manager</p>
          </div>

          <nav className="flex-1 py-3 px-2 space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
                  : "hover:bg-[#2c3338] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Globe className="w-4 h-4" />
                <span>All Websites</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30">
                {totalCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setEditingItem(null);
                setActiveTab("new");
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-medium transition-colors ${
                activeTab === "new"
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
                  : "hover:bg-[#2c3338] hover:text-white"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add New Website</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("media")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition-colors ${
                activeTab === "media"
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
                  : "hover:bg-[#2c3338] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4" />
                <span>Media & Screenshots</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30">
                {mediaList.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-medium transition-colors ${
                activeTab === "dashboard"
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
                  : "hover:bg-[#2c3338] hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Dashboard Stats</span>
            </button>

            <div className="pt-4 mt-4 border-t border-[#2c3338]">
              <button
                type="button"
                onClick={() => setActiveTab("backup")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-medium transition-colors ${
                  activeTab === "backup"
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "hover:bg-[#2c3338] hover:text-white"
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Database & Backup</span>
              </button>
            </div>
          </nav>

          <div className="p-3 border-t border-[#2c3338] text-[11px] text-slate-400">
            <p>WordPress-Style CMS</p>
            <p className="text-slate-400 font-mono mt-0.5">v2.4.0 • Live Sync</p>
          </div>
        </aside>

        {/* --- MAIN ADMIN WORKSPACE --- */}
        <main className="flex-1 overflow-y-auto bg-[#0f1117] p-6 lg:p-8">
          {/* TAB 1: ALL WEBSITES TABLE (WORDPRESS POSTS STYLE) */}
          {activeTab === "all" && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
                    <span>Websites & Portfolios</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem(null);
                        setActiveTab("new");
                      }}
                      className="text-xs px-2.5 py-1 rounded bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/40 font-mono transition-colors"
                    >
                      Add New
                    </button>
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage direct website URLs, attached screenshots, Behance fallbacks, and live status.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const json = exportJson();
                      const blob = new Blob([json], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `portfolio-db-backup-${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      showNotification("Database exported to JSON!");
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-card border border-border text-xs text-slate-300 hover:text-white hover:border-primary/50 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="p-3 bg-[#161922] border border-[#262c3a] rounded-lg flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
                  <div className="relative flex-1 max-w-xs">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search website, title, URL..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-[#0f1117] border border-[#262c3a] rounded text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <select
                    value={sectionFilter}
                    onChange={(e) => setSectionFilter(e.target.value as any)}
                    className="px-2.5 py-1.5 bg-[#0f1117] border border-[#262c3a] rounded text-xs text-slate-300 focus:outline-none focus:border-primary"
                  >
                    <option value="all">All Sections ({totalCount})</option>
                    <option value="web">Web Development ({webCount})</option>
                    <option value="funnel">Funnels & Marketing ({funnelCount})</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-2.5 py-1.5 bg-[#0f1117] border border-[#262c3a] rounded text-xs text-slate-300 focus:outline-none focus:border-primary"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Live / Published</option>
                    <option value="archived">Archived / Behance</option>
                  </select>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  Showing {filteredItems.length} of {totalCount} items
                </div>
              </div>

              {/* WordPress Data Table */}
              <div className="bg-[#161922] border border-[#262c3a] rounded-lg overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300 border-collapse">
                    <thead className="bg-[#1b202d] text-slate-400 uppercase tracking-wider font-mono border-b border-[#262c3a]">
                      <tr>
                        <th className="p-3 w-16 text-center">Screenshot</th>
                        <th className="p-3">Website / Project</th>
                        <th className="p-3">Category & Type</th>
                        <th className="p-3">Live URL / Destination</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262c3a]">
                      {filteredItems.map((item) => {
                        const isQuickEditing = quickEditId === item.id;

                        if (isQuickEditing) {
                          return (
                            <tr key={item.id} className="bg-[#1d2331]">
                              <td colSpan={6} className="p-4">
                                <div className="space-y-3 bg-[#141824] p-4 rounded border border-primary/40">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-white text-sm">
                                      Quick Edit: {item.name}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setQuickEditId(null)}
                                      className="text-slate-400 hover:text-white"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                        Live Website URL
                                      </label>
                                      <input
                                        type="text"
                                        value={quickUrl}
                                        onChange={(e) => setQuickUrl(e.target.value)}
                                        placeholder="https://example.com"
                                        className="w-full px-3 py-1.5 bg-[#0f1117] border border-[#2c3547] rounded text-xs text-white focus:outline-none focus:border-primary"
                                      />
                                      <p className="text-[10px] text-slate-400 mt-1">
                                        Leave blank if website is offline (will show Behance screenshots).
                                      </p>
                                    </div>

                                    <div>
                                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                        Screenshot / Image URL
                                      </label>
                                      <input
                                        type="text"
                                        value={quickScreenshot}
                                        onChange={(e) => setQuickScreenshot(e.target.value)}
                                        placeholder="/images/... or https://..."
                                        className="w-full px-3 py-1.5 bg-[#0f1117] border border-[#2c3547] rounded text-xs text-white focus:outline-none focus:border-primary"
                                      />
                                    </div>
                                  </div>

                                  <div className="flex justify-end gap-2 pt-2">
                                    <button
                                      type="button"
                                      onClick={() => setQuickEditId(null)}
                                      className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleSaveQuickEdit(item)}
                                      className="px-3 py-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded text-xs font-bold flex items-center gap-1.5"
                                    >
                                      <Save className="w-3 h-3" />
                                      <span>Update Item</span>
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        }

                        return (
                          <tr
                            key={item.id}
                            className="hover:bg-[#1a202c] transition-colors group"
                          >
                            {/* Screenshot Thumbnail */}
                            <td className="p-3 text-center">
                              {item.screenshotUrl || item.image ? (
                                <button
                                  type="button"
                                  onClick={() => setSelectedScreenshotPreview(item.screenshotUrl || item.image || "")}
                                  className="w-10 h-10 rounded border border-border/80 overflow-hidden bg-black/40 inline-block hover:scale-110 transition-transform cursor-pointer relative group/thumb"
                                >
                                  <img
                                    src={item.screenshotUrl || item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                                    <Eye className="w-3 h-3 text-white" />
                                  </div>
                                </button>
                              ) : (
                                <div className="w-10 h-10 rounded border border-dashed border-slate-700 flex items-center justify-center text-slate-400 mx-auto">
                                  <ImageIcon className="w-4 h-4" />
                                </div>
                              )}
                            </td>

                            {/* Website / Project */}
                            <td className="p-3">
                              <div className="font-semibold text-white group-hover:text-primary transition-colors text-sm flex items-center gap-2">
                                <span>{item.name}</span>
                                {item.brand && (
                                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-primary/10 text-primary border border-primary/30 rounded">
                                    {item.brand}
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-400 text-[11px] line-clamp-1 mt-0.5 max-w-sm">
                                {item.desc}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-mono">
                                <span>Section: {item.section.toUpperCase()}</span>
                                <span>•</span>
                                <span>Platform: {item.platform}</span>
                              </div>
                            </td>

                            {/* Category & Type */}
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-[#202736] border border-[#2c3547] text-[11px] font-mono text-slate-200">
                                {item.category || item.type}
                              </span>
                            </td>

                            {/* Live URL / Destination */}
                            <td className="p-3">
                              {item.url ? (
                                <div className="space-y-1">
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-primary hover:underline font-mono text-[11px]"
                                  >
                                    <Globe className="w-3.5 h-3.5 shrink-0" />
                                    <span className="max-w-[160px] truncate">{item.domain || item.url}</span>
                                    <ExternalLink className="w-3 h-3 shrink-0" />
                                  </a>
                                  {item.isInternalPreview && (
                                    <span className="block text-[10px] font-mono text-emerald-400">
                                      ✓ Interactive Modal Active
                                    </span>
                                  )}
                                </div>
                              ) : item.behanceUrl ? (
                                <a
                                  href={item.behanceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-amber-400/90 hover:underline font-mono text-[11px]"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>Behance Screenshots</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <span className="text-slate-400 font-mono text-[11px]">
                                  No direct link
                                </span>
                              )}
                            </td>

                            {/* Status */}
                            <td className="p-3">
                              {item.url && !item.isArchived ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  <span>Live</span>
                                </span>
                              ) : item.behanceUrl ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono">
                                  <span>Screenshots</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/30 text-[10px] font-mono">
                                  <span>Archived</span>
                                </span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setQuickEditId(item.id);
                                    setQuickUrl(item.url || "");
                                    setQuickScreenshot(item.screenshotUrl || item.image || "");
                                  }}
                                  className="p-1 rounded bg-[#202736] hover:bg-slate-700 text-slate-300 hover:text-white"
                                  title="Quick Edit URL & Screenshot"
                                >
                                  <Sliders className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingItem(item);
                                    setActiveTab("new");
                                  }}
                                  className="p-1 rounded bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/25"
                                  title="Full Edit"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Delete "${item.name}" from database?`)) {
                                      deleteItem(item.id);
                                      showNotification(`"${item.name}" removed from database.`);
                                    }
                                  }}
                                  className="p-1 rounded bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ADD OR EDIT WEBSITE FORM (WORDPRESS POST EDITOR STYLE) */}
          {activeTab === "new" && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#262c3a]">
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    {editingItem ? (
                      <>
                        <Edit className="w-5 h-5 text-primary" />
                        <span>Edit Website: {editingItem.name}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-primary" />
                        <span>Add New Website / Portfolio Project</span>
                      </>
                    )}
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter the website details, live URL, and attach an image screenshot.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setActiveTab("all");
                    }}
                    className="px-3 py-1.5 bg-[#202736] hover:bg-slate-700 text-slate-300 rounded text-xs font-mono"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <form
                onSubmit={editingItem ? handleSaveEdit : handleSaveNew}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                {/* Left Column: Primary Details */}
                <div className="lg:col-span-8 space-y-5">
                  {/* Website Title */}
                  <div className="bg-[#161922] border border-[#262c3a] p-5 rounded-lg">
                    <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                      Website / Project Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Emaar Grand Polo, KW Boat Tours, Luxury Aesthetics..."
                      value={editingItem ? editingItem.name : formData.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (editingItem) setEditingItem({ ...editingItem, name: val });
                        else setFormData((prev) => ({ ...prev, name: val }));
                      }}
                      className="w-full px-4 py-2.5 bg-[#0f1117] border border-[#262c3a] rounded text-sm text-white font-medium focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* URLs & Destination Section */}
                  <div className="bg-[#161922] border border-[#262c3a] p-5 rounded-lg space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-primary" />
                      <span>Website URLs & Routing</span>
                    </h3>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Live Website URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="https://yourwebsite.com"
                          value={editingItem ? editingItem.url || "" : formData.url || ""}
                          onChange={(e) => handleUrlChange(e.target.value, !!editingItem)}
                          className="flex-1 px-3 py-2 bg-[#0f1117] border border-[#262c3a] rounded text-xs text-white font-mono focus:outline-none focus:border-primary"
                        />
                        {(editingItem?.url || formData.url) && (
                          <a
                            href={editingItem ? editingItem.url : formData.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded text-xs font-mono flex items-center gap-1 shrink-0"
                          >
                            <span>Test URL</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        If the website is live, visitors clicking the project card will open this URL directly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Display Domain Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. dreamhive.ae"
                          value={editingItem ? editingItem.domain || "" : formData.domain || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (editingItem) setEditingItem({ ...editingItem, domain: val });
                            else setFormData((prev) => ({ ...prev, domain: val }));
                          }}
                          className="w-full px-3 py-2 bg-[#0f1117] border border-[#262c3a] rounded text-xs text-white font-mono focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Behance Screenshots Fallback URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://www.behance.net/mehmaqudsia"
                          value={editingItem ? editingItem.behanceUrl || "" : formData.behanceUrl || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (editingItem) setEditingItem({ ...editingItem, behanceUrl: val });
                            else setFormData((prev) => ({ ...prev, behanceUrl: val }));
                          }}
                          className="w-full px-3 py-2 bg-[#0f1117] border border-[#262c3a] rounded text-xs text-white font-mono focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Screenshot & Media Upload */}
                  <div className="bg-[#161922] border border-[#262c3a] p-5 rounded-lg space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-primary" />
                      <span>Screenshot & Media Attachment</span>
                    </h3>

                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      {/* Thumbnail Preview Box */}
                      <div className="w-36 h-28 rounded-lg border border-[#262c3a] bg-black/40 flex items-center justify-center overflow-hidden shrink-0 relative group">
                        {(editingItem ? editingItem.screenshotUrl : formData.screenshotUrl) ? (
                          <>
                            <img
                              src={editingItem ? editingItem.screenshotUrl : formData.screenshotUrl}
                              alt="Screenshot Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                              <button
                                type="button"
                                onClick={() => {
                                  if (editingItem) setEditingItem({ ...editingItem, screenshotUrl: "" });
                                  else setFormData((prev) => ({ ...prev, screenshotUrl: "" }));
                                }}
                                className="p-1 rounded bg-rose-600 text-white"
                                title="Remove screenshot"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="text-center p-2 text-slate-400">
                            <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-50" />
                            <span className="text-[10px] block">No Screenshot</span>
                          </div>
                        )}
                      </div>

                      {/* Controls */}
                      <div className="flex-1 space-y-3 w-full">
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">
                            Direct Image URL / Path
                          </label>
                          <input
                            type="text"
                            placeholder="https://... or /images/my-site-screenshot.png"
                            value={editingItem ? editingItem.screenshotUrl || "" : formData.screenshotUrl || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (editingItem) setEditingItem({ ...editingItem, screenshotUrl: val });
                              else setFormData((prev) => ({ ...prev, screenshotUrl: val }));
                            }}
                            className="w-full px-3 py-2 bg-[#0f1117] border border-[#262c3a] rounded text-xs text-white font-mono focus:outline-none focus:border-primary"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageUpload(e.target.files[0], !!editingItem);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-mono transition-colors"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Screenshot File</span>
                          </button>
                          <span className="text-[10px] text-slate-400">
                            Supports PNG, JPG, WebP (auto base64 storage)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description / Summary */}
                  <div className="bg-[#161922] border border-[#262c3a] p-5 rounded-lg">
                    <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                      Description & Scope
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Brief overview of the website, build details, or conversion results..."
                      value={editingItem ? editingItem.desc : formData.desc}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (editingItem) setEditingItem({ ...editingItem, desc: val });
                        else setFormData((prev) => ({ ...prev, desc: val }));
                      }}
                      className="w-full px-4 py-2.5 bg-[#0f1117] border border-[#262c3a] rounded text-xs text-white focus:outline-none focus:border-primary leading-relaxed"
                    />
                  </div>
                </div>

                {/* Right Column: Taxonomy, Platform & Publishing Status */}
                <div className="lg:col-span-4 space-y-5">
                  {/* Publish Actions Box */}
                  <div className="bg-[#161922] border border-[#262c3a] p-5 rounded-lg space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#262c3a]">
                      Publish & Status
                    </h3>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Post Status
                      </label>
                      <select
                        value={editingItem ? editingItem.status || "published" : formData.status}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          if (editingItem) setEditingItem({ ...editingItem, status: val });
                          else setFormData((prev) => ({ ...prev, status: val }));
                        }}
                        className="w-full px-3 py-2 bg-[#0f1117] border border-[#262c3a] rounded text-xs text-white focus:outline-none focus:border-primary"
                      >
                        <option value="published">Published (Visible on Portfolio)</option>
                        <option value="draft">Draft (Hidden)</option>
                        <option value="archived">Archived (Screenshot Mode)</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingItem ? "Update Website" : "Publish to Portfolio"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Section & Category */}
                  <div className="bg-[#161922] border border-[#262c3a] p-5 rounded-lg space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#262c3a]">
                      Categorization
                    </h3>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Portfolio Section
                      </label>
                      <select
                        value={editingItem ? editingItem.section : formData.section}
                        onChange={(e) => {
                          const val = e.target.value as "web" | "funnel";
                          if (editingItem) setEditingItem({ ...editingItem, section: val });
                          else setFormData((prev) => ({ ...prev, section: val }));
                        }}
                        className="w-full px-3 py-2 bg-[#0f1117] border border-[#262c3a] rounded text-xs text-white focus:outline-none focus:border-primary"
                      >
                        <option value="web">Web Development</option>
                        <option value="funnel">Sales Funnel & Lead Gen</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Industry / Category
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Real Estate, Med Spa, Travel..."
                        value={editingItem ? editingItem.category : formData.category}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (editingItem) setEditingItem({ ...editingItem, category: val });
                          else setFormData((prev) => ({ ...prev, category: val }));
                        }}
                        className="w-full px-3 py-2 bg-[#0f1117] border border-[#262c3a] rounded text-xs text-white focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Platform / CMS
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. WordPress, Shopify, GoHighLevel, Next.js..."
                        value={editingItem ? editingItem.platform : formData.platform}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (editingItem) setEditingItem({ ...editingItem, platform: val });
                          else setFormData((prev) => ({ ...prev, platform: val }));
                        }}
                        className="w-full px-3 py-2 bg-[#0f1117] border border-[#262c3a] rounded text-xs text-white focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Brand / Developer Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Emaar, Meraas, Luna Skin Lab..."
                        value={editingItem ? editingItem.brand || "" : formData.brand || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (editingItem) setEditingItem({ ...editingItem, brand: val });
                          else setFormData((prev) => ({ ...prev, brand: val }));
                        }}
                        className="w-full px-3 py-2 bg-[#0f1117] border border-[#262c3a] rounded text-xs text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: MEDIA LIBRARY */}
          {activeTab === "media" && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-6 h-6 text-primary" />
                    <span>Media & Screenshots Library</span>
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Store and organize all website screenshots and preview images.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={mediaUploadRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => mediaUploadRef.current?.click()}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded text-xs font-bold font-mono transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Screenshot</span>
                  </button>
                </div>
              </div>

              {/* Grid of Screenshots */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {items.filter(i => i.screenshotUrl || i.image).map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#161922] border border-[#262c3a] rounded-lg overflow-hidden group hover:border-primary/50 transition-all flex flex-col"
                  >
                    <div className="h-32 bg-black/50 relative overflow-hidden flex items-center justify-center">
                      <img
                        src={item.screenshotUrl || item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <button
                        type="button"
                        onClick={() => setSelectedScreenshotPreview(item.screenshotUrl || item.image || "")}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-white text-xs font-mono transition-opacity"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </button>
                    </div>

                    <div className="p-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-bold text-white truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono truncate">{item.category}</p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-[#262c3a] flex items-center justify-between text-[10px] font-mono">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(item.screenshotUrl || item.image || "");
                            showNotification("Screenshot URL copied to clipboard!");
                          }}
                          className="text-primary hover:underline"
                        >
                          Copy Link
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingItem(item);
                            setActiveTab("new");
                          }}
                          className="text-slate-400 hover:text-white"
                        >
                          Edit Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DASHBOARD STATS */}
          {activeTab === "dashboard" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <h1 className="text-2xl font-bold text-white">Database Metrics & Status</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#161922] border border-[#262c3a] p-5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase text-slate-400">Total Websites</span>
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-white">{totalCount}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Managed in persistent DB</p>
                </div>

                <div className="bg-[#161922] border border-[#262c3a] p-5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase text-slate-400">Live Direct URLs</span>
                    <ExternalLink className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="text-3xl font-bold text-emerald-400">{liveCount}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Confirmed active domains</p>
                </div>

                <div className="bg-[#161922] border border-[#262c3a] p-5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase text-slate-400">Screenshots Attached</span>
                    <ImageIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-3xl font-bold text-amber-400">{withScreenshots}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Images in media registry</p>
                </div>

                <div className="bg-[#161922] border border-[#262c3a] p-5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase text-slate-400">Sections</span>
                    <Layers className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {webCount} <span className="text-sm font-normal text-slate-400">Web</span> / {funnelCount}{" "}
                    <span className="text-sm font-normal text-slate-400">Funnels</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Multi-vertical coverage</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#161922] border border-[#262c3a] p-6 rounded-lg space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  WordPress-Style Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setActiveTab("new");
                    }}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded text-xs flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Website</span>
                  </button>
                  <Link
                    href="/"
                    className="px-4 py-2 bg-[#202736] hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Public Portfolio</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DATABASE BACKUP & JSON */}
          {activeTab === "backup" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Database className="w-6 h-6 text-primary" />
                <span>Database Backup & Restore</span>
              </h1>
              <p className="text-xs text-slate-400">
                Safely export your entire database of websites, URLs, and screenshots as a JSON backup, or import from an existing file.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#161922] border border-[#262c3a] p-6 rounded-lg space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Export Database</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Download a full snapshot of your portfolio database to store locally or migrate.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const json = exportJson();
                      const blob = new Blob([json], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `brandit-portfolio-db-${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      showNotification("Database exported successfully!");
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                <div className="bg-[#161922] border border-[#262c3a] p-6 rounded-lg space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-blue-400" />
                    <span>Import Database</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Restore from a previously saved JSON backup file.
                  </p>
                  <input
                    type="file"
                    ref={jsonImportRef}
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const content = event.target?.result as string;
                          const res = importJson(content);
                          if (res.success) {
                            showNotification(`Successfully restored ${res.count} items!`);
                          } else {
                            showNotification(`Import failed: ${res.error}`, "error");
                          }
                        };
                        reader.readAsText(file);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => jsonImportRef.current?.click()}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload & Restore JSON</span>
                  </button>
                </div>
              </div>

              {/* Security & Admin Credentials */}
              <div className="bg-[#161922] border border-[#262c3a] p-6 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>CMS Account & Security Credentials</span>
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    Protected
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Manage your authenticated admin profile and access credentials. Signed in as <strong className="text-white">{currentUser?.email}</strong>.
                </p>

                {securitySuccess && (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded text-emerald-200 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{securitySuccess}</span>
                  </div>
                )}

                <form onSubmit={handleSaveSecurity} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Full Name / Admin Handle
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={securityName}
                        onChange={(e) => setSecurityName(e.target.value)}
                        placeholder="John"
                        className="w-full pl-9 pr-3 py-2 bg-[#0d0f14] border border-[#262c3a] rounded text-xs text-white focus:outline-none focus:border-primary font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Admin Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={securityEmail}
                        onChange={(e) => setSecurityEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#0d0f14] border border-[#262c3a] rounded text-xs text-white focus:outline-none focus:border-primary font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      New Password (min 6 chars, leave blank to keep current)
                    </label>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#0d0f14] border border-[#262c3a] rounded text-xs text-white focus:outline-none focus:border-primary font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#0d0f14] border border-[#262c3a] rounded text-xs text-white focus:outline-none focus:border-primary font-mono"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
                    {currentUser && (
                      <button
                        type="button"
                        onClick={handleRemoveCurrentUser}
                        className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                        <span>Remove Current User from CMS</span>
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Update Account Security</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="bg-[#161922] border border-rose-900/40 p-6 rounded-lg space-y-3">
                <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Factory Defaults</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Reverts the database back to the original audited set of portfolio websites and funnel projects.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Reset database to factory defaults? All custom additions will be restored to initial state.")) {
                      resetDb();
                      showNotification("Database reset to factory default projects.");
                    }
                  }}
                  className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 rounded text-xs font-mono transition-colors"
                >
                  Reset Database
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- FULLSCREEN SCREENSHOT PREVIEW LIGHTBOX --- */}
      {selectedScreenshotPreview && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedScreenshotPreview(null)}
        >
          <div
            className="max-w-4xl max-h-[90vh] bg-[#161922] border border-[#262c3a] rounded-xl overflow-hidden shadow-2xl flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 bg-[#1d2327] border-b border-[#262c3a] flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300">Screenshot Preview</span>
              <button
                type="button"
                onClick={() => setSelectedScreenshotPreview(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 overflow-auto max-h-[80vh] flex items-center justify-center bg-black/40">
              <img
                src={selectedScreenshotPreview}
                alt="Screenshot Full View"
                className="max-w-full max-h-[75vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
