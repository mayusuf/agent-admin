import { Agent, Prompt, BillingMetric, PerformanceMetric, Notification } from '../types';

// Mock data
const mockAgents: Agent[] = [
  {
    id: 1,
    name: 'Customer Support Agent',
    status: 'active',
    lastRun: '2024-03-14T10:30:00',
    taskType: 'Support',
  },
  {
    id: 2,
    name: 'Data Analysis Agent',
    status: 'idle',
    lastRun: '2024-03-14T09:15:00',
    taskType: 'Analysis',
  },
  {
    id: 3,
    name: 'Content Generation Agent',
    status: 'failed',
    lastRun: '2024-03-14T08:45:00',
    taskType: 'Content',
  },
];

const mockPrompts: Prompt[] = [
  {
    id: 1,
    agentId: 1,
    text: 'Customer Support Template',
    modelVersion: 'gpt-4',
    createdAt: '2024-03-20T10:00:00Z',
  },
];

const mockBillingMetrics: BillingMetric[] = [
  {
    date: '2024-03-14',
    tokens: 1000,
    cost: 0.002,
    agentId: 1,
  },
];

const mockPerformanceMetrics: PerformanceMetric[] = [
  {
    date: '2024-03-14',
    successRate: 0.95,
    responseTime: 1.2,
    taskVolume: 100,
    agentId: 1,
  },
];

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'info',
    message: 'New agent deployed successfully',
    timestamp: '2024-03-14T10:30:00',
    read: false,
  },
];

// API functions
export const api = {
  // Agents
  getAgents: async (): Promise<Agent[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAgents;
  },

  createAgent: async (agent: Omit<Agent, 'id'>): Promise<Agent> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newAgent = { ...agent, id: mockAgents.length + 1 };
    mockAgents.push(newAgent);
    return newAgent;
  },

  updateAgent: async (id: number, agent: Partial<Agent>): Promise<Agent> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockAgents.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Agent not found');
    mockAgents[index] = { ...mockAgents[index], ...agent };
    return mockAgents[index];
  },

  deleteAgent: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockAgents.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Agent not found');
    mockAgents.splice(index, 1);
  },

  // Prompts
  getPrompts: async (): Promise<Prompt[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPrompts;
  },

  // Billing
  getBillingMetrics: async (): Promise<BillingMetric[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockBillingMetrics;
  },

  // Performance
  getPerformanceMetrics: async (): Promise<PerformanceMetric[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPerformanceMetrics;
  },

  // Notifications
  getNotifications: async (): Promise<Notification[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNotifications;
  },

  markNotificationAsRead: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const notification = mockNotifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  },
}; 