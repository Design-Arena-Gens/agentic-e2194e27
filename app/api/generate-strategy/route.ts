import { NextResponse } from 'next/server'

interface AccountInfo {
  username: string
  niche: string
  followers: string
  goals: string
  contentType: string
}

export async function POST(request: Request) {
  try {
    const accountInfo: AccountInfo = await request.json()

    // Generate personalized strategy based on account info
    const strategy = generateStrategy(accountInfo)
    const contentIdeas = generateContentIdeas(accountInfo)

    return NextResponse.json({
      strategy,
      contentIdeas,
    })
  } catch (error) {
    console.error('Error generating strategy:', error)
    return NextResponse.json(
      { error: 'Failed to generate strategy' },
      { status: 500 }
    )
  }
}

function generateStrategy(info: AccountInfo) {
  const strategies = [
    {
      title: 'Optimize Posting Schedule',
      description: `Based on your ${info.niche} niche, posting at peak times will maximize your initial engagement, which helps TikTok's algorithm push your content to more viewers.`,
      tactics: [
        'Post 2-3 times daily during peak hours (7-9 AM, 12-2 PM, 7-10 PM)',
        'Analyze your TikTok analytics to identify when your specific audience is most active',
        'Batch create content on weekends to maintain consistency',
        'Use TikTok\'s scheduling feature to maintain consistent posting',
      ],
      timeline: '1-2 weeks to establish routine',
      priority: 'high' as const,
    },
    {
      title: 'Leverage Trending Sounds & Hashtags',
      description: 'Riding trending waves increases discoverability exponentially. Stay ahead by monitoring trends daily and adapting them to your niche.',
      tactics: [
        'Check TikTok\'s Discover page daily for trending sounds in your niche',
        'Use 3-5 relevant hashtags: mix trending, niche-specific, and broad hashtags',
        'Put your unique spin on trends rather than copying directly',
        'Jump on trends early (within first 24-48 hours) for maximum reach',
        'Create a trend adaptation strategy that aligns with your brand',
      ],
      timeline: 'Ongoing daily practice',
      priority: 'high' as const,
    },
    {
      title: 'Enhance Video Hook & Retention',
      description: 'The first 3 seconds determine if viewers stay. High retention rates signal quality to the algorithm, leading to more views.',
      tactics: [
        'Start with a bold statement, question, or visual hook in the first second',
        'Use text overlays to capture attention immediately',
        'Keep videos between 7-15 seconds for higher completion rates initially',
        'Add unexpected transitions or moments every 3-5 seconds',
        'Test different hooks and analyze which ones have the highest retention',
        'Use pattern interrupts to keep viewers engaged',
      ],
      timeline: 'Immediate implementation',
      priority: 'high' as const,
    },
    {
      title: 'Engage With Your Community',
      description: 'TikTok rewards creators who actively participate on the platform. Engagement signals you\'re a valuable community member.',
      tactics: [
        'Respond to all comments within the first hour of posting',
        'Create response videos to interesting comments',
        'Engage with other creators in your niche (like, comment, duet)',
        'Spend 30-60 minutes daily on the For You Page engaging authentically',
        'Host live sessions weekly to build deeper connections',
        'Ask questions in your captions to encourage comments',
      ],
      timeline: '30-60 minutes daily',
      priority: 'medium' as const,
    },
    {
      title: 'Collaborate & Cross-Promote',
      description: 'Collaborations expose you to new audiences who already enjoy similar content. This is one of the fastest growth methods.',
      tactics: [
        'Reach out to creators with similar follower counts in your niche',
        'Create duets and stitches with relevant creators',
        'Join TikTok creator communities and Discord servers',
        'Cross-promote your TikTok on Instagram Reels, YouTube Shorts',
        'Participate in niche-specific challenges and tag relevant creators',
      ],
      timeline: '2-4 collaborations per month',
      priority: 'medium' as const,
    },
    {
      title: 'Develop a Content Series',
      description: 'Series create anticipation and encourage followers to check back for more. They also establish you as an authority in your niche.',
      tactics: [
        'Create a recognizable series format (e.g., "Day X of...," weekly tips)',
        'Use consistent visual branding (colors, fonts, intro)',
        'Number your series to encourage binge-watching',
        'Tease upcoming content to build anticipation',
        'Create cliffhangers or multi-part stories',
      ],
      timeline: 'Launch within 1 week',
      priority: 'medium' as const,
    },
    {
      title: 'Optimize Your Profile',
      description: 'When viewers discover your content, a compelling profile converts them into followers. First impressions matter.',
      tactics: [
        'Write a clear, compelling bio that explains your value proposition',
        'Use keywords from your niche in your bio for searchability',
        'Pin your best-performing video to your profile',
        'Create a cohesive aesthetic for your profile picture and banner',
        'Add a call-to-action in your bio',
        'Include relevant links (other social media, website)',
      ],
      timeline: 'Complete today',
      priority: 'high' as const,
    },
    {
      title: 'Analyze & Iterate',
      description: `Understanding what works for YOUR specific audience is key. Let data guide your content strategy.`,
      tactics: [
        'Review TikTok analytics weekly to identify top-performing content',
        'Track which hooks, formats, and topics get the most engagement',
        'A/B test different video styles, lengths, and posting times',
        'Double down on what works, cut what doesn\'t',
        'Keep a content performance spreadsheet',
        'Study your competitors\' successful videos for insights',
      ],
      timeline: 'Weekly review sessions',
      priority: 'medium' as const,
    },
  ]

  // Personalize based on current followers
  const followerCount = parseFollowerCount(info.followers)
  if (followerCount < 1000) {
    strategies.unshift({
      title: 'Build Your Foundation (0-1K Focus)',
      description: 'At this stage, consistency and niche clarity are crucial. Focus on establishing your content style and finding your core audience.',
      tactics: [
        'Post at least once daily without fail for 30 days',
        'Define and stick to 2-3 specific content pillars in your niche',
        'Engage heavily with similar small creators to build community',
        'Focus on perfecting your hook in the first 3 seconds',
        'Don\'t worry about perfection - volume and consistency win at this stage',
      ],
      timeline: 'First 30 days',
      priority: 'high' as const,
    })
  } else if (followerCount < 10000) {
    strategies.push({
      title: 'Scale Your Growth (1K-10K Focus)',
      description: 'You\'ve found some traction. Now it\'s time to double down on what works and expand strategically.',
      tactics: [
        'Analyze your top 10 videos and create similar content',
        'Start collaborating with creators in the 1K-20K range',
        'Experiment with longer content (30-60 seconds) to showcase expertise',
        'Build a content calendar 2 weeks in advance',
        'Engage with every comment to build loyal community',
      ],
      timeline: 'Next 60-90 days',
      priority: 'high' as const,
    })
  }

  return strategies
}

