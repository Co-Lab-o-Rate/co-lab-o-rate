export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      art_image: {
        Row: {
          artist: string
          description: string
          id: number
          medium: string
          title: string
          url: string
          year: number
        }
        Insert: {
          artist: string
          description: string
          id?: number
          medium: string
          title: string
          url: string
          year: number
        }
        Update: {
          artist?: string
          description?: string
          id?: number
          medium?: string
          title?: string
          url?: string
          year?: number
        }
        Relationships: []
      }
      board_cell: {
        Row: {
          board_loc: number
          cell_url: number
          game_board_id: number
          id: number
        }
        Insert: {
          board_loc: number
          cell_url: number
          game_board_id: number
          id?: number
        }
        Update: {
          board_loc?: number
          cell_url?: number
          game_board_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "board_cell_fk1"
            columns: ["game_board_id"]
            isOneToOne: false
            referencedRelation: "game_board"
            referencedColumns: ["id"]
          },
        ]
      }
      connector_gallery_image: {
        Row: {
          gallery_id: number
          id: number
          image_id: number
        }
        Insert: {
          gallery_id: number
          id?: number
          image_id: number
        }
        Update: {
          gallery_id?: number
          id?: number
          image_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "connector_gallery_image_fk1"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "gallery"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connector_gallery_image_fk2"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "art_image"
            referencedColumns: ["id"]
          },
        ]
      }
      connector_user_board: {
        Row: {
          board_id: number
          id: number
          user_id: number
        }
        Insert: {
          board_id: number
          id?: number
          user_id: number
        }
        Update: {
          board_id?: number
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "connector_user_board_fk1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connector_user_board_fk2"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "game_board"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      game_board: {
        Row: {
          board_url: number
          id: number
        }
        Insert: {
          board_url: number
          id?: number
        }
        Update: {
          board_url?: number
          id?: number
        }
        Relationships: []
      }
      Score: {
        Row: {
          board_id: number
          id: number
          score: number
          user_id: number
        }
        Insert: {
          board_id: number
          id?: number
          score: number
          user_id: number
        }
        Update: {
          board_id?: number
          id?: number
          score?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Score_fk2"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Score_fk3"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "connector_user_board"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          admin: boolean
          email: string | null
          first_name: string
          gallery_id: number | null
          id: number
          last_name: string
          password: string
        }
        Insert: {
          admin?: boolean
          email?: string | null
          first_name: string
          gallery_id?: number | null
          id?: number
          last_name: string
          password: string
        }
        Update: {
          admin?: boolean
          email?: string | null
          first_name?: string
          gallery_id?: number | null
          id?: number
          last_name?: string
          password?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_fk4"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "gallery"
            referencedColumns: ["id"]
          },
        ]
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
