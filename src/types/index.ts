export interface Agent {
  id: number;
  name: string;
  taskType: string;
  status: 'active' | 'idle' | 'failed';
  lastRun: string;
}

export interface Prompt {
  id: number;
  agentId: number;
  text: string;
  modelVersion: string;
  createdAt: string;
}

export interface BillingMetric {
  date: string;
  tokens: number;
  cost: number;
  agentId: number;
}

export interface PerformanceMetric {
  date: string;
  successRate: number;
  responseTime: number;
  taskVolume: number;
  agentId: number;
}

export interface Notification {
  id: number;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PerformanceMetrics {
  id: number;
  agentId: number;
  taskSuccessRate: number;
  averageResponseTime: number;
  tasksHandled: number;
  timestamp: string;
}

export interface AgentPerformance {
  agentId: number;
  agentName: string;
  metrics: PerformanceMetrics[];
}

export interface LLMCredentials {
  id: number;
  provider: 'openai' | 'anthropic' | 'mistral';
  apiKey: string;
  modelVersion: string;
  isActive: boolean;
}

export interface AgentCredentials {
  id: number;
  agentId: number;
  credentials: {
    openai?: string;
    anthropic?: string;
    mistral?: string;
  };
}

export interface Settings {
  defaultLLM: 'openai' | 'anthropic' | 'mistral';
  defaultModelVersion: string;
  langChainApiKey?: string;
  langSmithApiKey?: string;
  credentials: LLMCredentials[];
  agentCredentials: AgentCredentials[];
} 