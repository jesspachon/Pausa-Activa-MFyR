import { Exercise } from '../types';

export const EXERCISES: Exercise[] = [
  // --- RESPIRACIÓN ---
  {
    id: 'resp-caja-4x4',
    title: 'Respiración en Caja 4×4',
    category: 'respiracion',
    bodyArea: 'Diafragma y Sistema Nervioso',
    clinicalContext: 'Ideal entre pacientes o tras situaciones de alta demanda en sala.',
    shortDescription: 'Regula el ritmo cardíaco y disminuye el cortisol mediante cuatro fases equilibradas.',
    iconName: 'Wind',
    phases: [
      {
        duration: 16,
        phaseTitle: 'Ciclo 1: Calma inicial',
        instruction: 'Inhala en 4s, sostén el aire 4s, exhala lento en 4s y reposa 4s.',
        visualCue: 'Sigue el pulso visual suave. Hombros relajados.',
        breathingState: 'inhale',
        postureTip: 'Coloca una mano sobre el abdomen sintiendo su expansión.'
      },
      {
        duration: 16,
        phaseTitle: 'Ciclo 2: Profundización',
        instruction: 'Inhala expandiendo costillas en 4s, retén 4s, suelta suave en 4s, pausa 4s.',
        visualCue: 'Suelta la tensión acumulada en la mandíbula al exhalar.',
        breathingState: 'hold',
        postureTip: 'Mantén la columna erguida sin rigidez.'
      },
      {
        duration: 16,
        phaseTitle: 'Ciclo 3: Desaceleración',
        instruction: 'Inhala suave 4s, sostén 4s con serenidad, exhala lento 4s, vacío 4s.',
        visualCue: 'Nota la sensación de ligereza en tus sienes.',
        breathingState: 'exhale',
        postureTip: 'Cierra los ojos si estás en un espacio seguro.'
      },
      {
        duration: 12,
        phaseTitle: 'Cierre: Retorno a tu ritmo',
        instruction: 'Realiza dos respiraciones naturales sintiendo tus pies firmes en el suelo.',
        visualCue: 'Apertura suave y presencia plena.',
        breathingState: 'rest',
        postureTip: 'Agradece este minuto de autocuidado.'
      }
    ]
  },
  {
    id: 'resp-suspiro-fisiologico',
    title: 'Doble Inhalación y Suspiro Fisiológico',
    category: 'respiracion',
    bodyArea: 'Pulmones y Tono Vagal',
    clinicalContext: 'Diseñado para reducir la fatiga respiratoria y la prisa hospitalaria.',
    shortDescription: 'El mecanismo natural del cuerpo para descolapsar alvéolos y calmar el ritmo neuronal.',
    iconName: 'Activity',
    phases: [
      {
        duration: 20,
        phaseTitle: 'Ronda 1: Doble inhalación + Exhalación larga',
        instruction: 'Inhala hondo por la nariz, toma un segundo aire extra al final, y exhala largo por la boca como un suspiro.',
        visualCue: 'Inhala... Inhala un poco más... y ¡suelta despacio!',
        breathingState: 'inhale',
        postureTip: 'Permite que el suspiro sea suave y liberador.'
      },
      {
        duration: 20,
        phaseTitle: 'Ronda 2: Repite con mayor soltura',
        instruction: 'Primera inhalación profunda, refuerzo corto nasal, y exhalación continua desinflando el pecho.',
        visualCue: 'Siente cómo descienden los hombros de inmediato.',
        breathingState: 'exhale',
        postureTip: 'Desprende las manos del teclado o de la camilla.'
      },
      {
        duration: 20,
        phaseTitle: 'Ronda 3: Estabilización final',
        instruction: 'Último suspiro fisiológico: doble toma de aire y exhalación susurrada hasta vaciar por completo.',
        visualCue: 'Pausa serena. Tu mente se despeja.',
        breathingState: 'rest',
        postureTip: 'Respira normalmente y siente tu centro.'
      }
    ]
  },

  // --- ESTIRAMIENTO ---
  {
    id: 'estir-antebrazo-muneca',
    title: 'Muñecas y Dedos de Terapeuta',
    category: 'estiramiento',
    bodyArea: 'Flexores y Extensores de Muñeca',
    clinicalContext: 'Fundamental tras movilizaciones pasivas, masoterapia o digitación clínica continua.',
    shortDescription: 'Previene sobrecargas en túnel carpiano y tendinitis de De Quervain en miembros superiores.',
    iconName: 'Hand',
    phases: [
      {
        duration: 30,
        phaseTitle: 'Lado Derecho: Flexores y Extensores',
        instruction: 'Extiende el brazo derecho con el codo recto. Con la mano izquierda, tracciona suavemente los dedos hacia atrás 15s y luego hacia abajo 15s.',
        visualCue: 'Estiramiento sostenido y suave. Sin dolor ni rebotes.',
        side: 'der',
        postureTip: 'Mantén el hombro bajo, lejos de la oreja.'
      },
      {
        duration: 30,
        phaseTitle: 'Lado Izquierdo: Flexores y Extensores',
        instruction: 'Cambia al brazo izquierdo. Extiende el codo y lleva suavemente la palma hacia ti 15s, luego orienta los dedos hacia el suelo 15s.',
        visualCue: 'Notificación silenciosa: Cambio de lado.',
        side: 'izq',
        postureTip: 'Siente la descompresión en antebrazo y palma.'
      }
    ]
  },
  {
    id: 'estir-cuello-trapecio',
    title: 'Liberación Cervical y Trapecio',
    category: 'estiramiento',
    bodyArea: 'Trapecio Superior y Angular de la Escápula',
    clinicalContext: 'Alivia la sobrecarga por inclinación de cabeza sobre camillas y pantallas.',
    shortDescription: 'Elongación suave de la musculatura lateral del cuello para disipar cefaleas tensionales.',
    iconName: 'UserCheck',
    phases: [
      {
        duration: 30,
        phaseTitle: 'Inclinación Lateral Derecha',
        instruction: 'Lleva la oreja derecha hacia el hombro derecho. Deja que el brazo izquierdo cuelgue relajado hacia el suelo aumentando el espacio.',
        visualCue: 'Respira hondo mientras se elonga el lado izquierdo del cuello.',
        side: 'der',
        postureTip: 'No jales con fuerza, el peso de tu propia cabeza es suficiente.'
      },
      {
        duration: 30,
        phaseTitle: 'Inclinación Lateral Izquierda',
        instruction: 'Pasa suavemente por el centro y orienta la oreja izquierda al hombro izquierdo, relajando el brazo derecho hacia el piso.',
        visualCue: 'Notificación silenciosa: Transición al otro lado.',
        side: 'izq',
        postureTip: 'Mantén la mandíbula entreabierta para no apretar dientes.'
      }
    ]
  },
  {
    id: 'estir-columna-apertura',
    title: 'Apertura Torácica y Retracción Escapular',
    category: 'estiramiento',
    bodyArea: 'Pectorales y Columna Dorsal',
    clinicalContext: 'Contrarresta la postura cifótica adoptada en exploraciones y procedimientos.',
    shortDescription: 'Abre la caja torácica, expande el esternón y alinea las escápulas.',
    iconName: 'Maximize2',
    phases: [
      {
        duration: 20,
        phaseTitle: 'Apertura de alas (Cactus)',
        instruction: 'Lleva los codos a la altura de los hombros en ángulo de 90°. Inhala llevando suavemente los codos y omóplatos hacia atrás.',
        visualCue: 'Siente cómo se expande el pecho y se oxigena la caja torácica.',
        side: 'ambos',
        postureTip: 'Contrae suavemente el abdomen para no hiperlordosar la columna lumbar.'
      },
      {
        duration: 20,
        phaseTitle: 'Abrazo descompresivo dorsal',
        instruction: 'Cruza los brazos por delante abrazando tus propios omóplatos e inclina la cabeza ligeramente hacia el pecho.',
        visualCue: 'Curvatura suave sintiendo espacio entre las vértebras dorsales.',
        side: 'ambos',
        postureTip: 'Respira enviando el aire hacia la espalda alta.'
      },
      {
        duration: 20,
        phaseTitle: 'Segunda apertura liberadora',
        instruction: 'Vuelve a abrir brazos entrelazando dedos detrás de la zona lumbar y estira suavemente hacia abajo.',
        visualCue: 'Regreso con hombros alineados y respiración limpia.',
        side: 'ambos',
        postureTip: 'Sonríe ligeramente y libera la tensión del rostro.'
      }
    ]
  },
  {
    id: 'estir-lumbar-pelvico',
    title: 'Descompresión Lumbar en Bipedestación',
    category: 'estiramiento',
    bodyArea: 'Columna Lumbar y Fascia Toracolumbar',
    clinicalContext: 'Especialmente útil para personal de pie en el gimnasio de rehabilitación o traslado de pacientes.',
    shortDescription: 'Descarga el peso de las vértebras lumbares con micropausas de flexión y apoyo.',
    iconName: 'ShieldAlert',
    phases: [
      {
        duration: 20,
        phaseTitle: 'Apoyo en rodillas y flexión neutra',
        instruction: 'Separa los pies al ancho de caderas, semiflexiona las rodillas y apoya las manos firmemente en tus muslos.',
        visualCue: 'Transfiere el peso del torso hacia las piernas.',
        side: 'ambos',
        postureTip: 'Permite que la zona lumbar se relaje sin sostener el peso de la espalda.'
      },
      {
        duration: 25,
        phaseTitle: 'Movilización pélvica gato-camello de pie',
        instruction: 'Inhala curvando suavemente la espalda hacia arriba metiendo el ombligo, luego exhala aplanando la columna.',
        visualCue: 'Movimiento fluido y rítmico como una ola suave.',
        side: 'ambos',
        postureTip: 'Siente el alivio articular en las vértebras L4-L5-S1.'
      },
      {
        duration: 15,
        phaseTitle: 'Enderezamiento gradual vértebra a vértebra',
        instruction: 'Incorpora el tronco lentamente comenzando por la pelvis hasta erguir la cabeza al final.',
        visualCue: 'Pies bien enraizados. Columna alargada.',
        side: 'neutro',
        postureTip: 'Siente la ligereza lumbar al recuperar la postura erguida.'
      }
    ]
  },

  // --- RELAJACIÓN ---
  {
    id: 'relaj-hombros-caida',
    title: 'Descarga Progresiva de Hombros',
    category: 'relajacion',
    bodyArea: 'Cintura Escapular y Clavículas',
    clinicalContext: 'Para liberar la carga física y emocional acumulada en la jornada clínica.',
    shortDescription: 'Contracción voluntaria seguida de una suelta completa por gravedad.',
    iconName: 'Sparkles',
    phases: [
      {
        duration: 20,
        phaseTitle: 'Tensión suave y liberación brusca 1',
        instruction: 'Sube ambos hombros hacia las orejas contrayendo suavemente durante 5s... y ¡suelta de golpe con un suspiro!',
        visualCue: 'Tensa... 3, 2, 1... ¡Suelta por completo!',
        side: 'ambos',
        postureTip: 'Nota el contraste entre el músculo contraído y el músculo flojo.'
      },
      {
        duration: 20,
        phaseTitle: 'Tensión suave y liberación 2',
        instruction: 'Vuelve a elevar los hombros con consciencia... sostén la elevación... y déjalos caer por su propio peso.',
        visualCue: 'Siente el descenso de las clavículas y el alivio cervical.',
        side: 'ambos',
        postureTip: 'Deja que los brazos cuelguen como fideos relajados.'
      },
      {
        duration: 20,
        phaseTitle: 'Rotación posterior suave y descanso',
        instruction: 'Realiza 3 círculos lentos hacia atrás con los hombros y déjalos descansar en su posición más baja y amplia.',
        visualCue: 'Postura digna, relajada y descansada.',
        side: 'ambos',
        postureTip: 'Disfruta la sensación de espacio entre tus hombros y orejas.'
      }
    ]
  },
  {
    id: 'relaj-mandibula-expresion',
    title: 'Descompresión Mandibular y Maseteros',
    category: 'relajacion',
    bodyArea: 'Mandíbula, ATM y Músculos Faciales',
    clinicalContext: 'Alivia la tensión inconsciente por concentración, uso de EPP o estrés asistencial.',
    shortDescription: 'Relaja la articulación temporomandibular y disuelve el gesto adusto del rostro.',
    iconName: 'Smile',
    phases: [
      {
        duration: 20,
        phaseTitle: 'Descenso mandibular y separación dental',
        instruction: 'Entreabre la boca separando los dientes superiores de los inferiores. Apoya la punta de la lengua suave en el paladar.',
        visualCue: 'Deja caer la mandíbula con total holgura.',
        side: 'neutro',
        postureTip: 'Los labios pueden estar ligeramente separados sin esfuerzo.'
      },
      {
        duration: 25,
        phaseTitle: 'Masaje circular suave en maseteros',
        instruction: 'Con la yema de los dedos índice y medio, haz círculos lentos sobre la articulación frente a tus oídos.',
        visualCue: 'Presión reconfortante y tibia en la mandíbula.',
        side: 'ambos',
        postureTip: 'Si encuentras un punto tenso, mantén una presión sutil y respira.'
      },
      {
        duration: 15,
        phaseTitle: 'Vibración de labios / Burbuja de aire',
        instruction: 'Sopla suavemente haciendo vibrar los labios (como un caballo) liberando toda tensión peribucal.',
        visualCue: 'Sonrisa interior. El rostro se suaviza por completo.',
        side: 'neutro',
        postureTip: 'Siente la distensión inmediata en mejillas y frente.'
      }
    ]
  },
  {
    id: 'relaj-anclaje-postural',
    title: 'Anclaje Somático y Reset Postural',
    category: 'relajacion',
    bodyArea: 'Propiocepción Corporal y Pies',
    clinicalContext: 'Ideal para reconectar con el propio cuerpo antes de atender al siguiente paciente.',
    shortDescription: 'Técnica de enraizamiento y balance propioceptivo en 60 segundos.',
    iconName: 'Compass',
    phases: [
      {
        duration: 20,
        phaseTitle: 'Contacto con el suelo',
        instruction: 'Siente los tres puntos de apoyo en cada pie: talón, primer metatarsiano y quinto metatarsiano.',
        visualCue: 'Presencia firme en la tierra. Distribuye el peso de manera uniforme.',
        side: 'ambos',
        postureTip: 'Destraba las rodillas (sin hiperextender).'
      },
      {
        duration: 20,
        phaseTitle: 'Microbalanceo anteroposterior',
        instruction: 'Balancea tu peso suavemente un centímetro hacia la punta de los pies y hacia los talones sin despegar las plantas.',
        visualCue: 'Encuentra el punto central exacto de equilibrio sin esfuerzo.',
        side: 'ambos',
        postureTip: 'Permite que la pelvis encuentre su posición neutral.'
      },
      {
        duration: 20,
        phaseTitle: 'Elevación coronilla y descanso',
        instruction: 'Imagina que un hilo suave sostiene tu coronilla hacia el techo mientras tus pies se hunden en el suelo.',
        visualCue: 'Estatura natural, mente despejada y lista.',
        side: 'neutro',
        postureTip: 'Toma aire hondo y exhala con tranquilidad.'
      }
    ]
  },

  // --- DESCANSO VISUAL ---
  {
    id: 'vis-regla-20-20-20',
    title: 'Regla 20-20-20 & Horizonte Lejano',
    category: 'visual',
    bodyArea: 'Músculos Ciliares y Acomodación',
    clinicalContext: 'Imprescindible tras evolucionar pacientes o leer historias clínicas en pantalla.',
    shortDescription: 'Relaja la convergencia y el espasmo de acomodación ocular mirando a más de 6 metros.',
    iconName: 'Eye',
    phases: [
      {
        duration: 25,
        phaseTitle: 'Mirada al punto más lejano',
        instruction: 'Aparta la vista de la pantalla o papel. Dirige tu mirada a una ventana, al final del pasillo o a más de 6 metros.',
        visualCue: 'Enfoque suave al infinito. Deja que la mirada se expanda sin forzar.',
        side: 'neutro',
        postureTip: 'No intentes leer letreros lejanos; solo deja flotar la vista en el horizonte.'
      },
      {
        duration: 20,
        phaseTitle: 'Parpadeo consciente y lubricación',
        instruction: 'Parpadea de forma lenta y deliberada 10 veces, permitiendo que la película lagrimal humecte la córnea.',
        visualCue: 'Cierra suave... abre sereno... parpadea con ligereza.',
        side: 'ambos',
        postureTip: 'Evita apretar los párpados; el cierre debe ser tan suave como una pluma.'
      },
      {
        duration: 15,
        phaseTitle: 'Acomodación cerca-lejos',
        instruction: 'Mira tu pulgar a 30 cm durante 2 segundos, y luego mira de nuevo al punto lejano. Repite dos veces.',
        visualCue: 'Gimnasia ciliar completada con éxito.',
        side: 'neutro',
        postureTip: 'Siente la frescura en tus ojos.'
      }
    ]
  },
  {
    id: 'vis-palming-termico',
    title: 'Palming Térmico (Calor en Órbitas)',
    category: 'visual',
    bodyArea: 'Órbitas Oculares y Nervio Óptico',
    clinicalContext: 'Descanso de fotofobia y luces fluorescentes del entorno hospitalario.',
    shortDescription: 'Genera calor con la fricción de tus manos y ofrece oscuridad regenerativa a los ojos.',
    iconName: 'Sun',
    phases: [
      {
        duration: 15,
        phaseTitle: 'Fricción enérgica de palmas',
        instruction: 'Frota las palmas de tus manos una contra la otra enérgicamente hasta sentir un calor agradable.',
        visualCue: 'Generando calor reconfortante...',
        side: 'ambos',
        postureTip: 'Asegúrate de que tus manos estén limpias.'
      },
      {
        duration: 35,
        phaseTitle: 'Posición de cuenco sobre los ojos',
        instruction: 'Apoya la base de las palmas en los pómulos y cubre los ojos con las palmas en forma de copa sin presionar los globos oculares.',
        visualCue: 'Oscuridad total y calor relajante. Respira pausado.',
        side: 'ambos',
        postureTip: 'Apoya los codos en el escritorio para que los hombros no hagan fuerza.'
      },
      {
        duration: 10,
        phaseTitle: 'Retiro gradual y apertura con luz tamizada',
        instruction: 'Retira las manos poco a poco manteniendo los ojos cerrados un instante antes de abrirlos suavemente.',
        visualCue: 'Apertura paulatina. Vista despejada y descansada.',
        side: 'neutro',
        postureTip: 'Parpadea un par de veces reconociendo los colores.'
      }
    ]
  },
  {
    id: 'vis-movilidad-cruz-ocho',
    title: 'Movilidad Ocular y Descompresión',
    category: 'visual',
    bodyArea: 'Músculos Extraoculares',
    clinicalContext: 'Para eliminar la rigidez de fijar la mirada fija en el mismo plano focal.',
    shortDescription: 'Movimientos suaves en los cuatro cuadrantes para estirar la musculatura periorbitaria.',
    iconName: 'RotateCw',
    phases: [
      {
        duration: 20,
        phaseTitle: 'Eje vertical: Arriba y Abajo',
        instruction: 'Sin mover la cabeza, mira suavemente hacia el techo sintiendo el estiramiento y luego hacia el suelo.',
        visualCue: 'Arriba... Abajo... movimiento continuo sin saltos bruscos.',
        side: 'ambos',
        postureTip: 'La cabeza permanece recta mirando al frente.'
      },
      {
        duration: 20,
        phaseTitle: 'Eje horizontal: Derecha e Izquierda',
        instruction: 'Dirige los ojos hacia el extremo derecho 2 segundos y luego hacia el extremo izquierdo 2 segundos.',
        visualCue: 'Extremo derecho... suave al centro... extremo izquierdo...',
        side: 'ambos',
        postureTip: 'Respira con fluidez mientras desplazas la mirada.'
      },
      {
        duration: 20,
        phaseTitle: 'Círculo suave o infinito imaginario',
        instruction: 'Dibuja con la mirada un círculo amplio y lento en sentido horario, y luego en sentido antihorario.',
        visualCue: 'Círculo armonioso y relajante.',
        side: 'ambos',
        postureTip: 'Termina con un suave parpadeo reconfortante.'
      }
    ]
  }
];

