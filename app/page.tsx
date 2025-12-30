'use client'

import { useState } from 'react'
import { Sparkles, TrendingUp, Users, Video, Calendar, Target, Zap, MessageCircle } from 'lucide-react'

interface PromotionStrategy {
  title: string
  description: string
  tactics: string[]
  timeline: string
  priority: 'high' | 'medium' | 'low'
}

interface ContentIdea {
  title: string
  description: string
  hashtags: string[]
  bestTime: string
}

export default function Home() {
  const [accountInfo, setAccountInfo] = useState({
    username: '',
    niche: '',
    followers: '',
    goals: '',
    contentType: ''
  })
  const [strategy, setStrategy] = useState<PromotionStrategy[]>([])
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'info' | 'strategy' | 'content'>('info')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountInfo),
      })

      const data = await response.json()
      setStrategy(data.strategy)
      setContentIdeas(data.contentIdeas)
      setActiveTab('strategy')
    } catch (error) {
      console.error('Error generating strategy:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAccountInfo({
      ...accountInfo,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-12 h-12 text-tiktok-pink" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-tiktok-pink to-tiktok-cyan bg-clip-text text-transparent">
              TikTok Promotion Agent
            </h1>
          </div>
          <p className="text-gray-600 text-lg">AI-powered strategies to grow your TikTok presence</p>
        </header>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'info'
                ? 'bg-tiktok-pink text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Target className="w-5 h-5 inline-block mr-2" />
            Account Info
          </button>
          <button
            onClick={() => setActiveTab('strategy')}
            disabled={strategy.length === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'strategy'
                ? 'bg-tiktok-pink text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            <TrendingUp className="w-5 h-5 inline-block mr-2" />
            Strategy
          </button>
          <button
            onClick={() => setActiveTab('content')}
            disabled={contentIdeas.length === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'content'
                ? 'bg-tiktok-pink text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            <Video className="w-5 h-5 inline-block mr-2" />
            Content Ideas
          </button>
        </div>

        {activeTab === 'info' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Tell us about your TikTok account</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    TikTok Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={accountInfo.username}
                    onChange={handleInputChange}
                    placeholder="@yourusername"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tiktok-pink focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Niche/Category
                  </label>
                  <select
                    name="niche"
                    value={accountInfo.niche}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tiktok-pink focus:border-transparent outline-none transition"
                    required
                  >
                    <option value="">Select your niche</option>
                    <option value="comedy">Comedy/Entertainment</option>
                    <option value="beauty">Beauty & Fashion</option>
                    <option value="fitness">Fitness & Health</option>
                    <option value="food">Food & Cooking</option>
                    <option value="education">Education & Tips</option>
                    <option value="gaming">Gaming</option>
                    <option value="dance">Dance & Music</option>
                    <option value="tech">Tech & Gadgets</option>
                    <option value="lifestyle">Lifestyle & Vlogs</option>
                    <option value="business">Business & Finance</option>
                    <option value="art">Art & Creativity</option>
                    <option value="pets">Pets & Animals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Followers
                  </label>
                  <input
                    type="text"
                    name="followers"
                    value={accountInfo.followers}
                    onChange={handleInputChange}
                    placeholder="e.g., 1000, 10K, 100K"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tiktok-pink focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Content Type
                  </label>
                  <select
                    name="contentType"
                    value={accountInfo.contentType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tiktok-pink focus:border-transparent outline-none transition"
                    required
                  >
                    <option value="">Select content type</option>
                    <option value="original">Original Content</option>
                    <option value="trends">Trend-based Content</option>
                    <option value="educational">Educational Content</option>
                    <option value="storytelling">Storytelling</option>
                    <option value="mixed">Mixed Content</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Growth Goals
                  </label>
                  <textarea
                    name="goals"
                    value={accountInfo.goals}
                    onChange={handleInputChange}
                    placeholder="What do you want to achieve? (e.g., reach 100K followers, increase engagement, monetize content)"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tiktok-pink focus:border-transparent outline-none transition resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-tiktok-pink to-tiktok-cyan text-white font-bold py-4 rounded-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Zap className="w-5 h-5 mr-2 animate-pulse" />
                      Generating Strategy...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Promotion Strategy
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'strategy' && strategy.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-6">
              {strategy.map((item, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-xl p-8 border-l-4 ${
                    item.priority === 'high'
                      ? 'border-red-500'
                      : item.priority === 'medium'
                      ? 'border-yellow-500'
                      : 'border-green-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        item.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : item.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {item.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-tiktok-pink" />
                      Action Items:
                    </h4>
                    <ul className="space-y-2">
                      {item.tactics.map((tactic, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-tiktok-cyan mr-2">•</span>
                          <span className="text-gray-700">{tactic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    Timeline: {item.timeline}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'content' && contentIdeas.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {contentIdeas.map((idea, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                  <div className="flex items-start mb-4">
                    <Video className="w-6 h-6 text-tiktok-pink mr-3 mt-1 flex-shrink-0" />
                    <h3 className="text-xl font-bold text-gray-800">{idea.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{idea.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-tiktok-cyan" />
                      Hashtags:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {idea.hashtags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                    <Calendar className="w-4 h-4 mr-2 text-tiktok-pink" />
                    Best time to post: <span className="font-semibold ml-1">{idea.bestTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
