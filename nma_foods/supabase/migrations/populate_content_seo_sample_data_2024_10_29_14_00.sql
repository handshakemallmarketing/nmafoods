-- Insert sample nutritional information
INSERT INTO public.product_nutrition_2024_10_29_14_00 (
    product_handle, serving_size, calories, total_fat, saturated_fat, sodium, total_carbs, 
    dietary_fiber, protein, vitamin_c, iron, allergen_info, storage_instructions, shelf_life
) VALUES 
(
    'organic-turmeric-powder',
    '1 teaspoon (2g)',
    8,
    '0.2g',
    '0.1g',
    '1mg',
    '1.4g',
    '0.5g',
    '0.3g',
    '1.2mg',
    '0.9mg',
    ARRAY['May contain traces of other spices processed in the same facility'],
    'Store in a cool, dry place away from direct sunlight. Keep container tightly sealed.',
    '24 months from manufacture date'
),
(
    'premium-ginger-flakes',
    '1 teaspoon (1.5g)',
    5,
    '0.1g',
    '0.0g',
    '0mg',
    '1.1g',
    '0.2g',
    '0.1g',
    '0.5mg',
    '0.1mg',
    ARRAY['Gluten-free', 'Vegan'],
    'Store in airtight container in cool, dry place. Avoid moisture exposure.',
    '18 months from manufacture date'
),
(
    'jollof-spice-blend',
    '1 tablespoon (5g)',
    15,
    '0.3g',
    '0.1g',
    '180mg',
    '2.8g',
    '1.2g',
    '0.6g',
    '2.1mg',
    '1.4mg',
    ARRAY['Contains no artificial preservatives', 'Gluten-free'],
    'Keep sealed in original packaging. Store away from heat and moisture.',
    '12 months from manufacture date'
);

-- Insert sample ingredient sourcing stories
INSERT INTO public.ingredient_sourcing_2024_10_29_14_00 (
    product_handle, ingredient_name, origin_country, origin_region, farm_name, farmer_story,
    harvesting_method, processing_method, quality_certifications, sustainability_practices,
    harvest_season
) VALUES 
(
    'organic-turmeric-powder',
    'Turmeric Root',
    'Ghana',
    'Northern Region',
    'Kwame Organic Farm',
    'Kwame Asante has been cultivating turmeric for over 20 years using traditional methods passed down through generations. His family farm spans 15 acres in the fertile soils of Northern Ghana, where the climate provides perfect conditions for high-curcumin turmeric.',
    'Hand-harvested at peak maturity (8-10 months)',
    'Sun-dried for 7-10 days, then ground using traditional stone mills to preserve essential oils',
    ARRAY['USDA Organic', 'Fair Trade Certified', 'Ghana Organic Agriculture Network'],
    ARRAY['Crop rotation with legumes', 'Natural pest control', 'Rainwater harvesting', 'Composting'],
    'November to January'
),
(
    'premium-ginger-flakes',
    'Fresh Ginger',
    'Ghana',
    'Eastern Region',
    'Akosua Ginger Collective',
    'A cooperative of 50 women farmers led by Akosua Mensah, focusing on sustainable ginger cultivation. The collective provides economic empowerment for rural women while maintaining traditional farming practices.',
    'Carefully hand-harvested after 8 months of growth',
    'Washed, sliced thin, and dehydrated at controlled temperatures to preserve flavor compounds',
    ARRAY['Ghana Standards Authority', 'Women''s Cooperative Certification'],
    ARRAY['Organic farming methods', 'Water conservation', 'Community development programs'],
    'October to December'
);

