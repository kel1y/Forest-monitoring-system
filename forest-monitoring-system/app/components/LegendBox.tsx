export default function LegendBox() {
  return (
    <div className="mt-8 p-4 border rounded">
      <h3 className="text-xl font-bold mb-2">Legend</h3>
      <ul>
        <li><span className="inline-block w-4 h-4 bg-red-500 mr-2"></span>Water bodies</li>
        <li><span className="inline-block w-4 h-4 bg-green-500 mr-2"></span>Forests</li>
        <li><span className="inline-block w-4 h-4 bg-blue-500 mr-2"></span>Croplands</li>
        <li><span className="inline-block w-4 h-4 bg-purple-500 mr-2"></span>Bare lands</li>
        <li><span className="inline-block w-4 h-4 bg-yellow-500 mr-2"></span>Built-up areas</li>
      </ul>
    </div>
  )
}

