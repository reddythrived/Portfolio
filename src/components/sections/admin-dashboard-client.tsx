'use client';

import React, { useState, useTransition } from 'react';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import {
  adminMarkMessageRead,
  adminDeleteMessage,
  adminSaveProject,
  adminDeleteProject,
  adminSaveSkill,
  adminDeleteSkill,
} from '@/app/actions/portfolio';
import {
  Mail,
  BarChart3,
  Layers,
  Cpu,
  Trash2,
  Check,
  Eye,
  Plus,
  Loader2,
  LogOut,
} from 'lucide-react';

interface DashboardClientProps {
  initialMessages: any[];
  initialProjects: any[];
  initialSkills: any[];
  viewsByPath: any[];
  viewsByDevice: any[];
  viewsByCountry: any[];
  recentVisits: any[];
}

export const DashboardClient: React.FC<DashboardClientProps> = ({
  initialMessages,
  initialProjects,
  initialSkills,
  viewsByPath,
  viewsByDevice,
  viewsByCountry,
  recentVisits,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'messages' | 'projects' | 'skills'>('analytics');
  const [messages, setMessages] = useState(initialMessages);
  const [projects, setProjects] = useState(initialProjects);
  const [skills, setSkills] = useState(initialSkills);
  const [isPending, startTransition] = useTransition();

  // Project form states
  const [projForm, setProjForm] = useState({
    id: '',
    title: '',
    description: '',
    techStack: '',
    features: '',
    metrics: '',
    githubUrl: '',
    liveUrl: '',
    order: '0',
  });

  // Skill form states
  const [skillForm, setSkillForm] = useState({
    id: '',
    name: '',
    category: 'programming',
    proficiency: '80',
  });

  // Message handlers
  const handleToggleRead = async (id: string, currentRead: boolean) => {
    startTransition(async () => {
      const updated = await adminMarkMessageRead(id, !currentRead);
      setMessages(messages.map((m) => (m.id === id ? { ...m, read: updated.read } : m)));
    });
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    startTransition(async () => {
      await adminDeleteMessage(id);
      setMessages(messages.filter((m) => m.id !== id));
    });
  };

  // Skill form handlers
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const saved = await adminSaveSkill({
        id: skillForm.id || undefined,
        name: skillForm.name,
        category: skillForm.category,
        proficiency: Number(skillForm.proficiency),
      });
      if (skillForm.id) {
        setSkills(skills.map((s) => (s.id === skillForm.id ? saved : s)));
      } else {
        setSkills([...skills, saved]);
      }
      setSkillForm({ id: '', name: '', category: 'programming', proficiency: '80' });
    });
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    startTransition(async () => {
      await adminDeleteSkill(id);
      setSkills(skills.filter((s) => s.id !== id));
    });
  };

  // Project form handlers
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const saved = await adminSaveProject({
        id: projForm.id || undefined,
        title: projForm.title,
        description: projForm.description,
        techStack: projForm.techStack.split(',').map((t) => t.trim()),
        features: projForm.features.split('\n').map((f) => f.trim()).filter(Boolean),
        metrics: projForm.metrics.split(',').map((m) => m.trim()).filter(Boolean),
        githubUrl: projForm.githubUrl,
        liveUrl: projForm.liveUrl,
        order: Number(projForm.order),
      });
      if (projForm.id) {
        setProjects(projects.map((p) => (p.id === projForm.id ? saved : p)));
      } else {
        setProjects([...projects, saved]);
      }
      setProjForm({
        id: '',
        title: '',
        description: '',
        techStack: '',
        features: '',
        metrics: '',
        githubUrl: '',
        liveUrl: '',
        order: '0',
      });
    });
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    startTransition(async () => {
      await adminDeleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    });
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex border-b border-white/5 pb-px gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-4 transition-colors flex items-center space-x-1.5 ${
            activeTab === 'analytics' ? 'border-b-2 border-primary text-white' : 'text-muted-foreground hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`pb-4 transition-colors flex items-center space-x-1.5 ${
            activeTab === 'messages' ? 'border-b-2 border-primary text-white' : 'text-muted-foreground hover:text-white'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Recruiter Messages</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`pb-4 transition-colors flex items-center space-x-1.5 ${
            activeTab === 'projects' ? 'border-b-2 border-primary text-white' : 'text-muted-foreground hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Projects</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`pb-4 transition-colors flex items-center space-x-1.5 ${
            activeTab === 'skills' ? 'border-b-2 border-primary text-white' : 'text-muted-foreground hover:text-white'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Skills</span>
        </button>
      </div>

      {isPending && (
        <div className="flex items-center text-xs text-primary bg-primary/5 px-4 py-2.5 rounded-lg border border-primary/10">
          <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
          Synchronizing changes with database...
        </div>
      )}

      {/* Analytics Tab Content */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Hit breakdowns */}
          <div className="lg:col-span-7 space-y-6">
            <SpotlightCard className="border-white/5 p-6 space-y-4">
              <h3 className="text-md font-bold text-white uppercase tracking-wider">Hit Count by Page Route</h3>
              <div className="space-y-3">
                {viewsByPath.map((item) => (
                  <div key={item.path} className="flex items-center justify-between text-sm">
                    <span className="font-mono text-muted-foreground">{item.path}</span>
                    <span className="font-bold text-white">{item.count} view(s)</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>

            <SpotlightCard className="border-white/5 p-6 space-y-4">
              <h3 className="text-md font-bold text-white uppercase tracking-wider">Recent Visitor Activity</h3>
              <div className="space-y-3 text-xs overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-muted-foreground border-b border-white/5">
                      <th className="pb-2">Hash ID</th>
                      <th className="pb-2">Path</th>
                      <th className="pb-2">Country</th>
                      <th className="pb-2">Device</th>
                      <th className="pb-2 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentVisits.map((item) => (
                      <tr key={item.id} className="border-b border-white/[0.02] last:border-0">
                        <td className="py-2 font-mono">{item.ipHash.substring(0, 8)}</td>
                        <td className="py-2 font-mono text-cyan-400">{item.path}</td>
                        <td className="py-2">{item.country}</td>
                        <td className="py-2">{item.device}</td>
                        <td className="py-2 text-right text-muted-foreground">
                          {new Date(item.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SpotlightCard>
          </div>

          {/* Demographic & Device breakdowns */}
          <div className="lg:col-span-5 space-y-6">
            <SpotlightCard className="border-white/5 p-6 space-y-4">
              <h3 className="text-md font-bold text-white uppercase tracking-wider">Devices Log</h3>
              <div className="space-y-3">
                {viewsByDevice.map((item) => (
                  <div key={item.device} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.device}</span>
                    <span className="font-bold text-white">{item.count}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>

            <SpotlightCard className="border-white/5 p-6 space-y-4">
              <h3 className="text-md font-bold text-white uppercase tracking-wider">Top Countries</h3>
              <div className="space-y-3">
                {viewsByCountry.map((item) => (
                  <div key={item.country} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.country}</span>
                    <span className="font-bold text-white">{item.count}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </div>
      )}

      {/* Recruiter Messages Tab Content */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((item) => (
              <SpotlightCard
                key={item.id}
                className={`border-white/5 p-6 space-y-4 ${item.read ? 'opacity-60' : 'border-primary/20 bg-primary/[0.01]'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-white">{item.name}</span>
                      <span className="text-xs text-muted-foreground">&lt;{item.email}&gt;</span>
                    </div>
                    <p className="text-xs font-semibold text-primary mt-1">Subject: {item.subject}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleRead(item.id, item.read)}
                      className="p-2 rounded bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all"
                      title={item.read ? 'Mark Unread' : 'Mark Read'}
                    >
                      <Check className={`w-4 h-4 ${item.read ? 'text-primary' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(item.id)}
                      className="p-2 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed bg-[#050508] p-3 rounded-lg border border-white/5">
                  {item.message}
                </p>
                <span className="text-[10px] text-muted-foreground block text-right">
                  Sent: {new Date(item.createdAt).toLocaleString()}
                </span>
              </SpotlightCard>
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
              <p className="text-muted-foreground text-sm">Your contact inbox is currently empty.</p>
            </div>
          )}
        </div>
      )}

      {/* Projects CRUD Tab Content */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Projects List */}
          <div className="lg:col-span-7 space-y-4">
            {projects.map((proj) => (
              <SpotlightCard key={proj.id} className="border-white/5 p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">{proj.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">{proj.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setProjForm({
                        id: proj.id,
                        title: proj.title,
                        description: proj.description,
                        techStack: proj.techStack.join(', '),
                        features: proj.features.join('\n'),
                        metrics: proj.metrics.join(', '),
                        githubUrl: proj.githubUrl || '',
                        liveUrl: proj.liveUrl || '',
                        order: String(proj.order),
                      })
                    }
                    className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs font-semibold text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="p-2 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Project Form */}
          <div className="lg:col-span-5">
            <SpotlightCard className="border-white/5 p-6">
              <h3 className="font-bold text-white mb-4">
                {projForm.id ? 'Edit Project Details' : 'Register New Project'}
              </h3>
              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Title</label>
                  <input
                    type="text"
                    required
                    value={projForm.title}
                    onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={projForm.description}
                    onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={projForm.techStack}
                    onChange={(e) => setProjForm({ ...projForm, techStack: e.target.value })}
                    placeholder="Python, Flask, dlib"
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Features (one per line)</label>
                  <textarea
                    rows={3}
                    value={projForm.features}
                    onChange={(e) => setProjForm({ ...projForm, features: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Metrics (comma separated)</label>
                  <input
                    type="text"
                    value={projForm.metrics}
                    onChange={(e) => setProjForm({ ...projForm, metrics: e.target.value })}
                    placeholder="96% Accuracy, Real-time"
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">GitHub URL</label>
                    <input
                      type="url"
                      value={projForm.githubUrl}
                      onChange={(e) => setProjForm({ ...projForm, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Live URL</label>
                    <input
                      type="url"
                      value={projForm.liveUrl}
                      onChange={(e) => setProjForm({ ...projForm, liveUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Order Index</label>
                  <input
                    type="number"
                    value={projForm.order}
                    onChange={(e) => setProjForm({ ...projForm, order: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary/95 transition-all"
                  >
                    Save Project
                  </button>
                  {projForm.id && (
                    <button
                      type="button"
                      onClick={() =>
                        setProjForm({
                          id: '',
                          title: '',
                          description: '',
                          techStack: '',
                          features: '',
                          metrics: '',
                          githubUrl: '',
                          liveUrl: '',
                          order: '0',
                        })
                      }
                      className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-xs text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </SpotlightCard>
          </div>
        </div>
      )}

      {/* Skills CRUD Tab Content */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Skills List */}
          <div className="lg:col-span-7 space-y-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-3 border border-white/5 bg-white/[0.01] rounded-xl flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-white text-sm">{skill.name}</span>
                  <span className="text-[10px] uppercase font-semibold text-primary ml-2">{skill.category}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                  <button
                    onClick={() =>
                      setSkillForm({
                        id: skill.id,
                        name: skill.name,
                        category: skill.category,
                        proficiency: String(skill.proficiency),
                      })
                    }
                    className="px-2 py-1 rounded bg-white/5 text-[10px] text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-1 rounded bg-rose-500/10 text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Skill Form */}
          <div className="lg:col-span-5">
            <SpotlightCard className="border-white/5 p-6">
              <h3 className="font-bold text-white mb-4">{skillForm.id ? 'Edit Skill parameters' : 'Register New Skill'}</h3>
              <form onSubmit={handleSaveSkill} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Skill Name</label>
                  <input
                    type="text"
                    required
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Category</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none"
                  >
                    <option value="programming">Programming</option>
                    <option value="webdev">Web Development</option>
                    <option value="aiml">AI & ML</option>
                    <option value="databases">Databases</option>
                    <option value="tools">Tools</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Proficiency %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={skillForm.proficiency}
                    onChange={(e) => setSkillForm({ ...skillForm, proficiency: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary/95 transition-all"
                  >
                    Save Skill
                  </button>
                  {skillForm.id && (
                    <button
                      type="button"
                      onClick={() => setSkillForm({ id: '', name: '', category: 'programming', proficiency: '80' })}
                      className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-xs text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </SpotlightCard>
          </div>
        </div>
      )}
    </div>
  );
};