-- Insert sample usage guides
INSERT INTO public.usage_guides_2024_10_29_14_00 (
    product_handle, guide_type, title, description, instructions, tips, health_benefits,
    precautions, difficulty_level, prep_time
) VALUES 
(
    'organic-turmeric-powder',
    'wellness',
    'Golden Milk Preparation',
    'Create a traditional Ayurvedic golden milk drink for daily wellness',
    '[
        {"step": 1, "instruction": "Heat 1 cup of milk (dairy or plant-based) in a small saucepan over medium heat"},
        {"step": 2, "instruction": "Add 1 teaspoon of turmeric powder and whisk until well combined"},
        {"step": 3, "instruction": "Add a pinch of black pepper and 1/2 teaspoon honey or maple syrup"},
        {"step": 4, "instruction": "Simmer for 2-3 minutes, stirring occasionally"},
        {"step": 5, "instruction": "Strain if desired and serve warm"}
    ]',
    ARRAY[
        'Add black pepper to increase curcumin absorption by up to 2000%',
        'Use coconut milk for extra creaminess and healthy fats',
        'Best consumed 30 minutes before bedtime for optimal benefits'
    ],
    ARRAY[
        'Anti-inflammatory properties',
        'Supports immune system',
        'May improve sleep quality',
        'Antioxidant benefits'
    ],
    ARRAY[
        'Consult healthcare provider if taking blood-thinning medications',
        'May stain clothing and surfaces'
    ],
    'beginner',
    5
),
(
    'organic-turmeric-powder',
    'cooking',
    'Turmeric Rice (Ghanaian Style)',
    'Prepare aromatic turmeric rice with authentic Ghanaian flavors',
    '[
        {"step": 1, "instruction": "Rinse 2 cups jasmine rice until water runs clear"},
        {"step": 2, "instruction": "Heat 2 tablespoons palm oil in a heavy-bottomed pot"},
        {"step": 3, "instruction": "Add 1 diced onion and sauté until translucent"},
        {"step": 4, "instruction": "Add 2 teaspoons turmeric powder and stir for 30 seconds"},
        {"step": 5, "instruction": "Add rice and stir to coat with turmeric oil"},
        {"step": 6, "instruction": "Add 3 cups warm broth, salt, and bring to boil"},
        {"step": 7, "instruction": "Reduce heat, cover, and simmer for 18-20 minutes"},
        {"step": 8, "instruction": "Let rest 5 minutes before fluffing with fork"}
    ]',
    ARRAY[
        'Use coconut oil as alternative to palm oil',
        'Add bay leaves for extra aroma',
        'Toast rice briefly before adding liquid for nuttier flavor'
    ],
    ARRAY[
        'Rich in antioxidants',
        'Anti-inflammatory benefits',
        'Supports digestive health'
    ],
    ARRAY[
        'Turmeric may stain utensils and surfaces'
    ],
    'intermediate',
    35
);

-- Insert sample health benefits research
INSERT INTO public.health_benefits_research_2024_10_29_14_00 (
    ingredient_name, benefit_category, benefit_title, scientific_description,
    research_studies, dosage_recommendations, evidence_level, last_reviewed
) VALUES 
(
    'Turmeric',
    'Anti-inflammatory',
    'Curcumin Reduces Inflammatory Markers',
    'Curcumin, the primary active compound in turmeric, has been extensively studied for its anti-inflammatory properties. Research shows it can inhibit multiple inflammatory pathways, including cyclooxygenase-2 (COX-2) and lipoxygenase enzymes, leading to reduced production of inflammatory mediators.',
    '[
        {
            "title": "Efficacy of Turmeric Extracts and Curcumin for Alleviating the Symptoms of Joint Arthritis",
            "journal": "Journal of Medicinal Food",
            "year": 2019,
            "participants": 367,
            "duration": "8 weeks",
            "findings": "Significant reduction in joint pain and improved mobility"
        },
        {
            "title": "Curcumin: A Review of Its Effects on Human Health",
            "journal": "Foods",
            "year": 2017,
            "type": "Meta-analysis",
            "findings": "Consistent anti-inflammatory effects across multiple studies"
        }
    ]',
    '500-1000mg curcumin daily with meals. Enhanced absorption when taken with black pepper (piperine) or healthy fats.',
    'strong',
    '2024-01-15'
),
(
    'Ginger',
    'Digestive Health',
    'Ginger Alleviates Nausea and Digestive Discomfort',
    'Ginger contains bioactive compounds called gingerols and shogaols that stimulate digestive enzymes, enhance gastric motility, and have antiemetic properties. Clinical studies demonstrate its effectiveness for various types of nausea and digestive issues.',
    '[
        {
            "title": "Ginger for Prevention of Nausea and Vomiting",
            "journal": "Cochrane Database of Systematic Reviews",
            "year": 2015,
            "type": "Systematic Review",
            "studies_included": 12,
            "findings": "Ginger is effective for reducing nausea in various conditions"
        }
    ]',
    '250-1000mg daily, or 1-1.5g fresh ginger. Take 30 minutes before meals for digestive support.',
    'conclusive',
    '2024-02-01'
);

