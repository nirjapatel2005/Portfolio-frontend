import { useEffect, useState, useRef } from "react"
import { useSocket } from "../context/SocketContext"

export const useFetch = (fetchFunction, options = {}) => {
  const { enableRealtime = false, modelName = null } = options
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Use ref to store the fetch function to prevent infinite loops
  const fetchFunctionRef = useRef(fetchFunction)
  const optionsRef = useRef(options)
  
  // Update refs when they change
  useEffect(() => {
    fetchFunctionRef.current = fetchFunction
    optionsRef.current = options
  }, [fetchFunction, options])
  
  // Get socket if real-time is enabled (SocketProvider wraps the app)
  const socketContext = useSocket()
  const socket = enableRealtime ? socketContext?.socket : null
  const isConnected = enableRealtime ? socketContext?.isConnected : false

  // Fetch data function - uses refs to get latest values
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const currentFetchFunction = fetchFunctionRef.current
      let result
      if (typeof currentFetchFunction === 'function') {
        result = await currentFetchFunction()
      } else {
        // If it's a string, import and use fetchFromCMS
        const { fetchFromCMS } = await import("../services/api")
        result = await fetchFromCMS(currentFetchFunction)
      }
      
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true
    let socketCleanup = null

    // Initial fetch
    fetchData()

    // Set up real-time updates if enabled
    if (enableRealtime && socket && isConnected && modelName) {
      const handleDataUpdate = (updateData) => {
        // Only refetch if the update is for this model
        if (mounted && updateData && updateData.model === modelName) {
          if (import.meta.env.DEV) {
            console.log(`[WebSocket] Received update for ${modelName}, refetching data...`);
          }
          fetchData()
        }
      }

      // Listen for count updates (which indicate data changes)
      socket.on("count-update", handleDataUpdate)
      
      if (import.meta.env.DEV) {
        console.log(`[WebSocket] Listening for updates on model: ${modelName}`);
      }
      
      socketCleanup = () => {
        if (socket) {
          socket.off("count-update", handleDataUpdate)
          if (import.meta.env.DEV) {
            console.log(`[WebSocket] Stopped listening for updates on model: ${modelName}`);
          }
        }
      }
    } else if (enableRealtime && import.meta.env.DEV) {
      if (!socket) {
        console.warn(`[WebSocket] Socket not available for ${modelName}`);
      } else if (!isConnected) {
        console.warn(`[WebSocket] Socket not connected for ${modelName}`);
      } else if (!modelName) {
        console.warn(`[WebSocket] Model name not provided`);
      }
    }

    return () => {
      mounted = false
      if (socketCleanup) {
        socketCleanup()
      }
    }
    // Only depend on enableRealtime, modelName, socket, and isConnected
    // fetchFunction is handled via ref to prevent infinite loops
  }, [enableRealtime, modelName, socket, isConnected])

  return { data, loading, error, refetch: fetchData }
}
