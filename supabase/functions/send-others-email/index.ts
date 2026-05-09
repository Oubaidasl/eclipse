import { Resend } from "npm:resend";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log("Function triggered!"); // <--- We will look for this in the logs
    
    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      throw new Error("Missing API Key");
    }

    const resend = new Resend(apiKey);
    
    // Parse the request body
    const body = await req.json();
    console.log("Received data:", body); // <--- See what React sent
    
    const { email, full_name, team_name } = body;

    console.log(`Sending email to ${email}...`);

    const { data, error } = await resend.emails.send({
      from: 'Cyber Guardians CTF <admin@cyberguardiansensate.com>',
      to: [email],
      reply_to: 'admin@cyberguardiansensate.com',
      subject: '📋 Tell us your organization name',
      html: `
        <div style="font-family:Arial,sans-serif;background:#0d1117;color:#c9d1d9;padding:30px;">
          <div style="max-width:600px;margin:auto;background:#161b22;border-radius:10px;padding:30px;border:1px solid #30363d;">
            <h2 style="color:#58a6ff;">One more thing, ${full_name}!</h2>
            <p>You registered team <strong>${team_name}</strong> and selected <strong>Others</strong> as your organization.</p>
            <p>Please <strong>reply to this email</strong> with your organization's full name so we can add it to our system.</p>
            <hr style="border-color:#30363d;">
            <p style="font-size:12px;color:#8b949e;">Cyber Guardians CTF — automated message.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      throw error;
    }

    console.log("Email sent successfully!", data);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
    
  } catch (error) {
    console.error("Catch block error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});