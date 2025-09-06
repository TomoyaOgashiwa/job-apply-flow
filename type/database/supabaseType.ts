export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      Application: {
        Row: {
          apply_site_url: string | null;
          comments: string | null;
          company_id: string;
          created_at: string;
          failed_at: string | null;
          failed_reason: string | null;
          id: string;
          interview_status: Database["public"]["Enums"]["InterviewStatus"];
          job_title: string;
          job_type: Database["public"]["Enums"]["JobType"];
          linkedIn_Url: string | null;
          position_level: Database["public"]["Enums"]["PositionLevel"];
          position_type: Database["public"]["Enums"]["PositionType"];
          resume_id: string;
          status: Database["public"]["Enums"]["ApplicationStatus"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          apply_site_url?: string | null;
          comments?: string | null;
          company_id: string;
          created_at?: string;
          failed_at?: string | null;
          failed_reason?: string | null;
          id: string;
          interview_status?: Database["public"]["Enums"]["InterviewStatus"];
          job_title: string;
          job_type: Database["public"]["Enums"]["JobType"];
          linkedIn_Url?: string | null;
          position_level: Database["public"]["Enums"]["PositionLevel"];
          position_type: Database["public"]["Enums"]["PositionType"];
          resume_id: string;
          status?: Database["public"]["Enums"]["ApplicationStatus"];
          updated_at: string;
          user_id: string;
        };
        Update: {
          apply_site_url?: string | null;
          comments?: string | null;
          company_id?: string;
          created_at?: string;
          failed_at?: string | null;
          failed_reason?: string | null;
          id?: string;
          interview_status?: Database["public"]["Enums"]["InterviewStatus"];
          job_title?: string;
          job_type?: Database["public"]["Enums"]["JobType"];
          linkedIn_Url?: string | null;
          position_level?: Database["public"]["Enums"]["PositionLevel"];
          position_type?: Database["public"]["Enums"]["PositionType"];
          resume_id?: string;
          status?: Database["public"]["Enums"]["ApplicationStatus"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Application_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "Company";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Application_resume_id_fkey";
            columns: ["resume_id"];
            isOneToOne: false;
            referencedRelation: "Resume";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Application_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "User";
            referencedColumns: ["id"];
          },
        ];
      };
      Company: {
        Row: {
          created_at: string;
          homepage_url: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          homepage_url: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Update: {
          created_at?: string;
          homepage_url?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      Interview: {
        Row: {
          application_id: string;
          created_at: string;
          id: string;
          interview_date: string;
          interview_feedback: string | null;
          interview_location: string | null;
          interview_notes: string | null;
          updated_at: string;
        };
        Insert: {
          application_id: string;
          created_at?: string;
          id: string;
          interview_date: string;
          interview_feedback?: string | null;
          interview_location?: string | null;
          interview_notes?: string | null;
          updated_at: string;
        };
        Update: {
          application_id?: string;
          created_at?: string;
          id?: string;
          interview_date?: string;
          interview_feedback?: string | null;
          interview_location?: string | null;
          interview_notes?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Interview_application_id_fkey";
            columns: ["application_id"];
            isOneToOne: false;
            referencedRelation: "Application";
            referencedColumns: ["id"];
          },
        ];
      };
      Resume: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
          url: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          name: string;
          updated_at: string;
          url: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
          url?: string;
        };
        Relationships: [];
      };
      User: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          name: string;
          role: Database["public"]["Enums"]["Role"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          name: string;
          role?: Database["public"]["Enums"]["Role"];
          updated_at: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          name?: string;
          role?: Database["public"]["Enums"]["Role"];
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      ApplicationStatus: "PROCESSING" | "APPROVED" | "FAILED" | "NO_RESPONSE";
      InterviewStatus:
        | "SENT_RESUME"
        | "INTERVIEW"
        | "OFFER_INTERVIEW"
        | "OFFER_ACCEPTED"
        | "OFFER_REJECTED";
      JobType:
        | "FULL_TIME"
        | "PART_TIME"
        | "CONTRACT"
        | "INTERNSHIP"
        | "FREELANCE"
        | "VOLUNTEER"
        | "TEMPORARY"
        | "OTHER";
      PositionLevel:
        | "JUNIOR"
        | "INTERMEDIATE"
        | "SENIOR"
        | "STAFF"
        | "LEAD"
        | "CTO"
        | "VP"
        | "DIRECTOR"
        | "OTHER";
      PositionType:
        | "FULL_STACK"
        | "FRONTEND"
        | "BACKEND"
        | "MOBILE"
        | "DATA_SCIENCE"
        | "AI"
        | "SECURITY"
        | "DEVOPS"
        | "OTHER";
      Role: "ADMIN" | "USER";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      ApplicationStatus: ["PROCESSING", "APPROVED", "FAILED", "NO_RESPONSE"],
      InterviewStatus: [
        "SENT_RESUME",
        "INTERVIEW",
        "OFFER_INTERVIEW",
        "OFFER_ACCEPTED",
        "OFFER_REJECTED",
      ],
      JobType: [
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "INTERNSHIP",
        "FREELANCE",
        "VOLUNTEER",
        "TEMPORARY",
        "OTHER",
      ],
      PositionLevel: [
        "JUNIOR",
        "INTERMEDIATE",
        "SENIOR",
        "STAFF",
        "LEAD",
        "CTO",
        "VP",
        "DIRECTOR",
        "OTHER",
      ],
      PositionType: [
        "FULL_STACK",
        "FRONTEND",
        "BACKEND",
        "MOBILE",
        "DATA_SCIENCE",
        "AI",
        "SECURITY",
        "DEVOPS",
        "OTHER",
      ],
      Role: ["ADMIN", "USER"],
    },
  },
} as const;
