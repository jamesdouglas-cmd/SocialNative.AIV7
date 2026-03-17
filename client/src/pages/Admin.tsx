/* Admin — Social Native Content Dashboard
   Password-protected. Bloglettes (top) + Articles (bottom).
   Auth token stored in sessionStorage under key "sn_admin_token". */
import { useState, useEffect, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Post = {
  id: number;
  type: "hero" | "article";
  status: "draft" | "published";
  slug: string | null;
  title: string;
  byline: string | null;
  body: string | null;
  tag: string | null;
  author: string | null;
  publishedAt: string | null;
  createdAt: string;
};

type Bloglette = {
  id: number;
  body: string;
  publishedAt: string | null;
  createdAt: string;
};

// ─── API helper ───────────────────────────────────────────────────────────────

function api(path: string, options?: RequestInit) {
  const token = sessionStorage.getItem("sn_admin_token") ?? "";
  return fetch(`/api/admin${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options?.headers ?? {}),
    },
  });
}

// ─── Utils ────────────────────────────────────────────────────────────────────

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const TAGS = ["Data", "Strategy", "Case Study", "Playbook", "Platform Intelligence", "Creator Economy"];

// ─── Post card with inline editor ─────────────────────────────────────────────

function PostCard({
  post,
  onPublish,
  onUnpublish,
  onUpdate,
  onDelete,
}: {
  post: Post;
  onPublish: (id: number) => void;
  onUnpublish: (id: number) => void;
  onUpdate: (id: number, data: Partial<Post>) => void;
  onDelete: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: post.title ?? "",
    byline: post.byline ?? "",
    body: post.body ?? "",
    tag: post.tag ?? "",
    author: post.author ?? "",
    type: post.type,
  });

  // Keep form in sync if post updates externally (e.g., after AI generate)
  useEffect(() => {
    setForm({
      title: post.title ?? "",
      byline: post.byline ?? "",
      body: post.body ?? "",
      tag: post.tag ?? "",
      author: post.author ?? "",
      type: post.type,
    });
  }, [post.id]);

  async function handleSave() {
    setSaving(true);
    await onUpdate(post.id, form);
    setSaving(false);
    setExpanded(false);
  }

  const isDraft = post.status === "draft";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 p-4">
        <button
          className="flex-1 text-left"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="font-semibold text-[#111827] text-sm leading-snug line-clamp-2">
            {post.title || <span className="text-gray-400 italic">Untitled draft</span>}
          </div>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {post.tag && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c3aed] bg-[#f5f3ff] px-2 py-0.5 rounded-full">
                {post.tag}
              </span>
            )}
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              post.type === "hero"
                ? "bg-blue-50 text-blue-600"
                : "bg-gray-100 text-gray-500"
            }`}>
              {post.type}
            </span>
            {post.publishedAt && (
              <span className="text-[11px] text-gray-400">{fmtDate(post.publishedAt)}</span>
            )}
            {!post.publishedAt && post.createdAt && (
              <span className="text-[11px] text-gray-400">Created {fmtDate(post.createdAt)}</span>
            )}
          </div>
        </button>

        <div className="flex items-center gap-2 flex-shrink-0">
          {isDraft ? (
            <button
              onClick={() => onPublish(post.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
            >
              Publish →
            </button>
          ) : (
            <button
              onClick={() => onUnpublish(post.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              Unpublish
            </button>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            {expanded ? "▲ Close" : "▼ Edit"}
          </button>
          <button
            onClick={() => {
              if (confirm(`Delete "${post.title}"?`)) onDelete(post.id);
            }}
            className="text-gray-300 hover:text-red-400 transition-colors p-1"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Inline editor */}
      {expanded && (
        <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Title</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#7c3aed]"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Article title"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Author</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#7c3aed]"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Social Native Team"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Byline / Deck</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#7c3aed]"
              value={form.byline}
              onChange={(e) => setForm({ ...form, byline: e.target.value })}
              placeholder="One-sentence summary shown on the blog card"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Tag</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#7c3aed]"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
              >
                <option value="">— Select tag —</option>
                {TAGS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Type</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#7c3aed]"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as "hero" | "article" })}
              >
                <option value="article">Article</option>
                <option value="hero">Hero (featured)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Body <span className="normal-case font-normal text-gray-400">(HTML)</span>
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#7c3aed] font-mono"
              rows={10}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="<p>Article body as HTML...</p>"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
            <button
              onClick={() => setExpanded(false)}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Admin page ──────────────────────────────────────────────────────────

export default function Admin() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("sn_admin_token"));
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [bloglettes, setBloglettes] = useState<Bloglette[]>([]);
  const [loading, setLoading] = useState(false);

  // Bloglette entry
  const [newBloglette, setNewBloglette] = useState("");
  const [posting, setPosting] = useState(false);
  const bloglettaRef = useRef<HTMLTextAreaElement>(null);

  // AI generate
  const [generateTopic, setGenerateTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");
  const [showGenerate, setShowGenerate] = useState(false);

  // New manual post
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostForm, setNewPostForm] = useState({ title: "", byline: "", body: "", tag: "", author: "Social Native Team", type: "article" as "hero" | "article" });
  const [savingNew, setSavingNew] = useState(false);

  // ── Load data ──
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api("/feed");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts ?? []);
        setBloglettes(data.bloglettes ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) loadData();
  }, [authed, loadData]);

  // ── Auth ──
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem("sn_admin_token", password);
        setAuthed(true);
      } else {
        setAuthError("Incorrect password.");
      }
    } catch {
      setAuthError("Could not connect to server.");
    } finally {
      setAuthLoading(false);
    }
  }

  function logout() {
    sessionStorage.removeItem("sn_admin_token");
    setAuthed(false);
    setPassword("");
  }

  // ── Bloglettes ──
  async function postBloglette() {
    if (!newBloglette.trim()) return;
    setPosting(true);
    try {
      const res = await api("/bloglettes", {
        method: "POST",
        body: JSON.stringify({ body: newBloglette.trim() }),
      });
      if (res.ok) {
        const b = await res.json();
        setBloglettes((prev) => [b, ...prev]);
        setNewBloglette("");
        bloglettaRef.current?.focus();
      }
    } finally {
      setPosting(false);
    }
  }

  async function removeBloglette(id: number) {
    await api(`/bloglettes/${id}`, { method: "DELETE" });
    setBloglettes((prev) => prev.filter((b) => b.id !== id));
  }

  // ── Posts ──
  async function handlePublish(id: number) {
    const res = await api(`/posts/${id}/publish`, { method: "POST" });
    if (res.ok) {
      const updated = await res.json();
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    }
  }

  async function handleUnpublish(id: number) {
    const res = await api(`/posts/${id}/unpublish`, { method: "POST" });
    if (res.ok) {
      const updated = await res.json();
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    }
  }

  async function handleUpdate(id: number, data: Partial<Post>) {
    const res = await api(`/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const updated = await res.json();
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    }
  }

  async function handleDelete(id: number) {
    await api(`/posts/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  // ── AI Generate ──
  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!generateTopic.trim()) return;
    setGenerating(true);
    setGenerateError("");
    try {
      const res = await api("/generate", {
        method: "POST",
        body: JSON.stringify({ topic: generateTopic.trim() }),
      });
      if (res.ok) {
        const post = await res.json();
        setPosts((prev) => [post, ...prev]);
        setGenerateTopic("");
        setShowGenerate(false);
      } else {
        const err = await res.json();
        setGenerateError(err.error ?? "Generation failed. Try again.");
      }
    } catch {
      setGenerateError("Could not connect to server.");
    } finally {
      setGenerating(false);
    }
  }

  // ── New manual post ──
  async function handleSaveNewPost(e: React.FormEvent) {
    e.preventDefault();
    setSavingNew(true);
    try {
      const res = await api("/posts", {
        method: "POST",
        body: JSON.stringify(newPostForm),
      });
      if (res.ok) {
        const post = await res.json();
        setPosts((prev) => [post, ...prev]);
        setNewPostForm({ title: "", byline: "", body: "", tag: "", author: "Social Native Team", type: "article" });
        setShowNewPost(false);
      }
    } finally {
      setSavingNew(false);
    }
  }

  const drafts = posts.filter((p) => p.status === "draft");
  const published = posts.filter((p) => p.status === "published");

  // ── Password screen ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f4f5f7] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-8 text-center">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 font-bold text-white text-sm"
            style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
          >
            SN
          </div>
          <h1 className="text-xl font-bold text-[#111827] mb-1">Social Native Admin</h1>
          <p className="text-sm text-gray-400 mb-6">Content dashboard</p>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c3aed]"
              autoFocus
            />
            {authError && <p className="text-red-400 text-xs">{authError}</p>}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
            >
              {authLoading ? "Checking…" : "Enter →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ──
  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      {/* Header */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 border-b border-white/60"
        style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-[10px]"
            style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
          >
            SN
          </div>
          <span className="font-bold text-sm text-[#111827]">Admin</span>
          {loading && (
            <span className="text-xs text-gray-400 ml-2">Loading…</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/blog"
            target="_blank"
            className="text-xs text-gray-400 hover:text-[#7c3aed] transition-colors"
          >
            View blog ↗
          </a>
          <button
            onClick={logout}
            className="text-xs text-gray-400 hover:text-[#111827] transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">

        {/* ── BLOGLETTES ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base font-bold text-[#111827]">⚡ Bloglettes</span>
            <span className="text-xs text-gray-400 font-normal">Live feed · posts immediately</span>
          </div>

          {/* Quick entry */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <textarea
              ref={bloglettaRef}
              className="w-full border-none outline-none text-sm text-[#111827] placeholder-gray-300 resize-none"
              rows={3}
              value={newBloglette}
              onChange={(e) => setNewBloglette(e.target.value)}
              placeholder="What's happening in creator marketing right now? (Cmd+Enter to post)"
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  e.preventDefault();
                  postBloglette();
                }
              }}
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
              <span className="text-[11px] text-gray-300">
                {newBloglette.length}/500
              </span>
              <button
                onClick={postBloglette}
                disabled={posting || !newBloglette.trim()}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
              >
                {posting ? "Posting…" : "Post →"}
              </button>
            </div>
          </div>

          {/* Bloglette list */}
          {bloglettes.length > 0 && (
            <div className="mt-3 space-y-2">
              {bloglettes.map((b) => (
                <div
                  key={b.id}
                  className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-start justify-between gap-3 shadow-sm"
                >
                  <p className="text-sm text-[#374151] leading-relaxed flex-1">{b.body}</p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[11px] text-gray-300">{timeAgo(b.publishedAt ?? b.createdAt)}</span>
                    <button
                      onClick={() => removeBloglette(b.id)}
                      className="text-gray-200 hover:text-red-400 transition-colors text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {bloglettes.length === 0 && !loading && (
            <p className="text-sm text-gray-400 mt-3 text-center py-4">
              No bloglettes yet — post one above.
            </p>
          )}
        </section>

        {/* ── ARTICLES ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <span className="text-base font-bold text-[#111827]">📝 Articles</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setShowGenerate(!showGenerate); setShowNewPost(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#f5f3ff] text-[#7c3aed] hover:bg-[#ede9fe] transition-colors"
              >
                ✨ Generate with AI
              </button>
              <button
                onClick={() => { setShowNewPost(!showNewPost); setShowGenerate(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                + New Draft
              </button>
            </div>
          </div>

          {/* AI generate form */}
          {showGenerate && (
            <form
              onSubmit={handleGenerate}
              className="bg-white border border-[#ede9fe] rounded-2xl p-4 mb-4 shadow-sm space-y-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#7c3aed] uppercase tracking-wider">✨ Generate with Gemini AI</span>
              </div>
              <input
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#7c3aed]"
                value={generateTopic}
                onChange={(e) => setGenerateTopic(e.target.value)}
                placeholder="e.g. Why micro-creators outperform macro on TikTok in 2026"
                autoFocus
              />
              {generateError && (
                <p className="text-red-400 text-xs">{generateError}</p>
              )}
              {generating && (
                <div className="flex items-center gap-2 text-sm text-[#7c3aed]">
                  <div className="w-4 h-4 border-2 border-[#7c3aed]/30 border-t-[#7c3aed] rounded-full animate-spin" />
                  Gemini is writing your draft…
                </div>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={generating || !generateTopic.trim()}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
                >
                  {generating ? "Generating…" : "Generate Draft"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowGenerate(false); setGenerateError(""); }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* New post form */}
          {showNewPost && (
            <form
              onSubmit={handleSaveNewPost}
              className="bg-white border border-gray-100 rounded-2xl p-4 mb-4 shadow-sm space-y-3"
            >
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">New Draft</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Title *</label>
                  <input
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7c3aed]"
                    value={newPostForm.title}
                    onChange={(e) => setNewPostForm({ ...newPostForm, title: e.target.value })}
                    placeholder="Article title"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Author</label>
                  <input
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7c3aed]"
                    value={newPostForm.author}
                    onChange={(e) => setNewPostForm({ ...newPostForm, author: e.target.value })}
                  />
                </div>
              </div>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7c3aed]"
                value={newPostForm.byline}
                onChange={(e) => setNewPostForm({ ...newPostForm, byline: e.target.value })}
                placeholder="Byline / deck"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7c3aed]"
                  value={newPostForm.tag}
                  onChange={(e) => setNewPostForm({ ...newPostForm, tag: e.target.value })}
                >
                  <option value="">— Tag —</option>
                  {TAGS.map((t) => <option key={t}>{t}</option>)}
                </select>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7c3aed]"
                  value={newPostForm.type}
                  onChange={(e) => setNewPostForm({ ...newPostForm, type: e.target.value as "hero" | "article" })}
                >
                  <option value="article">Article</option>
                  <option value="hero">Hero (featured)</option>
                </select>
              </div>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7c3aed] font-mono"
                rows={6}
                value={newPostForm.body}
                onChange={(e) => setNewPostForm({ ...newPostForm, body: e.target.value })}
                placeholder="<p>Body as HTML (optional — can edit after saving)</p>"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={savingNew}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
                >
                  {savingNew ? "Saving…" : "Save Draft"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewPost(false)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Drafts */}
          {drafts.length > 0 && (
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Drafts ({drafts.length})
              </p>
              <div className="space-y-2">
                {drafts.map((p) => (
                  <PostCard
                    key={p.id}
                    post={p}
                    onPublish={handlePublish}
                    onUnpublish={handleUnpublish}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Published */}
          {published.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Published ({published.length})
              </p>
              <div className="space-y-2">
                {published.map((p) => (
                  <PostCard
                    key={p.id}
                    post={p}
                    onPublish={handlePublish}
                    onUnpublish={handleUnpublish}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No articles yet.</p>
              <p className="text-xs mt-1">Generate one with AI or create a draft above.</p>
            </div>
          )}
        </section>

        {/* ── Setup note ── */}
        <div className="bg-[#f5f3ff] border border-[#ede9fe] rounded-2xl p-4 text-xs text-[#7c3aed] space-y-1">
          <p className="font-bold">Setup reminders</p>
          <p>• Set <code className="bg-[#ede9fe] px-1 rounded">ADMIN_PASSWORD</code> in your environment variables.</p>
          <p>• Set <code className="bg-[#ede9fe] px-1 rounded">BLOG_SHEET_ID</code> to your Google Sheet ID for the monthly content archive.</p>
          <p>• Run <code className="bg-[#ede9fe] px-1 rounded">npx drizzle-kit push</code> to create the <code>posts</code> and <code>bloglettes</code> DB tables.</p>
        </div>
      </div>
    </div>
  );
}
