/* Case Studies — socialnative.ai Design System
   White cards, purple filter pills, light backgrounds, generous spacing */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";

const caseStudies = [
  // ── TRAVEL & HOSPITALITY ──
  {
    id: "viator",
    brand: "Viator",
    category: "Travel & Hospitality",
    headline: "Viator Cuts CPA by Nearly 60% Using Creator Content in Instagram Branded Content Ads",
    subheadline: "Branded content ads powered by authentic creator experiences",
    stats: [
      { value: "59.7%", label: "Reduction in CPA" },
      { value: "36.9%", label: "Lower CPM" },
    ],
    challenge: "Viator, a leading online travel experiences platform, was looking to improve the efficiency of its paid media performance while driving qualified traffic and bookings. The brand sought a fresh, scalable approach to content that would resonate more authentically with travel-curious audiences on social platforms.",
    solution: "Viator partnered with Social Native to activate a branded content test using real creator experiences on Instagram. By leveraging creators' immersive, first-person storytelling, the campaign brought Viator's offerings to life in a way that felt native to the platform — boosting authenticity, trust, and relevance. The most engaging assets were amplified through branded content ads to maximize impact.",
    result: "The campaign outperformed traditional paid efforts, driving a 59.7% reduction in cost per acquisition (CPA) and a 36.9% lower CPM compared to Viator's business-as-usual campaigns. This performance-driven approach validated the power of creator content in lowering costs while increasing booking efficiency.",
    platform: "Instagram Branded Content Ads",
  },
  {
    id: "airbnb",
    brand: "Airbnb",
    category: "Travel & Hospitality",
    headline: "Airbnb Showcases Extraordinary Listings Through Unique Creator Perspectives",
    subheadline: "70+ travel creators produce 100+ assets in under 2 weeks",
    stats: [
      { value: "70+", label: "Travel Creators Activated" },
      { value: "100+", label: "Images & Videos Created" },
      { value: "14 days", label: "Content Delivered" },
    ],
    challenge: "Airbnb was looking for a fun and engaging way to discuss the benefits of hosted travel and showcase the uniqueness that Airbnb listings offer.",
    solution: "The brand encouraged creators to unlock their creativity and share their personal interests and hobbies. Partnering with a diverse spectrum of creators allowed Airbnb to obtain a library of individual creator stories catered for hard-to-reach audiences.",
    result: "Working with unique creators resulted in over 100 images and videos that Airbnb was able to leverage across multiple social platforms. They were also able to activate more than 70 travel creators to increase brand awareness.",
    platform: "Multi-platform",
  },
  // ── BEAUTY & CPG ──
  {
    id: "cetaphil",
    brand: "Cetaphil",
    category: "Beauty & CPG",
    headline: "Cetaphil Drives Double-Digit Ad Recall Lift with TikTok Creator Strategy",
    subheadline: "TikTok-native creator assets drive measurable brand awareness with Gen Z",
    stats: [
      { value: "+18.4%", label: "Lift in Ad Recall" },
      { value: "+15.4%", label: "Lift in Brand Awareness" },
      { value: "15", label: "TikTok-Native Creator Assets" },
    ],
    challenge: "Cetaphil sought to connect authentically with Gen Z — a digital-first audience that's notoriously ad-averse yet highly engaged on TikTok. The goal was to increase brand awareness and ad recall through content that felt native, not interruptive.",
    solution: "Cetaphil partnered with Social Native to activate 15 TikTok-native creators, producing custom in-feed videos optimized for TikTok's One Day Max format. The content was designed to feel organic, ensuring authentic engagement and higher performance within Gen Z's native environment.",
    result: "+5.4% lift in brand awareness, +18.4% lift in ad recall, and 15 net-new creator-produced assets driving native impact on TikTok. By leading with creator authenticity and performance media strategy, Cetaphil achieved measurable brand impact — proving the value of strategic creator collaboration on TikTok.",
    platform: "TikTok",
  },
  {
    id: "nyx",
    brand: "NYX Cosmetics",
    category: "Beauty & CPG",
    headline: "NYX Reels It In: Driving Engagement with Quick-Hit Beauty Tutorials on Instagram",
    subheadline: "Shoppable IG Reels tutorials drive 320% lift in conversion",
    stats: [
      { value: "320%", label: "Lift in Conversion" },
      { value: "4x", label: "Engagement Rate vs. Benchmark" },
    ],
    challenge: "NYX Cosmetics aimed to generate excitement and drive conversions for the launch of their Born To Glow Concealer, while reinforcing product education.",
    solution: "NYX activated a diverse lineup of creators to produce authentic IG Reels tutorials, showcasing how to use the Born To Glow Concealer across different skin tones and styles.",
    result: "320% lift in conversion when users engaged with creator content and 4x engagement rate vs. campaign benchmarks.",
    platform: "Instagram Reels",
  },
  {
    id: "revlon",
    brand: "Revlon",
    category: "Beauty & CPG",
    headline: "Revlon Scales Hair Care Education with Creator-Led TikTok Tutorials That Convert",
    subheadline: "15 creator videos drive 20% lower CPA than benchmark",
    stats: [
      { value: "20%", label: "Lower CPA vs. Benchmark" },
      { value: "15", label: "Creator Videos Produced" },
    ],
    challenge: "Revlon aimed to boost visibility for its hair care line and drive performance through product education. With TikTok dominating beauty discovery among Gen Z and Millennials, Revlon saw an opportunity to tap into native content that educates while it entertains.",
    solution: "Revlon partnered with Social Native to activate a group of TikTok-native creators who produced 15 short-form, bingeable hair care tutorials.",
    result: "Revlon's campaign drove a 20% lower CPA than campaign benchmark, 15 original creator videos produced, and increased reach, engagement, and time spent with educational branded content.",
    platform: "TikTok",
  },
  {
    id: "clinique",
    brand: "Clinique",
    category: "Beauty & CPG",
    headline: "Clinique Scales Content Production with 580 Branded Assets for Always-On Social & Retail Use",
    subheadline: "580 images and videos fuel owned social and Sephora Beauty Board",
    stats: [
      { value: "580", label: "Images & Videos Produced" },
      { value: "4%", label: "Organic Engagement Rate" },
    ],
    challenge: "Clinique needed a scalable solution to build a library of high-quality, on-brand content to fuel their owned social channels and support retail partners like Sephora.",
    solution: "Clinique partnered with Social Native to activate a network of vetted fashion and beauty creators producing branded images and videos aligned with Clinique's visual identity.",
    result: "Social Native's creators produced 580 original images and videos and drove a 4% organic engagement rate. Content was successfully repurposed across Clinique's Instagram and Sephora's Beauty Board.",
    platform: "Instagram, Sephora Beauty Board",
  },
  {
    id: "macadamia",
    brand: "Macadamia Professional",
    category: "Beauty & CPG",
    headline: "Macadamia Professional Launches New Products with Scaled Creator Content",
    subheadline: "200 unique assets including 144 testimonial videos drive 6.7% engagement on Meta",
    stats: [
      { value: "200", label: "Unique Assets Created" },
      { value: "144", label: "Testimonial Videos" },
      { value: "6.7%", label: "Engagement Rate on Meta" },
    ],
    challenge: "Professional photoshoots are costly and time-consuming, making it difficult for Macadamia Professional to quickly create diverse content for multiple product SKUs.",
    solution: "Macadamia Professional partnered with Social Native to produce static images and 144 short-form testimonial videos from real creators.",
    result: "Nearly 200 unique content assets, including 144 testimonial videos. The campaign achieved an impressive 6.7% engagement rate on Facebook and Instagram.",
    platform: "Meta (Facebook & Instagram)",
  },
  // ── FASHION & RETAIL ──
  {
    id: "crocs",
    brand: "Crocs",
    category: "Fashion & Retail",
    headline: "Crocs Stays a Step Ahead: Captivating Gen Z Through Bold Social Media Engagement",
    subheadline: "600+ creators across 50+ campaigns drive 21.5% average engagement rate",
    stats: [
      { value: "856", label: "Assets Created" },
      { value: "792.4K", label: "Engagements" },
      { value: "21.5%", label: "Avg. Engagement Rate" },
    ],
    challenge: "Crocs set out to target the Gen Z audience with fresh and engaging social content, aiming to reframe the way they are perceived to this younger generation.",
    solution: "By empowering real Crocs fans to create branded content, they were able to appeal to their digitally native consumers through authentic and creative storytelling on social media.",
    result: "Crocs has activated more than 600 creators with Social Native and generated over 800 pieces of original content across 50+ campaigns, reaching a 21.5% average engagement rate.",
    platform: "Multi-platform",
  },
  {
    id: "movado",
    brand: "Movado",
    category: "Fashion & Retail",
    headline: "Movado Drives Holiday Campaign Performance with 24 Curated Creators",
    subheadline: "25 unique ad pieces reach 98K+ consumers at 2.26% engagement rate",
    stats: [
      { value: "2.26%", label: "Engagement Rate" },
      { value: "98K+", label: "Audience Reached" },
      { value: "24", label: "Creators Activated" },
    ],
    challenge: "Movado wanted to run a seasonal holiday campaign of aesthetic creator-made ads, activating creators in their 20s to 30s to produce high-quality, authentic content.",
    solution: "Through entrusting creators with the content process, Movado's campaign produced videos focused on the details of each product in a way that fit into creators' everyday lives.",
    result: "Movado activated 24 creators to create 25 unique pieces of ad content. The result was a 2.26% engagement rate with the ad content reaching a combined audience of 98K+ consumers.",
    platform: "Multi-platform",
  },
  {
    id: "kate-spade",
    brand: "Kate Spade New York",
    category: "Fashion & Retail",
    headline: "Kate Spade New York Scales High-Performing Organic Content Into Paid Media Campaigns",
    subheadline: "5 micro-creators drive 2.68% engagement and 20.41% paid ER",
    stats: [
      { value: "2.68%", label: "Organic Engagement Rate" },
      { value: "20.41%", label: "Paid Avg. Engagement Rate" },
      { value: "42K+", label: "Audience Reached" },
    ],
    challenge: "Kate Spade New York aimed to celebrate friendship and togetherness for the holidays through a gift-focused storytelling lens.",
    solution: "Partnering with Social Native, the brand selected 5 lifestyle and fashion women micro-creators to highlight how gifting makes the holidays more meaningful.",
    result: "Through the activation of just 5 creators, Kate Spade's holiday campaign achieved a 2.68% engagement rate and reached 42,000+ consumers. The organic content was further scaled into paid media campaigns that resulted in a 20.41% average engagement rate.",
    platform: "Multi-platform",
  },
  {
    id: "fila",
    brand: "FILA",
    category: "Fashion & Retail",
    headline: "FILA Partners with Hundreds of Male Creators to Showcase Men's Footwear in Paid Media",
    subheadline: "200+ images drive 4M audience reach at >4% engagement rate",
    stats: [
      { value: "200+", label: "Images Created" },
      { value: ">4%", label: "Avg. Engagement Rate" },
      { value: "4M", label: "Audience Reach" },
    ],
    challenge: "FILA desired to grow their overall audience reach and market share in men's footwear.",
    solution: "FILA activated hundreds of male creators in urban areas to create highly stylized streetwear-inspired images for the FILA Disruptor 2 sneaker across paid media.",
    result: "The on-brand creator campaign produced over 200 on-brand images that achieved a greater than 4% average engagement rate and reached an audience of 4 million consumers.",
    platform: "Paid Media",
  },
  {
    id: "dr-martens",
    brand: "Dr. Martens",
    category: "Fashion & Retail",
    headline: "Stepping Up Ecommerce: How Dr. Martens Boosted Conversions with User-Generated Content",
    subheadline: "UGC across ecommerce drives 1.6x conversion rate and 6M customer interactions",
    stats: [
      { value: "1.6x", label: "Conversion Rate Increase" },
      { value: "6M", label: "Customer Interactions" },
      { value: "58%", label: "Increase in Product Coverage" },
    ],
    challenge: "Dr. Martens wanted to increase conversion and product coverage, as well as connect with ecommerce visitors at every stage of their experience.",
    solution: "Dr. Martens leveraged Social Native's UGC solution to turn their customers' best social content into shoppable assets to be used across ecommerce.",
    result: "By enhancing their ecomm customer journey with UGC, Dr. Martens increased their conversion rate by 1.6x and grew their product coverage by 58%, receiving 6 million interactions.",
    platform: "Ecommerce / Multi-platform",
  },
  {
    id: "uniqlo",
    brand: "UNIQLO",
    category: "Fashion & Retail",
    headline: "UNIQLO Launches New Product Line to a Diverse Audience with Creator-Led Content",
    subheadline: "400+ images drive 7.6% engagement rate and 4M audience reach",
    stats: [
      { value: "400+", label: "Images Created" },
      { value: "7.6%", label: "Avg. Engagement Rate" },
      { value: "4M", label: "Audience Reach" },
    ],
    challenge: "UNIQLO wanted to build awareness for its HEATTECH line, needing a scalable content solution that could highlight product versatility while authentically connecting with diverse audiences.",
    solution: "UNIQLO partnered with Social Native to activate a wide range of creators who could showcase HEATTECH products in everyday, real-life settings.",
    result: "The campaign delivered over 400 unique images, achieving a 7.6% average engagement rate and reaching an audience of more than 4 million consumers.",
    platform: "Multi-platform",
  },
  // ── HOME & CPG ──
  {
    id: "petco",
    brand: "Petco",
    category: "Home & CPG",
    headline: "Petco Taps Into UGC Magic to Drive Awareness with 3,000+ Pet Creators",
    subheadline: "Nearly 3,000 images and videos reach 67M potential customers at 7% engagement",
    stats: [
      { value: "7%", label: "Engagement Rate" },
      { value: "2.9K", label: "Pet Creators Activated" },
      { value: "67M", label: "Potential Customers Reached" },
    ],
    challenge: "Petco was looking to increase brand awareness for their newest product launches and excite their audience to purchase these goodies for their furry friends.",
    solution: "Petco partnered with Social Native creators to foster positive engagement with its existing customer base and extend audience reach.",
    result: "This partnership has generated nearly 3,000 images and videos, fetching a 7% engagement rate, reaching 67 million potential customers, and generating over 3.6 million engagements.",
    platform: "Multi-platform",
  },
  {
    id: "freshpet",
    brand: "Freshpet",
    category: "Home & CPG",
    headline: "Freshpet Leverages Influencer Marketing to Boost Brand and Consumer Growth",
    subheadline: "60 boosted assets drive 29% reduction in cost per click",
    stats: [
      { value: "29%", label: "Reduction in Cost Per Click" },
      { value: "60", label: "Assets Boosted" },
      { value: "50", label: "Pet Owner Creators Activated" },
    ],
    challenge: "Freshpet's objective was to reduce cost per click and increase add-to-cart with targeted social advertising.",
    solution: "Social Native activated a curated roster of high-performing pet creators to develop content across several campaigns. Freshpet in turn boosted 60 assets optimizing for the highest performers.",
    result: "This data-led approach resulted in a reduction of Freshpet's cost per click benchmarks by 29% and an increase in add-to-cart leading to a lift in sales.",
    platform: "Paid Social",
  },
  {
    id: "pupbox",
    brand: "PupBox",
    category: "Home & CPG",
    headline: "PupBox Promotes Subscription Service with Authentic Puppy Creator Content",
    subheadline: "50 high-quality images reach 850K consumers at 2.7% engagement rate",
    stats: [
      { value: "2.7%", label: "Engagement Rate" },
      { value: "850K", label: "Consumers Reached" },
      { value: "50", label: "High-Quality Images Created" },
    ],
    challenge: "PupBox wanted to create diverse content across various puppy breeds while highlighting the uniqueness of its subscription service.",
    solution: "PupBox partnered with Social Native to find and activate creators with puppies between the ages of 2–12 months.",
    result: "The brand created 50 high-quality puppy images, fetching a 2.7% engagement rate, and reaching over 850K consumers.",
    platform: "Multi-platform",
  },
  {
    id: "ikea",
    brand: "IKEA",
    category: "Home & CPG",
    headline: "IKEA Increases Reach, Engagement & Conversions by Leveraging UGC Across TikTok and Owned Channels",
    subheadline: "UGC drives 27% higher reach, 3.54x conversion rate, and 2.7x engagement",
    stats: [
      { value: "27%", label: "Higher Reach on Social" },
      { value: "3.54x", label: "Higher Conversion Rate with UGC" },
      { value: "2.7x", label: "Higher Engagement with UGC" },
    ],
    challenge: "IKEA needed a more cost-efficient, scalable, and regionally relevant way to source social-first content that could keep pace with consumer trends — particularly on high-growth platforms like TikTok.",
    solution: "IKEA partnered with Social Native to unlock user-generated content at scale, inviting real customers to share how they style IKEA products at home via the #IKEAAtMine community.",
    result: "IKEA achieved a 27% higher reach on social compared to owned creative. On-site, UGC delivered 2.7x higher engagement and a 3.54x higher conversion rate.",
    platform: "TikTok, Social Media, Owned Website",
  },
  {
    id: "imperfect-foods",
    brand: "Imperfect Foods",
    category: "Home & CPG",
    headline: "How Imperfect Foods Engaged TikTok Audiences with Authentic Creator Content",
    subheadline: "+57% higher CVR and +30% increase in reach vs. TikTok benchmarks",
    stats: [
      { value: "+57%", label: "Higher CVR" },
      { value: "+30%", label: "Increase in Reach" },
    ],
    challenge: "Imperfect Foods wanted to grow their 'family' audience on TikTok and speak to middle-aged consumers in a cost-efficient way.",
    solution: "Imperfect Foods partnered with Social Native to identify and onboard native TikTok creators that could create new video assets optimized for their social channels.",
    result: "Imperfect Foods tested the Social Native content across their TikTok channel and saw a 57% lift in CVR and achieved a 30% higher reach to their target audience.",
    platform: "TikTok",
  },
  // ── EDUCATION ──
  {
    id: "university-of-phoenix",
    brand: "University of Phoenix",
    category: "Education",
    headline: "University of Phoenix Achieves a 13.9% Engagement Rate by Scaling Creator Collaborations",
    subheadline: "247 creator voices drive 135% increase in engagement rate and 24% lower CPM",
    stats: [
      { value: "24%", label: "Lower CPM" },
      { value: "135%", label: "Increase in Engagement Rate" },
      { value: "247", label: "Creator Voices Activated" },
    ],
    challenge: "University of Phoenix sought to scale their creator collaborations to continually engage their target audience and improve performance on defined success metrics.",
    solution: "Social Native's tiered approach starts with activating creators at scale to post organically, then boosting the top 75% performers through Branded Content Ads + Spark Ads.",
    result: "UOPX raised their collective engagement rate to 13.9% and improved against their CPM benchmarks by over 20%.",
    platform: "Multi-platform (Branded Content Ads + Spark Ads)",
  },
];

