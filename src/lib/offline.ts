// Offline detection and management utilities

export const isOnline = (): boolean => {
  return navigator.onLine;
};

export const setupOfflineListener = (
  onOnline: () => void,
  onOffline: () => void
) => {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);

  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
};

// Local storage for offline data
const OFFLINE_QUEUE_KEY = 'agrivault_offline_queue';

export interface OfflineQueueItem {
  id: string;
  type: 'produce_listing' | 'order' | 'booking';
  data: any;
  timestamp: number;
}

export const addToOfflineQueue = (item: Omit<OfflineQueueItem, 'id' | 'timestamp'>) => {
  const queue = getOfflineQueue();
  const newItem: OfflineQueueItem = {
    ...item,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  queue.push(newItem);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  return newItem;
};

export const getOfflineQueue = (): OfflineQueueItem[] => {
  try {
    const queue = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return queue ? JSON.parse(queue) : [];
  } catch {
    return [];
  }
};

export const clearOfflineQueue = () => {
  localStorage.removeItem(OFFLINE_QUEUE_KEY);
};

export const removeFromOfflineQueue = (id: string) => {
  const queue = getOfflineQueue();
  const updated = queue.filter(item => item.id !== id);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(updated));
};

// Cache key helpers
export const CACHE_KEYS = {
  PRODUCE_LISTINGS: 'agrivault_produce_listings',
  STORAGE_FACILITIES: 'agrivault_storage_facilities',
  USER_PROFILE: 'agrivault_user_profile',
};

export const cacheData = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  } catch (error) {
    console.warn('Failed to cache data:', error);
  }
};

export const getCachedData = (key: string, maxAge = 60 * 60 * 1000) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const age = Date.now() - timestamp;
    
    if (age > maxAge) {
      localStorage.removeItem(key);
      return null;
    }
    
    return data;
  } catch {
    return null;
  }
};
