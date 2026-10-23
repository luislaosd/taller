"""Contenido base (maqueta) — mismo origen que frontend/src/data/mockContent.js"""

PLACEHOLDER = "[PLACEHOLDER]"

DEFAULT_CONTACT = {
    "phone": f"{PLACEHOLDER} +51 999 999 999",
    "email": f"{PLACEHOLDER} contacto@doshmotor.com",
    "hours": f"{PLACEHOLDER} Lun–Vie 8:00–18:00 · Sáb 8:00–13:00",
    "address": f"{PLACEHOLDER} Av. Ejemplo 123, Lima, Perú",
    "whatsappNumber": "51999999999",
    "whatsappMessage": f"{PLACEHOLDER} Hola DOSH motor, deseo información sobre sus servicios.",
    "directionsUrl": f"{PLACEHOLDER} https://maps.google.com/",
    "mapsEmbedSrc": None,
}

DEFAULT_SECTIONS = {
    "home": {
        "title": "Tu vehículo en manos expertas",
        "subtitle": (
            f"{PLACEHOLDER} Taller automotriz con diagnóstico, mantenimiento y reparación. "
            "Calidad, transparencia y atención personalizada en cada servicio."
        ),
        "heroImage": "/images/mock/hero.jpg",
        "highlights": [
            {
                "title": "Diagnóstico preciso",
                "text": f"{PLACEHOLDER} Equipos y técnicos calificados para identificar fallas a tiempo.",
                "icon": "gauge",
            },
            {
                "title": "Repuestos de calidad",
                "text": f"{PLACEHOLDER} Trabajamos con proveedores confiables para tu tranquilidad.",
                "icon": "wrench",
            },
            {
                "title": "Atención clara",
                "text": f"{PLACEHOLDER} Te explicamos el trabajo antes de autorizar cualquier reparación.",
                "icon": "message",
            },
        ],
        "ctaLabel": "Agenda por WhatsApp",
    },
    "descripcion": {
        "title": "Descripción del taller",
        "lead": (
            f"{PLACEHOLDER} Somos un taller orientado al servicio integral del automóvil: "
            "desde mantenimiento preventivo hasta reparaciones complejas."
        ),
        "body": [
            f"{PLACEHOLDER} En DOSH motor S.A.C. combinamos experiencia técnica con procesos ordenados "
            "para que recibas tu vehículo en óptimas condiciones.",
            f"{PLACEHOLDER} Nuestro enfoque incluye revisión inicial, presupuesto transparente y "
            "seguimiento post-servicio.",
        ],
        "image": "/images/mock/taller.jpg",
    },
    "quienesSomos": {
        "title": "Quiénes somos",
        "lead": f"{PLACEHOLDER} Equipo apasionado por la mecánica automotriz y el trato honesto con cada cliente.",
        "values": [
            {"title": "Compromiso", "text": f"{PLACEHOLDER} Cuidamos tu vehículo como si fuera nuestro."},
            {"title": "Transparencia", "text": f"{PLACEHOLDER} Información clara en cada etapa del servicio."},
            {"title": "Mejora continua", "text": f"{PLACEHOLDER} Capacitación constante del personal técnico."},
        ],
        "teamImage": "/images/mock/equipo.jpg",
    },
}

DEFAULT_SERVICES = [
    {
        "slug": "mantenimiento-preventivo",
        "title": f"{PLACEHOLDER} Mantenimiento preventivo",
        "excerpt": f"{PLACEHOLDER} Cambio de aceite, filtros, revisión de frenos y fluidos.",
        "body": (
            f"{PLACEHOLDER} Programa de mantenimiento según kilometraje y uso del vehículo. "
            "Incluye checklist multipunto y recomendaciones por escrito."
        ),
        "image": "/images/mock/mantenimiento.jpg",
        "sort_order": 1,
        "is_active": True,
    },
    {
        "slug": "frenos-y-suspension",
        "title": f"{PLACEHOLDER} Frenos y suspensión",
        "excerpt": f"{PLACEHOLDER} Pastillas, discos, amortiguadores y alineación.",
        "body": (
            f"{PLACEHOLDER} Diagnóstico de ruidos, vibraciones y desgaste. "
            "Repuestos según disponibilidad acordada con el cliente."
        ),
        "image": "/images/mock/frenos.jpg",
        "sort_order": 2,
        "is_active": True,
    },
    {
        "slug": "diagnostico-electronico",
        "title": f"{PLACEHOLDER} Diagnóstico electrónico",
        "excerpt": f"{PLACEHOLDER} Lectura de códigos OBD y sistemas de gestión del motor.",
        "body": (
            f"{PLACEHOLDER} Identificación de fallas en sensores, inyección y sistemas auxiliares "
            "con reporte de hallazgos."
        ),
        "image": "/images/mock/diagnostico.jpg",
        "sort_order": 3,
        "is_active": True,
    },
    {
        "slug": "aire-acondicionado",
        "title": f"{PLACEHOLDER} Aire acondicionado",
        "excerpt": f"{PLACEHOLDER} Recarga, detección de fugas y mantenimiento del circuito.",
        "body": f"{PLACEHOLDER} Servicio de climatización para confort y eficiencia energética del vehículo.",
        "image": "/images/mock/aire.jpg",
        "sort_order": 4,
        "is_active": True,
    },
]
