'use client'

import { useState } from 'react'

export default function AdminHome() {
  const [stats, setStats] = useState([
    { title: 'Utilisateurs', value: 1204 },
    { title: 'Commandes', value: 89 },
    { title: 'Revenus', value: '12 430 €' },
    { title: 'Taux de conversion', value: '4.6%' },
  ])

  const [activities, setActivities] = useState([
    { user: 'Alice', action: 'a créé un produit', time: 'il y a 3 min' },
    { user: 'Marc', action: 'a supprimé une commande', time: 'il y a 10 min' },
    { user: 'Lina', action: 'a ajouté un utilisateur', time: 'il y a 25 min' },
  ])

  return (
    <div className="p-4 sm:p-8 sm:ml-64 mt-16 sm:mt-14 space-y-8">
      {/* === HEADER === */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Tableau de bord administrateur
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Vue d’ensemble des statistiques et activités récentes.
        </p>
      </header>

      {/* === STATS CARDS === */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {s.title}
            </h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              {s.value}
            </p>
          </div>
        ))}
      </section>

      {/* === CHART PLACEHOLDER === */}
      <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Statistiques mensuelles
        </h2>
        <div className="flex justify-center items-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            📊 Graphique des ventes (à intégrer)
          </p>
        </div>
      </section>

      {/* === RECENT ACTIVITY === */}
      <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Activités récentes
        </h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {activities.map((a, i) => (
            <li
              key={i}
              className="flex justify-between py-3 text-sm text-gray-700 dark:text-gray-300"
            >
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {a.user}
                </span>{' '}
                {a.action}
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                {a.time}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* === FOOTER === */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6">
        © {new Date().getFullYear()} – Admin Dashboard
      </footer>
    </div>
  )
}
