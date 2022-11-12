export function ErrorAlert({error}) {
    return (
        <div className="bg-red-500 text-white rounded-md px-4 py-2 text-start">
            {error}
        </div>
    )
}