const categories = ["All", "Travel & Hospitality", "Beauty & CPG", "Fashion & Retail", "Home & CPG", "Education"];

export default function CaseStudies() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeCategory === "All"
    ? caseStudies
    : caseStudies.filter((cs) => cs.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#f5f3ff] via-white to-white">
        <div className="container relative z-10 text-center">
          <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-4">Case Studies</div>
          <h1 className="font-display font-extrabold text-[#222222] text-5xl md:text-6xl leading-tight mb-6">
            Real brands. Real results.{" "}
            <span className="text-[#7c3aed]">Real data.</span>
          </h1>
          <p className="text-[#717171] text-xl max-w-2xl mx-auto">
            Not just brand names — specific outcomes, specific timeframes, from 1,500+ enterprise brands across every major vertical.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm">
        <div className="container py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-full ${
                  activeCategory === cat
                    ? "bg-[#7c3aed] text-white"
                    : "bg-gray-100 text-[#717171] hover:bg-purple-50 hover:text-[#7c3aed]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies grid */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((cs) => (
              <div
                key={cs.id}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="font-display font-extrabold text-[#222222] text-2xl">{cs.brand}</div>
                      <div className="text-[#7c3aed] text-xs font-semibold uppercase tracking-wider mt-1">
                        {cs.category} · {cs.platform}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-[#222222] text-lg leading-snug mb-2">{cs.headline}</h3>
                  <p className="text-[#717171] text-sm mb-6">{cs.subheadline}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {cs.stats.map((s, i) => (
                      <div key={i} className="bg-[#f5f3ff] rounded-2xl p-3 text-center">
                        <div className="font-display font-extrabold text-[#7c3aed] text-xl">{s.value}</div>
                        <div className="text-[#717171] text-xs mt-0.5 leading-tight">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Expandable detail */}
                  <button
                    onClick={() => setExpanded(expanded === cs.id ? null : cs.id)}
                    className="text-[#7c3aed] text-sm font-semibold hover:text-[#6d28d9] transition-colors"
                  >
                    {expanded === cs.id ? "Show less ↑" : "Read full case study ↓"}
                  </button>

                  {expanded === cs.id && (
                    <div className="mt-6 space-y-4 border-t border-gray-100 pt-6">
                      <div>
                        <div className="text-[#717171] text-xs font-semibold uppercase tracking-wider mb-2">The Opportunity</div>
                        <p className="text-[#484848] text-sm leading-relaxed">{cs.challenge}</p>
                      </div>
                      <div>
                        <div className="text-[#717171] text-xs font-semibold uppercase tracking-wider mb-2">The Strategy</div>
                        <p className="text-[#484848] text-sm leading-relaxed">{cs.solution}</p>
                      </div>
                      <div>
                        <div className="text-[#717171] text-xs font-semibold uppercase tracking-wider mb-2">The Result</div>
                        <p className="text-[#484848] text-sm leading-relaxed">{cs.result}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats summary */}
      <section className="bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] py-20">
        <div className="container text-center">
          <div className="inline-block text-white/80 text-xs font-semibold uppercase tracking-widest mb-8">Across All Programs</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { value: "1,500+", label: "Enterprise Brands" },
              { value: "1.8M+", label: "Creator Collaborations" },
              { value: "12M+", label: "Content Pieces Produced" },
              { value: "40%", label: "Avg. CPA Reduction" },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display font-extrabold text-white text-4xl md:text-5xl mb-2">{s.value}</div>
                <div className="text-white/70 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setDemoOpen(true)}
            className="px-8 py-4 rounded-full bg-white text-[#7c3aed] font-semibold text-base transition-all duration-200 shadow-lg hover:bg-gray-50 hover:shadow-xl inline-flex items-center gap-2"
          >
            Request a Demo →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
