export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          user_type: 'farmer' | 'buyer'
          phone_number: string | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          user_type: 'farmer' | 'buyer'
          phone_number?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          user_type?: 'farmer' | 'buyer'
          phone_number?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      produce_listings: {
        Row: {
          id: string
          farmer_id: string
          produce_name: string
          quantity_kg: number
          price_per_kg: number
          storage_facility_id: string | null
          status: 'available' | 'sold' | 'in_storage'
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          farmer_id: string
          produce_name: string
          quantity_kg: number
          price_per_kg: number
          storage_facility_id?: string | null
          status?: 'available' | 'sold' | 'in_storage'
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          farmer_id?: string
          produce_name?: string
          quantity_kg?: number
          price_per_kg?: number
          storage_facility_id?: string | null
          status?: 'available' | 'sold' | 'in_storage'
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      storage_facilities: {
        Row: {
          id: string
          name: string
          location: string
          storage_type: 'cold' | 'climate_controlled' | 'standard'
          capacity_kg: number
          available_capacity_kg: number
          temperature_range: string | null
          rate_per_kg_per_week: number
          status: 'operational' | 'maintenance' | 'full'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          storage_type: 'cold' | 'climate_controlled' | 'standard'
          capacity_kg: number
          available_capacity_kg: number
          temperature_range?: string | null
          rate_per_kg_per_week: number
          status?: 'operational' | 'maintenance' | 'full'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          storage_type?: 'cold' | 'climate_controlled' | 'standard'
          capacity_kg?: number
          available_capacity_kg?: number
          temperature_range?: string | null
          rate_per_kg_per_week?: number
          status?: 'operational' | 'maintenance' | 'full'
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          buyer_id: string
          produce_listing_id: string
          quantity_kg: number
          total_price: number
          delivery_address: string
          status: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          buyer_id: string
          produce_listing_id: string
          quantity_kg: number
          total_price: number
          delivery_address: string
          status?: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          buyer_id?: string
          produce_listing_id?: string
          quantity_kg?: number
          total_price?: number
          delivery_address?: string
          status?: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      storage_bookings: {
        Row: {
          id: string
          farmer_id: string
          produce_listing_id: string | null
          storage_facility_id: string
          quantity_kg: number
          start_date: string
          end_date: string | null
          status: 'active' | 'completed' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          farmer_id: string
          produce_listing_id?: string | null
          storage_facility_id: string
          quantity_kg: number
          start_date?: string
          end_date?: string | null
          status?: 'active' | 'completed' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          farmer_id?: string
          produce_listing_id?: string | null
          storage_facility_id?: string
          quantity_kg?: number
          start_date?: string
          end_date?: string | null
          status?: 'active' | 'completed' | 'cancelled'
          created_at?: string
        }
      }
      subscription_plans: {
        Row: {
          id: string
          name: string
          price_monthly: number
          features: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          price_monthly: number
          features: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          price_monthly?: number
          features?: Json
          created_at?: string
        }
      }
      user_subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: 'active' | 'cancelled' | 'expired'
          started_at: string
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status?: 'active' | 'cancelled' | 'expired'
          started_at?: string
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: 'active' | 'cancelled' | 'expired'
          started_at?: string
          expires_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
