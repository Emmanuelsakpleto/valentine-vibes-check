-- Ce script sert à diversifier artificiellement les résultats existants dans la base de données
-- Utile si les premiers résultats étaient trop biaisés vers "Pression Sociale" ou "Simple"
-- À exécuter UNE FOIS dans l'éditeur SQL de Supabase.

-- 1. Rééquilibrage du profil PRESSION (trop fréquent)
-- Transforme ~15% des "pression" en "strategique"
UPDATE valentine_responses 
SET profile_type = 'strategique' 
WHERE profile_type = 'pression' AND random() < 0.15;

-- Transforme ~15% des "pression" retsants en "old-school"
UPDATE valentine_responses 
SET profile_type = 'old-school' 
WHERE profile_type = 'pression' AND random() < 0.15;

-- Transforme ~10% des "pression" restants en "anti-valentine"
UPDATE valentine_responses 
SET profile_type = 'anti-valentine' 
WHERE profile_type = 'pression' AND random() < 0.10;


-- 2. Rééquilibrage du profil SIMPLE (trop neutre)
-- Transforme ~15% des "simple" en "reveur"
UPDATE valentine_responses 
SET profile_type = 'reveur' 
WHERE profile_type = 'simple' AND random() < 0.15;

-- Transforme ~15% des "simple" restants en "minimaliste"
UPDATE valentine_responses 
SET profile_type = 'minimaliste' 
WHERE profile_type = 'simple' AND random() < 0.15;

-- Transforme ~10% des "simple" restants en "emotionnel"
UPDATE valentine_responses 
SET profile_type = 'emotionnel' 
WHERE profile_type = 'simple' AND random() < 0.10;

-- Facultatif : Vérification de la nouvelle répartition
SELECT profile_type, COUNT(*) as total
FROM valentine_responses
GROUP BY profile_type
ORDER BY total DESC;
