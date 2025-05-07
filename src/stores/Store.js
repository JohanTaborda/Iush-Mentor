import { create } from 'zustand';
import {
  FcStatistics, FcCustomerSupport, FcCurrencyExchange, FcBusiness, FcBriefcase,
  FcGlobe, FcFlowChart, FcOrganization, FcDebt, FcDiploma2,
  FcClapperboard, FcCapacitor, FcSupport, FcCommandLine, FcReddit,
  FcSportsMode, FcSelfServiceKiosk, FcFilmReel, FcBullish
} from "react-icons/fc";

const useMentorStore = create((set) => ({
  // Subescuela seleccionada
  selectedSubschool: null,

  // Lista de subescuelas administrativas
  adminSubschools: [
    { id: 0, title: "Administración de Empresas", description: "Desarrolla habilidades en gestión empresarial.", icon: FcStatistics },
    { id: 1, title: "Comunicación Organizacional", description: "Procesos comunicativos internos y externos.", icon: FcCustomerSupport },
    { id: 2, title: "Contaduría Pública", description: "Administra recursos y analiza información financiera.", icon: FcCurrencyExchange },
    { id: 3, title: "Derecho", description: "Normativas jurídicas nacionales e internacionales.", icon: FcBusiness },
    { id: 4, title: "Mercadeo", description: "Estrategias de marketing efectivas.", icon: FcBriefcase },
    { id: 5, title: "Negocios Internacionales", description: "Operaciones globales de comercio.", icon: FcGlobe },
    { id: 6, title: "Talento Humano", description: "Selección y clima organizacional.", icon: FcFlowChart },
    { id: 7, title: "Gestión Empresarial", description: "Administración moderna en entornos competitivos.", icon: FcOrganization },
    { id: 8, title: "Mercadeo y Ventas", description: "Procesos comerciales efectivos.", icon: FcDebt },
    { id: 9, title: "Gestión Internacional", description: "Proyectos de globalización empresarial.", icon: FcDiploma2 }
  ],

  // Lista de subescuelas creativas
  creativeSubschools: [
    { id: 0, title: "Animación", description: "Contenido animado 2D y 3D.", icon: FcClapperboard },
    { id: 1, title: "Ing. Electrónica", description: "Soluciones electrónicas innovadoras.", icon: FcCapacitor },
    { id: 2, title: "Ing. Industrial", description: "Optimización de procesos productivos.", icon: FcSupport },
    { id: 3, title: "Ing.Sistemas", description: "Soluciones tecnológicas y software.", icon: FcCommandLine },
    { id: 4, title: "Diseño Gráfico", description: "Comunicación visual y diseño digital.", icon: FcReddit },
    { id: 5, title: "Diseño de Modas", description: "Prendas con estética y técnica.", icon: FcSportsMode },
    { id: 6, title: "Tec. en Sistemas", description: "Sistemas informáticos y mantenimiento.", icon: FcSelfServiceKiosk },
    { id: 7, title: "Producción Musical", description: "Contenido musical profesional.", icon: FcFilmReel },
    { id: 8, title: "Inteligencia de Negocios", description: "Decisiones estratégicas basadas en datos.", icon: FcBullish }
  ],

  // Lista de tutorías cargadas desde el backend
  tutoringSessions: [],

  // Setters
  setSelectedSubschool: (subschool) => set({ selectedSubschool: subschool }),
  setTutoringSessions: (sessions) => set({ tutoringSessions: sessions }),

  // Limpieza general del estado
  clearStore: () => set({
    selectedSubschool: null,
    tutoringSessions: [],
  }),
}));

export default useMentorStore;