export const CATEGORY_METADATA: Record<string, { label: string; description: string; icon: string; bgBadge: string; textBadge: string; borderAccent: string }> = {
  respiracion: {
    label: 'Respiración',
    description: 'Baja el ritmo cardíaco y activa el tono vagal',
    icon: 'Wind',
    bgBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    textBadge: 'text-emerald-700',
    borderAccent: 'hover:border-emerald-300'
  },
  estiramiento: {
    label: 'Estiramiento',
    description: 'Muñecas, cuello, espalda y trapecios del terapeuta',
    icon: 'Activity',
    bgBadge: 'bg-teal-50 text-teal-700 border-teal-200',
    textBadge: 'text-teal-700',
    borderAccent: 'hover:border-teal-300'
  },
  relajacion: {
    label: 'Relajación',
    description: 'Descarga muscular, hombros y anclaje postural',
    icon: 'Sparkles',
    bgBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    textBadge: 'text-indigo-700',
    borderAccent: 'hover:border-indigo-300'
  },
  visual: {
    label: 'Descanso Visual',
    description: 'Regla 20-20-20, palming y alivio de pantallas',
    icon: 'Eye',
    bgBadge: 'bg-sky-50 text-sky-700 border-sky-200',
    textBadge: 'text-sky-700',
    borderAccent: 'hover:border-sky-300'
  }
};
