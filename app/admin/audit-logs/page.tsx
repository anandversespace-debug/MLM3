'use client';

export default function AuditLogsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Audit & System Logs</h1>
        <p className="text-foreground-secondary">Track all system activities, admin actions, and errors</p>
      </div>

      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex gap-4 p-4">
            {[
              { id: 'admin', label: '🛂 Admin Activity' },
              { id: 'system', label: '⚙️ System Logs' },
              { id: 'error', label: '❌ Error Logs' },
              { id: 'api', label: '🔌 API Logs' },
            ].map((tab, idx) => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  idx === 0
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-lg font-medium text-foreground mb-2">Audit Logs</p>
          <p className="text-foreground-secondary">All admin activities and system events will be logged here</p>
          <p className="text-sm text-foreground-secondary mt-2">Includes: logins, data changes, deletions, and configuration updates</p>
        </div>
      </div>
    </div>
  );
}
