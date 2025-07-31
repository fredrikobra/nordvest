"use client"

export default function MapClient() {
  const handleDirections = () => {
    const address = "Tua 24, 6020 Ålesund, Norway"
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, "_blank")
  }

  const handleViewOnMap = () => {
    const address = "Tua 24, 6020 Ålesund, Norway"
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
  }

  return (
    <div className="h-[450px] md:h-[500px] w-full rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-900">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1953.8234567890123!2d6.1549!3d62.4722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46169d427b268c51%3A0x4e5404d928d22baf!2sTua%2024%2C%206020%20%C3%85lesund%2C%20Norway!5e0!3m2!1sen!2sno!4v1234567890123!5m2!1sen!2sno"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Nordvest Bygginnredning Location"
      />

      <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Nordvest Bygginnredning</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Tua 24, 6020 Ålesund</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <a href="tel:+4770123456" className="hover:text-blue-600 dark:hover:text-blue-400">
                +47 70 12 34 56
              </a>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleViewOnMap}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Se på kart
            </button>
            <button
              onClick={handleDirections}
              className="px-3 py-2 text-sm bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors"
            >
              Veibeskrivelse
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
