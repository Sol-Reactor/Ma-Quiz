import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { authAPI } from "../api/api";
import { customer1 } from "../assets/images";

const MAX_AVATAR_SIZE_MB = 3;
const MAX_AVATAR_SIZE_BYTES = MAX_AVATAR_SIZE_MB * 1024 * 1024;

function Profile() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(customer1);
  const [usernameDraft, setUsernameDraft] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { user } = await authAPI.getProfile();
        setProfile(user);
        setUsernameDraft(user.username);
      } catch (error) {
        console.error("Error fetching profile:", error);
        const message =
          typeof error?.message === "string"
            ? error.message
            : "Failed to fetch profile.";
        toast.error(message);
        if (/expired|unauthorized|401/i.test(message)) {
          logout();
          navigate("/signup");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, logout, navigate]);

  const avatarStorageKey = useMemo(() => {
    if (!profile?.id) return null;
    return `profile-avatar-${profile.id}`;
  }, [profile]);

  useEffect(() => {
    if (!avatarStorageKey) return;
    const storedAvatar = localStorage.getItem(avatarStorageKey);
    if (storedAvatar) {
      setAvatarPreview(storedAvatar);
    } else {
      setAvatarPreview(customer1);
    }
  }, [avatarStorageKey]);

  const handleAvatarUpload = (event) => {
    if (!avatarStorageKey) return;
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      toast.error(`Please choose an image under ${MAX_AVATAR_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setAvatarPreview(result);
        localStorage.setItem(avatarStorageKey, result);
        toast.success("Profile photo updated locally.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetAvatar = () => {
    if (!avatarStorageKey) return;
    localStorage.removeItem(avatarStorageKey);
    setAvatarPreview(customer1);
    toast.success("Reverted to default profile photo.");
  };

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    if (!profile) return;
    const trimmed = usernameDraft.trim();
    if (!trimmed) {
      toast.error("Username cannot be empty.");
      return;
    }
    if (trimmed === profile.username) {
      toast.success("Looks great! No changes needed.");
      return;
    }

    try {
      setSavingProfile(true);
      const { user } = await authAPI.updateProfile({ username: trimmed });
      setProfile(user);
      setUsernameDraft(user.username);
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      const message =
        typeof error?.message === "string"
          ? error.message
          : "Unable to update profile.";
      toast.error(message);
    } finally {
      setSavingProfile(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[var(--color-bg)] pt-24 pb-16 px-4 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[var(--color-bg)] pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="glass-panel rounded-3xl max-w-md w-full p-8 text-center">
          <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-4">
            Profile not found
          </h2>
          <button
            className="accent-button px-6 py-3 rounded-full font-semibold shadow-theme-soft hover:shadow-theme-strong transition"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const joinedDate = new Date(profile.created_at).toLocaleDateString();

  const highlightCards = [
    {
      label: "Role",
      value: profile.role?.toUpperCase(),
      description:
        profile.role === "admin"
          ? "You have access to admin controls and analytics."
          : "You’re exploring as a learner — keep going!",
    },
    {
      label: "Member Since",
      value: joinedDate,
      description: "Consistent practice compounds over time.",
    },
    {
      label: "Preferred Mode",
      value: "Timed Sprint",
      description: "New timed challenges help sharpen focus.",
    },
  ];

  const achievements = [
    {
      title: "Consistency Starter",
      detail: "Complete 3 quizzes in a single week.",
      completed: true,
    },
    {
      title: "Curiosity Spark",
      detail: "Explore a new quiz topic from the library.",
      completed: false,
    },
    {
      title: "Precision Ace",
      detail: "Score 80% or higher on any quiz.",
      completed: false,
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-[var(--color-bg)] pt-24 pb-16 px-4">
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <div className="absolute -top-32 -left-10 h-80 w-80 rounded-full bg-[var(--color-accent)]/15 blur-3xl" />
        <div className="absolute top-24 right-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto space-y-10">
        <section className="glass-panel rounded-3xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="relative self-center md:self-start">
              <div className="h-36 w-36 md:h-40 md:w-40 rounded-3xl overflow-hidden border-4 border-[var(--color-surface)] shadow-theme-strong">
                <img
                  src={avatarPreview}
                  alt={`${profile.username} avatar`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] border border-soft hover:shadow-theme-soft transition text-sm font-semibold"
                >
                  Change photo
                </button>
                <button
                  type="button"
                  onClick={handleResetAvatar}
                  className="px-4 py-2 rounded-full bg-transparent text-muted border border-soft hover:shadow-theme-soft transition text-sm font-semibold"
                >
                  Reset
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted">
                  Account
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text)] mt-2">
                  {profile.username}
                </h1>
                <p className="text-muted mt-1">{profile.email}</p>
              </div>

              <form
                onSubmit={handleUsernameSubmit}
                className="bg-[var(--color-surface)] border border-soft rounded-2xl p-5 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <label
                    htmlFor="displayName"
                    className="text-sm font-semibold text-muted uppercase tracking-[0.3em]"
                  >
                    Display Name
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    value={usernameDraft}
                    onChange={(event) => setUsernameDraft(event.target.value)}
                    className="flex-1 rounded-full border border-soft bg-white/80 px-4 py-2 text-[var(--color-text)] shadow-theme-soft focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                    placeholder="Enter your display name"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-xs text-muted">
                    This name appears on leaderboards and in competitions.
                  </p>
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full accent-button font-semibold shadow-theme-soft hover:shadow-theme-strong transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {savingProfile ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[var(--color-surface)] border border-soft rounded-2xl p-4">
                  <h3 className="text-sm font-semibold text-muted uppercase tracking-[0.3em] mb-1">
                    Status
                  </h3>
                  <p className="text-[var(--color-text)] font-semibold">
                    {profile.role === "admin" ? "Administrator" : "Quiz Explorer"}
                  </p>
                </div>
                <div className="bg-[var(--color-surface)] border border-soft rounded-2xl p-4">
                  <h3 className="text-sm font-semibold text-muted uppercase tracking-[0.3em] mb-1">
                    Joined
                  </h3>
                  <p className="text-[var(--color-text)] font-semibold">
                    {joinedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {highlightCards.map((card) => (
            <div
              key={card.label}
              className="bg-[var(--color-surface)] border border-soft rounded-2xl p-6 shadow-theme-soft"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted mb-2">
                {card.label}
              </p>
              <h3 className="text-xl font-bold text-[var(--color-text)]">
                {card.value}
              </h3>
              <p className="text-sm text-muted mt-2">{card.description}</p>
            </div>
          ))}
        </section>

        <section className="glass-panel rounded-3xl p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">
                Achievement Journey
              </h2>
              <p className="text-muted">
                Track what you’ve unlocked and what’s coming next.
              </p>
            </div>
            <button
              onClick={() => navigate("/quiz")}
              className="px-5 py-2 rounded-full accent-button font-semibold shadow-theme-soft hover:shadow-theme-strong transition"
            >
              Jump to Quiz Arena
            </button>
          </div>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className="flex items-center justify-between bg-[var(--color-surface)] border border-soft rounded-2xl px-5 py-4"
              >
                <div>
                  <p className="text-lg font-semibold text-[var(--color-text)]">
                    {achievement.title}
                  </p>
                  <p className="text-sm text-muted">{achievement.detail}</p>
                </div>
                <span
                  className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold ${
                    achievement.completed
                      ? "bg-emerald-500/20 text-emerald-500"
                      : "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                  }`}
                >
                  {achievement.completed ? "Unlocked" : "Coming Up"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
