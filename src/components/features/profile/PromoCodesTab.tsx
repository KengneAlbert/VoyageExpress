import React, { useState } from "react";
import { motion } from "framer-motion";
import { Ticket, Copy, Check, Coins, TrendingUp, Users } from "lucide-react";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import { useNotifications } from "../../../context/NotificationsContext"; // Import the notification hook

interface PromoCode {
  code: string;
  createdAt: string;
  usageCount: number;
  totalBenefits: number;
  status: "active" | "inactive";
  rewards: {
    discount: number;
    points: number;
  };
  lastUsed?: string;
}

const PromoCodesTab = () => {
  const { showNotification } = useNotifications(); // Use the notification hook
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      code: "ALEX2024",
      createdAt: "2024-01-15",
      usageCount: 45,
      totalBenefits: 25000,
      status: "active",
      rewards: {
        discount: 5,
        points: 10,
      },
      lastUsed: "2024-02-20",
    },
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Ajout des données d'utilisation
  const usageData = [
    { date: "2024-01", uses: 5 },
    { date: "2024-02", uses: 12 },
    { date: "2024-03", uses: 8 },
    // ...
  ];

  // Ajout des statistiques par code
  const getCodeStats = (code: PromoCode) => {
    const monthlyAverage = code.usageCount / 3; // Exemple sur 3 mois
    const conversionRate = (code.usageCount / code.totalBenefits) * 100;

    return {
      monthlyAverage,
      conversionRate,
      efficiency: code.totalBenefits / code.usageCount,
    };
  };

  const generateNewCode = async () => {
    setIsGenerating(true);
    try {
      // Simuler un appel API pour générer un nouveau code
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newCode: PromoCode = {
        code: `USER${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        createdAt: new Date().toISOString().split("T")[0],
        usageCount: 0,
        totalBenefits: 0,
        status: "active",
        rewards: {
          discount: 5, // Défini par la plateforme
          points: 10, // Défini par la plateforme
        },
      };

      setPromoCodes([newCode, ...promoCodes]);
      showNotification("Nouveau code promo généré avec succès !", "success");
    } catch (error) {
      showNotification("Erreur lors de la génération du code", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showNotification("Code copié dans le presse-papier !", "info", 2000);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <h3 className="text-gray-400">Utilisations totales</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            {promoCodes.reduce((acc, code) => acc + code.usageCount, 0)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <Coins className="w-5 h-5 text-orange-400" />
            <h3 className="text-gray-400">Bénéfices totaux</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            {promoCodes.reduce((acc, code) => acc + code.totalBenefits, 0)} FCFA
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="text-gray-400">Taux actuel</h3>
          </div>
          <p className="text-2xl font-bold text-white">5%</p>
          <p className="text-sm text-gray-500">Défini par la plateforme</p>
        </motion.div>
      </div>

      {/* Graphique d'utilisation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Évolution des utilisations
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageData}>
              <Line
                type="monotone"
                dataKey="uses"
                stroke="#f97316"
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{ background: "#1f2937", border: "none" }}
                labelStyle={{ color: "#9ca3af" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bouton de génération */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Ticket className="w-5 h-5 text-orange-400" />
          Vos Codes Promotionnels
        </h2>
        <button
          onClick={generateNewCode}
          disabled={isGenerating}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600
                   transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center gap-2"
        >
          <Ticket className="w-4 h-4" />
          {isGenerating ? "Génération..." : "Générer un code"}
        </button>
      </div>

      {/* Liste des codes */}
      <div className="space-y-4">
        {promoCodes.map((promoCode) => {
          const stats = getCodeStats(promoCode);
          return (
            <motion.div
              key={promoCode.code}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {promoCode.code}
                    </h3>
                    <button
                      onClick={() => copyToClipboard(promoCode.code)}
                      className="p-1 hover:bg-gray-700 rounded-md transition-colors"
                    >
                      {copiedCode === promoCode.code ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{promoCode.rewards.discount}% de réduction</span>
                    <span>•</span>
                    <span>
                      {promoCode.rewards.points} points par utilisation
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Bénéfices générés</p>
                    <p className="text-lg font-semibold text-orange-400">
                      {promoCode.totalBenefits} FCFA
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      promoCode.status === "active"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {promoCode.status === "active" ? "Actif" : "Inactif"}
                  </span>
                </div>
              </div>

              {/* Statistiques d'utilisation */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-700/50">
                <div>
                  <p className="text-sm text-gray-400">Créé le</p>
                  <p className="text-white">
                    {new Date(promoCode.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Utilisations</p>
                  <p className="text-white">{promoCode.usageCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Dernière utilisation</p>
                  <p className="text-white">
                    {promoCode.lastUsed
                      ? new Date(promoCode.lastUsed).toLocaleDateString()
                      : "Jamais"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Points gagnés</p>
                  <p className="text-white">
                    {promoCode.usageCount * promoCode.rewards.points}
                  </p>
                </div>
                {/* Nouvelles statistiques */}
                <div>
                  <p className="text-sm text-gray-400">Moyenne mensuelle</p>
                  <p className="text-white">
                    {stats.monthlyAverage.toFixed(1)} utilisations
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Taux de conversion</p>
                  <p className="text-white">
                    {stats.conversionRate.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Efficacité</p>
                  <p className="text-white">
                    {stats.efficiency.toFixed(0)} FCFA/utilisation
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Guide d'utilisation des codes promo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl p-6 border border-orange-500/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Comment ça marche ?
        </h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-orange-400">1.</span>
            <span>Générez votre code promotionnel unique</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400">2.</span>
            <span>Partagez-le avec vos amis et sur vos réseaux sociaux</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400">3.</span>
            <span>Gagnez des points à chaque utilisation de votre code</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400">4.</span>
            <span>Suivez vos statistiques et optimisez vos partages</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default PromoCodesTab;