-- Insert sample blog articles
INSERT INTO public.blog_articles_2024_10_29_14_00 (
    title, slug, excerpt, content, category, tags, status, featured,
    seo_title, seo_description, seo_keywords, published_at, reading_time
) VALUES 
(
    'The Science Behind Turmeric''s Golden Health Benefits',
    'science-behind-turmeric-health-benefits',
    'Discover the research-backed health benefits of turmeric and how this golden spice can transform your wellness routine.',
    '<h2>Introduction</h2>
    <p>Turmeric, known as the "golden spice," has been treasured for centuries in traditional medicine. Modern science is now validating what ancient healers knew all along – this vibrant yellow root contains powerful compounds that can significantly impact human health.</p>
    
    <h2>The Power of Curcumin</h2>
    <p>The primary active compound in turmeric is curcumin, which gives the spice its distinctive color and many of its health benefits. Research has shown that curcumin possesses:</p>
    <ul>
        <li><strong>Anti-inflammatory properties:</strong> Studies indicate curcumin can reduce inflammatory markers in the body</li>
        <li><strong>Antioxidant effects:</strong> Helps neutralize harmful free radicals</li>
        <li><strong>Potential cognitive benefits:</strong> May support brain health and memory</li>
    </ul>
    
    <h2>Maximizing Absorption</h2>
    <p>To get the most benefit from turmeric, consider these tips:</p>
    <ul>
        <li>Combine with black pepper (piperine increases absorption by up to 2000%)</li>
        <li>Consume with healthy fats like coconut oil</li>
        <li>Use fresh turmeric when possible</li>
    </ul>
    
    <h2>Traditional Ghanaian Uses</h2>
    <p>In Ghana, turmeric has been used traditionally for digestive health, wound healing, and as a natural preservative. Our farmers continue these time-honored practices while meeting modern organic standards.</p>',
    'Health & Wellness',
    ARRAY['turmeric', 'curcumin', 'health benefits', 'anti-inflammatory', 'Ghana', 'traditional medicine'],
    'published',
    true,
    'Turmeric Health Benefits: Science-Backed Golden Spice Benefits | NMA Foods',
    'Discover the scientifically-proven health benefits of turmeric and curcumin. Learn how this golden spice from Ghana can boost your wellness naturally.',
    ARRAY['turmeric benefits', 'curcumin health', 'anti-inflammatory spices', 'Ghana turmeric', 'natural wellness'],
    NOW() - INTERVAL '2 days',
    6
),
(
    'From Farm to Table: The Journey of Ghanaian Spices',
    'farm-to-table-journey-ghanaian-spices',
    'Follow the incredible journey of our spices from small family farms in Ghana to your kitchen, ensuring quality and sustainability every step of the way.',
    '<h2>Our Farming Partners</h2>
    <p>NMA Foods works directly with over 200 small-scale farmers across Ghana, ensuring fair prices and sustainable farming practices. Our partnerships span three main regions:</p>
    
    <h3>Northern Region - Turmeric Capital</h3>
    <p>The Northern Region of Ghana provides ideal conditions for turmeric cultivation. With its distinct wet and dry seasons, the region produces turmeric with exceptionally high curcumin content.</p>
    
    <h3>Eastern Region - Ginger Haven</h3>
    <p>Known for its fertile soils and favorable climate, the Eastern Region is where our premium ginger is cultivated by women''s cooperatives.</p>
    
    <h2>Sustainable Practices</h2>
    <p>Our commitment to sustainability includes:</p>
    <ul>
        <li>Organic farming methods without synthetic pesticides</li>
        <li>Crop rotation to maintain soil health</li>
        <li>Rainwater harvesting systems</li>
        <li>Fair trade pricing for farmers</li>
    </ul>
    
    <h2>Quality Assurance</h2>
    <p>Every batch undergoes rigorous testing for:</p>
    <ul>
        <li>Purity and potency</li>
        <li>Absence of contaminants</li>
        <li>Optimal moisture content</li>
        <li>Proper packaging for freshness</li>
    </ul>',
    'Sourcing & Sustainability',
    ARRAY['Ghana', 'sustainable farming', 'fair trade', 'organic spices', 'farm to table', 'quality assurance'],
    'published',
    true,
    'Farm to Table: Sustainable Ghanaian Spice Journey | NMA Foods',
    'Discover how NMA Foods partners with Ghanaian farmers to bring you premium, sustainably-sourced spices from farm to your table.',
    ARRAY['Ghana spices', 'sustainable farming', 'fair trade spices', 'organic farming Ghana', 'spice sourcing'],
    NOW() - INTERVAL '5 days',
    8
);

