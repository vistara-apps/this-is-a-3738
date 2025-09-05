import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
})

export const generateRightsGuide = async (state) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a legal expert. Generate concise, accurate information about citizen rights during police interactions.'
        },
        {
          role: 'user',
          content: `Generate a concise rights guide for police interactions in ${state}. Include: 1) Key rights 2) What to do 3) What NOT to say. Keep it under 300 words and mobile-friendly.`
        }
      ],
      max_tokens: 500
    })
    
    return response.choices[0].message.content
  } catch (error) {
    console.error('Error generating rights guide:', error)
    return getDefaultRightsGuide(state)
  }
}

export const generateScripts = async (state, language = 'english') => {
  try {
    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are a legal expert. Generate calm, respectful scripts for police interactions in ${language}.`
        },
        {
          role: 'user',
          content: `Generate 5 short, polite scripts for common police interaction scenarios in ${state}, in ${language}. Each script should be under 30 words.`
        }
      ],
      max_tokens: 400
    })
    
    return response.choices[0].message.content.split('\n').filter(line => line.trim())
  } catch (error) {
    console.error('Error generating scripts:', error)
    return getDefaultScripts(language)
  }
}

const getDefaultRightsGuide = (state) => {
  return `Know Your Rights in ${state}:
  
• You have the right to remain silent
• You have the right to refuse searches without a warrant
• You have the right to ask if you're free to leave
• Keep your hands visible at all times
• Stay calm and respectful
• Don't resist, even if you believe the stop is unfair

What NOT to say:
• Don't admit guilt or make excuses
• Don't argue about the law
• Don't volunteer information
• Don't consent to searches`
}

const getDefaultScripts = (language) => {
  if (language === 'spanish') {
    return [
      "Tengo derecho a permanecer en silencio.",
      "¿Soy libre de irme?",
      "No consiento a ningún registro.",
      "Quiero hablar con un abogado.",
      "Estoy ejerciendo mi derecho al silencio."
    ]
  }
  
  return [
    "I am exercising my right to remain silent.",
    "Am I free to leave?",
    "I do not consent to any searches.",
    "I want to speak to a lawyer.",
    "I am not resisting, but I don't consent."
  ]
}