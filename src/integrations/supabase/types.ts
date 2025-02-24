export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      application_requirements: {
        Row: {
          application_id: string | null
          file_name: string | null
          file_url: string | null
          id: string
          requirement_type: string | null
          uploaded_at: string | null
        }
        Insert: {
          application_id?: string | null
          file_name?: string | null
          file_url?: string | null
          id: string
          requirement_type?: string | null
          uploaded_at?: string | null
        }
        Update: {
          application_id?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          requirement_type?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_requirements_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          application_type: string | null
          barangay: string | null
          building_name: string | null
          city: string | null
          contact_number: string | null
          created_at: string | null
          establishment_name: string | null
          id: string
          landline: string | null
          number_of_storeys: string | null
          occupancy_type: string | null
          owner_id: string | null
          owner_name: string | null
          province: string | null
          region: string | null
          representative_name: string | null
          signature: string | null
          signature_url: string | null
          status: string | null
          total_floor_area: string | null
          trade_name: string | null
          updated_at: string | null
        }
        Insert: {
          application_type?: string | null
          barangay?: string | null
          building_name?: string | null
          city?: string | null
          contact_number?: string | null
          created_at?: string | null
          establishment_name?: string | null
          id?: string
          landline?: string | null
          number_of_storeys?: string | null
          occupancy_type?: string | null
          owner_id?: string | null
          owner_name?: string | null
          province?: string | null
          region?: string | null
          representative_name?: string | null
          signature?: string | null
          signature_url?: string | null
          status?: string | null
          total_floor_area?: string | null
          trade_name?: string | null
          updated_at?: string | null
        }
        Update: {
          application_type?: string | null
          barangay?: string | null
          building_name?: string | null
          city?: string | null
          contact_number?: string | null
          created_at?: string | null
          establishment_name?: string | null
          id?: string
          landline?: string | null
          number_of_storeys?: string | null
          occupancy_type?: string | null
          owner_id?: string | null
          owner_name?: string | null
          province?: string | null
          region?: string | null
          representative_name?: string | null
          signature?: string | null
          signature_url?: string | null
          status?: string | null
          total_floor_area?: string | null
          trade_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      establishments: {
        Row: {
          business_address: string
          business_name: string
          business_type: string
          created_at: string
          id: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          business_address: string
          business_name: string
          business_type: string
          created_at?: string
          id?: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          business_address?: string
          business_name?: string
          business_type?: string
          created_at?: string
          id?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "establishments_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      inspections: {
        Row: {
          application_id: string | null
          application_type: string
          attending_inspector: string
          created_at: string | null
          date_of_inspection: string
          establishment_name: string
          fsic_no: string
          id: string
          status: string
          valid_until: string
        }
        Insert: {
          application_id?: string | null
          application_type: string
          attending_inspector: string
          created_at?: string | null
          date_of_inspection: string
          establishment_name: string
          fsic_no: string
          id?: string
          status?: string
          valid_until: string
        }
        Update: {
          application_id?: string | null
          application_type?: string
          attending_inspector?: string
          created_at?: string | null
          date_of_inspection?: string
          establishment_name?: string
          fsic_no?: string
          id?: string
          status?: string
          valid_until?: string
        }
        Relationships: [
          {
            foreignKeyName: "inspections_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          birthday: string
          created_at: string
          first_name: string
          id: string
          last_name: string
          middle_name: string | null
          signature: string | null
          updated_at: string
        }
        Insert: {
          birthday: string
          created_at?: string
          first_name: string
          id: string
          last_name: string
          middle_name?: string | null
          signature?: string | null
          updated_at?: string
        }
        Update: {
          birthday?: string
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          middle_name?: string | null
          signature?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_inspections_with_details: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          fsic_no: string
          date_of_inspection: string
          attending_inspector: string
          valid_until: string
          status: string
          created_at: string
          application_id: string
          establishment_name: string
          application_type: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
