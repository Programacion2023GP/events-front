// interfaces/event.types.ts

export type DressCodeType =
   | "Formal"
   | "Semi-Formal"
   | "Business-Casual"
   | "Casual"
   | "Formal-Casual"
   | "Black-Tie"
   | "White-Tie";

export interface EventOrganizer {
   department: string;
   email: string;
   phone?: string;
   address?: string;
   website?: string;
   contactPerson?: string;
}

export interface BankTransferData {
   banco: string;
   nombre: string;
   numeroTarjeta: string;
   clabe: string;
   concepto: string;
   linkCobro: string | null;
}

export type GiftType = "link" | "transferencia" | "cash" | "physical";

export interface GiftRegistry {
   site: string;
   link: string;
   image: string;
   color: string;
   type: GiftType;
   bankData?: BankTransferData;
   instructions?: string;
}

export interface EventLocation {
   place: string;
   address: string;
   city: string;
   state: string;
   zipCode?: string;
   coordinates?: {
      lat: number;
      lng: number;
   };
}

export interface InvitationData {
   // Visual
   coverImage: string;
   backgroundImage: string;

   // Información básica
   eventName: string;
   eventType: "government" | "corporate" | "academic";

   // Organización
   organizers: EventOrganizer;

   // Personal
   hostName: string;
   department?: string;

   // Fecha y hora
   formattedDate: string;
   formattedTime: string;
   dateObject: Date;
   displayDate: string;

   // Ubicación
   venue: string;
   location: EventLocation;

   // Enlaces
   calendarLink: string;
   mapsLink: string;

   // Regalos/donaciones
   giftRegistry: GiftRegistry[];

   // Vestimenta
   dressCode: DressCodeType;
   dressCodeDescription?: string;

   // Recomendaciones
   recommendations: string[];

   // Configuración
   showRSVP: boolean;
   showGiftTable: boolean;
   showCountdown: boolean;

   // API
   apiEndpoint: string;

   // Metadatos
   createdAt?: Date;
   updatedAt?: Date;
   version?: string;
}
