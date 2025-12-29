import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

// Get database connection string
const databaseUrl = process.env.DATABASE_URL || 
  'postgresql://neondb_owner:npg_F9Q5wluvPezT@ep-soft-art-ade1lztn-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(databaseUrl);

const samplePosts = [
  {
    title: "Understanding Depression: A Journey Through the Fog",
    content: `Depression is not just feeling sad. It's a heavy fog that settles over your mind, making everything feel distant and muted. The colors of life fade, and even the simplest tasks become monumental challenges.

I've learned that depression doesn't discriminate. It can affect anyone, regardless of age, background, or circumstances. The important thing is to recognize it, acknowledge it, and seek help.

There are days when getting out of bed feels like climbing a mountain. On those days, I remind myself that small steps are still progress. A shower, a meal, a walk around the block—these are victories.

Talking about depression is crucial. The silence around mental health only deepens the isolation. By sharing our experiences, we create connections and understanding. We remind each other that we're not alone in this struggle.

Recovery isn't linear. There are good days and bad days, and that's okay. What matters is continuing to move forward, even when the path seems unclear.`,
    excerpt: "A personal reflection on living with depression and finding hope in the darkness.",
    author: "Anonymous",
    mood: "Depression",
    tags: ["Depression", "Mental Health", "Recovery", "Self-Care"],
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
  {
    title: "Navigating Sadness: When Tears Become Healing",
    content: `Sadness is a natural human emotion, but sometimes it feels overwhelming. It washes over you like a wave, leaving you feeling raw and exposed.

I've come to understand that sadness isn't something to avoid or suppress. It's a signal from our inner self, telling us that something matters deeply. When we allow ourselves to feel sadness fully, we honor our emotions and our humanity.

There's a difference between sadness and depression. Sadness is temporary, often tied to specific events or losses. It's a natural response to life's challenges. Depression is more persistent, affecting our ability to function and find joy.

Allowing ourselves to grieve, to feel the weight of loss or disappointment, is part of healing. Tears can be cleansing. They release the tension we hold inside and help us process our feelings.

The key is not to get stuck in sadness, but to move through it. To acknowledge it, feel it, and then take steps toward healing. Sometimes that means talking to someone, sometimes it means giving ourselves time, and sometimes it means seeking professional help.

Remember, it's okay to not be okay. Sadness is not a sign of weakness—it's a sign that you're human, that you care, that you're alive.`,
    excerpt: "Exploring the nature of sadness and how to navigate through difficult emotional times.",
    author: "Anonymous",
    mood: "Sadness",
    tags: ["Sadness", "Emotions", "Healing", "Self-Awareness"],
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    title: "Anxiety: Living with the Constant Companion",
    content: `Anxiety is like having a constant companion that whispers worries in your ear. It's the racing heart, the tight chest, the thoughts that spiral out of control.

Living with anxiety means learning to manage a mind that sometimes works against you. It's exhausting, constantly being on alert, always anticipating the worst-case scenario.

I've learned that anxiety lies. It tells you that you can't handle things, that everything will go wrong, that you're not enough. But these are just thoughts, not truths.

Breathing exercises help. Grounding techniques work. Therapy provides tools. Medication can be necessary. There's no one-size-fits-all solution, but there are paths forward.

The most important thing I've learned is to be gentle with myself. Anxiety isn't a character flaw—it's a condition that can be managed. Some days are harder than others, and that's okay.

Building a support system is crucial. People who understand, who don't judge, who can sit with you in the discomfort. Connection is powerful medicine.

Anxiety doesn't define me. It's a part of my experience, but not the whole story. I'm learning to live alongside it, to find moments of peace, to celebrate small victories.`,
    excerpt: "A personal account of living with anxiety and finding ways to manage and thrive.",
    author: "Anonymous",
    mood: "Anxious",
    tags: ["Anxiety", "Mental Health", "Coping", "Self-Care"],
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    title: "Finding Hope in Dark Times",
    content: `When you're in the depths of despair, hope can feel like a distant star—visible but unreachable. Yet, hope is often found in the smallest moments.

A kind word from a stranger. A beautiful sunset. A song that speaks to your soul. These moments remind us that beauty and goodness still exist, even when we can't feel them.

Hope isn't about denying pain or pretending everything is fine. It's about holding space for the possibility that things can get better, that healing is possible, that we have the strength to endure.

I've learned to look for hope in unexpected places. In the resilience of others who've walked similar paths. In the support of loved ones. In the small acts of self-care that remind us we matter.

Building hope is like building a muscle. It takes practice. Some days it feels impossible, but we keep trying. We keep showing up for ourselves, even when it's hard.

Remember, you've survived every difficult day so far. That's not nothing. That's evidence of your strength, your resilience, your capacity to endure and overcome.

Hope doesn't mean the absence of pain. It means believing that pain can coexist with healing, that darkness can give way to light, that we can find our way forward.`,
    excerpt: "Reflections on finding and holding onto hope during life's most challenging moments.",
    author: "Anonymous",
    mood: "Hopeful",
    tags: ["Hope", "Recovery", "Resilience", "Healing"],
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    title: "The Weight of Loneliness",
    content: `Loneliness is a heavy weight that settles in your chest. It's the feeling of being disconnected, even when surrounded by people. It's the silence that echoes in empty spaces.

In our hyper-connected world, loneliness can feel like a personal failure. But it's not. It's a human experience that many of us face, especially in times of transition or loss.

Loneliness isn't just about being alone—it's about feeling unseen, unheard, unvalued. It's the gap between the connections we have and the connections we need.

I've learned that addressing loneliness requires both internal and external work. Internally, it means learning to be comfortable with ourselves, to find peace in solitude. Externally, it means reaching out, building connections, being vulnerable.

Sometimes loneliness is a signal that we need to invest more in relationships. Other times, it's a sign that we need to reconnect with ourselves, to rediscover what brings us joy and meaning.

The hardest part is often taking the first step—reaching out, joining a group, trying something new. But each small step moves us closer to connection.

Remember, loneliness is temporary. It's a feeling, not a permanent state. With time, effort, and courage, we can build the connections we need and find our place in the world.`,
    excerpt: "Exploring the experience of loneliness and pathways toward connection and belonging.",
    author: "Anonymous",
    mood: "Lonely",
    tags: ["Loneliness", "Connection", "Mental Health", "Self-Discovery"],
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    title: "Gratitude in the Midst of Struggle",
    content: `Practicing gratitude when you're struggling can feel impossible. How can you be grateful when everything feels heavy and difficult?

I've learned that gratitude isn't about denying pain or pretending everything is perfect. It's about finding small moments of light, even in darkness.

A warm cup of tea. A comfortable bed. A friend who listens. These things might seem small, but they're real, and they matter.

Gratitude practice doesn't have to be grand. It can be as simple as writing down one thing you're grateful for each day. Over time, this practice shifts your perspective, helping you notice the good alongside the difficult.

I've found that gratitude and struggle can coexist. You can be grateful for your support system while acknowledging how hard things are. You can appreciate small comforts while feeling the weight of larger challenges.

This practice has taught me that life is complex—full of both pain and beauty, struggle and grace. Gratitude helps me hold both, to see the full picture, not just the darkness.

On my hardest days, I look for just one thing to be grateful for. Sometimes it's the fact that I made it through the day. Sometimes it's a moment of peace. Sometimes it's simply being alive.

Gratitude doesn't fix everything, but it adds perspective. It reminds us that even in struggle, there are things worth noticing, worth appreciating, worth holding onto.`,
    excerpt: "How practicing gratitude can provide perspective and light during difficult times.",
    author: "Anonymous",
    mood: "Reflective",
    tags: ["Gratitude", "Mindfulness", "Mental Health", "Self-Care"],
    created_at: new Date(), // Today
  },
];

async function seedPosts() {
  try {
    console.log('Seeding blog posts...');
    
    // Check if posts already exist
    const existingPosts = await sql`
      SELECT COUNT(*) as count FROM blog_posts
    `;
    
    const count = existingPosts[0]?.count || 0;
    
    if (count > 0) {
      console.log(`Found ${count} existing posts. Adding new sample posts...`);
    }
    
    for (const post of samplePosts) {
      // Check if post with same title already exists
      const existing = await sql`
        SELECT id FROM blog_posts WHERE title = ${post.title}
      `;
      
      if (existing.length === 0) {
        await sql`
          INSERT INTO blog_posts (title, content, excerpt, author, mood, tags, created_at, published)
          VALUES (
            ${post.title},
            ${post.content},
            ${post.excerpt || null},
            ${post.author},
            ${post.mood || null},
            ${post.tags || []},
            ${post.created_at.toISOString()},
            true
          )
        `;
        console.log(`✓ Added: "${post.title}"`);
      } else {
        console.log(`- Skipped: "${post.title}" (already exists)`);
      }
    }
    
    console.log('\n✅ Blog posts seeding completed!');
  } catch (error: any) {
    console.error('Failed to seed posts:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

seedPosts();

