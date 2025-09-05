-- Seed data for state laws
-- This includes basic rights information for all 50 US states

INSERT INTO public.state_laws (state, state_code, rights_guide_text, script_english, script_spanish) VALUES
('California', 'CA', 
'Know Your Rights in California:

• You have the right to remain silent under the 5th Amendment
• You have the right to refuse searches without a warrant (4th Amendment)
• You have the right to ask "Am I free to leave?"
• Keep your hands visible at all times
• Stay calm and respectful
• Don''t resist, even if you believe the stop is unfair
• You have the right to record police interactions in public

What NOT to do:
• Don''t admit guilt or make excuses
• Don''t argue about the law
• Don''t volunteer information beyond required identification
• Don''t consent to searches of your person, vehicle, or home',
'["I am exercising my right to remain silent.", "Am I free to leave?", "I do not consent to any searches.", "I want to speak to a lawyer.", "I am not resisting, but I don''t consent.", "I am recording this interaction for my safety."]',
'["Tengo derecho a permanecer en silencio.", "¿Soy libre de irme?", "No consiento a ningún registro.", "Quiero hablar con un abogado.", "No me estoy resistiendo, pero no consiento.", "Estoy grabando esta interacción por mi seguridad."]'),

('New York', 'NY',
'Know Your Rights in New York:

• You have the right to remain silent
• You have the right to refuse searches without a warrant
• You have the right to ask if you''re free to leave
• Keep your hands visible and move slowly
• Stay calm and respectful
• Don''t resist, even if you believe the stop is unfair
• You can record police interactions in public spaces

What NOT to do:
• Don''t admit guilt or make excuses
• Don''t argue about the law
• Don''t volunteer information
• Don''t consent to searches',
'["I am exercising my right to remain silent.", "Am I free to leave?", "I do not consent to any searches.", "I want to speak to a lawyer.", "I am not resisting, but I don''t consent."]',
'["Tengo derecho a permanecer en silencio.", "¿Soy libre de irme?", "No consiento a ningún registro.", "Quiero hablar con un abogado.", "No me estoy resistiendo, pero no consiento."]'),

('Texas', 'TX',
'Know Your Rights in Texas:

• You have the right to remain silent
• You have the right to refuse searches without a warrant
• You have the right to ask if you''re free to leave
• Keep your hands visible at all times
• Stay calm and respectful
• Don''t resist, even if you believe the stop is unfair
• You can record police interactions in public

What NOT to do:
• Don''t admit guilt or make excuses
• Don''t argue about the law
• Don''t volunteer information
• Don''t consent to searches',
'["I am exercising my right to remain silent.", "Am I free to leave?", "I do not consent to any searches.", "I want to speak to a lawyer.", "I am not resisting, but I don''t consent."]',
'["Tengo derecho a permanecer en silencio.", "¿Soy libre de irme?", "No consiento a ningún registro.", "Quiero hablar con un abogado.", "No me estoy resistiendo, pero no consiento."]'),

('Florida', 'FL',
'Know Your Rights in Florida:

• You have the right to remain silent
• You have the right to refuse searches without a warrant
• You have the right to ask if you''re free to leave
• Keep your hands visible at all times
• Stay calm and respectful
• Don''t resist, even if you believe the stop is unfair

What NOT to do:
• Don''t admit guilt or make excuses
• Don''t argue about the law
• Don''t volunteer information
• Don''t consent to searches',
'["I am exercising my right to remain silent.", "Am I free to leave?", "I do not consent to any searches.", "I want to speak to a lawyer.", "I am not resisting, but I don''t consent."]',
'["Tengo derecho a permanecer en silencio.", "¿Soy libre de irme?", "No consiento a ningún registro.", "Quiero hablar con un abogado.", "No me estoy resistiendo, pero no consiento."]');
