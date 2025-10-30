import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, X-Client-Info, apikey, Content-Type, X-Application-Name',
}

// Helper function to determine from email
function getFromEmail() {
  const domain = Deno.env.get('RESEND_DOMAIN');
  if (domain) {
    return `send@${domain}`;
  }
  return 'onboarding@resend.dev'; // Default fallback
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, email, user_id, subscription_type, preferences, subject, content, template_type } = await req.json()

    switch (action) {
      case 'subscribe': {
        // Add email subscription
        const { data, error } = await supabaseClient
          .from('email_subscriptions_2024_10_29_13_00')
          .upsert({
            email,
            user_id: user_id || null,
            subscribed: true,
            subscription_type: subscription_type || 'newsletter',
            preferences: preferences || {}
          }, {
            onConflict: 'email'
          })

        if (error) throw error

        // Send welcome email
        const welcomeEmailSent = await sendWelcomeEmail(email)

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Successfully subscribed to newsletter',
            email_sent: welcomeEmailSent
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        )
      }

      case 'unsubscribe': {
        // Update subscription status
        const { error } = await supabaseClient
          .from('email_subscriptions_2024_10_29_13_00')
          .update({ subscribed: false })
          .eq('email', email)

        if (error) throw error

        return new Response(
          JSON.stringify({ success: true, message: 'Successfully unsubscribed' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        )
      }

      case 'send_newsletter': {
        // Get all subscribed users
        const { data: subscribers, error } = await supabaseClient
          .from('email_subscriptions_2024_10_29_13_00')
          .select('email')
          .eq('subscribed', true)
          .eq('subscription_type', 'newsletter')

        if (error) throw error

        const results = []
        for (const subscriber of subscribers) {
          try {
            const emailSent = await sendEmail(
              subscriber.email,
              subject,
              content,
              template_type || 'newsletter'
            )
            results.push({ email: subscriber.email, success: emailSent })
          } catch (error) {
            results.push({ email: subscriber.email, success: false, error: error.message })
          }
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: `Newsletter sent to ${subscribers.length} subscribers`,
            results
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        )
      }

      case 'send_recipe_update': {
        // Get recipe subscribers
        const { data: subscribers, error } = await supabaseClient
          .from('email_subscriptions_2024_10_29_13_00')
          .select('email')
          .eq('subscribed', true)
          .in('subscription_type', ['newsletter', 'recipes'])

        if (error) throw error

        const results = []
        for (const subscriber of subscribers) {
          try {
            const emailSent = await sendEmail(
              subscriber.email,
              subject,
              content,
              'recipe_update'
            )
            results.push({ email: subscriber.email, success: emailSent })
          } catch (error) {
            results.push({ email: subscriber.email, success: false, error: error.message })
          }
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: `Recipe update sent to ${subscribers.length} subscribers`,
            results
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        )
      }

      case 'send_promotional': {
        // Get promotional subscribers
        const { data: subscribers, error } = await supabaseClient
          .from('email_subscriptions_2024_10_29_13_00')
          .select('email')
          .eq('subscribed', true)
          .in('subscription_type', ['newsletter', 'promotions'])

        if (error) throw error

        const results = []
        for (const subscriber of subscribers) {
          try {
            const emailSent = await sendEmail(
              subscriber.email,
              subject,
              content,
              'promotional'
            )
            results.push({ email: subscriber.email, success: emailSent })
          } catch (error) {
            results.push({ email: subscriber.email, success: false, error: error.message })
          }
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: `Promotional email sent to ${subscribers.length} subscribers`,
            results
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        )
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400 
          }
        )
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

async function sendWelcomeEmail(email: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: getFromEmail(),
        to: email,
        subject: 'Welcome to NMA Foods Community! 🌶️',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #8B4513, #D2691E); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to NMA Foods!</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Premium spices from Ghana to your kitchen</p>
            </div>
            
            <div style="padding: 40px 20px; background: white;">
              <h2 style="color: #8B4513; margin-bottom: 20px;">Thank you for joining our community!</h2>
              
              <p>We're excited to have you on this flavorful journey. As a subscriber, you'll receive:</p>
              
              <ul style="color: #666; line-height: 1.6;">
                <li>🌶️ <strong>Exclusive recipes</strong> featuring our premium spices</li>
                <li>💡 <strong>Cooking tips</strong> from our community of food lovers</li>
                <li>🎯 <strong>Special offers</strong> and early access to new products</li>
                <li>📚 <strong>Health insights</strong> about the benefits of our spices</li>
                <li>🎉 <strong>Community stories</strong> and user-generated content</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://nmafoods.com/shop" style="background: linear-gradient(135deg, #8B4513, #D2691E); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Start Shopping</a>
              </div>
              
              <p style="color: #666;">Follow us on social media for daily inspiration and connect with fellow spice enthusiasts!</p>
            </div>
            
            <div style="background: #f8f8f8; padding: 20px; text-align: center; color: #666; font-size: 14px;">
              <p>NMA Foods - Premium Spices from Ghana</p>
              <p>You can unsubscribe at any time by clicking <a href="#" style="color: #8B4513;">here</a></p>
            </div>
          </div>
        `,
        text: `Welcome to NMA Foods Community!

Thank you for joining our community! We're excited to have you on this flavorful journey.

As a subscriber, you'll receive:
- Exclusive recipes featuring our premium spices
- Cooking tips from our community of food lovers  
- Special offers and early access to new products
- Health insights about the benefits of our spices
- Community stories and user-generated content

Visit our shop: https://nmafoods.com/shop

NMA Foods - Premium Spices from Ghana`
      })
    })

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    return true
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return false
  }
}

async function sendEmail(email: string, subject: string, content: string, template_type: string): Promise<boolean> {
  try {
    let htmlContent = content
    let textContent = content.replace(/<[^>]*>/g, '') // Strip HTML for text version

    // Add template wrapper based on type
    if (template_type === 'newsletter') {
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8B4513, #D2691E); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">NMA Foods Newsletter</h1>
          </div>
          <div style="padding: 30px 20px; background: white;">
            ${content}
          </div>
          <div style="background: #f8f8f8; padding: 20px; text-align: center; color: #666; font-size: 14px;">
            <p>NMA Foods - Premium Spices from Ghana</p>
          </div>
        </div>
      `
    } else if (template_type === 'recipe_update') {
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8B4513, #D2691E); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🍳 New Recipe Alert!</h1>
          </div>
          <div style="padding: 30px 20px; background: white;">
            ${content}
          </div>
          <div style="background: #f8f8f8; padding: 20px; text-align: center; color: #666; font-size: 14px;">
            <p>NMA Foods - Premium Spices from Ghana</p>
          </div>
        </div>
      `
    } else if (template_type === 'promotional') {
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8B4513, #D2691E); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🎉 Special Offer!</h1>
          </div>
          <div style="padding: 30px 20px; background: white;">
            ${content}
          </div>
          <div style="background: #f8f8f8; padding: 20px; text-align: center; color: #666; font-size: 14px;">
            <p>NMA Foods - Premium Spices from Ghana</p>
          </div>
        </div>
      `
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: getFromEmail(),
        to: email,
        subject: subject,
        html: htmlContent,
        text: textContent
      })
    })

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}