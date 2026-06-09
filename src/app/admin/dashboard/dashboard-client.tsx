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
import { Mail, BarChart3, Layers, Cpu, Trash2, Check, Loader2 } from 'lucide-react';

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

  const [projForm, setProjForm] = useState({
    id: '', title: '', description: '', techStack: '', features: '',
    metrics: '', githubUrl: '', liveUrl: '', order: '0',
  });

  const [skillForm, setSkillForm] = useState({
    id: '', name: '', category: 'programming', proficiency: '80',
  });

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    startTransition(async () => {
      const updated = await adminMarkMessageRead(id, !currentRead);
      setMessages(messages.map((m) => (m.id === id ? { ...m, read: updated.read } : m)));
    });
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Delete this message permanently?')) return;
    startTransition(async () => {
      await adminDeleteMessage(id);
      setMessages(messages.filter((m) => m.id !== id));
    });
  };

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
      setProjForm({ id: '', title: '', description: '', techStack: '', features: '', metrics: '', githubUrl: '', liveUrl: '', order: '0' });
    });
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    startTransition(async () => {
      await adminDeleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    });
  };

  const tabs = [
    { id: 'analytics', label: 'Analytics', Icon: BarChart3 },
    { id: 'messages', label: 'Recruiter Messages', Icon: Mail },
    { id: 'projects', label: 'Projects', Icon: Layers },
    { id: 'skills', label: 'Skills', Icon: Cpu },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1 border-b border-white/5 pb-px">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-1.5 px-4 py-3 text-sm font-semibold transition-colors ${
              activeTab === id ? 'border-b-2 border-primary text-white' : 'text-muted-foreground hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {isPending && (
        <div className="flex items-center text-xs text-primary bg-primary/5 px-4 py-2.5 rounded-lg border border-primary/10">
          <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
          Syncing with database...
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <SpotlightCard className="border-white/5 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Page Hit Counts</h3>
              {viewsByPath.length > 0 ? viewsByPath.map((item) => (
                <div key={item.path} className="flex items-center justify-between text-sm">
                  <span className="font-mono text-cyan-400">{item.path}</span>
                  <span className="font-bold text-white">{item.count}</span>
                </div>
              )) : <p className="text-xs text-muted-foreground">No analytics data yet.</p>}
            </SpotlightCard>

            <SpotlightCard className="border-white/5 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Visits</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-muted-foreground border-b border-white/5">
                    <tr>
                      <th className="pb-2 pr-4">Hash ID</th>
                      <th className="pb-2 pr-4">Path</th>
                      <th className="pb-2 pr-4">Country</th>
                      <th className="pb-2 pr-4">Device</th>
                      <th className="pb-2 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentVisits.map((v) => (
                      <tr key={v.id} className="border-b border-white/[0.02]">
                        <td className="py-2 pr-4 font-mono">{v.ipHash.substring(0, 8)}</td>
                        <td className="py-2 pr-4 text-cyan-400">{v.path}</td>
                        <td className="py-2 pr-4">{v.country || '—'}</td>
                        <td className="py-2 pr-4">{v.device || '—'}</td>
                        <td className="py-2 text-right text-muted-foreground">{new Date(v.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {recentVisits.length === 0 && <p className="text-xs text-muted-foreground pt-2">No visits recorded yet.</p>}
              </div>
            </SpotlightCard>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <SpotlightCard className="border-white/5 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Device Breakdown</h3>
              {viewsByDevice.map((item) => (
                <div key={item.device} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.device}</span>
                  <span className="font-bold text-white">{item.count}</span>
                </div>
              ))}
              {viewsByDevice.length === 0 && <p className="text-xs text-muted-foreground">No data yet.</p>}
            </SpotlightCard>

            <SpotlightCard className="border-white/5 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Countries</h3>
              {viewsByCountry.map((item) => (
                <div key={item.country} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.country}</span>
                  <span className="font-bold text-white">{item.count}</span>
                </div>
              ))}
              {viewsByCountry.length === 0 && <p className="text-xs text-muted-foreground">No data yet.</p>}
            </SpotlightCard>
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          {messages.length > 0 ? messages.map((item) => (
            <SpotlightCard key={item.id} className={`border-white/5 p-6 space-y-3 ${!item.read ? 'border-primary/20' : 'opacity-60'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <span className="font-bold text-white text-sm">{item.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">&lt;{item.email}&gt;</span>
                  <p className="text-xs text-primary mt-1 font-semibold">{item.subject}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleToggleRead(item.id, item.read)}
                    className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all ${item.read ? 'text-primary' : 'text-muted-foreground'}`}
                    title={item.read ? 'Mark unread' : 'Mark read'}>
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteMessage(item.id)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">{item.message}</p>
              <span className="text-[10px] text-muted-foreground block">{new Date(item.createdAt).toLocaleString()}</span>
            </SpotlightCard>
          )) : (
            <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
              <p className="text-muted-foreground text-sm">Inbox is empty.</p>
            </div>
          )}
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="p-4 border border-white/5 rounded-xl flex items-center justify-between bg-white/[0.01]">
                <div>
                  <p className="font-bold text-white text-sm">{proj.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{proj.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button onClick={() => setProjForm({ id: proj.id, title: proj.title, description: proj.description, techStack: proj.techStack.join(', '), features: proj.features.join('\n'), metrics: proj.metrics.join(', '), githubUrl: proj.githubUrl || '', liveUrl: proj.liveUrl || '', order: String(proj.order) })}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-all">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteProject(proj.id)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {projects.length === 0 && <p className="text-xs text-muted-foreground">No projects yet. Add one →</p>}
          </div>

          <div className="lg:col-span-5">
            <SpotlightCard className="border-white/5 p-6">
              <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">{projForm.id ? 'Edit Project' : 'Add New Project'}</h3>
              <form onSubmit={handleSaveProject} className="space-y-4">
                {[['title', 'Title', 'text'], ['techStack', 'Tech Stack (comma separated)', 'text'], ['metrics', 'Metrics (comma separated)', 'text'], ['githubUrl', 'GitHub URL', 'url'], ['liveUrl', 'Live URL', 'url']].map(([field, label, type]) => (
                  <div key={field} className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">{label}</label>
                    <input type={type} value={(projForm as any)[field]} onChange={(e) => setProjForm({ ...projForm, [field]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-primary/40 transition-all" />
                  </div>
                ))}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Description</label>
                  <textarea required rows={2} value={projForm.description} onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none resize-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Features (one per line)</label>
                  <textarea rows={3} value={projForm.features} onChange={(e) => setProjForm({ ...projForm, features: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none resize-none" />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button type="submit" className="flex-1 py-2.5 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 transition-all">
                    {projForm.id ? 'Update Project' : 'Add Project'}
                  </button>
                  {projForm.id && (
                    <button type="button" onClick={() => setProjForm({ id: '', title: '', description: '', techStack: '', features: '', metrics: '', githubUrl: '', liveUrl: '', order: '0' })}
                      className="px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </SpotlightCard>
          </div>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="p-3 border border-white/5 rounded-xl flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-white text-sm">{skill.name}</span>
                  <span className="text-[10px] uppercase font-semibold text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">{skill.category}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                  <button onClick={() => setSkillForm({ id: skill.id, name: skill.name, category: skill.category, proficiency: String(skill.proficiency) })}
                    className="px-2 py-1 rounded bg-white/5 text-[10px] text-white hover:bg-white/10 transition-all">Edit</button>
                  <button onClick={() => handleDeleteSkill(skill.id)}
                    className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {skills.length === 0 && <p className="text-xs text-muted-foreground">No skills yet.</p>}
          </div>

          <div className="lg:col-span-5">
            <SpotlightCard className="border-white/5 p-6">
              <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">{skillForm.id ? 'Edit Skill' : 'Add Skill'}</h3>
              <form onSubmit={handleSaveSkill} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Name</label>
                  <input type="text" required value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-primary/40 transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Category</label>
                  <select value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#0a0a0c] text-sm text-white focus:outline-none">
                    {['programming', 'webdev', 'aiml', 'databases', 'tools'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Proficiency % (0-100)</label>
                  <input type="number" min="0" max="100" required value={skillForm.proficiency} onChange={(e) => setSkillForm({ ...skillForm, proficiency: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-primary/40 transition-all" />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button type="submit" className="flex-1 py-2.5 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 transition-all">
                    {skillForm.id ? 'Update Skill' : 'Add Skill'}
                  </button>
                  {skillForm.id && (
                    <button type="button" onClick={() => setSkillForm({ id: '', name: '', category: 'programming', proficiency: '80' })}
                      className="px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white">
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
