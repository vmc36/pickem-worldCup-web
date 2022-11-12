import { useState } from 'react'

export function useFetch(initialData) {
    const [data, setData] = useState(initialData)
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    function fetch(promise) {
        setIsLoading(true)
        
        promise()
            .then(result => setData(result))
            .catch(e => setError(e))
            .finally(() => setIsLoading(false))
    }

    return [
        data,
        isLoading,
        error,
        fetch
    ]
}