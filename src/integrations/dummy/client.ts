// Dummy data service to replace Supabase client
import type { Database } from "../supabase/types";

// Simulate authentication state
let currentUser: any = null;
let isAuthenticated = false;

// Dummy user data
const dummyUsers = [
  // Farmers from Bauchi
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    email: '+2348012345678@agrivault.app',
    full_name: 'Abubakar Muhammad',
    user_type: 'farmer' as const,
    phone_number: '+2348012345678',
    location: 'Bauchi, Nigeria',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    email: '+2348023456789@agrivault.app',
    full_name: 'Fatima Ibrahim',
    user_type: 'farmer' as const,
    phone_number: '+2348023456789',
    location: 'Azare, Bauchi, Nigeria',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    email: '+2348034567890@agrivault.app',
    full_name: 'Musa Abdullahi',
    user_type: 'farmer' as const,
    phone_number: '+2348034567890',
    location: 'Katagum, Bauchi, Nigeria',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    email: '+2348045678901@agrivault.app',
    full_name: 'Aisha Bello',
    user_type: 'farmer' as const,
    phone_number: '+2348045678901',
    location: 'Misau, Bauchi, Nigeria',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  
  // Farmers from Plateau
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    email: '+2348056789012@agrivault.app',
    full_name: 'Jonathan Dung',
    user_type: 'farmer' as const,
    phone_number: '+2348056789012',
    location: 'Jos, Plateau, Nigeria',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    email: '+2348067890123@agrivault.app',
    full_name: 'Grace Pam',
    user_type: 'farmer' as const,
    phone_number: '+2348067890123',
    location: 'Bokkos, Plateau, Nigeria',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    email: '+2348078901234@agrivault.app',
    full_name: 'Samuel Gyang',
    user_type: 'farmer' as const,
    phone_number: '+2348078901234',
    location: 'Pankshin, Plateau, Nigeria',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    email: '+2348089012345@agrivault.app',
    full_name: 'Rebecca Choji',
    user_type: 'farmer' as const,
    phone_number: '+2348089012345',
    location: 'Langtang, Plateau, Nigeria',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  
  // Buyers from Bauchi
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    email: '+2348090123456@agrivault.app',
    full_name: 'Ahmed Yussuf',
    user_type: 'buyer' as const,
    phone_number: '+2348090123456',
    location: 'Bauchi, Nigeria',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440010',
    email: '+2348101234567@agrivault.app',
    full_name: 'Mariam Sani',
    user_type: 'buyer' as const,
    phone_number: '+2348101234567',
    location: 'Giade, Bauchi, Nigeria',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  
  // Buyers from Plateau
  {
    id: '550e8400-e29b-41d4-a716-446655440011',
    email: '+2348112345678@agrivault.app',
    full_name: 'Daniel Davou',
    user_type: 'buyer' as const,
    phone_number: '+2348112345678',
    location: 'Jos, Plateau, Nigeria',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440012',
    email: '+2348123456789@agrivault.app',
    full_name: 'Esther Ishaya',
    user_type: 'buyer' as const,
    phone_number: '+2348123456789',
    location: 'Barkin Ladi, Plateau, Nigeria',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Dummy produce listings
const dummyProduceListings = [
  {
    id: '1',
    farmer_id: '550e8400-e29b-41d4-a716-446655440001',
    produce_name: 'Tomatoes',
    quantity_kg: 50,
    price_per_kg: 700,
    status: 'available' as const,
    storage_facility_id: null,
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    farmer_id: '550e8400-e29b-41d4-a716-446655440001',
    produce_name: 'Carrots',
    quantity_kg: 30,
    price_per_kg: 600,
    status: 'available' as const,
    storage_facility_id: null,
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    farmer_id: '550e8400-e29b-41d4-a716-446655440002',
    produce_name: 'Yellow Peppers',
    quantity_kg: 25,
    price_per_kg: 900,
    status: 'available' as const,
    storage_facility_id: null,
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    farmer_id: '550e8400-e29b-41d4-a716-446655440001',
    produce_name: 'Millet',
    quantity_kg: 500,
    price_per_kg: 250,
    status: 'available' as const,
    storage_facility_id: null,
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    farmer_id: '550e8400-e29b-41d4-a716-446655440002',
    produce_name: 'Sorghum',
    quantity_kg: 750,
    price_per_kg: 220,
    status: 'available' as const,
    storage_facility_id: null,
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    farmer_id: '550e8400-e29b-41d4-a716-446655440003',
    produce_name: 'Rice',
    quantity_kg: 1000,
    price_per_kg: 450,
    status: 'available' as const,
    storage_facility_id: null,
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    farmer_id: '550e8400-e29b-41d4-a716-446655440004',
    produce_name: 'Maize',
    quantity_kg: 1200,
    price_per_kg: 180,
    status: 'available' as const,
    storage_facility_id: null,
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

// Dummy storage facilities
const dummyStorageFacilities = [
  {
    id: '1',
    name: 'Bauchi Central Storage',
    location: 'Bauchi State',
    storage_type: 'climate_controlled' as const,
    capacity_kg: 10000,
    available_capacity_kg: 5000,
    temperature_range: '15-20°C',
    rate_per_kg_per_week: 500,
    status: 'operational' as const,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jos Cold Storage',
    location: 'Jos, Plateau State',
    storage_type: 'cold' as const,
    capacity_kg: 15000,
    available_capacity_kg: 8000,
    temperature_range: '2-8°C',
    rate_per_kg_per_week: 600,
    status: 'operational' as const,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Azare Storage Facility',
    location: 'Azare, Bauchi State',
    storage_type: 'standard' as const,
    capacity_kg: 8000,
    available_capacity_kg: 4000,
    temperature_range: 'Ambient',
    rate_per_kg_per_week: 400,
    status: 'operational' as const,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Bokkos Storage Hub',
    location: 'Bokkos, Plateau State',
    storage_type: 'climate_controlled' as const,
    capacity_kg: 12000,
    available_capacity_kg: 6000,
    temperature_range: '15-22°C',
    rate_per_kg_per_week: 550,
    status: 'operational' as const,
    created_at: new Date().toISOString()
  }
];

// Dummy orders
const dummyOrders = [
  {
    id: '1',
    buyer_id: '550e8400-e29b-41d4-a716-446655440002',
    produce_listing_id: '1',
    quantity_kg: 50,
    total_price: 35000,
    delivery_address: 'Jos, Plateau, Nigeria',
    status: 'in_transit' as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    buyer_id: '550e8400-e29b-41d4-a716-446655440002',
    produce_listing_id: '2',
    quantity_kg: 30,
    total_price: 18000,
    delivery_address: 'Jos, Plateau, Nigeria',
    status: 'delivered' as const,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Simulate delay for async operations
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Auth service
export const auth = {
  async signInWithPassword({ email, password }: { email: string; password: string }) {
    await delay(800);
    
    // Check if credentials match dummy data
    const phone = email.replace('@agrivault.app', '');
    const user = dummyUsers.find(u => u.phone_number === phone);
    
    if (user && password === 'password123') {
      currentUser = user;
      isAuthenticated = true;
      localStorage.setItem('dummyUser', JSON.stringify(user));
      
      return {
        data: {
          user: {
            ...user,
            user_type: user.user_type
          }
        },
        error: null
      };
    }
    
    return {
      data: { user: null },
      error: { message: "Invalid login credentials" }
    };
  },
  
  async signUp({ email, password, options }: { email: string; password: string; options?: any }) {
    await delay(800);
    
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      full_name: options?.data?.full_name || 'New User',
      user_type: options?.data?.user_type || 'farmer',
      phone_number: options?.data?.phone_number || '',
      location: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    currentUser = newUser;
    isAuthenticated = true;
    localStorage.setItem('dummyUser', JSON.stringify(newUser));
    
    return {
      data: { user: newUser },
      error: null
    };
  },
  
  async getUser() {
    await delay(300);
    
    if (!currentUser) {
      const stored = localStorage.getItem('dummyUser');
      if (stored) {
        currentUser = JSON.parse(stored);
        isAuthenticated = true;
      }
    }
    
    return {
      data: { user: currentUser },
      error: null
    };
  },
  
  async signOut() {
    await delay(300);
    currentUser = null;
    isAuthenticated = false;
    localStorage.removeItem('dummyUser');
    
    return { error: null };
  }
};

// Query builder class
class QueryBuilder {
  private table: string;
  private filters: { column: string; value: any }[] = [];
  private isSingle: boolean = false;
  private selectColumns?: string;
  
  constructor(table: string) {
    this.table = table;
  }
  
  select(columns?: string) {
    this.selectColumns = columns;
    return this;
  }
  
  eq(column: string, value: any) {
    this.filters.push({ column, value });
    return this;
  }
  
  single() {
    this.isSingle = true;
    return this.execute();
  }
  
  async execute() {
    await delay(500);
    
    let data: any[] = [];
    
    switch (this.table) {
      case 'profiles':
        data = dummyUsers;
        break;
      case 'produce_listings':
        data = dummyProduceListings.map(listing => ({
          ...listing,
          farmer: dummyUsers.find(user => user.id === listing.farmer_id)
        }));
        break;
      case 'storage_facilities':
        data = dummyStorageFacilities;
        break;
      case 'orders':
        data = dummyOrders;
        break;
      default:
        data = [];
    }
    
    // Apply filters
    this.filters.forEach(filter => {
      data = data.filter(item => item[filter.column] === filter.value);
    });
    
    if (this.isSingle) {
      return {
        data: data[0] || null,
        error: null
      };
    }
    
    return {
      data,
      error: null
    };
  }
  
  async insert(values: any) {
    await delay(500);
    
    const newItem = {
      id: `id-${Date.now()}`,
      ...values,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    return {
      data: [newItem],
      error: null
    };
  }
  
  update(values: any) {
    return {
      eq: async (column: string, value: any) => {
        await delay(500);
        return {
          data: [values],
          error: null
        };
      }
    };
  }
  
  delete() {
    return {
      eq: async (column: string, value: any) => {
        await delay(500);
        return {
          data: null,
          error: null
        };
      }
    };
  }
  
  // Make it awaitable by returning a Promise that resolves to the execute result
  then(resolve: any, reject?: any) {
    return this.execute().then(resolve, reject);
  }
  
  catch(reject: any) {
    return this.execute().catch(reject);
  }
  
  finally(onFinally: any) {
    return this.execute().finally(onFinally);
  }
  
  // Make it work with async/await
  get [Symbol.toStringTag]() {
    return 'Promise';
  }
  
  get [Symbol.asyncIterator]() {
    return this.execute()[Symbol.asyncIterator]();
  }
}

// Database service
export const from = (table: string) => {
  return new QueryBuilder(table);
};

// Export the dummy client
export const supabase = {
  auth,
  from
};