-- Insert SEO metadata for key pages
INSERT INTO public.seo_metadata_2024_10_29_14_00 (
    page_path, page_type, title, description, keywords, og_title, og_description,
    canonical_url, priority, change_frequency
) VALUES 
(
    '/',
    'homepage',
    'NMA Foods - Premium Ghanaian Spices | Organic Turmeric, Ginger & Traditional Blends',
    'Discover premium organic spices from Ghana. FDA-compliant turmeric, ginger, and authentic West African spice blends. Free shipping on orders over $50.',
    ARRAY['Ghana spices', 'organic turmeric', 'African spices', 'premium spices', 'FDA compliant spices', 'West African food'],
    'NMA Foods - Premium Organic Spices from Ghana',
    'Premium organic spices from Ghana including turmeric, ginger, and traditional West African blends. FDA-compliant with proven health benefits.',
    'https://nmafoods.com/',
    1.0,
    'weekly'
),
(
    '/shop',
    'category',
    'Shop Premium Ghanaian Spices | Organic Turmeric, Ginger & Spice Blends',
    'Shop our collection of premium organic spices from Ghana. High-quality turmeric, ginger, jollof blends, and traditional West African seasonings.',
    ARRAY['buy Ghana spices', 'organic spice shop', 'turmeric powder', 'ginger flakes', 'jollof seasoning'],
    'Shop Premium Ghanaian Spices - NMA Foods',
    'Browse our premium collection of organic spices from Ghana including turmeric, ginger, and authentic West African blends.',
    'https://nmafoods.com/shop',
    0.9,
    'daily'
),
(
    '/product/organic-turmeric-powder',
    'product',
    'Organic Turmeric Powder from Ghana | High Curcumin Content | NMA Foods',
    'Premium organic turmeric powder from Ghana with high curcumin content. FDA-compliant, lab-tested for purity. Perfect for golden milk and cooking.',
    ARRAY['organic turmeric powder', 'Ghana turmeric', 'high curcumin turmeric', 'golden milk turmeric'],
    'Premium Organic Turmeric Powder - NMA Foods',
    'High-quality organic turmeric powder from Ghana with exceptional curcumin content. Perfect for cooking and wellness applications.',
    'https://nmafoods.com/product/organic-turmeric-powder',
    0.8,
    'weekly'
);

-- Insert local SEO information
INSERT INTO public.local_seo_2024_10_29_14_00 (
    business_name, address, city, region, country, phone, email, website,
    business_type, description, keywords, service_areas, languages
) VALUES 
(
    'NMA Foods',
    '123 Spice Trade Avenue',
    'Accra',
    'Greater Accra',
    'Ghana',
    '+233-20-123-4567',
    'info@nmafoods.com',
    'https://nmafoods.com',
    'Spice Manufacturer and Exporter',
    'Premium organic spice manufacturer and exporter specializing in traditional Ghanaian spices including turmeric, ginger, and authentic West African blends. FDA-compliant with international shipping.',
    ARRAY['Ghana spices', 'organic spices Ghana', 'West African spices', 'turmeric Ghana', 'spice exporter Ghana'],
    ARRAY['Ghana', 'West Africa', 'United States', 'Europe', 'Canada'],
    ARRAY['English', 'Twi', 'French']
);