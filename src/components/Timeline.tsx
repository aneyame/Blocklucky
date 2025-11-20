import { Calendar, Trophy, Music, MessageSquare, Zap, Users, Gift } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "./ui/card";

const timelineData = [
  {
    day: "28",
    month: "Novembre",
    dayName: "Jeudi",
    events: [
      {
        time: "14:00",
        title: "Ouverture de l'événement",
        description: "Début des festivités avec animations et stands",
        icon: Zap,
        highlight: false
      },
      {
        time: "15:30",
        title: "Conférence Crypto pour débutants",
        description: "Introduction à la blockchain et aux cryptomonnaies",
        icon: MessageSquare,
        highlight: false
      },
      {
        time: "17:00",
        title: "Tirage au sort #1",
        description: "Annonce des premiers gagnants de la loterie",
        icon: Trophy,
        highlight: true
      },
      {
        time: "18:00",
        title: "Concert Live - DJ Set",
        description: "Performance électro par DJ Neon Wave",
        icon: Music,
        highlight: false
      },
      {
        time: "20:00",
        title: "Tirage au sort #2",
        description: "Deuxième série de gagnants révélée",
        icon: Trophy,
        highlight: true
      },
      {
        time: "21:00",
        title: "Afterparty",
        description: "Soirée festive avec musique et animations",
        icon: Users,
        highlight: false
      }
    ]
  },
  {
    day: "29",
    month: "Novembre",
    dayName: "Vendredi",
    events: [
      {
        time: "10:00",
        title: "Ouverture jour 2",
        description: "Reprise des activités et animations",
        icon: Zap,
        highlight: false
      },
      {
        time: "11:00",
        title: "Atelier: Créer son wallet",
        description: "Session pratique pour démarrer avec la crypto",
        icon: MessageSquare,
        highlight: false
      },
      {
        time: "12:00",
        title: "Tirage au sort #3",
        description: "Nouveaux gagnants annoncés en direct",
        icon: Trophy,
        highlight: true
      },
      {
        time: "14:30",
        title: "Table ronde: L'avenir du Web3",
        description: "Discussions avec des experts de la blockchain",
        icon: MessageSquare,
        highlight: false
      },
      {
        time: "16:00",
        title: "Concert - Groupe local",
        description: "Performance live d'un groupe d'Etherbay",
        icon: Music,
        highlight: false
      },
      {
        time: "19:00",
        title: "Tirage au sort #4",
        description: "Quatrième vague de gagnants",
        icon: Trophy,
        highlight: true
      },
      {
        time: "20:30",
        title: "Soirée Neon Party",
        description: "Ambiance futuriste et DJ sets",
        icon: Users,
        highlight: false
      }
    ]
  },
  {
    day: "30",
    month: "Novembre",
    dayName: "Samedi",
    events: [
      {
        time: "10:00",
        title: "Dernier jour - Ouverture",
        description: "Dernière journée de festivités",
        icon: Zap,
        highlight: false
      },
      {
        time: "11:00",
        title: "Smart Contracts expliqués",
        description: "Comprendre la technologie derrière la loterie",
        icon: MessageSquare,
        highlight: false
      },
      {
        time: "12:00",
        title: "Tirage au sort #5",
        description: "Avant-dernière série de gagnants",
        icon: Trophy,
        highlight: true
      },
      {
        time: "14:00",
        title: "Concert Final - Artiste principal",
        description: "Performance de clôture avec artiste invité",
        icon: Music,
        highlight: false
      },
      {
        time: "16:00",
        title: "Distribution des cadeaux",
        description: "Remise des lots aux gagnants présents",
        icon: Gift,
        highlight: false
      },
      {
        time: "19:00",
        title: "Grand Tirage Final",
        description: "Derniers gagnants et clôture de la loterie",
        icon: Trophy,
        highlight: true
      },
      {
        time: "20:00",
        title: "Clôture de l'événement",
        description: "Remerciements et fin des festivités",
        icon: Users,
        highlight: false
      }
    ]
  }
];