function generateContentIdeas(info: AccountInfo) {
  const nicheIdeas: Record<string, any[]> = {
    comedy: [
      {
        title: 'Relatable Daily Struggles',
        description: 'Create short skits about everyday situations your audience faces. Use trending sounds and exaggerated reactions.',
        hashtags: ['#comedy', '#relatable', '#fyp', '#funny', '#viral'],
        bestTime: 'Evening (7-10 PM)',
      },
      {
        title: 'Character Series',
        description: 'Develop 2-3 recurring characters that interact. Build storylines across multiple videos.',
        hashtags: ['#skit', '#acting', '#comedy', '#series', '#character'],
        bestTime: 'Afternoon (12-2 PM)',
      },
      {
        title: 'Duet Reactions',
        description: 'React to other creators\' content with your unique comedic spin. Great for gaining exposure.',
        hashtags: ['#duet', '#reaction', '#comedy', '#funny', '#trending'],
        bestTime: 'Evening (8-10 PM)',
      },
    ],
    beauty: [
      {
        title: 'Get Ready With Me',
        description: 'Speed up your makeup routine and share tips while doing your daily look. Add trending music.',
        hashtags: ['#grwm', '#makeup', '#beauty', '#makeuptutorial', '#fyp'],
        bestTime: 'Morning (7-9 AM) or Evening (6-8 PM)',
      },
      {
        title: 'Product Review & Demo',
        description: 'Test viral beauty products and give honest reviews. Show before/after results.',
        hashtags: ['#productreview', '#beautyhacks', '#makeup', '#skincare', '#viral'],
        bestTime: 'Afternoon (12-3 PM)',
      },
      {
        title: 'Transformation Videos',
        description: 'Show dramatic before and after makeup transformations. Use transition effects.',
        hashtags: ['#transformation', '#makeupmagic', '#beforeandafter', '#beauty', '#glow'],
        bestTime: 'Evening (7-9 PM)',
      },
    ],
    fitness: [
      {
        title: 'Quick Workout Routines',
        description: 'Share 30-60 second targeted exercises. Focus on form and add text overlays with reps.',
        hashtags: ['#fitness', '#workout', '#gym', '#fitnesstips', '#fyp'],
        bestTime: 'Morning (6-8 AM) or Evening (5-7 PM)',
      },
      {
        title: 'Fitness Myths Debunked',
        description: 'Address common fitness misconceptions. Use "Things I wish I knew" format.',
        hashtags: ['#fitnesstips', '#fitnessmotivation', '#workout', '#gym', '#health'],
        bestTime: 'Afternoon (12-2 PM)',
      },
      {
        title: 'Transformation Journey',
        description: 'Share your fitness journey updates, struggles, and wins. Be authentic and motivational.',
        hashtags: ['#transformation', '#fitnessmotivation', '#weightloss', '#gains', '#fyp'],
        bestTime: 'Evening (6-8 PM)',
      },
    ],
    food: [
      {
        title: 'Quick Recipe Tutorial',
        description: 'Show how to make a dish in under 60 seconds. Use satisfying shots of chopping, mixing, final product.',
        hashtags: ['#recipe', '#cooking', '#foodtok', '#easyrecipe', '#fyp'],
        bestTime: 'Lunch (11 AM-1 PM) or Dinner (5-7 PM)',
      },
      {
        title: 'Food Hack or Tip',
        description: 'Share a cooking shortcut or kitchen hack. Start with "I can\'t believe I didn\'t know this"',
        hashtags: ['#foodhack', '#cookinghack', '#kitchentips', '#foodtok', '#viral'],
        bestTime: 'Evening (6-8 PM)',
      },
      {
        title: 'Trying Viral Recipes',
        description: 'Test trending recipes and give your honest reaction. Include fails for relatability.',
        hashtags: ['#viralrecipe', '#foodtrend', '#foodtok', '#cooking', '#recipe'],
        bestTime: 'Afternoon (1-3 PM)',
      },
    ],
    education: [
      {
        title: 'Quick Facts Series',
        description: 'Share surprising facts about your topic. Use "Did you know?" format with text overlays.',
        hashtags: ['#didyouknow', '#learnontiktok', '#education', '#facts', '#fyp'],
        bestTime: 'Morning (8-10 AM) or Afternoon (2-4 PM)',
      },
      {
        title: 'Common Mistakes to Avoid',
        description: 'Teach by showing what NOT to do. Great engagement from people correcting misconceptions.',
        hashtags: ['#educational', '#tips', '#tutorial', '#learn', '#howto'],
        bestTime: 'Afternoon (12-3 PM)',
      },
      {
        title: 'Step-by-Step Tutorial',
        description: 'Break down complex topics into simple steps. Use numbered points and clear visuals.',
        hashtags: ['#tutorial', '#howto', '#learn', '#education', '#tips'],
        bestTime: 'Evening (7-9 PM)',
      },
    ],
  }

  // Get niche-specific ideas or default
  const ideas = nicheIdeas[info.niche] || [
    {
      title: 'Behind the Scenes',
      description: 'Show your creative process or daily routine. Audiences love authentic, unpolished content.',
      hashtags: ['#bts', '#behindthescenes', '#creator', '#fyp', '#viral'],
      bestTime: 'Afternoon (2-4 PM)',
    },
    {
      title: 'Trending Sound Challenge',
      description: 'Participate in the latest trending challenge, but add your unique niche twist to it.',
      hashtags: ['#trending', '#challenge', '#viral', '#fyp', '#foryou'],
      bestTime: 'Evening (7-10 PM)',
    },
    {
      title: 'Story Time',
      description: 'Share an interesting or funny story from your niche. Hook viewers with "You won\'t believe what happened..."',
      hashtags: ['#storytime', '#story', '#viral', '#fyp', '#real'],
      bestTime: 'Evening (8-10 PM)',
    },
  ]

  // Add general ideas that work for all niches
  ideas.push({
    title: 'Q&A From Comments',
    description: 'Answer questions from your audience. This shows you listen and builds community.',
    hashtags: ['#qanda', '#askme', info.niche, '#creator', '#fyp'],
    bestTime: 'Afternoon (3-5 PM)',
  })

  return ideas
}

function parseFollowerCount(followers: string): number {
  const lower = followers.toLowerCase().replace(/,/g, '')
  if (lower.includes('k')) {
    return parseFloat(lower.replace('k', '')) * 1000
  } else if (lower.includes('m')) {
    return parseFloat(lower.replace('m', '')) * 1000000
  }
  return parseInt(lower) || 0
}
