/* DemoModal — Connected to tRPC backend + Google Sheets
   Burnt Signal Design System */
import { useState } from "react";
import { X } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    monthlyBudget: "",
    message: "",
    subscribeNewsletter: true,
  });

  const demoMutation = trpc.demo.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setError(null);
    },
    onError: (err) => {
      setError("Something went wrong. Please try again or email us directly.");
      console.error("[Demo form error]", err);
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.monthlyBudget) {
      setError("Please select a monthly budget.");
      return;
    }
    setError(null);
    demoMutation.mutate({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      company: form.company,
      jobTitle: form.jobTitle || undefined,
      monthlyBudget: form.monthlyBudget,
      message: form.message || undefined,
      subscribeNewsletter: form.subscribeNewsletter,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm({ ...form, [target.name]: target.checked });
    } else {
      setForm({ ...form, [target.name]: target.value });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white border border-gray-100 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-3">Request a Demo</div>
            <h2 className="font-display font-bold text-[#0D0D0D] text-2xl">
              Let's build your creator program
            </h2>
            <p className="text-[#717171] text-sm mt-1">
              We'll respond within 2 business days with a custom proposal.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#AAAAAA] hover:text-[#0D0D0D] transition-colors mt-1 ml-4 flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#3b82f6]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-display font-bold text-[#0D0D0D] text-xl mb-2">
                Request received!
              </h3>
              <p className="text-[#717171] text-sm">
                Thanks, {form.firstName}. Our team will reach out within 2 business days
                with a custom proposal for {form.company}.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#717171] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="Jane"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[#0D0D0D] text-sm placeholder-gray-400 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#717171] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Smith"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[#0D0D0D] text-sm placeholder-gray-400 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#717171] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                  Work Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="jane@brand.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[#0D0D0D] text-sm placeholder-gray-400 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#717171] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    placeholder="Your Brand"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[#0D0D0D] text-sm placeholder-gray-400 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#717171] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="VP Marketing"
                    value={form.jobTitle}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[#0D0D0D] text-sm placeholder-gray-400 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#717171] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                  Monthly Budget
                </label>
                <select
                  name="monthlyBudget"
                  value={form.monthlyBudget}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[#0D0D0D] text-sm focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]/20 transition-all appearance-none"
                >
                  <option value="" disabled className="text-gray-400">
                    Please Select
                  </option>
                  <option value="Under $5,000">Under $5,000</option>
                  <option value="$5,000–$15,000">$5,000–$15,000</option>
                  <option value="$15,000–$50,000">$15,000–$50,000</option>
                  <option value="$50,000–$100,000">$50,000–$100,000</option>
                  <option value="$100,000–$250,000">$100,000–$250,000</option>
                  <option value="$250,000+">$250,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-[#717171] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                  Tell us about your program
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="What are your creator marketing goals? What platforms are you focused on?"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[#0D0D0D] text-sm placeholder-gray-400 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]/20 transition-all resize-none"
                />
              </div>

              {/* Newsletter opt-in checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    name="subscribeNewsletter"
                    checked={form.subscribeNewsletter}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 rounded-md border border-gray-300 bg-white peer-checked:bg-[#3b82f6] peer-checked:border-[#3b82f6] transition-all flex items-center justify-center">
                    {form.subscribeNewsletter && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[#717171] text-xs leading-relaxed group-hover:text-[#484848] transition-colors">
                  Subscribe me to the Social Native newsletter for creator marketing insights,
                  platform updates, and industry benchmarks.
                </span>
              </label>

              {error && (
                <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={demoMutation.isPending}
                className="w-full py-3 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_24px_rgba(232,87,42,0.4)] mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {demoMutation.isPending ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  "Submit Request →"
                )}
              </button>

              <p className="text-white/30 text-xs text-center">
                We'll respond within 2 business days with a custom proposal.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