export function Timeline() {
  return (
    <section className="relative py-24 px-6 overflow-visible">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{
        backgroundColor: 'rgba(109, 30, 27, 0.22)'
      }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{
        backgroundColor: 'rgba(126, 37, 32, 0.1)'
      }} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
            background: 'linear-gradient(to right, rgba(193, 143, 40, 0.1), rgba(225, 176, 81, 0.1), rgba(193, 143, 40, 0.1))',
            border: '1px solid rgba(193, 143, 40, 1)'
          }}>
            <Calendar className="w-4 h-4" style={{ color: 'rgba(225, 176, 81, 1)' }} />
            <span className="text-sm" style={{ color: 'rgba(225, 176, 81, 1)' }}>28-30 Novembre 2025</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Programme de l'événement
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Trois jours de festivités avec 6 tirages au sort répartis équitablement
          </p>
        </div>

        {/* Compact Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {timelineData.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5, 
                delay: dayIndex * 0.15,
                ease: "easeOut" 
              }}
            >
              <Card className="border-gray-900 p-6 h-full" style={{
                background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))'
              }}>
                {/* Day Header */}
                <div className="text-center mb-6 pb-4 border-b border-gray-200/20">
                  <div className="text-sm text-gray-200 mb-1">{day.dayName}</div>
                  <div className="text-3xl text-white mb-1">{day.day} {day.month}</div>
                </div>

                {/* Draw Times */}
                <div className="space-y-4 mb-6">
                  <div className="rounded-lg p-4 text-center" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(193, 143, 40, 0.2)'
                  }}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Trophy className="w-5 h-5" style={{ color: 'rgba(193, 143, 40, 1)' }} />
                      <span className="text-white">Tirages au sort</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      {day.events
                        .filter(e => e.highlight)
                        .map((event, i) => (
                          <div key={i} className="text-white text-lg">
                            {event.time}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>

                {/* Key Activities */}
                <div className="space-y-3">
                  {day.events
                    .filter(e => !e.highlight)
                    .slice(0, 3)
                    .map((event, i) => {
                      const Icon = event.icon;
                      return (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <Icon className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(201, 55, 60, 1)' }} />
                          <div className="flex-1">
                            <div className="text-gray-300">{event.title}</div>
                          </div>
                          <div className="text-gray-500 text-xs">{event.time}</div>
                        </div>
                      );
                    })
                  }
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Key Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-xl p-6 text-center" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(225, 176, 81, 0.2)'
            }}
          >
            <Trophy className="w-8 h-8 mx-auto mb-3" style={{ color: 'rgba(225, 176, 81, 1)' }} />
            <div className="text-2xl text-white mb-1">6 Tirages</div>
            <div className="text-sm text-gray-400">2 par jour</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="rounded-xl p-6 text-center" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(225, 176, 81, 0.2)'
            }}
          >
            <Gift className="w-8 h-8 mx-auto mb-3" style={{ color: 'rgba(225, 176, 81, 1)' }} />
            <div className="text-2xl text-white mb-1">566 Prix</div>
            <div className="text-sm text-gray-400">À gagner par jour</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="rounded-xl p-6 text-center" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(225, 176, 81, 0.2)'
            }}
          >
            <Zap className="w-8 h-8 mx-auto mb-3" style={{ color: 'rgba(225, 176, 81, 1)' }} />
            <div className="text-2xl text-white mb-1">En Direct</div>
            <div className="text-sm text-gray-400">Diffusion sur place et annonce immédiate</div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6 text-[15px]">
            Présence non obligatoire lors des tirages pour valider votre gain.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full animate-pulse" style={{
            background: 'linear-gradient(to right, rgba(193, 143, 40, 0.1), rgba(225, 176, 81, 0.1), rgba(193, 143, 40, 0.1))',
            border: '1px solid rgba(179, 132, 27, 1)'
          }}>
            <Users className="w-5 h-5" style={{ color: 'rgba(225, 176, 81, 1)' }} />
            <span style={{ color: 'rgba(225, 176, 81, 1)' }}>Rejoignez-nous pour tenter votre chance</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}