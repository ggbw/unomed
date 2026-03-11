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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_type: string | null
          consultant_id: string | null
          created_at: string
          date_time: string
          id: string
          notes: string | null
          patient_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          appointment_type?: string | null
          consultant_id?: string | null
          created_at?: string
          date_time: string
          id?: string
          notes?: string | null
          patient_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          appointment_type?: string | null
          consultant_id?: string | null
          created_at?: string
          date_time?: string
          id?: string
          notes?: string | null
          patient_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_consultant_id_fkey"
            columns: ["consultant_id"]
            isOneToOne: false
            referencedRelation: "consultants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      batch_claims: {
        Row: {
          batch_id: string
          claim_gross: number | null
          created_at: string
          id: string
          invoice_id: string
          num_lines: number | null
          script_no: string | null
        }
        Insert: {
          batch_id: string
          claim_gross?: number | null
          created_at?: string
          id?: string
          invoice_id: string
          num_lines?: number | null
          script_no?: string | null
        }
        Update: {
          batch_id?: string
          claim_gross?: number | null
          created_at?: string
          id?: string
          invoice_id?: string
          num_lines?: number | null
          script_no?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "batch_claims_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batch_claims_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      batches: {
        Row: {
          batch_date: string
          batch_no: string | null
          created_at: string
          export_status: boolean | null
          id: string
          medical_aid_scheme_id: string | null
          num_claims: number | null
          source: string | null
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          batch_date?: string
          batch_no?: string | null
          created_at?: string
          export_status?: boolean | null
          id?: string
          medical_aid_scheme_id?: string | null
          num_claims?: number | null
          source?: string | null
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          batch_date?: string
          batch_no?: string | null
          created_at?: string
          export_status?: boolean | null
          id?: string
          medical_aid_scheme_id?: string | null
          num_claims?: number | null
          source?: string | null
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "batches_medical_aid_scheme_id_fkey"
            columns: ["medical_aid_scheme_id"]
            isOneToOne: false
            referencedRelation: "medical_aid_schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      consultants: {
        Row: {
          contact: string | null
          created_at: string
          id: string
          name: string
          practice_no: string | null
          specialty: string | null
          updated_at: string
        }
        Insert: {
          contact?: string | null
          created_at?: string
          id?: string
          name: string
          practice_no?: string | null
          specialty?: string | null
          updated_at?: string
        }
        Update: {
          contact?: string | null
          created_at?: string
          id?: string
          name?: string
          practice_no?: string | null
          specialty?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      diagnoses: {
        Row: {
          created_at: string
          description: string
          icd10_code: string
          id: string
        }
        Insert: {
          created_at?: string
          description: string
          icd10_code: string
          id?: string
        }
        Update: {
          created_at?: string
          description?: string
          icd10_code?: string
          id?: string
        }
        Relationships: []
      }
      investigations: {
        Row: {
          code: string | null
          created_at: string
          fee: number | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          fee?: number | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          fee?: number | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      invoice_lines: {
        Row: {
          benefit_amount: number | null
          created_at: string
          description: string | null
          diagnosis_name: string | null
          fee: number | null
          icd10_code: string | null
          id: string
          invoice_id: string
          item_code: string | null
          item_code_type: string | null
          line_type: string
          quantity: number | null
        }
        Insert: {
          benefit_amount?: number | null
          created_at?: string
          description?: string | null
          diagnosis_name?: string | null
          fee?: number | null
          icd10_code?: string | null
          id?: string
          invoice_id: string
          item_code?: string | null
          item_code_type?: string | null
          line_type: string
          quantity?: number | null
        }
        Update: {
          benefit_amount?: number | null
          created_at?: string
          description?: string | null
          diagnosis_name?: string | null
          fee?: number | null
          icd10_code?: string | null
          id?: string
          invoice_id?: string
          item_code?: string | null
          item_code_type?: string | null
          line_type?: string
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_lines_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          consultant_id: string | null
          created_at: string
          date: string
          export_status: boolean | null
          id: string
          invoice_no: string | null
          medical_aid_amount: number | null
          medical_aid_scheme_id: string | null
          patient_due: number | null
          patient_id: string
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          consultant_id?: string | null
          created_at?: string
          date?: string
          export_status?: boolean | null
          id?: string
          invoice_no?: string | null
          medical_aid_amount?: number | null
          medical_aid_scheme_id?: string | null
          patient_due?: number | null
          patient_id: string
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          consultant_id?: string | null
          created_at?: string
          date?: string
          export_status?: boolean | null
          id?: string
          invoice_no?: string | null
          medical_aid_amount?: number | null
          medical_aid_scheme_id?: string | null
          patient_due?: number | null
          patient_id?: string
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_consultant_id_fkey"
            columns: ["consultant_id"]
            isOneToOne: false
            referencedRelation: "consultants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_medical_aid_scheme_id_fkey"
            columns: ["medical_aid_scheme_id"]
            isOneToOne: false
            referencedRelation: "medical_aid_schemes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          category: string | null
          created_at: string
          id: string
          name: string
          nappi_code: string | null
          reorder_level: number | null
          stock_qty: number | null
          unit: string | null
          unit_cost: number | null
          unit_price: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          name: string
          nappi_code?: string | null
          reorder_level?: number | null
          stock_qty?: number | null
          unit?: string | null
          unit_cost?: number | null
          unit_price?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          name?: string
          nappi_code?: string | null
          reorder_level?: number | null
          stock_qty?: number | null
          unit?: string | null
          unit_cost?: number | null
          unit_price?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      medical_aid_schemes: {
        Row: {
          contact: string | null
          created_at: string
          id: string
          name: string
          plan_code: string | null
          provider_bhf: string | null
          scheme_code: string | null
          updated_at: string
        }
        Insert: {
          contact?: string | null
          created_at?: string
          id?: string
          name: string
          plan_code?: string | null
          provider_bhf?: string | null
          scheme_code?: string | null
          updated_at?: string
        }
        Update: {
          contact?: string | null
          created_at?: string
          id?: string
          name?: string
          plan_code?: string | null
          provider_bhf?: string | null
          scheme_code?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      organisation: {
        Row: {
          address: string | null
          bhf_provider_no: string | null
          cell: string | null
          city: string | null
          clinic_name: string
          country: string | null
          created_at: string
          email: string | null
          fax: string | null
          id: string
          logo_url: string | null
          telephone: string | null
          updated_at: string
          vat_no: string | null
        }
        Insert: {
          address?: string | null
          bhf_provider_no?: string | null
          cell?: string | null
          city?: string | null
          clinic_name?: string
          country?: string | null
          created_at?: string
          email?: string | null
          fax?: string | null
          id?: string
          logo_url?: string | null
          telephone?: string | null
          updated_at?: string
          vat_no?: string | null
        }
        Update: {
          address?: string | null
          bhf_provider_no?: string | null
          cell?: string | null
          city?: string | null
          clinic_name?: string
          country?: string | null
          created_at?: string
          email?: string | null
          fax?: string | null
          id?: string
          logo_url?: string | null
          telephone?: string | null
          updated_at?: string
          vat_no?: string | null
        }
        Relationships: []
      }
      patients: {
        Row: {
          address: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          first_name: string
          gender: string | null
          id: string
          initials: string | null
          last_name: string
          medical_aid_code: string | null
          medical_aid_percentage: number | null
          medical_aid_registration_date: string | null
          medical_aid_scheme_id: string | null
          membership_no: string | null
          mobile_phone_1: string | null
          mobile_phone_2: string | null
          omang_id: string | null
          patient_file_no: string | null
          principal_member_name: string | null
          registration_date: string | null
          relationship_to_member: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name: string
          gender?: string | null
          id?: string
          initials?: string | null
          last_name: string
          medical_aid_code?: string | null
          medical_aid_percentage?: number | null
          medical_aid_registration_date?: string | null
          medical_aid_scheme_id?: string | null
          membership_no?: string | null
          mobile_phone_1?: string | null
          mobile_phone_2?: string | null
          omang_id?: string | null
          patient_file_no?: string | null
          principal_member_name?: string | null
          registration_date?: string | null
          relationship_to_member?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          initials?: string | null
          last_name?: string
          medical_aid_code?: string | null
          medical_aid_percentage?: number | null
          medical_aid_registration_date?: string | null
          medical_aid_scheme_id?: string | null
          membership_no?: string | null
          mobile_phone_1?: string | null
          mobile_phone_2?: string | null
          omang_id?: string | null
          patient_file_no?: string | null
          principal_member_name?: string | null
          registration_date?: string | null
          relationship_to_member?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patients_medical_aid_scheme_id_fkey"
            columns: ["medical_aid_scheme_id"]
            isOneToOne: false
            referencedRelation: "medical_aid_schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      prescription_lines: {
        Row: {
          created_at: string
          dosage: string | null
          icd10_code: string | null
          id: string
          item_id: string | null
          item_name: string | null
          nappi_code: string | null
          prescription_id: string
          quantity: number | null
        }
        Insert: {
          created_at?: string
          dosage?: string | null
          icd10_code?: string | null
          id?: string
          item_id?: string | null
          item_name?: string | null
          nappi_code?: string | null
          prescription_id: string
          quantity?: number | null
        }
        Update: {
          created_at?: string
          dosage?: string | null
          icd10_code?: string | null
          id?: string
          item_id?: string | null
          item_name?: string | null
          nappi_code?: string | null
          prescription_id?: string
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prescription_lines_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescription_lines_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          consultant_id: string | null
          created_at: string
          date: string
          id: string
          patient_id: string
          remarks: string | null
          updated_at: string
        }
        Insert: {
          consultant_id?: string | null
          created_at?: string
          date?: string
          id?: string
          patient_id: string
          remarks?: string | null
          updated_at?: string
        }
        Update: {
          consultant_id?: string | null
          created_at?: string
          date?: string
          id?: string
          patient_id?: string
          remarks?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_consultant_id_fkey"
            columns: ["consultant_id"]
            isOneToOne: false
            referencedRelation: "consultants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      procedures: {
        Row: {
          code: string | null
          created_at: string
          fee: number | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          fee?: number | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          fee?: number | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_letters: {
        Row: {
          consultant_id: string | null
          created_at: string
          date: string
          id: string
          patient_id: string
          reason: string | null
          referred_to: string | null
          updated_at: string
        }
        Insert: {
          consultant_id?: string | null
          created_at?: string
          date?: string
          id?: string
          patient_id: string
          reason?: string | null
          referred_to?: string | null
          updated_at?: string
        }
        Update: {
          consultant_id?: string | null
          created_at?: string
          date?: string
          id?: string
          patient_id?: string
          reason?: string | null
          referred_to?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_letters_consultant_id_fkey"
            columns: ["consultant_id"]
            isOneToOne: false
            referencedRelation: "consultants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_letters_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string | null
          created_at: string
          fee: number | null
          id: string
          name: string
          service_code: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          fee?: number | null
          id?: string
          name: string
          service_code?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          fee?: number | null
          id?: string
          name?: string
          service_code?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sick_leave_durations: {
        Row: {
          created_at: string
          from_date: string
          id: string
          num_days: number | null
          sick_leave_id: string
          to_date: string
        }
        Insert: {
          created_at?: string
          from_date: string
          id?: string
          num_days?: number | null
          sick_leave_id: string
          to_date: string
        }
        Update: {
          created_at?: string
          from_date?: string
          id?: string
          num_days?: number | null
          sick_leave_id?: string
          to_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "sick_leave_durations_sick_leave_id_fkey"
            columns: ["sick_leave_id"]
            isOneToOne: false
            referencedRelation: "sick_leaves"
            referencedColumns: ["id"]
          },
        ]
      }
      sick_leaves: {
        Row: {
          consultant_id: string | null
          created_at: string
          date: string
          id: string
          patient_id: string
          updated_at: string
        }
        Insert: {
          consultant_id?: string | null
          created_at?: string
          date?: string
          id?: string
          patient_id: string
          updated_at?: string
        }
        Update: {
          consultant_id?: string | null
          created_at?: string
          date?: string
          id?: string
          patient_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sick_leaves_consultant_id_fkey"
            columns: ["consultant_id"]
            isOneToOne: false
            referencedRelation: "consultants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sick_leaves_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_adjustments: {
        Row: {
          adjustment_type: string
          created_at: string
          date: string
          id: string
          item_id: string
          quantity: number
          reason: string | null
        }
        Insert: {
          adjustment_type: string
          created_at?: string
          date?: string
          id?: string
          item_id: string
          quantity?: number
          reason?: string | null
        }
        Update: {
          adjustment_type?: string
          created_at?: string
          date?: string
          id?: string
          item_id?: string
          quantity?: number
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_adjustments_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_dispensed: {
        Row: {
          created_at: string
          date: string
          id: string
          invoice_id: string | null
          item_id: string
          notes: string | null
          patient_id: string | null
          quantity: number
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          invoice_id?: string | null
          item_id: string
          notes?: string | null
          patient_id?: string | null
          quantity?: number
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          invoice_id?: string | null
          item_id?: string
          notes?: string | null
          patient_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "stock_dispensed_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_dispensed_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_dispensed_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_received: {
        Row: {
          created_at: string
          date: string
          id: string
          reference_no: string | null
          supplier: string | null
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          reference_no?: string | null
          supplier?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          reference_no?: string | null
          supplier?: string | null
        }
        Relationships: []
      }
      stock_received_items: {
        Row: {
          created_at: string
          id: string
          item_id: string
          quantity: number
          stock_received_id: string
          total: number | null
          unit_cost: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          quantity?: number
          stock_received_id: string
          total?: number | null
          unit_cost?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          quantity?: number
          stock_received_id?: string
          total?: number | null
          unit_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_received_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_received_items_stock_received_id_fkey"
            columns: ["stock_received_id"]
            isOneToOne: false
            referencedRelation: "stock_received"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "receptionist" | "doctor" | "pharmacist"
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
    Enums: {
      app_role: ["admin", "receptionist", "doctor", "pharmacist"],
    },
  },
} as const
