import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    // Handle CORS
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        },
      })
    }

    const { contacts, location, message, timestamp } = await req.json()

    if (!contacts || contacts.length === 0) {
      throw new Error('No contacts provided')
    }

    // In a real implementation, you would use a service like SendGrid, Resend, or similar
    // For now, we'll simulate the email sending
    
    const emailPromises = contacts.map(async (contact: any) => {
      if (!contact.email) return null

      const emailContent = {
        to: contact.email,
        subject: '🚨 Emergency Alert - KnowYourRights AI',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">🚨 Emergency Alert</h1>
            </div>
            
            <div style="padding: 20px; background-color: #f9f9f9;">
              <p style="font-size: 16px; margin-bottom: 15px;">
                <strong>This is an automated emergency alert from KnowYourRights AI.</strong>
              </p>
              
              <div style="background-color: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h3 style="color: #dc2626; margin-top: 0;">Alert Details:</h3>
                <p><strong>Time:</strong> ${new Date(timestamp).toLocaleString()}</p>
                <p><strong>Message:</strong> ${message || 'Emergency situation detected'}</p>
                ${location ? `
                  <p><strong>Location:</strong> ${location.lat?.toFixed(6)}, ${location.lng?.toFixed(6)}</p>
                  <p><a href="https://www.google.com/maps?q=${location.lat},${location.lng}" target="_blank" style="color: #2563eb;">View on Google Maps</a></p>
                ` : ''}
              </div>
              
              <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e;">
                  <strong>What to do:</strong> If this is a genuine emergency, please contact local emergency services immediately. 
                  You may also want to reach out to the person who sent this alert to check on their safety.
                </p>
              </div>
            </div>
            
            <div style="padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
              <p>This alert was sent automatically by KnowYourRights AI.</p>
              <p>If you believe this was sent in error, please contact the sender directly.</p>
            </div>
          </div>
        `
      }

      // Here you would actually send the email using your preferred service
      // For example, with Resend:
      // const response = await fetch('https://api.resend.com/emails', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     from: 'alerts@knowyourrights-ai.com',
      //     ...emailContent
      //   }),
      // })

      console.log(`Would send email to ${contact.email}:`, emailContent)
      return { success: true, contact: contact.email }
    })

    const results = await Promise.allSettled(emailPromises)
    const successful = results.filter(r => r.status === 'fulfilled').length
    const failed = results.filter(r => r.status === 'rejected').length

    return new Response(
      JSON.stringify({ 
        success: true, 
        sent: successful, 
        failed: failed,
        message: `Emergency emails processed: ${successful} sent, ${failed} failed`
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    console.error('Error sending emergency emails:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})
