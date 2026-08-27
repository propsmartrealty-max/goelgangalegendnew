// Cloudflare Pages Function: /api/ai-chat
// Edge AI Real Estate Concierge powered by Cloudflare Workers AI & Edge GPUs

interface Env {
  AI?: {
    run: (model: string, options: Record<string, unknown>) => Promise<Record<string, unknown>>;
  };
}

const PROJECT_KNOWLEDGE = `
You are the official AI Luxury Real Estate Concierge for "Goel Ganga Legend County" located in Bavdhan, Pune.
Project Key Facts:
- Developer: Goel Ganga Developments (40+ years legacy, 40,000+ happy families).
- Location: Bavdhan, West Pune (near Chandni Chowk, 15 mins to Hinjewadi IT Park, 5 mins to Kothrud).
- Scale: 30-acre integrated sports township with 12.5 acres dedicated solely to international sports infrastructure.
- Configurations & Pricing:
  * 2 BHK: Starting ₹95 Lakhs* (Smart optimized layouts)
  * 3 BHK: Starting ₹1.77 Cr* (1124 sq.ft carpet, Vastu compliant, hill & stadium views)
  * 3.5 BHK: Starting ₹2.10 Cr* (1380 sq.ft carpet with private lounge / home office)
  * 4 BHK / Penthouse: Starting ₹2.65 Cr* (Expansive luxury living)
- Sports Academies:
  * Michael Phelps Swimming Academy (Olympic-grade heated pool)
  * South United Football Academy (FIFA standard turf)
  * MS Dhoni's Tagda Raho Functional Fitness Protocol
  * 9+ International academies with subsidized resident coaching slots.
- Approvals & MahaRERA:
  * MahaRERA Registered: P52100054578
  * Clear title land, PMC & PMRDA sanctioned plans.
  * Approved by SBI, HDFC, ICICI, Axis Bank.
- Social Infrastructure: Ryan International School (5 mins), Sri Chaitanya (8 mins), Chellaram Hospital (6 mins), Sahyadri Hospital (10 mins).
- Contact / Booking: Sales desk available for VIP site visits and sample flat walkthroughs. Direct helpline: +91 98765 43210.

Instructions:
- Give professional, polite, concise, and enthusiastic responses (2-4 sentences max).
- Highlight the unique "Stadium Life" sports township proposition and prime Bavdhan connectivity.
- Encourage booking an exclusive VIP site visit or viewing the show apartment.
`;

const KNOWLEDGE_BASE_RULES: Array<{ keywords: RegExp; answer: string }> = [
  {
    keywords: /price|cost|starting|rate|pricing|bhk price|how much/i,
    answer: "Goel Ganga Legend County offers luxury 3 BHK residences starting at ₹1.77 Cr* (1124 sq.ft carpet) and 3.5 BHK homes at ₹2.10 Cr*. Premium 2 BHK options are also available starting ₹95 Lakhs*. Would you like to view the detailed pricing sheet and active payment plans?"
  },
  {
    keywords: /sports|academy|academies|football|swimming|dhoni|phelps|tagda raho|tennis|amenit/i,
    answer: "Legend County is Pune's premier 30-acre township featuring 12.5 acres of dedicated sports infrastructure, including the Michael Phelps Swimming Academy, South United Football Academy, and MS Dhoni's Tagda Raho fitness protocol. Residents enjoy exclusive subsidized coaching slots!"
  },
  {
    keywords: /rera|legal|approval|registration|bank|loan/i,
    answer: "Goel Ganga Legend County is fully registered under MahaRERA number P52100054578 with 100% clear title PMRDA/PMC approvals. Pre-approved home loans are available from SBI, HDFC, ICICI, and Axis Bank."
  },
  {
    keywords: /location|bavdhan|chandni chowk|hinjewadi|kothrud|connectivity|distance/i,
    answer: "Located in prime Bavdhan near Chandni Chowk, Legend County is just 15 minutes from Hinjewadi IT Park and 5 minutes from Kothrud, offering direct access to the Mumbai-Bangalore Highway bypass with stunning views of the NDA hills."
  },
  {
    keywords: /visit|site visit|sample flat|show flat|contact|phone|appointment|book/i,
    answer: "We would be delighted to host you for an exclusive VIP site visit and show apartment walkthrough at Bavdhan. Please share your preferred date and time, or leave your phone number to receive instant confirmation!"
  },
  {
    keywords: /3 bhk|3bhk|3.5 bhk|floor plan|carpet|layout/i,
    answer: "Our 3 BHK homes offer 1124 sq.ft carpet area with expansive double-aspect balconies overlooking the NDA hills and sports stadium. The 3.5 BHK features 1380 sq.ft with a private work lounge. Both are built with advanced earthquake-resistant Mivan technology."
  }
];

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}) => {
  const { request, env } = context;
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const { message, history } = await request.json() as {
      message: string;
      history?: Array<{ role: string; content: string }>;
    };

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Message is required' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const cleanMsg = message.trim();

    // 1. Try Cloudflare Workers AI Binding if available on Edge
    if (env.AI && typeof env.AI.run === 'function') {
      try {
        const messages = [
          { role: 'system', content: PROJECT_KNOWLEDGE },
          ...(Array.isArray(history) ? history.slice(-4) : []),
          { role: 'user', content: cleanMsg },
        ];

        const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
          messages,
          max_tokens: 220,
          temperature: 0.7,
        }) as { response?: string };

        if (aiResponse && aiResponse.response) {
          return new Response(
            JSON.stringify({
              success: true,
              reply: aiResponse.response.trim(),
              source: 'cloudflare-workers-ai',
            }),
            { status: 200, headers: corsHeaders }
          );
        }
      } catch (aiErr) {
        console.warn('Workers AI inference fallback:', aiErr);
      }
    }

    // 2. Ultra-Fast Edge Knowledge Matching Engine (< 2ms)
    for (const rule of KNOWLEDGE_BASE_RULES) {
      if (rule.keywords.test(cleanMsg)) {
        return new Response(
          JSON.stringify({
            success: true,
            reply: rule.answer,
            source: 'edge-knowledge-engine',
          }),
          { status: 200, headers: corsHeaders }
        );
      }
    }

    // Default intelligent concierge response
    const defaultReply =
      "Goel Ganga Legend County is Pune's premier 30-acre sports township in Bavdhan near Chandni Chowk, offering luxury 3 & 3.5 BHK residences (RERA: P52100054578) with 12.5 acres of sports academies including Michael Phelps Swimming and MS Dhoni's Tagda Raho. Would you like to check pricing, download the brochure, or schedule a VIP site visit?";

    return new Response(
      JSON.stringify({
        success: true,
        reply: defaultReply,
        source: 'edge-knowledge-engine',
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Internal Server Error',
      }),
      { status: 500, headers: corsHeaders }
    );
  }
};
